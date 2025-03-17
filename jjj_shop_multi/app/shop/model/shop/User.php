<?php

namespace app\shop\model\shop;

use app\common\model\shop\LoginLog as LoginLogModel;
use app\common\model\shop\User as UserModel;

/**
 * 后台管理员登录模型
 */
class User extends UserModel
{
    /**
     *检查登录
     */
    public function checkLogin($user)
    {
        $where['user_name'] = $user['username'];
        $where['password'] = $user['password'];
        $where['is_delete'] = 0;

        if (!$user = $this->where($where)->with(['app'])->find()) {
            return false;
        }
        if (empty($user['app'])) {
            $this->error = '登录失败, 未找到应用信息';
            return false;
        }
        if ($user['app']['is_recycle']) {
            $this->error = '登录失败, 当前应用已禁用';
            return false;
        }
        if ($user['app']['is_delete']) {
            $this->error = '登录失败, 当前应用已删除';
            return false;
        }
        // 保存登录状态
        $user['token'] = signToken($user['shop_user_id'], 'shop');
        // 写入登录日志
        LoginLogModel::add($where['user_name'], \request()->ip(), '登录成功', $user['app']['app_id']);
        return $user;
    }


    /*
    * 修改密码
    */
    public function editPass($data, $user)
    {
        $user_info = User::detail($user['shop_user_id']);
        if ($user_info['password'] != salt_hash($data['oldpass'])) {
            $this->error = '旧密码错误';
            return false;
        }
        if ($data['password'] != $data['confirmPass']) {
            $this->error = '两次密码不相同';
            return false;
        }
        $date['password'] = salt_hash($data['password']);
        $user_info->save($date);
        return true;
    }

    /**
     * 获取用户信息
     */
    public static function getUser($data)
    {
        return (new static())->where(['shop_user_id' => $data['uid']])->with(['app'])->find();
    }

}