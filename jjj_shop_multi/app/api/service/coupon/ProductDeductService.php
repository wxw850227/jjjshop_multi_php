<?php

namespace app\api\service\coupon;

use app\common\library\helper;

/**
 * 优惠券抵扣金额
 */
class ProductDeductService
{
    private $actualReducedMoney;

    private $coupon_column;
    private $price_column;
    /**
     * 构造方法
     */
    public function __construct($coupon_column, $price_column)
    {
        $this->coupon_column = $coupon_column;
        $this->price_column = $price_column;
    }

    public function setProductCouponMoney($productList, $reducedMoney)
    {
        // 统计订单商品总金额,(单位分)
        $orderTotalPrice = 0;
        foreach ($productList as &$product) {
            $product[$this->price_column] *= 100;
            $orderTotalPrice += $product[$this->price_column];
        }
        // 计算实际抵扣金额
        $this->setActualReducedMoney($reducedMoney, $orderTotalPrice);
        // 实际抵扣金额为0，
        if ($this->actualReducedMoney > 0) {
            // 计算商品的价格权重
            $productList = $this->getProductListWeight($productList, $orderTotalPrice);
            // 计算商品优惠券抵扣金额
            $this->setProductListCouponMoney($productList);
            // 总抵扣金额
            $totalCouponMoney = helper::getArrayColumnSum($productList, $this->coupon_column);
            $this->setProductListCouponMoneyFill($productList, $totalCouponMoney);
            $this->setProductListCouponMoneyDiff($productList, $totalCouponMoney);
        }
        return $productList;
    }

    public function getActualReducedMoney()
    {
        return $this->actualReducedMoney;
    }

    private function setActualReducedMoney($reducedMoney, $orderTotalPrice)
    {
        $reducedMoney *= 100;
        $this->actualReducedMoney = ($reducedMoney >= $orderTotalPrice) ? $orderTotalPrice : $reducedMoney;
    }

    private function arraySortByWeight($productList)
    {
        return array_sort($productList, 'weight', true);
    }

    private function getProductListWeight($productList, $orderTotalPrice)
    {
        foreach ($productList as &$product) {
            $product['weight'] = $product[$this->price_column] / $orderTotalPrice;
        }
        return $this->arraySortByWeight($productList);
    }

    private function setProductListCouponMoney(&$productList)
    {
        foreach ($productList as &$product) {
            $product[$this->coupon_column] = bcmul($this->actualReducedMoney, $product['weight']);
        }
        return true;
    }

    private function setProductListCouponMoneyFill(&$productList, $totalCouponMoney)
    {
        if ($totalCouponMoney === 0) {
            $temReducedMoney = $this->actualReducedMoney;
            foreach ($productList as &$product) {
                if ($temReducedMoney === 0) break;
                $product[$this->coupon_column] = 1;
                $temReducedMoney--;
            }
        }
        return true;
    }

    private function setProductListCouponMoneyDiff(&$productList, $totalCouponMoney)
    {
        $tempDiff = $this->actualReducedMoney - $totalCouponMoney;
        foreach ($productList as &$product) {
            if ($tempDiff < 1) break;
            $product[$this->coupon_column]++ && $tempDiff--;
        }
        return true;
    }

}