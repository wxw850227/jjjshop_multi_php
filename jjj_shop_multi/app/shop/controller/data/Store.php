<?php

namespace app\shop\controller\data;

use app\shop\controller\Controller;
use app\shop\model\store\Store as StoreModel;

class Store extends Controller
{
    /**
     * 门店列表
     */
    public function lists()
    {
        $list = (new StoreModel())->getAllList();
        return $this->renderSuccess('', compact('list'));
    }

}