<?php

namespace app\job\model\order;

use app\common\model\order\Order as OrderModel;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 获取订单列表
     */
    public function getCloseList($with)
    {
        return $this->with($with)
            ->where('pay_status', '=', 10)
            ->where('order_status', '=', 10)
            ->where('pay_end_time', '<=', time())
            ->where('pay_end_time', '>', 0)
            ->where('is_delete', '=', 0)
            ->where('order_source', '<>', 70)
            ->select();
    }

    /**
     * 获取订单列表
     */
    public function getSettledList($deadlineTime, $with, $app_id)
    {
        return $this->with($with)
            ->where('order_status', '=', 30)
            ->where('receipt_time', '<=', $deadlineTime)
            ->where('is_settled', '=', 0)
            ->where('app_id', '=', $app_id)
            ->select();
    }

    /**
     * 获取订单列表
     */
    public function getReceiveList($orderIds, $with = [])
    {
        return $this->with($with)
            ->where('order_id', 'in', $orderIds)
            ->select();
    }

}
