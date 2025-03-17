<?php

namespace app\api\service\order\settled;

use app\common\enum\order\OrderSourceEnum;
use app\api\model\order\Order as OrderModel;
/**
 * 普通订单结算服务类
 */
class MasterOrderSettledService extends OrderSettledService
{
    /**
     * 构造函数
     */
    public function __construct($user, $supplierData, $params)
    {
       parent::__construct($user, $supplierData, $params);
        //订单来源
        $this->orderSource = [
            'source' => OrderSourceEnum::MASTER,
            'activity_id' => 0
        ];
       //自身构造,差异化规则
    }


    /**
     * 验证订单商品的状态
     */
    public function validateProductList()
    {
        foreach ($this->supplierData as $supplier) {
            foreach ($supplier['productList'] as $product) {
                // 判断商品是否下架
                if ($product['product_status']['value'] != 10) {
                    $this->error = "很抱歉，商品 [{$product['product_name']}] 已下架";
                    return false;
                }
                // 判断商品库存
                if ($product['total_num'] > $product['product_sku']['stock_num']) {
                    $this->error = "很抱歉，商品 [{$product['product_name']}] 库存不足";
                    return false;
                }
                // 是否是会员商品
                if(count($product['grade_ids']) > 0 && $product['grade_ids'][0] != ''){
                    if(!in_array($this->user['grade_id'], $product['grade_ids'])){
                        $this->error = '很抱歉，此商品仅特定会员可购买';
                        return false;
                    }
                }
                // 判断是否超过限购数量
                if($product['limit_num'] > 0){
                    $hasNum = OrderModel::getHasBuyOrderNum($this->user['user_id'], $product['product_id']);
                    if($hasNum + $product['total_num'] > $product['limit_num']){
                        $this->error = "很抱歉，购买超过此商品最大限购数量";
                        return false;
                    }
                }
            }
        }
        return true;
    }
}