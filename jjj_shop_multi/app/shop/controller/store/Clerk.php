<?php

namespace app\shop\controller\store;

use app\shop\controller\Controller;
use app\shop\model\store\Clerk as ClerkModel;
use app\shop\model\store\Store as StoreModel;

/**
 * 店员控制器
 */
class Clerk extends Controller
{

    /**
     * 店员列表
     */
    public function index($store_id = 0, $search = '')
    {
        // 店员列表
        $model = new ClerkModel;
        $list = $model->getList(-1, $store_id, $search, $this->postData());
        // 门店列表
        $store_list = (new StoreModel)->getList();

        return $this->renderSuccess('', compact('list', 'store_list'));
    }

    /**
     * 添加店员
     */
    public function add()
    {
        $model = new ClerkModel;
        //传过来的信息
        $data = $this->postData();

        $list = $model->getAll()->toArray();
        $list_user_id = array_column($list, 'user_id');
        if (in_array($data['user_id'], $list_user_id)) {
            return $this->renderError('', '该用户已经是店员，无需重复添加');
        }
        // 新增记录
        if ($model->add($data)) {
            return $this->renderSuccess('', '添加成功');
        }
        return $this->renderError('', $model->getError() ?: '添加失败');
    }

    public function detail($clerk_id)
    {
        $detail = ClerkModel::detail($clerk_id);
        // 门店列表
        $store_list = StoreModel::getAllList();
        return $this->renderSuccess('', compact('detail', 'store_list'));
    }

    /**
     * 编辑店员
     */
    public function edit($clerk_id)
    {
        if($this->request->isGet()){
            return $this->detail($clerk_id);
        }
        $model = ClerkModel::detail($clerk_id);
        //编辑店员的数据
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('', '更新成功');
        }
        return $this->renderError('', $model->getError() ?: '更新失败');

    }

    /**
     * 删除店员
     */
    public function delete($clerk_id)
    {
        // 店员详情
        $model = ClerkModel::detail($clerk_id);
        if (!$model->setDelete()) {
            return $this->renderError('', '删除失败');
        }
        return $this->renderSuccess('', $model->getError() ?: '删除成功');
    }

}
