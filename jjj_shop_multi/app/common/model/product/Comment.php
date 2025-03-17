<?php

namespace app\common\model\product;

use app\common\model\BaseModel;

/**
 * 评论模型
 */
class Comment extends BaseModel
{
    protected $name = 'comment';
    protected $px = 'comment_id';

    /**
     * 所属订单
     */
    public function orderM()
    {
        return $this->belongsTo('app\\common\\model\\order\\Order');
    }

    /**
     * 订单商品
     */
    public function OrderProduct()
    {
        return $this->belongsTo('app\\common\\model\\order\\OrderProduct');
    }

    /**
     * 商品
     */
    public function product()
    {
        return $this->belongsTo('app\\common\\model\\product\\Product', 'product_id', 'product_id');
    }

    /**
     * 关联用户表
     */
    public function user()
    {
        return $this->belongsTo('app\\common\\model\\user\\User', 'user_id', 'user_id');
    }

    /**
     * 关联评价图片表
     */
    public function image()
    {
        return $this->hasMany('app\\common\\model\\product\\CommentImage', 'comment_id', 'comment_id')->order(['id' => 'asc']);
    }

    /**
     * 评价详情
     */
    public static function detail($comment_id)
    {
        return (new static())->where('comment_id', '=', $comment_id)->with(['user','image.file', 'orderM', 'product.image.file'])->find();
    }

    /**
     * 获取评价列表
     * @param $params
     * @return \think\Paginator
     * @throws \think\db\exception\DbException
     */
    public function getList($params)
    {
        $model = $this;
        if (isset($params['name']) && !empty(trim($params['name']))) {
            $product_model = new Product();
            $res = $product_model->getWhereData($params['name'])->toArray();
            $str = implode(',', array_column($res, 'product_id'));
            $model = $model->where('product_id', 'in', $str);
        }
        if (isset($params['score']) && $params['score'] > 0) {
            $model = $model->where('score', '=', $params['score']);
        }
        if (isset($params['status']) && $params['status'] > -1) {
            $model = $model->where('status', '=', $params['status']);
        }
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id'] > 0) {
            $model = $model->where('shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        return $model->with(['user', 'orderM', 'product.image.file','image.file'])
            ->where('is_delete', '=', 0)
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->paginate($params);
    }

    /**
     * 获取评论数
     */
    public function getStatusNum($where)
    {
        return $this->where($where)->count();
    }

}