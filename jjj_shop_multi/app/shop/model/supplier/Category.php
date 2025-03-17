<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Category as CategoryModel;
use app\shop\model\supplier\Supplier as SupplierModel;

/**
 * 主营分类模型
 */
class Category extends CategoryModel
{
    /**
     * 分类详情
     */
    public static function detail($category_id)
    {
        return (new static())->find($category_id);
    }

    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        $isExist = static::where('name','=',$data['name'])->find();
        if($isExist){
            $this->error='名称已存在';
            return false;
        }
        return $this->save($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {   
        $isExist = static::where('name','=',$data['name'])->where('category_id','<>',$data['category_id'])->find();
        if($isExist){
            $this->error='名称已存在';
            return false;
        }
        $data['create_time'] = strtotime($data['create_time']);
        $data['update_time'] = time();
        return $this->save($data);
    }

    /**
     * 删除分类
     */
    public function remove()
    {
        // 判断是否存在供应商
        $Count = SupplierModel::getTotal(['category_id' => $this['category_id']]);
        if ($Count > 0) {
            $this->error = '该分类下存在' . $Count . '个供应商，不允许删除';
            return false;
        }
        return $this->delete();
    }

}