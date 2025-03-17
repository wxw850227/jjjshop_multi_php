<?php

namespace app\api\service\common;


class RecommendService
{
    public static function checkRecommend($data, $location)
    {
        $is_recommend = true;
        if ($data['is_recommend'] > 0) {
            if (!in_array($location, $data['location'])) {
                $is_recommend = false;
            }
        } else {
            $is_recommend = false;
        }
        return $is_recommend;
    }
}