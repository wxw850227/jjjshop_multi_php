<?php

namespace app\supplier\model\user;

use app\common\model\user\Visit as VisitModel;

/**
 * 收藏模型
 */
class Visit extends VisitModel
{
    /**
     * 获取某天的访问数
     * $endDate不传则默认当天
     */
    public function getVisitData($startDate, $endDate, $shop_supplier_id)
    {
        $model = $this;
        !is_null($startDate) && $model = $model->where('create_time', '>=', strtotime($startDate));

        if (is_null($endDate)) {
            !is_null($startDate) && $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }

        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->count();
    }

    /**
     * 获取某天的访客数
     * $endDate不传则默认当天
     */
    public function getVisitUserData($startDate, $endDate, $shop_supplier_id)
    {
        $model = $this;
        !is_null($startDate) && $model = $model->where('create_time', '>=', strtotime($startDate));

        if (is_null($endDate)) {
            !is_null($startDate) && $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }

        $userIds = $model->distinct(true)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->column('visitcode');
        return count($userIds);
    }
}