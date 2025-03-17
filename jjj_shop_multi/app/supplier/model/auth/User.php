<?php

namespace app\supplier\model\auth;

use app\common\model\supplier\User as SupplierUserModel;
use app\common\model\user\User as UserModel;

/**
 * 角色模型
 */
class User extends SupplierUserModel
{

    public function getList($limit, $shop_supplier_id)
    {
        return $this->with(['userRole.role'])->where('is_delete', '=', 0)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->order(['create_time' => 'desc'])
            ->paginate($limit);
    }

    /**
     * 获取所有上级id集
     */
    public function getTopRoleIds($role_id, &$all = null)
    {
        static $ids = [];
        is_null($all) && $all = $this->getAll();
        foreach ($all as $item) {
            if ($item['role_id'] == $role_id && $item['parent_id'] > 0) {
                $ids[] = $item['parent_id'];
                $this->getTopRoleIds($item['parent_id'], $all);
            }
        }
        return $ids;
    }

    /**
     * 获取所有角色
     */
    private function getAll()
    {
        $data = $this->order(['sort' => 'asc', 'create_time' => 'asc'])->select();
        return $data ? $data->toArray() : [];
    }

    public function add($data)
    {
        $this->startTrans();
        try {
            // 用户是否已绑定
            $user = null;
            if ($data['user_id'] > 0) {
                $user = UserModel::detail($data['user_id']);
                if ($user['user_type'] != 1) {
                    $this->error = '该用户已绑定，或绑定的商户正在审核';
                    return false;
                }
            }
            $arr = [
                'user_name' => trim($data['user_name']),
                'password' => salt_hash($data['password']),
                'real_name' => trim($data['real_name']),
                'user_id' => $data['user_id'],
                'app_id' => self::$app_id,
                'shop_supplier_id' => $data['shop_supplier_id']
            ];
            $res = self::create($arr);
            $add_arr = [];
            $model = new UserRole();
            foreach ($data['access_id'] as $val) {
                $add_arr[] = [
                    'supplier_user_id' => $res['supplier_user_id'],
                    'role_id' => $val,
                    'app_id' => self::$app_id,
                ];
            }
            $model->saveAll($add_arr);
            // 后台添加的直接算审核通过
            if ($user) {
                $user->save([
                    'user_type' => 2
                ]);
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

    public function getUserName($where)
    {
        return $this->where($where)->count();
    }


    public function edit($data)
    {
        $this->startTrans();
        try {
            // 用户是否已绑定
            $user = null;
            $old_user_id = 0;
            if ($this['user']) {
                $old_user_id = $this['user']['user_id'];
            }
            $userChange = false;
            if ($this['user'] && $data['user_id'] > 0 && $data['user_id'] != $this['user']['user_id']) {
                $user = UserModel::detail($data['user_id']);
                if ($user['user_type'] != 1) {
                    $this->error = '该用户已绑定，或绑定的商户正在审核';
                    return false;
                }
                $userChange = true;
            }

            $arr = [
                'user_name' => $data['user_name'],
                'user_id' => $data['user_id'],
                'real_name' => $data['real_name'],
            ];
            if (!empty($data['password'])) {
                $arr['password'] = salt_hash($data['password']);
            }
            $this->save($arr);

            $model = new UserRole();
            $where['supplier_user_id'] = $data['supplier_user_id'];
            UserRole::destroy($where);
            $add_arr = [];
            foreach ($data['access_id'] as $val) {
                $add_arr[] = [
                    'supplier_user_id' => $data['supplier_user_id'],
                    'role_id' => $val,
                    'app_id' => self::$app_id
                ];
            }
            $model->saveAll($add_arr);
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
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    public function getChild($where)
    {
        return $this->where($where)->count();
    }

    public function del($where)
    {
        return self::update(['is_delete' => 1], $where);
    }
}
