<?php

namespace app\common\model\settings;

use app\common\model\BaseModel;

/**
 * 退货地址模型
 */
class ReturnAddress extends BaseModel
{
    protected $name = 'return_address';
    protected $pk = 'address_id';

    /**
     * 退货地址详情
     */
    public static function detail($address_id)
    {
        return (new static())->find($address_id);
    }

    /**
     * 获取全部收货地址
     */
    public function getAll($shop_supplier_id)
    {
        return $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('is_delete', '=', 0)
            ->order(['sort' => 'asc'])
            ->select();
    }
}