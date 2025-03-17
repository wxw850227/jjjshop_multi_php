<template>
  <div>
    <!--form表单-->
    <el-form size="small" ref="formData" :model="formData" label-width="150px">
      <el-form-item label="客服类型">
        <div>
          <el-radio v-model="formData.service_type" :label="10"
            >聊天工具</el-radio
          >
        </div>
      </el-form-item>
      <div v-if="formData.service_type == 10">
        <el-form-item label="微信号">
          <el-input
            v-model="formData.wechat"
            placeholder="请输入微信号"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="qq">
          <el-input
            v-model="formData.qq"
            placeholder="请输入qq号"
            class="max-w460"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            v-model="formData.phone"
            placeholder="请输入联系电话"
            class="max-w460"
          ></el-input>
        </el-form-item>
      </div>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :disabled="loading"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { getService, setService } from "@/api/setting.js";
export default {
  data() {
    return {
      /*是否在提交*/
      loading: false,
      /*表单数据对象*/
      formData: {
        service_type: 10,
        wechat: "",
        qq: "",
        phone: "",
        user_id: "",
      },
      user_id: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /*获取配置数据*/
    getData() {
      let self = this;
      getService({}, true)
        .then((res) => {
          if (res.data.model != null) {
            self.formData = res.data.model;
            self.user_id = res.data.model.user_id;
          }
        })
        .catch((error) => {});
    },

    /*提交*/
    onSubmit() {
      let self = this;
      let params = this.formData;
      self.$refs.formData.validate((valid) => {
        if (valid) {
          self.loading = true;
          setService(params, true)
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "恭喜你，保存设置成功",
                type: "success",
              });
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

<style></style>
