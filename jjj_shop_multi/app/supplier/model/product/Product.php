<?php

namespace app\supplier\model\product;

use app\common\exception\BaseException;
use app\common\library\helper;
use app\common\model\product\Product as ProductModel;
use app\common\model\settings\Setting;
use app\supplier\model\supplier\Supplier as SupplierModel;

/**
 * 商品模型
 */
class Product extends ProductModel
{
    /**
     * 获取器：预告开启购买时间
     */
    public function getPreviewTimeAttr($value)
    {
        return $value ? date('Y-m-d H:i:s', $value) : '';
    }

    /**
     * 添加商品
     */
    public function add(array $data)
    {
        $supplier = SupplierModel::detail($data['shop_supplier_id']);
        if (!isset($data['image']) || empty($data['image'])) {
            $this->error = '请上传商品图片';
            return false;
        }
        $data['content'] = isset($data['content']) ? $data['content'] : '';
        $data['app_id'] = $data['sku']['app_id'] = self::$app_id;

        $this->processContent($data);
        // 开启事务
        $this->startTrans();
        try {
            // 添加商品
            $this->save($data);
            // 商品规格
            $this->addProductSpec($data, false);
            // 商品图片
            $this->addProductImages($data['image'], $data['shop_supplier_id']);
            // 商品详情图片
            if ($data['is_picture'] == 1) {
                $this->addProductContentImages($data['contentImage']);
            }
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    /**
     * 添加商品图片
     */
    private function addProductImages($images, $shop_supplier_id)
    {
        $this->image()->delete();
        $data = array_map(function ($images) use ($shop_supplier_id) {
            isset($images['file_id']) && $image_id = $images['file_id'];
            isset($images['image_id']) && $image_id = $images['image_id'];
            if (!isset($images['file_id']) && !isset($images['image_id'])) {
                $image_id = $images['file_path'];
            }
            return [
                'image_id' => $image_id,
                'app_id' => self::$app_id
            ];
        }, $images);
        return $this->image()->saveAll($data);
    }

    /**
     * 添加商品详情图片
     */
    private function addProductContentImages($images)
    {
        $this->contentImage()->delete();
        $data = array_map(function ($images) {
            return [
                'image_id' => isset($images['file_id']) ? $images['file_id'] : $images['image_id'],
                'image_type' => 1,
                'app_id' => self::$app_id
            ];
        }, $images);
        return $this->contentImage()->saveAll($data);
    }

    /**
     * 编辑商品
     */
    public function edit($data, $shop_supplier_id)
    {
        if (!isset($data['image']) || empty($data['image'])) {
            $this->error = '请上传商品图片';
            return false;
        }
        $data['spec_type'] = isset($data['spec_type']) ? $data['spec_type'] : $this['spec_type'];
        $data['content'] = isset($data['content']) ? $data['content'] : '';
        $data['app_id'] = $data['sku']['app_id'] = self::$app_id;
        $productSkuIdList = helper::getArrayColumn(($this['sku']), 'product_sku_id');
        return $this->transaction(function () use ($data, $productSkuIdList) {
            // 商品状态，如果已审核过的，看平台配置是否需要再次审核
            $edit_audit = Setting::getItem('store')['edit_audit'];
            if ($edit_audit && $data['audit_status'] == 0) {
                $data['audit_status'] = 0;
            }
            // 保存商品
            $this->save($data);
            // 商品规格
            $this->addProductSpec($data, true, $productSkuIdList);
            // 商品图片
            $this->addProductImages($data['image'], $this['shop_supplier_id']);
            // 商品详情图片
            if ($data['is_picture'] == 1) {
                $this->addProductContentImages($data['contentImage']);
            }
            return true;
        });
    }

    /**
     * 添加商品规格
     */
    private function addProductSpec($data, $isUpdate, $productSkuIdList = [])
    {
        // 更新模式: 先删除所有规格
        $model = new ProductSku;
        $isUpdate && $model->removeAll($this['product_id']);
        $stock = 0;//总库存
        $product_price = 0;
        $line_price = 0;
        // 商城设置
        $settings = Setting::getItem('store');
        // 添加规格数据
        if ($data['spec_type'] == '10') {
            // 删除多规格遗留数据
            $isUpdate && $model->removeSkuBySpec($this['product_id']);
            // 单规格
            $this->sku()->save($data['sku']);
            $stock = $data['sku']['stock_num'];
            $product_price = $data['sku']['product_price'];
            $line_price = $data['sku']['line_price'];
        } else if ($data['spec_type'] == '20') {
            if (count($data['spec_many']['spec_list']) <= 0 || count($data['spec_many']['spec_attr']) <= 0) {
                throw new BaseException(['msg' => '请添加规格']);
            }
            // 添加商品与规格关系记录
            $model->addProductSpecRel($this['product_id'], $data['spec_many']['spec_attr']);
            // 添加商品sku
            $model->addSkuList($this['product_id'], $data['spec_many']['spec_list'], $productSkuIdList);
            $product_price = $data['spec_many']['spec_list'][0]['spec_form']['product_price'];
            foreach ($data['spec_many']['spec_list'] as &$item) {
                $stock += $item['spec_form']['stock_num'];
                if ($item['spec_form']['product_price'] < $product_price) {
                    $product_price = $item['spec_form']['product_price'];
                }
                if ($item['spec_form']['line_price'] < $line_price) {
                    $line_price = $item['spec_form']['line_price'];
                }
            }
        }
        $save_data = [
            'product_stock' => $stock,
            'product_price' => $product_price,
            'line_price' => $line_price
        ];
        $this->save($save_data);
    }

    /**
     * 修改商品状态
     */
    public function setStatus($state)
    {
        return $this->save(['product_status' => $state]) !== false;
    }

    /**
     * 软删除
     */
    public function setDelete()
    {
        //  回收站，和未审核通过的直接删
        if ($this['product_status']['value'] == 30 || $this['audit_status'] != 10) {
            return $this->save(['is_delete' => 1]);
        } else {
            return $this->save(['product_status' => 30]);
        }
    }

    /**
     * 获取当前商品总数
     */
    public function getProductTotal($where = [])
    {
        return $this->where('is_delete', '=', 0)->where($where)->count();
    }

    /**
     * 获取商品告急数量总数
     */
    public function getProductStockTotal($shop_supplier_id)
    {
        return $this->where('is_delete', '=', 0)->where('product_stock', '<', 10)
            ->where('shop_supplier_id', '=', $shop_supplier_id)
            ->count();
    }

    /**
     * 处理内容
     */
    private function processContent(&$data)
    {
        $pattern = "/src=[\"\'](.*?)[\"\']/is";
        preg_match_all($pattern, $data['content'], $match);
    }

    /**
     * 组件列表
     */
    public function getProductList($shop_supplier_id, $params)
    {
        $model = $this;
        if (isset($params['search']) && $params['search']) {
            $model = $model->where('product_name', 'like', '%' . $params['search'] . '%');
        }
        return $model->with(['image.file'])->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('audit_status', '=', 10)
            ->where('product_status', '=', 10)
            ->where('is_delete', '=', 0)
            ->paginate($params);
    }

    /**
     * 获取数量
     */
    public function getCount($type, $shop_supplier_id)
    {
        $model = $this;
        $model = $this->buildProductType($model, $type);
        if ($shop_supplier_id != 0) {
            $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        }
        return $model->where('is_delete', '=', 0)
            ->count();
    }

    /**
     * 查询指定商品
     * @param $value
     */
    public function getProduct($value)
    {
        return $this->where('product_id', 'in', $value)->select();
    }

}
