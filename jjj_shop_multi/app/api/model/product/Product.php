<?php

namespace app\api\model\product;

use app\common\exception\BaseException;
use app\common\model\product\Product as ProductModel;
use app\common\service\product\BaseProductService;
use app\common\library\helper;
use app\api\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\User as SupplierUserModel;
use app\api\model\settings\Setting;

/**
 * 商品模型
 */
class Product extends ProductModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'spec_rel',
        'delivery',
        'sales_initial',
        'sales_actual',
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 商品详情：HTML实体转换回普通字符
     */
    public function getContentAttr($value)
    {
        return htmlspecialchars_decode($value);
    }

    /**
     * 获取商品列表
     */
    public function getList($param, $userInfo = false)
    {
        // 获取商品列表
        $data = (new ProductModel())->getList($param);

        // 隐藏api属性
        !$data->isEmpty() && $data->hidden(['category', 'content', 'image', 'sku']);
        // 整理列表数据并返回
        return $this->setProductListDataFromApi($data, true, ['userInfo' => $userInfo]);
    }

    /**
     * 商品详情
     */
    public static function detail($product_id)
    {
        // 商品详情
        $detail = parent::detail($product_id);
        // 多规格商品sku信息
        $detail['product_multi_spec'] = BaseProductService::getSpecData($detail);
        return $detail;
    }

    /**
     * 获取商品详情页面
     */
    public function getDetails($productId, $userInfo = false)
    {
        // 获取商品详情
        $detail = $this->with([
            'category',
            'image' => ['file'],
            'contentImage' => ['file'],
            'sku' => ['image'],
            'spec_rel' => ['spec'],
            'delivery' => ['rule'],
            'commentData' => function ($query) {
                $query->with('user')->where(['is_delete' => 0, 'status' => 1])->limit(2);
            },
            'video',
            'poster'
        ])->withCount(['commentData' => function ($query) {
            $query->where(['is_delete' => 0, 'status' => 1]);
        }])
            ->where('product_id', '=', $productId)
            ->find();
        // 判断商品的状态
        if (empty($detail) || $detail['is_delete'] || $detail['product_status']['value'] != 10) {
            $this->error = '很抱歉，商品信息不存在或已下架';
            return false;
        }

        $SupplierModel = new SupplierModel;
        if ($detail['shop_supplier_id']) {
            $supplier = $SupplierModel::detail($detail['shop_supplier_id'], ['logo', 'category']);
            $supplier['logos'] = $supplier['logo'] ? $supplier['logo']['file_path'] : '';
            unset($supplier['logo']);
            $supplier['category_name'] = $supplier['category']['name'];
            unset($supplier['category']);
            $supplier['supplier_user_id'] = (new SupplierUserModel())->where('shop_supplier_id', '=', $detail['shop_supplier_id'])->value('supplier_user_id');
            $supplier->visible(['logos', 'category_name', 'name', 'shop_supplier_id', 'product_sales', 'server_score', 'store_type', 'user_id', 'supplier_user_id']);
        } else {
            $supplier = [];
            $server = [];
        }
        $detail['supplier'] = $supplier;
        // 更新访问数据
        $this->where('product_id', '=', $detail['product_id'])->inc('view_times')->update();
        // 设置商品展示的数据
        $detail = $this->setProductListDataFromApi($detail, false, ['userInfo' => $userInfo]);
        // 多规格商品sku信息
        $detail['product_multi_spec'] = BaseProductService::getSpecData($detail);
        return $detail;
    }

    /**
     * 根据商品id集获取商品列表
     */
    public function getListByIdsFromApi($productIds, $userInfo = false)
    {
        // 获取商品列表
        $data = (new ProductModel())->getListByIds($productIds, 10);
        // 整理列表数据并返回
        return $this->setProductListDataFromApi($data, true, ['userInfo' => $userInfo]);
    }

    /**
     * 根据商品id集获取商品列表
     */
    public function getListByCatIdsFromApi($categoryIds, $userInfo = false, $shop_supplier_id = 0)
    {
        $category_ids = [];
        // 查找1级分类下的二级分类
        if (!empty($categoryIds['first'])) {
            $categorys = (new Category())->where('parent_id', 'in', $categoryIds['first'])->select();
            foreach ($categorys as $item) {
                array_push($category_ids, $item['category_id']);
            }
        }
        foreach ($categoryIds['second'] as $item) {
            array_push($category_ids, $item);
        }
        // 获取商品列表
        $data = parent::getListByCatIds($category_ids, 10, $shop_supplier_id);
        // 整理列表数据并返回
        return $this->setProductListDataFromApi($data, true, ['userInfo' => $userInfo]);
    }

    /**
     * 设置商品展示的数据 api模块
     */
    private function setProductListDataFromApi(&$data, $isMultiple, $param)
    {
        return parent::setProductListData($data, $isMultiple, function ($product) use ($param) {
            // 计算并设置商品会员价
            $this->setProductGradeMoney($param['userInfo'], $product);
        });
    }

    /**
     * 设置商品的会员价
     */
    public function setProductGradeMoney($user, &$product)
    {
        //获取商品最大价格
        $productPrice = helper::getArrayColumn($product['sku'], 'product_price');
        rsort($productPrice);
        $product['product_max_price'] = isset($productPrice[0]) ? $productPrice[0] : 0;
        // 会员等级状态
        $gradeStatus = (!empty($user) && $user['grade_id'] > 0 && !empty($user['grade']))
            && (!$user['grade']['is_delete']);
        // 判断商品是否参与会员折扣
        if (!$gradeStatus || !$product['is_enable_grade']) {
            $product['is_user_grade'] = false;
            return;
        }
        $alone_grade_type = 10;
        // 商品单独设置了会员折扣
        if ($product['is_alone_grade'] && isset($product['alone_grade_equity'][$user['grade_id']])) {
            if ($product['alone_grade_type'] == 10) {
                // 折扣比例
                $discountRatio = helper::bcdiv($product['alone_grade_equity'][$user['grade_id']], 100);
            } else {
                $alone_grade_type = 20;
                $discountRatio = helper::bcdiv($product['alone_grade_equity'][$user['grade_id']], $product['product_price'], 2);
            }
        } else {
            // 折扣比例
            $discountRatio = helper::bcdiv($user['grade']['equity'], 100);
        }
        if ($discountRatio < 1) {
            // 标记参与会员折扣
            $product['is_user_grade'] = true;
            // 会员折扣后的商品总金额
            if ($alone_grade_type == 20) {
                $product['product_price'] = $product['alone_grade_equity'][$user['grade_id']];
            } else {
                $product['product_price'] = helper::number2(helper::bcmul($product['product_price'], $discountRatio), true);
            }

            // 会员折扣价
            foreach ($product['sku'] as &$skuItem) {
                if ($alone_grade_type == 20) {
                    $skuItem['product_price'] = $product['alone_grade_equity'][$user['grade_id']];
                } else {
                    $skuItem['product_price'] = helper::number2(helper::bcmul($skuItem['product_price'], $discountRatio), true);
                }
            }
        } else {
            $product['is_user_grade'] = false;
        }
        //获取商品最大价格
        $productPrice = helper::getArrayColumn($product['sku'], 'product_price');
        rsort($productPrice);
        $product['product_max_price'] = isset($productPrice[0]) ? $productPrice[0] : 0;
    }

    /**
     * 为你推荐
     */
    public function getRecommendProduct($params)
    {
        $model = $this;
        // 手动
        if ($params['choice'] == 1) {
            $product_id = array_column($params['product'], 'product_id');
            $model = $model->where('product_id', 'IN', $product_id);
            $list = $model->with(['category', 'image.file'])
                ->where('product_status', '=', 10)
                ->where('audit_status', '=', 10)
                ->where('is_delete', '=', 0)
                ->select();
            // 整理列表数据并返回
            return $this->setProductListData($list, true);
        } else {
            $sort = ['create_time' => 'desc'];
            if ($params['type'] == 10) {
                $sort = ['sales_actual' => 'desc'];
            } else if ($params['type'] == 30) {
                $sort = ['view_times' => 'desc'];
            }
            // 自动
            $sort = $params['type'] == 20 ? ['create_time' => 'desc'] : ['product_sales' => 'desc'];
            $list = $model->field(['*', '(sales_initial + sales_actual) as product_sales'])->with(['category', 'image.file'])
                ->where('product_status', '=', 10)
                ->where('audit_status', '=', 10)
                ->where('is_delete', '=', 0)
                ->limit($params['num'])
                ->order($sort)
                ->select();
            return $this->setProductListData($list, true);
        }
    }

    //商品上下架
    public function editStatus($data)
    {
        return $this->save(['product_status' => $data['product_status']]);
    }

    /**
     * 添加商品
     */
    public function add($data, $shop_supplier_id)
    {
        $supplier = SupplierModel::detail($shop_supplier_id);
        if ($supplier['status'] != 0) {
            $this->error = '未缴纳保证金或已退，不允许添加商品';
            return false;
        }
        $data = json_decode($data['params'], true);
        //是否需要审核
        $add_audit = Setting::getItem('store')['add_audit'];
        if ($add_audit == 0) {
            // 如果不需要审核，则审核状态是已审核
            $data['audit_status'] = 10;
        }
        $data['shop_supplier_id'] = $shop_supplier_id;
        if (!isset($data['image']) || empty($data['image'])) {
            $this->error = '请上传商品图片';
            return false;
        }
        $data['add_source'] = 20;
        $data['app_id'] = $data['sku']['app_id'] = self::$app_id;
        // 开启事务
        $this->startTrans();
        try {
            // 添加商品
            $this->save($data);
            // 商品规格
            $this->addProductSpec($data);
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
     * 编辑商品
     */
    public function edit($data, $shop_supplier_id)
    {
        $supplier = SupplierModel::detail($shop_supplier_id);
        if ($supplier['status'] != 0) {
            $this->error = '未缴纳保证金或已退，不允许修改商品';
            return false;
        }
        $data = json_decode($data['params'], true);
        if (!isset($data['image']) || empty($data['image'])) {
            $this->error = '请上传商品图片';
            return false;
        }
        $data['spec_type'] = isset($data['spec_type']) ? $data['spec_type'] : $this['spec_type'];
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
    private function addProductSpec($data, $isUpdate = false, $productSkuIdList = [])
    {
        // 更新模式: 先删除所有规格
        $model = new ProductSku;
        $isUpdate && $model->removeAll($this['product_id']);
        $stock = 0;//总库存
        $product_price = 0;
        $line_price = 0;
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
}