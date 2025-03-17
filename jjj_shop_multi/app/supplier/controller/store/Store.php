<?php

namespace app\supplier\controller\store;

use app\common\model\settings\Region as RegionModel;
use app\supplier\controller\Controller;
use app\supplier\model\store\Store as StoreModel;

/**
 * 门店控制器
 */
class Store extends Controller
{
    /**
     * 门店列表
     */
    public function index()
    {
        $model = new StoreModel;
        $list = $model->getList($this->postData(),$this->getSupplierId());

        foreach ($list as $key => $val) {
            $list[$key]['detail_address'] = $val['region']['province'] . $val['region']['city'] . $val['region']['region'] . $val['address'];
        }

        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加门店
     */
    public function add()
    {
        $model = new StoreModel;
        //Vue要添加的数据
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->getSupplierId();
        if ($data['logo_image_id'] == 0) {
            return $this->renderError('请上传logo');
        }
        $coordinate = explode(',', $data['coordinate']);
        if (count($coordinate) <= 1) {
            return $this->renderError('请在地图点击选择坐标');
        }
        // 新增记录
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 修改门店信息
     */
    public function edit($store_id)
    {
        // 门店详情
        $model = StoreModel::detail($store_id);
        if($this->request->isGet()){
            $model['coordinate'] = $model['latitude'] . ',' . $model['longitude'];
            $regionData = RegionModel::getCacheTree();
            return $this->renderSuccess('', compact('model', 'regionData'));
        }
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 软删除
     */
    public function delete($store_id)
    {
        $model = new StoreModel;
        // 门店详情
        if (!$model->setDelete(['store_id' => $store_id])) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess($model->getError() ?: '删除成功');

    }
    /**
     * 门店列表
     */
    public function lists()
    {
        $list = (new StoreModel())->getAllList($this->getSupplierId());
        return $this->renderSuccess('', compact('list'));
    }

}
