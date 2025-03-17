<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--底边距-->
      <el-form-item label="底边距："><el-slider v-model="curItem.style.bottom" show-input></el-slider></el-form-item>
      <!--右边距-->
      <el-form-item label="右边距："><el-slider v-model="curItem.style.right" show-input></el-slider></el-form-item>
      <!--不透明度-->
      <el-form-item label="不透明度："><el-slider v-model="curItem.style.opacity" show-input></el-slider></el-form-item>
      <!--客服类型-->
      <el-form-item label="客服类型：">
        <el-radio-group v-model="curItem.params.type">
          <el-radio :label="'chat'">在线聊天(仅微信小程序)</el-radio>
          <el-radio :label="'phone'">拨打电话</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码：">
        <el-input v-model="curItem.params.phone_num"></el-input>
        <div>非微信小程序环境，在线聊天将使用拨打电话</div>
      </el-form-item>
      <!--客服图标-->
      <el-form-item label="客服图标：">
        <el-col class="diy-service-icon"><img v-img-url="curItem.params.image" alt="" @click="$parent.onEditorSelectImage(curItem.params, 'image')" /></el-col>
        <el-col>建议尺寸90×90</el-col>
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
  created() {
    this.curItem.style.bottom = parseInt(this.curItem.style.bottom);
    this.curItem.style.right = parseInt(this.curItem.style.right);
    this.curItem.style.opacity = parseInt(this.curItem.style.opacity);
  },
  methods: {}
};
</script>

<style>
.diy-service-icon,
.diy-service-icon img {
  width: 40px;
  height: 40px;
}
</style>
