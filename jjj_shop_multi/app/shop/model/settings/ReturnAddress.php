<?php

namespace app\shop\model\settings;

use app\common\model\settings\ReturnAddress as ReturnAddressModel;

/**
 * 退货地址模型
 */
class ReturnAddress extends ReturnAddressModel
{
    /**
     * 获取列表
     */
    public function getList($limit = 10)
    {
        return $this->order(['sort' => 'asc'])
            ->where('is_delete', '=', 0)
            ->paginate($limit);
    }

    /**
     * 获取全部收货地址
     */
    public function getAll($shop_supplier_id)
    {   
        $model = $this;
        if($shop_supplier_id){
            $model = $model->where(['shop_supplier_id'=>$shop_supplier_id]);
        }
        return $model->order(['sort' => 'asc'])
            ->where('is_delete', '=', 0)
            ->select();
    }

    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        return $this->save($data);
    }

    /**
     * 删除记录
     */
    public function remove()
    {
        return $this->save(['is_delete' => 1]);
    }

}