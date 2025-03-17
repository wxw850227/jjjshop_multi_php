<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <!--添加门店-->
      <div class="common-form">添加门店</div>

      <el-form-item
        label="门店名称"
        prop="store_name"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          v-model="form.store_name"
          placeholder="请输入门店名称"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item label="门店logo">
        <el-row>
          <el-button icon="picture" @click="openUpload"
            >选择图片</el-button
          >
          <div v-if="form.logo_image_id != ''" class="img">
            <img :src="file_path" width="100" height="100" />
          </div>
        </el-row>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="linkman"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          v-model="form.linkman"
          placeholder="请输入门店联系人"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="phone"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          v-model="form.phone"
          placeholder="请输入门店联系电话"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="营业时间"
        prop="shop_hours"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          v-model="form.shop_hours"
          placeholder="请输入营业时间,例如:8:30-17:30"
          class="max-w460"
        ></el-input>
      </el-form-item>

      <el-form-item label="门店区域">
        <el-select
          v-model="form.province_id"
          placeholder="省"
          @change="initCity"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in areaList"
            :key="index"
          ></el-option>
        </el-select>
        <el-select
          v-if="form.province_id != ''"
          v-model="form.city_id"
          placeholder="市"
          @change="initRegion"
        >
          <el-option
            :label="item1.name"
            :value="item1.id"
            v-for="(item1, index1) in areaList[form.province_id]['city']"
            :key="index1"
          ></el-option>
        </el-select>
        <el-select
          v-if="form.city_id != ''"
          v-model="form.region_id"
          placeholder="区"
        >
          <el-option
            :label="item2.name"
            :value="item2.id"
            v-for="(item2, index2) in areaList[form.province_id]['city'][
              form.city_id
            ]['region']"
            :key="index2"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="详细地址"
        prop="address"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          v-model="form.address"
          placeholder="请输入详细地址"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item label="门店坐标">
        <div class="ww100 mb16">
          <el-input v-model="form.coordinate" class="max-w460"></el-input>
        </div>
        <div class="ww100">
          <Getpoint
              :form="form"
              @getMapdata="getMapdataFunc"
              @chose="choseFunc"
            ></Getpoint>
        </div>
      </el-form-item>
      <el-form-item label="门店简介">
        <el-input
          type="textarea"
          v-model="form.summary"
          placeholder="请输入门店简介"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item label="门店排序">
        <el-input
          type="number"
          v-model="form.sort"
          placeholder="请输入门店排序"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <el-form-item label="自提核销">
        <el-radio-group v-model="form.is_check">
          <el-radio :label="1">支持</el-radio>
          <el-radio :label="0">不支持</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="门店状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >提交</el-button
        >
      </div>
    </el-form>
    <!--上传图片组件-->
    <Upload
      v-if="isupload"
      :isupload="isupload"
      :type="type"
      @returnImgs="returnImgsFunc"
      >上传图片</Upload
    >
  </div>
</template>

<script>
import { addShop } from "@/api/store.js";
import { getRegion } from "@/api/data.js";
import Upload from "@/components/file/Upload.vue";
import Getpoint from "@/components/map/Getpoint.vue";
export default {
  components: {
    /*腾讯地图拾取器*/
    Getpoint,
    Upload,
  },
  data() {
    return {
      /*form表单数据*/
      form: {
        store_name: "",
        logo_image_id: 0,
        linkman: "",
        phone: "",
        shop_hours: "",
        province_id: "",
        city_id: "",
        region_id: "",
        address: "",
        coordinate: "",
        summary: "",
        sort: 1,
        is_check: 1,
        status: 1,
        is_search_map: false,
      },
      file_path: "",
      /*省市区*/
      areaList: [],
      /*是否上传图片*/
      isupload: false,
      loading: false,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      let self = this;
      getRegion({}, true)
        .then((res) => {
          self.areaList = res.data.regionData;
        })
        .catch((error) => {});
    },
    /*添加用户*/
    onSubmit() {
      let self = this;
      let form = self.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;
          addShop(form, true)
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，添加成功",
                  type: "success",
                });
                self.$router.push("/store/store/index");
              } else {
                self.loading = false;
              }
            })
            .catch((error) => {
              self.loading = false;
            });
        }
      });
    },
    /*初始化城市id*/
    initCity() {
      this.form.city_id = "";
    },

    /*初始化区id*/
    initRegion() {
      this.form.region_id = "";
    },

    /*获取经纬度*/
    getMapdataFunc(e) {
      this.form.coordinate = e.data[0].toFixed(6) + "," + e.data[1].toFixed(6);
    },

    /*上传*/
    openUpload(e) {
      this.type = e;
      this.isupload = true;
    },

    /*获取图片*/
    returnImgsFunc(e) {
      if (e != null && e.length > 0) {
        this.file_path = e[0].file_path;
        this.form.logo_image_id = e[0].file_id;
      }
      this.isupload = false;
    },

    /*选择的地址*/
    choseFunc(e) {
      this.form.coordinate = e.location.lat + "," + e.location.lng;
      this.form.address = e.address;
    },

    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-setting-content {
}

.product-add {
  padding-bottom: 50px;
}

.img {
  margin-top: 10px;
}
</style>
