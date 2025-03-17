<?php

namespace app\job\event;

use think\facade\Cache;
use app\job\model\plus\fans\UserCoupon as UserCouponModel;

/**
 * 优惠券事件管理
 */
class UserCoupon
{
    // 模型
    private $model;

    /**
     * 执行函数
     */
    public function handle()
    {
        try {
            $this->model = new UserCouponModel();
            $cacheKey = "task_space_UserCoupon";
            if (!Cache::has($cacheKey)) {
                // 设置优惠券过期状态
                $this->setExpired();
                Cache::set($cacheKey, time(), 60);
            }
        } catch (\Throwable $e) {
            echo 'ERROR UserCoupon: ' . $e->getMessage() . PHP_EOL;
            log_write('UserCoupon TASK : ' . '__ ' . $e->getMessage(), 'task');
        }
        return true;
    }

    /**
     * 设置优惠券过期状态
     */
    private function setExpired()
    {
        // 获取已过期的优惠券ID集
        $couponIds = $this->model->getExpiredCouponIds();
        // 记录日志
        $this->dologs('setExpired', [
            'couponIds' => json_encode($couponIds),
        ]);
        // 更新已过期状态
        return $this->model->setIsExpire($couponIds);
    }

    /**
     * 记录日志
     */
    private function dologs($method, $params = [])
    {
        $value = 'UserCoupon --' . $method;
        foreach ($params as $key => $val)
            $value .= ' --' . $key . ' ' . $val;
        return log_write($value, 'task');
    }

}
