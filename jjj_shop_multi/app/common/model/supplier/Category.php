<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 广告分类模型
 */
class Category extends BaseModel
{
    protected $name = 'supplier_category';
    protected $pk = 'category_id';

    /**
     * 所有分类
     * @return \think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getALL()
    {
        $model = new static;
        return $model->order(['create_time' => 'asc'])->select();
    }
    /**
     * 详情
     */
    public static function detail($category_id)
    {
       return (new static())->find($category_id);
    }

}