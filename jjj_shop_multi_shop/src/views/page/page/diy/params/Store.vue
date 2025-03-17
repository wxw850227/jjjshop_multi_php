<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!-- 商品来源 -->
      <el-form-item label="商品来源：">
        <el-radio-group v-model="curItem.params.source">
          <el-radio :label="'auto'">自动获取</el-radio>
          <el-radio :label="'choice'">手动选择</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--手动选择-->
      <template v-if="curItem.params.source == 'choice'">
        <el-form-item label="门店列表：">
          <div class="choice-shop-list">
            <div :key="index" v-for="(shop, index) in curItem.data" class="item">
              <div class="delete-box"><i class="el-icon-error" @click="$parent.onEditorDeleleData(index, selectedIndex)"></i></div>
              <img v-img-url="shop.image" alt="" />
            </div>
            <div class="item plus-btn" @click.stop="$parent.onSelectProduct(curItem)">
              <i class="el-icon-plus"></i>
              <p>选择门店</p>
            </div>
          </div>
        </el-form-item>
      </template>
      <!-- 自动获取 -->
      <template v-show="curItem.params.source == 'auto'">
        <!-- 展示数量 -->
        <el-form-item label="展示数量："><el-input style="width: auto;" v-model="curItem.params.auto.showNum" class="w-auto"></el-input></el-form-item>
      </template>
      <!-- 背景颜色 -->
      <el-form-item label="背景颜色：">
          <div class="d-s-c">
              <el-color-picker v-model="curItem.style.background"></el-color-picker>
              <el-button type="button" style="margin-left: 10px;"
                  @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')">重置
              </el-button>
          </div>
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
  methods: {}
};
</script>

<style>
.choice-shop-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.choice-shop-list .item {
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border: 1px solid #dddddd;
}
.choice-shop-list .item .delete-box {
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -10px;
  font-size: 20px;
  cursor: pointer;
  color: #999999;
}
.choice-shop-list .item .delete-box:hover {
  color: rgb(255, 51, 0);
}
.choice-shop-list .item.plus-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.choice-shop-list .item.plus-btn > i {
  font-size: 30px;
  color: #cccccc;
}
.choice-shop-list img {
  width: 100%;
  height: 100%;
}
</style>
