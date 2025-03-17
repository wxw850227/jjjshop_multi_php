<?php

namespace app\supplier\controller\setting;

use app\supplier\controller\Controller;
use app\common\model\settings\Express as ExpressModel;

/**
 * 物流控制器
 */
class Express extends Controller
{
    /**
     * 物流数据
     */
    public function index()
    {
        $model = new ExpressModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('',compact('list'));
    }
}
