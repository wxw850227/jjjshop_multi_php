<?php

namespace app\api\controller\supplier;

use app\api\controller\Controller;
use app\api\model\supplier\Supplier as SupplierModel;
use app\api\model\plus\coupon\Coupon as CouponModel;
use app\api\model\order\Order as OrderModel;
use app\api\model\user\Visit as VisitModel;
use app\common\service\statistics\OrderService;
use app\supplier\service\statistics\UserService;
use app\supplier\model\order\OrderSettled as OrderSettledModel;
use app\api\model\settings\Setting as SettingModel;
use app\common\model\supplier\Service as ServiceModel;
use app\common\model\app\App as AppModel;
use app\common\enum\order\OrderTypeEnum;

/**
 * 供应商
 */
class Index extends Controller
{

    //店铺列表
    public function list()
    {
        $param = $this->postData();
        $SupplierModel = new SupplierModel;
        $list = $SupplierModel->supplierList($param);
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 供应商中心主页
     */
    public function index()
    {
        $data = $this->postData();
        $supplier = new SupplierModel;
        $user = $this->getUser(false);
        //获取店铺信息
        $detail = $supplier->getDetail($data, $user);
        if (!$detail) {
            return $this->renderError('店铺不存在');
        }
        //优惠券
        $dataCoupon['shop_supplier_id'] = $data['shop_supplier_id'];
        $model = new CouponModel;
        $couponList = $model->getWaitList($dataCoupon, $user, 1);
        // 访问记录
        (new VisitModel())->addVisit($user, $detail, $data['visitcode'], null);
        //店铺客服信息
        $mp_service = ServiceModel::detail($data['shop_supplier_id']);
        return $this->renderSuccess('', compact('detail', 'couponList', 'mp_service'));
    }

    //成交数据
    public function tradeData($url = '')
    {
        $data = $this->postData();
        $user = $this->getUser();
        $data['shop_supplier_id'] = $this->getSupplierUser($user)['shop_supplier_id'];
        if (!$data['shop_supplier_id'] > 0) {
            return $this->renderError('您还未开通店铺');
        }
        $is_open = SettingModel::getItem('live')['is_open'];
        //累积成交笔数
        $totalCount = OrderModel::getTotalPayOrder($data['shop_supplier_id']);
        //今日成交笔数
        $todayCount = OrderModel::getTodayPayOrder($data['shop_supplier_id']);
        //累积领取
        $supplier = SupplierModel::detail($data['shop_supplier_id']);
        // 客服消息
        $msg_count = ChatModel::getNoReadCount($this->getSupplierUser($user)['supplier_user_id']);
        return $this->renderSuccess('', compact('totalCount', 'todayCount', 'supplier', 'is_open', 'msg_count'));
    }

    /**
     * 付押金
     */
    public function deposit()
    {
        // 用户信息
        $user = $this->getUser();
        $supplier = SupplierModel::detail($this->getSupplierUser($user)['shop_supplier_id'], ['category']);
        // 类目
        $category = $supplier['category'];
        if ($this->request->isGet()) {
            // 返回结算信息
            return $this->renderSuccess('', compact('category'));
        }
        // 生成订单
        $model = new DepositOrderModel;
        $order_id = $model->createOrder($user, $supplier);
        if (!$order_id) {
            return $this->renderError($model->getError() ?: '创建订单失败');
        }
        // 返回结算信息
        return $this->renderSuccess('', [
            'order_id' => $order_id,   // 订单id
        ]);
    }

    //店铺数据
    public function storedata()
    {
        $user = $this->getUser();
        $shop_supplier_id = $this->getSupplierUser($user)['shop_supplier_id'];
        //成交量
        $order = (new OrderService($shop_supplier_id))->getData();
        // 访问量
        $visit = (new UserService($shop_supplier_id))->getData();
        //订单结算
        $ordersettle = (new OrderSettledModel())->getList($shop_supplier_id, $this->postData());
        return $this->renderSuccess('', compact('order', 'visit', 'ordersettle'));
    }

    /**
     * 详情
     */
    public function settledetail($settled_id)
    {
        $model = OrderSettledModel::detail($settled_id);
        $order = OrderModel::detail($model['order_id']);
        return $this->renderSuccess('', compact('model', 'order'));
    }
}