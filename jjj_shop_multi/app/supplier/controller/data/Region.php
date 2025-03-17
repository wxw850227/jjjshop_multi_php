<?php

namespace app\supplier\controller\data;

use app\common\model\settings\Region as RegionModel;
use app\supplier\controller\Controller;

/**
 * 用户数据控制器
 */
class Region extends Controller
{
    /**
     * 商品列表
     */
    public function lists()
    {
        $regionData = RegionModel::getCacheTree();
        return $this->renderSuccess('', compact('regionData'));
    }

}
