<template>
  <el-form label-width="80px" :model="formmodel">
    <el-form-item label="appid "><el-input v-model="formmodel.name"></el-input></el-form-item>
    <el-form-item label="页面路径 "><el-input v-model="formmodel.name"></el-input></el-form-item>
    <el-form-item label="">
      <p>注意一：同一个小程序链接其他小程序，最多只能链接10个，超过将不生效</p>
      <p>注意二：不能填写自身小程序appid</p>
      <p>注意三：小程序链接留空默认跳到小程序首页</p>
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
        this.$emit('changeData',e);
      }
    }
  }
</script>

<style>
</style>
