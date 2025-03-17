<?php

namespace app\supplier\service\statistics;

use app\supplier\model\user\Favorite as FavoriteModel;
use app\supplier\model\user\Visit as VisitModel;

/**
 * 用户数据概况
 */
class UserService
{
    // 商户id
    private $shop_supplier_id;

    public function __construct($shop_supplier_id)
    {
        $this->shop_supplier_id = $shop_supplier_id;
    }

    /**
     * 获取数据概况
     */
    public function getData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $data = [
            // 店铺收藏
            'fav_store' => [
                'today' => number_format($this->getFavData($today, null, '10')),
                'yesterday' => number_format($this->getFavData($yesterday, null, '10'))
            ],
            // 商品收藏
            'fav_product' => [
                'today' => number_format($this->getFavData($today, null, '20')),
                'yesterday' => number_format($this->getFavData($yesterday, null, '20'))
            ],
            // 访客数
            'visit_user' => [
                'today' => number_format($this->getVisitUserData($today, null)),
                'yesterday' => number_format($this->getVisitUserData($yesterday, null))
            ],
            // 访问量
            'visit_total' => [
                'today' => number_format($this->getVisitData($today, null)),
                'yesterday' => number_format($this->getVisitData($yesterday, null))
            ],
        ];
        return $data;
    }

    /**
     * 通过时间段查询访问量
     */
    public function getVisitByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'fav_store' => $this->getFavData($day, null, '10'),
                'fav_product' => $this->getFavData($day, null, '20'),
                'visit_user' => $this->getVisitUserData($day, null),
                'visit_total' => $this->getVisitData($day, null)
            ];
        }
        return $data;
    }

    /**
     * 获取店铺关注数据
     */
    private function getFavData($startDate, $endDate, $type)
    {
        return (new FavoriteModel())->getFavData($startDate, $endDate, $type, $this->shop_supplier_id);
    }

    /**
     * 访问量
     */
    private function getVisitData($startDate, $endDate = null)
    {
        return (new VisitModel())->getVisitData($startDate, $endDate, $this->shop_supplier_id);
    }

    private function getVisitUserData($startDate, $endDate = null)
    {
        return (new VisitModel())->getVisitUserData($startDate, $endDate, $this->shop_supplier_id);
    }
}