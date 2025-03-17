<?php

namespace app\api\model\plus\sign;

use app\common\model\plus\sign\Sign as SignModel;
use app\common\exception\BaseException;
use app\api\model\settings\Setting as SettingModel;

/**
 * 用户签到模型模型
 */
class Sign extends SignModel
{

    /**
     * @param $user_id int 用户id
     * @param $sign_date string 签到时间
     * @return int|mixed
     */
    public function getDays($user_id, $sign_date)
    {
        $row = $this->where('user_id', '=', $user_id)->order(['create_time' => 'desc'])->find();
        if (empty($row)) {
            return 1;
        }
        $dif = (strtotime($sign_date) - strtotime($row['create_time'])) / (24 * 60 * 60);
        if (strtotime($row['sign_date']) == strtotime($sign_date)) {
            throw new BaseException(['msg' => '今天已签到']);
            return false;
        }
        if ($dif > 1) {
            return 1;
        }
        if ($dif < 1) {
            return $row['days'] + 1;
        }
    }

    /**
     * 签到
     */
    public function add($user)
    {
        // 更新记录
        $this->startTrans();
        try {
            //积分别名
            $points_name = SettingModel::getPointsName();
            //获取签到配置
            $sign_conf = SettingModel::getItem('sign');
            //签到日期
            $sign_date = date('Y-m-d', time());
            $user_id = $user['user_id'];

            //获取连续签到天数
            $days = $this->getDays($user_id, $sign_date);

            //修改用户积分
            $points = $user->setPoints($user_id, $days, $sign_conf, $sign_date);
            $data = [
                'user_id' => $user_id,
                'sign_date' => date('Y-m-d', time()),
                'sign_day' => intval(date('d', time())),
                'days' => $days,
                'points' => $points,
                'prize' => $points.'积分',
                'app_id' => self::$app_id
            ];

            $this->save($data);
            $this->commit();
            return "签到成功，奖励{$points_name}{$points}个";
        } catch (\Exception $e) {
            $this->rollback();
            return '';
        }
    }

    public function getListByUserId($user_id)
    {
        $str = date('Y-m-d', time());
        $arr = explode('-', $str);
        $start_time = strtotime($arr[0] . '-' . $arr[1] . '-01');
        $list = $this->where('user_id', '=', $user_id)
            ->where('create_time', 'between', [$start_time, time()])
            ->order(['create_time' => 'desc'])->select()->toArray();

        $res = array_column($list, 'sign_day');
        $len = count($list);

        if ($len == 0) {
            $days = 0;
            $is_sign = 0;
        }else{
            $days = $len;
            $is_sign = ($list[$len - 1]['sign_date'] == date('Y-m-d', time())) ? 1 : 0;
        }

        return [$res, $days, intval(date('d', time())), $is_sign];
    }


}
