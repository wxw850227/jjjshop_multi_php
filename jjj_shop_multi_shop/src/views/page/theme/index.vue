<template> 
  <div class="product-add">
    <div class="phone-theme">
      <img v-show="form.theme=='0'" src="@/assets/img/theme1.jpg">
      <img v-show="form.theme=='1'" src="@/assets/img/theme2.jpg">
      <img v-show="form.theme=='2'" src="@/assets/img/theme3.jpg">
      <img v-show="form.theme=='3'" src="@/assets/img/theme4.jpg">
      <img v-show="form.theme=='4'" src="@/assets/img/theme5.jpg">
      <img v-show="form.theme=='5'" src="@/assets/img/theme6.jpg">
      <img v-show="form.theme=='6'" src="@/assets/img/theme7.jpg">
    </div>
    <el-form size="small" ref="form" :model="form">
      <div class="common-form">主题选择</div>
      <el-form-item label="">
        <el-radio-group v-model="form.theme" class="d-a-c f-w">
          <el-radio class="mb10 mr10" :label="'0'">主题一</el-radio>
          <el-radio class="mb10 mr10" :label="'1'">主题二</el-radio>
          <el-radio class="mb10 mr10" :label="'2'">主题三</el-radio>
          <el-radio class="mb10 mr10" :label="'3'">主题四</el-radio>
          <el-radio class="mb10 mr10" :label="'4'">主题五</el-radio>
          <el-radio class="mb10 mr10" :label="'5'">主题六</el-radio>
          <el-radio class="mb10 mr10" :label="'6'">主题七</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>

</template>

<script>
  import 
  { themeDetail,
  editTheme
  } from '@/api/page.js';
  export default {
    data() {
      return {
        /*是否正在加载*/
        loading: false,
        /*form表单数据*/
        form: {
          theme: 'red',
        },
        all_type: [],
        type: [],
        /*是否打开图片选择*/
        isupload: false,
      };
    },
    created() {
      this.getParams()
    },

    methods: {

      /*获取配置数据*/
      getParams() {
        let self = this;
        themeDetail({}, true).then(res => {
            self.form.theme = res.data.vars.values.theme;
            self.loading = false;
          })
          .catch(error => {

          });
      },


      /*提交*/
      onSubmit() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            editTheme(params, true)
              .then(data => {
                self.loading = false;
                ElMessage({
                  message: '恭喜你，设置成功',
                  type: 'success'
                });
                self.$router.push('/page/theme/index');
              })
              .catch(error => {
                self.loading = false;
              });
          }
        });

      },
    }

  };
</script>
<style lang="scss">
.product-add{
  display: flex;
  padding-bottom: 80px;
  gap: 20px;
  .phone-theme{
    width: 250px;
    img{
      width: 100%;
    }
  }
}
  .mb10 {
    margin-bottom: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .d-c-s {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>
