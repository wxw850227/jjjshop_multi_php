<?php

namespace app\supplier\controller\cash;

use app\supplier\model\order\Order as OrderModel;
use app\supplier\controller\Controller;
use app\supplier\model\supplier\Account as SupplierAccountModel;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\supplier\model\supplier\Cash as SupplierCashModel;
use app\supplier\model\order\OrderRefund as OrderRefundModel;
use app\supplier\model\order\OrderSettled as OrderSettledModel;
use app\supplier\model\supplier\Capital as SupplierCapitalModel;
/**
 * 提现
 */
class Cash extends Controller
{
    /**
     * 首页概况
     */
    public function index()
    {
        $supplier = SupplierModel::detail($this->getSupplierId());
        // 统计数据
        $tj_data = [
            'nosettled_money' => (new OrderModel())->getNoSettledMoney($this->getSupplierId()),
            'refund_money' => (new OrderRefundModel())->getRefundMoney($this->getSupplierId()),
            'agent_money' => (new OrderSettledModel())->getAgentMoney($this->getSupplierId()),
        ];
        // 收入列表
        $cash_list = (new SupplierCapitalModel())->getList($this->getSupplierId(), $this->postData());
        return $this->renderSuccess('', compact('supplier', 'tj_data', 'cash_list'));
    }


    /**
     * 保存用户提现账户信息
     */
    public function account(){
        if($this->request->isGet()){
            $model = SupplierAccountModel::detail($this->getSupplierId());
            return $this->renderSuccess('', compact('model'));
        }
        $model = new SupplierAccountModel();
        if($model->add($this->getSupplierId(), $this->postData())){
            return $this->renderSuccess('操作成功', compact('model'));
        }
        return $this->renderError($model->getError()?:'保存失败');
    }

    /**
     * 提现记录
     */
    public function lists(){
        $model = new SupplierCashModel();
        $list = $model->getList($this->getSupplierId(), $this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 申请提现
     */
    public function apply(){
        $model = new SupplierCashModel;
        if ($model->submit($this->getSupplierId(), $this->postData())) {
            return $this->renderSuccess('申请提现成功');
        }
        return $this->renderError($model->getError() ?: '提交失败');
    }
}
