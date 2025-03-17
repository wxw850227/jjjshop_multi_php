<?php

namespace app\shop\model\user;

use app\common\model\user\Favorite as FavoriteModel;

/**
 * 收藏模型
 */
class Favorite extends FavoriteModel
{
    /**
     * 获取用户统计数量
     */
    public function getFavData($startDate, $endDate, $type)
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
        if ($type == 'product') {
            return $model->where('type', '=', 20)->count();
        } else if ($type == 'supplier') {
            return $model->where('type', '=', 10)->count();
        }
        return 0;
    }
}
