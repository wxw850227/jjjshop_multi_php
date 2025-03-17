<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\Account as SupplierAccountModel;
/**
 * 供应商提现账号模型
 */
class Account extends SupplierAccountModel
{
    public function add($shop_supplier_id, $data){
        $model = SupplierAccountModel::detail($shop_supplier_id);
        if(!$model){
            $model = new SupplierAccountModel();
        }
        $data['shop_supplier_id'] = $shop_supplier_id;
        return $model->save($data);
    }
}