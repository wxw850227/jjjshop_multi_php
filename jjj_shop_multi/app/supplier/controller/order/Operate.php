<?php

namespace app\supplier\controller\order;

use app\supplier\controller\Controller;
use app\supplier\model\order\Order as OrderModel;

/**
 * 订单操作
 * @package app\shop\controller\order
 */
class Operate extends Controller
{
    /**
     * 订单导出
     */
    public function export($dataType)
    {
        $model = new OrderModel();
        return $model->exportList($dataType, $this->postData(), $this->getSupplierId());
    }

    /**
     * 审核：用户取消订单
     */
    public function confirmCancel($order_id)
    {
        $model = OrderModel::detail($order_id);
        if ($model->confirmCancel($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError('操作失败');
    }

    /**
     * 门店自提核销
     */
    public function extract()
    {
        $params = $this->postData('extract_form');
        $model = OrderModel::detail($params['order_id']);
        if ($model->verificationOrder($params['order']['extract_clerk_id'])) {
            return $this->renderSuccess('核销成功');
        }
        return $this->renderError($model->getError() ?: '核销失败');
    }

    /**
     * 批量发货
     */
    public function batchDelivery(){
        // 文件信息
        $fileInfo = request()->file('iFile');
        $model = new OrderModel();
        if($model->batchDelivery($fileInfo, $this->getSupplierId())){
            return $this->renderSuccess('批量发货成功');
        }
        return $this->renderError($model->getError() ?: '批量发货失败');
    }
}