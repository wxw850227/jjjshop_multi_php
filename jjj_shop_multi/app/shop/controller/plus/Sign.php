<?php

namespace app\shop\controller\plus;

use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\shop\model\plus\sign\Sign as SignModel;

/**
 * Class Officia
 * 签到有礼控制器
 * @package app\shop\controller\plus\officia
 */
class Sign extends Controller
{

    private $days = [2, 3, 4, 5, 6, 7, 15, 30, 60];
    private $sign_date = [7, 15, 30];

    /**
     * 签到有礼配置
     */
    public function index()
    {
        $key = 'sign';
        if($this->request->isGet()){
            $vars['values'] = SettingModel::getItem($key);
            return $this->renderSuccess('', compact('vars'));
        }

        $model = new SettingModel;
        if ($model->edit($key, $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
    }

    /**
     * 获取用户签到列表
     */
    public function lists()
    {
        $model = new SignModel;
        $list = $model->getList($this->postData(), $this->days, $this->sign_date);

        return $this->renderSuccess('', compact('list'));
    }

}