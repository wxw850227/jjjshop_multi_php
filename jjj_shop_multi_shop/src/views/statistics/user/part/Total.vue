<template>
  <div class="d-a-c lh30 ww100 pt16">
    <div class="pt30 tc" style="width: 80px;">
      <p class="gray9">今日</p>
      <p class="gray9">昨日</p>
    </div>
    <div class="flex-1 tc">
      <p>累积会员数</p>
      <p class="f20 fb gray3">{{dataModel.user.user_total.today}}</p>
      <p class="gray">{{dataModel.user.user_total.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>新增会员数</p>
      <p class="f20 fb gray3">{{dataModel.user.user_add.today}}</p>
      <p class="gray">{{dataModel.user.user_add.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>成交会员数</p>
      <p class="f20 fb gray3">{{dataModel.user.user_pay.today}}</p>
      <p class="gray">{{dataModel.user.user_pay.yesterday}}</p>
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
