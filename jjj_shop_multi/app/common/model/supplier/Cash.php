<?php

namespace app\common\model\supplier;

use app\common\model\BaseModel;

/**
 * 商家供应商提现记录模型
 */
class Cash extends BaseModel
{
    protected $name = 'supplier_cash';
    protected $pk = 'id';

    /**
     * 打款类型
     * @param $value
     * @return array
     */
    public function getPayTypeAttr($value)
    {
        $status = [10 => '支付宝', 20 => '银行卡','30'=>'微信'];
        return ['text' => $status[$value], 'value' => $value];
    }
    /**
     * 状态
     * @param $value
     * @return array
     */
    public function getApplyStatusAttr($value)
    {
        $status = [10 => '待审核', 20 => '审核通过', 30=>'驳回', 40=>'已打款'];
        return ['text' => $status[$value], 'value' => $value];
    }
    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 关联应用表
     */
    public function account()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Account', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 提现详情
     */
    public static function detail($id)
    {
        return (new static())->find($id);
    }
}