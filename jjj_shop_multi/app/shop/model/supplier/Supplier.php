<?php

namespace app\shop\model\supplier;

use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\User as SupplierUserModel;
use app\common\model\user\User as UserModel;
use app\shop\model\product\Product as ProductModel;

/**
 * 后台管理员登录模型
 */
class Supplier extends SupplierModel
{
    /**
     * 获取列表数据
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['search']) && $params['search']) {
            $model = $model->where('name', 'like', '%' . $params['search'] . '%');
        }
        // 查询列表数据
        return $model->with(['logo', 'superUser', 'business'])
            ->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 添加
     */
    public function add($data)
    {
        // 开启事务
        $this->startTrans();
        try {
            $supplier = $data['supplier'];
            if (SupplierUserModel::checkExist($supplier['user_name'])) {
                $this->error = '用户名已存在';
                return false;
            }
            // 用户是否已绑定
            $user = null;
            if ($supplier['user_id'] > 0) {
                $user = UserModel::detail($supplier['user_id']);
                if ($user['user_type'] != 1) {
                    $this->error = '该用户已绑定';
                    return false;
                }
                $isApply = $this->isApply($supplier['user_id']);
                if ($isApply) {
                    $this->error = '已经申请开店';
                    return false;
                }
            }
            // 添加供应商
            $supplier['app_id'] = self::$app_id;
            $this->save($supplier);
            // 添加登录用户
            $user_model = new SupplierUserModel();
            $user_model->save([
                'user_id' => $supplier['user_id'],
                'user_name' => $supplier['user_name'],
                'password' => salt_hash($supplier['password']),
                'real_name' => $supplier['user_name'],
                'shop_supplier_id' => $this['shop_supplier_id'],
                'is_super' => 1,
                'app_id' => self::$app_id,
            ]);
            // 后台添加的直接算审核通过
            if ($user) {
                $user->save([
                    'user_type' => 2
                ]);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 修改
     */
    public function edit($data)
    {
        // 开启事务
        $this->startTrans();
        try {
            $supplier = $data['supplier'];
            $old_user_id = 0;
            if ($this['superUser']) {
                $old_user_id = $this['superUser']['user_id'];
            }
            if ($this['superUser'] && $supplier['user_name'] != $this['superUser']['user_name'] && SupplierUserModel::checkExist($supplier['user_name'])) {
                $this->error = '用户名已存在';
                return false;
            }

            // 用户是否已绑定
            $user = null;
            $userChange = false;
            if ($this['superUser'] && $supplier['user_id'] > 0 && $supplier['user_id'] != $this['superUser']['user_id']) {
                $user = UserModel::detail($supplier['user_id']);
                if ($user['user_type'] != 1) {
                    $this->error = '该用户已绑定';
                    return false;
                }
                $isApply = $this->isApply($supplier['user_id']);
                if ($isApply) {
                    $this->error = '已经申请开店';
                    return false;
                }
                $userChange = true;
            }
            // 修改供应商
            $this->save($supplier);
            // 修改登录用户
            $user_model = $this['superUser'];
            $user_data = [
                'user_id' => $supplier['user_id'],
                'user_name' => $supplier['user_name']
            ];
            if (isset($supplier['password']) && !empty($supplier['password'])) {
                $user_data['password'] = salt_hash($supplier['password']);
            }
            $user_model->save($user_data);
            // 后台添加的直接算审核通过
            if ($userChange) {
                $user->save([
                    'user_type' => 2
                ]);
                //取消原来的
                if ($old_user_id > 0) {
                    (new UserModel())->where('user_id', '=', $old_user_id)->update([
                        'user_type' => 1
                    ]);
                }
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }

    /**
     * 开启禁止
     */
    public function setRecycle($is_recycle)
    {
        // 开启事务
        $this->startTrans();
        try {
            if ($is_recycle == 1) {
                //产品下架
                (new ProductModel())->where('shop_supplier_id', '=', $this['shop_supplier_id'])->update(['product_status' => 20]);
            }
            //更改店铺状态
            $this->save(['is_recycle' => $is_recycle]);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }


    }

    /**
     * 获取列表数据
     */
    public static function getAll()
    {
        $model = new static();
        // 查询列表数据
        return $model->field(['shop_supplier_id,name'])->where('is_delete', '=', '0')
            ->order(['create_time' => 'desc'])
            ->select();
    }


    /**
     * 提现驳回：解冻资金
     */
    public static function backFreezeMoney($shop_supplier_id, $money)
    {
        $model = self::detail($shop_supplier_id);
        return $model->save([
            'money' => $model['money'] + $money,
            'freeze_money' => $model['freeze_money'] - $money,
        ]);
    }

    /**
     * 提现打款成功：累积提现金额
     */
    public static function totalMoney($shop_supplier_id, $money)
    {
        $model = self::detail($shop_supplier_id);
        return $model->save([
            'freeze_money' => $model['freeze_money'] - $money,
            'cash_money' => $model['cash_money'] + $money,
        ]);
    }

    /**
     * 获取供应商数量
     */
    public static function getTotal($where)
    {
        $model = new static;
        return $model->where($where)->count();
    }

    /**
     * 获取供应商总数量
     */
    public function getSupplierTotal()
    {
        return $this->where(['is_delete' => 0])->count();
    }

    /**
     * 获取供应商总数量
     */
    public static function getSupplierTotalByDay($day)
    {
        $startTime = strtotime($day);
        return (new static())->where('create_time', '>=', $startTime)
            ->where('create_time', '<', $startTime + 86400)
            ->count();
    }

    /**
     * 获取供应商统计数量
     */
    public function getSupplierData($startDate, $endDate, $type)
    {
        $model = $this;
        if (!is_null($startDate)) {
            $model = $model->where('create_time', '>=', strtotime($startDate));
        }
        if (is_null($endDate)) {
            $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        } else {
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }
        if ($type == 'supplier_total' || $type == 'supplier_add') {
            return $model->count();
        }
        return 0;
    }

    /**
     * 获取平台的总销售额
     */
    public function getTotalMoney($type = 'total_money')
    {
        $model = $this;
        if ($type == 'total') {
            return $model->sum('total_money');
        } else if ($type == 'money') {
            return $model->sum('money');
        } else if ($type == 'freeze_money') {
            return $model->sum('freeze_money');
        } else if ($type == 'cash_money') {
            return $model->sum('cash_money');
        } else if ($type == 'deposit_money') {
            return $model->sum('deposit_money');
        }
        return 0;
    }

    //判断用户是否申请
    public function isApply($user_id)
    {
        return $this->where('user_id', '=', $user_id)->where('status', '=', 0)->count();
    }
}