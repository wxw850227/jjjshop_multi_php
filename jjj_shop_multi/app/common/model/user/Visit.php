<?php


namespace app\common\model\user;

use app\common\model\BaseModel;
/**
 * 收藏模型
 */
class Visit extends BaseModel
{
    protected $pk = 'favorite_id';
    protected $name = 'user_visit';

    /**
     * 关联用户
     */
    public function user()
    {
        return $this->hasOne('app\\common\\model\\user\\User','user_id','user_id')->field(['user_id','nickName','mobile','avatarUrl','create_time']);
    }
}