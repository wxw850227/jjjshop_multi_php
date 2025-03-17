<?php

namespace app\api\model\order;

use app\api\model\order\Order as OrderModel;
use app\api\model\product\Product as ProductModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\library\helper;
use app\common\model\order\Cart as CartModel;

/**
 * 购物车管理
 */
class Cart extends CartModel
{
    // 错误信息
    public $error = '';

    /**
     * 购物车列表 (含商品信息)
     */
    public function getList($user, $cart_ids = [])
    {
        // 获取购物车商品列表
        return $this->getOrderProductList($user, $cart_ids);
    }

    /**
     * 获取购物车中的商品列表
     */
    public function getOrderProductList($user, $cart_ids = [])
    {
        // 购物车商品列表
        $productList = [];
        // 获取购物车列表
        $model = $this;
        if ($cart_ids) {
            $model = $model->where('cart_id', 'in', explode(',', $cart_ids));
        }
        $cartList = $model->where('user_id', '=', $user['user_id'])->select();
        if (empty($cartList)) {
            $this->setError('当前购物车没有商品');
            return $productList;
        }
        // 购物车中所有商品id集
        $productIds = array_unique(helper::getArrayColumn($cartList, 'product_id'));
        // 获取并格式化商品数据
        $sourceData = (new ProductModel)->getListByIds($productIds, null);
        $sourceData = helper::arrayColumn2Key($sourceData, 'product_id');
        // 供应商信息
        $supplierData = [];
        // 格式化购物车数据列表
        foreach ($cartList as $key => $item) {
            // 判断商品不存在则自动删除
            if (!isset($sourceData[$item['product_id']])) {
                $this->delete($key);
                continue;
            }
            // 商品信息
            $product = clone $sourceData[$item['product_id']];
            // 判断商品是否已删除
            if ($product['is_delete']) {
                $this->delete($key);
                continue;
            }
            // 商品sku信息
            $product['product_sku'] = ProductModel::getProductSku($product, $item['spec_sku_id']);
            $product['spec_sku_id'] = $item['spec_sku_id'];
            // 商品sku不存在则自动删除
            if (empty($product['product_sku'])) {
                $this->delete($key);
                continue;
            }
            // 商品单价
            $product['product_price'] = $product['product_sku']['product_price'];
            // 购买数量
            $product['total_num'] = $item['total_num'];
            // 商品总价
            $product['total_price'] = bcmul($product['product_price'], $item['total_num'], 2);
            // 供应商
            $product['shop_supplier_id'] = $item['shop_supplier_id'];
            $product['supplier_price'] = bcmul($product['supplier_price'], $item['total_num'], 2);
            //购物车id
            $product['cart_id'] = $item['cart_id'];
            $productList[] = $product->hidden(['category', 'content', 'image']);
        }

        $supplierIds = array_unique(helper::getArrayColumn($productList, 'shop_supplier_id'));
        foreach ($supplierIds as $supplierId) {
            $supplierData[] = [
                'shop_supplier_id' => $supplierId,
                'supplier' => SupplierModel::detail($supplierId),
                'productList' => $this->getProductBySupplier($supplierId, $productList)
            ];
        }
        return $supplierData;
    }

    private function getProductBySupplier($supplierId, $productList)
    {
        $result = [];
        foreach ($productList as $product) {
            if ($product['shop_supplier_id'] == $supplierId) {
                array_push($result, $product);
            }
        }
        return $result;
    }

    /**
     * 加入购物车
     */
    public function add($user, $productId, $productNum, $spec_sku_id)
    {
        if ($productNum <= 0) {
            $this->error = "商品购买数量不能小于1";
            return false;
        }
        // 获取商品购物车信息
        $cartDetail = $this->where('user_id', '=', $user['user_id'])
            ->where('product_id', '=', $productId)
            ->where('spec_sku_id', '=', $spec_sku_id)
            ->find();
        $cartProductNum = $cartDetail ? $cartDetail['total_num'] + $productNum : $productNum;
        // 获取商品信息
        $product = ProductModel::detail($productId);
        // 验证商品能否加入
        if (!$product_price = $this->checkProduct($user, $product, $spec_sku_id, $cartProductNum)) {
            return false;
        }
        // 记录到购物车列表
        if ($cartDetail) {
            return $cartDetail->save(['total_num' => $cartDetail['total_num'] + $productNum]);
        } else {
            return $this->save([
                'user_id' => $user['user_id'],
                'product_id' => $productId,
                'spec_sku_id' => $spec_sku_id,
                'total_num' => $productNum,
                'join_price' => $product_price,
                'shop_supplier_id' => $product['shop_supplier_id'],
                'app_id' => self::$app_id,
            ]);
        }
    }

    /**
     * 验证商品是否可以购买
     */
    private function checkProduct($user, $product, $spec_sku_id, $cartProductNum)
    {
        // 判断商品是否下架
        if (!$product || $product['is_delete'] || $product['product_status']['value'] != 10) {
            $this->setError('很抱歉，商品信息不存在或已下架');
            return false;
        }
        // 商品sku信息
        $product['product_sku'] = ProductModel::getProductSku($product, $spec_sku_id);
        // 判断商品库存
        if ($cartProductNum > $product['product_sku']['stock_num']) {
            $this->setError('很抱歉，商品库存不足');
            return false;
        }
        // 是否是会员商品
        if (count($product['grade_ids']) > 0 && $product['grade_ids'][0] != '') {
            if (!in_array($user['grade_id'], $product['grade_ids'])) {
                $this->setError('很抱歉，此商品仅特定会员可购买');
                return false;
            }
        }
        // 是否超过最大购买数
        if ($product['limit_num'] > 0) {
            $hasNum = OrderModel::getHasBuyOrderNum($user['user_id'], $product['product_id']);
            if ($hasNum + $product['total_num'] > $product['limit_num']) {
                $this->error = "很抱歉，购买超过此商品最大限购数量";
                return false;
            }
        }
        return $product['product_sku']['product_price'];
    }

    /**
     * 减少购物车中某商品数量
     */
    public function sub($user, $productId, $spec_sku_id)
    {
        $cartDetail = $this->where('user_id', '=', $user['user_id'])
            ->where('product_id', '=', $productId)
            ->where('spec_sku_id', '=', $spec_sku_id)
            ->find();
        if ($cartDetail['total_num'] <= 1) {
            return $cartDetail->delete();
        } else {
            $cartDetail->save(['total_num' => $cartDetail['total_num'] - 1]);
        }
    }

    /**
     * 删除购物车中指定商品
     * @param string $cartIds (支持字符串ID集)
     */
    public function setDelete($user, $cart_id)
    {
        return $this->where('user_id', '=', $user['user_id'])->where('cart_id', 'in', explode(',', $cart_id))->delete();
    }

    /**
     * 获取当前用户购物车商品总数量(含件数)
     */
    public function getTotalNum($user)
    {
        $num = $this->where('user_id', '=', $user['user_id'])->sum('total_num');
        return $num ? $num : 0;
    }

    /**
     * 获取当前用户购物车商品总数量(不含件数)
     */
    public function getProductNum($user)
    {
        return $this->where('user_id', '=', $user['user_id'])->count();
    }

    /**
     * 清空当前用户购物车
     */
    public function clearAll($user, $cartIds)
    {
        return $this->where('user_id', '=', $user['user_id'])
            ->where('cart_id', 'in', explode(',', $cartIds))
            ->delete();
    }

    /**
     * 设置错误信息
     */
    private function setError($error)
    {
        empty($this->error) && $this->error = $error;
    }

    /**
     * 获取错误信息
     */
    public function getError()
    {
        return $this->error;
    }

}