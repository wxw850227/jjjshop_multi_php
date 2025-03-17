<?php

namespace app\shop\service\statistics;

use app\shop\model\user\Favorite as FavoriteModel;
use app\shop\model\user\Visit as VisitModel;

/**
 * 供应商数据概况
 */
class AccessService
{
    /**
     * 获取数据概况
     */
    public function getData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $data = [
            // 供应商收藏数
            'supplier_fav_total' => [
                'today' => number_format($this->getFavData(null, $today, 'supplier')),
                'yesterday' => number_format($this->getFavData(null, $yesterday, 'supplier'))
            ],
            // 商品收藏数
            'product_fav_total' => [
                'today' => number_format($this->getFavData(null, $today, 'product')),
                'yesterday' => number_format($this->getFavData(null, $yesterday, 'product'))
            ],
            // 访客数
            'visit_user' => [
                'today' => number_format($this->getVisitData($today, null, 'visit_user')),
                'yesterday' => number_format($this->getVisitData($yesterday, null, 'visit_user'))
            ],
            // 访问量
            'visit_count' => [
                'today' => number_format($this->getVisitData($today, null, 'visit_count')),
                'yesterday' => number_format($this->getVisitData($yesterday, null, 'visit_count'))
            ],
        ];
        return $data;
    }

    /**
     * 通过时间段查询用户数据
     */
    public function getVisitDataByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'visit_user' => $this->getVisitData($day, null, 'visit_user'),
                'visit_count' => $this->getVisitData($day, null, 'visit_count')
            ];
        }
        return $data;
    }

    /**
     * 通过时间段查询用户数据
     */
    public function getFavDataByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'supplier_count' => $this->getFavData($day, null, 'supplier'),
                'product_count' => $this->getFavData($day, null, 'product')
            ];
        }
        return $data;
    }

    /**
     * 获取用户数据
     */
    private function getVisitData($startDate, $endDate, $type)
    {
        return (new VisitModel())->getVisitData($startDate, $endDate, $type);
    }

    /**
     * 收藏数
     */
    private function getFavData($startDate, $endDate, $type)
    {
        return (new FavoriteModel())->getFavData($startDate, $endDate, $type);
    }
}