<?php

namespace app\common\model\settings;

use app\common\model\BaseModel;

/**
 * 消息字段模型
 */
class MessageSettings extends BaseModel
{
    protected $name = 'message_settings';
    protected $pk = 'message_settings_id';

    /**
     * 详情
     */
    public static function detail($message_settings_id)
    {
        return (new static())->find($message_settings_id);
    }

    /**
     * 消息详情
     */
    public static function detailByMessageId($message_id)
    {
        return (new static())->where('message_id', '=', $message_id)->find();
    }

    
}
