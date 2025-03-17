<template>
  <div class="product-add">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
      <el-tab-pane label="规格库存" name="spec"></el-tab-pane>
      <el-tab-pane label="商品详情" name="content"></el-tab-pane>
      <el-tab-pane label="高级设置" name="buyset"></el-tab-pane>
    </el-tabs>
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="180px">
      <!--基础信息-->
      <Basicm v-show="activeName == 'basic'"></Basicm>
      <!--规格设置-->
      <Spec v-show="activeName == 'spec'"></Spec>
      <!--商品详情-->
      <Content v-show="activeName == 'content'"></Content>
      <!--高级设置-->
      <Buyset v-show="activeName == 'buyset'"></Buyset>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { addProduct, getBaseData } from "@/api/product.js";
import Basicm from "./part/Basic.vue";
import Spec from "./part/Specs.vue";
import Content from "./part/Content.vue";
import Buyset from "./part/Buyset.vue";
export default {
  components: {
    /*基础信息*/
    Basicm,
    /*规格信息*/
    Spec,
    /*商品详情*/
    Content,
    /*高级设置*/
    Buyset,
  },
  data() {
    return {
      activeName: "basic",
      /*是否正在加载*/
      loading: false,
      /*form表单数据*/
      form: {
        model: {
          scene: "add",
          /*商品名称*/
          product_name: "",
          /*商品编码*/
          product_no: "",
          /*商品分类*/
          category_id: null,
          /*商品图片*/
          image: [],
          is_picture: 0,
          contentImage: [],
          video_id: 0,
          poster_id: 0,
          /*商品卖点*/
          selling_point: "",
          /*规格类别,默认10单规格，20多规格*/
          spec_type: 10,
          /*库存计算方式,默认20付款减库存，10下单减库存*/
          deduct_stock_type: 20,
          sku: {},
          /*多规格类别*/
          spec_many: {
            /*多规格类别*/
            spec_attr: [],
            /*多规格表格数据*/
            spec_list: [],
          },
          /*商品详情内容*/
          content: "",
          /*运费模板ID*/
          is_delivery_free: 0,
          delivery_id: "",
          /*商品状态*/
          product_status: 10,
          audit_status: 0,
          /*商品排序，默认100*/
          product_sort: 100,
          /*是否开启积分赠送,默认1为开启，0为关闭*/
          is_points_gift: 1,
          /*是否允许使用积分抵扣,默认1为允许，0为不允许*/
          is_points_discount: 1,
          /*最大积分抵扣数量*/
          max_points_discount: 0,
          /*是否虚拟商品*/
          is_virtual: 0,
          /*限购数量*/
          limit_num: 0,
          /*虚拟商品发货方式*/
          virtual_auto: 0,
          /*虚拟商品发货内容*/
          virtual_content: "",
        },
        /*商品分类*/
        category: [],
        /*运费模板*/
        delivery: [],
        /*会员等级*/
        gradeList: [],
        /*规格数据*/
        specData: null,
        /*是否锁住*/
        isSpecLocked: false,
        audit_setting: {},
      },
    };
  },
  provide: function () {
    return {
      form: this.form,
    };
  },
  created() {
    /*获取基础数据*/
    this.getBaseData();
  },
  methods: {
    /*获取基础数据*/
    getBaseData: function () {
      let self = this;
      getBaseData({}, true)
        .then((res) => {
          self.loading = false;
          Object.assign(self.form, res.data);
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*转JSON字符串*/
    convertJson(list) {
      let obj = {};
      list.forEach((item) => {
        obj[item.grade_id] = item.product_equity;
      });
      return JSON.stringify(obj);
    },

    /*提交*/
    onSubmit: function () {
      let self = this;
      let params = self.form.model;
      self.$refs.form.validate((valid) => {
        if (valid) {
          if (params.is_delivery_free == 0) {
            params.delivery_id = 0;
          } else {
            if (params.delivery_id == "") {
              ElMessage({
                message: "请选择运费模板",
                type: "error",
              });
              return;
            }
          }
          self.loading = true;
          addProduct(
            {
              params: JSON.stringify(params),
            },
            true
          )
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "添加成功",
                type: "success",
              });
              self.$router.push("/product/product/index");
            })
            .catch((error) => {
              self.loading = false;
            });
        } else {
          ElMessage({
            message: "请检查必填项是否填写完整",
            type: "error",
          });
        }
      });
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
  padding-bottom: 100px;
}
</style>
