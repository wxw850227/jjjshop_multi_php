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
      <el-form-item label="时间颜色：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'color', '#ffffff')">重置
              </el-button>
          </div>
      </el-form-item>
      <el-form-item label="日期文字：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.countdown_color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'countdown_color', '#FF02A8')">重置
              </el-button>
          </div>
      </el-form-item>
      <el-form-item label="日期背景：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.countdown_back_color"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'countdown_back_color', '#FEE24F')">重置
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
        <span class="gray6  f14">组件样式</span>
      </div>
      <!-- 商品排序 -->
      <el-form-item label="显示内容：">
        <el-checkbox v-model="productName" @change="checked=>check(checked, 'productName')">商品名称</el-checkbox>
        <el-checkbox v-model="peoples" @change="checked=>check(checked, 'peoples')">正在砍价</el-checkbox>
        <el-checkbox v-model="floorPrice" @change="checked=>check(checked, 'floorPrice')">砍价底价</el-checkbox>
        <el-checkbox v-model="originalPrice" @change="checked=>check(checked, 'originalPrice')">商品原价</el-checkbox>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        /*商品名称*/
        productName: false,
        /*正在砍价*/
        peoples: false,
        /*砍价底价*/
        floorPrice: false,
        /*商品价格*/
        originalPrice: false
      };
    },
    props: ['curItem', 'selectedIndex', 'opts'],
    created() {
      /*获取列表*/
      //this.getData();
      this.productName = this.curItem.style.show.productName == '1' ? true : false;
      this.peoples = this.curItem.style.show.peoples == '1' ? true : false;
      this.floorPrice = this.curItem.style.show.floorPrice == '1' ? true : false;
      this.originalPrice = this.curItem.style.show.originalPrice == '1' ? true : false;
    },
    methods: {
      /*内容是否选择*/
      check(checked, name) {
        let value = checked ? '1' : '0';
        this.curItem.style.show[name] = value;
      },
    }
  };
</script>

<style>
</style>
