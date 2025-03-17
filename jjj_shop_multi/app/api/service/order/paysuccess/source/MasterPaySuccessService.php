<?php

namespace app\api\service\order\paysuccess\source;

use app\common\enum\settings\DeliveryTypeEnum;
use app\common\service\order\OrderCompleteService;
use app\common\enum\order\OrderTypeEnum;

/**
 * 普通订单支付成功后的回调
 */
class MasterPaySuccessService
{
    /**
     * 回调方法
     */
    public function onPaySuccess($order)
    {
        // 如果是虚拟商品，则标记为已完成，无需发货
        if($order['delivery_type']['value'] == DeliveryTypeEnum::NO_EXPRESS && $order['virtual_auto'] == 1){
            $order->save([
                'delivery_status' => 20,
                'delivery_time' => time(),
                'receipt_status' => 20,
                'receipt_time' => time(),
                'order_status' => 30,
                'virtual_content' => $order['product'][0]['virtual_content'],
            ]);
            // 执行订单完成后的操作
            $OrderCompleteService = new OrderCompleteService(OrderTypeEnum::MASTER);
            $OrderCompleteService->complete([$order], $order['app_id']);
            $order->sendWxExpress('', '');
        }
        return true;
    }

}