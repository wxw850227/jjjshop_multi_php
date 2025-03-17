<?php

namespace app\supplier\controller\operate;

use app\supplier\controller\Controller;
use app\supplier\model\user\Favorite as FavoriteModel;

/**
 * 粉丝控制器
 */
class Fans extends Controller
{
    /**
     * 粉丝
     */
    public function index()
    {
        $model = new FavoriteModel;
        $list = $model->getUserList($this->getSupplierId(), $this->postData());
        return $this->renderSuccess('',compact('list'));
    }
}
