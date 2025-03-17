<?php

namespace app\job\model\plus\fans;

use app\common\model\plus\coupon\UserCoupon as UserCouponModel;

/**
 * 用户优惠券模型
 */
class UserCoupon extends UserCouponModel
{
    /**
     * 获取已过期的优惠券ID集
     */
    public function getExpiredCouponIds()
    {
        $time = time();
        return $this->where('is_expire', '=', 0)
            ->where('is_use', '=', 0)
            ->where(
                "IF ( `expire_type` = 20,
                    (`end_time` + 86400) < {$time},
                    ( `create_time` + (`expire_day` * 86400)) < {$time} )"
            )->column('user_coupon_id');
    }

    /**
     * 设置优惠券过期状态
     */
    public function setIsExpire($couponIds)
    {
        if (empty($couponIds)) {
            return false;
        }
        return $this->where('user_coupon_id', 'in', $couponIds)->save(['is_expire' => 1]);
    }

}
