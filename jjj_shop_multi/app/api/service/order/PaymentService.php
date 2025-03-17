<?php

namespace app\api\service\order;

use app\common\library\easywechat\AppOpen;
use app\common\library\easywechat\AppWx;
use app\common\library\easywechat\AppMp;
use app\common\library\easywechat\WxPay;

class PaymentService
{
    /**
     * 构建微信支付
     */
    public static function wechat(
        $user,
        $order_no,
        $orderType,
        $pay_source,
        $online_money,
        $multiple = 0
    )
    {
        // 统一下单API
        $app = null;
        if ($pay_source == 'wx') {
            $app = AppWx::getWxPayApp($user['app_id']);
            $open_id = $user['open_id'];
        }
        $WxPay = new WxPay($app);
        $payment = $WxPay->unifiedorder($order_no, $open_id, $online_money, $orderType, $pay_source, $multiple);
        return $payment;
    }
}