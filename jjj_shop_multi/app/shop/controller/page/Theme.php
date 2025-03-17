<?php

namespace app\shop\controller\page;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;

/**
 * 主题设置控制器
 */
class Theme extends Controller
{
    /**
     * 主题设置
     */
    public function index()
    {
        if ($this->request->isGet()) {
            $vars['values'] = SettingModel::getItem('theme');
            return $this->renderSuccess('', compact('vars'));
        }
        $model = new SettingModel;
        $data = $this->request->param();
        if ($model->edit('theme', $data)) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}
