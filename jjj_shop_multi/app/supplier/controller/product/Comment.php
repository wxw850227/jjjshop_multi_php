<?php

namespace app\supplier\controller\product;

use app\supplier\controller\Controller;
use app\supplier\model\product\Comment as CommentModel;

/**
 * 商品评价控制器
 */
class Comment extends Controller
{
    /**
     * 评价列表
     */
    public function index()
    {
        $model = new CommentModel;
        //列表
        $list = $model->getList(array_merge(['shop_supplier_id' => $this->getSupplierId()], $this->postData()));
        //重要数据
        $num = $model->getStatusNum(['shop_supplier_id' => $this->getSupplierId(), 'status' => 0]);
        return $this->renderSuccess('', compact('list','num'));
    }

    /**
     * 评价详情
     */
    public function detail($comment_id)
    {
        // 评价详情
        $model = new CommentModel();
        $data = $model->detail($comment_id);
        return $this->renderSuccess('', compact('data'));
    }

    /**
     * 更新商品评论
     */
    public function edit()
    {
        $model = new CommentModel();
        // 更新记录
        if ($model->edit($this->postData())) {
            return $this->renderSuccess('修改成功');
        }
    }

    /**
     * 删除评价
     */
    public function delete($comment_id)
    {
        $model = new CommentModel();
        if (!$model->setDelete($comment_id)) {
            return $this->renderError('删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}