<?php

namespace app\shop\controller\user;

use app\common\library\helper;
use app\common\model\user\Tag as TagModel;
use app\common\model\user\UserTag as UserTagModel;
use app\shop\controller\Controller;
use app\shop\model\user\User as UserModel;
use app\shop\model\user\Grade;

/**
 * 用户管理
 */
class User extends Controller
{
    /**
     * 商户列表
     */
    public function index($nickName = '', $gender = null, $reg_date = '', $grade_id = null)
    {
        $list = UserModel::getList($nickName, $grade_id, $reg_date, $gender = -1, $this->postData());
        $GradeModel = new Grade();
        $grade = $GradeModel->getLists();
        // 所有标签
        $allTag = TagModel::getAll();
        return $this->renderSuccess('', compact('list', 'grade', 'allTag'));
    }


    /**
     * 删除用户
     */
    public function delete($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        if ($model && $model->setDelete()) {
            return $this->renderSuccess('删除成功');
        }
        return $this->renderError($model->getError() ?: '删除失败');
    }


    /**
     * 添加用户
     */
    public function add()
    {
        $model = new UserModel;
        // 新增记录
        if ($model->add($this->request->param())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 用户充值
     */
    public function recharge($user_id, $source)
    {
        // 用户详情
        $model = UserModel::detail($user_id);

        if ($model->recharge($this->store['user']['user_name'], $source, $this->postData('params'))) {
            return $this->renderSuccess('操作成功');
        }
        return $this->renderError($model->getError() ?: '操作失败');
    }

    /**
     * 等级改用户
     */
    public function edit($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        if ($this->request->isGet()) {
            return $this->renderSuccess('', compact('model'));
        }
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    public function tag($user_id){
        if($this->request->isGet()){
            // 用户详情
            $user = UserModel::detail($user_id);
            // 标签
            $userTag = UserTagModel::getListByUser($user_id);
            $userTag = helper::getArrayColumn($userTag, 'tag_id');
            // 所有标签
            $allTag = TagModel::getAll();
            return $this->renderSuccess('', compact('user', 'userTag' , 'allTag'));
        }
        $model = UserModel::detail($user_id);
        if($model->editTag($this->postData())){
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }

    /**
     * 等级改用户
     */
    public function grade($user_id)
    {
        // 用户详情
        $model = UserModel::detail($user_id);
        // 修改记录
        if ($model->updateGrade($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
        return $this->renderError($model->getError() ?: '修改失败');
    }
}
