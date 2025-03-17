<?php

namespace app\common\model\product;

use app\api\model\supplier\Supplier as SupplierModel;
use app\common\library\helper;
use app\common\model\BaseModel;
use think\facade\Db;

/**
 * 商品模型
 */
class Product extends BaseModel
{
    protected $name = 'product';
    protected $pk = 'product_id';
    protected $append = ['product_sales'];

    /**
     * 计算显示销量 (初始销量 + 实际销量)
     */
    public function getProductSalesAttr($value, $data)
    {
        return $data['sales_initial'] + $data['sales_actual'];
    }

    /**
     * 获取器：单独设置折扣的配置
     */
    public function getAloneGradeEquityAttr($json)
    {
        return $json ? json_decode($json, true) : '';
    }

    /**
     * 修改器：单独设置折扣的配置
     */
    public function setAloneGradeEquityAttr($data)
    {
        return json_encode($data);
    }

    /**
     * 修改器：预告开启购买时间
     */
    public function setPreviewTimeAttr($value)
    {
        return $value ? strtotime($value) : 0;
    }

    /**
     * 关联商品分类表
     */
    public function category()
    {
        return $this->belongsTo('app\\common\\model\\product\\Category');
    }

    /**
     * 关联商品规格表
     */
    public function sku()
    {
        return $this->hasMany('ProductSku')->order(['product_sku_id' => 'asc']);
    }

    /**
     * 关联商品规格关系表
     */
    public function specRel()
    {
        return $this->hasMany('ProductSpecRel')->order(['id' => 'asc']);
    }

    /**
     * 关联商品图片表
     */
    public function image()
    {
        return $this->hasMany('app\\common\\model\\product\\ProductImage')->where('image_type', '=', 0)->order(['id' => 'asc']);
    }

    /**
     * 关联商品详情图片表
     */
    public function contentImage()
    {
        return $this->hasMany('app\\common\\model\\product\\ProductImage')->where('image_type', '=', 1)->order(['id' => 'asc']);
    }

    /**
     * 关联运费模板表
     */
    public function delivery()
    {
        return $this->BelongsTo('app\\common\\model\\settings\\Delivery');
    }

    /**
     * 关联订单评价表
     */
    public function commentData()
    {
        return $this->hasMany('app\\common\\model\\product\\Comment', 'product_id', 'product_id');
    }

    /**
     * 关联供应商表
     */
    public function supplier()
    {
        return $this->belongsTo('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'shop_supplier_id')
            ->field(['shop_supplier_id', 'name', 'address', 'logo_id']);
    }

    /**
     * 关联视频
     */
    public function video()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'video_id');
    }

    /**
     * 关联视频封面
     */
    public function poster()
    {
        return $this->hasOne('app\\common\\model\\file\\UploadFile', 'file_id', 'poster_id');
    }

    /**
     * 计费方式
     */
    public function getProductStatusAttr($value, $data)
    {
        $status = [10 => '已上架', 20 => '仓库中', 30 => '回收站'];
        return ['text' => $status[$value], 'value' => $value];
    }

    /**
     * 获取商品列表
     */
    public function getList($param)
    {
        // 商品列表获取条件
        $params = array_merge([
            'type' => 'sell',         // 商品状态
            'category_id' => 0,     // 分类id
            'sortType' => 'all',    // 排序类型
            'sortPrice' => false,   // 价格排序 高低
            'list_rows' => 15,       // 每页数量
            'audit_status' => -1,    //审核状态
        ], $param);

        // 筛选条件
        $filter = [];
        $model = $this;
        if ($params['category_id'] > 0) {
            $arr = Category::getSubCategoryId($params['category_id']);
            $model = $model->where('product.category_id', 'IN', $arr);
        }
        if (!empty($params['product_name'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['product_name']) . '%');
        }
        if (!empty($params['search'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['search']) . '%');
        }
        if ($params['audit_status'] > -1) {
            $model = $model->where('audit_status', '=', $params['audit_status']);
        }
        // 排序规则
        $sort = [];
        if ($params['sortType'] === 'all') {
            $sort = ['product_sort', 'product_id' => 'desc'];
        } else if ($params['sortType'] === 'sales') {
            $sort = ['product_sales' => 'desc'];
        } else if ($params['sortType'] === 'price') {
            $sort = $params['sortPrice'] ? ['product_max_price' => 'desc'] : ['product_min_price'];
        }
        if (isset($params['type'])) {
            $model = $this->buildProductType($model, $params['type']);
        }
        if (isset($params['shop_supplier_id']) && $params['shop_supplier_id']) {
            $model = $model->where('product.shop_supplier_id', '=', $params['shop_supplier_id']);
        }
        if (isset($params['product_id']) && $params['product_id']) {
            $model = $model->whereNotIn('product_id', $params['product_id']);
        }
        // 多规格商品 最高价与最低价
        $ProductSku = new ProductSku;
        $minPriceSql = $ProductSku->field(['MIN(product_price)'])
            ->where('product_id', 'EXP', "= `product`.`product_id`")->buildSql();
        $maxPriceSql = $ProductSku->field(['MAX(product_price)'])
            ->where('product_id', 'EXP', "= `product`.`product_id`")->buildSql();
        // 执行查询

        $list = $model->alias('product')
            ->field(['product.*', '(sales_initial + sales_actual) as product_sales',
                "$minPriceSql AS product_min_price",
                "$maxPriceSql AS product_max_price"
            ])
            ->with(['category', 'image.file', 'sku', 'supplier'])
            ->join('supplier supplier', 'product.shop_supplier_id = supplier.shop_supplier_id', 'left')
            ->where('product.is_delete', '=', 0)
            ->where('supplier.is_delete', '=', 0)
            ->where('supplier.status', '=', 0)
            ->where('supplier.is_recycle', '=', 0)
            ->where($filter)
            ->order($sort)
            ->paginate($params);
        // 整理列表数据并返回
        return $this->setProductListData($list, true);
    }

    public function buildProductType($model, $type)
    {
        //出售中
        if ($type == 'sell') {
            $model = $model->where('product_status', '=', 10);
            $model = $model->where('audit_status', '=', 10);
        }
        //仓库中
        if ($type == 'lower') {
            $model = $model->where('product_status', '=', 20);
            $model = $model->where('audit_status', '=', 10);
        }
        //回收站
        if ($type == 'recovery') {
            $model = $model->where('product_status', '=', 30);
        }
        //待审核
        if ($type == 'audit') {
            $model = $model->where('audit_status', '=', 0);
        }
        //未通过
        if ($type == 'no_audit') {
            $model = $model->where('audit_status', '=', 20);
        }
        //库存紧张
        if ($type == 'stock') {
            $model = $model->where('product_stock', '<', 10);
            $model = $model->where('product_status', '=', 10);
            $model = $model->where('audit_status', '=', 10);
        }
        //草稿
        if ($type == 'draft') {
            $model = $model->where('audit_status', '=', 40);
        }
        //预告商品
        if ($type == 'preview') {
            $model = $model->where('product_status', '=', 10)
                ->where('audit_status', '=', 10)
                ->where('is_preview', '=', 1)
                ->where('preview_time', '>', time());
        }
        return $model;
    }

    /**
     * 获取商品列表
     */
    public function getLists($param)
    {
        // 商品列表获取条件
        $params = array_merge([
            'product_status' => 10,         // 商品状态
            'category_id' => 0,     // 分类id
        ], $param);
        // 筛选条件
        $model = $this;
        if ($params['category_id'] > 0) {
            $arr = Category::getSubCategoryId($params['category_id']);
            $model = $model->where('category_id', 'IN', $arr);
        }
        if (!empty($params['product_name'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['product_name']) . '%');
        }
        if (!empty($params['search'])) {
            $model = $model->where('product_name', 'like', '%' . trim($params['search']) . '%');
        }
        $list = $model
            ->with(['category', 'image.file'])
            ->where('is_delete', '=', 0)
            ->where('product_status', '=', $params['product_status'])
            ->paginate($params);
        // 整理列表数据并返回
        return $this->setProductListData($list, true);
    }

    /**
     * 设置商品展示的数据
     */
    protected function setProductListData($data, $isMultiple = true, callable $callback = null)
    {
        if (!$isMultiple) $dataSource = [&$data]; else $dataSource = &$data;
        // 整理商品列表数据
        foreach ($dataSource as &$product) {
            // 商品主图
            $product['product_image'] = $product['image'][0]['file_path'];
            // 商品默认规格
            $product['product_sku'] = self::getShowSku($product);
            // 等级id转换成数组
            if (!is_array($product['grade_ids'])) {
                if ($product['grade_ids'] != '') {
                    $product['grade_ids'] = explode(',', $product['grade_ids']);
                } else {
                    $product['grade_ids'] = [];
                }
            }
            // 回调函数
            is_callable($callback) && call_user_func($callback, $product);
        }
        return $data;
    }

    /**
     * 根据商品id集获取商品列表
     */
    public function getListByIds($productIds, $status = null)
    {
        $model = $this;
        $filter = [];
        // 筛选条件
        $status > 0 && $filter['product_status'] = $status;
        if (!empty($productIds)) {
            $model = $model->orderRaw('field(product_id, ' . implode(',', $productIds) . ')');
        }
        // 获取商品列表数据
        $data = $model->with(['category', 'image.file', 'sku'])
            ->where('audit_status', '=', 10)
            ->where($filter)
            ->where('product_id', 'in', $productIds)
            ->select();

        // 整理列表数据并返回
        return $this->setProductListData($data, true);
    }

    /**
     * 根据商品id集获取商品列表
     */
    public function getListByCatIds($categoryIds, $status = null, $shop_supplier_id = 0)
    {
        $model = $this;
        $filter = [];
        // 筛选条件
        if ($status > 0) {
            $filter['product_status'] = $status;
            $filter['audit_status'] = $status;
        }
        if ($shop_supplier_id > 0) {
            $filter['p.shop_supplier_id'] = $shop_supplier_id;
        }
        // 获取商品列表数据
        $data = $model->alias('p')
            ->join('supplier s', 's.shop_supplier_id=p.shop_supplier_id')
            ->with(['category', 'image.file', 'sku'])
            ->where($filter)
            ->where('p.category_id', 'in', $categoryIds)
            ->where('s.is_delete', '=', 0)
            ->where('s.is_recycle', '=', 0)
            ->where('s.status', '=', 0)
            ->where('p.is_delete', '=', 0)
            ->field('p.*')
            ->paginate();

        // 整理列表数据并返回
        return $this->setProductListData($data, true);
    }

    /**
     * 商品多规格信息
     */
    public function getManySpecData($specRel, $skuData)
    {
        // spec_attr
        $specAttrData = [];
        foreach ($specRel as $item) {
            if (!isset($specAttrData[$item['spec_id']])) {
                $specAttrData[$item['spec_id']] = [
                    'group_id' => $item['spec']['spec_id'],
                    'group_name' => $item['spec']['spec_name'],
                    'spec_items' => [],
                ];
            }
            $spec_value = (new SpecValue())::where('spec_value_id', '=', $item['spec_value_id'])->value('spec_value');
            $specAttrData[$item['spec_id']]['spec_items'][] = [
                'item_id' => $item['spec_value_id'],
                'spec_value' => $spec_value,
            ];
        }
        // spec_list
        $specListData = [];
        foreach ($skuData as $item) {
            $image = (isset($item['image']) && !empty($item['image'])) ? $item['image'] : ['file_id' => 0, 'file_path' => ''];
            $specListData[] = [
                'product_sku_id' => $item['product_sku_id'],
                'spec_sku_id' => $item['spec_sku_id'],
                'rows' => [],
                'spec_form' => [
                    'image_id' => $image['file_id'],
                    'image_path' => $image['file_path'],
                    'product_no' => $item['product_no'],
                    'product_price' => $item['product_price'],
                    'product_weight' => $item['product_weight'],
                    'line_price' => $item['line_price'],
                    'stock_num' => $item['stock_num'],
                    'supplier_price' => $item['supplier_price'],
                ],
            ];
        }
        return ['spec_attr' => array_values($specAttrData), 'spec_list' => $specListData];
    }

    /**
     * 多规格表格数据
     */
    public function getManySpecTable(&$product)
    {
        $specData = $this->getManySpecData($product['spec_rel'], $product['sku']);
        $totalRow = count($specData['spec_list']);
        foreach ($specData['spec_list'] as $i => &$sku) {
            $rowData = [];
            $rowCount = 1;
            foreach ($specData['spec_attr'] as $attr) {
                $skuValues = $attr['spec_items'];
                $rowCount *= count($skuValues);
                $anInterBankNum = ($totalRow / $rowCount);
                $point = (($i / $anInterBankNum) % count($skuValues));
                if (0 === ($i % $anInterBankNum)) {
                    $rowData[] = [
                        'rowspan' => $anInterBankNum,
                        'item_id' => $skuValues[$point]['item_id'],
                        'spec_value' => $skuValues[$point]['spec_value']
                    ];
                }
            }
            $sku['rows'] = $rowData;
        }
        return $specData;
    }


    /**
     * 获取商品详情
     */
    public static function detail($product_id)
    {
        $model = (new static())->with([
            'category',
            'image.file',
            'sku.image',
            'spec_rel.spec',
            'supplier.logo',
            'video',
            'poster',
            'contentImage.file',
        ])->where('product_id', '=', $product_id)
            ->find();
        if (empty($model)) {
            return $model;
        }
        // 整理商品数据并返回
        return $model->setProductListData($model, false);
    }

    /**
     * 指定的商品规格信息
     */
    public static function getProductSku($product, $specSkuId)
    {
        // 获取指定的sku
        $productSku = [];
        foreach ($product['sku'] as $item) {
            if ($item['spec_sku_id'] == $specSkuId) {
                $productSku = $item;
                break;
            }
        }
        if (empty($productSku)) {
            return false;
        }
        // 多规格文字内容
        $productSku['product_attr'] = '';
        if ($product['spec_type'] == 20) {
            $specRelData = helper::arrayColumn2Key($product['spec_rel'], 'spec_value_id');
            $attrs = explode('_', $productSku['spec_sku_id']);
            foreach ($attrs as $specValueId) {
                $spec_value = (new SpecValue())::where('spec_value_id', '=', $specValueId)->value('spec_value');
                $productSku['product_attr'] .= $specRelData[$specValueId]['spec']['spec_name'] . ':'
                    . $spec_value . '; ';
            }
        }
        return $productSku;
    }

    /**
     * 根据商品名称得到相关列表
     */
    public function getWhereData($product_name)
    {
        return $this->where('product_name', 'like', '%' . trim($product_name) . '%')->select();
    }

    /**
     * 显示的sku，目前取最低价
     */
    public static function getShowSku($product)
    {
        //如果是单规格
        if ($product['spec_type'] == 10) {
            return $product['sku'][0];
        } else {
            //多规格返回最低价
            foreach ($product['sku'] as $sku) {
                if ($product['product_price'] == $sku['product_price']) {
                    return $sku;
                }
            }
        }
        // 兼容历史数据，如果找不到返回第一个
        return $product['sku'][0];
    }

    /**
     * 获取当前商品总数
     */
    public function getProductTotal($where = [])
    {
        return $this->where('is_delete', '=', 0)->where($where)->count();
    }

    /**
     * 供应商商品总销量
     */
    public function reSupplierTotalSales($shop_supplier_id)
    {
        $total = $this->where('shop_supplier_id', '=', $shop_supplier_id)
            ->sum(Db::raw('sales_initial + sales_actual'));

        return (new SupplierModel())->where('shop_supplier_id', '=', $shop_supplier_id)
            ->save([
                'product_sales' => $total
            ]);
    }
}
