<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\user\BalancePlan as PlanModel;
use app\shop\model\user\BalanceOrder as BalanceOrderModel;

/**
 * 充值控制器
 */
class Plan extends Controller
{

    /**
     * 列表
     */
    public function index()
    {
        $model = new PlanModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加
     */
    public function add()
    {
        $model = new PlanModel();
        // 新增记录
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 更新
     */
    public function edit($plan_id)
    {
        $detail = PlanModel::detail($plan_id);
        if($this->request->isGet()){
            return $this->renderSuccess('', compact('detail'));
        }
        if ($detail->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError('更新失败');
    }

    /**
     * 删除
     */
    public function delete($plan_id)
    {
        // 详情
        $model = new PlanModel;
        // 更新记录
        if ($model->setDelete(['plan_id' => $plan_id])) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

    /**
     * 充值记录
     */
    public function log()
    {
        $model = new BalanceOrderModel();
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}