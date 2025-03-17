<?php

namespace app\supplier\controller\setting;

use app\supplier\controller\Controller;
use app\supplier\model\supplier\Supplier as SupplierModel;
/**
 * 供应商
 */
class Supplier extends Controller
{

    /**
     * 修改信息
     */
    public function index(){
        $model = SupplierModel::detail($this->getSupplierId(), ['logo', 'business']);
        if($this->request->isGet()){
            return $this->renderSuccess('', compact('model'));
        }
        if($model->edit($this->postData())){
            return $this->renderSuccess('操作成功', compact('model'));
        }
        return $this->renderError($model->getError()?:'保存失败');
    }
}
