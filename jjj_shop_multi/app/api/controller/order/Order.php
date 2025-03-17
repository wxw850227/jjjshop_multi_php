<?php

namespace app\api\controller\order;

use app\api\model\order\Cart as CartModel;
use app\api\model\order\Order as OrderModel;
use app\api\service\order\settled\MasterOrderSettledService;
use app\api\controller\Controller;
use app\api\model\settings\Message as MessageModel;
use app\api\model\settings\Setting as SettingModel;

/**
 * 普通订单
 */
class Order extends Controller
{
    /**
     * 订单确认-立即购买
     */
    public function buy()
    {
        // 立即购买：获取订单商品列表
        $params = json_decode($this->postData()['params'], true);

        $supplierData = OrderModel::getOrderProductListByNow($params);
        $user = $this->getUser();
        // 实例化订单service
        $orderService = new MasterOrderSettledService($user, $supplierData, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        // 订单结算提交
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        if ($this->request->isGet()) {
            // 如果来源是小程序, 则获取小程序订阅消息id.获取支付成功,发货通知.
            $template_arr = MessageModel::getMessageByNameArr($params['pay_source'], ['order_pay_user', 'order_delivery_user']);
            //是否显示店铺信息
            $store_open = SettingModel::getStoreOpen();
            $balance = $user['balance'];
            return $this->renderSuccess('', compact('orderInfo', 'template_arr', 'store_open', 'balance'));
        }
        // 创建订单
        $order_id = $orderService->createOrder($orderInfo);
        if (!$order_id) {
            return $this->renderError($orderService->getError() ?: '订单创建失败');
        }
        // 返回订单信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单号
        ]);
    }

    /**
     * 订单确认-立即购买
     */
    public function cart()
    {
        // 立即购买：获取订单商品列表
        if ($this->request->isGet()) {
            $params = json_decode($this->postData()['params'], true);
        } else {
            $params = json_decode($this->postData()['params'], true);
        }
        $user = $this->getUser();
        // 商品结算信息
        $CartModel = new CartModel();
        // 购物车商品列表
        $supplierData = $CartModel->getList($user, $params['cart_ids']);
        // 实例化订单service
        $orderService = new MasterOrderSettledService($user, $supplierData, $params);
        // 获取订单信息
        $orderInfo = $orderService->settlement();
        if ($this->request->isGet()) {
            // 如果来源是小程序, 则获取小程序订阅消息id.获取支付成功,发货通知.
            $template_arr = MessageModel::getMessageByNameArr($params['pay_source'], ['order_pay_user', 'order_delivery_user']);
            //是否显示店铺信息
            $store_open = SettingModel::getStoreOpen();
            $balance = $user['balance'];
            return $this->renderSuccess('', compact('orderInfo', 'template_arr', 'store_open', 'balance'));
        }
        // 订单结算提交
        if ($orderService->hasError()) {
            return $this->renderError($orderService->getError());
        }
        // 创建订单
        $order_id = $orderService->createOrder($orderInfo);
        if (!$order_id) {
            return $this->renderError($orderService->getError() ?: '订单创建失败');
        }
        // 移出购物车中已下单的商品
        $CartModel->clearAll($user, $params['cart_ids']);
        // 返回订单信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单号
        ]);
    }
}