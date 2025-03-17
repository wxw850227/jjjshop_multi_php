<?php

namespace app\common\model\user;

use app\common\model\BaseModel;
use app\common\enum\user\GiftLogSceneEnum;

/**
 * 用户礼物币变动明细模型
 */
class GiftLog extends BaseModel
{
    protected $name = 'user_gift_log';
    protected $updateTime = false;

    /**
     * 获取当前模型属性
     */
    public static function getAttributes()
    {
        return [
            // 充值方式
            'scene' => GiftLogSceneEnum::data(),
        ];
    }

    /**
     * 关联会员记录表
     */
    public function user()
    {
        $module = self::getCalledModule() ?: 'common';
        return $this->belongsTo("app\\{$module}\\model\\user\\User");
    }

    /**
     * 变动场景
     */
    public function getSceneAttr($value)
    {
        return ['text' => GiftLogSceneEnum::data()[$value]['name'], 'value' => $value];
    }

    /**
     * 新增记录
     */
    public static function add($scene, $data, $describeParam)
    {
        $model = new static;
        $model->save(array_merge([
            'scene' => $scene,
            'describe' => vsprintf(GiftLogSceneEnum::data()[$scene]['describe'], $describeParam),
            'app_id' => $model::$app_id
        ], $data));
    }

}