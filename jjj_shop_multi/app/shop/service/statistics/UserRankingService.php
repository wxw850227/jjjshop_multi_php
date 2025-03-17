<?php

namespace app\shop\service\statistics;

use app\shop\model\user\User as UserModel;

/**
 * 数据统计-用户排行
 */
class UserRankingService
{
    /**
     * 用户消费榜
     */
    public function getUserRanking($type)
    {
        $model = new UserModel();
        $model = $model->field(['user_id', 'nickName', 'avatarUrl', 'expend_money', 'total_points', 'total_invite'])
            ->where('is_delete', '=', 0);
        if($type == 'pay'){
            $model = $model->order(['expend_money' => 'DESC']);
        } else if($type == 'points'){
            $model = $model->order(['total_points' => 'DESC']);
        } else if($type == 'invite'){
            $model = $model->order(['total_invite' => 'DESC']);
        }
        return $model->limit(10)->select();
    }

}