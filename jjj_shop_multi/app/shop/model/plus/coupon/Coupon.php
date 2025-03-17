<?php

namespace app\shop\model\plus\coupon;

use app\common\model\plus\coupon\Coupon as CouponModel;

/**
 * 优惠券模型
 */
class Coupon extends CouponModel
{
    /**
     * 获取优惠券列表getList
     */
    public function getList($data)
    {
        $model = $this;
        if (isset($data['shop_supplier_id'])) {
            $model = $model->where('coupon.shop_supplier_id', '=', $data['shop_supplier_id']);
        }
        return $model->alias('coupon')->field(['coupon.*,supplier.name as supplier_name'])
            ->join('supplier', 'coupon.shop_supplier_id = supplier.shop_supplier_id', 'left')
            ->where('coupon.is_delete', '=', 0)
            ->order(['coupon.sort' => 'asc', 'coupon.create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 添加新记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        $data['shop_supplier_id'] = 0;
        if ($data['expire_type'] == '20') {
            $data['start_time'] = strtotime($data['active_time'][0]);
            $data['end_time'] = strtotime($data['active_time'][1]);
        }
        // 限制商品id
        if($data['apply_range'] == 20){
            $data['product_ids'] = implode(',', $data['product_ids']);
        }
        $category_first_ids = [];
        $category_second_ids = [];
        if($data['apply_range'] == 30){
            if(isset($data['category_list']['first'])){
                foreach($data['category_list']['first'] as $item){
                    array_push($category_first_ids, $item['category_id']);
                }
            }
            if(isset($data['category_list']['second'])) {
                foreach ($data['category_list']['second'] as $item) {
                    array_push($category_second_ids, $item['category_id']);
                }
            }
            $data['category_ids'] = [
                'first' => $category_first_ids,
                'second' => $category_second_ids
            ];
            $data['category_ids'] = json_encode($data['category_ids']);
        }
        return self::create($data);
    }

    /**
     * 更新记录
     */
    public function edit($data)
    {
        if ($data['expire_type'] == '20') {
            $data['start_time'] = strtotime($data['active_time'][0]);
            $data['end_time'] = strtotime($data['active_time'][1]);
        }
        // 限制商品id
        if($data['apply_range'] == 20){
            $data['product_ids'] = implode(',', $data['product_ids']);
        }
        $category_first_ids = [];
        $category_second_ids = [];
        if($data['apply_range'] == 30){
            if(isset($data['category_list']['first'])){
                foreach($data['category_list']['first'] as $item){
                    array_push($category_first_ids, $item['category_id']);
                }
            }
            if(isset($data['category_list']['second'])) {
                foreach ($data['category_list']['second'] as $item) {
                    array_push($category_second_ids, $item['category_id']);
                }
            }
            $data['category_ids'] = [
                'first' => $category_first_ids,
                'second' => $category_second_ids
            ];
            $data['category_ids'] = json_encode($data['category_ids']);
        }
        $where['coupon_id'] = $data['coupon_id'];
        unset($data['coupon_id']);
        return self::update($data, $where);
    }

    /**
     * 删除记录 (软删除)
     */
    public function setDelete($where)
    {
        return self::update(['is_delete' => 1], $where);
    }

    /**
     * 查询指定优惠券
     * @param $value
     */
    public function getCoupon($value)
    {
        return $this->where('coupon_id', 'in', $value)->select();
    }

    /**
     * 查询指定优惠券
     * @param $value
     */
    public function getCoupons($value)
    {
        $data = $this->where('coupon_id', 'in', $value)->select();
        $name = '';
        if (!empty($data)) {
            foreach ($data as $val) {
                $name .= $val['name'] . ',';
            }
        }

        return $name;
    }
}
