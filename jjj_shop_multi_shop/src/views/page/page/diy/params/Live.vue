<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--显示数量-->
      <el-form-item label="显示数量：">
          <el-input v-model="curItem.params.showNum" class="w-auto"></el-input>
      </el-form-item>
      <!--组件样式-->
      <div class="p-10-0 mb16 border-b">
          <span class="gray6  f14">组件样式</span>
      </div>
      <!-- 文字颜色 -->
      <el-form-item label="文字颜色：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'color', '#000000')">重置
              </el-button>
          </div>
      </el-form-item>
      <el-form-item label="背景图片：">
        <el-col class="diy-notice-icon">
          <img v-img-url="curItem.style.background_image" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'background_image')">
        </el-col>
        <el-col>建议尺寸700×90</el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: ['curItem', 'selectedIndex'],
  created() {
    console.log(this.curItem);
  },
  methods: {}
};
</script>

<style>
  .diy-notice-icon, .diy-notice-icon img{ width: 350px; height: 45px;}
</style>
