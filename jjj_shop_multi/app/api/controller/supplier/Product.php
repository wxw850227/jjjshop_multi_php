<?php

namespace app\api\controller\supplier;

use app\api\controller\Controller;
use app\api\model\product\Product as ProductModel;
use app\api\service\product\ProductService;

/**
 * 供应商产品
 */
class Product extends Controller
{
    // user
    private $user;
    private $supplierUser;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();   // 用户信息
        $this->supplierUser = $this->getSupplierUser($this->user);
    }

    /**
     * 供应商中心主页
     */
    public function index()
    {
        $data = $this->postData();
        // 获取商品列表数据
        $model = new ProductModel;
        $data['shop_supplier_id'] = $this->supplierUser['shop_supplier_id'];
        $productList = $model->getList($data, $this->user);
        return $this->renderSuccess('', compact('productList'));
    }

    //商品上下架
    public function modify()
    {
        $data = $this->postData();
        // 获取商品数据
        $model = ProductModel::detail($data['product_id']);
        if ($this->supplierUser['shop_supplier_id'] != $model['shop_supplier_id']) {
            return $this->renderError('非法请求');
        }
        if (!$model->editStatus($data)) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * 添加商品
     */
    public function add()
    {
        $model = new ProductModel;
        // get请求
        if ($this->request->isGet()) {
            return $this->getBaseData($this->supplierUser['shop_supplier_id']);
        }
        if (!$model->add($this->postData(), $this->supplierUser['shop_supplier_id'])) {
            return $this->renderError($model->getError() ?: '添加失败');
        }
        return $this->renderSuccess('添加成功');
    }

    /**
     * 商品编辑
     */
    public function edit($product_id, $scene = 'edit')
    {
        if ($this->request->isGet()) {
            $model = ProductModel::detail($product_id);
            return $this->renderSuccess('', array_merge(ProductService::getEditData($model, $scene, $this->supplierUser['shop_supplier_id']), compact('model')));
        }
        // 商品详情
        $model = ProductModel::detail($product_id);
        // 更新记录
        if ($model->edit($this->postData(), $this->supplierUser['shop_supplier_id'])) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 获取基础数据
     */
    public function getBaseData($shop_supplier_id)
    {
        return $this->renderSuccess('', array_merge(ProductService::getEditData(null, 'add', $shop_supplier_id), []));
    }

    /**
     * 获取编辑数据
     */
    public function getEditData($product_id, $scene, $shop_supplier_id)
    {
        $model = ProductModel::detail($product_id);
        return $this->renderSuccess('', array_merge(ProductService::getEditData($model, $scene, $shop_supplier_id), compact('model')));
    }


}