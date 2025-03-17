<?php

namespace app\api\controller\product;

use app\api\controller\Controller;
use app\api\model\product\Comment as CommentModel;

/**
 * 商品评价控制器
 */
class Comment extends Controller
{
    /**
     * 商品评价列表
     */
    public function lists($product_id, $scoreType = -1)
    {
        $model = new CommentModel;
        $list = $model->getProductCommentList($product_id, $scoreType, $this->postData());
        $total = $model->getTotal($product_id);
        return $this->renderSuccess('', compact('list', 'total'));
    }

    /**
     * 我的商品评价列表
     */
    public function userLists()
    {
        $model = new CommentModel;
        $list = $model->getUserCommentList($this->getUser(), $this->postData());
        return $this->renderSuccess('', compact('list'));
    }

    /**
     * 删除评价
     */
    public function delete($comment_id)
    {
        $model = new CommentModel;
        if (!$model->remove($comment_id, $this->getUser())) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }

}