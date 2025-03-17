<?php

namespace app\supplier\controller\order;

use app\common\enum\settings\DeliveryTypeEnum;
use app\supplier\model\store\Store as StoreModel;
use app\supplier\controller\Controller;
use app\supplier\model\order\Order as OrderModel;
use app\common\model\settings\Express as ExpressModel;
use app\supplier\model\store\Clerk as ClerkModel;

/**
 * 订单控制器
 */
class Order extends Controller
{
    /**
     * 订单列表
     */
    public function index($dataType = 'all')
    {
        // 订单列表
        $model = new OrderModel();
        $list = $model->getList($dataType, $this->postData(), $this->getSupplierId());
        $order_count = [
            'order_count' => [
                'payment' => $model->getCount('payment', $this->getSupplierId()),
                'delivery' => $model->getCount('delivery', $this->getSupplierId()),
                'received' => $model->getCount('received', $this->getSupplierId()),
                'cancel' => $model->getCount('cancel', $this->getSupplierId()),
            ],];
        // 自提门店列表
        $shop_list = StoreModel::getAllList($this->getSupplierId());
        $ex_style = DeliveryTypeEnum::data();
        return $this->renderSuccess('', compact('list', 'order_count', 'shop_list', 'ex_style'));
    }

    /**
     * 订单详情
     */
    public function detail($order_id)
    {
        // 订单详情
        $detail = OrderModel::detail($order_id);
        if (isset($detail['pay_time']) && $detail['pay_time'] != '') {
            $detail['pay_time'] = date('Y-m-d H:i:s', $detail['pay_time']);
        }
        if (isset($detail['delivery_time']) && $detail['delivery_time'] != '') {
            $detail['delivery_time'] = date('Y-m-d H:i:s', $detail['delivery_time']);
        }
        // 物流公司列表
        $model = new ExpressModel();
        $expressList = $model->getAll();
        // 门店店员列表
        $shopClerkList = (new ClerkModel)->getClerk($detail['extract_store_id']);
        return $this->renderSuccess('', compact('detail', 'expressList', 'shopClerkList'));
    }

    /**
     * 确认发货
     */
    public function delivery($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->delivery($this->postData('param'))) {
            return $this->renderSuccess('发货成功');
        }
        return $this->renderError('发货失败');
    }

    /**
     * 修改订单价格
     */
    public function updatePrice($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->updatePrice($this->postData('order'))) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * 获取物流信息
     */
    public function express($order_id)
    {
        // 订单信息
        $order = OrderModel::detail($order_id);
        if (!$order['express_no']) {
            return $this->renderError('没有物流信息');
        }
        // 获取物流信息
        $model = $order['express'];
        $express = $model->dynamic($model['express_name'], $model['express_code'], $order['express_no']);
        if ($express === false) {
            return $this->renderError($model->getError());
        }
        return $this->renderSuccess('', compact('express'));
    }

    /**
     * 订单改地址
     */
    public function updateAddress($order_id)
    {
        // 订单信息
        $order = OrderModel::detail($order_id);
        if ($order['delivery_type']['value'] == 10 && $order['delivery_status']['value'] == 20) {
            return $this->renderError('订单已发货不允许修改');
        }
        // 获取物流信息
        $model = $order['address'];
        if (!$model->updateAddress($this->postData())) {
            return $this->renderError($model->getError() ?: '修改失败');
        }
        return $this->renderSuccess('修改成功');
    }

    /**
     * 取消订单
     */
    public function orderCancel($order_no)
    {
        // 订单信息
        $model = OrderModel::detail(['order_no' => $order_no]);
        if ($model->orderCancel($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 虚拟商品发货
     */
    public function virtual($order_id)
    {
        // 订单信息
        $model = OrderModel::detail($order_id);
        if ($model->virtual($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 微信小程序发货
     */
    public function wxDelivery($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->wxDelivery()) {
            return $this->renderSuccess('发货成功');
        }
        return $this->renderError('发货失败');
    }
}