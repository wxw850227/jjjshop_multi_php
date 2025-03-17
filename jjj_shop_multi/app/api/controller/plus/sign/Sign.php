<?php

namespace app\api\controller\plus\sign;

use app\api\controller\Controller;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\plus\sign\Sign as SignModel;

/**
 * 用户签到控制器
 */
class Sign extends Controller
{
    /**
     * 添加用户签到
     */
    public function add()
    {
        $model = new SignModel();
        $msg = $model->add($this->getUser());
        if ($msg != '') {
            return $this->renderSuccess('', compact('msg'));
        }
        return $this->renderError($model->getError() ?: '签到失败，请重试');
    }

    /**
     * 签到页面
     */
    public function index()
    {
        $user = $this->getUser();   // 用户信息
        $model = new SignModel();
        $list = $model->getListByUserId($user['user_id']);

        //获取签到配置
        $sign_conf = SettingModel::getItem('sign');

        $day_arr = [];
        if (isset($sign_conf['reward_data'])) {
            $day_arr = array_column($sign_conf['reward_data'], 'day');
        }
        $arr = [];
        $point = [];
        foreach ($day_arr as $key => $val) {
            if ($day_arr[$key] - $list[1] > 0) {
                array_push($arr, $val - $list[1]);
                $point[$val - $list[1]] = isset($sign_conf['reward_data'][$key]['point'])?$sign_conf['reward_data'][$key]['point']:0;
            }
        }
        return $this->renderSuccess('', compact('list', 'arr', 'point'));

    }

    /**
     * 获取签到规则
     */
    public function getSign()
    {
        // 获取签到配置
        $sign_conf = SettingModel::getItem('sign');
        $detail = isset($sign_conf['content']) ? $sign_conf['content'] : '';
        return $this->renderSuccess('', compact('detail'));
    }

}