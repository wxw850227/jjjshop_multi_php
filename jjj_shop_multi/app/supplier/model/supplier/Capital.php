<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\Capital as SupplierCapitalModel;

/**
 * 后台管理员登录模型
 */
class Capital extends SupplierCapitalModel
{
    /**
     * 获取列表数据
     */
    public function getList($shop_supplier_id, $params)
    {
        $model = $this;
        if (isset($params['flow_type']) && $params['flow_type'] != 0) {
            $model = $model->where('flow_type', '=', $params['flow_type']);
        }
        if (isset($params['start_day']) && !empty($params['start_day'])) {
            $model = $model->where('create_time', '>=', strtotime($params['start_day']));
        }
        if (isset($params['end_day']) && !empty($params['end_day'])) {
            $model = $model->where('create_time', '<', strtotime($params['end_day']) + 86400);
        }
        // 查询列表数据
        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }
}