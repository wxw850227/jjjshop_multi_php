<?php

namespace app\supplier\controller\statistics;

use app\supplier\controller\Controller;
use app\supplier\service\statistics\UserService;

/**
 * 会员数据控制器
 */
class User extends Controller
{
    /**
     * 会员数据统计
     */
    public function index()
    {
        return $this->renderSuccess('', [
            // 会员统计
            'user' => (new UserService($this->getSupplierId()))->getData(),
        ]);
    }


    /**
     * 新增会员
     */
    public function visit($search_time = '')
    {
        $days = $this->getDays($search_time);
        return $this->renderSuccess('', [
            // 日期
            'days' => $days,
            // 数据
            'data' => (new UserService($this->getSupplierId()))->getVisitByDate($days),
        ]);
    }


    /**
     * 获取具体日期数组
     */
    private function getDays($search_time)
    {
        //搜索时间段
        if (!isset($search_time) || empty($search_time)) {
            //没有传，则默认为最近7天
            $end_time = date('Y-m-d', time());
            $start_time = date('Y-m-d', strtotime('-7 day', time()));
        } else {
            $start_time = array_shift($search_time);
            $end_time = array_pop($search_time);
        }

        $dt_start = strtotime($start_time);
        $dt_end = strtotime($end_time);
        $date = [];
        $date[] = date('Y-m-d', strtotime($start_time));
        while ($dt_start < $dt_end) {
            $date[] = date('Y-m-d', strtotime('+1 day', $dt_start));
            $dt_start = strtotime('+1 day', $dt_start);
        }
        return $date;
    }
}