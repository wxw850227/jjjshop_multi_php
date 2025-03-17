<?php

namespace app\common\model\plus\article;

use app\common\model\BaseModel;

/**
 * 文章分类模型
 */
class Category extends BaseModel
{
    protected $name = 'article_category';
    protected $pk = 'category_id';

    /**
     * 所有分类
     */
    public static function getALL()
    {
        $model = new static;
        return $model->order(['sort' => 'asc', 'create_time' => 'asc'])->select();
    }

}