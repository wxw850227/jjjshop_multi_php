<?php


namespace app\common\model\store;

use app\common\model\BaseModel;
use app\common\model\settings\Region as RegionModel;


/**
 * 门店订单模型
 */
class Store extends BaseModel
{
    protected $pk = 'store_id';

    protected $name = 'store';

    protected $append = ['region'];

    /**
     * 关联门店logo
     */
    public function logo()
    {
        return $this->hasOne("app\\common\\model\\file\\UploadFile", 'file_id', 'logo_image_id');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 地区名称
     */
    public function getRegionAttr($value, $data)
    {
        return [
            'province' => RegionModel::getNameById($data['province_id']),
            'city' => RegionModel::getNameById($data['city_id']),
            'region' => $data['region_id'] == 0 ? '' : RegionModel::getNameById($data['region_id']),
        ];
    }


    /**
     * 门店状态
     */
    public function getStatusAttr($value)
    {
        $status = [0 => '禁用', 1 => '启用'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 是否支持自提核销
     */
    public function getIsCheckAttr($value)
    {
        $status = [0 => '不支持', 1 => '支持'];
        return ['text' => $status[$value], 'value' => $value];
    }


    /**
     * 门店详情
     */
    public static function detail($store_id)
    {
        return (new static())->with(['logo'])->where('store_id','=',$store_id)->find();
    }
}