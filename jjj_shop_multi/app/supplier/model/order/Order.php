<?php

namespace app\supplier\model\order;

use app\common\model\order\Order as OrderModel;
use app\common\enum\order\OrderTypeEnum;
use app\common\model\settings\Express as ExpressModel;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\enum\settings\DeliveryTypeEnum;
use app\shop\service\order\ExportService;
use PhpOffice\PhpSpreadsheet\IOFactory;
use think\facade\Filesystem;
use app\common\service\order\OrderCompleteService;

/**
 * 订单模型
 */
class Order extends OrderModel
{
    /**
     * 订单列表
     */
    public function getList($dataType, $data, $shop_supplier_id)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->alias('order')
            ->join('user', 'user.user_id=order.user_id')
            ->with(['product.image', 'user'])
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where($this->transferDataType($dataType))
            ->where('order.is_delete', '=', 0)
            ->field('order.*')
            ->order(['order.create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 获取订单总数
     */
    public function getCount($type, $shop_supplier_id)
    {
        // 筛选条件
        $filter = [];
        $filter['shop_supplier_id'] = $shop_supplier_id;
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
    public function getListAll($dataType, $query, $shop_supplier_id)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $query);
        // 获取数据列表
        return $model->with(['product.image', 'address', 'user', 'extract', 'extract_store'])
            ->alias('order')
            ->field('order.*')
            ->join('user', 'user.user_id = order.user_id')
            ->where('order.shop_supplier_id', '=', $shop_supplier_id)
            ->where($this->transferDataType($dataType))
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->select();
    }

    /**
     * 订单导出
     */
    public function exportList($dataType, $query, $shop_supplier_id)
    {
        // 获取订单列表
        $list = $this->getListAll($dataType, $query, $shop_supplier_id);
        // 导出excel文件
        (new Exportservice)->orderList($list);
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
            $model = $model->whereBetweenTime('order.create_time', $sta_time, $end_time);
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
    public function getReviewOrderTotal($shop_supplier_id)
    {
        $filter['pay_status'] = OrderPayStatusEnum::SUCCESS;
        $filter['delivery_status'] = 10;
        $filter['order_status'] = 10;
        $filter['shop_supplier_id'] = $shop_supplier_id;
        return $this->where($filter)->count();
    }

    /**
     * 获取某天的总销售额
     * 结束时间不传则查一天
     */
    public function getOrderTotalPrice($startDate, $endDate, $shop_supplier_id)
    {
        $model = $this;

        !is_null($startDate) && $model = $model->where('pay_time', '>=', strtotime($startDate));

        if (is_null($endDate)) {
            !is_null($startDate) && $model = $model->where('pay_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('pay_time', '<', strtotime($endDate) + 86400);
        }

        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('is_delete', '=', 0)
            ->sum('pay_price');
    }

    /**
     * 获取未结算订单金额
     */
    public function getNoSettledMoney($shop_supplier_id)
    {
        $model = $this;

        return $model->where('pay_status', '=', 20)
            ->where('order_status', '<>', 20)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('is_settled', '=', 0)
            ->where('is_delete', '=', 0)
            ->sum('supplier_money');
    }

    /**
     * 获取某天的下单用户数
     */
    public function getPayOrderUserTotal($day, $shop_supplier_id)
    {
        $startTime = strtotime($day);
        $userIds = $this->distinct(true)
            ->where('pay_time', '>=', $startTime)
            ->where('pay_time', '<', $startTime + 86400)
            ->where('pay_status', '=', 20)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
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
     * 获取视频订单
     */
    public function getAgentLiveOrder($params, $shop_supplier_id)
    {
        $model = $this;
        if (isset($params['order_no']) && !empty($params['order_no'])) {
            $model = $model->where('order.order_no', 'like', '%' . trim($params['order_no']) . '%');
        }
        if (isset($params['room_name']) && !empty($params['room_name'])) {
            $model = $model->where('room.name', 'like', '%' . trim($params['room_name']) . '%');
        }
        return $model->alias('order')->field(['order.*'])->with(['product.image', 'user', 'room.user', 'supplier'])
            ->join('live_room room', 'room.room_id = order.room_id', 'left')
            ->where('order.room_id', '>', 0)
            ->where('order.shop_supplier_id', '=', $shop_supplier_id)
            ->where('order.is_delete', '=', 0)
            ->order(['order.create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 订单列表
     */
    public function getOrderList($user_id, $data)
    {
        $model = $this;
        // 检索查询条件
        $model = $model->setWhere($model, $data);
        // 获取数据列表
        return $model->with(['product.image', 'user'])
            ->where('user_id', '=', $user_id)
            ->where('pay_status', '=', 20)
            ->order(['create_time' => 'desc'])
            ->limit(5)
            ->select();
    }

    /**
     * 批量发货
     */
    public function batchDelivery($fileInfo, $shop_supplier_id)
    {
        try {
            $saveName = Filesystem::disk('public')->putFile('', $fileInfo);
            $savePath = public_path() . "uploads/{$saveName}";
            //载入excel表格
            $inputFileType = IOFactory::identify($savePath); //传入Excel路径
            $reader = IOFactory::createReader($inputFileType);
            $PHPExcel = $reader->load($savePath);

            $sheet = $PHPExcel->getSheet(0); // 读取第一個工作表
            // 遍历并记录订单信息
            $list = [];
            $orderList = [];
            foreach ($sheet->toArray() as $key => $val) {
                if ($key > 0) {
                    if ($val[19] && $val[20]) {
                        // 查找发货公司是否存在
                        $express = ExpressModel::findByName(trim($val[19]));
                        $order = self::detail(['order_no' => trim($val[0])], ['user', 'address', 'product', 'express']);
                        if ($express && $order) {
                            if ($order['shop_supplier_id'] == $shop_supplier_id) {
                                $list[] = [
                                    'data' => [
                                        'express_no' => trim($val[20]),
                                        'express_id' => $express['express_id'],
                                        'delivery_status' => 20,
                                        'delivery_time' => time(),
                                    ],
                                    'where' => [
                                        'order_id' => $order['order_id']
                                    ],
                                ];
                            }
                            array_push($orderList, $order);
                        }
                    }
                }
            }
            if (count($list) > 0) {
                $this->updateAll($list);
                // 发送消息通知
                $this->sendDeliveryMessage($orderList);
            }
            unlink($savePath);
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 确认发货（虚拟订单）
     * @param $extractClerkId
     * @return bool|mixed
     */
    public function virtual($data)
    {
        if (
            $this['pay_status']['value'] != 20
            || $this['delivery_type']['value'] != DeliveryTypeEnum::NO_EXPRESS
            || $this['delivery_status']['value'] == 20
            || in_array($this['order_status']['value'], [20, 21])
        ) {
            $this->error = '该订单不满足发货条件';
            return false;
        }
        return $this->transaction(function () use ($data) {
            // 更新订单状态：已发货、已收货
            $status = $this->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => 30,
                'virtual_content' => $data['virtual_content'],
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$this], $this['app_id']);
            $this->sendWxExpress('', '');
            return $status;
        });
    }

    /**
     * 微信发货
     */
    public function wxDelivery()
    {
        if ($this['pay_source'] != 'wx'
            || $this['delivery_status']['value'] != 20
            || $this['order_status']['value'] != 10) {
            $this->error = '订单状态错误';
            return false;
        }
        if ($this['wx_delivery_status'] != 10) {
            $this->error = '订单已发货';
            return false;
        }
        $this->startTrans();
        try {
            // 订单同步到微信
            $result = $this->sendWxExpress($this['express_id'], $this['express_no']);
            if (!$result) {
                $this->error = '发货失败';
                return false;
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }
}