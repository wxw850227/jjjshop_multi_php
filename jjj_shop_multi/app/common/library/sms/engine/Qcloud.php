<?php

namespace app\common\library\sms\engine;

use app\common\library\sms\package\qcloud\SmsSingleSender;

/**
 * 腾讯云短信模块引擎
 */
class Qcloud extends Server
{
    private $config;

    /**
     * 构造方法
     */
    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 发送短信通知
     */
    public function sendSms($mobile, $template_code, $templateParams)
    {
        try {
            $ssender = new SmsSingleSender($this->config['AccessKeyId'], $this->config['AccessKeySecret']);
            $params = "";
            if (isset($templateParams['code']) && $templateParams['code']) {
                $params = ["{$templateParams['code']}"];
            }
            $result = $ssender->sendWithParam("86", $mobile, $template_code,
                $params, $this->config['sign'], "", "");
            $rsp = json_decode($result, 1);
            if ($rsp['result'] == 0) {
                return true;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        }
    }


}
