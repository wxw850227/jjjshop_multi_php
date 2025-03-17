<?php

namespace app\supplier\controller\coupon;

use app\supplier\controller\Controller;
use app\supplier\model\coupon\Coupon as CouponModel;
use app\common\model\product\Category as CategoryModel;
use app\supplier\model\product\Product as ProductModel;
/**
 * 优惠券控制器
 */
class Coupon extends Controller
{
    /**
     * 优惠券列表
     */
    public function index()
    {  
        $list = (new CouponModel)->getList($this->postData(),$this->getSupplierId());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加优惠券
     */
    public function add()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->getSupplierId();
        // 新增记录
        if ((new CouponModel)->add($data)) {
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
        // 所有一级分类
        $category = CategoryModel::getFirstCategory();
        return $this->renderSuccess('', compact('detail', 'category'));
    }

    /**
     * 更新优惠券
     */
    public function edit($coupon_id)
    {
        $data = $this->postData();
        $model = CouponModel::detail($coupon_id);
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

}