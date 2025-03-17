<?php

namespace app\api\model\user;

use app\common\model\page\CenterMenu as CenterMenuModel;
use think\facade\Cache;
use app\common\exception\BaseException;
use app\common\model\user\User as UserModel;
use app\common\library\easywechat\AppWx;
use app\common\model\user\Grade as GradeModel;
use app\common\model\settings\Setting as SettingModel;

/**
 * 用户模型类
 */
class User extends UserModel
{
    private $token;

    /**
     * 隐藏字段
     */
    protected $hidden = [
        'is_delete',
        'create_time',
        'update_time'
    ];

    /**
     * 获取用户信息
     */
    public static function getUser($token)
    {
        $userId = Cache::get($token);
        return (new static())->where(['user_id' => $userId])->with(['address', 'addressDefault', 'grade', 'supplierUser'])->find();
    }

    /**
     * 用户登录
     */
    public function login($post)
    {
        // 微信登录 获取session_key
        $app = AppWx::getApp();
        $utils = $app->getUtils();
        $session = $utils->codeToSession($post['code']);
        // 自动注册用户
        $refereeId = isset($post['referee_id']) && $post['referee_id'] ? $post['referee_id'] : 0;
        $userInfo = json_decode(htmlspecialchars_decode($post['user_info']), true);

        $reg_source = $post['source'];
        $user_id = $this->register($session['openid'], $userInfo, $refereeId, $session, $reg_source);
        // 生成token (session3rd)
        $this->token = $this->token($session['openid']);
        // 记录缓存, 7天
        Cache::tag('cache')->set($this->token, $user_id, 86400 * 7);
        return $user_id;
    }

    /**
     * 用户登录
     */
    public function bindMobile($post)
    {
        try {
            // 微信登录 获取session_key
            $app = AppWx::getApp();
            $iv = $post['iv'];
            $encrypted_data = $post['encrypted_data'];
            $utils = $app->getUtils();
            $result = $utils->decryptSession($post['session_key'], $iv, $encrypted_data);
            if (isset($result['phoneNumber']) && $result['phoneNumber']) {
                $this->save([
                    'mobile' => $result['phoneNumber']
                ]);
                return $result['phoneNumber'];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            $this->error = '获取手机号失败，请重试';
            return false;
        }
    }

    /**
     * 获取token
     */
    public function getToken()
    {
        return $this->token;
    }


    /**
     * 生成用户认证的token
     */
    private function token($openid)
    {
        $app_id = self::$app_id;
        // 生成一个不会重复的随机字符串
        $guid = \getGuidV4();
        // 当前时间戳 (精确到毫秒)
        $timeStamp = microtime(true);
        // 自定义一个盐
        $salt = 'token_salt';
        return md5("{$app_id}_{$timeStamp}_{$openid}_{$guid}_{$salt}");
    }

    /**
     * 自动注册用户
     */
    private function register($open_id, $data, $refereeId, $decryptedData = [], $reg_source = '')
    {
        //通过unionid查询用户是否存在
        $user = null;
        $data['union_id'] = '';
        if (isset($decryptedData['unionid']) && !empty($decryptedData['unionid'])) {
            $data['union_id'] = $decryptedData['unionid'];
            $user = self::detailByUnionid($decryptedData['unionid']);
        }
        if (!$user) {
            // 通过open_id查询用户是否已存在
            $user = self::detail(['open_id' => $open_id]);
        }
        if ($user) {
            $model = $user;
            // 只修改union_id
            $data = [
                'union_id' => $data['union_id'],
            ];
        } else {
            $model = $this;
            if ($data['nickName'] == '微信用户') {
                // 截取openid前8位
                $data['nickName'] = substr($open_id, 0, 8);
            }
            $data['referee_id'] = $refereeId;
            $data['reg_source'] = 'wx';
            //默认等级
            $data['grade_id'] = GradeModel::getDefaultGradeId();
        }
        $this->startTrans();
        try {
            // 保存/更新用户记录
            if (!$model->save(array_merge($data, [
                'open_id' => $open_id,
                'app_id' => self::$app_id
            ]))
            ) {
                throw new BaseException(['msg' => '用户注册失败']);
            }
            if (!$user) {
                //注册之后关系绑定
                $this->saveRelation($model, $refereeId);
            }
            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            throw new BaseException(['msg' => $e->getMessage()]);
        }
        return $model['user_id'];
    }

    /**
     *统计被邀请人数
     */
    public function getCountInv($user_id)
    {
        return $this->where('referee_id', '=', $user_id)->count('user_id');
    }

    /**
     * 签到更新用户积分
     */
    public function setPoints($user_id, $days, $sign_conf, $sign_date)
    {
        $rank = $sign_conf['ever_sign'];
        if ($sign_conf['is_increase'] == 'true') {
            if ($days >= $sign_conf['no_increase']) {
                $days = $sign_conf['no_increase'] - 1;
            }
            $rank = ($days - 1) * $sign_conf['increase_reward'] + $rank;
        }
        //是否奖励
        if (isset($sign_conf['reward_data'])) {
            $arr = array_column($sign_conf['reward_data'], 'day');
            if (in_array($days, $arr)) {
                $key = array_search($days, $arr);
                if ($sign_conf['reward_data'][$key]['is_point'] == 'true') {
                    $rank = $sign_conf['reward_data'][$key]['point'] + $rank;
                }
            }
        }
        // 新增积分变动明细
        $this->setIncPoints($rank, '用户签到：签到日期' . $sign_date);
        return $rank;
    }

    /**
     * 个人中心菜单列表
     */
    public static function getMenus($user, $source)
    {
        // 系统菜单
        $sys_menus = CenterMenuModel::getSysMenu();
        // 查询用户菜单
        $model = new CenterMenuModel();
        $user_menus = $model->getAll();
        $user_menu_tags = [];
        foreach ($user_menus as $menu) {
            $menu['sys_tag'] != '' && array_push($user_menu_tags, $menu['sys_tag']);
        }
        $save_data = [];
        foreach ($sys_menus as $menu) {
            if ($menu['sys_tag'] != '' && !in_array($menu['sys_tag'], $user_menu_tags)) {
                $save_data[] = array_merge($sys_menus[$menu['sys_tag']], [
                    'sort' => 100,
                    'app_id' => self::$app_id
                ]);
            }
        }
        if (count($save_data) > 0) {
            $model->saveAll($save_data);
            Cache::delete('center_menu_' . self::$app_id);
            $user_menus = $model->getAll();
        }
        $menus_arr = [];
        foreach ($user_menus as $menu) {
            if ($menu['status'] == 1) {
                array_push($menus_arr, $menu);
            }
        }
        $sign_conf = SettingModel::getItem('sign');
        foreach ($menus_arr as $key => $menus) {
            if ($menus['sys_tag'] == "signin" && !$sign_conf['is_open']) {
                unset($menus_arr[$key]);
            }
            if (strpos($menus['image_url'], 'http') !== 0) {
                $menus['image_url'] = self::$base_url . $menus['image_url'];
            }
        }
        return $menus_arr;
    }

    /**
     * 修改会员信息
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            //完成成长任务
            if ($this['nickName'] != $data['nickName']) {
                $data['task_type'] = "base";
                $data['user_id'] = $this['user_id'];
                event('UserTask', $data);
            } elseif ($this['avatarUrl'] != $data['avatarUrl']) {
                $data['task_type'] = "image";
                $data['user_id'] = $this['user_id'];
                event('UserTask', $data);
            }
            unset($data['points']);
            $this->allowField(['avatarUrl', 'nickName'])->save($data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    public function setDelete($user)
    {
        return $user->save([
            'is_delete' => 1
        ]);
    }
}
