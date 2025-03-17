<?php

namespace app\shop\model\order;

use app\common\model\order\OrderSettled as OrderSettledModel;

/**
 * 订单结算模型
 */
class OrderSettled extends OrderSettledModel
{
    /**
     * 获取数据概况
     */
    public function getSettledData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $data = [
            // 供应商结算
            'real_supplier_money' => [
                'today' => number_format($this->getDatas(null, $today, 'real_supplier_money')),
                'yesterday' => number_format($this->getDatas(null, $yesterday, 'real_supplier_money'))
            ],
            // 平台提成
            'real_sys_money' => [
                'today' => number_format($this->getDatas($today, null, 'real_sys_money')),
                'yesterday' => number_format($this->getDatas($yesterday, null, 'real_sys_money'))
            ],
            // 退款金额
            'refund_money' => [
                'today' => number_format($this->getDatas($today, null, 'refund_money')),
                'yesterday' => number_format($this->getDatas($yesterday, null, 'refund_money'))
            ],
        ];
        return $data;
    }

    /**
     * 按日期获取结算数据
     */
    public function getSettledDataByDate($days){
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'real_supplier_money' => $this->getDatas($day, null, 'real_supplier_money'),
                'real_sys_money' => $this->getDatas($day, null, 'real_sys_money'),
                'agent_money' => $this->getDatas($day, null, 'agent_money'),
                'refund_money' => $this->getDatas($day, null, 'refund_money')
            ];
        }
        return $data;
    }
    /**
     * 获取供应商统计数量
     */
    public function getDatas($startDate = null, $endDate = null, $type = 'real_supplier_money')
    {
        $model = $this;
        if(!is_null($startDate)){
            $model = $model->where('create_time', '>=', strtotime($startDate));
        } else{
            $model = $model->where('create_time', '>=', strtotime($endDate) - 86400);
        }
        if(is_null($endDate)){
            $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        }else{
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }
        if($type == 'real_supplier_money'){
            return $model->sum('real_supplier_money');
        } else if($type == 'real_sys_money'){
            return $model->sum('real_sys_money');
        } else if($type == 'agent_money'){
            return $model->sum('agent_money');
        } else if($type == 'refund_money'){
            return $model->sum('refund_money');
        }
        return 0;
    }


    /**
     * 获取售后单列表
     */
    public function getList($params)
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
            ->with(['orderMaster', 'supplier'])
            ->join('order', 'order.order_id = settled.order_id')
            ->order(['settled.create_time' => 'desc'])
            ->paginate($params);
    }
}