<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-交易设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="150px">
      <!--添加门店-->
      <div class="common-form">订单流程设置</div>
      <el-form-item label="未支付订单">
        <el-input
          v-model="form.close_days"
          type="number"
          style="width: 200px"
        ></el-input>
        &nbsp;&nbsp;天后自动关闭
        <div class="tips">订单下单未付款，n天后自动关闭，设置0天不自动关闭</div>
      </el-form-item>
      <el-form-item label="已发货订单">
        <el-input
          v-model="form.receive_days"
          type="number"
          style="width: 200px"
        ></el-input>
        &nbsp;&nbsp;天后自动确认收货
        <div class="tips">
          如果在期间未确认收货，系统自动完成收货，设置0天不自动收货
        </div>
      </el-form-item>
      <el-form-item label="已完成订单">
        <el-input
          v-model="form.refund_days"
          type="number"
          style="width: 200px"
        ></el-input>
        &nbsp;&nbsp;天内允许申请售后
        <div class="tips">
          订单完成后 ，用户在n天内可以发起售后申请，设置0天不允许申请售后
        </div>
      </el-form-item>

      <div class="common-form">运费设置</div>
      <el-form-item label="运费组合策略">
        <div class="ww100">
          <el-radio v-model="form.freight_rule" label="10">叠加</el-radio>
          <div class="tips">
            订单中的商品有多个运费模板时，将每个商品的运费之和订为订单总运费
          </div>
        </div>
        <div class="ww100" style="margin-top: 20px">
          <el-radio v-model="form.freight_rule" label="20"
            >以低运费结算</el-radio
          >
          <div class="tips">
            订单中的商品有多个运费模板时，取订单中运费最少的商品的运费计为订单总运费
          </div>
        </div>
        <div class="ww100" style="margin-top: 20px">
          <el-radio v-model="form.freight_rule" label="30"
            >以高运费结算</el-radio
          >
          <div class="tips">
            订单中的商品有多个运费模板时，取订单中运费最多的商品的运费计为订单总运费
          </div>
        </div>
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
import { tradeDetail, editTrade } from "@/api/setting.js";

export default {
  data() {
    return {
      /*切换菜单*/
      // activeIndex: '1',
      /*form表单数据*/
      form: {
        close_days: "",
        receive_days: "",
        refund_days: "",
        freight_rule: "",
      },
      loading: false,
    };
  },
  created() {
    this.getParams();
  },

  methods: {
    getParams() {
      let self = this;
      tradeDetail({}, true)
        .then((data) => {
          if (data.code == 1) {
            let vars = data.data.vars.values;
            self.form.close_days = vars.order.close_days;
            self.form.receive_days = vars.order.receive_days;
            self.form.refund_days = vars.order.refund_days;
            self.form.freight_rule = vars.freight_rule;
          }
        })
        .catch((error) => {});
    },
    //监听复选框选中
    handleCheckedCitiesChange(val) {},
    onSubmit() {
      let self = this;
      self.loading = true;
      let params = this.form;
      editTrade(params, true)
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，交易设置成功",
            type: "success",
          });
          self.$router.push("/setting/trade/index");
        })
        .catch((error) => {
          self.loading = false;
        });
    },
  },
};
</script>

<style>
</style>
