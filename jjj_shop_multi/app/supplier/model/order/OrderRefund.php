<?php

namespace app\supplier\model\order;

use app\common\model\order\OrderRefund as OrderRefundModel;

/**
 * 售后管理模型
 */
class OrderRefund extends OrderRefundModel
{
    /**
     * 获取售后单列表
     */
    public function getList($query, $shop_supplier_id = 0)
    {

        $model = $this;
        // 查询条件：订单号
        if (isset($query['order_no']) && !empty($query['order_no'])) {
            $model = $model->where('order.order_no', 'like', "%{$query['order_no']}%");
        }
        // 查询条件：起始日期
        if (isset($query['create_time']) && !empty($query['create_time'])) {
            $sta_time = array_shift($query['create_time']);
            $end_time = array_pop($query['create_time']);
            $model = $model->whereBetweenTime('m.create_time', $sta_time, date('Y-m-d 23:59:59', strtotime($end_time)));
        }
        // 售后类型
        if (isset($query['type']) && $query['type'] > 0) {
            $model = $model->where('m.type', '=', $query['type']);
        }

        // 售后单状态(选项卡)
        if (isset($query['status']) && $query['status'] >= 0) {
            $model = $model->where('m.status', '=', $query['status']);
        }
        if ($shop_supplier_id) {
            $model = $model->where('m.shop_supplier_id', '=', $shop_supplier_id);
        }

        // 获取列表数据
        $list = $model->alias('m')
            ->field('m.*, order.order_no')
            ->with(['orderproduct.image', 'orderMaster', 'user'])
            ->join('order', 'order.order_id = m.order_id')
            ->order(['m.create_time' => 'desc'])
            ->paginate($query);
        return $list;
    }

    public function groupCount($query, $shop_supplier_id = 0)
    {
        $model = $this;
        // 查询条件：订单号
        if (isset($query['order_no']) && !empty($query['order_no'])) {
            $model = $model->where('order.order_no', 'like', "%{$query['order_no']}%");
        }
        // 查询条件：起始日期
        if (isset($query['create_time']) && !empty($query['create_time'])) {
            $sta_time = array_shift($query['create_time']);
            $end_time = array_pop($query['create_time']);
            $model = $model->whereBetweenTime('m.create_time', $sta_time, $end_time);
        }
        // 售后类型
        if (isset($query['type']) && $query['type'] > 0) {
            $model = $model->where('m.type', '=', $query['type']);
        }
        if ($shop_supplier_id) {
            $model = $model->where('m.shop_supplier_id', '=', $shop_supplier_id);
        }
        // 获取列表数据
        return $model->alias('m')
            ->field('m.status,COUNT(*) as total')
            ->join('order', 'order.order_id = m.order_id')
            ->group('m.status')->select()->toArray();
    }

    /**
     * 统计售后订单
     */
    public function getRefundOrderTotal($shop_supplier_id)
    {
        $filter['is_agree'] = 0;
        $filter['shop_supplier_id'] = $shop_supplier_id;
        return $this->where($filter)->count();
    }

    /**
     * 已同意的退款
     */
    public function getRefundMoney($shop_supplier_id)
    {
        // 退款金额
        return $this->where('is_agree', '=', 10)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->sum('refund_money');
    }
}