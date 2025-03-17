<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="1"></el-tab-pane>
        <el-tab-pane label="适用商品" name="2"></el-tab-pane>
      </el-tabs>
      <template v-if="activeName == '1'">
        <!--添加门店-->
        <div class="common-form">添加优惠券</div>
        <el-form-item
          label="优惠券名称"
          prop="name"
          :rules="[{ required: true, message: ' ' }]"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入优惠券名称"
          ></el-input>
          <div class="tips">例如：满100减10</div>
        </el-form-item>
        <el-form-item label="优惠券颜色">
          <el-radio-group v-model="form.color">
            <el-radio label="10">蓝色</el-radio>
            <el-radio label="20">红色</el-radio>
            <el-radio label="30">紫色</el-radio>
            <el-radio label="40">黄色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券类型">
          <el-radio-group v-model="form.coupon_type">
            <el-radio label="10">满减券</el-radio>
            <el-radio label="20">折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.coupon_type == 10">
          <el-form-item label="减免金额">
            <el-input
              v-model="form.reduce_price"
              placeholder="请输入减免金额"
              type="number"
            ></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="折扣率 ">
            <el-input
              v-model="form.discount"
              placeholder="请输入折扣率"
              type="number"
            ></el-input>
            <div class="tips">折扣率范围0-10，9.5代表9.5折，整数或1位小数</div>
          </el-form-item>
        </div>

        <el-form-item label="最低消费金额">
          <el-input
            v-model="form.min_price"
            placeholder="请输入最低消费金额"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="到期类型">
          <el-radio-group v-model="form.expire_type">
            <el-radio label="10">领取后生效</el-radio>
            <el-radio label="20">固定时间</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.expire_type == 10">
          <el-form-item label="有效天数">
            <el-input
              v-model="form.expire_day"
              placeholder="请输入有效天数"
              type="number"
            ></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="有效时间">
            <el-date-picker
              v-model="form.active_time"
              type="daterange"
              align="right"
              unlink-panels
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item
          label="发放总数量 "
          prop="total_num"
          :rules="[{ required: true, message: ' ' }]"
        >
          <el-input
            v-model="form.total_num"
            placeholder="请输入发放总数量"
            type="number"
          ></el-input>
          <div class="tips">限制领取的优惠券数量，-1为不限制</div>
        </el-form-item>
        <el-form-item label="是否显示在领券中心">
          <el-radio-group v-model="form.show_center">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            type="number"
            v-model="form.sort"
            placeholder="请输入排序"
          ></el-input>
        </el-form-item>
      </template>
      <template v-if="activeName == '2'">
        <div class="common-form">适用商品</div>
        <el-form-item label="选择">
          <el-radio-group v-model="form.apply_range">
            <el-radio :label="10">全部商品</el-radio>
            <el-radio :label="20">
              <span>指定商品</span>
            </el-radio>
            <el-radio :label="30">
              <span>指定分类</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.apply_range == 20">
          <el-button
            class="mb10"
            @click="is_product = true"
            type="primary"
            plain
            >添加商品
          </el-button>
          <el-table
            v-if="product_list.length > 0"
            :data="product_list"
            max-height="400"
            border
            style="width: 100%"
          >
            <el-table-column prop="product_id" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="product_name" label="商品名称" width="180">
            </el-table-column>
            <el-table-column prop="image" label="图片">
              <template #default="scope">
                <img
                  v-img-url="hasImages(scope.row.product_image)"
				  :width="50"
				  :height="50"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  @click="deleteClick(scope.$index)"
                  link
                  type="primary"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="" v-if="form.apply_range == 30">
          <el-button
            class="mb10"
            @click="is_category = true"
            type="primary"
            plain
            >添加分类
          </el-button>
          <el-col>
            <el-tag
              class="mr10 mb10"
              type="info"
			  size="large"
              v-if="category_list.first.length > 0"
              v-for="(item, index) in category_list.first"
              :key="item.category_id"
            >
              {{ item.parent ? item.parent + "→" + item.name : item.name }}
            </el-tag>
            <el-tag
              class="mr10 mb10"
              type="info"
			  size="large"
              v-if="category_list.second.length > 0"
              v-for="(item, index) in category_list.second"
              :key="item.category_id"
            >
              {{ item.parent ? item.parent + "→" + item.name : item.name }}
            </el-tag>
          </el-col>
        </el-form-item>
      </template>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button
          type="info"
          size="small"
          @click="cancelFunc"
          :loading="loading"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="onSubmit"
          :loading="loading"
          >提交</el-button
        >
      </div>
    </el-form>
    <!--选择商品-->
    <Product
      :isproduct="is_product"
      :excludeIds="exclude_ids"
      :islist="true"
      @closeDialog="closeProductFunc"
    ></Product>
    <Category
      :is_category="is_category"
      :excludeIds="category_ids"
      @close="closeCategoryFunc"
    ></Category>
  </div>
</template>

<script>
import { addCoupon } from "@/api/coupon.js";
import Product from "@/components/product/Product.vue";
import Category from "@/components/category/category.vue";
export default {
  components: {
    Product,
    Category,
  },
  data() {
    return {
      /*切换菜单*/
      activeName: "1",
      /*form表单数据*/
      form: {
        color: "10",
        coupon_type: "10",
        expire_type: "10",
        sort: 1,
        active_time: "",
        show_center: 1,
        apply_range: 10,
      },
      loading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      is_category: false,
      is_product: false,
      exclude_ids: [],
      product_list: [],
      category_list: {
        second: [],
        first: [],
      },
      category_ids: [],
    };
  },
  created() {},

  methods: {
    /*添加用户*/
    onSubmit() {
      let self = this;
      let form = self.form;
      form.product_ids = self.exclude_ids;
      form.category_list = self.category_list;
      self.$refs.form.validate((valid) => {
        if (valid) {
          // 如果是折扣，则判断折扣是否大于0小于10
          if (form.coupon_type == 20) {
            if (form.discount <= 0 || form.discount >= 10) {
              ElMessage({
                message: "折扣率介于0和10之间",
                type: "error",
              });
              return;
            }
          }
          self.loading = true;
          addCoupon(form, true)
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "恭喜你，添加成功",
                type: "success",
              });
              self.$router.push("/plus/coupon/index");
            })
            .catch((error) => {
              self.loading = false;
            });
        }
      });
    },
    closeCategoryFunc(e) {
      let self = this;
      self.is_category = false;
      if (e) {
        self.category_list = e;
        console.log(e);
      }
    },
    /*关闭商品*/
    closeProductFunc(e) {
      let self = this;
      self.is_product = e.openDialog;
      if (e.type == "success") {
        e.params.forEach((item, index) => {
          let params = {
            product_id: item.product_id,
            product_name: item.product_name,
            product_image: item.product_image,
          };
          self.exclude_ids.push(params.product_id);
          self.product_list.push(params);
        });
      }
    },
    deleteClick(e) {
      this.exclude_ids.splice(e, 1);
      this.product_list.splice(e, 1);
    },
    hasImages(e) {
      if (e) {
        return e;
      } else {
        return "";
      }
    },
    /*取消*/
    cancelFunc() {
      this.$router.push({
        path: "/plus/coupon/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mb10 {
  margin-bottom: 10px;
}

.product-add {
  padding-bottom: 50px;
}
</style>
