<?php

namespace app\api\service\order\paysuccess\type;

use app\api\model\user\User as UserModel;
use app\api\model\plus\live\PlanOrder as OrderModel;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\enum\user\balanceLog\BalanceLogSceneEnum;
use app\common\model\user\BalanceLog as BalanceLogModel;
use app\common\service\BaseService;
use app\common\model\plus\live\GiftLog as GiftLogModel;
use app\common\enum\user\GiftLogSceneEnum;

/**
 * 礼物充值订单支付成功服务类
 */
class PlanPaySuccessService extends BaseService
{
    // 订单模型
    public $model;

    // 当前用户信息
    private $user;

    /**
     * 构造函数
     */
    public function __construct($orderNo, $pay_status = 10)
    {
        // 实例化订单模型
        $this->model = OrderModel::getPayDetail($orderNo, $pay_status);
        // 获取用户信息
        $this->user = UserModel::detail($this->model['user_id']);
    }

    /**
     * 返回app_id，大于0则存在订单信息
     */
    public function isExist()
    {
        if ($this->model) {
            return $this->model['app_id'];
        }
        return 0;
    }

    /**
     * 订单支付成功业务处理
     */
    public function onPaySuccess($payType, $payData = [])
    {
        if (empty($this->model)) {
            $this->error = '未找到该订单信息';
            return false;
        }
        // 更新付款状态
        return $this->updatePayStatus($payType, $payData);
    }

    /**
     * 更新付款状态
     */
    private function updatePayStatus($payType, $payData = [])
    {
        // 事务处理
        $this->model->transaction(function () use ($payType, $payData) {
            // 更新订单状态
            $this->updateOrderInfo($payType, $payData);
            // 记录订单支付信息
            $this->updatePayInfo();
        });
        return true;
    }

    /**
     * 更新订单记录
     */
    private function updateOrderInfo($payType, $payData)
    {
        // 整理订单信息
        $pay_source = '';
        if (isset($payData['attach'])) {
            $attach = json_decode($payData['attach'], true);
            $pay_source = isset($attach['pay_source']) ? $attach['pay_source'] : '';
        }

        $order = [
            'pay_type' => $payType,
            'pay_status' => 20,
            'pay_time' => time(),
            'pay_source' => $pay_source
        ];
        if ($payType == OrderPayTypeEnum::WECHAT) {
            $order['transaction_id'] = $payData['transaction_id'];
        }
        // 更新订单状态
        return $this->model->save($order);
    }

    /**
     * 记录订单支付信息
     */
    private function updatePayInfo()
    {
        // 余额支付
        if ($this->model['balance'] > 0) {
            BalanceLogModel::add(BalanceLogSceneEnum::CONSUME, [
                'user_id' => $this->user['user_id'],
                'money' => -$this->model['balance'],
            ], ['order_no' => $this->model['order_no']]);
            // 更新用户礼物币
            (new UserModel())->where('user_id', '=', $this->user['user_id'])
                ->inc('gift_money', $this->model['total_money'])
                ->dec('balance', $this->model['balance'])
                ->update();
        }
        GiftLogModel::add(GiftLogSceneEnum::RECHARGE, [
            'user_id' => $this->user['user_id'],
            'money' => $this->model['total_money'],
            'app_id' => $this->model['app_id'],
        ], ['order_no' => $this->model['order_no']]);
    }

}