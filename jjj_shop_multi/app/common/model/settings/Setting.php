<?php

namespace app\common\model\settings;

use app\common\enum\settings\SettingEnum;
use think\facade\Cache;
use app\common\enum\settings\DeliveryTypeEnum;
use app\common\model\BaseModel;
use app\common\enum\settings\OperateTypeEnum;
use think\Model;

/**
 * 系统设置模型
 */
class Setting extends BaseModel
{
    protected $name = 'setting';
    protected $createTime = false;

    /**
     * 获取器: 转义数组格式
     */
    public function getValuesAttr($value)
    {
        return json_decode($value, true);
    }

    /**
     * 修改器: 转义成json格式
     */
    public function setValuesAttr($value)
    {
        return json_encode($value);
    }

    /**
     * 获取指定项设置
     */
    public static function getItem($key, $app_id = null)
    {
        $data = self::getAll($app_id);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }
        return $data_key;
    }

    /**
     * 获取系统配置
     */
    public static function getSysConfig()
    {
        $model = new static;
        $result = $model->withoutGlobalScope()->where('key', '=', SettingEnum::SYS_CONFIG)->value('values');
        if (!$result) {
            $result = $model->defaultData()[SettingEnum::SYS_CONFIG]['values'];
        } else {
            $result = json_decode($result, true);
            $result = array_merge_multiple($model->defaultData()[SettingEnum::SYS_CONFIG]['values'], $result);
        }
        return $result;
    }

    /**
     * 获取指定项设置
     */
    public static function getSupplierItem($key, $shop_supplier_id, $app_id = null)
    {
        $data = self::getAll($app_id, $shop_supplier_id);
        $data_key = $data[$key];
        if (isset($data_key)) {
            $data_key = $data[$key]['values'];
            jsonRecursive($data_key);
        } else {
            $data_key = [];
        }

        return $data_key;
    }

    /**
     * 获取设置项信息
     */
    public static function detail($key, $shop_supplier_id = 0)
    {
        $where = [];
        if ($shop_supplier_id) {
            $where['shop_supplier_id'] = $shop_supplier_id;
        }

        return (new static())->where('key', '=', $key)->where($where)->find();
    }

    /**
     * 全局缓存: 系统设置
     */
    public static function getAll($app_id = null, $shop_supplier_id = 0)
    {
        $static = new static;
        is_null($app_id) && $app_id = $static::$app_id;
        if (!$data = Cache::get('setting_' . $app_id . '_' . $shop_supplier_id)) {
            $setting = $static->where(compact('app_id'))->where('shop_supplier_id', $shop_supplier_id)->select();
            $data = empty($setting) ? [] : array_column($static->collection($setting)->toArray(), null, 'key');
            Cache::tag('cache')->set('setting_' . $app_id . '_' . $shop_supplier_id, $data);
        }
        return $static->getMergeData($data);
    }

    /**
     * 数组转换为数据集对象
     */
    public function collection($resultSet)
    {
        $item = current(get_mangled_object_vars($resultSet));
        if ($item instanceof Model) {
            return \think\model\Collection::make($resultSet);
        } else {
            return \think\Collection::make($resultSet);
        }
    }


    /**
     * 合并用户设置与默认数据
     */
    private function getMergeData($userData)
    {
        $defaultData = $this->defaultData();
        // 商城设置：配送方式
        if (isset($userData['store']['values']['delivery_type'])) {
            unset($defaultData['store']['values']['delivery_type']);
        }
        if (isset($userData['nav']['values']['data']['list'])) {
            unset($defaultData['nav']['values']['data']['list']);
        }
        return array_merge_multiple($defaultData, $userData);
    }

    /**
     * 店铺是否开启
     */
    public static function getStoreOpen()
    {
        $data = (new static())->getItem(SettingEnum::STORE);
        return $data['store_open'] == 1;
    }

    /**
     * 默认配置
     */
    public function defaultData($storeName = null)
    {
        return [
            'store' => [
                'key' => 'store',
                'describe' => '商城设置',
                'values' => [
                    // 商城名称
                    'name' => $storeName ?: '玖玖珈商城',
                    // 配送方式
                    'delivery_type' => array_keys(DeliveryTypeEnum::data()),
                    // 快递100
                    'kuaidi100' => [
                        'customer' => '',
                        'key' => '',
                    ],
                    // 押金
                    'supplier_cash' => '0',
                    // 抽成比例
                    'commission_rate' => '5',
                    // 模式类型，B2B B2B2C
                    'operate_type' => OperateTypeEnum::B2B,
                    // 新商品是否需要审核
                    'add_audit' => '1',
                    // 审核通过后再修改是否需要审核
                    'edit_audit' => '1',
                    // 供应商入驻图片
                    'supplier_image' => 'http://wx-cdn.jiujiuyunhui.com/202011091623282f83a8213.png',
                    // 是否记录日志
                    'is_get_log' => true,
                    // 政策隐私
                    'policy' => [
                        'service' => self::$base_url . 'service.html',
                        'privacy' => self::$base_url . 'privacy.html',
                    ],
                    'store_open' => '1',//是否显示店铺0不显示
                    // 是否向小程序发送物流
                    'is_send_wx' => false,
                ],
            ],
            'mp_service' => [
                'key' => 'mp_service',
                'describe' => '公众号客服设置',
                'values' => [
                    // qq
                    'qq' => '',
                    // 微信
                    'wechat' => '',
                    // 微信公众号图片
                    'mp_image' => '',
                ],
            ],
            'trade' => [
                'key' => 'trade',
                'describe' => '交易设置',
                'values' => [
                    'order' => [
                        'close_days' => '3',
                        'receive_days' => '10',
                        'refund_days' => '7'
                    ],
                    'freight_rule' => '10',
                ]
            ],
            'storage' => [
                'key' => 'storage',
                'describe' => '上传设置',
                'values' => [
                    'default' => 'local',
                    'max_image' => '2',
                    'max_video' => '20',
                    'engine' => [
                        'local' => [],
                        'qiniu' => [
                            'bucket' => '',
                            'access_key' => '',
                            'secret_key' => '',
                            'domain' => 'http://'
                        ],
                        'aliyun' => [
                            'bucket' => '',
                            'access_key_id' => '',
                            'access_key_secret' => '',
                            'domain' => 'http://'
                        ],
                        'qcloud' => [
                            'bucket' => '',
                            'region' => '',
                            'secret_id' => '',
                            'secret_key' => '',
                            'domain' => 'http://'
                        ],
                    ]
                ],
            ],
            'sms' => [
                'key' => 'sms',
                'describe' => '短信通知',
                'values' => [
                    'default' => 'aliyun',
                    'engine' => [
                        'aliyun' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '三勾商城',
                            'login_template' => '',
                            'apply_template' => '',
                            'supplier_reject_code' => '',
                            'supplier_pass_code' => ''
                        ],
                        'qcloud' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '',
                            'login_template' => '',
                            'apply_template' => '',
                            'supplier_reject_code' => '',
                            'supplier_pass_code' => ''
                        ],
                        'hwcloud' => [
                            'AccessKeyId' => '',
                            'AccessKeySecret' => '',
                            'sign' => '',
                            'sender' => '',
                            'login_template' => '',
                            'apply_template' => '',
                            'supplier_reject_code' => '',
                            'supplier_pass_code' => ''
                        ],
                    ],
                ],
            ],
            'tplMsg' => [
                'key' => 'tplMsg',
                'describe' => '模板消息',
                'values' => [
                    'payment' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                    'delivery' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                    'refund' => [
                        'is_enable' => '0',
                        'template_id' => '',
                    ],
                ],
            ],
            'printer' => [
                'key' => 'printer',
                'describe' => '小票打印机设置',
                'values' => [
                    'is_open' => '0',   // 是否开启打印
                    'printer_id' => '', // 打印机id
                    'order_status' => [], // 订单类型 10下单打印 20付款打印 30确认收货打印
                ],
            ],
            'full_free' => [
                'key' => 'full_free',
                'describe' => '满额包邮设置',
                'values' => [
                    'is_open' => '0',   // 是否开启满额包邮
                    'money' => '',      // 单笔订单额度
                ],
            ],
            'recharge' => [
                'key' => 'recharge',
                'describe' => '用户充值设置',
                'values' => [
                    'is_entrance' => '1',   // 是否允许用户充值
                    'is_custom' => '1',   // 是否允许自定义金额
                    'is_match_plan' => '1',   // 自定义金额是否自动匹配合适的套餐
                    'describe' => "1. 账户充值仅限微信在线方式支付，充值金额实时到账；\n" .
                        "2. 账户充值套餐赠送的金额即时到账；\n" .
                        "3. 账户余额有效期：自充值日起至用完即止；\n" .
                        "4. 若有其它疑问，可拨打客服电话400-000-1234",     // 充值说明
                ],
            ],
            'points' => [
                'key' => 'points',
                'describe' => '积分设置',
                'values' => [
                    'points_name' => '积分',         // 积分名称自定义
                    'is_shopping_gift' => '0',      // 是否开启购物送积分
                    'gift_ratio' => '100',            // 是否开启购物送积分
                    'is_shopping_discount' => '0',    // 是否允许下单使用积分抵扣
                    'discount' => [     // 积分抵扣
                        'discount_ratio' => '0.01',       // 积分抵扣比例
                        'full_order_price' => '100.00',       // 订单满[?]元
                        'max_money_ratio' => '10',             // 最高可抵扣订单额百分比
                    ],
                    // 充值说明
                    'describe' => "a) 积分不可兑现、不可转让,仅可在本平台使用;\n" .
                        "b) 您在本平台参加特定活动也可使用积分,详细使用规则以具体活动时的规则为准;\n" .
                        "c) 积分的数值精确到个位(小数点后全部舍弃,不进行四舍五入)\n" .
                        "d) 买家在完成该笔交易(订单状态为“已签收”)后才能得到此笔交易的相应积分,如购买商品参加店铺其他优惠,则优惠的金额部分不享受积分获取;",
                ],
            ],
            'officia' => [
                'key' => 'officia',
                'describe' => '公众号关注',
                'values' => [
                    'status' => 0
                ],
            ],
            'collection' => [
                'key' => 'collection',
                'describe' => '引导收藏',
                'values' => [
                    'status' => 0
                ],
            ],
            'recommend' => [
                'key' => 'recommend',
                'describe' => '商品推荐',
                'values' => [
                    'is_recommend' => '0',
                    'location' => [],
                    'choice' => '0',
                    'type' => '10',
                    'num' => '20',
                    'product' => []
                ],
            ],
            'basic' => [
                'key' => 'basic',
                'describe' => '好物圈',
                'values' => [
                    // 是否开启
                    'status' => 0,
                    // 是否同步购物车 (商品收藏)
                    'is_shopping' => '0',
                    // 是否同步订单
                    'is_order' => '0',
                ]
            ],
            'homepush' => [
                'key' => 'homepush',
                'describe' => '首页推送',
                'values' => [
                    // 是否开启
                    'is_open' => 0,
                ]
            ],
            'pointsmall' => [
                'key' => 'pointsmall',
                'describe' => '积分商城',
                'values' => [
                    // 是否开启
                    'is_open' => false,
                    // 是否使用优惠券
                    'is_coupon' => false,
                    // 是否分销
                    'is_agent' => false,
                ]
            ],
            'bargain' => [
                'key' => 'bargain',
                'describe' => '限时砍价',
                'values' => [
                    // 是否使用优惠券
                    'is_coupon' => false,
                    // 是否分销
                    'is_agent' => false,
                    // 是否开启积分
                    'is_point' => false,
                    // 规则
                    'bargain_rules' => ''
                ]
            ],
            'sign' => [
                'key' => 'sign',
                'describe' => '签到有礼',
                'values' => [
                    // 是否开启
                    'is_open' => false
                ]
            ],
            'seckill' => [
                'key' => 'seckill',
                'describe' => '限时秒杀',
                'values' => [
                    // 是否开启积分
                    'is_point' => false,
                    // 是否开启分销
                    'is_agent' => false,
                    //未付款订单自动关闭时间,分钟
                    'order_close' => 10,
                    // 是否使用优惠券
                    'is_coupon' => false,
                ]
            ],
            'assemble' => [
                'key' => 'assemble',
                'describe' => '限时拼团',
                'values' => [
                    // 是否开启
                    'is_open' => false,
                    // 是否开启积分
                    'is_point' => false,
                    // 是否开启分销
                    'is_agent' => false,
                    // 是否使用优惠券
                    'is_coupon' => false,
                ]
            ],
            'getPhone' => [
                'key' => 'getPhone',
                'describe' => '获取手机号设置',
                'values' => [
                    // 显示区域
                    'area_type' => [],
                    // 不再提示天数
                    'send_day' => 7
                ],
            ],
            'live' => [
                'key' => 'live',
                'describe' => '直播设置',
                'values' => [
                    // 是否开启直播
                    'is_open' => '0',
                    //是否开启审核
                    'is_audit' => '1',
                    //礼物名称
                    'gift_name' => '玖币',
                    // appid
                    'sdkappid' => '',
                    // key
                    'key' => '',
                    // 是否开启录制
                    'is_record' => '0',
                    // 存储设置
                    'vendor' => '',
                    'region' => '',
                    'bucket' => '',
                    'accessKey' => '',
                    'secretKey' => '',
                    'username' => '',
                    'password' => '',
                    'domain' => ''
                ]
            ],
            'appshare' => [
                'key' => 'appshare',
                'describe' => 'app分享',
                'values' => [
                    // 分享类型 1公众号/h5 2小程序 3下载页
                    'type' => '1',
                    // 公众号、h5地址
                    'open_site' => '',
                    // 小程序原始id
                    'gh_id' => '',
                    // 跳转网页
                    'web_url' => '',
                    // 下载页
                    'down_url' => '',
                    // 绑定类型
                    'bind_type' => '1'
                ]
            ],
            'sys_config' => [
                'key' => 'sys_config',
                'describe' => '系统设置',
                'values' => [
                    'shop_name' => '三勾商城管理系统',
                    'shop_bg_img' => '',
                    'supplier_name' => '三勾商城商户管理系统',
                    'supplier_bg_img' => '',
                    // 微信服务商支付
                    'weixin_service' => [
                        'is_open' => 0,
                        'app_id' => '',
                        'mch_id' => '',
                        'apikey' => '',
                        'cert_pem' => '',
                        'key_pem' => '',
                        'serial_no' => ''
                    ],
                ]
            ],
            'balance' => [
                'key' => 'balance',
                'describe' => '充值设置',
                'values' => [
                    // 是否开启
                    'is_open' => 0,
                    // 是否可以自定义
                    'is_plan' => 1,
                    // 最低充值金额
                    'min_money' => 1,
                    // 充值说明
                    'describe' => "a) 账户充值仅限在线方式支付，充值金额实时到账；\n" .
                        "b) 有问题请联系客服;\n",
                ]
            ],
            'nav' => [
                'key' => 'nav',
                'describe' => '底部导航',
                'values' => [
                    'data' => [
                        'is_auto' => "0",
                        "type" => "0",
                        "backgroundColor" => "#FFFFFF",
                        "textColor" => "#000000",
                        "textHoverColor" => "#E2231A",
                        "bulge" => "true",
                        // 菜单
                        'list' => [
                            [
                                'text' => '首页',
                                'iconPath' => self::$base_url . 'image/tabbar/home.png',
                                'selectedIconPath' => self::$base_url . 'image/tabbar/home_active.png',
                                "link_url" => "/pages/index/index"
                            ],
                            [
                                'text' => '分类',
                                'iconPath' => self::$base_url . 'image/tabbar/category.png',
                                'selectedIconPath' => self::$base_url . 'image/tabbar/category_active.png',
                                "link_url" => "/pages/product/category"
                            ],
                            [
                                'text' => '商户',
                                'iconPath' => self::$base_url . 'image/tabbar/shop.png',
                                'selectedIconPath' => self::$base_url . 'image/tabbar/shop_active.png',
                                "link_url" => "/pages/shop/shop_list"
                            ],
                            [
                                'text' => '购物车',
                                'iconPath' => self::$base_url . 'image/tabbar/cart.png',
                                'selectedIconPath' => self::$base_url . 'image/tabbar/cart_active.png',
                                "link_url" => "/pages/cart/cart"
                            ],
                            [
                                'text' => '我的',
                                'iconPath' => self::$base_url . 'image/tabbar/user.png',
                                'selectedIconPath' => self::$base_url . 'image/tabbar/user_active.png',
                                "link_url" => "/pages/user/index/index"
                            ],
                        ]
                    ]
                ]
            ],
            SettingEnum::THEME => [
                'key' => 'theme',
                'describe' => '主题设置',
                'values' => [
                    'theme' => '0',//主题设置
                ],
            ],
            SettingEnum::BALANCE_CASH => [
                'key' => 'balance_cash',
                'describe' => '余额提现设置',
                'values' => [
                    // 是否开启
                    'is_open' => '0',
                    // 最低提现金额
                    'min_money' => 1,
                    // 提现比例
                    'cash_ratio' => 100,
                    // 微信方式0、提现到零钱 1，转账到零钱
                    'wechat_type' => '0',
                ]
            ],
        ];
    }

}
