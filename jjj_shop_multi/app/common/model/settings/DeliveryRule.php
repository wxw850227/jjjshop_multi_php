<?php

namespace app\common\model\settings;

use app\common\model\BaseModel;

/**
 * 配送模板区域及运费模型
 */
class DeliveryRule extends BaseModel
{
    protected $name = 'delivery_rule';
    protected $pk = 'rule_id';
    protected $updateTime = false;

    /**
     * 追加字段
     * @var array
     */
    protected $append = ['region_data'];

    /**
     * 地区集转为数组格式
     */
    public function getRegionDataAttr($value, $data)
    {
        return explode(',', $data['region']);
    }
}
