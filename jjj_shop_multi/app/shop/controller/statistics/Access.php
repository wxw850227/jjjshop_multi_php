<?php

namespace app\shop\controller\statistics;

use app\shop\controller\Controller;
use app\shop\service\statistics\AccessService;

/**
 * 访问数据控制器
 */
class Access extends Controller
{
    /**
     * 会员数据统计
     */
    public function index()
    {
        return $this->renderSuccess('', [
            // 访问统计
            'access' => (new AccessService())->getData(),
        ]);
    }

    /**
     * 通过时间段查询
     * $type类型：new refund
     */
    public function data($search_time, $type = 'visit')
    {
        $days = $this->getDays($search_time);
        $data = [];
        if($type == 'visit'){
            $data = (new AccessService())->getVisitDataByDate($days);
        }else if($type == 'fav'){
            $data = (new AccessService())->getFavDataByDate($days);
        }
        return $this->renderSuccess('', [
            // 日期
            'days' => $days,
            // 数据
            'data' => $data,
        ]);
    }

    /**
     * 获取具体日期数组
     */
    private function getDays($search_time)
    {
        //搜索时间段
        if(!isset($search_time) || empty($search_time)){
            //没有传，则默认为最近7天
            $end_time = date('Y-m-d', time());
            $start_time = date('Y-m-d', strtotime('-7 day',time()));
        }else{
            $start_time = array_shift($search_time);
            $end_time = array_pop($search_time);
        }

        $dt_start = strtotime($start_time);
        $dt_end = strtotime($end_time);
        $date = [];
        $date[] = date('Y-m-d', strtotime($start_time));
        while($dt_start < $dt_end) {
            $date[] = date('Y-m-d', strtotime('+1 day',$dt_start));
            $dt_start = strtotime('+1 day',$dt_start);
        }
        return $date;
    }
}