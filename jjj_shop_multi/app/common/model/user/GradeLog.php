<?php

namespace app\common\model\user;

use app\common\model\BaseModel;

/**
 * 用户会员等级变更记录模型
 */
class GradeLog extends BaseModel
{
    protected $name = 'user_grade_log';
    protected $pk = 'log_id';
    protected $updateTime = false;

    /**
     * 关联会员记录表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User');
    }

    /**
     * 关联会员记录表
     */
    public function oldGrade()
    {
        return $this->belongsTo('app\\common\\model\\user\\Grade', 'old_grade_id', 'grade_id');
    }

    /**
     * 关联会员记录表
     */
    public function grade()
    {
        return $this->belongsTo('app\\common\\model\\user\\Grade', 'new_grade_id', 'grade_id');
    }

    public function getList($params)
    {
        $model = $this;
        if (isset($params['search']) && !empty($params['search'])) {
            $model = $model->where('user.nickName', 'like', "%{$params['search']}%");
        }
        return $model->alias('log')->with(['user', 'oldGrade', 'grade'])
            ->join('user user', 'user.user_id = log.user_id', 'left')
            ->order(['log.create_time' => 'desc'])
            ->field('log.*')
            ->paginate($params);
    }
}