<?php

namespace app\admin\model\settings;

use app\common\model\settings\Region as RegionModel;
use think\facade\Cache;

/**
 * 地区模型
 */
class Region extends RegionModel
{
    /**
     * 获取列表
     */
    public function getList($params)
    {
        $model = $this;
        if(isset($params['name']) && !empty($params['name'])){
            $model = $model->where('name|shortname|merger_name', 'like', '%' . trim($params['name']) . '%');
        }
        if(isset($params['level']) && $params['level'] > 0){
            $model = $model->where('level', '=', $params['level']);
        }
        if(isset($params['province_id']) && $params['province_id'] > 0){
            if(isset($params['city_id']) && $params['city_id'] > 0){
                $model = $model->where('pid', '=', $params['city_id']);
            }else{
                $model = $model->where('pid', '=', $params['province_id']);
            }
        }
        return $model->where('is_delete', '=', 0)
            ->order(['id' => 'asc', 'sort' => 'asc'])
            ->paginate($params);
    }


    /**
     * 添加新记录
     */
    public function add($data)
    {
        $this->deleteCache();
        $data['pid'] = $this->getPid($data);
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        $this->deleteCache();
        $data['pid'] = $this->getPid($data);
        return $this->save($data);
    }

    private function getPid($data){
        if($data['level'] == 1){
            return 0;
        } else if($data['level'] == 2){
            return $data['province_id'];
        } else if($data['level'] == 3){
            return $data['city_id'];
        }
        return false;
    }

    /**
     * 删除记录
     */
    public function remove()
    {
        $this->deleteCache();
        return $this->save([
            'is_delete' => 1
        ]);
    }

    public function deleteCache(){
        Cache::delete('region');
    }
}
