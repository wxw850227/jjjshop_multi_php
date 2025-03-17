<template>
  <el-form label-width="80px" :model="formmodel">
    <el-form-item label="https://">
      <el-input v-model="formmodel.name" @input="changeFunc"></el-input>
     </el-form-item>
    <el-form-item label="">
      <p>注意一：链接的网页必须支持SSL ，链接必须以 https:// 开头，否则无法跳转</p>
      <p>注意二：链接的域名必须是备案域名，否则无法跳转</p>
      <p>注意三：您的网站域名必须加到微信小程序公众平台的业务域名处,详细说明？</p>
    </el-form-item>
  </el-form>
</template>

<script>
  export default{
    data(){
      return {
        /*form模型*/
        formmodel: {}
      }
    },
    methods:{
      /*选中的值*/
      changeFunc(e){
        //从e中把name和ur赋值到下面的对象
        let boj={
          name:'',
          url:'https://'+e
        }
        this.$emit('changeData',boj);
      }
    }
  }
</script>

<style>
</style>
