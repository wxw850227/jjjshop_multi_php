<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\OptLog as OptLogModel;
/**
 * 后台管理员登录日志模型
 */
class OptLog extends OptLogModel
{
    /**
     * 获取列表数据
     */
    public function getList($params,$shop_supplier_id)
    {
        $model = $this;
        // 查询条件：订单号
        if (isset($params['username']) && !empty($params['username'])) {
            $model = $model->where('user.user_name|user.real_name', 'like', "%{$params['username']}%");
        }
        $model = $model->where('log.shop_supplier_id', '=', $shop_supplier_id);
        // 查询列表数据
        return $model->alias('log')->field(['log.*','user.user_name','user.real_name'])
            ->join('supplier_user user', 'user.supplier_user_id = log.supplier_user_id','left')
            ->order(['log.create_time' => 'desc'])
            ->paginate($params);
    }
}