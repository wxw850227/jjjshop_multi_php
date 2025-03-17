<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\Service as ServiceModel;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\supplier\model\supplier\User as SupplierUserModel;
use app\supplier\model\user\User as UserModel;
use app\common\exception\BaseException;

/**
 * 供应商客服模型
 */
class Service extends ServiceModel
{
    /**
     * 保存
     */
    public static function saveService($shop_supplier_id, $data)
    {
        $model = static::detail($shop_supplier_id);
        if (!$model) {
            $model = new static();
            $data['shop_supplier_id'] = $shop_supplier_id;
            $data['app_id'] = self::$app_id;
        }
        $Supplier = SupplierModel::detail($shop_supplier_id, []);
        //更新供应商绑定用户id
        if (!$Supplier['user_id'] && $data['service_type'] == 20) {
            //查询用户id是否存在
            $user = UserModel::detail($data['user_id']);
            if (!$user) {
                throw new BaseException(['msg' => '绑定用户信息不存在']);
            }
            //查询用户id是否已绑定
            $supplierInfo = (new SupplierModel())->where('user_id', '=', $data['user_id'])->find();
            if ($supplierInfo) {
                throw new BaseException(['msg' => '该用户已经绑定']);
            }
            $Supplier->save(['user_id' => $data['user_id']]);
            (new SupplierUserModel())->where('shop_supplier_id', '=', $shop_supplier_id)->where('is_super', '=', 1)->update(['user_id' => $data['user_id']]);
        }
        return $model->save($data);
    }
}