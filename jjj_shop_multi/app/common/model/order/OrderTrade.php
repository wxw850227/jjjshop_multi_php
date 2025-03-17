<?php

namespace app\common\model\order;


use app\common\model\BaseModel;

/**
 * Class OrderTrade
 */
class OrderTrade extends BaseModel
{
    protected $name = 'order_trade';
    protected $pk = 'id';

    /**
     * 关联订单表
     */
    public function orderList()
    {
        return $this->hasMany('app\\common\\model\\order\\Order', 'order_id', 'order_id');
    }

    /**
     * 详情
     */
    public static function detail($where, $with = [])
    {
        is_array($where) ? $filter = $where : $filter['id'] = (int)$where;
        return (new static())->with($with)->where($filter)->find();
    }

    /**
     * 详情
     */
    public static function detailWithOrder($where)
    {
        $list = (new static())->where($where)->select();
        $orderList = [];
        foreach ($list as $trade){
            array_push($orderList, Order::detail($trade['order_id']));
        }
        return $orderList;
    }
}