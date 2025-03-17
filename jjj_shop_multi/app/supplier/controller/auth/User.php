<?php

namespace app\supplier\controller\auth;

use app\supplier\model\supplier\Access as AccessModel;
use app\supplier\controller\Controller;
use app\supplier\model\auth\User as UserModel;
use app\supplier\model\auth\Role;
use app\supplier\model\auth\User as AuthUserModel;

/**
 * 管理员
 */
class User extends Controller
{
    /**
     * 首页列表
     * @return \think\response\Json
     */
    public function index()
    {
        $model = new UserModel();
        $list = $model->getList($this->postData(), $this->getSupplierId());
        // 角色列表
        $roleList = (new Role())->getTreeData($this->getSupplierId());
        return $this->renderSuccess('', compact('list', 'roleList'));
    }


    /**
     * 新增
     * @return \think\response\Json
     */
    public function add()
    {
        $data = $this->postData();
        $data['shop_supplier_id'] = $this->getSupplierId();
        $model = new UserModel();
        $num = $model->getUserName(['is_delete' => 0, 'user_name' => $data['user_name']]);
        if ($num > 0) {
            return $this->renderError('用户名已存在');
        }
        if (!isset($data['access_id'])) {
            return $this->renderError('请选择所属角色');
        }
        if ($data['confirm_password'] != $data['password']) {
            return $this->renderError('确认密码和登录密码不一致');
        }
        $model = new UserModel();
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 修改信息
     * @param $shop_user_id
     * @return \think\response\Json
     */
    public function editInfo($shop_user_id)
    {
        $info = UserModel::detail(['supplier_user_id' => $shop_user_id], ['userRole', 'user']);

        $role_arr = array_column($info->toArray()['userRole'], 'role_id');

        $model = new Role();
        // 角色列表
        $roleList = $model->getTreeData($this->getSupplierId());
        // 绑定用户
        $user = $info['user'];
        return $this->renderSuccess('', compact('info', 'roleList', 'role_arr', 'user'));
    }

    /**
     * 编辑
     * @param $shop_user_id
     * @return \think\response\Json
     */
    public function edit($supplier_user_id)
    {
        $data = $this->postData();
        if ($this->request->isGet()) {
            return $this->editInfo($supplier_user_id);
        }

        $model = UserModel::detail($supplier_user_id, ['user']);
        if ($data['user_name'] != $model['user_name']) {
            $num = $model->getUserName(['is_delete' => 0, 'user_name' => $data['user_name']]);
            if ($num > 0) {
                return $this->renderError('用户名已存在');
            }
        }
        if (!isset($data['access_id'])) {
            return $this->renderError('请选择所属角色');
        }
        if (isset($data['password']) && !empty($data['password'])) {
            if (!isset($data['confirm_password'])) {
                return $this->renderError('请输入确认密码');
            } else {
                if ($data['confirm_password'] != $data['password']) {
                    return $this->renderError('确认密码和登录密码不一致');
                }
            }
        }
        if (empty($data['password'])) {
            if (isset($data['confirm_password']) && !empty($data['confirm_password'])) {
                return $this->renderError('请输入登录密码');
            }
        }

        // 更新记录
        if ($model->edit($data)) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');


    }

    /**
     * 删除
     */
    public function delete($supplier_user_id)
    {
        $model = new UserModel();
        if ($model->del([
            'supplier_user_id' => $supplier_user_id,
            'shop_supplier_id' => $this->getSupplierId()
        ])) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError('删除失败');
    }

    /**
     * 获取角色菜单信息
     */
    public function getRoleList()
    {
        $user = $this->supplier['user'];

        $user_info = (new AuthUserModel())->find($user['supplier_user_id']);

        if ($user_info['is_super'] == 1) {
            $model = new AccessModel();
            $menus = $model->getList();
        } else {
            $model = new AccessModel();
            $menus = $model->getListByUser($user['supplier_user_id']);

            foreach ($menus as $key => $val) {
                if ($val['redirect_name'] != $val['children'][0]['path']) {
                    $menus[$key]['redirect_name'] = $menus[$key]['children'][0]['path'];
                }
            }
        }
        return $this->renderSuccess('', compact('menus'));
    }

    /**
     * 获取用户信息
     */
    public function getUserInfo()
    {
        $supplier = $this->supplier;
        $user = [];
        if (!empty($supplier)) {
            $user = $supplier['user'];
        }
        // 门店名称
        $shop_name = $user['supplier_name'];
        //当前系统版本
        $version = get_version();
        return $this->renderSuccess('', compact('user', 'shop_name', 'version'));
    }
}
