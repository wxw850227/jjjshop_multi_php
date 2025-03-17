<?php

namespace app\common\model\user;

use app\common\model\BaseModel;

/**
 * 用户等级模型
 */
class Grade extends BaseModel
{
    protected $pk = 'grade_id';
    protected $name = 'user_grade';

    /**
     * 用户等级模型初始化
     */
    public static function init()
    {
        parent::init();
    }

    /**
     * 获取详情
     */
    public static function detail($grade_id)
    {
        return (new static())->find($grade_id);
    }

    /**
     * 获取列表记录
     */
    public function getLists()
    {
        return $this->where('is_delete', '=', 0)
            ->field('grade_id,name')
            ->order(['weight' => 'asc', 'create_time' => 'asc'])
            ->select();
    }

    /**
     * 获取可用的会员等级列表
     */
    public static function getUsableList($appId = null)
    {
        $model = new static;
        $appId = $appId ? $appId : $model::$app_id;
        return $model->where('is_delete', '=', '0')
            ->where('app_id', '=', $appId)
            ->order(['weight' => 'asc', 'create_time' => 'asc'])
            ->select();
    }

    /**
     * 获取默认等级id
     */
    public static function getDefaultGradeId(){
        $grade = (new static())->where('is_default', '=', 1)->find();
        return $grade['grade_id'];
    }
}