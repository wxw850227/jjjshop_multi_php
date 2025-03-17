<?php

namespace app\api\model\user;

use app\common\model\user\PointsLog as PointsLogModel;

/**
 * 积分变动明细模型
 */
class PointsLog extends PointsLogModel
{
    /**
     * 获取日志明细列表
     */
    public function getList($userId,$limit)
    {
        // 获取列表数据
        return $this->where('user_id', '=', $userId)
            ->order(['create_time' => 'desc'])
            ->paginate($limit);
    }

}