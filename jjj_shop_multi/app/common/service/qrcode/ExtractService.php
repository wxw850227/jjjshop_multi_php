<?php

namespace app\common\service\qrcode;

use Endroid\QrCode\QrCode;

/**
 * 订单核销二维码
 */
class ExtractService extends Base
{
    private $appId;

    //用户
    private $user;

    private $orderId;

    private $orderNo;

    private $source;


    /**
     * 构造方法
     */
    public function __construct($appId, $user, $orderId, $source, $orderNo)
    {
        parent::__construct();
        $this->appId = $appId;
        $this->user = $user;
        $this->orderId = $orderId;
        $this->source = $source;
        $this->orderNo = $orderNo;
    }

    /**
     * 获取小程序码
     */
    public function getImage()
    {
        // 判断二维码文件存在则直接返回url
        if (file_exists($this->getPosterPath())) {
            return $this->getPosterUrl();
        }
        $qrcode = new QrCode($this->orderNo);
        $qrcode = $this->saveMpQrcode($qrcode, $this->appId, $this->orderId, 'image_mp');
        return $this->savePoster($qrcode);
    }

    private function savePoster($qrcode)
    {
        copy($qrcode, $this->getPosterPath());
        return $this->getPosterUrl();
    }

    /**
     * 二维码文件路径
     */
    private function getPosterPath()
    {
        $web_path = $_SERVER['DOCUMENT_ROOT'];
        // 保存路径
        $tempPath = $web_path . "/temp/{$this->appId}/{$this->source}/";
        !is_dir($tempPath) && mkdir($tempPath, 0755, true);
        return $tempPath . $this->getPosterName();
    }

    /**
     * 二维码文件名称
     */
    private function getPosterName()
    {
        return 'clerk_' . md5("{$this->orderId}_{$this->user['user_id']}}") . '.png';
    }

    /**
     * 二维码url
     */
    private function getPosterUrl()
    {
        return \base_url() . "temp/{$this->appId}/{$this->source}/{$this->getPosterName()}" . '?t=' . time();
    }

}