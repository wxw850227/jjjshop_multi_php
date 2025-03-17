<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\Supplier as SupplierModel;

/**
 * 后台管理员登录模型
 */
class Supplier extends SupplierModel
{
    /*
    * 修改密码
    */
    public function editPass($data, $user)
    {
        $user_info = User::detail($user['shop_user_id']);
        if ($data['password'] != $data['confirmPass']) {
            $this->error = '密码错误';
            return false;
        }
        if ($user_info['password'] != salt_hash($data['oldpass'])) {
            $this->error = '两次密码不相同';
            return false;
        }
        $date['password'] = salt_hash($data['password']);
        $user_info->save($date);
        return true;
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        $isexist = $this->where('name', '=', $data['name'])->where('shop_supplier_id', '<>', $data['shop_supplier_id'])->find();
        if ($isexist) {
            $this->error = '店铺名称已存在';
            return false;
        }
        return $this->save([
            'link_name' => $data['link_name'],
            'link_phone' => $data['link_phone'],
            'address' => $data['address'],
            'description' => $data['description'],
            'logo_id' => $data['logo_id'],
            'business_id' => $data['business_id'],
            'app_id' => self::$app_id,
            'name' => $data['name'],
            'is_full' => 1
        ]);
    }

    /**
     * 资金冻结
     */
    public function freezeMoney($money)
    {
        return $this->save([
            'money' => $this['money'] - $money,
            'freeze_money' => $this['freeze_money'] + $money,
        ]);
    }
}