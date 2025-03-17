<?php

namespace app\api\model\user;

use app\common\exception\BaseException;
use app\common\model\user\Grade as GradeModel;
use think\facade\Cache;
use app\common\model\user\User as UserModel;

/**
 * 用户模型类
 */
class UserWeb extends UserModel
{
    private $token;

    /**
     * 隐藏字段
     */
    protected $hidden = [
        'open_id',
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 用户登录
     */
    public function login($data)
    {
        $user = $this->where('mobile', '=', $data['mobile'])
            ->where('password', '=', md5($data['password']))->find();
        if (!$user) {
            throw new BaseException(['msg' => '手机号密码错误']);
        } else {
            $user_id = $user['user_id'];
            $mobile = $user['mobile'];
        }
        // 生成token (session3rd)
        $this->token = $this->token($mobile);
        // 记录缓存, 30天
        Cache::tag('cache')->set($this->token, $user_id, 86400 * 30);
        return $user_id;
    }

    /*
    *手机号注册
    */
    public function phoneRegister($data)
    {
        $user = $this->where('mobile', '=', $data['mobile'])->find();
        if (!$user) {
            try {
                $this->startTrans();
                $data['referee_id'] = isset($data['referee_id']) && $data['referee_id'] ? $data['referee_id'] : 0;
                $this->save([
                    'mobile' => $data['mobile'],
                    'reg_source' => 'app',
                    //默认等级
                    'grade_id' => GradeModel::getDefaultGradeId(),
                    'app_id' => self::$app_id,
                    'password' => md5($data['password']),
                    'referee_id' => $data['referee_id']
                ]);
                //注册之后关系绑定
                $this->saveRelation($this, $data['referee_id']);
                $this->commit();
                return true;
            } catch (\Exception $e) {
                $this->rollback();
                throw new BaseException(['msg' => $e->getMessage()]);
            }
        } else {
            $this->error = '手机号已存在';
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
     * 绑定手机
     */
    public function bindMobile($user, $data)
    {
        if (!$this->check($data)) {
            return false;
        }
        return $user->save([
            'mobile' => $data['mobile']
        ]);
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

}
