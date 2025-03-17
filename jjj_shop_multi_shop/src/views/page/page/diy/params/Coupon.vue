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
      <!--显示数量-->
      <el-form-item label="显示数量："><el-slider v-model="curItem.params.limit" :min="1" :max="5" show-input></el-slider></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['curItem', 'selectedIndex', 'opts'],
  created() {
    this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
    this.curItem.params.limit = parseInt(this.curItem.params.limit);
  },
  methods: {}
};
</script>

<style></style>
