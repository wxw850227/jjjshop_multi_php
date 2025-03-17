<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\LoginLog as LoginLogModel;
use app\common\model\supplier\User as UserModel;
use app\shop\model\supplier\Supplier as SupplierModel;

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
        if ($user['app']['is_delete']) {
            $this->error = '登录失败, 当前用户已删除';
            return false;
        }
        $supplier = SupplierModel::detail($user['shop_supplier_id']);
        if ($supplier['is_delete']) {
            $this->error = '登录失败, 当前商户已删除';
            return false;
        }
        $supplier = SupplierModel::detail($user['shop_supplier_id']);
        if ($supplier['is_recycle']) {
            $this->error = '登录失败, 当前商户已禁止';
            return false;
        }
        $user['supplier_name'] = $supplier['name'];
        // 保存登录状态
        $user['token'] = signToken($user['supplier_user_id'], 'supplier');
        // 写入登录日志
        LoginLogModel::add($user, \request()->ip(), '登录成功',$user['app']['app_id']);
        return $user;
    }


    /*
    * 修改密码
    */
    public function editPass($data, $user)
    {
        $user_info = User::detail($user['supplier_user_id']);
        if ($data['password'] != $data['confirmPass']) {
            $this->error = '新密码输入不一致';
            return false;
        }
        if ($user_info['password'] != salt_hash($data['oldpass'])) {
            $this->error = '原始密码错误';
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
        return (new static())->where(['supplier_user_id' => $data['uid']])->with(['app'])->find();
    }

}