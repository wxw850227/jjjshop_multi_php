<?php

namespace app\shop\controller\plus\coupon;

use app\shop\controller\Controller;
use app\shop\model\plus\coupon\Coupon as CouponModel;
use app\shop\model\plus\coupon\UserCoupon as UserCouponModel;
use app\shop\model\user\Grade as GradeModel;
use app\shop\model\product\Product as ProductModel;
use app\shop\model\product\Category as CategoryModel;
/**
 * 优惠券控制器
 */
class Coupon extends Controller
{
    /* @var CouponModel $model */
    private $model;

    /**
     * 构造方法
     */
    public function initialize()
    {
        $this->model = new CouponModel;
    }

    /**
     * 优惠券列表
     */
    public function index()
    {
        $list = $this->model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加优惠券
     */
    public function add()
    {
        $data = $this->postData();
        // 新增记录
        if ($this->model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 优惠券详情
     */
    public function couponDetail()
    {
        $coupon_id = $this->postData('coupon_id/i');

        // 优惠券详情
        $detail = CouponModel::detail($coupon_id)->toArray();
        if($detail['expire_type']==20){
            $detail['active_time'][0]=date('Y-m-d H:i:s',$detail['start_time']['value']);
            $detail['active_time'][1]=date('Y-m-d H:i:s',$detail['end_time']['value']);
        }
        if($detail['apply_range'] == 20){
            $detail['product_ids'] = explode(',', $detail['product_ids']);
            $detail['product_list'] = (new ProductModel())->getListByIds($detail['product_ids']);
        }
        if($detail['apply_range'] == 30){
            $category_ids = json_decode($detail['category_ids'], true);
            $detail['category_list']['first'] = (new CategoryModel())->getListByIds($category_ids['first']);
            $detail['category_list']['second'] = (new CategoryModel())->getListByIds($category_ids['second']);
            foreach ($detail['category_list']['second'] as &$item){
                $item['parent'] = CategoryModel::detail($item['parent_id'])['name'];
            }
        }
        return $this->renderSuccess('', compact('detail'));
    }

    /**
     * 更新优惠券
     */
    public function edit()
    {
        $data = $this->postData();
        unset($data['state']);
        $model = new CouponModel;
        // 更新记录
        if ($model->edit($data)) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError('更新失败');
    }

    /**
     * 删除优惠券
     */
    public function delete($coupon_id)
    {
        $coupon_id = $this->postData('coupon_id/i');
        // 优惠券详情
        $model = new CouponModel;
        // 更新记录
        if ($model->setDelete(['coupon_id' => $coupon_id])) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

    /**
     * 领取记录
     */
    public function receive()
    {
        $model = new UserCouponModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 发送优惠券
     */
    public function SendCoupon()
    {
        if($this->request->isGet()){
            $model = new GradeModel;
            $list = $model->getLists();
            return $this->renderSuccess('', compact('list'));
        }
        $model = new UserCouponModel;
        if ($model->SendCoupon($this->postData())) {
            return $this->renderSuccess('发送成功');
        }
        return $this->renderError('发送失败');
    }

}