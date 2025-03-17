<?php

namespace app\shop\service\statistics;

use app\shop\model\supplier\Supplier as SupplierModel;

/**
 * 供应商数据概况
 */
class SupplierService
{
    /**
     * 获取数据概况
     */
    public function getData()
    {
        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $data = [
            // 累积供应商数
            'supplier_total' => [
                'today' => number_format($this->getSupplierData(null, $today, 'supplier_total')),
                'yesterday' => number_format($this->getSupplierData(null, $yesterday, 'supplier_total'))
            ],
            // 新增供应商数
            'supplier_add' => [
                'today' => number_format($this->getSupplierData($today, null, 'supplier_add')),
                'yesterday' => number_format($this->getSupplierData($yesterday, null, 'user_add'))
            ],
        ];
        return $data;
    }

    /**
     * 通过时间段查询用户数据
     */
    public function getDataByDate($days)
    {
        $data = [];
        foreach ($days as $day) {
            $data[] = [
                'day' => $day,
                'new_num' => $this->getSupplierData($day, null, 'supplier_add')
            ];
        }
        return $data;
    }

    /**
     * 获取用户数据
     */
    private function getSupplierData($startDate, $endDate, $type)
    {
        return (new SupplierModel)->getSupplierData($startDate, $endDate, $type);
    }

}