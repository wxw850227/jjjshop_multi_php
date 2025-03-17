<?php

namespace app\shop\model\order;

use app\common\model\order\OrderRefund as OrderRefundModel;
use app\common\service\message\MessageService;

/**
 * 售后管理模型
 */
class OrderRefund extends OrderRefundModel
{
    /**
     * 获取售后单列表
     */
    public function getList($query = [])
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

        // 获取列表数据
        $list = $model->alias('m')
            ->field('m.*, order.order_no')
            ->with(['orderproduct.image', 'orderMaster', 'user', 'supplier'])
            ->join('order', 'order.order_id = m.order_id')
            ->order(['m.create_time' => 'desc'])
            ->paginate($query);
        return $list;
    }

    /**
     * 获取平台售后单列表
     */
    public function getplateList($query = [])
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
        if (isset($query['plate_status']) && $query['plate_status'] == -1) {
            $model = $model->where('m.plate_status', '>', 0);
        }
        if (isset($query['plate_status']) && in_array($query['plate_status'], [10, 20, 30])) {
            $model = $model->where('m.plate_status', '=', $query['plate_status']);
        }
        if (isset($query['plate_status']) && $query['plate_status'] == 40) {
            $model = $model->where('m.status', '=', 20)
                ->where('m.plate_status', '>', 10);
        }

        // 获取列表数据
        return $model->alias('m')
            ->field('m.*, order.order_no')
            ->with(['orderproduct.image', 'orderMaster', 'user', 'supplier'])
            ->join('order', 'order.order_id = m.order_id')
            ->order(['m.create_time' => 'desc'])
            ->paginate($query);
    }

    public function groupCount($query)
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

        // 获取列表数据
        return $model->alias('m')
            ->field('m.status,COUNT(*) as total')
            ->join('order', 'order.order_id = m.order_id')
            ->group('m.status')->select()->toArray();
    }

    public function plategroupCount($query)
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
        // 获取列表数据
        return $model->alias('m')
            ->field('m.plate_status,COUNT(*) as total')
            ->join('order', 'order.order_id = m.order_id')
            ->group('m.plate_status')->select()->toArray();


    }

    //获取已完成数
    public function finishcount($query)
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
        // 获取列表数据
        return $model->alias('m')
            ->join('order', 'order.order_id = m.order_id')
            ->where('m.status', '=', 20)
            ->where('m.plate_status', '>', 10)
            ->count();
    }

    /**
     * 平台审核
     */
    public function plateaudit($data)
    {
        if ($data['is_agree'] == 20 && empty($data['plate_desc'])) {
            $this->error = '请输入拒绝原因';
            return false;
        }
        $this->startTrans();
        try {
            // 拒绝申请, 标记售后单状态为已拒绝
            $data['is_agree'] == 20 && $data['status'] = 10;
            // 同意换货申请, 标记售后单状态为已完成
            //$data['is_agree'] == 10 && $this['type']['value'] == 20 && $data['status'] = 20;
            $data['plate_status'] = $data['is_agree'] == 20 ? 30 : 20;
            // 更新退款单状态
            $this->save($data);
            // 订单详情
            $order = Order::detail($this['order_id']);
            // 如果是同意退款，则直接退款
            if ($data['plate_status'] == 20) {
                if ($data['refund_money'] > $this['orderproduct']['total_pay_price']) {
                    $this->error = '退款金额不能大于商品实付款金额';
                    return false;
                }
                $this->refundMoney($order, $data);
            }
            // 发送模板消息
            (new MessageService)->refund(self::detail($this['order_refund_id']), $order['order_no'], 'audit');
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }


    /**
     * 统计售后订单
     */
    public function getRefundOrderTotal()
    {
        $filter['is_agree'] = 0;
        return $this->where($filter)->count();
    }

    /**
     * 统计售后订单
     */
    public function getPlateOrderTotal()
    {
        $filter['plate_status'] = 10;
        return $this->where($filter)->count();
    }
}