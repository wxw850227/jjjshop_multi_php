<?php

namespace app\supplier\controller\cash;

use app\supplier\controller\Controller;
use app\supplier\model\order\Order as OrderModel;
use app\supplier\model\order\OrderSettled as OrderSettledModel;

/**
 * 结算管理
 */
class Settled extends Controller
{
    /**
     * 列表
     */
    public function index()
    {
        $model = new OrderSettledModel;
        //列表数据
        $list = $model->getList($this->getSupplierId(), $this->postData());
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