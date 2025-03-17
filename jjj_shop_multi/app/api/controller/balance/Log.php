<?php

namespace app\api\controller\balance;

use app\api\controller\Controller;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\user\BalanceLog as BalanceLogModel;

/**
 * 余额账单明细
 */
class Log extends Controller
{
    /**
     * 余额首页
     */
    public function index()
    {
        $user = $this->getUser();
        $list = (new BalanceLogModel)->getTop10($user['user_id']);
        // 余额
        $balance = $user['balance'];
        // 充值功能是否开启
        $balance_setting = SettingModel::getItem('balance');
        $balance_open = intval($balance_setting['is_open']);
        // 提现功能是否开启
        $cash_setting = SettingModel::getItem('balance_cash');
        $cash_open = intval($cash_setting['is_open']);
        return $this->renderSuccess('', compact('list', 'balance', 'balance_open', 'cash_open'));
    }

    /**
     * 余额账单明细列表
     */
    public function lists($type = 'all')
    {
        $user = $this->getUser();
        $list = (new BalanceLogModel)->getList($user['user_id'], $type);
        return $this->renderSuccess('', compact('list'));
    }

}