<?php

namespace app\shop\controller;

use app\shop\model\settings\Setting as SettingModel;
use app\shop\model\shop\User;

/**
 * 商户认证
 */
class Passport extends Controller
{
    /**
     * 商户后台登录
     */
    public function login()
    {
        $user = $this->postData();
        $user['password'] = salt_hash($user['password']);
        $model = new User();
        if ($userInfo = $model->checkLogin($user)) {
            // 商城名称
            $shop_name = SettingModel::getItem('store')['name'];
            //当前系统版本
            $version = get_version();
            return $this->renderSuccess('登录成功', [
                'app_id' => $userInfo['app']['app_id'],
                'user_name' => $userInfo['user_name'],
                'token' => $userInfo['token'],
                'shop_name' => $shop_name,
                'version' => $version,
            ]);
        }
        return $this->renderError($model->getError() ?: '登录失败');
    }

    /**
     * 退出登录
     */
    public function logout()
    {
        return $this->renderSuccess('退出成功');
    }

    /*
   * 修改密码
   */
    public function editPass()
    {
        $model = new User();
        if ($model->editPass($this->postData(), $this->store['user'])) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * 商户后台登录
     */
    public function saasLogin()
    {
        //登录前清空session
        $store = $this->store;
        if ($store != null) {
            return $this->renderSuccess('登录成功', $store['user']['user_name']);
        }
        return $this->renderError('自动登录失败，请手动输入');
    }
}
