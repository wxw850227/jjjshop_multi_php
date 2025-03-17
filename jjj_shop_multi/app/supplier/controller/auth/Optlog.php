<?php

namespace app\supplier\controller\auth;

use app\supplier\controller\Controller;
use app\supplier\model\supplier\OptLog as OptLogModel;
/**
 * 管理员操作日志
 */
class Optlog extends Controller
{
    /**
     * 操作日志
     */
    public function index()
    {
        $model = new OptLogModel;
        $list = $model->getList($this->postData(),$this->getSupplierId());
        return $this->renderSuccess('', compact('list'));
    }
}