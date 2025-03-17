<?php


namespace app\shop\model\store;

use app\common\model\store\Clerk as ClerkModel;

/**
 * 店员模型
 */
class Clerk extends ClerkModel
{

    const FORM_SCENE_ADD = 'add';
    const FORM_SCENE_EDIT = 'edit';

    /**
     * 获取列表数据
     */
    public function getList($status, $store_id, $search, $params)
    {
        $model = $this;
        if ($status > -1) {
            $model = $model->where('status', '=', (int)$status);
        }
        if ($store_id > 0) {
            $model = $model->where('store_id', '=', (int)$store_id);
        }
        if (!empty($search)) {
            $model = $model->where('real_name|mobile', 'like', '%' . $search . '%');
        }
        // 查询列表数据
        return $model->with(['store.supplier', 'user'])
            ->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 查询所有列表数据
     */
    public function getAll($shop_supplier_id = 0)
    {
        $model = $this;
        if ($shop_supplier_id > 0) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        // 查询列表数据
        return $model->where('is_delete', '=', '0')->with(['store'])->select();

    }

    /**
     * 新增记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        return self::create($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        // 表单验证
        if (!$this->validateForm($data, self::FORM_SCENE_EDIT)) {
            return false;
        }

        return $this->save($data);
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }

    /**
     * 表单验证
     */
    private function validateForm($data, $scene = self::FORM_SCENE_ADD)
    {
        if ($scene === self::FORM_SCENE_ADD) {
            if (!isset($data['user_id']) || empty($data['user_id'])) {
                $this->error = '请选择用户';
                return false;
            }
            if (self::detail(['user_id' => $data['user_id'], 'is_delete' => 0])) {
                $this->error = '该用户已经是店员，无需重复添加';
                return false;
            }
        }
        return true;
    }

}