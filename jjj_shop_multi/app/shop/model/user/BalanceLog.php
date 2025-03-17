<?php

namespace app\shop\model\user;

use app\common\model\user\BalanceLog as BalanceLogModel;

/**
 * 用户余额变动明细模型
 */
class BalanceLog extends BalanceLogModel
{
    /**
     * 获取余额变动明细列表
     */
    public function getList($query = [])
    {
        // 设置默认的检索数据
        $params = [
            'user_id' => 0,
            'search' => '',
            'scene' => -1,
            'start_time' => '',
            'end_time' => '',
        ];
        // 合并查询条件
        $data = array_merge($params, $query);
        $model = $this->alias('log')->field('log.*');
        // 用户昵称
        $data['search'] = trim($data['search']);
        !empty($data['search']) && $model = $model->where('user.nickName', 'like', "%{$data['search']}%");
        //搜索时间段
        if (isset($data['value1']) && $data['value1'] != '') {
            $sta_time = array_shift($data['value1']);
            $end_time = array_pop($data['value1']);
            $model = $model->whereBetweenTime('log.create_time', $sta_time, date('Y-m-d 23:59:59', strtotime($end_time)));
        }
        // 余额变动场景
        if (!empty($data['scene']) && $data['scene'] > -1) {
            $model = $model->where('log.scene', '=', (int)$data['scene']);
        }
        // 用户ID
        if (!empty($data['user_id']) && $data['user_id'] > 0) {
            $model = $model->where('log.user_id', '=', (int)$data['user_id']);
        }
        // 获取列表数据
        return $model->with(['user'])
            ->join('user', 'user.user_id = log.user_id')
            ->order(['log.create_time' => 'desc'])
            ->paginate($query);
    }

}