<template>
  <div class="d-s-s">
    <!--分类不同样式展示-->
    <div class="model-container">
      <div class="img-box">
        <el-image v-if="formData.category_style==10" :src="category_10" fit="fill"></el-image>
        <el-image v-if="formData.category_style==20" :src="category_20" fit="fill"></el-image>
        <el-image v-if="formData.category_style==30" :src="category_30" fit="fill"></el-image>
      </div>
    </div>
    <!--图片展示参数-->
    <div class="param-container flex-1">
      <div class="common-form"><span>展示设置</span></div>
      <el-form size="small" :model="formData" label-width="100px">
        <el-form-item label="分类页样式：">
          <el-radio-group v-model="formData.category_style">
            <el-radio :label="10">一级分类(大图)</el-radio>
            <el-radio :label="20">一级分类(小图)</el-radio>
            <el-radio :label="30">二级分类</el-radio>
          </el-radio-group>
          <p class="gray9">建议：一级分类(大图)尺寸建议710*300，其它均为等比图片即可，如：240*240</p>
        </el-form-item>
        <el-form-item label="分享标题："><el-input v-model="formData.share_title"></el-input></el-form-item>
      </el-form>
    </div>

    <!--提交-->
    <div class="common-button-wrapper"><el-button size="small" type="primary" @click="Submit()">保存</el-button></div>
  </div>
</template>

<script>
  import { getCategory,
  postCategory} from '@/api/page.js';
  import category_10 from '@/assets/img/category_10.jpg';
  import category_20 from '@/assets/img/category_20.jpg';
  import category_30 from '@/assets/img/category_30.jpg';
export default {
  data() {
    return {
      /*表单数据对象*/
      formData: {
        category_style: null
      },
      /*展示样式*/
      category_10:category_10,
      category_20:category_20,
      category_30:category_30,
    };
  },
  created() {

    this.getData();

  },
  methods: {

    /*获取数据*/
    getData() {
      let self = this;
      getCategory({}, true).then(res => {
        self.formData=res.data.model;
      }).catch(error => {
        self.loading = false;
      });
    },

    /*提交*/
    Submit() {
      let self = this;
      self.loading = true;
      let Params = self.formData;
      postCategory(Params,true)
        .then(data => {
          self.loading = false;
          ElMessage({
            message: '恭喜你，修改成功',
            type: 'success'
          });
          self.getData();
        })
        .catch(error => {
          self.loading = false;
        });
    }
  }
};
</script>

<style scoped="scoped">
.model-container {
  width: 300px;
  height: calc(100vh - 150px);
  margin-right: 30px;
}
.model-container img{width: 100%;}
.model-container .img-box{ box-shadow: 0 0 16px 0 rgba(0,0,0,.1);}
.param-container {
  padding: 20px;
  height: calc(100vh - 150px);
  border: 1px solid #eee;
}
</style>
