<?php

namespace app\admin\model\settings;

use app\common\enum\settings\SettingEnum;
use app\common\model\settings\Setting as SettingModel;

class Setting extends SettingModel
{

    /**
     * 新增
     */
    public function add($data)
    {
        $service = $this->where(['key' => SettingEnum::SYS_CONFIG])->find();
        $this->writeCertPemFiles($data, $data['weixin_service']['cert_pem'], $data['weixin_service']['key_pem']);
        if (!$service) {
            $add['key'] = SettingEnum::SYS_CONFIG;
            $add['describe'] = '系统设置';
            $add['values'] = $data;
            return $this->save($add);
        } else {
            return $this->where(['key' => SettingEnum::SYS_CONFIG])->save(['values' => json_encode($data)]);
        }
    }

    private function writeCertPemFiles($data, $cert_pem = '', $key_pem = '')
    {
        if (empty($cert_pem) || empty($key_pem)) {
            return false;
        }
        // 证书目录
        $filePath = root_path() . 'runtime/cert/appwx/10000/';
        // 目录不存在则自动创建
        if (!is_dir($filePath)) {
            mkdir($filePath, 0755, true);
        }
        // 写入cert.pem文件
        if (!empty($cert_pem)) {
            file_put_contents($filePath . 'cert.pem', $cert_pem);
        }
        // 写入key.pem文件
        if (!empty($key_pem)) {
            file_put_contents($filePath . 'key.pem', $key_pem);
        }
        return true;
    }
}
