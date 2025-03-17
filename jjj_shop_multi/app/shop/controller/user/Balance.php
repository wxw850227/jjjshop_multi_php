<?php

namespace app\shop\controller\user;

use app\common\enum\settings\SettingEnum;
use app\shop\controller\Controller;
use app\shop\model\settings\Setting as SettingModel;
use app\shop\model\user\BalanceLog as BalanceLogModel;

/**
 * 余额明细
 */
class Balance extends Controller
{
    /**
     * 余额明细
     */
    public function log()
    {
        $model = new BalanceLogModel;
        return $this->renderSuccess('', [
            // 充值记录列表
            'list' => $model->getList($this->postData('Params')),
            // 属性集
            'attributes' => $model::getAttributes(),
        ]);
    }

    /**
     * 充值设置
     */
    public function setting()
    {
        if ($this->request->isGet()) {
            $values = SettingModel::getItem(SettingEnum::BALANCE);
            return $this->renderSuccess('', compact('values'));
        }
        $model = new SettingModel;
        if ($model->edit(SettingEnum::BALANCE, $this->postData())) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }
}