<template>
  <div class="right-box d-s-s d-c">
    <div class="lh30 f16 tl">商品排行榜</div>
    <div class="ww100 mt10">
      <el-tabs v-model="activeName" type="card" @tab-change="handleClick">
        <el-tab-pane label="销量TOP10" name="sale"></el-tab-pane>
        <el-tab-pane label="浏览TOP10" name="view"></el-tab-pane>
        <el-tab-pane label="退款TOP10" name="refund"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="list ww100">
      <ul v-if="listData.length>0">
        <li v-for="(item, index) in listData" :key="index" class="d-s-c p-6-0 border-b-d">
          <span class="key-box">{{ index + 1 }}</span>
          <span>
            <template v-if="activeName=='sale'">
              <img v-img-url="item.image.file_path" alt="" class="ml10" />
            </template>
            <template v-if="activeName=='refund'">
              <img v-img-url="item.orderproduct.image.file_path" alt="" class="ml10" />
            </template>
            <template v-if="activeName=='view'">
              <img v-img-url="item.image[0].file_path" alt="" class="ml10" />
            </template>
          </span>
          <span class="text-ellipsis-2 flex-1 ml10">{{ item.product_name }}</span>
          <span class="gray9 tr" style="width: 80px;" >
            <template v-if="activeName=='sale'">
              销量：{{ item.total_sales_num }}
            </template>
            <template v-if="activeName=='view'">
             浏览：{{ item.view_times }}
            </template>
            <template v-if="activeName=='refund'">
              退款：{{ item.refund_count }}
            </template>
           </span>
        </li>
      </ul>
      <div v-else class="tc pt30">暂无上榜记录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'sale',
      /*列表数据*/
      listData: []
    };
  },
  inject: ['dataModel'],
  created() {
    this.listData = this.dataModel.productSaleRanking;
  },
  mounted() {},
  methods: {
    handleClick() {
      if(this.activeName=='sale'){
        this.listData=this.dataModel.productSaleRanking;
      }else if(this.activeName=='view'){
        this.listData=this.dataModel.productViewRanking;
      }else if(this.activeName=='refund'){
        this.listData=this.dataModel.productRefundRanking;
      }
    }
  }
};
</script>

<style scoped="scoped">
.right-box {
  padding: 10px 20px;
  width: 30%;
  box-sizing: border-box;
}
.Echarts > div {
  height: 400px;
}
.right-box .list .key-box {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background: red;
}
.right-box .list img {
  width: 30px;
  height: 30px;
}
</style>
