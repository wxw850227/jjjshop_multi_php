<?php

namespace app\common\model\plus\coupon;

//use think\Hook;
use app\common\model\BaseModel;

/**
 * 用户优惠券模型
 */
class UserCoupon extends BaseModel
{
    protected $name = 'user_coupon';
    protected $pk = 'user_coupon_id';

    /**
     * 追加字段
     * @var array
     */
    protected $append = ['state'];

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\common\model\user\User');
    }

    /**
     * 关联优惠券表
     */
    public function coupon()
    {
        return $this->belongsTo('app\common\model\plus\coupon\Coupon');
    }
    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id')
            ->field(['shop_supplier_id', 'name']);
    }

    /**
     * 优惠券状态
     */
    public function getStateAttr($value, $data)
    {
        if ($data['is_use']) {
            return ['text' => '已使用', 'value' => 0];
        }
        if ($data['is_expire']) {
            return ['text' => '已过期', 'value' => 0];
        }
        return ['text' => '', 'value' => 1];
    }

    /**
     * 优惠券颜色
     */
    public function getColorAttr($value)
    {
        $status = [10 => 'blue', 20 => 'red', 30 => 'violet', 40 => 'yellow'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 优惠券类型
     */
    public function getCouponTypeAttr($value)
    {
        $status = [10 => '满减券', 20 => '折扣券'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 折扣率
     */
    public function getDiscountAttr($value)
    {
        return $value / 10;
    }

    /**
     * 有效期-开始时间
     */
    public function getStartTimeAttr($value)
    {
        return ['text' => date('Y/m/d', $value), 'value' => $value];
    }

    /**
     * 有效期-结束时间
     */
    public function getEndTimeAttr($value)
    {
        return ['text' => date('Y/m/d', $value), 'value' => $value];
    }

    /**
     * 优惠券详情
     */
    public static function detail($coupon_id)
    {
        return (new static())->find($coupon_id);
    }

    /**
     * 设置优惠券使用状态
     */
    public static function setIsUse($couponId, $isUse = true)
    {
        $model = new static();
        return $model->where(['user_coupon_id' => $couponId])->update(['is_use' => (int)$isUse]);
    }

}