<?php


namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 供应商客服模型
 */
class Service extends BaseModel
{
    protected $pk = 'service_id';
    protected $name = 'supplier_service';

    /**
     * 详情
     */
    public static function detail($shop_supplier_id){
        return (new static())->where('shop_supplier_id', '=', $shop_supplier_id)->find();
    }
}