<?php

namespace app\api\controller\user;

use app\api\model\user\User as UserModel;
use app\api\controller\Controller;
use app\api\model\settings\Setting as SettingModel;
use app\common\library\easywechat\AppWx;

/**
 * 用户管理模型
 */
class User extends Controller
{
    /**
     * 用户自动登录,默认微信小程序
     */
    public function login()
    {
        $model = new UserModel;
        $user_id = $model->login($this->request->post());
        return $this->renderSuccess('', [
            'user_id' => $user_id,
            'token' => $model->getToken()
        ]);
    }

    /**
     * 当前用户详情
     */
    public function detail()
    {
        // 当前用户信息
        $userInfo = $this->getUser();
        $gift_name = SettingModel::getItem('live')['gift_name'];
        return $this->renderSuccess('', compact('userInfo', 'gift_name'));
    }

    public function getSession($code)
    {
        // 微信登录 获取session_key
        $app = AppWx::getApp();
        $session_key = null;
        $session = AppWx::sessionKey($app, $code);
        if ($session != null) {
            $session_key = $session['session_key'];
        }
        return $this->renderSuccess('', compact('session_key'));
    }

    /**
     * 绑定手机号
     */
    public function bindMobile()
    {
        $model = $this->getUser();
        if ($model->bindMobile($this->request->post())) {
            return $this->renderSuccess('');
        }
        return $this->renderError('绑定失败');
    }

    /**
     * 修改用户信息
     */
    public function updateInfo()
    {
        // 当前用户信息
        $model = $this->getUser();
        if ($model->edit($this->request->post())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * 积分转换余额
     */
    public function transPoints($points = 0)
    {
        // 当前用户信息
        $model = $this->getUser();
        if ($model->transPoints($points)) {
            return $this->renderSuccess('转换成功');
        }
        return $this->renderError($model->getError() ?: '转换失败');
    }

    /**
     * 删除账号
     */
    public function deleteAccount()
    {
        $model = new UserModel();
        if ($model->setDelete($this->getUser())) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }
}