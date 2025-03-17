<?php

namespace app\api\model\product;

use app\common\exception\BaseException;
use app\common\model\product\ProductSku as ProductSkuModel;
use app\common\model\product\ProductSpecRel;

/**
 * 商品sku模型
 */
class ProductSku extends ProductSkuModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 批量添加商品sku记录
     */
    public function addSkuList($product_id, $spec_list, $productSkuIdList)
    {
        //获取分成类型
        $updateData = [];
        $saveData = [];
        foreach ($spec_list as &$item) {
            if (!isset($item['spec_form']['product_no']) || !$item['spec_form']['product_no']) {
                throw new BaseException(['msg' => '请输入产品编码']);
            }
            if (!isset($item['spec_form']['product_price']) || !$item['spec_form']['product_price']) {
                throw new BaseException(['msg' => '请输入价格']);
            }
            if (!isset($item['spec_form']['line_price']) || !$item['spec_form']['line_price']) {
                throw new BaseException(['msg' => '请输入划线价']);
            }
            if (!isset($item['spec_form']['stock_num']) || !$item['spec_form']['stock_num']) {
                throw new BaseException(['msg' => '请输入库存']);
            }
            if (!isset($item['spec_form']['product_weight']) || !$item['spec_form']['product_weight']) {
                throw new BaseException(['msg' => '请输入产品重量']);
            }
            // 填充销售价
            $item['spec_form']['supplier_price'] = $item['spec_form']['product_price'];
            $data = array_merge($item['spec_form'], [
                'spec_sku_id' => $item['spec_sku_id'],
                'product_id' => $product_id,
                'app_id' => self::$app_id,
            ]);
            if ($item['product_sku_id'] > 0) {
                $index = 0;
                foreach ($productSkuIdList as $skuId) {
                    if ($skuId == $item['product_sku_id']) {
                        array_splice($productSkuIdList, $index, 1);
                        break;
                    }
                    $index++;
                }
                $updateData[] = [
                    'data' => $data,
                    'where' => [
                        'product_sku_id' => $item['product_sku_id'],
                    ],
                ];
            } else {
                $saveData[] = $data;
            }
        }
        count($updateData) > 0 && $this->updateAll($updateData);
        count($saveData) > 0 && $this->saveAll($saveData);
        count($productSkuIdList) > 0 && $this->where('product_sku_id', 'in', $productSkuIdList)->delete();
    }

    /**
     * 添加商品规格关系记录
     */
    public function addProductSpecRel($product_id, $spec_attr)
    {
        $data = [];
        $model = new ProductSpecRel;

        array_map(function ($val) use (&$data, $product_id, $model) {
            array_map(function ($item) use (&$val, &$data, $product_id, $model) {
                $detail = $model->where('product_id', '=', $product_id)
                    ->where('spec_id', '=', $val['group_id'])
                    ->where('spec_value_id', '=', $item['item_id'])->find();
                if (!$detail) {
                    $data[] = [
                        'product_id' => $product_id,
                        'spec_id' => $val['group_id'],
                        'spec_value_id' => $item['item_id'],
                        'app_id' => self::$app_id,
                    ];
                }
            }, $val['spec_items']);
        }, $spec_attr);

        count($data) > 0 && $model->saveAll($data);
    }

    /**
     * 移除指定商品的所有sku
     */
    public function removeAll($product_id)
    {
        $model = new ProductSpecRel;
        return $model->where('product_id', '=', $product_id)->delete();
    }

    /**
     * 移除指定商品的所有sku
     */
    public function removeSkuBySpec($product_id)
    {
        $model = new self;
        return $model->where('product_id', '=', $product_id)
            ->where('spec_sku_id', '<>', 0)
            ->delete();
    }

}