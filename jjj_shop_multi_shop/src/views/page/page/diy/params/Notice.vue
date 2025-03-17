<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--上下边距-->
      <el-form-item label="上下边距："><el-slider v-model="curItem.style.paddingTop" show-input></el-slider></el-form-item>
      <!--背景颜色-->
      <el-form-item label="背景颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.background"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')">重置</el-button>
        </div>
      </el-form-item>
      <!--文字颜色-->
      <el-form-item label="文字颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.textColor"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'textColor', '#000000')">重置</el-button>
        </div>
      </el-form-item>
      <!--公告图标-->
      <el-form-item label="公告图标：">
        <el-col class="diy-notice-icon">
          <img v-img-url="curItem.params.icon" alt="" @click="$parent.onEditorSelectImage(curItem.params, 'icon')">
        </el-col>
        <el-col>建议尺寸32×32</el-col>
      </el-form-item>
      <!-- 公告内容 -->
      <el-form-item label="公告内容：">
        <el-input v-model="curItem.params.text" class="w-auto"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    props: ['curItem', 'selectedIndex', 'opts'],
    created() {
      this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
    },
    methods: {

    }
  };
</script>

<style>
.diy-notice-icon, .diy-notice-icon img{ width: 32px; height: 32px;}
</style>
