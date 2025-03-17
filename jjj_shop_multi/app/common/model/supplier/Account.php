<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 商家供应商提现账户模型
 */
class Account extends BaseModel
{
    protected $name = 'supplier_account';
    protected $pk = 'account_id';

    /**
     * 关联应用表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }
    /**
     * 详情
     */
    public static function detail($shop_supplier_id, $with = [])
    {
        return (new static())->with($with)->where('shop_supplier_id', '=', $shop_supplier_id)->findOrEmpty();
    }

}