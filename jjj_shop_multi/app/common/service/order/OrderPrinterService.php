<?php

namespace app\common\service\order;

use app\common\model\settings\Setting as SettingModel;
use app\common\model\settings\Printer as PrinterModel;
use app\common\enum\settings\DeliveryTypeEnum;
use app\common\library\printer\Driver as PrinterDriver;

/**
 * 订单打印服务类
 */
class OrderPrinterService
{
    /**
     * 执行订单打印
     */
    public function printTicket($order, $scene = 20)
    {
        // 打印机设置
        $printerConfig = SettingModel::getSupplierItem('printer', $order['shop_supplier_id'], $order['app_id']);
        // 判断是否开启打印设置
        if (!$printerConfig['is_open']
            || !$printerConfig['printer_id']
            || !in_array($scene, $printerConfig['order_status'])) {
            return false;
        }
        // 获取当前的打印机
        $printer = PrinterModel::detail($printerConfig['printer_id']);
        if (empty($printer) || $printer['is_delete']) {
            return false;
        }
        // 实例化打印机驱动
        $PrinterDriver = new PrinterDriver($printer);
        // 获取订单打印内容
        $content = $this->getPrintContent($order);
        // 执行打印请求
        return $PrinterDriver->printTicket($content);
    }

    /**
     * 构建订单打印的内容
     */
    private function getPrintContent($order)
    {
        // 商城名称
        $storeName = SettingModel::getItem('store', $order['app_id'])['name'];
        // 收货地址
        $address = $order['address'];
        // 拼接模板内容
        $content = "<CB>{$storeName}</CB><BR>";
        $content .= '--------------------------------<BR>';
        $content .= "昵称：{$order['user']['nickName']} [{$order['user_id']}]<BR>";
        $content .= "订单号：{$order['order_no']}<BR>";
        $content .= '付款时间：' . date('Y-m-d H:i:s', $order['pay_time']) . '<BR>';
        // 收货人信息
        if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXPRESS) {
            $content .= "--------------------------------<BR>";
            $content .= "收货人：{$address['name']}<BR>";
            $content .= "联系电话：{$address['phone']}<BR>";
            $content .= '收货地址：' . $address->getFullAddress() . '<BR>';
        }
        // 自提信息
        if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXTRACT && !empty($order['extract'])) {
            $content .= "--------------------------------<BR>";
            $content .= "联系人：{$order['extract']['linkman']}<BR>";
            $content .= "联系电话：{$order['extract']['phone']}<BR>";
            $content .= "自提门店：{$order['extract_store']['shop_name']}<BR>";
        }
        // 商品信息
        $content .= '=========== 商品信息 ===========<BR>';
        foreach ($order['product'] as $key => $product) {
            $content .= ($key + 1) . ".商品名称：{$product['product_name']}<BR>";
            !empty($product['product_attr']) && $content .= "　商品规格：{$product['product_attr']}<BR>";
            $content .= "　购买数量：{$product['total_num']}<BR>";
            $content .= "　商品总价：{$product['total_price']}元<BR>";
            $content .= '--------------------------------<BR>';
        }
        // 买家备注
        if (!empty($order['buyer_remark'])) {
            $content .= '============ 买家备注 ============<BR>';
            $content .= "<B>{$order['buyer_remark']}</B><BR>";
            $content .= '--------------------------------<BR>';
        }
        // 订单金额
        if ($order['coupon_money'] > 0) {
            $content .= "优惠券：-{$order['coupon_money']}元<BR>";
        }
        if ($order['points_num'] > 0) {
            $content .= "积分抵扣：-{$order['points_money']}元<BR>";
        }
        if ($order['update_price']['value'] != '0.00') {
            $content .= "后台改价：{$order['update_price']['symbol']}{$order['update_price']['value']}元<BR>";
        }
        // 运费
        if ($order['delivery_type']['value'] == DeliveryTypeEnum::EXPRESS) {
            $content .= "运费：{$order['express_price']}元<BR>";
            $content .= '------------------------------<BR>';
        }
        // 实付款
        $content .= "<RIGHT>实付款：<BOLD><B>{$order['pay_price']}</B></BOLD>元</RIGHT><BR>";
        return $content;
    }

}