<?php

namespace app\shop\model\plus\plus;

use app\common\model\plus\plus\Category as CategoryModel;
use app\shop\model\shop\Access as AccessModel;
/**
 * 插件分类模型
 */
class Category extends CategoryModel
{
    /**
     * 获取所有插件
     */
    public static function getAll()
    {
        $model = new static();
        $list = $model::withoutGlobalScope()->order(['sort' => 'asc', 'create_time' => 'asc'])->select();
        // 查询分类下的插件
        foreach ($list as $category){
            $category['children'] = AccessModel::getListByPlusCategoryId($category['plus_category_id']);
        }
        return $list;
    }

}