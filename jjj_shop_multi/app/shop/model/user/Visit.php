<?php

namespace app\shop\model\user;

use app\common\model\user\Visit as VisitModel;

/**
 * 收藏模型
 */
class Visit extends VisitModel
{
    /**
     * 获取用户统计数量
     */
    public function getVisitData($startDate, $endDate, $type)
    {
        $model = $this;
        if (!is_null($startDate)) {
            $model = $model->where('create_time', '>=', strtotime($startDate));
        }
        if (is_null($endDate)) {
            $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }
        if ($type == 'visit_user') {
            $userIds = $model->distinct(true)->column('visitcode');
            return count($userIds);
        } else if ($type == 'visit_count') {
            return $model->count();
        }
        return 0;
    }
}
