<?php

namespace app\api\controller;

use app\api\model\page\Page as AppPage;
use app\api\model\settings\Setting as SettingModel;
use app\common\enum\settings\SettingEnum;
use app\common\model\settings\Setting;
use app\common\model\supplier\Service as ServiceModel;

/**
 * 页面控制器
 */
class Index extends Controller
{
    /**
     * 首页
     */
    public function index($page_id = null, $url = '')
    {
        // 页面元素
        $data = AppPage::getPageData($this->getUser(false), $page_id);
        $data['setting'] = array(
            'collection' => SettingModel::getItem('collection'),
            'officia' => SettingModel::getItem('officia'),
            'homepush' => SettingModel::getItem('homepush'),
        );
        // 扫一扫参数
        $data['signPackage'] = $this->getScanParams($url)['signPackage'];
        return $this->renderSuccess('', $data);
    }

    /**
     * 首页
     */
    public function diy($page_id = null, $url = '')
    {
        // 页面元素
        $data = AppPage::getPageData($this->getUser(false), $page_id);
        // 微信公众号分享参数
        $data['share'] = $this->getShareParams($url, $data['page']['params']['share_title'], $data['page']['params']['share_title'], '/pages/diy-page/diy-page', $data['page']['params']['share_img']);
        return $this->renderSuccess('', $data);
    }

    // 公众号客服
    public function mpService($shop_supplier_id)
    {
        $mp_service = ServiceModel::detail($shop_supplier_id);
        return $this->renderSuccess('', compact('mp_service'));
    }

    //底部导航
    public function nav()
    {
        $data['vars'] = SettingModel::getItem(SettingEnum::NAV);
        $data['theme'] = SettingModel::getItem(SettingEnum::THEME);
        $data['points_name'] = SettingModel::getPointsName();
        return $this->renderSuccess('', $data);
    }

    public function policy(){
        $config = Setting::getItem('store');
        return $this->renderSuccess('',[
            'service' => $config['policy']['service'],
            'privacy' => $config['policy']['privacy'],
        ]);
    }
}
