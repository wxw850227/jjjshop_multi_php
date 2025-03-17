<?php

namespace app\common\model\page;

use app\common\model\BaseModel;

/**
 * app分类页模板模型
 */
class PageCategory extends BaseModel
{
    //表名
    protected $name = 'page_category';
    //主键字段名
    protected $pk = 'app_id';

    /**
     * 获取应用信息
     */
    public static function detail()
    {
        //全局有app_id，不用加
        $model = (new static())->find();
        // 如果没有默认值,先插入
        if(!$model){
            $model = new self();
            $model->save([
                'app_id' => self::$app_id,
                'category_style' => 10
            ]);
        }
        return $model;
    }

}
