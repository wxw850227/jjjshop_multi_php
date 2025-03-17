<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\plus\agent\Setting;
use app\api\model\user\User as UserModel;
use app\api\model\order\Order as OrderModel;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\plus\coupon\UserCoupon as UserCouponModel;
use app\common\enum\settings\GetPhoneTypeEnum;
use think\facade\Cache;
use app\api\model\supplier\Supplier as SupplierModel;

/**
 * 个人中心主页
 */
class Index extends Controller
{
    /**
     * 获取当前用户信息
     */
    public function detail($source = 'wx')
    {
        // 当前用户信息
        $user = $this->getUser();
        //店铺信息
        $user['is_recycle'] = $user['supplierUser'] ? SupplierModel::detail($user['supplierUser']['shop_supplier_id'])['is_recycle'] : '';
        $coupon_model = new UserCouponModel();
        $coupon = count($coupon_model->getList($user['user_id'], -1, false, false));
        // 订单总数
        $model = new OrderModel;

        //商城设置
        $store = SettingModel::getItem('store');
        //供应商入住背景图
        $supplier_image = isset($store['supplier_image']) ? $store['supplier_image'] : '';
        // 充值功能是否开启
        $balance_setting = SettingModel::getItem('balance');
        $balance_open = intval($balance_setting['is_open']);
        return $this->renderSuccess('', [
            'coupon' => $coupon,
            'userInfo' => $user,
            'orderCount' => [
                'payment' => $model->getCount($user, 'payment'),
                'delivery' => $model->getCount($user, 'delivery'),
                'received' => $model->getCount($user, 'received'),
                'comment' => $model->getCount($user, 'comment'),
            ],
            'setting' => [
                'points_name' => SettingModel::getPointsName(),
                'supplier_image' => $supplier_image,
                'balance_open' => $balance_open
            ],
            'sign' => SettingModel::getItem('sign'),
            'getPhone' => $this->isGetPhone(),
            'menus' => UserModel::getMenus($user, $source),   // 个人中心菜单列表
        ]);
    }

    /**
     * 当前用户设置
     */
    public function setting()
    {
        // 当前用户信息
        $user = $this->getUser();

        return $this->renderSuccess('', [
            'userInfo' => $user
        ]);
    }

    private function isGetPhone()
    {
        $user = $this->getUser();
        if ($user['mobile'] != '') {
            return false;
        }
        $settings = SettingModel::getItem('getPhone');
        if (in_array(GetPhoneTypeEnum::USER, $settings['area_type'])) {
            // 缓存时间
            $key = 'get_phone_' . $user['user_id'];
            if (!$data = Cache::get($key)) {
                $settings['send_day'] > 0 && Cache::set($key, '1', 86400 * $settings['send_day']);
                return true;
            }
        }
        return false;
    }
}