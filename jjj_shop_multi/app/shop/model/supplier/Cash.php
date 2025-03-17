<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Cash as SupplierCashModel;
use app\shop\model\supplier\Capital as CapitalModel;
use app\shop\model\supplier\Supplier as SupplierModel;

/**
 * 后台管理员登录模型
 */
class Cash extends SupplierCashModel
{
    /**
     * 获取列表数据
     */
    public function getList($params)
    {
        $model = $this;
        if (!empty($params['search'])) {
            $model = $model->where('s.name', 'like', '%' . $params['search'] . '%');
        }
        if (isset($params['apply_status']) && $params['apply_status'] > -1) {
            $model = $model->where('c.apply_status', '=', $params['apply_status']);
        }
        if (isset($params['pay_type']) && $params['pay_type'] > -1) {
            $model = $model->where('c.pay_type', '=', $params['pay_type']);
        }
        // 查询列表数据
        return $model->alias('c')
            ->with(['supplier', 'account'])
            ->join('supplier s', 'c.shop_supplier_id=s.shop_supplier_id')
            ->field('c.*')
            ->order(['c.create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 分销商提现审核
     */
    public function submit($param)
    {
        $data = ['apply_status' => $param['apply_status']];
        if ($param['apply_status'] == 30) {
            $data['reject_reason'] = $param['reject_reason'];
        }
        // 更新申请记录
        $data['audit_time'] = time();
        $this->save($data);
        // 提现驳回：解冻分销商资金
        if ($param['apply_status'] == 30) {
            SupplierModel::backFreezeMoney($this['shop_supplier_id'], $this['money']);
        }
        return true;
    }

    /**
     * 确认已打款
     */
    public function money()
    {
        $this->startTrans();
        try {
            // 更新申请状态
            $data = ['apply_status' => 40, 'audit_time' => time()];
            $this->save($data);
            // 更新分销商累积提现佣金
            SupplierModel::totalMoney($this['shop_supplier_id'], $this['money']);
            $add = [
                'shop_supplier_id' => $this['shop_supplier_id'],
                'flow_type' => 20,
                'money' => $this['money'],
                'describe' => '商家提现',
            ];
            //添加资金明细
            CapitalModel::add($add);
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
     * 获取申请数量
     */
    public static function getApplyCount($apply_status)
    {
        return (new static())->where('apply_status', '=', $apply_status)->count();
    }
}