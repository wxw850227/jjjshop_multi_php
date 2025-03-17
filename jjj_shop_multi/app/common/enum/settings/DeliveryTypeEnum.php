<?php

namespace app\common\enum\settings;

use MyCLabs\Enum\Enum;
/**
 * 配送方式枚举类
 */
class DeliveryTypeEnum extends Enum
{
    // 快递配送
    const EXPRESS = 10;

    // 上门自提
    const EXTRACT = 20;

    // 无需物流
    const NO_EXPRESS = 30;

    /**
     * 获取枚举数据
     */
    public static function data()
    {
        return [
            self::EXPRESS => [
                'name' => '快递配送',
                'value' => self::EXPRESS,
            ],
            self::NO_EXPRESS => [
                'name' => '无需物流',
                'value' => self::NO_EXPRESS,
            ],
            self::EXTRACT => [
                'name' => '上门自提',
                'value' => self::EXTRACT,
            ],
        ];
    }

}