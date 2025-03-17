<?php

namespace app\shop\model\order;

use app\common\model\order\Order as OrderModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\shop\service\order\ExportService;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 订单列表
     */
    public function getList($dataType, $data = null)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->alias('order')
            ->join('user', 'user.user_id=order.user_id')
            ->with(['product' => ['image', 'refund'], 'user', 'supplier'])
            ->where('order.is_delete', '=', 0)
            ->where($this->transferDataType($dataType))
            ->field('order.*')
            ->order(['order.create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 获取订单总数
     */
    public function getCount($type = 'all')
    {
        // 筛选条件
        $filter = [];
        // 订单数据类型
        switch ($type) {
            case 'all':
                break;
            case 'payment';
                $filter['pay_status'] = OrderPayStatusEnum::PENDING;
                $filter['order_status'] = 10;
                break;
            case 'delivery';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_status'] = 10;
                $filter['order_status'] = 10;
                break;
            case 'received';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_status'] = 20;
                $filter['receipt_status'] = 10;
                $filter['order_status'] = 10;
                break;
            case 'cancel';
                $filter['order_status'] = 21;
                break;

        }
        return $this->where($filter)->count();
    }

    /**
     * 订单列表(全部)
     */
    public function getListAll($dataType, $query = [])
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $query);
        // 获取数据列表
        return $model->with(['product.image', 'address', 'user', 'extract', 'extract_store'])
            ->alias('order')
            ->field('order.*')
            ->join('user', 'user.user_id = order.user_id')
            ->where($this->transferDataType($dataType))
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->select();
    }

    /**
     * 订单导出
     */
    public function exportList($dataType, $query)
    {
        // 获取订单列表
        $list = $this->getListAll($dataType, $query);
        // 导出excel文件
        return (new Exportservice)->orderList($list);
    }

    /**
     * 设置检索查询条件
     */
    private function setWhere($model, $data)
    {
        //搜索订单号
        if (isset($data['order_no']) && $data['order_no'] != '') {
            $model = $model->where('order_no', 'like', '%' . trim($data['order_no']) . '%');
        }
        //搜索自提门店
        if (isset($data['store_id']) && $data['store_id'] != '') {
            $model = $model->where('extract_store_id', '=', $data['store_id']);
        }
        //搜索配送方式
        if (isset($data['style_id']) && $data['style_id'] != '') {
            $model = $model->where('delivery_type', '=', $data['style_id']);
        }
        //搜索时间段
        if (isset($data['create_time']) && $data['create_time'] != '') {
            $sta_time = array_shift($data['create_time']);
            $end_time = array_pop($data['create_time']);
            $model = $model->whereBetweenTime('order.create_time', $sta_time, date('Y-m-d 23:59:59', strtotime($end_time)));
        }
        //搜索配送方式
        if (isset($data['search']) && $data['search']) {
            $model = $model->where('user.user_id|user.nickName|user.mobile', 'like', '%' . $data['search'] . '%');
        }
        return $model;
    }

    /**
     * 转义数据类型条件
     */
    private function transferDataType($dataType)
    {
        $filter = [];
        // 订单数据类型
        switch ($dataType) {
            case 'all':
                break;
            case 'payment';
                $filter['pay_status'] = OrderPayStatusEnum::PENDING;
                $filter['order_status'] = 10;
                break;
            case 'delivery';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_status'] = 10;
                $filter['order_status'] = 10;
                break;
            case 'received';
                $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
                $filter['delivery_status'] = 20;
                $filter['receipt_status'] = 10;
                $filter['order_status'] = 10;
                break;
            case 'comment';
                $filter['is_comment'] = 0;
                $filter['order_status'] = 30;
                break;
            case 'complete';
                $filter['is_comment'] = 1;
                $filter['order_status'] = 30;
                break;
            case 'cancel';
                $filter['order_status'] = 21;
                break;
        }
        return $filter;
    }

    /**
     * 获取待处理订单
     */
    public function getReviewOrderTotal()
    {
        $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
        $filter['delivery_status'] = 10;
        $filter['order_status'] = 10;
        return $this->where($filter)->count();
    }

    /**
     * 获取某天的总销售额
     * 结束时间不传则查一天
     */
    public function getOrderTotalPrice($startDate = null, $endDate = null)
    {
        $model = $this;
        $model = $model->where('pay_time', '>=', strtotime($startDate));
        if (is_null($endDate)) {
            $model = $model->where('pay_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }
        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0)
            ->sum('pay_price');
    }

    /**
     * 获取某天的客单价
     * 结束时间不传则查一天
     */
    public function getOrderPerPrice($startDate = null, $endDate = null)
    {
        $model = $this;
        $model = $model->where('pay_time', '>=', strtotime($startDate));
        if (is_null($endDate)) {
            $model = $model->where('pay_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }
        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0)
            ->avg('pay_price');
    }

    /**
     * 获取某天的下单用户数
     */
    public function getPayOrderUserTotal($day)
    {
        $startTime = strtotime($day);
        $userIds = $this->distinct(true)
            ->where('pay_time', '>=', $startTime)
            ->where('pay_time', '<', $startTime + 86400)
            ->where('pay_status', '=', 20)
            ->where('is_delete', '=', 0)
            ->column('user_id');
        return count($userIds);
    }

    /**
     * 获取兑换记录
     * @param $param array
     * @return \think\Paginator
     */
    public function getExchange($param)
    {
        $model = $this;
        if (isset($param['order_status']) && $param['order_status'] > -1) {
            $model = $model->where('order.order_status', '=', $param['order_status']);
        }
        if (isset($param['nickName']) && !empty($param['nickName'])) {
            $model = $model->where('user.nickName', 'like', '%' . trim($param['nickName']) . '%');
        }

        return $model->with(['user'])->alias('order')
            ->join('user', 'user.user_id = order.user_id')
            ->where('order.order_source', '=', 20)
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->paginate($param);
    }

    /**
     * 获取平台的总销售额
     */
    public function getTotalMoney($type = 'all', $is_settled = -1)
    {
        $model = $this;
        $model = $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('is_delete', '=', 0);
        if ($is_settled == 0) {
            $model = $model->where('is_settled', '=', 0);
        }
        if ($type == 'all') {
            return $model->sum('pay_price');
        } else if ($type == 'supplier') {
            return $model->sum('supplier_money');
        } else if ($type == 'sys') {
            return $model->sum('sys_money');
        }
        return 0;
    }

    /**
     * 获取视频订单
     */
    public function getAgentLiveOrder($params)
    {
        $model = $this;
        if (isset($params['order_no']) && !empty($params['order_no'])) {
            $model = $model->where('order.order_no', 'like', '%' . trim($params['order_no']) . '%');
        }
        if (isset($params['room_name']) && !empty($params['room_name'])) {
            $model = $model->where('room.name', 'like', '%' . trim($params['room_name']) . '%');
        }
        if (isset($params['nickName']) && !empty($params['nickName'])) {
            $model = $model->where('user.nickName', 'like', '%' . trim($params['real_name']) . '%');
        }
        if (isset($params['supplier_name']) && !empty($params['supplier_name'])) {
            $model = $model->where('supplier.name', 'like', '%' . trim($params['supplier_name']) . '%');
        }
        return $model->alias('order')->field(['order.*'])->with(['product.image', 'user', 'room.user', 'supplier'])
            ->join('live_room room', 'room.room_id = order.room_id', 'left')
            ->join('supplier supplier', 'supplier.shop_supplier_id = room.shop_supplier_id', 'left')
            ->join('user user', 'user.user_id = room.user_id', 'left')
            ->where('order.room_id', '>', 0)
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->paginate($params);
    }
}