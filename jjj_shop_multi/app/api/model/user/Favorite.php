<?php

namespace app\api\model\user;

use app\common\model\user\Favorite as FavoriteModel;
use app\common\model\supplier\Supplier as SupplierModel;
use app\common\model\product\Product as ProductModel;
/**
 * 收藏模型类
 */
class Favorite extends FavoriteModel
{
    public function getList($where,$param){
    	if($where['type']==20){
    		return parent::getList($where,$param); 
    	}else{
    		return parent::getMySupplier($where,$param);
    	}
    }

    /**
     * 取消收藏
     */
    public function cancelFav(){
        $this->startTrans();
        try {
            // 取消店铺关注
            if($this['type'] == 10){
                (new SupplierModel())->where('shop_supplier_id', '=', $this['pid'])
                    ->dec('fav_count')->update();
            }
            $this->delete();
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }

    public function fav($data){
        $data['app_id'] = self::$app_id;
        $this->startTrans();
        try {
            // 店铺收藏
            if($data['type'] == 10){
                $data['shop_supplier_id'] = $data['pid'];
                (new SupplierModel())->where('shop_supplier_id', '=', $data['pid'])
                    ->inc('fav_count')->update();
            }else{
                $product = ProductModel::detail($data['pid']);
                $data['shop_supplier_id'] = $product['shop_supplier_id'];
            }
            $this->save($data);
            // 事务提交
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }
    public static function isFollow($pid,$user_id,$type){
        
        return (new static())->where('pid', '=', $pid)
                    ->where('user_id', '=', $user_id)
                    ->where('type', '=', $type)
                    ->count();
    }
}
