<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\order\Order as OrderModel;
use app\api\model\settings\Setting as SettingModel;
use app\common\service\qrcode\ExtractService;
use app\common\model\supplier\Service as ServiceModel;
use app\common\model\supplier\User as SupplierUserModel;
use app\common\model\app\App as AppModel;
use app\common\enum\order\OrderTypeEnum;

/**
 * 我的订单
 */
class Order extends Controller
{
    // user
    private $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();   // 用户信息

    }

    /**
     * 我的订单列表
     */
    public function lists($dataType)
    {
        $data = $this->postData();
        $model = new OrderModel;
        $list = $model->getList($this->user['user_id'], $dataType, $data);
        $app = AppModel::detail();
        $mch_id = $app['mchid'];
        return $this->renderSuccess('', compact('list', 'mch_id'));
    }

    /**
     * 订单详情信息
     */
    public function detail($order_id, $pay_source = '')
    {
        // 订单详情
        $model = OrderModel::getUserOrderDetail($order_id, $this->user['user_id']);
        // 剩余支付时间
        if ($model['pay_status']['value'] == 10 && $model['order_status']['value'] != 20 && $model['pay_end_time'] != 0) {
            $model['pay_end_time'] = $this->formatPayEndTime($model['pay_end_time'] - time());
        } else {
            $model['pay_end_time'] = '';
        }
        // 该订单是否允许申请售后
        $model['isAllowRefund'] = $model->isAllowRefund();
        $model['supplier']['supplier_user_id'] = (new SupplierUserModel())->where('shop_supplier_id', '=', $model['shop_supplier_id'])->value('supplier_user_id');
        $app = AppModel::detail();
        $mch_id = $app['mchid'];
        return $this->renderSuccess('', [
            'order' => $model,  // 订单详情
            'setting' => [
                // 积分名称
                'points_name' => SettingModel::getPointsName(),
                //店铺客服信息
                'mp_service' => ServiceModel::detail($model['shop_supplier_id']),
            ],
            'mch_id' => $mch_id
        ]);
    }

    /**
     * 支付成功详情信息
     */
    public function paySuccess($order_id)
    {
        $order_arr = explode(',', $order_id);
        $order = [
            'pay_price' => 0,
            'points_bonus' => 0
        ];
        foreach ($order_arr as $id) {
            $model = OrderModel::getUserOrderDetail($id, $this->user['user_id']);
            $order['pay_price'] += $model['pay_price'];
            $order['points_bonus'] += $model['points_bonus'];
        }
        $order['pay_price'] = round($order['pay_price'], 2);
        return $this->renderSuccess('', compact('order'));
    }

    /**
     * 获取物流信息
     */
    public function express($order_id)
    {
        // 订单信息
        $order = OrderModel::getUserOrderDetail($order_id, $this->user['user_id']);
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
     * 取消订单
     */
    public function cancel($order_id)
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->user['user_id']);
        if ($model->cancel($this->user)) {
            return $this->renderSuccess('订单取消成功');
        }
        return $this->renderError($model->getError() ?: '订单取消失败');
    }

    /**
     * 确认收货
     */
    public function receipt($order_id)
    {
        $model = OrderModel::getUserOrderDetail($order_id, $this->user['user_id']);
        if ($model->receipt()) {
            return $this->renderSuccess('收货成功');
        }
        return $this->renderError($model->getError() ?: '收货失败');
    }

    /**
     * 立即支付
     */
    public function pay()
    {
        $params = $this->postData();
        $payDetail = OrderModel::orderInfo($params['order_id'], $this->user);
        if ($this->request->isGet()) {
            // 开启的支付类型
            $payTypes = AppModel::getPayType($payDetail['app_id'], $params['pay_source']);
            // 支付金额
            $payPrice = $payDetail['pay_price'];
            $balance = $this->user['balance'];
            return $this->renderSuccess('', compact('payTypes', 'payPrice', 'balance'));
        }
        // 订单支付事件
        $model = new OrderModel;
        if (!$model->onPay($params, $this->user)) {
            return $this->renderError($model->getError() ?: '订单支付失败');
        }
        // 构建支付请求
        $payInfo = $model->OrderPay($this->getUser(), $params);
        if (!$payInfo) {
            return $this->renderError($model->getError() ?: '订单支付失败');
        }
        // 支付状态提醒
        return $this->renderSuccess('', [
            'order_id' => $payInfo['order_id'],   // 订单id
            'pay_type' => $payInfo['payType'],  // 支付方式
            'payment' => $payInfo['payment'],   // 微信支付参数
            'order_type' => OrderTypeEnum::MASTER, //订单类型
            'use_balance' => $payInfo['use_balance'],// 是否使用余额
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/order/myorder") : '', //h5支付跳转地址
        ]);
    }

    /**
     * 获取订单核销二维码
     */
    public function qrcode($order_id, $source)
    {
        // 订单详情
        $order = OrderModel::getUserOrderDetail($order_id, $this->user['user_id']);
        // 判断是否为待核销订单
        if (!$order->checkExtractOrder($order)) {
            return $this->renderError($order->getError());
        }
        $Qrcode = new ExtractService(
            $this->app_id,
            $this->user,
            $order_id,
            $source,
            $order['order_no']
        );
        return $this->renderSuccess('', [
            'qrcode' => $Qrcode->getImage(),
        ]);
    }

    private function formatPayEndTime($leftTime)
    {
        if ($leftTime <= 0) {
            return '';
        }

        $str = '';
        $day = floor($leftTime / 86400);
        $hour = floor(($leftTime - $day * 86400) / 3600);
        $min = floor((($leftTime - $day * 86400) - $hour * 3600) / 60);

        if ($day > 0) $str .= $day . '天';
        if ($hour > 0) $str .= $hour . '小时';
        if ($min > 0) $str .= $min . '分钟';
        return $str;
    }
}