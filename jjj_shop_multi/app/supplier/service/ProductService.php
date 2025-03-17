<?php

namespace app\supplier\service;

use app\common\model\settings\Setting;
use app\common\service\product\BaseProductService;
use app\shop\model\product\Category as CategoryModel;
use app\shop\model\settings\Delivery as DeliveryModel;

/**
 * 商品服务类
 */
class ProductService extends BaseProductService
{
    /**
     * 商品管理公共数据
     */
    public static function getEditData($model, $scene, $shop_supplier_id)
    {
        // 商品分类
        $category = CategoryModel::getCacheTree();
        // 配送模板
        $delivery = DeliveryModel::getAll($shop_supplier_id);
        // 商品sku数据
        $specData = static::getSpecData($model);
        // 商品规格是否锁定
        $isSpecLocked = false;
        // 商品是否开启平台审核
        $audit_setting = Setting::getItem('store');
        return compact('category', 'delivery', 'specData', 'isSpecLocked', 'audit_setting');
    }
}