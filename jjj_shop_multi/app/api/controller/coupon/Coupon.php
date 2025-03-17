<?php

namespace app\api\controller\coupon;

use app\api\controller\Controller;
use app\api\model\plus\coupon\Coupon as CouponModel;
use app\api\model\product\Product as ProductModel;
use app\api\model\plus\coupon\UserCoupon as UserCouponModel;

/**
 * 优惠券中心
 */
class Coupon extends Controller
{
    /**
     * 优惠券列表
     */
    public function lists()
    {
        $model = new CouponModel;
        $list = $model->getWaitList([], $this->getUser(false), 0, 1);
        return $this->renderSuccess('', compact('list'));
    }

    public function detail($coupon_id)
    {
        $model = CouponModel::detailWithSupplier($coupon_id);
        $user = $this->getUser(false);
        $model['is_get'] = 0;
        if ($user) {
            $CouponModel = new UserCouponModel();
            $userCouponIds = $CouponModel->getUserCouponIds($user['user_id']);
            $model['is_get'] = in_array($model['coupon_id'], $userCouponIds);
        }
        if ($model['apply_range'] == 20) {
            $product_ids = explode(',', $model['product_ids']);
            $model['product'] = (new ProductModel())->getListByIdsFromApi($product_ids, $this->getUser(false));
        }
        $product_list = [];
        if ($model['apply_range'] == 30) {
            $category_ids = json_decode($model['category_ids'], true);
            $product_list = (new ProductModel())->getListByCatIdsFromApi($category_ids, $this->getUser(false), $model['shop_supplier_id']);
        }
        return $this->renderSuccess('', compact('model', 'product_list'));
    }
}