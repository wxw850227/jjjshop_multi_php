<?php

namespace app\common\model\order;

use app\common\model\BaseModel;

/**
 * 购物车模型模型
 */
class Cart extends BaseModel
{
    protected $pk = 'cart_id';
    protected $name = 'user_cart';

    /**
     * 关联商品表
     * @return \think\model\relation\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id');
    }

    /**
     * 关联用户表
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 购物车详情
     */
    public static function detail($where, $with = ['user', 'product.image'])
    {
        is_array($where) ? $filter = $where : $filter['cart_id'] = (int)$where;
        return (new static())->with($with)->where($filter)->find();
    }

}