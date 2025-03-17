<?php

namespace app\common\model\user;

use app\common\model\BaseModel;
use app\common\model\settings\Region;

class UserAddress extends BaseModel
{
    protected $name = 'user_address';
    protected $pk = 'address_id';
    /**
     * 追加字段
     * @var array
     */
    protected $append = ['region'];

    /**
     * 地区名称
     */
    public function getRegionAttr($value, $data)
    {
        return [
            'province' => Region::getNameById($data['province_id']),
            'city' => Region::getNameById($data['city_id']),
            'region' => $data['region_id'] == 0 ? $data['district']
                : Region::getNameById($data['region_id']),
        ];
    }
}