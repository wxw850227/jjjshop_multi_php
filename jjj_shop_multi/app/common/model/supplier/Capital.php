<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;
/**
 * 供应商资金明细模型
 */
class Capital extends BaseModel
{
    protected $name = 'supplier_capital';
    protected $pk = 'id';

    /**
     * 分销商资金明细
     * @param $data
     */
    public static function add($data)
    {
        $model = new static;
        $model->save(array_merge([
            'app_id' => $model::$app_id
        ], $data));
    }
}