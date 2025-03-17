<?php

namespace app\api\controller\balance;

use app\api\controller\Controller;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\user\BalancePlan as BalancePlanModel;
use app\api\model\user\BalanceOrder as BalanceOrderModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\model\app\App as AppModel;

/**
 * 充值套餐
 */
class Plan extends Controller
{
    /**
     * 余额首页
     */
    public function index()
    {
        $list = (new BalancePlanModel)->getList();
        // 设置
        $settings = SettingModel::getItem('balance');
        return $this->renderSuccess('', compact('list', 'settings'));
    }

    /**
     * 充值套餐
     */
    public function submit($plan_id, $user_money)
    {
        // 用户信息
        $user = $this->getUser();
        // 生成充值订单
        $model = new BalanceOrderModel();
        $order_id = $model->createOrder($user, $plan_id, $user_money);
        if (!$order_id) {
            return $this->renderError($model->getError() ?: '购买失败');
        }
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单id
        ]);
    }

    /**
     * 立即支付
     */
    public function pay($order_id, $payType = OrderPayTypeEnum::WECHAT)
    {
        // 用户信息
        $user = $this->getUser();
        // 获取订单详情
        $model = BalanceOrderModel::getUserOrderDetail($order_id, $user['user_id']);
        $params = $this->postData();
        if ($this->request->isGet()) {
            // 开启的支付类型
            $payTypes = AppModel::getPayType($model['app_id'], $params['pay_source']);
            // 支付金额
            $payPrice = $model['pay_price'];
            return $this->renderSuccess('', compact('payTypes', 'payPrice'));
        }
        // 订单支付事件
        if ($model['pay_status']['value'] != 10) {
            return $this->renderError($model->getError() ?: '订单已支付');
        }
        // 在线支付
        $payment = BalanceOrderModel::onOrderPayment($user, $model, $payType, $params['pay_source']);
        // 返回结算信息
        return $this->renderSuccess(['success' => '支付成功', 'error' => '订单未支付'], [
            'order_id' => $order_id,   // 订单id
            'pay_type' => $payType,  // 支付方式
            'payment' => $payment,               // 微信支付参数
            'order_type' => OrderTypeEnum::BALANCE, //订单类型
            'return_Url' => $params['pay_source'] == 'h5' ? urlencode(base_url() . "h5/pages/user/my-wallet/my-wallet") : '', //h5支付跳转地址
        ]);
    }
}