<?php

namespace app\shop\service;

use app\common\service\product\BaseProductService;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\settings\Delivery as DeliveryModel;
use app\shop\model\user\Grade as GradeModel;

/**
 * 商品服务类
 */
class ProductService extends BaseProductService
{
    /**
     * 商品管理公共数据
     */
    public static function getEditData($model = null, $scene = 'edit')
    {
        // 商品分类
        $category = CategoryModel::getCacheTree();
        // 配送模板,仅仅查当前模板
        $delivery = [];
        if($model){
            $delivery = [DeliveryModel::detail($model['delivery_id'])];
        }
        // 会员等级列表
        $gradeList = GradeModel::getUsableList();
        // 商品sku数据
        $specData = static::getSpecData($model);
        // 商品规格是否锁定
        $isSpecLocked = false;
        return compact('category', 'delivery', 'gradeList', 'specData', 'isSpecLocked');
    }
}