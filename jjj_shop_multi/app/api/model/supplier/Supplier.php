<?php

namespace app\api\model\supplier;

use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\supplier\User as SupplierUserModel;
use app\api\model\user\Favorite as FavoriteModel;
use app\api\model\product\Product as ProductModel;

/**
 * 供应商模型类
 */
class Supplier extends SupplierModel
{

    public function getUserName($user_name)
    {
        return $this->where('user_name', '=', $user_name)->count();
    }

    //获取店铺信息
    public function getDetail($data, $user)
    {
        $detail = $this->alias('s')->where(['shop_supplier_id' => $data['shop_supplier_id']])
            ->field("name as store_name,shop_supplier_id,logo_id,category_id,server_score,fav_count,user_id,product_sales")
            ->with(['logo', 'category'])
            ->find();
        if ($detail) {
            $detail['logos'] = isset($detail['logo']['file_path']) ? $detail['logo']['file_path'] : '';
            $detail['category_name'] = $detail['category']['name'];
            unset($detail['logo']);
            unset($detail['category']);
            $detail['isfollow'] = 0;
            $detail['supplier_user_id'] = (new SupplierUserModel())->where('shop_supplier_id', '=', $detail['shop_supplier_id'])->value('supplier_user_id');
            if ($user) {
                $detail['isfollow'] = (new FavoriteModel)
                    ->where('pid', '=', $data['shop_supplier_id'])
                    ->where('user_id', '=', $user['user_id'])
                    ->where('type', '=', 10)
                    ->count();
            }
        }
        return $detail;
    }

    //获取微店账号信息
    public function getAccount($shop_supplier_id, $field = "*")
    {
        $detail = $this->where(['shop_supplier_id' => $shop_supplier_id])->field("$field")->find();
        return $detail;
    }

    //店铺列表
    public function supplierList($param)
    {
        // 排序规则
        $sort = [];
        if ($param['sortType'] === 'all') {
            $sort = ['s.create_time' => 'desc'];
        } else if ($param['sortType'] === 'sales') {
            $sort = ['product_sales' => 'desc'];
        } else if ($param['sortType'] === 'score') {
            $sort = ['server_score' => 'desc'];
        }

        $model = $this;
        if (isset($param['name']) && $param['name']) {
            $model = $model->where('name', 'like', '%' . $param['name'] . '%');
        }
        // 查询列表数据
        $list = $model->alias('s')->with(['logo', 'category'])
            ->where('s.is_delete', '=', '0')
            ->where('s.is_recycle', '=', 0)
            ->where('s.status', '=', 0)
            ->field("s.shop_supplier_id,s.name,s.fav_count,logo_id,category_id,server_score,product_sales")
            ->order($sort)
            ->paginate($param);
        $product_model = new ProductModel();
        foreach ($list as $key => &$v) {
            $productList = $product_model->with(['image.file'])
                ->where([
                    'shop_supplier_id' => $v['shop_supplier_id'],
                    'product_status' => 10,
                    'audit_status' => 10,
                    'is_delete' => 0
                ])
                ->order('product_sort asc,product_id desc')
                ->limit(3)
                ->field('product_id,product_price,product_name,sales_initial,sales_actual,line_price')
                ->select();
            $v['productList'] = $productList;
            $v['logos'] = $v['logo'] ? $v['logo']['file_path'] : '';
            $v['category_name'] = $v['category']['name'];
            unset($v['logo']);
            unset($v['category']);
        }
        return $list;
    }
}
