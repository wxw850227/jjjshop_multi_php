<?php


namespace app\common\model\user;

use app\common\model\BaseModel;
use app\api\model\product\Product as ProductModel;
use app\api\model\supplier\Category as CategoryModel;

/**
 * 收藏模型
 */
class Favorite extends BaseModel
{
    protected $pk = 'favorite_id';
    protected $name = 'user_favorite';

    //获取收藏商品列表
    public function getList($where, $param)
    {
        $list = $this->where($where)
            ->with(['product', 'image.file'])
            ->field("*")
            ->order('create_time desc')
            ->paginate($param);
        foreach ($list as &$product) {
            // 商品主图
            $product['product_image'] = $product['image'][0]['file_path'];
            $product['product_name'] = $product['product'][0]['product_name'];
            $product['product_price'] = $product['product'][0]['product_price'];
            $product['product_id'] = $product['product'][0]['product_id'];
            $product['city_name'] = $product['product'][0]['city_name'];
            $product['line_price'] = $product['product'][0]['line_price'];
            $product['product_sales'] = $product['product'][0]['product_sales'];
            unset($product['image']);
            unset($product['product']);
        }
        return $list;
    }

    //获取关注店铺列表
    public function getMySupplier($where, $param)
    {
        $product_model = new ProductModel;
        $list = $this->alias('f')
            ->with(['supplier', 'supplier.logo'])
            ->join('supplier s', 's.shop_supplier_id=f.shop_supplier_id')
            ->where('s.is_delete', '=', 0)
            ->where('s.is_recycle', '=', 0)
            ->where('f.user_id', '=', $where['user_id'])
            ->where('f.type', '=', $where['type'])
            ->field("f.*")
            ->order('f.create_time desc')
            ->paginate($param);
        foreach ($list as $key => &$value) {
            $value['store_name'] = $value['supplier']['name'];
            $value['shop_supplier_id'] = $value['supplier']['shop_supplier_id'];
            $value['logo'] = $value['supplier']['logo']==null?'':$value['supplier']['logo']['file_path'];
            $value['score'] = $value['supplier']['server_score'];
            $value['fav_count'] = $value['supplier']['fav_count'];
            $value['product_sales'] = $value['supplier']['product_sales'];
            $value['categoryName'] = $value['supplier']['category_id'] ? (new CategoryModel())->where('category_id', '=', $value['supplier']['category_id'])->value('name') : '';
            unset($value['supplier']);
            //获取最新上架商品
            $productList = $product_model->with(['image.file'])->where(['product_status' => 10, 'shop_supplier_id' => $value['shop_supplier_id'], 'audit_status' => 10, 'is_delete' => 0])->field("product_name,product_id,sales_initial,sales_actual,product_price,line_price")->order('product_id desc')->limit(3)->select();
            foreach ($productList as $kk => &$vv) {
                $vv['logo'] = $vv['image'][0]['file_path'];
                unset($vv['image']);
            }
            $value['productList'] = $productList;
        }
        return $list;
    }

    /**
     * 关联商品图片表
     */
    public function image()
    {
        return $this->hasMany('app\\common\\model\\product\\ProductImage', 'product_id', 'pid')->order(['id' => 'asc']);
    }

    /**
     * 关联商品表
     */
    public function product()
    {
        return $this->hasMany('app\\common\\model\\product\\Product', 'product_id', 'pid')->bind(['product_id', 'sales_actual']);
    }

    /**
     * 关联店铺
     */
    public function supplier()
    {
        return $this->hasOne('app\\common\\model\\supplier\\Supplier', 'shop_supplier_id', 'pid')->hidden(['user_id', 'password', 'total_money', 'money', 'freeze_money', 'cash_money', 'is_delete', 'app_id', 'create_time', 'update_time']);
    }

    /**
     * 关联用户
     */
    public function user()
    {
        return $this->hasOne('app\\common\\model\\user\\User', 'user_id', 'user_id')
            ->field(['user_id', 'nickName', 'mobile', 'avatarUrl', 'create_time', 'country', 'province', 'city', 'gender']);
    }

    /**
     * 根据收藏id，类型，用户查询，判断用户是否收藏
     */
    public static function detail($pid, $type, $user_id)
    {
        $where['pid'] = $pid;
        $where['type'] = $type;
        $where['user_id'] = $user_id;
        return (new static())->where($where)->find();
    }
}