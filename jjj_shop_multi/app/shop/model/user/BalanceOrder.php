<?php

namespace app\shop\model\user;

use app\common\model\user\BalanceOrder as BalanceOrderModel;

/**
 * 充值模型
 */
class BalanceOrder extends BalanceOrderModel
{
    /**
     * 列表
     */
    public function getList($params)
    {
        $model = $this->alias('log');
        !empty($params['search']) && $model = $model->where('user.nickName', 'like', "%{$params['search']}%");
        //搜索时间段
        if (isset($params['value1']) && $params['value1'] != '') {
            $sta_time = array_shift($params['value1']);
            $end_time = array_pop($params['value1']);
            $model = $model->whereBetweenTime('log.create_time', $sta_time, date('Y-m-d 23:59:59', strtotime($end_time)));
        }
        $list = $model->with(['user'])
            ->join('user', 'user.user_id = log.user_id')
            ->order(['log.create_time' => 'desc'])
            ->field('log.*')
            ->paginate($params);
        foreach ($list as $key => &$value) {
            $value['snapshot'] = json_decode($value['snapshot'], true);
        }
        return $list;
    }
}
