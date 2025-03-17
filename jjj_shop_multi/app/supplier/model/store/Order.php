<?php


namespace app\supplier\model\store;

use app\common\model\store\Order as OrderModel;
use app\common\service\order\OrderService;

/**
 * 店员模型
 */
class Order extends OrderModel
{
    /**
     * 获取列表数据
     */
    public function getList($store_id, $search, $params)
    {
        $model = $this;
        if ($store_id > 0) {
            $model = $model->where('clerk.store_id', '=', (int)$store_id);
        }
        if (!empty($search)) {
            $model = $model->where('clerk.real_name', 'like', '%' . $search . '%');
        }
        $model = $model->where('order.shop_supplier_id', '=', $params['shop_supplier_id']);
        // 查询列表数据
        $data = $model->with(['store', 'clerk'])
            ->alias('order')
            ->field(['order.*'])
            ->join('store_clerk clerk', 'clerk.clerk_id = order.clerk_id', 'INNER')
            ->order(['order.create_time' => 'desc'])
            ->paginate($params);
        if ($data->isEmpty()) {
            return $data;
        }
        // 整理订单信息
        return OrderService::getOrderList($data);
    }

}