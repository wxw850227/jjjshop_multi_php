<?php

namespace app\api\model\store;

use app\common\exception\BaseException;
use app\common\model\store\Clerk as ClerkModel;

/**
 * 商家门店店员模型
 */
class Clerk extends ClerkModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 店员详情
     */
    public static function detail($where)
    {
        $model = parent::detail($where);
        if (!$model) {
            throw new BaseException(['msg' => '未找到店员信息']);
        }
        return $model;
    }

    /**
     * 验证用户是否为核销员
     */
    public function checkUser($store_id)
    {
        if ($this['is_delete']) {
            $this->error = '未找到店员信息';
            return false;
        }
        if ($this['store_id'] != $store_id) {
            $this->error = '当前店员不属于该门店，没有核销权限';
            return false;
        }
        if (!$this['status']) {
            $this->error = '当前店员状态已被禁用';
            return false;
        }
        return true;
    }

}