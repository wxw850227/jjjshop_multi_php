<?php

namespace app\shop\controller\user;

use app\shop\controller\Controller;
use app\shop\model\user\Tag as TagModel;

/**
 * 会员等级
 */
class Tag extends Controller
{
    /**
     * 会员等级列表
     */
    public function index()
    {
        $model = new TagModel;
        $list = $model->getList($this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 添加等级
     */
    public function add()
    {
        $model = new TagModel;
        // 新增记录
        if ($model->add($this->postData())) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError('添加失败');
    }

    /**
     * 编辑会员等级
     */
    public function edit($tag_id)
    {
        $model = TagModel::detail($tag_id);
        // 修改记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess();
        }
        return $this->renderError();
    }

    /**
     * 删除会员等级
     */
    public function delete($tag_id)
    {
        // 会员等级详情
        $model = TagModel::detail($tag_id);
        if (!$model->deleteTag()) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}