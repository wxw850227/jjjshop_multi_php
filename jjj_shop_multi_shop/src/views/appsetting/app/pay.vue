<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <div class="common-form">支付方式设置</div>
      <el-form-item label="选择支付方式">
        <div v-for="(item, key, index) in platform" :label="item.value" :key="index" class="ww100">
          <div class="fb">{{item.name}}</div>
          <el-checkbox-group v-model="form.pay_type[key].pay_type">
            <el-checkbox v-for="(pay_item,pay_index) in item.pay_type" :label="pay_type[pay_item].value" :key="pay_index">{{pay_type[pay_item].name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <div class="common-form">微信支付设置</div>

      <el-form-item label="微信支付商户号 MCHID">
        <el-input v-model="form.mchid" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="微信支付密钥 APIKEY ">
        <el-input v-model="form.apikey" class="max-w460"></el-input>
      </el-form-item>
	  <el-form-item label="证书序列号 SERIAL">
	  	<el-input v-model="form.serial_no" class="max-w460"></el-input>
	  </el-form-item>

      <el-form-item label="apiclient_cert.pem">
        <el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来" v-model="form.cert_pem" class="max-w460"></el-input>
        <div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
      </el-form-item>
      <el-form-item label="apiclient_key.pem">
        <el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来" v-model="form.key_pem" class="max-w460"></el-input>
        <div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper"><el-button type="primary" @click="onSubmit">提交</el-button></div>
    </el-form>
  </div>
</template>

<script>
import {payDetail,editPay} from '@/api/appsetting.js';
import {deepClone, formatModel} from '@/utils/base.js'
export default {
  data() {
    return {
      form: {
        pay_type: [],
        mchid: '',
        apikey: '',
        cert_pem: '',
        key_pem: '',
        serial_no: ''
      },
      app: {},
      pay_type: [],
      platform: []
    };
  },
  created() {
    this.getData();
  },

  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      payDetail({}, true)
        .then(res => {
          self.app = res.data.app;
          self.pay_type = res.data.pay_type;
          self.platform = res.data.platform;
          self.form = formatModel(self.form, res.data.app);
          console.log(self.form);
          if(self.app.pay_type == null || self.app.pay_type == ''){
            self.form.pay_type = deepClone(res.data.platform);
          }else{
            self.form.pay_type = deepClone(self.app.pay_type);
            Object.getOwnPropertyNames(self.form.pay_type).forEach(function(key){
              for(let i=0;i<self.form.pay_type[key].pay_type.length;i++){
                if(self.form.pay_type[key].pay_type[i] && self.form.pay_type[key].pay_type[i].length > 0){
                  self.form.pay_type[key].pay_type[i] = parseInt(self.form.pay_type[key].pay_type[i])
                }  
              }
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //提交表单
    onSubmit() {
      let self = this;
      let params = self.form;
      editPay(params, true)
        .then(data => {
          ElMessage({
            message: '恭喜你，设置成功',
            type: 'success'
          });
        })
        .catch(error => {});
    },
  }
};
</script>
 
<style scoped>
::v-deep(.el-checkbox__input){
  transform: scale(1.2);
}
.fb{
  height: 32px;
  line-height: 32px;
}
</style>
