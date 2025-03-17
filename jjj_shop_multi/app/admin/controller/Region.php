<?php

namespace app\admin\controller;

use app\admin\model\settings\Region as RegionModel;

/**
 * 地区控制器
 */
class Region extends Controller
{
    /**
     * 物流数据
     */
    public function index()
    {
        $model = new RegionModel;
        $list = $model->getList($this->postData());
        $regionData = RegionModel::getCacheTree();
        return $this->renderSuccess('',compact('list', 'regionData'));
    }

    /**
     * 添加物流公司
     */
    public function add()
    {
        if($this->request->isGet()){
            // 获取所有地区
            $regionData = RegionModel::getCacheTree();
            return $this->renderSuccess('', compact('regionData'));
        }
        // 新增记录
        $model = new RegionModel;
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 修改
     * @param $express_id
     * @return \think\response\Json
     */
    public function edit($id)
    {
        $model = RegionModel::detail($id);
        if($this->request->isGet()){
            $regionData = RegionModel::getCacheTree();
            if($model['level'] == 1){
                $model['province_id'] = '';
                $model['city_id'] = '';
            }
            if($model['level'] == 2){
                $model['province_id'] = $model['pid'];
                $model['city_id'] = '';
            }
            if($model['level'] == 3){
                $model['province_id'] = RegionModel::detail($model['pid'])['pid'];
                $model['city_id'] = $model['pid'];
            }
            return $this->renderSuccess('', compact('model', 'regionData'));
        }
        $model = RegionModel::detail($id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 删除记录
     */
    public function delete($id)
    {
        $model = RegionModel::detail($id);
        if ($model->remove($id)) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?:'删除失败');
    }
}
