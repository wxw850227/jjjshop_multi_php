<?php


namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 供应商申请模型
 */
class Apply extends BaseModel
{
    protected $pk = 'supplier_apply_id';
    protected $name = 'supplier_apply';

    /**
     * 关联营业执照照
     */
    public function businessImage()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'business_id');
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
     * 关联分类表
     */
    public function category()
    {
        $module = self::getCalledModule() ?: 'common';
        return $this->hasOne("app\\{$module}\\model\\supplier\\Category",'category_id', 'category_id');
    }

    /**
     * 最近申请记录
     */
    public static function getLastDetail($user_id){
        return (new static())->where('user_id','=', $user_id)
            ->order('supplier_apply_id desc')
            ->find();
    }

    //判断用户是否申请
    public function isApply($user_id)
    {
        return $this->where('user_id', '=', $user_id)->where('status', 'in', '0,1,3')->count();
    }
}