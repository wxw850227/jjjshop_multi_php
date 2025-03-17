<?php

namespace app\supplier\model\order;

use app\common\model\order\OrderSettled as OrderSettledModel;

/**
 * 售后管理模型
 */
class OrderSettled extends OrderSettledModel
{
    /**
     * 获取售后单列表
     */
    public function getList($shop_supplier_id, $params)
    {
        $model = $this;
        // 查询条件：订单号
        if (isset($params['order_no']) && !empty($params['order_no'])) {
            $model = $model->where('order.order_no', 'like', "%{$params['order_no']}%");
        }
        if(isset($params['start_day']) && !empty($params['start_day'])){
            $model = $model->where('settled.create_time', '>=', strtotime($params['start_day']));
        }
        if(isset($params['end_day']) && !empty($params['end_day'])){
            $model = $model->where('settled.create_time', '<', strtotime($params['end_day']));
        }
        // 是否结算
        if (isset($params['is_settled']) && $params['is_settled'] > -1) {
            $model = $model->where('settled.is_settled', '=', $params['is_settled']);
        }

        // 获取列表数据
        return $model->alias('settled')->field('settled.*')
            ->with(['orderMaster'])
            ->join('order', 'order.order_id = settled.order_id')
            ->where('settled.shop_supplier_id', '=', $shop_supplier_id)
            ->order(['settled.create_time' => 'desc'])
            ->paginate($params);
    }
    /**
     * 获取支出分销佣金
     */
    public function getAgentMoney($shop_supplier_id)
    {
        // 退款金额
        return $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->sum('agent_money');
    }
}