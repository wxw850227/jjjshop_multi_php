<?php

namespace app\api\model\user;

use app\common\model\user\Visit as VisitModel;
/**
 * 访问记录
 */
class Visit extends VisitModel
{
    /**
     * 访问记录
     */
    public function addVisit($user, $supplier,$visitcode, $product = null){
        $data = [
            'user_id' => $user == null?0:$user['user_id'],
            'shop_supplier_id' => $supplier['shop_supplier_id'],
            'product_id' => $product == null?0:$product['product_id'],
            'visitcode' => $visitcode,
            'app_id' => self::$app_id
        ];
        if($product == null){
            //访问店铺
            $data['content'] = '访问店铺首页';
        }else{
            $data['content'] = '访问商品详情页，' . $product['product_name'];
        }
        return $this->save($data);
    }
}
