<?php

namespace app\shop\controller\cash;

use app\shop\controller\Controller;
use app\shop\model\order\OrderSettled as OrderSettledModel;
/**
 * 提现
 */
class Settled extends Controller
{
    /**
     * 首页概况
     */
    public function index()
    {
        return $this->renderSuccess('', [
            // 结算统计
            'settled' => (new OrderSettledModel())->getSettledData(),
        ]);
    }

    /**
     * 通过时间段查询本期上期金额
     */
    public function data($search_time)
    {
        $days = $this->getDays($search_time);
        return $this->renderSuccess('', [
            // 日期
            'days' => $days,
            // 数据
            'data' => (new OrderSettledModel())->getSettledDataByDate($days),
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
