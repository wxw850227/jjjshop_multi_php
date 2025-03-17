<?php

namespace app\shop\model\user;

use app\common\model\user\PointsLog as PointsLogModel;

/**
 * 用户余额变动明细模型
 */
class PointsLog extends PointsLogModel
{
    /**
     * 获取积分明细列表
     */
    public function getList($query = [])
    {
        $model = $this;
        //搜索订单号
        if (isset($query['search']) && $query['search'] != '') {
            $model = $model->where('user.nickName', 'like', '%' . trim($query['search']) . '%');
        }
        //搜索时间段
        if (isset($query['value1']) && $query['value1'] != '') {
            $sta_time = array_shift($query['value1']);
            $end_time = array_pop($query['value1']);
            $model = $model->whereBetweenTime('log.create_time', $sta_time, date('Y-m-d 23:59:59', strtotime($end_time)));
        }
        // 获取列表数据
        return $model->with(['user'])
            ->alias('log')
            ->field('log.*')
            ->join('user', 'user.user_id = log.user_id')
            ->order(['log.create_time' => 'desc'])
            ->paginate($query);
    }

}