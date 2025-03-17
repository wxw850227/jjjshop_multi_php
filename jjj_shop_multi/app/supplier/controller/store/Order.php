<?php

namespace app\supplier\controller\store;

use app\supplier\controller\Controller;
use app\supplier\model\store\Store as StoreModel;
use app\supplier\model\store\Order as OrderModel;

/**
 * 订单核销控制器
 */
class Order extends Controller
{
    /**
     * 订单核销记录列表
     */
    public function index($store_id = 0, $search = '')
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->getSupplierId();
        // 核销记录列表
        $model = new OrderModel;
        $list = $model->getList($store_id, $search, $data);
        // 门店列表
        $store_list = (new StoreModel)->getList([],$this->getSupplierId());
        return $this->renderSuccess('', compact('list', 'store_list'));
    }
}
