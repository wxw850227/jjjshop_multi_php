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
      <!-- 文字颜色 -->
      <el-form-item label="文字颜色：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'color', '#C9C9C9')">重置
              </el-button>
          </div>
      </el-form-item>
      <el-form-item label="背景图片：">
        <el-col class="diy-notice-icon">
          <img v-img-url="curItem.style.background_image" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'background_image')">
        </el-col>
        <el-col>建议尺寸700×90</el-col>
      </el-form-item>
      <!--组件样式-->
      <div class="p-10-0 mb16 border-b">
        <span class="gray6 f14">组件样式</span>
      </div>
      <!-- 商品排序 -->
      <el-form-item label="显示内容：">
        <el-checkbox v-model="curItem.style.show.productName">商品名称</el-checkbox>
        <el-checkbox v-model="curItem.style.show.assemblePrice">拼团价格</el-checkbox>
        <el-checkbox v-model="curItem.style.show.linePrice">划线价格</el-checkbox>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ['curItem', 'selectedIndex', 'opts'],
    created() {},
    methods: {}
  };
</script>

<style>
</style>
