<template>
  <div class="home" v-loading="loading">
    <div class="d-b-c">
      <div class="operation-wrap">
        <el-row>
          <el-col :span="6" class="d-c-c">
            <div class="grid-content blue">
              <div class="info">
                <h3>{{top_data.order_total}}</h3>
                <p>订单总量</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6" class="d-c-c">
            <div class="grid-content purple">
              <div class="info">
                <h3>{{top_data.product_total}}</h3>
                <p>商品总量</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6" class="d-c-c">
            <div class="grid-content yellow ">
              <div class="info">
                <h3 style="font-size: 32px;">{{Math.floor(top_data.total_money)}}</h3>
                <p>销售总额(元)</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6" class="d-c-c">
            <div class="grid-content orderred">
              <div class="info">
                <h3>{{top_data.fav_count}}</h3>
                <p>商户收藏总数</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="score">
        <div class="score_tit">商户评分</div>
        <ul class="score_list">
          <li class="score_item">描述相符：{{top_data.describe_score}}分</li>
          <li class="score_item">服务态度：{{top_data.server_score}}分</li>
          <li class="score_item">配送服务：{{top_data.express_score}}分</li>
        </ul>
      </div>
    </div>
    <div class="home-index">
      <!--main-index-->
      <div class="main-index">
        <div class="common-form mt16" style="font-size: 18px;">
          今日概况
        </div>
        <el-row class="border-b">
          <el-col :span="6">
            <div class="grid-content">
              <div class="info">
                <p class="des">销售额(元)</p>
                <h3>{{order_data.order_total_price.tday}}</h3>
                <p class="yesterday">昨日：{{order_data.order_total_price.ytd}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="info">
                <p class="des">支付订单数</p>
                <h3>{{order_data.order_total.tday}}</h3>
                <p class="yesterday">昨日：{{order_data.order_total.ytd}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="info">
                <p class="des">下单用户数</p>
                <h3>{{order_data.order_user_total.tday}}</h3>
                <p class="yesterday">昨日：{{order_data.order_user_total.ytd}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="info">
                <p class="des">关注商户人数</p>
                <h3>{{order_data.fav_user_total.tday}}</h3>
                <p class="yesterday">昨日：{{order_data.fav_user_total.ytd}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <div>
          <!--交易统计-->
          <Transaction v-if="!loading"></Transaction>
        </div>
      </div>

      <!--待办事项-->
      <div class="matters-wrap">
        <div class="p-0-30">
          <div class="common-form mt16" style="font-size: 18px;">
            待办事项<span class="ml10 f14 gray" style="font-weight: normal;">请尽快处理，以免影响营业</span>
          </div>
          <el-row class="matters_box">
            <el-col :span="24">
              <div class="matters">
                <div class="box">
                  <div class="title">发货</div>
                  <ul class="matters_item">
                    <li><span class="fb">{{wait_data.order.delivery}}</span>待发货订单</li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="matters">
                <div class="box">
                  <div class="title">售后</div>
                  <ul class="matters_item">
                    <li><span class="fb">{{wait_data.order.refund}}</span>待售后订单</li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="matters">
                <div class="box">
                  <div class="title">商品</div>
                  <ul class="matters_item">
                    <li><span class="fb">{{wait_data.product.audit}}</span>待审核</li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="matters">
                <div class="box">
                  <div class="title">库存</div>
                  <ul class="matters_item">
                    <li><span class="fb">{{wait_data.stock.product}}</span>库存告急</li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getCount} from '@/api/index.js';
  import Transaction from '@/views/home/part/Transaction.vue';
  export default {
    components: {
      Transaction,
    },
    data() {
      return {
        /*是否加载完成*/
        loading: true,
        /*头部数据*/
        top_data: [],
        order_data: {
          order_total_price: [],
          order_total: [],
          order_user_total: [],
          fav_user_total: []
        },
        /*待办事项*/
        wait_data: {
          order: [],
          product: [],
          stock: [],
        },
      };
    },
    created() {
      /*获取数据*/
      this.getData();
    },
    methods: {
      /*获取数据*/
      getData() {
        let self = this;
        getCount(true).then(data => {
          self.loading = false;
          self.top_data = data.data.data.top_data;
          self.order_data = data.data.data.order_data;
          self.wait_data = data.data.data.wait_data;
        }).catch(error => {

        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .operation-wrap {
    width: 100%;
    height: 164px;
    border-radius: 8px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    background-size: 100% 100%;
    color: #FFFFFF;
    margin-right: 15px;
  }
  .home{
    width: 100%;
  }

  .home .operation-wrap .grid-content {
    width: 90%;
    height: 150px;
    justify-content: flex-start;
    align-items: center;
    padding-left: 23px;
  }

  .operation-wrap .grid-content h3 {
    font-size: 36px;
    line-height: 40px;
  }

  .operation-wrap .grid-content .info h3 {
    font-size: 40px;
    line-height: 40px;
    color: #FFFFFF;
    text-align: left;
    margin-bottom: 20px;
  }

  .home .operation-wrap .grid-content .info {
    margin-left: 10px;
    text-align: left;
    font-size: 14px;
    color: #FFFFFF;
  }

  .operation-wrap .grid-content .svg-icon {
    color: #FFFFFF;
  }

  .home-index {
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    min-width: 1000px;
    overflow-x: auto;
  }

  .operation-wrap .grid-content.blue {
    background: url(../../../static/imgs/total_order.png) no-repeat;
    background-size: 100% 100%;
  }

  .operation-wrap .grid-content.yellow {
    background: url(../../../static/imgs/total_user.png) no-repeat;
    background-size: 100% 100%;
  }

  .operation-wrap .grid-content.purple {
    background: url(../../../static/imgs/total_volume.png) no-repeat;
    background-size: 100% 100%;
  }

  .operation-wrap .grid-content.orderred {
    background: url(../../../static/imgs/total_shop.png) no-repeat;
    background-size: 100% 100%;
  }

  .operation-wrap .grid-content .info h3 {
    font-size: 40px;
    line-height: 40px;
    color: #FFFFFF;
    text-align: left;
    margin-bottom: 20px;
  }

  .operation-wrap .grid-content .info {
    margin-left: 10px;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
  }

  .operation-wrap .grid-content .svg-icon {
    color: rgba(255, 255, 255, .3);
    font-size: 300%;
  }

  .main-index {
    flex: 1;
  }

  .main-index .grid-content,
  .operation-wrap .grid-content {

    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .main-index .grid-content {
    height: 120px;
  }

  .main-index .grid-content .pic {
    margin-right: 10px;
  }

  .main-index .grid-content h3 {
    font-size: 20px;
    font-weight: normal;
  }

  .main-index .grid-content .yesterday {
    color: #ccc;
  }

  .main-index .grid-content .svg-icon {
    color: #3a8ee6;
  }

  .matters-wrap {
    padding-bottom: 15px;
    width: 40%;
  }

  .matters .box {
    width: 100%;
  }

  .matters-wrap .matters {
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // height: 120px;
    margin-bottom: 30px;
  }

  .matters-wrap .matters .title {
    font-size: 16px;
    color: #333333;
    display: inline-block;
    height: 20px;
    line-height: 0;
    padding: 11px;
    text-align: center;
    margin-bottom: 20px;
  }

  .matters-wrap .matters ul {
    color: #999999;
  }

  .matters-wrap .matters ul span {
    padding-right: 6px;
    color: #3a8ee6;
  }

  .score {
    width: 240px;
    // height: 164px;
    box-shadow: inherit;
    border: 1px solid #f1f1f1;
    border-radius: 8px;
    background-color: #fff;

    .score_tit {
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      position: relative;
      height: 42px;
      line-height: 42px;
      padding: 0 15px;
      border-bottom: 1px solid #f6f6f6;
      color: #333;
      border-radius: 2px 2px 0 0;
      font-size: 14px;
    }

    .border-b {
      display: flex;
      flex-direction: column;
    }

    .score_list {
      position: relative;
      padding: 15px 15px;
      line-height: 28px;

      .score_item {
        color: #333;
        text-decoration: none;
      }

    }
  }

  .grid-content .info h3 {
    font-weight: bold;
    color: #5d75e3;
    text-align: center;
  }

  .grid-content .info .des {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .grid-content .info .yesterday {
    font-size: 13px;
    text-align: center;
  }

  .matters_box {
    width: 57%;
    border-top: 1px solid #d9d9d9;
    padding-top: 20px;
  }

  .matters-wrap .matters_item li .fb {
    font-size: 16px;
    color: #5d75e3;
  }

  .matters_item li {
    width: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
  }
</style>
