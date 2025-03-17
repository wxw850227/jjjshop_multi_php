<template>
  <div>
    <!--基本信息-->
    <div class="common-form">基本信息</div>
    <el-form-item
      label="商品名称："
      :rules="[{ required: true, message: '请填写商品名称' }]"
      prop="model.product_name"
    >
      <el-input v-model="form.model.product_name" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item
      label="所属分类："
      :rules="[{ required: true, message: '请选择商品分类' }]"
      prop="model.category_id"
    >
      <el-select v-model="form.model.category_id">
        <template v-for="cat in form.category">
          <el-option :value="cat.category_id" :label="cat.name"></el-option>
          <template v-if="cat.child !== undefined" v-for="two in cat.child">
            <el-option
              :value="two.category_id"
              :label="two.name"
              style="padding-left: 30px"
            ></el-option>
            <template v-if="two.child !== undefined" v-for="three in two.child">
              <el-option
                :value="three.category_id"
                :label="three.name"
                style="padding-left: 60px"
              ></el-option>
            </template>
          </template>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="销售状态：">
      <el-radio-group v-model="form.model.product_status">
        <el-radio :label="10">立即上架</el-radio>
        <el-radio :label="20">放入仓库</el-radio>
      </el-radio-group>
      <div class="gray9">如果平台开启了商品审核，则商品审核通过后才能销售</div>
    </el-form-item>
    <el-form-item
      label="是否审核："
      v-if="form.audit_setting.add_audit == 1 && form.scene == 'add'"
    >
      <el-radio-group v-model="form.model.audit_status">
        <el-radio :label="0">提交审核</el-radio>
        <el-radio :label="40">保存草稿</el-radio>
      </el-radio-group>
      <div class="gray9">当前平台开启了审核，审核通过后才能上架销售</div>
    </el-form-item>
    <el-form-item
      label="是否审核："
      v-if="form.audit_setting.edit_audit == 1 && form.scene != 'add'"
    >
      <el-radio-group v-model="form.model.audit_status">
        <el-radio :label="0">提交审核</el-radio>
        <el-radio :label="40">保存草稿</el-radio>
      </el-radio-group>
      <div class="gray9">当前平台开启了修改审核，审核通过后才能上架销售</div>
    </el-form-item>
    <el-form-item
      label="商品图片："
      :rules="[{ required: true, message: '请上传商品图片' }]"
      prop="model.image"
    >
      <div class="draggable-list">
        <template v-if="form.model.image && form.model.image.length > 0">
          <draggable
            v-model="form.model.image"
            group="people"
            item-key="id"
            class="draggable-list"
          >
            <template #item="{ element }">
              <div class="item">
                <img v-img-url="element.file_path" />
                <a
                  href="javascript:void(0);"
                  class="delete-btn"
                  @click.stop="deleteImg(element)"
                >
                  <el-icon>
                    <Close />
                  </el-icon>
                </a>
              </div>
            </template>
          </draggable>
        </template>

        <div
          class="item img-select"
          @click="openProductUpload('image', 'image')"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="商品视频：">
      <el-row>
        <div class="draggable-list">
          <div
            class="item img-select"
            v-if="form.model.video_id == 0"
            @click="openProductUpload('video', 'video')"
          >
            <el-icon><Plus /></el-icon>
          </div>
          <div v-if="form.model.video_id != 0">
            <video
              width="150"
              height="150"
              :src="form.model.video.file_path"
              :autoplay="false"
              controls
            >
              您的浏览器不支持 video 标签
            </video>
            <div>
              <el-button icon="DeleteFilled" @click="delVideo"
                >删除视频</el-button
              >
            </div>
          </div>
        </div>
      </el-row>
    </el-form-item>
    <el-form-item label="视频封面：">
      <el-row>
        <div class="draggable-list">
          <div
            class="item img-select"
            v-if="form.model.poster_id == 0"
            @click="openProductUpload('image', 'poster')"
          >
           <el-icon><Plus /></el-icon>
          </div>
          <div
            v-if="form.model.poster_id != 0"
            class="item"
            @click="openProductUpload('image', 'poster')"
          >
            <img :src="form.model.poster.file_path" width="100" height="100" />
          </div>
        </div>
      </el-row>
    </el-form-item>
    <el-form-item label="商品卖点：">
      <el-input
        type="textarea"
        v-model="form.model.selling_point"
        class="max-w460"
      ></el-input>
    </el-form-item>
    <!--其他设置-->
    <div class="common-form">其他设置</div>
    <el-form-item label="商品属性：">
      <el-radio-group v-model="form.model.is_virtual">
        <el-radio :label="0">实物商品</el-radio>
        <el-radio :label="1">虚拟商品(无需发货)</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="运费："
      prop="model.delivery_id"
      v-if="form.model.is_virtual == 0"
    >
      <el-radio-group
        v-model="form.model.is_delivery_free"
        @change="changeDelivery"
      >
        <el-radio :label="0">包邮</el-radio>
        <el-radio :label="1">运费模板</el-radio>
      </el-radio-group>
      <el-select
        v-model="form.model.delivery_id"
        v-if="form.model.is_delivery_free == 1"
      >
        <el-option
          v-for="item in form.delivery"
          :value="item.delivery_id"
          :key="item.delivery_id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-link
        type="primary"
        :underline="false"
        v-if="form.model.is_delivery_free == 1"
        @click="setExpress"
        >去设置</el-link
      >
    </el-form-item>
    <el-form-item
      label="商品排序："
      :rules="[{ required: true, message: ' ' }]"
      prop="model.product_sort"
    >
      <el-input
        type="number"
        min="0"
        v-model="form.model.product_sort"
        class="max-w460"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="限购数量："
      :rules="[{ required: true, message: ' ' }]"
      prop="model.limit_num"
    >
      <el-input
        type="number"
        min="0"
        v-model="form.model.limit_num"
        class="max-w460"
      ></el-input>
      <div class="gray9">每个会员购买的最大数量，0为不限购</div>
    </el-form-item>
    <el-form-item label="发货类型：" v-if="form.model.is_virtual == 1">
      <el-radio-group v-model="form.model.virtual_auto">
        <el-radio :label="1">自动</el-radio>
        <el-radio :label="0">手动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="虚拟内容："
      :rules="[{ required: true, message: '请填写虚拟内容' }]"
      prop="model.virtual_content"
      v-if="form.model.is_virtual == 1"
    >
      <el-input
        type="text"
        v-model="form.model.virtual_content"
        class="max-w460"
      ></el-input>
      <div class="gray9">虚拟物品内容</div>
    </el-form-item>
    <!--商品图片组件-->
    <Upload
      v-if="isProductUpload"
      :config="config"
      :isupload="isProductUpload"
      @returnImgs="returnProductImgsFunc"
      >上传图片</Upload
    >
  </div>
</template>

<script>
import Upload from "@/components/file/Upload.vue";
import draggable from "vuedraggable";
export default {
  components: {
    Upload,
    draggable,
  },
  data() {
    return {
      isProductUpload: false,
      config: {},
      file_name: "image",
      test: [1,2,3,4]
    };
  },
  inject: ["form"],
  created() {},
  methods: {
    /*打开上传图片*/
    openProductUpload: function (file_type, file_name) {
      this.file_name = file_name;
      if (file_type == "image") {
        this.config = {
          total: 9,
          file_type: "image",
        };
      } else {
        this.config = {
          total: 1,
          file_type: "video",
        };
      }
      this.isProductUpload = true;
    },

    /*上传商品图片*/
    returnProductImgsFunc(e) {
      if (e != null) {
        if (this.file_name == "video") {
          this.form.model.video_id = e[0].file_id;
          this.form.model.video = e[0];
        } else if (this.file_name == "image") {
          this.form.model.image = this.form.model.image.concat(e);
        } else if (this.file_name == "poster") {
          this.form.model.poster_id = e[0].file_id;
          this.form.model.poster = e[0];
        }
      }
      this.isProductUpload = false;
    },

    /*删除商品图片*/
    deleteImg(index) {
      this.form.model.image.splice(index, 1);
    },
    delVideo() {
      this.form.model.video_id = 0;
      this.form.model.video = {};
    },
    /*打开添加*/
    setExpress() {
      this.$router.push("/setting/delivery/index");
    },
    changeDelivery(e) {
      if (e == 0) {
        this.form.model.delivery_id = "";
      }
    },
  },
};
</script>

<style>
.edit_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 20px;
  color: #2c3e50;
}

.ql-editor {
  height: 400px;
}

.draggable-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.draggable-list .wrapper > span {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.draggable-list .item {
  position: relative;
  width: 110px;
  height: 110px;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dddddd;
}

.draggable-list .delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: red;
  line-height: 16px;
  font-size: 16px;
  color: #ffffff;
  display: none;
}

.draggable-list .item:hover .delete-btn {
  display: block;
}

.draggable-list .item img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}

.draggable-list .img-select {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #dddddd;
  font-size: 30px;
}

.draggable-list .img-select i {
  color: #409eff;
}
</style>
