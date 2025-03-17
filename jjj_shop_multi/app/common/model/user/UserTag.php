<?php

namespace app\common\model\user;

use app\common\model\BaseModel;

/**
 * 用户等级模型
 */
class UserTag extends BaseModel
{
    protected $pk = 'user_tag_id';
    protected $name = 'user_tag';

    /**
     * 关联会员等级表
     */
    public function tag()
    {
        return $this->belongsTo('app\\common\\model\\user\\Tag', 'tag_id', 'tag_id');
    }

    public static function getListByUser($user_id){
        $model = new self;
        return $model->alias('user_tag')->field(['user_tag.*,tag.tag_name'])
            ->join('tag', 'tag.tag_id = user_tag.tag_id', 'left')
            ->where('user_tag.user_id', '=', $user_id)
            ->order(['user_tag.create_time' => 'asc'])
            ->select();
    }

    public static function getCountByTag($tag_id){
        $model = new self;
        return $model->where('tag_id', '=', $tag_id)
            ->count();
    }
}