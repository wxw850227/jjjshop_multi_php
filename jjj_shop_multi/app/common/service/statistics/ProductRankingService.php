<?php

namespace app\common\service\statistics;

use app\common\model\order\OrderProduct as OrderProductModel;
use app\common\enum\order\OrderStatusEnum;
use app\common\enum\order\OrderPayStatusEnum;
use app\common\model\product\Product as ProductModel;

/**
 * 数据统计-商品销售榜
 */
class ProductRankingService
{
    /**
     * 商品销售榜
     */
    public function getSaleRanking($shop_supplier_id = 0)
    {
        $model = new ProductModel();
        if ($shop_supplier_id > 0) {
            $model = $model->where('p.shop_supplier_id', '=', $shop_supplier_id);
        }
        $OrderProduct = new OrderProductModel();
        $totalSaleSql = $OrderProduct->alias('op')
            ->field(['sum(total_num)'])
            ->join('order', 'order.order_id=op.order_id')
            ->where('product_id', '=', 'p.product_id')
            ->where('order.pay_status', '=', OrderPayStatusEnum::SUCCESS)
            ->where('order.order_status', '<>', OrderStatusEnum::CANCELLED)
            ->buildSql();
        return $model->alias('p')
            ->with(['image.file'])
            ->field([
                'p.product_id',
                'p.product_name',
                'sales_initial',
                'sales_actual',
                "$totalSaleSql AS total_sales_num"
            ])
            ->where('is_delete', '=', 0)
            ->order(['total_sales_num' => 'DESC'])
            ->limit(10)
            ->select();
    }

    /**
     * 商品浏览榜
     */
    public function getViewRanking($shop_supplier_id = 0)
    {
        $model = new ProductModel();
        if ($shop_supplier_id > 0) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        return $model->with(['image.file'])
            ->hidden(['content'])
            ->where('view_times', '>', 0)
            ->where('is_delete', '=', 0)
            ->order(['view_times' => 'DESC'])
            ->limit(10)
            ->select();
    }

    /**
     * 商品退款榜
     */
    public function getRefundRanking($shop_supplier_id = 0)
    {
        $model = new ProductModel();
        if ($shop_supplier_id > 0) {
            $model = $model->where('p.shop_supplier_id', '=', $shop_supplier_id);
        }
        $OrderProduct = new OrderProductModel();
        $totalRefundSql = $OrderProduct->alias('op')
            ->field(['count(order_refund_id)'])
            ->join('order_refund', 'order_refund.order_product_id=op.order_product_id')
            ->where('product_id', '=', 'p.product_id')
            ->buildSql();
        return $model->alias('p')
            ->with(['image.file'])
            ->field([
                'product_id',
                'product_name',
                'sales_initial',
                'sales_actual',
                "$totalRefundSql AS refund_count"
            ])
            ->where('is_delete', '=', 0)
            ->having('refund_count>0')
            ->order(['refund_count' => 'DESC'])
            ->limit(10)
            ->select();
    }

}