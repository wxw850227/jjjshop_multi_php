<?php

namespace app\common\enum\order;

use MyCLabs\Enum\Enum;

/**
 * 订单来源
 */
class OrderSourceEnum extends Enum
{
    // 普通订单
    const MASTER = 10;
    /**
     * 获取枚举数据
     */
    public static function data()
    {
        return [
            self::MASTER => [
                'name' => '普通',
                'value' => self::MASTER,
            ],
        ];
    }

}