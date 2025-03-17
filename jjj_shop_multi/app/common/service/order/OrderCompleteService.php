<?php

namespace app\common\service\order;

use app\common\library\helper;
use app\common\model\settings\Setting;
use app\common\model\supplier\Capital as SupplierCapitalModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\user\User as UserModel;
use app\common\model\settings\Setting as SettingModel;
use app\common\model\user\PointsLog as PointsLogModel;
use app\common\enum\order\OrderTypeEnum;
use app\common\model\order\OrderSettled as OrderSettledModel;
/**
 * 已完成订单结算服务类
 */
class OrderCompleteService
{
    // 订单类型
    private $orderType;

    /**
     * 订单模型类
     * @var array
     */
    private $orderModelClass = [
        OrderTypeEnum::MASTER => 'app\common\model\order\Order',
    ];

    // 模型
    private $model;

    /* @var UserModel $model */
    private $UserModel;

    private $supplierModel;
    /**
     * 构造方法
     */
    public function __construct($orderType = OrderTypeEnum::MASTER)
    {
        $this->orderType = $orderType;
        $this->model = $this->getOrderModel();
        $this->UserModel = new UserModel;
        $this->supplierModel = new SupplierModel();
    }

    /**
     * 初始化订单模型类
     */
    private function getOrderModel()
    {
        $class = $this->orderModelClass[$this->orderType];
        return new $class;
    }

    /**
     * 执行订单完成后的操作
     */
    public function complete($orderList, $appId)
    {
        // 已完成订单结算
        // 条件：后台订单流程设置 - 已完成订单设置0天不允许申请售后
        if (SettingModel::getItem('trade', $appId)['order']['refund_days'] == 0) {
            $this->settled($orderList);
        }
        return true;
    }

    /**
     * 执行订单结算
     */
    public function settled($orderList)
    {
        // 订单id集
        $orderIds = helper::getArrayColumn($orderList, 'order_id');
        // 累积用户实际消费金额
        $this->setIncUserExpend($orderList);
        // 处理订单赠送的积分
        $this->setGiftPointsBonus($orderList);
        // 将订单设置为已结算
        $this->model->onBatchUpdate($orderIds, ['is_settled' => 1]);
        // 供应商结算
        $this->setIncSupplierMoney($orderList);
        return true;
    }

    /**
     * 供应商金额=支付金额-运费
     */
    private function setIncSupplierMoney($orderList)
    {
        // 计算并累积实际消费金额(需减去售后退款的金额)
        $supplierData = [];
        $supplierCapitalData = [];
        // 订单结算记录
        $orderSettledData = [];
        foreach ($orderList as $order) {
            if($order['shop_supplier_id'] == 0){
                continue;
            }
            // 供应价格+运费
            $supplierMoney = $order['supplier_money'];
            $sysMoney = $order['sys_money'];
            // B2b模式，如果有参与分销，减去分销的佣金
            // 商城设置
            $settings = Setting::getItem('store');
            $refundSupplierMoney = 0;
            $refundSysMoney = 0;
            // 减去订单退款的金额
            foreach ($order['product'] as $product) {
                if (
                    !empty($product['refund'])
                    && $product['refund']['type']['value'] == 10      // 售后类型：退货退款
                    && $product['refund']['is_agree']['value'] == 10  // 商家审核：已同意
                ) {
                    $supplierMoney -= $product['supplier_money'];
                    $sysMoney -= $product['sys_money'];
                    $refundSupplierMoney += $product['supplier_money'];
                    $refundSysMoney += $product['sys_money'];
                }
            }

            !isset($supplierData[$order['shop_supplier_id']]) && $supplierData[$order['shop_supplier_id']] = 0.00;
            $supplierMoney > 0 && $supplierData[$order['shop_supplier_id']] += $supplierMoney;
            $orderSettledData[] = [
                'order_id' => $order['order_id'],
                'shop_supplier_id' => $order['shop_supplier_id'],
                'order_money' => $order['order_price'],
                'pay_money' => $order['pay_price'],
                'express_money' => $order['express_price'],
                'supplier_money' => $order['supplier_money'],
                'real_supplier_money' => $supplierMoney,
                'sys_money' => $order['sys_money'],
                'real_sys_money' => $sysMoney,
                'refund_money' => $refundSupplierMoney + $refundSysMoney,
                'refund_supplier_money' => $refundSupplierMoney,
                'refund_sys_money' => $refundSysMoney,
                'app_id' => $order['app_id']
            ];
            // 商家结算记录
            $supplierCapitalData[] = [
                'shop_supplier_id' => $order['shop_supplier_id'],
                'money' => $supplierMoney,
                'describe' => '订单结算，订单号：' . $order['order_no'],
                'app_id' => $order['app_id']
            ];
        }
        // 累积到供应商表记录
        $this->supplierModel->onBatchIncSupplierMoney($supplierData);
        // 修改平台结算金额
        (new OrderSettledModel())->saveAll($orderSettledData);
        // 供应商结算明细金额
        (new SupplierCapitalModel())->saveAll($supplierCapitalData);
        return true;
    }
    /**
     * 处理订单赠送的积分
     */
    private function setGiftPointsBonus($orderList)
    {
        // 计算用户所得积分
        $userData = [];
        $logData = [];
        foreach ($orderList as $order) {
            // 计算用户所得积分
            $pointsBonus = $order['points_bonus'];
            if ($pointsBonus <= 0) continue;
            // 减去订单退款的积分
            foreach ($order['product'] as $product) {
                if (
                    !empty($product['refund'])
                    && $product['refund']['type']['value'] == 10      // 售后类型：退货退款
                    && $product['refund']['is_agree']['value'] == 10  // 商家审核：已同意
                ) {
                    $pointsBonus -= $product['points_bonus'];
                }
            }
            // 计算用户所得积分
            !isset($userData[$order['user_id']]) && $userData[$order['user_id']] = 0;
            $userData[$order['user_id']] += $pointsBonus;
            // 整理用户积分变动明细
            $logData[] = [
                'user_id' => $order['user_id'],
                'value' => $pointsBonus,
                'describe' => "订单赠送：{$order['order_no']}",
                'app_id' => $order['app_id'],
            ];
        }
        if (!empty($userData)) {
            // 累积到会员表记录
            $this->UserModel->onBatchIncPoints($userData);
            // 批量新增积分明细记录
            (new PointsLogModel)->onBatchAdd($logData);
        }
        return true;
    }

    /**
     * 累积用户实际消费金额
     */
    private function setIncUserExpend($orderList)
    {
        // 计算并累积实际消费金额(需减去售后退款的金额)
        $userData = [];
        foreach ($orderList as $order) {
            // 订单实际支付金额
            $expendMoney = $order['pay_price'];
            // 减去订单退款的金额
            foreach ($order['product'] as $product) {
                if (
                    !empty($product['refund'])
                    && $product['refund']['type']['value'] == 10      // 售后类型：退货退款
                    && $product['refund']['is_agree']['value'] == 10  // 商家审核：已同意
                ) {
                    $expendMoney -= $product['refund']['refund_money'];
                }
            }
            !isset($userData[$order['user_id']]) && $userData[$order['user_id']] = 0.00;
            $expendMoney > 0 && $userData[$order['user_id']] += $expendMoney;
        }
        // 累积到会员表记录
        $this->UserModel->onBatchIncExpendMoney($userData);
        return true;
    }

}