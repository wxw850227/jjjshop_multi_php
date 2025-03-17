<?php

namespace app\shop\model\file;

use app\common\model\file\UploadFile as UploadFileModel;


/**
 * 图片模型
 */
class UploadFile extends UploadFileModel
{

    /**
     * 软删除
     */
    public function softDelete($fileIds)
    {
        return $this->where('file_id', 'in', $fileIds)->update(['is_delete' => 1]);
    }

}
