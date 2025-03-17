<?php

namespace app\common\model\settings;

use app\common\model\BaseModel;

/**
 * 配送模板模型
 */
class Delivery extends BaseModel
{
    protected $name = 'delivery';
    protected $pk = 'delivery_id';

    /**
     * 关联配送模板区域及运费
     */
    public function rule()
    {
        return $this->hasMany('DeliveryRule');
    }

    /**
     * 计费方式
     */
    public function getMethodAttr($value)
    {
        $method = [10 => '按件数', 20 => '按重量'];
        return ['text' => $method[$value], 'value' => $value];
    }

    /**
     * 获取全部
     */
    public static function getAll($shop_supplier_id = 0)
    {
        $model = new static;
        if($shop_supplier_id > 0){
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        return $model->order(['sort' => 'asc'])->select();
    }

    /**
     * 获取列表
     */
    public function getList($limit,$shop_supplier_id=0)
    {   
        $where = [];
        if($shop_supplier_id){
            $where['shop_supplier_id'] = $shop_supplier_id;
        }
        return $this->with(['rule'])
            ->where($where)
            ->order(['sort' => 'asc'])
            ->paginate($limit);
    }

    /**
     * 运费模板详情
     */
    public static function detail($delivery_id)
    {
        return (new static())->with(['rule'])->find($delivery_id);
    }

}
