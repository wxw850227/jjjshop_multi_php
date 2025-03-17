<?php

namespace app\common\model\plus\coupon;

use app\common\library\helper;
use app\common\model\BaseModel;

/**
 * 优惠券模型
 */
class Coupon extends BaseModel
{
    protected $name = 'coupon';
    protected $pk = 'coupon_id';
    /**
     * 追加字段
     * @var array
     */
    protected $append = [
        'state'
    ];

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id')
            ->field(['shop_supplier_id', 'name']);
    }

    /**
     * 优惠券状态 (是否可领取)
     * @param $value
     * @param $data
     * @return array
     */
    public function getStateAttr($value, $data)
    {
        if (isset($data['is_receive']) && $data['is_receive']) {
            return ['text' => '已领取', 'value' => 0];
        }
        if ($data['total_num'] > -1 && $data['receive_num'] >= $data['total_num']) {
            return ['text' => '已抢光', 'value' => 0];
        }
        if ($data['expire_type'] == 20 && ($data['end_time'] + 86400) < time()) {
            return ['text' => '已过期', 'value' => 0];
        }
        return ['text' => '', 'value' => 1];
    }

    /**
     * 优惠券颜色
     * @param $value
     * @return array
     */
    public function getColorAttr($value)
    {
        $status = [10 => 'blue', 20 => 'red', 30 => 'violet', 40 => 'yellow'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 优惠券类型
     * @param $value
     * @return array
     */
    public function getCouponTypeAttr($value)
    {
        $status = [10 => '满减券', 20 => '折扣券'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 折扣率
     * @param $value
     * @return float|int
     */
    public function getDiscountAttr($value)
    {
        return $value / 10;
    }

    /**
     * 有效期-开始时间
     * @param $value
     * @return array
     */
    public function getStartTimeAttr($value)
    {
        return ['text' => date('Y-m-d', $value), 'value' => $value];
    }

    /**
     * 有效期-结束时间
     * @param $value
     * @return array
     */
    public function getEndTimeAttr($value)
    {
        return ['text' => date('Y-m-d', $value), 'value' => $value];
    }

    /**
     * 折扣率
     */
    public function setDiscountAttr($value)
    {
        return helper::bcmul($value, 10, 0);
    }

    /**
     * 优惠券详情
     */
    public static function detail($coupon_id)
    {
        return (new static())->find($coupon_id);
    }

    /**
     * 优惠券详情
     */
    public static function detailWithSupplier($coupon_id)
    {
        return (new static())->with(['supplier'])->find($coupon_id);
    }
}
