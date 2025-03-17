<template>
  <div>
    <!--form表单-->
    <el-form size="small" ref="formRef" :model="form" label-width="150px">
      <div class="common-form">支付宝</div>
      <el-form-item
        label="支付宝姓名"
        :rules="[{ required: true, message: '请输入支付宝姓名' }]"
        prop="alipay_name"
      >
        <el-input
          v-model="form.alipay_name"
          placeholder="请输入支付宝姓名"
          class="max-w460"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="支付宝账号"
        prop="alipay_account"
        :rules="[{ required: true, message: '请输入支付宝账号' }]"
      >
        <el-input
          v-model="form.alipay_account"
          placeholder="请输入支付宝账号"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <div class="common-form">银行</div>
      <el-form-item
        label="开户行名称"
        prop="bank_name"
        :rules="[{ required: true, message: '请输入开户行名称' }]"
      >
        <el-input
          v-model="form.bank_name"
          placeholder="请输入开户行名称"
          class="max-w460"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="银行开户名"
        prop="bank_account"
        :rules="[{ required: true, message: '请输入银行开户名' }]"
      >
        <el-input
          v-model="form.bank_account"
          placeholder="请输入银行开户名"
          class="max-w460"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="银行卡号"
        prop="bank_card"
        :rules="[{ required: true, message: '请输入银行卡号' }]"
      >
        <el-input
          v-model="form.bank_card"
          placeholder="请输入银行卡号"
          class="max-w460"
        ></el-input>
      </el-form-item>
      <!-- <div class="common-form">微信</div>
      <el-form-item label="微信姓名" :rules="[{ required: true, message: '请输入微信姓名' }]">
        <el-input v-model="form.weixin_name" placeholder="请输入微信姓名" class="max-w460"></el-input>
      </el-form-item>

      <el-form-item label="微信账号" :rules="[{ required: true, message: '请输入微信账号' }]">
        <el-input v-model="form.weixin_account" placeholder="请输入微信账号" class="max-w460"></el-input>
      </el-form-item> -->
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :disabled="loasing_submit"
          >提交</el-button
        >
      </div>
    </el-form>

    <!--上传图片-->
    <Upload
      v-if="isupload"
      :isupload="isupload"
      :config="{ total: 3 }"
      @returnImgs="returnImgsFunc"
    ></Upload>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from "vue";
import { getAccount, setAccount } from "@/api/cash.js";
import Upload from "@/components/file/Upload.vue";
import { isArray } from "@/utils/validate";
export default defineComponent({
  components: {
    Upload,
  },
  setup() {
    const state = reactive({
      /*是否正在加载*/
      loading: true,
      /*是否在提交*/
      loasing_submit: false,
      /*表单数据对象*/
      form: {
        alipay_name: "",
        alipay_account: "",
        bank_name: "",
        bank_account: "",
        bank_card: "",
        weixin_name: "",
        weixin_account: "",
      },
      app_id: 10001,
      /*是否打开图片选择*/
      isupload: false,
      /*当前图片类别*/
      img_type: null,
    })
    return {
      ...toRefs(state),
    };
  },
  mounted(){
    this.getParams();
  },
  methods: {
    /*获取配置数据*/
    getParams() {
      this.loading = true;
      getAccount({ app_id: 10001}).then((res) => {
          this.loading = false;
          const { data: { model }} = res;
          this.form = {};
          if(!isArray(model)){
            this.form = model;
          }
          
        })
        .catch(() => {
          this.loading = false;
        });
    },

    /*提交*/
    onSubmit() {
      this.form.app_id = this.app_id;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          setAccount(this.form).then((data) => {
            this.loasing_submit = false;
            ElMessage({
              message: "恭喜你，保存设置成功",
              type: "success",
            });
            this.getParams();
          }).catch(()=>{
            this.loasing_submit = false;
          })
        }
      })
    },

    /*选择图片*/
    chooseImg(e) {
      this.img_type = e;
      this.isupload = true;
    },

    /*关闭选择图片*/
    returnImgsFunc(e) {
      this.isupload = false;
      if (this.img_type != null) {
        this.form[this.img_type + "_image"] = e[0].file_path;
        this.form[this.img_type + "_id"] = e[0].file_id;
        this.img_type = null;
      }
    },
  },
})
</script>

<style></style>
