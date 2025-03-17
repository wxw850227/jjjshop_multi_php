<?php

namespace app\common\model\order;

use app\common\model\BaseModel;
use app\common\model\settings\ReturnAddress;
/**
 * 售后地址模型
 * Class OrderRefundAddress
 * @package app\common\model\order
 */
class OrderRefundAddress extends BaseModel
{
    protected $name = 'order_refund_address';
    protected $pk = 'id';
    protected $updateTime = false;

    /**
     * 新增售后单退货地址记录
     */
    public function add($order_refund_id, $address_id)
    {
        $detail = ReturnAddress::detail($address_id);
        return $this->save([
            'order_refund_id' => $order_refund_id,
            'name' => $detail['name'],
            'phone' => $detail['phone'],
            'detail' => $detail['detail'],
            'app_id' => self::$app_id
        ]);
    }
}

