<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--上下边距-->
      <el-form-item label="上下边距："><el-slider v-model="curItem.style.paddingTop" show-input></el-slider></el-form-item>
      <!--左右边距-->
      <el-form-item label="左右边距："><el-slider v-model="curItem.style.paddingLeft" :min="0" :max="50" show-input></el-slider></el-form-item>
      <!--背景颜色-->
      <el-form-item label="背景颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.background"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')">重置</el-button>
        </div>
      </el-form-item>
      <!-- 布局方式 -->
      <el-form-item label="布局方式：">
        <el-radio-group v-model="curItem.style.layout">
          <el-radio label="2">堆积两列</el-radio>
          <el-radio label="3">堆积三列</el-radio>
          <el-radio label="4">堆积四列</el-radio>
          <el-radio label="-1">橱窗样式</el-radio>
        </el-radio-group>
        <div v-if="curItem.style.layout==-1" class="red">橱窗样式最多显示四张图片，超出隐藏</div>
        <div class="gray9">请确保所有图片的尺寸/比例相同。</div>
      </el-form-item>
      <el-form-item label="图片：">
        <el-col class="param-img-item" :key="index" v-for="(imageSingle, index) in curItem.data">
          <div class="delete-box">
			  <!-- <i class="el-icon-delete-solid" @click="$parent.onEditorDeleleData(index, selectedIndex)"></i> -->
			  <el-icon @click="$parent.onEditorDeleleData(index, selectedIndex)"><DeleteFilled /></el-icon>
			  </div>
          <div class="pic" style="margin-bottom: 10px;" ><img v-img-url="imageSingle.imgUrl" alt="" @click="$parent.onEditorSelectImage(imageSingle, 'imgUrl')" /></div>

          <div class="d-s-c">
          <div class="url-box flex-1">
            <span class="key-name">链接地址：</span>
            <el-input v-model="imageSingle.name"></el-input>
          </div>
          <div class="url-box ml10">
            <el-button type="primary" @click="changeLink(index)">选择链接</el-button>
          </div>
          </div>

        </el-col>
        <el-col class="d-c-c"><el-button @click="$parent.onEditorAddData">添加一个</el-button></el-col>
      </el-form-item>
    </el-form>
    <Setlink v-if="is_linkset" :is_linkset="is_linkset" @closeDialog="closeLinkset">选择链接</Setlink>
  </div>
</template>

<script>
    import Setlink from '@/components/setlink/Setlink.vue';
  export default {
      components: {
          Setlink,
      },
    data() {
      return {
        /*是否选择链接*/
          is_linkset: false,
          index: null,
      };
    },
    props: ['curItem', 'selectedIndex'],
    created() {
      this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
      this.curItem.style.paddingLeft = parseInt(this.curItem.style.paddingLeft);
    },
    methods: {
      /*选择链接*/
        changeLink(index) {
            this.is_linkset = true;
            this.index = index;
        },
      /*获取链接并关闭弹窗*/
        closeLinkset(e) {
            console.log(e);
            this.is_linkset = false;
            this.curItem.data[this.index].linkUrl=e.url;
//            this.curItem.data[this.index].name=e.name;
            this.curItem.data[this.index].name = '链接到' + ' ' + e.type + ' ' + e.name;
        },
    }
  };
</script>

<style>

</style>
