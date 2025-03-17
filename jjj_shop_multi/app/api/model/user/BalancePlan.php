<?php

namespace app\api\model\user;

use app\common\model\user\BalancePlan as BalancePlanModel;

/**
 * 充值模型
 */
class BalancePlan extends BalancePlanModel
{
    /**
     * 列表
     */
    public function getList()
    {
        return $this->where('is_delete', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
    }
}
