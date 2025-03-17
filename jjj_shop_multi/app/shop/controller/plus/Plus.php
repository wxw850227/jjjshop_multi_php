<?php

namespace app\shop\controller\plus;

use app\shop\model\plus\plus\Category as CategoryModel;
use app\shop\controller\Controller;

/**
 * 插件控制器
 */
class Plus extends Controller
{
    /**
     * 插件列表
     */
    public function index()
    {
        $list = CategoryModel::getAll();
        return $this->renderSuccess('', compact('list'));
    }


}