<?php

namespace app\supplier\service;

use app\supplier\model\order\OrderRefund;
use app\supplier\model\product\Product;
use app\supplier\model\order\Order;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\supplier\model\user\Favorite as FavoriteModel;
/**
 * 商城模型
 */
class ShopService
{
    // 商品模型
    private $ProductModel;
    // 订单模型
    private $OrderModel;
    // 订单退款模型
    private $OrderRefund;
    // 收藏模型
    private $FavoriteModel;
    // 商户id
    private $shop_supplier_id;

    /**
     * 构造方法
     */
    public function __construct($shop_supplier_id)
    {
        /* 初始化模型 */
        $this->ProductModel = new Product();
        $this->OrderModel = new Order();
        $this->OrderRefund = new OrderRefund();
        $this->FavoriteModel = new FavoriteModel();
        $this->shop_supplier_id = $shop_supplier_id;
    }

    /**
     * 后台首页数据
     */
    public function getHomeData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $supplier = SupplierModel::detail($this->shop_supplier_id);
        $data = [
            'top_data' => [
                // 商品总量
                'product_total' => $this->getProductTotal(),
                // 订单总量
                'order_total' => $this->getOrderTotal(),
                // 订单销售额
                'total_money' => $this->getOrderTotalMoney($today),
                // 店铺关注人数
                'fav_count' => $supplier['fav_count'],
                // 配送评分
                'express_score' => $supplier['express_score'],
                // 服务评分
                'server_score' => $supplier['server_score'],
                // 描述评分
                'describe_score' => $supplier['describe_score'],
            ],
            'order_data' => [
                // 销售额(元)
                'order_total_price' => [
                    'tday' => $this->getOrderTotalPrice($today),
                    'ytd' => $this->getOrderTotalPrice($yesterday)
                ],
                // 支付订单数
                'order_total' => [
                    'tday' => $this->getOrderTotal($today),
                    'ytd' => $this->getOrderTotal($yesterday)
                ],
                // 下单用户数
                'order_user_total' => [
                    'tday' => $this->getPayOrderUserTotal($today),
                    'ytd' => $this->getPayOrderUserTotal($yesterday)
                ],
                // 店铺关注人数
                'fav_user_total' => [
                    'tday' => $this->getFavUserTotal($today),
                    'ytd' => $this->getFavUserTotal($yesterday)
                ]
            ],
            'wait_data' => [
                //订单
                'order' => [
                    'delivery' => $this->getReviewOrderTotal(),
                    'refund' => $this->getRefundOrderTotal(),
                ],
                //商品
                'product' => [
                    'audit' => $this->getProductAuditTotal(),
                ],
                //库存
                'stock' => [
                    'product' => $this->getProductStockTotal(),
                ],
            ]
        ];
        return $data;
    }

    /**
     * 获取商品总量
     */
    private function getProductTotal()
    {
        return number_format($this->ProductModel->getProductTotal(['shop_supplier_id'=> $this->shop_supplier_id]));
    }

    /**
     * 获取商品总量
     */
    private function getProductAuditTotal()
    {
        return number_format($this->ProductModel->getProductTotal([
            'shop_supplier_id'=> $this->shop_supplier_id,
            'product_status' => 40
        ]));
    }
    /**
     * 获取商品库存告急总量
     */
    private function getProductStockTotal()
    {
        return number_format($this->ProductModel->getProductStockTotal($this->shop_supplier_id));
    }

    /**
     * 获取订单总量
     */
    private function getOrderTotal($day = null)
    {
        return number_format($this->OrderModel->getOrderData($day, null, 'order_total', $this->shop_supplier_id));
    }

    /**
     * 获取待处理订单总量
     */
    private function getReviewOrderTotal()
    {
        return number_format($this->OrderModel->getReviewOrderTotal($this->shop_supplier_id));
    }

    /**
     * 获取售后订单总量
     */
    private function getRefundOrderTotal()
    {
        return number_format($this->OrderRefund->getRefundOrderTotal($this->shop_supplier_id));
    }

    /**
     * 获取某天的总销售额
     */
    private function getOrderTotalPrice($day)
    {
        return sprintf('%.2f', $this->OrderModel->getOrderTotalPrice($day, null, $this->shop_supplier_id));
    }

    /**
     * 店铺总销售额
     */
    private function getOrderTotalMoney($day)
    {
        return sprintf('%.2f', $this->OrderModel->getOrderTotalPrice(null, $day, $this->shop_supplier_id));
    }

    /**
     * 获取某天的下单用户数
     */
    private function getPayOrderUserTotal($day)
    {
        return number_format($this->OrderModel->getPayOrderUserTotal($day, $this->shop_supplier_id));
    }

    /**
     * 获取某天的关注用户数
     */
    private function getFavUserTotal($day)
    {
        return number_format($this->FavoriteModel->getUserTotal($day, $this->shop_supplier_id));
    }
}