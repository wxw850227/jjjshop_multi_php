<?php

namespace app\shop\controller\supplier;

use app\shop\controller\Controller;
use app\shop\model\supplier\Cash as SupplierCashModel;

/**
 * 供应商提现控制器
 */
class Cash extends Controller
{
    /**
     * 提现列表
     */
    public function index()
    {
        $model = new SupplierCashModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 提现审核
     */
    public function submit($id)
    {
        $model = SupplierCashModel::detail($id);
        if ($model->submit($this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 确认打款
     */
    public function money($id)
    {
        $model = SupplierCashModel::detail($id);

        if ($model->money()) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}
