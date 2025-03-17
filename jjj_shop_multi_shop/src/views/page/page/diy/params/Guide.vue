<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--背景颜色-->
      <el-form-item label="背景颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.background"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')">重置</el-button>
        </div>
      </el-form-item>
      <!-- 线条样式 -->
      <el-form-item label="线条样式：">
        <el-radio-group v-model="curItem.style.lineStyle">
          <el-radio :label="'solid'">实线</el-radio>
          <el-radio :label="'dashed'">虚线</el-radio>
          <el-radio :label="'dotted'">点状</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--线条颜色-->
      <el-form-item label="线条颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.lineColor"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'lineColor', '#000000')">重置</el-button>
        </div>
      </el-form-item>
      <!--线条高度-->
      <el-form-item label="线条高度："><el-slider v-model="curItem.style.lineHeight" show-input></el-slider></el-form-item>
      <!--线条高度-->
      <el-form-item label="上下边距："><el-slider v-model="curItem.style.paddingTop" show-input></el-slider></el-form-item>
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
      this.curItem.style.lineHeight = parseInt(this.curItem.style.lineHeight);
      this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
    },
    methods: {

    }
  };
</script>

<style>

</style>
