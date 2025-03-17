<?php

namespace app\supplier\controller\data;

use app\supplier\controller\Controller;
use app\supplier\model\user\Favorite as FavoriteModel;
/**
 * 关注用户控制器
 */
class User extends Controller
{
    /**
     * 关注用户列表
     */
    public function lists()
    {
        $supplier = $this->supplier['user'];
        $model = new FavoriteModel();
        $list = $model->getUserList($supplier['shop_supplier_id'], $this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}
