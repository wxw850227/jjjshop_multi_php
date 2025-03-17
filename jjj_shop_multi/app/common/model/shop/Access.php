<?php

namespace app\common\model\shop;

use app\common\model\BaseModel;
/**
 * 商家用户权限模型
 */
class Access extends BaseModel
{
    protected $name = 'shop_access';
    protected $pk = 'access_id';

    /*
     * 获取所有权限
     */
    protected static function getAll($isShow = 1)
    {
        if($isShow != -1){
            $data = static::withoutGlobalScope()
                ->where('is_show', '=', $isShow)
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->select();
        }else{
            $data = static::withoutGlobalScope()
                ->order(['sort' => 'asc', 'create_time' => 'asc'])
                ->select();
        }

        return $data ? $data->toArray() : [];
    }


    /**
     * 权限信息
     */
    public static function detail($where)
    {
        if(is_array($where)){
            return (new static())->where($where)->find();
        } else{
            return (new static())->where('access_id', '=', $where)->find();
        }
    }

    /**
     * 获取权限url集
     */
    public static function getAccessUrls($accessIds)
    {
        $urls = [];
        foreach (static::getAll(1) as $item) {
            in_array($item['access_id'], $accessIds) && $urls[] = $item['path'];
        }
        return $urls;
    }

    /**
     * 获取权限url集
     */
    public static function getAccessList($accessIds)
    {
        return (new static)::withoutGlobalScope()->where('access_id', 'in', $accessIds)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }


    /**
     * 通过插件分类id查询
     */
    public static function getListByPlusCategoryId($category_id){
        $model = new static();
        return $model::withoutGlobalScope()->where('plus_category_id', '=', $category_id)
            ->where('is_show', '=', 1)
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();
    }
}