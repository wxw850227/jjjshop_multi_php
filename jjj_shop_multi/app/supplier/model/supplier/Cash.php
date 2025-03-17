<?php

namespace app\supplier\model\supplier;

use app\common\model\supplier\Cash as SupplierCashModel;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\Account as SupplierAccountModel;
use app\common\exception\BaseException;

/**
 * 供应商提现账号模型
 */
class Cash extends SupplierCashModel
{
    public function getList($shop_supplier_id, $data)
    {
        // 获取数据列表
        return $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['create_time' => 'desc'])
            ->paginate($data);
    }

    /**
     * 提交申请
     */
    public function submit($shop_supplier_id, $data)
    {
        $supplier = SupplierModel::detail($shop_supplier_id);
        $account = SupplierAccountModel::detail($shop_supplier_id);
        if (!$account) {
            throw new BaseException(['msg' => '请填写提现账户信息']);
        }
        // 数据验证
        $this->validation($supplier, $data, $account);
        // 新增申请记录
        $this->save(array_merge($data, [
            'shop_supplier_id' => $shop_supplier_id,
            'apply_status' => 10,
            'app_id' => self::$app_id,
        ]));
        // 冻结用户资金
        $supplier->freezeMoney($data['money']);
        return true;
    }

    /**
     * 数据验证
     */
    private function validation($supplier, $data, $account)
    {
        // 最低提现佣金
        if ($data['money'] <= 0) {
            throw new BaseException(['msg' => '提现金额不正确']);
        }
        if ($supplier['money'] <= 0) {
            throw new BaseException(['msg' => '没有可提现金额']);
        }
        if ($data['money'] > $supplier['money']) {
            throw new BaseException(['msg' => '提现金额不能大于可提现金额']);
        }
        if ($data['pay_type'] == '10') {
            if (empty($account['alipay_name']) || empty($account['alipay_account'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        } elseif ($data['pay_type'] == '20') {
            if (empty($account['bank_name']) || empty($account['bank_account']) || empty($account['bank_card'])) {
                throw new BaseException(['msg' => '请补全提现信息']);
            }
        } else {
            throw new BaseException(['msg' => '提现方式不正确']);
        }
    }
}