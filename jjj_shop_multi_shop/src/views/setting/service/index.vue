<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-商城设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="150px">
      <!--添加门店-->
      <div class="common-form">客服设置</div>
      <el-form-item
        label="客服socket"
        :rules="[{ required: true, message: ' ' }]"
        prop="url"
      >
        <el-input
          v-model="form.url"
          placeholder="客服请求"
          class="max-w460"
        ></el-input>
        <div class="tips">填写格式为 ws://socket.com,请前往小程序设置域名</div>
      </el-form-item>
      <el-form-item label="是否开启客服">
        <div>
          <el-radio v-model="form.service_open" :label="1">开启</el-radio>
          <el-radio v-model="form.service_open" :label="0">关闭</el-radio>
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
import { serviceDetail, editService } from "@/api/setting.js";
export default {
  data() {
    return {
      /*是否正在加载*/
      loading: false,
      /*form表单数据*/
      form: {
        url: "",
        service_open: 1,
      },
    };
  },
  created() {
    this.getParams();
  },

  methods: {
    /*获取配置数据*/
    getParams() {
      let self = this;
      serviceDetail({}, true)
        .then((res) => {
          if (res.code == 1) {
            let vars = res.data.vars.values;
            self.form.url = vars.url;
            self.form.service_open = vars.service_open;
            self.loading = false;
          } else {
            self.$message.error("错了哦，这是一条错误消息");
          }
        })
        .catch((error) => {});
    },
    /*提交*/
    onSubmit() {
      let self = this;
      let params = this.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;
          editService(params, true)
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "恭喜你，客服设置成功",
                type: "success",
              });
              self.$router.push("/setting/service/index");
            })
            .catch((error) => {
              self.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
