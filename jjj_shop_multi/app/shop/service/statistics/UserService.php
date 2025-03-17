<?php

namespace app\shop\service\statistics;

use app\shop\model\order\Order as OrderModel;
use app\shop\model\user\User as UserModel;

/**
 * 用户数据概况
 */
class UserService
{
    /**
     * 获取数据概况
     */
    public function getData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $data = [
            // 累计会员数
            'user_total' => [
                'today' => number_format($this->getUserData(null, $today, 'user_total')),
                'yesterday' => number_format($this->getUserData(null, $yesterday, 'user_total'))
            ],
            // 新增会员数
            'user_add' => [
                'today' => number_format($this->getUserData($today, null, 'user_add')),
                'yesterday' => number_format($this->getUserData($yesterday, null, 'user_add'))
            ],
            // 成交会员数
            'user_pay' => [
                'today' => number_format($this->getOrderData($today, null, 'order_user_total')),
                'yesterday' => number_format($this->getOrderData($yesterday, null, 'order_user_total'))
            ],
        ];
        return $data;
    }

    /**
     * 查询成交占比
     */
    public function getPayScaleData($day)
    {
        $today = date('Y-m-d');
        $startDate = null;
        if ($day > 0) {
            $startDate = date('Y-m-d', strtotime('-' . $day . ' day'));
        }
        return [
            'pay' => $this->getUserData($startDate, $today, 'user_pay'),
            'no_pay' => $this->getUserData($startDate, $today, 'user_no_pay')
        ];
    }

    /**
     * 通过时间段查询用户数据
     */
    public function getNewUserByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'total_num' => $this->getUserData($day, null, 'user_add')
            ];
        }
        return $data;
    }

    /**
     * 通过时间段查询用户成交数据
     */
    public function getPayUserByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'total_num' => number_format($this->getOrderData($day, null, 'order_user_total'))
            ];
        }
        return $data;
    }

    /**
     * 获取用户数据
     */
    private function getUserData($startDate, $endDate, $type)
    {
        return (new UserModel)->getUserData($startDate, $endDate, $type);
    }

    /**
     * 获取订单数据
     */
    private function getOrderData($startDate, $endDate, $type)
    {
        return (new OrderModel)->getOrderData($startDate, $endDate, $type);
    }
}