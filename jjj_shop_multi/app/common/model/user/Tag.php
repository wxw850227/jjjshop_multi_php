<?php

namespace app\common\model\user;

use app\common\model\BaseModel;

/**
 * 用户等级模型
 */
class Tag extends BaseModel
{
    protected $pk = 'tag_id';
    protected $name = 'tag';

    /**
     * 获取详情
     */
    public static function detail($tag_id)
    {
        return self::find($tag_id);
    }

    /**
     * 获取详情
     */
    public static function getAll()
    {
        return self::select();
    }
}