<?php

namespace app\common\service\order;

use app\common\model\order\Order as OrderModel;
/**
 * 订单服务类
 */
class OrderService
{

    /**
     * 生成订单号
     */
    public static function createOrderNo()
    {
        return date('Ymd') . substr(implode('', array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);
    }

    /**
     * 整理订单列表 (根据order_type获取不同类型的订单记录)
     */
    public static function getOrderList($data, $orderIndex = 'order', $with = [])
    {
        // 整理订单id
        $orderIds = [];
        foreach ($data as &$item) {
            $orderIds[$item['order_type']['value']][] = $item['order_id'];
        }
        // 获取订单列表
        $orderList = [];
        foreach ($orderIds as $orderType => $values) {
            $model = new OrderModel();
            $orderList[$orderType] = $model->getListByIds($values, $with);
        }
        // 格式化到数据源
        foreach ($data as $key => &$item) {
            if (!isset($orderList[$item['order_type']['value']][$item['order_id']])) {
                $item->delete();
                unset($data[$key]);
                continue;
            }
            $item[$orderIndex] = $orderList[$item['order_type']['value']][$item['order_id']];
        }
        return $data;
    }

}