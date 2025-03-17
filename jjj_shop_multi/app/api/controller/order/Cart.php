<?php

namespace app\api\controller\order;

use app\api\controller\Controller;
use app\api\model\order\Cart as CartModel;
use app\api\model\settings\Setting as SettingModel;
use app\api\model\product\Product as ProductModel;

/**
 * 购物车控制器
 */
class Cart extends Controller
{
    private $user;

    // $model
    private $model;

    /**
     * 构造方法
     */
    public function initialize()
    {
        $this->user = $this->getUser();
        $this->model = new CartModel();
    }

    /**
     * 购物车列表
     */
    public function lists()
    {
        // 购物车商品列表
        $productList = $this->model->getList($this->user);
        // 会员价
        $product_model = new ProductModel();
        foreach ($productList as $supplier) {
            foreach ($supplier['productList'] as $product) {
                $product_model->setProductGradeMoney($this->user, $product);
            }
        }
        //是否显示店铺信息
        $store_open = SettingModel::getStoreOpen();
        return $this->renderSuccess('', compact('productList', 'store_open'));
    }

    /**
     * 加入购物车
     * @param int $product_id 商品id
     * @param int $product_num 商品数量
     * @param string $product_sku_id 商品sku索引
     */
    public function add()
    {
        $data = $this->request->param();
        $product_id = $data['product_id'];
        $product_num = $data['total_num'];
        $spec_sku_id = $data['spec_sku_id'];
        $model = $this->model;
        if (!$model->add($this->user, $product_id, $product_num, $spec_sku_id)) {
            return $this->renderError($this->model->getError() ?: '加入购物车失败');
        }
        // 购物车商品总数量
        $totalNum = $model->getProductNum($this->user);
        return $this->renderSuccess('加入购物车成功', ['cart_total_num' => $totalNum]);
    }

    /**
     * 减少购物车商品数量
     * @param $product_id
     * @param $product_sku_id
     * @return array
     */
    public function sub($product_id, $spec_sku_id)
    {
        $this->model->sub($this->user, $product_id, $spec_sku_id);
        return $this->renderSuccess('');
    }

    /**
     * 删除购物车中指定商品
     * @param $product_sku_id (支持字符串ID集)
     * @return array
     */
    public function delete($cart_id)
    {
        $this->model->setDelete($this->user, $cart_id);
        return $this->renderSuccess('删除成功');
    }
}