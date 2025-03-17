<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\settings\Express as ExpressModel;
use app\api\model\order\OrderProduct as OrderProductModel;
use app\api\model\order\OrderRefund as OrderRefundModel;
use app\api\model\settings\Message as MessageModel;
use app\common\model\settings\ReturnAddress as ReturnAddressModel;

/**
 * 订单售后服务
 */
class Refund extends Controller
{
    // $user
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        $this->user = $this->getUser();   // 用户信息
    }

    /**
     * 用户售后单列表
     */
    public function lists($state = -1)
    {
        $model = new OrderRefundModel;
        $list = $model->getList($this->user['user_id'], $state, $this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 申请售后
     */
    public function apply($order_product_id, $platform = 'wx')
    {
        // 订单商品详情
        $detail = OrderProductModel::detail($order_product_id);
        if (isset($detail['refund']) && !empty($detail['refund'])) {
            return $this->renderError('当前商品已申请售后');
        }
        if ($this->request->isGet()) {
            // 如果来源是小程序, 则获取小程序订阅消息id.获取售后通知.
            $template_arr = MessageModel::getMessageByNameArr($platform, ['order_refund_user']);
            return $this->renderSuccess('', compact('detail', 'template_arr'));
        }
        // 新增售后单记录
        $model = new OrderRefundModel;
        if ($model->apply($this->user, $detail, $this->request->post())) {
            return $this->renderSuccess('提交成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 申请平台介入售后
     */
    public function plateapply($order_refund_id)
    {
        // 订单详情
        $detail = OrderRefundModel::detail($order_refund_id);
        if (!in_array($detail['status']['value'], [0, 10]) || $detail['plate_status']['value'] != 0) {
            return $this->renderError('当前状态不允许申请');
        }
        // 新增记录
        $model = new OrderRefundModel;
        if ($model->plateapply($order_refund_id)) {
            return $this->renderSuccess('提交成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 售后单详情
     */
    public function detail($order_refund_id, $platform = '')
    {
        // 售后单详情
        $detail = OrderRefundModel::detail([
            'order_refund_id' => $order_refund_id
        ]);
        if (empty($detail)) {
            return $this->renderError('售后单不存在');
        }
        $detail['orderproduct']['max_refund_money'] = $detail['orderproduct']['total_pay_price'];
        // 物流公司列表
        $model = new ExpressModel();
        $expressList = $model->getAll();
        // 如果来源是小程序, 则获取小程序订阅消息id.获取售后通知.
        $template_arr = MessageModel::getMessageByNameArr($platform, ['order_refund_user']);
        // 退货地址
        $address = (new ReturnAddressModel)->getAll($detail['shop_supplier_id']);
        return $this->renderSuccess('', compact('address', 'detail', 'expressList', 'template_arr'));
    }

    /**
     * 用户发货
     */
    public function delivery($order_refund_id)
    {
        // 售后单详情
        $model = OrderRefundModel::detail([
            'user_id' => $this->user['user_id'],
            'order_refund_id' => $order_refund_id
        ]);
        if ($model->delivery($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }

    /**
     * 商家审核
     */
    public function audit($order_refund_id)
    {
        $model = OrderRefundModel::detail($order_refund_id);
        if ($model->audit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 确认收货并退款
     */
    public function receipt($order_refund_id)
    {
        if (!$this->request->isPost()) {
            return false;
        }
        $model = OrderRefundModel::detail($order_refund_id);
        if ($model->receipt($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 获取物流信息
     */
    public function express($order_refund_id)
    {
        // 订单信息
        $model = OrderRefundModel::detail($order_refund_id);
        if (!$model['send_express_no']) {
            return $this->renderError('没有物流信息');
        }
        // 获取物流信息
        $model = $model['sendexpress'];
        $express = $model->dynamic($model['express_name'], $model['express_code'], $model['send_express_no']);
        if ($express === false) {
            return $this->renderError($model->getError());
        }
        return $this->renderSuccess('', compact('express'));
    }

}