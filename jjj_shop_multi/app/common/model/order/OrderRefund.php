<?php

namespace app\common\model\order;

use app\common\model\BaseModel;
use app\shop\model\user\User as UserModel;
use app\common\service\order\OrderRefundService;
use app\common\service\message\MessageService;

/**
 * 售后管理模型
 */
class OrderRefund extends BaseModel
{
    protected $name = 'order_refund';
    protected $pk = 'order_refund_id';

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User');
    }

    /**
     * 关联订单主表
     */
    public function orderMaster()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order');
    }

    /**
     * 关联订单商品表
     */
    public function orderproduct()
    {
        return $this->belongsTo('app\\common\\model\\order\\OrderProduct', 'order_product_id', 'order_product_id');
    }

    /**
     * 关联图片记录表
     */
    public function image()
    {
        return $this->hasMany('app\\common\\model\\order\\OrderRefundImage');
    }

    /**
     * 关联物流公司表
     */
    public function express()
    {
        return $this->belongsTo('app\\api\\model\\settings\\Express');
    }

    /**
     * 关联物流公司表
     */
    public function sendexpress()
    {
        return $this->belongsTo('app\\api\\model\\settings\\Express', 'send_express_id', 'express_id');
    }

    /**
     * 关联用户表
     */
    public function address()
    {
        return $this->hasOne('app\\api\\model\\order\\OrderRefundAddress');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id');
    }

    /**
     * 售后类型
     */
    public function getTypeAttr($value)
    {
        $status = [10 => '退货退款', 20 => '换货', 30 => '仅退款'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 售后类型
     */
    public function getPlateStatusAttr($value)
    {
        $status = [0 => '未申请', 10 => '待审核', 20 => '已同意', 30 => '已拒绝'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 商家是否同意售后
     */
    public function getIsAgreeAttr($value)
    {
        $status = [0 => '待审核', 10 => '已同意', 20 => '已拒绝'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 售后单状态
     */
    public function getStatusAttr($value)
    {
        $status = [0 => '进行中', 10 => '已拒绝', 20 => '已完成', 30 => '已取消'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 售后类型
     */
    public function getDeliverTimeAttr($value)
    {

        return isset($value) && $value > 0 ? date('Y-m-d H:i:s', $value) : '';
    }

    /**
     * 售后单详情
     */
    public static function detail($where)
    {
        is_array($where) ? $filter = $where : $filter['order_refund_id'] = (int)$where;
        return (new static())->with(['order_master', 'image.file', 'orderproduct.image', 'express', 'address', 'user', 'sendexpress'])->where($filter)->find();
    }

    /**
     * 获取退款订单总数 (可指定某天)
     * 已同意的退款
     */
    public function getOrderRefundData($startDate, $endDate, $type, $shop_supplier_id)
    {
        $model = $this;
        $model = $model->where('create_time', '>=', strtotime($startDate));
        if (is_null($endDate)) {
            $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }

        if ($shop_supplier_id > 0) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }

        $model = $model->where('is_agree', '=', 10);

        if ($type == 'order_refund_money') {
            // 退款金额
            return $model->sum('refund_money');
        } else if ($type == 'order_refund_total') {
            // 退款数量
            return $model->count();
        }
        return 0;
    }

    /**
     * 商家审核
     */
    public function audit($data)
    {
        if ($this['is_agree']['value'] != 0) {
            $this->error = '售后已审核';
            return false;
        }
        if ($data['is_agree'] == 20 && empty($data['refuse_desc'])) {
            $this->error = '请输入拒绝原因';
            return false;
        }
        if ($data['is_agree'] == 10 && $this['type']['value'] != 30 && empty($data['address_id'])) {
            $this->error = '请选择退货地址';
            return false;
        }
        $this->startTrans();
        try {
            // 拒绝申请, 标记售后单状态为已拒绝
            $data['is_agree'] == 20 && $data['status'] = 10;
            // 同意换货申请, 标记售后单状态为已完成
            //$data['is_agree'] == 10 && $this['type']['value'] == 20 && $data['status'] = 20;
            // 更新退款单状态
            $this->save($data);
            // 同意售后申请, 记录退货地址
            if ($data['is_agree'] == 10 && $this['type']['value'] != 30) {
                $model = new OrderRefundAddress();
                $model->add($this['order_refund_id'], $data['address_id']);
            }
            // 订单详情
            $order = Order::detail($this['order_id']);
            // 发送模板消息
            (new MessageService)->refund(self::detail($this['order_refund_id']), $order['order_no'], 'audit');
            // 如果是仅退款
            if ($data['is_agree'] == 10 && $this['type']['value'] == 30) {
                $total_refund = $this['orderproduct']['total_pay_price'];
                if ($data['refund_money'] > $total_refund) {
                    $this->error = '退款金额不能大于商品实付款金额';
                    return false;
                }
                $this->refundMoney($order, $data);
            }
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 确认收货并退款
     */
    public function receipt($data)
    {
        // 订单详情
        $order = Order::detail($this['order_id']);
        $total_refund = $this['orderproduct']['total_pay_price'];
        if ($data['refund_money'] > $total_refund) {
            $this->error = '退款金额不能大于商品实付款金额';
            return false;
        }
        $this->transaction(function () use ($order, $data) {
            $this->refundMoney($order, $data);
        });
        return true;
    }

    public function refundMoney($order, $data)
    {
        $update = [
            'is_receipt' => 1,
            'status' => 20
        ];
        if ($this['type']['value'] == 20 && isset($data['send_express_id'])) {
            $update['send_express_id'] = $data['send_express_id'];
            $update['send_express_no'] = $data['send_express_no'];
            $update['deliver_time'] = time();
            $update['is_plate_send'] = 1;
        }
        $data['refund_money'] > 0 && $update['refund_money'] = $data['refund_money'];
        $out_refund_no = '';
        $out_refund_no && $update['out_refund_no'] = $out_refund_no;
        // 更新售后单状态
        $this->save($update);
        // 消减用户的实际消费金额
        // 条件：判断订单是否已结算
        if ($order['is_settled'] == true && $data['refund_money'] > 0) {
            (new UserModel)->setDecUserExpend($order['user_id'], $data['refund_money']);
        }
        // 执行原路退款
        $data['refund_money'] > 0 && (new OrderRefundService)->execute($order, $data['refund_money'], $out_refund_no);
        $data['refund_money'] > 0 && $order->save(['refund_money' => $order['refund_money'] + $data['refund_money']]);
        // 发送模板消息
        (new MessageService)->refund(self::detail($this['order_refund_id']), $order['order_no'], 'receipt');
    }
}