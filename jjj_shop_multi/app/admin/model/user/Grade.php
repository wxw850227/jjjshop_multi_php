<?php

namespace app\admin\model\user;

use app\common\model\user\Grade as GradeModel;

/**
 * 用户会员等级模型
 */
class Grade extends GradeModel
{
    /**
     * 新增记录
     */
    public function insertDefault($app_id)
    {
        $data = [
            'name' => '普通会员',
            'is_default' => 1,
            'remark' => '新用户即为该等级',
            'app_id' => $app_id
        ];
        return self::save($data);
    }

}