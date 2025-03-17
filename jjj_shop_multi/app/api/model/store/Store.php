<?php

namespace app\api\model\store;

use app\common\model\store\Store as StoreModel;

/**
 * 商家门店模型
 */
class Store extends StoreModel
{
    /**
     * 隐藏字段
     */
    protected $hidden = [
        'is_delete',
        'app_id',
        'create_time',
        'update_time'
    ];

    /**
     * 获取门店列表
     */
    public function getList($is_check, $longitude, $latitude, $limit, $shop_supplier_id = 0)
    {
        $model = $this;
        // 是否支持自提核销
        $is_check && $model = $model->where('is_check', '=', $is_check);
        // 商家id
        $shop_supplier_id && $model = $model->where('shop_supplier_id', '=', $shop_supplier_id);
        // 获取数量
        $limit != false && $model = $model->limit($limit);
        // 获取门店列表数据
        $data = $model->where('is_delete', '=', '0')
            ->where('status', '=', '1')
            ->order(['sort' => 'asc', 'create_time' => 'desc'])
            ->select();

        // 根据距离排序
        if (!empty($longitude) && !empty($latitude)) {
            $map = $this->mapChange($latitude,$longitude);
            return $this->sortByDistance($data, $map['lng'], $map['lat']);
        }
        return $data;
    }

    /**
     * 根据距离排序
     */
    private function sortByDistance(&$data, $longitude, $latitude)
    {
        // 根据距离排序
        $list = $data->isEmpty() ? [] : $data->toArray();
        $sortArr = [];
        foreach ($list as &$store) {
            // 计算距离
            $distance = self::getDistance($longitude, $latitude, $store['longitude'], $store['latitude']);
            // 排序列
            $sortArr[] = $distance;
            $store['distance'] = $distance;
            if ($distance >= 1000) {
                $distance = bcdiv($distance, 1000, 2);
                $store['distance_unit'] = $distance . 'km';
            } else
                $store['distance_unit'] = $distance . 'm';
        }
        // 根据距离排序
        array_multisort($sortArr, SORT_ASC, $list);
        return $list;
    }

    /**
     * 获取两个坐标点的距离
     */
    private static function getDistance($ulon, $ulat, $slon, $slat)
    {
        // 地球半径
        $R = 6378137;
        // 将角度转为狐度
        $radLat1 = deg2rad($ulat);
        $radLat2 = deg2rad($slat);
        $radLng1 = deg2rad($ulon);
        $radLng2 = deg2rad($slon);
        // 结果
        $s = acos(cos($radLat1) * cos($radLat2) * cos($radLng1 - $radLng2) + sin($radLat1) * sin($radLat2)) * $R;
        // 精度
        $s = round($s * 10000) / 10000;
        return round($s);
    }

    /**
     * 根据门店id集获取门店列表
     */
    public function getListByIds($storeIds)
    {
        $model = $this;
        // 筛选条件
        $filter = ['store_id' => ['in', $storeIds]];
        if (!empty($storeIds)) {
            $model = $model->orderRaw('field(store_id, ' . implode(',', $storeIds) . ')');
        }
        // 获取商品列表数据
        return $model->with(['logo'])
            ->where('is_delete', '=', '0')
            ->where('status', '=', '1')
            ->where($filter)
            ->select();
    }

    /**
     * 腾讯地图---->百度地图
     * @param double $lat 纬度
     * @param double $lng 经度
     */
    private function mapChange($lat, $lng)
    {
        $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        $x = $lng;
        $y = $lat;
        $z = sqrt($x * $x + $y * $y) + 0.00002 * sin($y * $x_pi);
        $theta = atan2($y, $x) + 0.000003 * cos($x * $x_pi);
        $lng = $z * cos($theta) + 0.0065;
        $lat = $z * sin($theta) + 0.006;
        return array('lng' => $lng, 'lat' => $lat);
    }

}