<?php

namespace app\api\model\product;

use app\common\model\settings\Delivery as DeliveryModel;

/**
 * 运费模板模型
 */
class Delivery extends DeliveryModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'app_id',
        'create_time',
        'update_time'
    ];

}