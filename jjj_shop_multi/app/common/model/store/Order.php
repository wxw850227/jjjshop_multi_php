<?php


namespace app\common\model\store;

use app\common\model\BaseModel;

use app\common\enum\order\OrderTypeEnum;

/**
 * 商家门店核销订单记录模型
 */
class Order extends BaseModel
{
    protected $pk = 'id';
    protected $name = 'store_order';
    protected $updateTime = false;

    /**
     * 关联门店表
     */
    public function store()
    {
        return $this->BelongsTo("app\\common\\model\\store\\Store", 'store_id', 'store_id');
    }

    /**
     * 关联店员表
     */
    public function clerk()
    {
        return $this->BelongsTo("app\\common\\model\\store\\Clerk", 'clerk_id', 'clerk_id');
    }

    /**
     * 关联订单表
     */
    public function order()
    {
        return $this->BelongsTo("app\\common\\model\\order\\Order", 'order_id', 'order_id');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id')->field(['shop_supplier_id', 'name']);
    }

    /**
     * 订单类型
     * @param $value
     * @return array
     */
    public function getOrderTypeAttr($value)
    {
        $types = OrderTypeEnum::getTypeName();
        return ['text' => $types[$value], 'value' => $value];
    }

    /**
     * 新增核销记录
     */
    public static function add(
        $order_id,
        $store_id,
        $clerk_id,
        $shop_supplier_id,
        $order_type = OrderTypeEnum::MASTER
    )
    {
        return (new static)->save([
            'order_id' => $order_id,
            'order_type' => $order_type,
            'store_id' => $store_id,
            'clerk_id' => $clerk_id,
            'shop_supplier_id' => $shop_supplier_id,
            'app_id' => self::$app_id
        ]);
    }

}