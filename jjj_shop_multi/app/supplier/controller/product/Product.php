<?php

namespace app\supplier\controller\product;

use app\common\model\settings\Setting;
use app\supplier\model\product\Product as ProductModel;
use app\common\model\product\Category as CategoryModel;
use app\supplier\service\ProductService;
use app\supplier\model\supplier\Supplier as SupplierModel;
use app\supplier\controller\Controller;

/**
 * 商品管理控制器
 */
class Product extends Controller
{
    /**
     * 商品列表(全部)
     */
    public function index()
    {
        $supplier = SupplierModel::detail($this->getSupplierId());
        // 获取全部商品列表
        $model = new ProductModel;
        $list = $model->getList(array_merge(['status' => -1, 'shop_supplier_id' => $this->getSupplierId()], $this->postData()));
        // 商品分类
        $category = CategoryModel::getCacheTree();
        // 数量
        $product_count = [
            'sell' => $model->getCount('sell', $this->getSupplierId()),
            'stock' => $model->getCount('stock', $this->getSupplierId()),
            'recovery' => $model->getCount('recovery', $this->getSupplierId()),
            'draft' => $model->getCount('draft', $this->getSupplierId()),
            'lower' => $model->getCount('lower', $this->getSupplierId()),
            'audit' => $model->getCount('audit', $this->getSupplierId()),
            'no_audit' => $model->getCount('no_audit', $this->getSupplierId())
        ];
        return $this->renderSuccess('', compact('list', 'category', 'supplier', 'product_count'));
    }

    /**
     * 添加商品
     */
    public function add($scene = 'add')
    {
        // get请求
        if ($this->request->isGet()) {
            return $this->getBaseData();
        }
        //post请求
        $data = json_decode($this->postData()['params'], true);
        if ($scene == 'copy') {
            unset($data['create_time']);
            unset($data['sku']['product_sku_id']);
            unset($data['sku']['product_id']);
            unset($data['product_sku']['product_sku_id']);
            unset($data['product_sku']['product_id']);
            // 如果是多规格
            if ($data['spec_type'] == 20) {
                foreach ($data['spec_many']['spec_list'] as &$sku) {
                    $sku['product_sku_id'] = 0;
                }
            }
            //初始化销量等数据
            $data['sales_initial'] = 0;
        }
        //是否需要审核
        $add_audit = Setting::getItem('store')['add_audit'];
        if ($add_audit == 0) {
            // 如果不需要审核，则审核状态是已审核
            $data['audit_status'] = 10;
        }
        $model = new ProductModel;
        if (isset($data['product_id'])) {
            unset($data['product_id']);
        }

        $data['shop_supplier_id'] = $this->getSupplierId();
        if ($model->add($data)) {
            return $this->renderSuccess('添加成功');
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    /**
     * 获取基础数据
     */
    public function getBaseData()
    {
        return $this->renderSuccess('', array_merge(ProductService::getEditData(null, 'add', $this->getSupplierId()), []));
    }

    /**
     * 获取编辑数据
     */
    public function getEditData($product_id, $scene = 'edit')
    {
        $model = ProductModel::detail($product_id);
        return $this->renderSuccess('', array_merge(ProductService::getEditData($model, $scene, $this->getSupplierId()), compact('model')));
    }

    /**
     * 商品编辑
     */
    public function edit($product_id, $scene = 'edit')
    {
        if ($this->request->isGet()) {
            $model = ProductModel::detail($product_id);
            return $this->renderSuccess('', array_merge(ProductService::getEditData($model, $scene, $this->getSupplierId()), compact('model')));
        }
        if ($scene == 'copy') {
            return $this->add($scene);
        }
        // 商品详情
        $model = ProductModel::detail($product_id);
        // 更新记录
        if ($model->edit(json_decode($this->postData()['params'], true), $this->getSupplierId())) {
            return $this->renderSuccess('更新成功');
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }

    /**
     * 修改商品状态
     */
    public function state($product_id, $state)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if ($model['audit_status'] != 10) {
            return $this->renderError('商品状态不正确');
        }
        if (!$model->setStatus($state)) {
            return $this->renderError('操作失败');
        }
        return $this->renderSuccess('操作成功');
    }

    /**
     * 删除商品
     */
    public function delete($product_id)
    {
        // 商品详情
        $model = ProductModel::detail($product_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}
