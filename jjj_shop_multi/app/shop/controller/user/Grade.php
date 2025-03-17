<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\user\Grade as GradeModel;
use app\common\model\user\GradeLog as GradeLogModel;

/**
 * 会员等级
 */
class Grade extends Controller
{
    /**
     * 会员等级列表
     */
    public function index()
    {
        $model = new GradeModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加等级
     */
    public function add()
    {
        $model = new GradeModel;
        // 新增记录
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 编辑会员等级
     */
    public function edit($grade_id)
    {
        $model = GradeModel::detail($grade_id);
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess();
        }
        return $this->renderError();
    }

    /**
     * 删除会员等级
     */
    public function delete($grade_id)
    {
        // 会员等级详情
        $model = GradeModel::detail($grade_id);
        if (!$model->setDelete()) {
            return $this->renderError('已存在用户，删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

    /**
     * 会员等级日志
     */
    public function log()
    {
        $model = new GradeLogModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}