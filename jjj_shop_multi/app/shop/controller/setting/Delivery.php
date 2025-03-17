<?php

namespace app\shop\controller\setting;

use app\shop\controller\Controller;
use app\shop\model\settings\Region as RegionModel;
use app\shop\model\settings\Delivery as DeliveryModel;

/**
 * 运费模板控制器
 */
class Delivery extends Controller
{
    /**
     * 运费模板列表
     */
    public function index()
    {
        $model = new DeliveryModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }


    /**
     * 配送区域
     */
    public function area()
    {
        // 获取所有地区
        $regionData = RegionModel::getCacheTree();
        $arr = $this->dataFormat($regionData);
        return $this->renderSuccess('', compact('arr'));
    }


    /**
     * 新增
     */
    public function add()
    {
        // 新增记录
        $model = new DeliveryModel;
        $data = $this->postData();
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 详情
     */
    public function detail($delivery_id = 0)
    {
        // 获取所有地区
        $regionData = RegionModel::getCacheTree();
        $arr = $this->dataFormat($regionData);
        // 地区总数
        $cityCount = RegionModel::getCacheCounts()['city'];
        //新增
        if($delivery_id == 0){
            return $this->renderSuccess('', compact('arr', 'cityCount'));
        }
        // 详情
        $detail = DeliveryModel::detail($delivery_id);
        // 获取配送区域及运费设置项
        $formData = $detail->getFormList();
        $returnData = $this->dataFormat1($arr, $formData);

        $arr = $returnData['arr'];

        return $this->renderSuccess('', compact('detail', 'arr', 'cityCount', 'formData'));
    }

    /**
     * 格式化数据
     */
    public function dataFormat($regionData)
    {
        $arr = [];
        foreach ($regionData as $val) {
            $city = array_column($val['city'], 'name');
            $id = array_column($val['city'], 'id');
            $len = count($city);
            $arr2 = [];
            for ($i = 0; $i < $len; $i++) {
                $arr1 = [
                    'value' => $id[$i],
                    'label' => $city[$i],
                ];
                array_push($arr2, $arr1);
            }
            $arr[] = [
                'value' => $val['id'],
                'label' => $val['name'],
                'children' => $arr2
            ];
            $arr2 = [];
        }
        return $arr;
    }

    /**
     * 格式化数据1
     */
    public function dataFormat1($arr, $formData)
    {
        foreach ($arr as $key => &$val) {
            $val['index'] = null;
            $index = 0;
            foreach ($formData as $k => $v) {
                if (in_array($val['value'], $v['province'])) {
                    $citys = array();
                    $val['checked'] = true;
                    if (is_array($val['index'])) {
                        $list = $val['index'];
                        array_push($list, $index);
                        $val['index'] = $list;
                    } else {
                        $val['index'] = array($index);

                    }
                    foreach ($val['children'] as $c => &$city) {
                        if (in_array($city['value'], $v['citys'])) {
                            $city['checked'] = true;
                            $city['index'] = $index;
                            $citys[] = $city;
                        }
                    }
                    $province = array(
                        'value' => $arr[$key]['value'],
                        'label' => $arr[$key]['label'],
                        'children' => $citys);
                    $formData[$k]['areas'][] = $province;
                }
                $index++;
            }
        }

        return array('arr' => $arr, "formData" => $formData);
    }

    /**
     * 修改
     */
    public function edit($delivery_id = 0)
    {
        if($this->request->isGet()){
            return $this->detail($delivery_id);
        }
        if ($delivery_id == 0) {
            return $this->add();
        }
        $model = DeliveryModel::detail($delivery_id);
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 格式化修改提交的数据
     */
    public function dataFormat2($data)
    {

        foreach ($data['delivery'] as $key => $val) {
            $str = '';
            foreach ($val['areas'] as $v) {
                $city = array_column($v['children'], 'value');
                $str .= implode(',', $city) . ',';
            }
            $str = substr($str, 0, -1);
            $data['delivery'][$key]['region'] = $str;
        }
        return $data;
    }

    /**
     * 删除记录
     */
    public function delete($delivery_id)
    {
        $model = DeliveryModel::detail($delivery_id);
        if (!$model->remove()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}
