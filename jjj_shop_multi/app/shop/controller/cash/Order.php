<?php

namespace app\shop\controller\cash;

use app\shop\controller\Controller;
use app\shop\model\order\OrderSettled as OrderSettledModel;
use app\shop\model\order\Order as OrderModel;
/**
 * 提现
 */
class Order extends Controller
{
    /**
     * 订单列表
     */
    public function index()
    {
        $model = new OrderSettledModel;
        //列表数据
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 详情
     */
    public function detail($settled_id){
        $model = OrderSettledModel::detail($settled_id);
        $order = OrderModel::detail($model['order_id']);
        return $this->renderSuccess('', compact('model', 'order'));
    }
}
