<?php

namespace app\supplier\model\settings;

use app\common\model\settings\ReturnAddress as ReturnAddressModel;

/**
 * 退货地址模型
 */
class ReturnAddress extends ReturnAddressModel
{
    /**
     * 获取列表
     */
    public function getList($limit,$shop_supplier_id)
    {
        return $this->order(['sort' => 'asc'])
            ->where('shop_supplier_id','=',$shop_supplier_id)
            ->where('is_delete', '=', 0)
            ->paginate($limit);
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