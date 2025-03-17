<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\ReturnAddress as ReturnAddressModel;

/**
 * 地址控制器
 */
class Address extends Controller
{
    /**
     * 地址首页
     */
    public function index()
    {
        $model = new ReturnAddressModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加退货地址
     */
    public function add()
    {
        // 新增记录
        $model = new ReturnAddressModel;
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 退货地址详情
     */
    public function detail($address_id)
    {
        // 物流公司详情
        $detail = ReturnAddressModel::detail($address_id);
        return $this->renderSuccess('', compact('detail'));

    }

    /**
     * 修改
     * @param $address_id
     * @return \think\response\Json
     */
    public function edit($address_id)
    {
        if($this->request->isGet()){
            return $this->detail($address_id);
        }
        $model = ReturnAddressModel::detail($address_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 删除记录
     */
    public function delete($address_id)
    {
        $model = ReturnAddressModel::detail($address_id);
        if ($model->remove()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?:'删除失败');
    }

}
