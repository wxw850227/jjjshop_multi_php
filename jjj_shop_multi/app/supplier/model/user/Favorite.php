<?php

namespace app\supplier\model\user;

use app\common\model\user\Favorite as FavoriteModel;
/**
 * 收藏模型
 */
class Favorite extends FavoriteModel
{
    /**
     * 获取关注店铺的用户
     */
    public function getUserList($shop_supplier_id, $params)
    {
        $model = $this;
        if(isset($params['search']) && $params['search'] != ''){
            $model = $model->where('user.nickName|user.mobile', 'like', '%' . trim($params['search']) . '%');
        }
        return $model->alias('fav')->field(['fav.*'])->with(['user'])
            ->join('user user', 'user.user_id = fav.user_id','left')
            ->where('fav.pid', '=', $shop_supplier_id)
            ->where('fav.type', '=', 10)
            ->paginate($params);
    }

    /**
     * 获取某天的关注用户数
     */
    public function getUserTotal($day, $shop_supplier_id)
    {
        $startTime = strtotime($day);
        return $this->where('pid', '=', $shop_supplier_id)
            ->where('type', '=', 10)
            ->where('create_time', '>=', $startTime)
            ->where('create_time', '<', $startTime + 86400)
            ->count();
    }
    /**
     * 获取某天的店铺关注数
     * $endDate不传则默认当天
     */
    public function getFavData($startDate, $endDate, $type, $shop_supplier_id){
        $model = $this;
        !is_null($startDate) && $model = $model->where('create_time', '>=', strtotime($startDate));

        if(is_null($endDate)){
            !is_null($startDate) && $model = $model->where('create_time', '<', strtotime($startDate) + 86400);
        }else{
            $model = $model->where('create_time', '<', strtotime($endDate) + 86400);
        }

        return $model->where('shop_supplier_id', '=', $shop_supplier_id)
            ->where('type', '=', $type)
            ->count();
    }
}