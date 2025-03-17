<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 规格/属性(值)模型
 */
class SpecValue extends BaseModel
{
    protected $name = 'spec_value';
    protected $pk = 'spec_value_id';
    protected $updateTime = false;

    /**
     * 关联规格组表
     */
    public function spec()
    {
        return $this->belongsTo('Spec');
    }

    public function getSpecValue($data)
    {
        return $this->with(['spec'])->where('spec_value_id', 'in', $data)->select();
    }

}
