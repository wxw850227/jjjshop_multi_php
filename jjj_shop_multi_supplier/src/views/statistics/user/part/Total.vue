<template>
  <div class="d-a-c lh30 ww100 pt16">
    <div class="pt30 tc" style="width: 80px">
      <p class="gray9">今日</p>
      <p class="gray9">昨日</p>
    </div>
    <div class="flex-1 tc">
      <p>商户收藏</p>
      <p class="f20 fb gray3">{{ dataModel.user.fav_store.today }}</p>
      <p class="gray">{{ dataModel.user.fav_store.yesterday }}</p>
    </div>
    <div class="flex-1 tc">
      <p>商品收藏</p>
      <p class="f20 fb gray3">{{ dataModel.user.fav_product.today }}</p>
      <p class="gray">{{ dataModel.user.fav_product.yesterday }}</p>
    </div>
    <div class="flex-1 tc">
      <p>访客数</p>
      <p class="f20 fb gray3">{{ dataModel.user.visit_user.today }}</p>
      <p class="gray">{{ dataModel.user.visit_user.yesterday }}</p>
    </div>
    <div class="flex-1 tc">
      <p>访问量</p>
      <p class="f20 fb gray3">{{ dataModel.user.visit_total.today }}</p>
      <p class="gray">{{ dataModel.user.visit_total.yesterday }}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      /*是否正在加载*/
      loading: true,
    };
  },
  inject: ["dataModel"],
  created() {},
  methods: {},
};
</script>

<style></style>
