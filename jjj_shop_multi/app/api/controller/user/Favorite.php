<?php

namespace app\api\controller\user;

use app\api\controller\Controller;
use app\api\model\user\Favorite as FavoriteModel;

/**
 * 我的收藏商品和关注店铺
 */
class Favorite extends Controller
{
    protected $user;

    /**
     * 构造方法
     */
    public function initialize()
    {
        parent::initialize();
        $this->user = $this->getUser();
    }

    /*
    *收藏
    */
    public function add()
    {
        $data = $this->request->param();
        $model = FavoriteModel::detail($data['pid'], $data['type'], $this->user['user_id']);
        if ($model && $model->cancelFav()) {
            return $this->renderSuccess('操作成功');
        } else {
            $data['user_id'] = $this->user['user_id'];
            $model = new FavoriteModel();
            if ($model->fav($data)) {
                return $this->renderSuccess('操作成功');
            }
        }

        return $this->renderSuccess($model->getError() ?: '操作失败');
    }

    //我的收藏/关注
    public function list()
    {
        $Favorite = new FavoriteModel;
        $where['user_id'] = $this->user['user_id'];
        $where['type'] = $this->request->param('type');
        $list = $Favorite->getList($where, $this->postData());
        return $this->renderSuccess('', compact('list'));
    }
}