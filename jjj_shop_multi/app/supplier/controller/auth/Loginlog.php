<?php

namespace app\supplier\controller\auth;

use app\supplier\controller\Controller;
use app\supplier\model\supplier\LoginLog as LoginLogModel;
/**
 * 管理员登录日志
 */
class Loginlog extends Controller
{
    /**
     * 登录日志
     */
    public function index()
    {
        $model = new LoginLogModel;
        $list = $model->getList($this->getSupplierId(), $this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}