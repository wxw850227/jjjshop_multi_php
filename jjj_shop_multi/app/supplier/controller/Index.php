<?php

namespace app\supplier\controller;

use app\common\model\settings\Setting as SettingModel;
use app\supplier\service\ShopService;

/**
 * 后台首页控制器
 */
class Index extends Controller
{
    /**
     * 后台首页
     */
    public function index()
    {
        $service = new ShopService($this->getSupplierId());
        return $this->renderSuccess('', ['data' => $service->getHomeData()]);
    }

    /**
     * 登录数据
     */
    public function base()
    {
        $config = SettingModel::getSysConfig();
        $settings = [
            'supplier_name' => $config['supplier_name'],
            'supplier_bg_img' => $config['supplier_bg_img']
        ];
        return $this->renderSuccess('', compact('settings'));
    }
}