<?php

namespace app\common\model\order;


use app\common\model\BaseModel;

/**
 * 订单结算记录
 */
class OrderSettled extends BaseModel
{
    protected $name = 'order_settled';
    protected $pk = 'settled_id';

    /**
     * 关联订单主表
     */
    public function orderMaster()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id')->field(['shop_supplier_id', 'name']);
    }
    /**
     * 详情
     */
    public static function detail($settled_id)
    {
        return (new static())->with(['orderMaster'])->find($settled_id);
    }
}