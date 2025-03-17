<?php

namespace app\common\model\user;

use app\common\model\BaseModel;

/**
 * 余额充值模型
 */
class BalancePlan extends BaseModel
{
    protected $name = 'balance_plan';
    protected $pk = 'plan_id';

    /**
     * 详情
     */
    public static function detail($plan_id)
    {
        return (new static())->find($plan_id);
    }

}
