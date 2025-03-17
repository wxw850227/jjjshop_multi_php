<?php

namespace app\supplier\controller\supplier;

use app\common\model\settings\Setting as SettingModel;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\supplier\controller\Controller;
/**
 * 供应商
 */
class Supplier extends Controller
{
    /**
     * 获取用户信息
     */
    public function getUserInfo()
    {
        $supplier = $this->supplier['supplier'];
        // 商城名称
        $shop_name = SettingModel::getItem('store')['name'];
        //当前系统版本
        $version = get_version();
        return $this->renderSuccess('', compact('supplier', 'shop_name', 'version'));
    }
    /**
     * 申请退押金
     */
    public function refund(){
        $supplier = SupplierModel::detail($this->getSupplierId());
        $model = new DepositRefundModel;
        if ($model->submit($supplier)) {
            return $this->renderSuccess('申请退款成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }    
}
