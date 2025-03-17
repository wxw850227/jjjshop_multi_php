<?php

namespace app\common\library\easywechat;

use app\api\service\order\paysuccess\type\PayTypeSuccessFactory;
use app\common\enum\order\OrderPayTypeEnum;
use app\common\exception\BaseException;
use app\common\model\app\App as AppModel;

/**
 * 微信支付
 */
class WxPay
{
    // 微信支付配置
    private $app;

    /**
     * 构造函数
     */
    public function __construct($app)
    {
        $this->app = $app;
    }

    /**
     * 统一下单API
     */
    public function unifiedorder($order_no, $openid, $totalFee, $orderType, $pay_source, $multiple)
    {
        $data = [
            "mchid" => $this->app->getConfig()['mch_id'],
            "out_trade_no" => $order_no,
            "appid" => $this->app->getConfig()['app_id'],
            "description" => $order_no,
            "notify_url" => base_url() . 'index.php/job/notify/wxpay',
            'attach' => json_encode(['order_type' => $orderType, 'pay_source' => $pay_source, 'multiple' => $multiple]),
            "amount" => [
                "total" => intval($totalFee * 100),
                "currency" => "CNY"
            ],
            "payer" => [
                "openid" => $openid
            ]
        ];
        $url = "v3/pay/transactions/jsapi";
        //h5支付差异
        if ($pay_source == 'h5') {
            $url = "v3/pay/transactions/h5";
            unset($data['payer']);
            $data['scene_info'] = [
                "payer_client_ip" => request()->ip(),
                "h5_info" => [
                    "type" => "Wap"
                ]
            ];
        }
        if ($pay_source == 'android' || $pay_source == 'ios') {
            unset($data['payer']);
            $url = "v3/pay/transactions/app";
        }
        // 是否开启服务商支付
        if (isset($this->app->getConfig()['sub_appid']) && $this->app->getConfig()['sub_appid']) {
            $url = "v3/pay/partner/transactions/jsapi";
            unset($data['mchid']);
            unset($data['appid']);
            unset($data['payer']['openid']);
            $data['sp_appid'] = $this->app->getConfig()['sp_appid'];
            $data['sp_mchid'] = $this->app->getConfig()['sp_mchid'];
            $data['sub_appid'] = $this->app->getConfig()['sub_appid'];
            $data['sub_mchid'] = $this->app->getConfig()['sub_mch_id'];
            $data['payer']['sub_openid'] = $openid;
        }
        log_write(json_encode($data));
        // 统一下单
        $payApp = $this->app->getClient();
        $response = $payApp->postJson($url, $data);
        $result = $response->toArray(false);

        //如果是微信小程序
        if ($pay_source == 'wx' || $pay_source == 'android' || $pay_source == 'ios' || $pay_source == 'mp') {
            // 请求失败
            if (!isset($result['prepay_id'])) {
                throw new BaseException(['msg' => "微信支付api：{$result['message']}", 'code' => 0]);
            }
            if ($pay_source == 'wx' || $pay_source == 'mp') {
                $prepayId = $result['prepay_id'];
                $utils = $this->app->getUtils();
                $appId = $this->app->getConfig()['app_id'];
                $signType = 'RSA';
                $config = $utils->buildMiniAppConfig($prepayId, $appId, $signType);
                return [
                    'appId' => $appId,
                    'nonceStr' => $config['nonceStr'],
                    'timeStamp' => $config['timeStamp'],
                    'paySign' => $config['paySign'],
                    "signType" => $config['signType'],
                    'package' => $config['package'],
                ];
            } else if ($pay_source == 'android' || $pay_source == 'ios') {
                $prepayId = $result['prepay_id'];
                $utils = $this->app->getUtils();
                $appId = $this->app->getConfig()['app_id'];
                $signType = 'RSA';
                $config = $utils->buildAppConfig($prepayId, $appId, $signType);
                return $config;
            }
        }
        // 请求失败
        if (!isset($result['h5_url'])) {
            throw new BaseException(['msg' => "微信支付api：{$result['message']}", 'code' => 0]);
        }
        return $result;
    }

    /**
     * 支付成功异步通知
     */
    public function notify()
    {
        if (!$json = file_get_contents('php://input')) {
            log_write('Not found DATA');
            $this->returnCode(false, 'Not found DATA');
        }
        log_write($json);
        $wechatpay_serial = request()->header('wechatpay-serial');
        $json = json_decode($json, true);
        $apikey = AppModel::getBySerial($wechatpay_serial);
        $AesUtil = new AesUtil($apikey);
        $data = $AesUtil->decryptToString($json['resource']['associated_data'], $json['resource']['nonce'], $json['resource']['ciphertext']);
        $data = json_decode($data, true);
        $attach = json_decode($data['attach'], true);
        // 实例化订单模型
        $PaySuccess = PayTypeSuccessFactory::getFactory($data['out_trade_no'], $attach);
        $app_id = $PaySuccess->isExist();
        $app_id == 0 && $this->returnCode(false, '订单不存在');
        if ($data['trade_state'] != 'SUCCESS') {
            $this->returnCode(false, $data['trade_state_desc']);
        }
        // 订单支付成功业务处理
        $status = $PaySuccess->onPaySuccess(OrderPayTypeEnum::WECHAT, $data);
        if ($status == false) {
            $this->returnCode(false, $PaySuccess->error);
        }
        // 返回状态
        $this->returnCode(true, 'OK');
    }

    /**
     * 申请退款API
     */
    public function refund($transaction_id, $total_fee, $refund_fee)
    {
        $out_refund_no = time();
        $data = [
            "transaction_id" => $transaction_id,
            "out_refund_no" => "{$out_refund_no}",
            "notify_url" => base_url(),
            "amount" => [
                "refund" => intval($refund_fee * 100),
                "total" => intval($total_fee * 100),
                "currency" => "CNY"
            ],
        ];
        $url = 'v3/refund/domestic/refunds';
        // 是否开启服务商支付
        if (isset($this->app->getConfig()['sub_appid']) && $this->app->getConfig()['sub_appid']) {
            $url = "v3/ecommerce/refunds/apply";
            $data['sp_appid'] = $this->app->getConfig()['sp_appid'];
            $data['sp_mchid'] = $this->app->getConfig()['sp_mchid'];
            //$data['sub_appid'] = $this->app->getConfig()['sub_appid'];
            $data['sub_mchid'] = $this->app->getConfig()['sub_mch_id'];
        }
        $payApp = $this->app->getClient();
        $result = $payApp->postJson($url, $data);
        $result = $result->toArray(false);
        // 请求失败
        if (!isset($result['refund_id'])) {
            throw new BaseException(['msg' => isset($result['message']) ? $result['message'] : '退款失败']);
        }
        return true;
    }

    /**
     * 返回状态给微信服务器
     */
    private function returnCode($returnCode, $msg = null)
    {
        // 返回状态
        $return = [
            'return_code' => $returnCode ? 'SUCCESS' : 'FAIL',
            'return_msg' => $msg ?: 'OK',
        ];
        // 记录日志
        log_write([
            'describe' => '返回微信支付状态',
            'data' => $return
        ]);
        die($this->toXml($return));
    }

    /**
     * 输出xml字符
     * @param $values
     * @return bool|string
     */
    private function toXml($values)
    {
        if (!is_array($values)
            || count($values) <= 0
        ) {
            return false;
        }

        $xml = "<xml>";
        foreach ($values as $key => $val) {
            if (is_numeric($val)) {
                $xml .= "<" . $key . ">" . $val . "</" . $key . ">";
            } else {
                $xml .= "<" . $key . "><![CDATA[" . $val . "]]></" . $key . ">";
            }
        }
        $xml .= "</xml>";
        return $xml;
    }
}
