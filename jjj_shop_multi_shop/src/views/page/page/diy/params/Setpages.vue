<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--页面标题-->
      <el-form-item label="标题类型：">
        <el-radio-group v-model="logo_type" @change="logechange">
          <el-radio :label="'image'">图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--图片-->
      <el-form-item label="图片：">
        <div class="diy-setpages-cover">
          <img  v-if="curItem.style.toplogo" v-img-url="curItem.style.toplogo" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'toplogo')" :style="'background-color:'+curItem.style.titleBackgroundColor+' ;'">
          <div>建议尺寸60×60</div>
        </div>
      </el-form-item>
      <!--页面名称-->
      <el-form-item label="页面名称：">
        <el-input v-model="curItem.params.name"></el-input>
        <p class="gray">页面名称仅用于后台查找</p>
      </el-form-item>
      <!--分享标题-->
      <el-form-item label="分享标题：">
        <el-input v-model="curItem.params.share_title"></el-input>
        <p class="gray">小程序端转发时显示的标题</p>
      </el-form-item>
      <!-- 背景颜色 -->
      <el-form-item label="背景颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.titleBackgroundColor"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'titleBackgroundColor', '#ffffff')">重置</el-button>
        </div>
      </el-form-item>
      <!--页面标题-->
      <el-form-item label="商品分类：">
        <div class="gray9">仅首页有效</div>
        <el-radio-group v-model="curItem.category.open">
           <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 背景颜色 -->
      <el-form-item label="分类颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.category.color"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.category, 'color', '#ffffff')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logo_type: 'image'
      };
    },
    props: ['curItem', 'selectedIndex', 'opts'],
    created() {
      console.log(this.curItem.style.toplogo)
      if(this.curItem.style.toplogo=='text'){
        this.logo_type='image';
      }else{
         this.logo_type='image';
      }
    },
    methods: {
      logechange(e){
        console.log(e)
        if(e == 'text'){
         this.curItem.style.toplogo='text';
        }else{
         this.curItem.style.toplogo='';
        }
      }
    }
  };
</script>

<style>
  .diy-setpages-cover>img{
    width: 60px;
    height: 60px;
  }
</style>
