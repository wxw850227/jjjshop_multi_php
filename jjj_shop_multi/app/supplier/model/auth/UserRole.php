<?php

namespace app\supplier\model\auth;

use app\common\model\supplier\UserRole as UserRoleModel;


/**
 * 角色模型
 */
class UserRole extends UserRoleModel
{

    public function getUserRole($where)
    {
        return $this->where($where)->column('role_id');

    }

    /**
     * 获取指定管理员的所有角色id
     * @param $supplier_user_id
     * @return array
     */
    public static function getRoleIds($supplier_user_id)
    {
        return (new self)->where('supplier_user_id', '=', $supplier_user_id)->column('role_id');
    }

    /**
     * 获取角色下的用户
     */
    public static  function getUserRoleCount($role_id){
        $model = new static();
        return $model->alias('userRole')
            ->join('supplier_user', 'userRole.supplier_user_id = supplier_user.supplier_user_id', 'left')
            ->where('userRole.role_id', '=', $role_id)
            ->where('supplier_user.is_delete', '=', 0)
            ->count();
    }
}
