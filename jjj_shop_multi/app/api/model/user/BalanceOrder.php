<?php

namespace app\api\model\user;

use app\api\service\order\PaymentService;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\order\OrderTypeEnum;
use app\common\exception\BaseException;
use app\api\model\user\BalancePlan as PlanModel;
use app\common\model\user\BalanceOrder as BalanceOrderModel;

/**
 * 充值模型
 */
class BalanceOrder extends BalanceOrderModel
{
    /**
     * 创建订单
     */
    public function createOrder($user, $plan_id, $user_money)
    {
        // 获取订单数据
        $data = [
            'order_no' => $this->orderNo(),
            'user_id' => $user['user_id'],
            'app_id' => self::$app_id
        ];
        if ($plan_id > 0) {
            $plan = PlanModel::detail($plan_id);
            $data['type'] = 20;
            $data['plan_id'] = $plan_id;
            $data['pay_price'] = $plan['money'];
            $data['give_money'] = $plan['give_money'];
            $data['real_money'] = $plan['real_money'];
            $this->buildSnapshot($data, $plan);
        } else {
            $data['type'] = 10;
            $data['pay_price'] = $user_money;
            // 匹配套餐
            $plan = $this->getPlan($user_money);
            if ($plan != null) {
                $data['plan_id'] = $plan['plan_id'];
                $data['give_money'] = $plan['give_money'];
                $data['real_money'] = $user_money + $plan['give_money'];
                $this->buildSnapshot($data, $plan);
            } else {
                $data['real_money'] = $user_money;
            }
        }
        $this->save($data);
        return $this['order_id'];
    }

    /**
     * 套餐快照
     */
    private function buildSnapshot(&$data, $plan)
    {
        $data['snapshot'] = json_encode([
            'plan_id' => $plan['plan_id'],
            'plan_name' => $plan['plan_name'],
            'pay_price' => $plan['money'],
            'give_money' => $plan['gift_money'],
            'real_money' => $plan['real_money']
        ]);
    }

    /**
     * 自定义金额匹配套餐
     */
    private function getPlan($user_money)
    {
        $list = (new PlanModel())->getList();
        $plan = null;
        foreach ($list as $item) {
            if ($user_money > $item['money']) {
                $plan = $item;
            } else {
                break;
            }
        }
        return $plan;
    }

    /**
     * 待支付订单详情
     */
    public static function getPayDetail($orderNo, $pay_status)
    {
        $model = new static();
        $model = $model->where('order_no', '=', $orderNo);
        if ($pay_status > 0) {
            $model = $model->where('pay_status', '=', 10);
        }
        return $model->with(['user'])->find();
    }

    /**
     * 订单详情
     */
    public static function getUserOrderDetail($order_id, $user_id)
    {
        $model = new static();
        $order = $model->where(['order_id' => $order_id, 'user_id' => $user_id])->find();
        if (empty($order)) {
            throw new BaseException(['msg' => '订单不存在']);
        }
        return $order;
    }

    /**
     * 构建支付请求的参数
     */
    public static function onOrderPayment($user, $order, $payType, $pay_source)
    {
        if ($payType == OrderPayTypeEnum::WECHAT) {
            return self::onPaymentByWechat($user, $order, $pay_source);
        }
        return [];
    }

    /**
     * 构建微信支付请求
     */
    protected static function onPaymentByWechat($user, $order, $pay_source)
    {
        return PaymentService::wechat(
            $user,
            $order['order_no'],
            OrderTypeEnum::BALANCE,
            $pay_source,
            $order['pay_price']
        );
    }

}
