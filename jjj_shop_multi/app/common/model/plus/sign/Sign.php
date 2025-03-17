<?php

namespace app\common\model\plus\sign;

use app\common\model\BaseModel;

/**
 * 用户签到模型
 */
class Sign extends BaseModel
{
    protected $name = 'user_sign';
    protected $pk = 'user_sign_id';

    /**
     * 关联用户
     * @return \think\model\relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo("app\\common\\model\\user\\User", 'user_id', 'user_id');
    }

}
