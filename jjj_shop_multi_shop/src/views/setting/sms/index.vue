<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="150px">
      <!--添加门店-->
      <div class="common-form">短信设置</div>
      <el-form-item label="默认上传方式">
        <div>
          <el-radio v-model="form.radio" label="aliyun" @change="getRadio"
            >阿里云短信</el-radio
          >
          <el-radio v-model="form.radio" label="qcloud" @change="getRadio"
            >腾讯云短信</el-radio
          >
          <el-radio v-model="form.radio" label="hwcloud" @change="getRadio"
            >华为云短信</el-radio
          >
        </div>
      </el-form-item>
      <!--阿里云短信-->
      <div v-if="form.radio == 'aliyun'">
        <el-form-item label="AccessKey">
          <el-input
            v-model="form.engine.aliyun.AccessKeyId"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="AccessKeySecret">
          <el-input
            v-model="form.engine.aliyun.AccessKeySecret"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input
            v-model="form.engine.aliyun.sign"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册短信模板">
          <el-input
            v-model="form.engine.aliyun.login_template"
            class="max-w460"
          ></el-input>
          <div class="tips">不填则表示不支持h5登录</div>
        </el-form-item>
        <el-form-item label="商户申请短信模板">
          <el-input
            v-model="form.engine.aliyun.apply_template"
            class="max-w460"
          ></el-input>
          <div class="tips">如果不开启手机验证可以不用填写</div>
        </el-form-item>
        <el-form-item label="商户审核未通过短信模板">
          <el-input
            v-model="form.engine.aliyun.supplier_reject_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="商户审核通过短信模板">
          <el-input
            v-model="form.engine.aliyun.supplier_pass_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
      </div>

      <!--腾讯云短信-->
      <div v-if="form.radio == 'qcloud'">
        <el-form-item label="AppId">
          <el-input
            v-model="form.engine.qcloud.AccessKeyId"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="AppKey">
          <el-input
            v-model="form.engine.qcloud.AccessKeySecret"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input
            v-model="form.engine.qcloud.sign"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册短信模板">
          <el-input
            v-model="form.engine.qcloud.login_template"
            class="max-w460"
          ></el-input>
          <div class="tips">不填则表示不支持h5登录</div>
        </el-form-item>
        <el-form-item label="商户申请短信模板">
          <el-input
            v-model="form.engine.qcloud.apply_template"
            class="max-w460"
          ></el-input>
          <div class="tips">如果不开启手机验证可以不用填写</div>
        </el-form-item>
        <el-form-item label="商户审核未通过短信模板">
          <el-input
            v-model="form.engine.qcloud.supplier_reject_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="商户审核通过短信模板">
          <el-input
            v-model="form.engine.qcloud.supplier_pass_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
      </div>

      <!--华为云短信-->
      <div v-if="form.radio == 'hwcloud'">
        <el-form-item label="AccessKey">
          <el-input
            v-model="form.engine.hwcloud.AccessKeyId"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="AccessKeySecret">
          <el-input
            v-model="form.engine.hwcloud.AccessKeySecret"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信通道">
          <el-input
            v-model="form.engine.hwcloud.sender"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input
            v-model="form.engine.hwcloud.sign"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册短信模板">
          <el-input
            v-model="form.engine.hwcloud.login_template"
            class="max-w460"
          ></el-input>
          <div class="tips">不填则表示不支持h5登录</div>
        </el-form-item>
        <el-form-item label="商户申请短信模板">
          <el-input
            v-model="form.engine.hwcloud.apply_template"
            class="max-w460"
          ></el-input>
          <div class="tips">如果不开启手机验证可以不用填写</div>
        </el-form-item>
        <el-form-item label="商户审核未通过短信模板">
          <el-input
            v-model="form.engine.hwcloud.supplier_reject_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="商户审核通过短信模板">
          <el-input
            v-model="form.engine.hwcloud.supplier_pass_code"
            class="max-w460"
          ></el-input>
        </el-form-item>
      </div>
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
import { smsDetail, editSms, sendSms } from "@/api/setting.js";

export default {
  data() {
    return {
      /*form表单数据*/
      form: {
        radio: "aliyun",
        accept_phone: "",
        engine: {
          aliyun: {},
          qcloud: {},
          hwcloud: {},
        },
      },
      loading: false,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      let self = this;
      smsDetail({}, true)
        .then((data) => {
          let vars = data.data.vars.values;
          self.form.radio = vars.default;
          self.form.engine.aliyun = vars.engine.aliyun;
          self.form.engine.qcloud = vars.engine.qcloud;
          self.form.engine.hwcloud = vars.engine.hwcloud;
        })
        .catch((error) => {});
    },
    //提交表单
    onSubmit() {
      let self = this;
      self.loading = true;
      let params = this.form;
      editSms(params, true)
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，短信通知设置成功",
            type: "success",
          });
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    //发送短信
    sendOut() {
      let self = this;
      let params = this.form;
      sendSms(params, true)
        .then((data) => {
          ElMessage({
            message: "恭喜你，短信发送成功",
            type: "success",
          });
          self.$router.push("/setting/Sms");
        })
        .catch((error) => {});
    },
  },
};
</script>

<style>
</style>
