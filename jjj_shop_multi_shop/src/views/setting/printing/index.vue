<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-小票打印设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--小票打印设置-->
      <div class="common-form">小票打印设置</div>

      <el-form-item label="是否开启小票打印">
        <div>
          <el-radio v-model="form.is_open" :label="1">开启</el-radio>
          <el-radio v-model="form.is_open" :label="0">关闭</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择订单打印机">
        <el-select v-model="form.printer_id" placeholder="请选择">
          <el-option
            v-for="(item, index) in printerList"
            :key="index"
            :label="item.printer_name"
            :value="item.printer_id + ''"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单打印方式">
        <!-- <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item,index) in all_type"  :label="index" :key="index">订单付款时</el-checkbox>
        </el-checkbox-group> -->
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked" @change="handleCheckedCitiesChange"
            >订单付款时</el-checkbox
          >
        </template>
      </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { printingDetail, editPrinting } from "@/api/setting.js";

export default {
  data() {
    return {
      /*切换菜单*/
      // activeIndex: '1',
      /*form表单数据*/
      form: {
        is_open: "",
        printer_id: "",
        order_status: [],
      },
      checked: false,
      printerList: [],
      loading: false,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      let self = this;
      printingDetail({}, true)
        .then((data) => {
          let vars = data.data.vars.values;
          self.form.is_open = vars.is_open;
          self.form.printer_id = "" + vars.printer_id;
          self.form.order_status = vars.order_status;
          self.printerList = data.data.vars.printerList;
          if (vars.order_status != null && vars.order_status[0] == 20) {
            self.checked = true;
          }
        })
        .catch((error) => {});
    },
    //提交表单
    onSubmit() {
      let self = this;
      let params = this.form;
      self.loading = true;
      editPrinting(params, true)
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，打印设置成功",
            type: "success",
          });
          // self.$router.push('/setting/Printing');
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    //监听复选框选中
    handleCheckedCitiesChange(e) {
      let self = this;
      if (e) {
        self.form.order_status[0] = 20;
      } else {
        self.form.order_status = [];
      }
    },
  },
};
</script>

<style></style>
