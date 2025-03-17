<?php

namespace app\admin\model\app;

use app\admin\model\page\Page as PageModel;
use app\admin\model\Shop as ShopUser;
use app\common\model\app\App as AppModel;
use app\admin\model\user\Grade as GradeModel;

class App extends AppModel
{
    /**
     * 获取小程序列表
     */
    public function getList($limit)
    {
        return $this->alias('app')->field(['app.*,user.user_name'])
            ->join('shop_user user', 'user.app_id = app.app_id','left')
            ->where('user.is_super', '=', 1)
            ->where('app.is_delete', '=', 0)
            ->order(['create_time' => 'asc'])
            ->paginate($limit);
    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        if ($data['password'] !== $data['password_confirm']) {
            $this->error = '确认密码不正确';
            return false;
        }
        if (ShopUser::checkExist($data['user_name'])) {
            $this->error = '商家用户名已存在';
            return false;
        }
        if($data['no_expire'] == 'true'){
            $data['expire_time'] = 0;
        }else{
            $data['expire_time'] = strtotime($data['expire_time']);
        }
        if($data['weixin_service'] == 'true'){
            $data['weixin_service'] = 1;
        }else{
            $data['weixin_service'] = 0;
        }
        $this->startTrans();
        try {
            // 添加小程序记录
            $this->save($data);
            // 新增商家用户信息
            $ShopUser = new ShopUser;
            if (!$ShopUser->add($this['app_id'], $data)) {
                $this->error = $ShopUser->error;
                return false;
            }
            // 新增应用diy配置
            (new PageModel)->insertDefault($this['app_id']);
            // 默认等级
            (new GradeModel)->insertDefault($this['app_id']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改记录
     */
    public function edit($data)
    {
        $this->startTrans();
        try {
            $save_data = [
                'app_name' => $data['app_name'],
            ];
            if($data['no_expire'] == 'true'){
                $save_data['expire_time'] = 0;
            }else{
                $save_data['expire_time'] = strtotime($data['expire_time_text']);
            }

            if($data['weixin_service'] == 'true'){
                $save_data['weixin_service'] = 1;
            }else{
                $save_data['weixin_service'] = 0;
            }
            $this->allowField(['app_name','expire_time','weixin_service'])->save($save_data);
            $user_data = [
                'user_name' => $data['user_name']
            ];
            if (!empty($data['password'])) {
                $user_data['password'] = salt_hash($data['password']);
            }
            $shop_user = (new ShopUser())->where('app_id', '=', $this['app_id'])->where('is_super', '=', 1)->find();
            if($shop_user['user_name'] != $data['user_name']){
                if (ShopUser::checkExist($data['user_name'])) {
                    $this->error = '商家用户名已存在';
                    return false;
                }
            }
            $shop_user->save($user_data);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }
    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }

    /**
     * 服务商支付开启关闭
     */
    public function updateWxStatus()
    {
        return $this->allowField(['weixin_service'])->save([
            'weixin_service' => !$this['weixin_service'],
        ]);
    }
}