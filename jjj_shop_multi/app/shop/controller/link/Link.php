<?php

namespace app\shop\controller\link;

use app\shop\controller\Controller;
use app\shop\model\page\Page as PageModel;

/**
 * Class Link
 * @package app\shop\controller\link
 * 超链接控制器
 */
class Link extends Controller
{
    /**
     * 获取自定义页面
     */
    public function getPageList()
    {
        $model = new PageModel;
        $list = $model->getLists();
        return $this->renderSuccess('', compact('list'));
    }
}
