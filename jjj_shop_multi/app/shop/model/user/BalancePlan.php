<?php

namespace app\shop\model\user;

use app\common\model\user\BalancePlan as BalancePlanModel;

/**
 * 充值模型
 */
class BalancePlan extends BalancePlanModel
{
    /**
     * 列表
     */
    public function getList($params)
    {
        return $this->where('is_delete', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();
    }

    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 更新记录
     */
    public function edit($data)
    {
        return $this->save($data);
    }

    /**
     * 删除记录 (软删除)
     */
    public function setDelete($where)
    {
        return self::update(['is_delete' => 1], $where);
    }
}
