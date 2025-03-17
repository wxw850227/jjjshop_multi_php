<?php

namespace app\shop\model\user;

use app\common\model\user\Tag as TagModel;
use app\common\model\user\UserTag as UserTagModel;
/**
 * 用户会员等级模型
 */
class Tag extends TagModel
{
    /**
     * 获取列表记录
     */
    public function getList($data)
    {
        $list = $this->order([ 'create_time' => 'asc'])
            ->paginate($data);
        foreach ($list as $item){
            $item['user_count'] = UserTagModel::getCountByTag($item['tag_id']);
        }
        return $list;
    }

    /**
     * 获取列表记录
     */
    public function getLists()
    {
        return $this->field('tag_id,tag_name')
            ->order(['create_time' => 'asc'])
            ->select();
    }


    /**
     * 新增记录
     */
    public function add($data)
    {
        $data['app_id'] = self::$app_id;
        return $this->save($data);
    }

    /**
     * 编辑记录
     */
    public function edit($data)
    {
        return $this->save($data);
    }


    /**
     * 软删除
     */
    public function deleteTag()
    {
        // 删除关联
        (new UserTagModel())->where('tag_id', '=', $this['tag_id'])->delete();
        return $this->delete();
    }

}