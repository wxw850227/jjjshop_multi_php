<template>
  <div class="d-a-c lh30 ww100 pt16">
    <div class="pt30 tc" style="width: 80px;">
      <p class="gray9">今日</p>
      <p class="gray9">昨日</p>
    </div>
    <div class="flex-1 tc">
      <p class="lh30">在售商品</p>
      <p class="f20 fb gray3">{{dataModel.product.sale.today}}</p>
      <p class="gray">{{dataModel.product.sale.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>未付款商品(件)</p>
      <p class="f20 fb gray3">{{dataModel.product.no_pay.today}}</p>
      <p class="gray">{{dataModel.product.no_pay.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>已付款商品(件)</p>
      <p class="f20 fb gray3">{{dataModel.product.pay.today}}</p>
      <p class="gray">{{dataModel.product.pay.yesterday}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        /*是否正在加载*/
        loading: true,

      };
    },
    inject: ['dataModel'],
    created() {

    },
    methods: {


    }
  };
</script>

<style></style>
