<?php

namespace app\common\model\product;

use app\common\model\BaseModel;
/**
 * 商品规格关系模型
 */
class ProductSpecRel extends BaseModel
{
    protected $name = 'product_spec_rel';
    protected $pk = 'id';
    protected $updateTime = false;

    /**
     * 关联规格组
     */
    public function spec()
    {
        return $this->belongsTo('Spec');
    }

}
