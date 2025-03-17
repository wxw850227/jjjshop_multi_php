<template>
  <div @click.stop="$parent.$parent.onEditer(index)" class="drag optional" :class="{selected: index === selectedIndex}">
    <div class="diy-coupon" :style="{background:item.style.background,padding: item.style.paddingTop+'px '+' 0'}">
      <div :key="index" v-for="(coupon,index) in item.data" class="coupon-wrapper">
        <div class="coupon-item d-b-c" >
          <i class="before" :style="{background:item.style.background}"></i>
          <div  class="left-content">
            <div class="content-top">
              <span class="">￥</span>
              <span class="f20">{{ coupon.reduce_price }}</span>
            </div>
            <div class="content-bottom">
              <span>满{{ coupon.min_price }}减{{ coupon.reduce_price }}</span>
            </div>
          </div>
          <div class="right-receive">
            <div class="lr-tb">立即领取</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-edit-del">
      <div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    props: ['item', 'index', 'selectedIndex'],
    methods: {

    }
  };
</script>

<style>
  .diy-coupon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
  }

  .diy-coupon .coupon-wrapper {

  }

  .diy-coupon .coupon-wrapper .coupon-item {
    border-radius: 4px;
    overflow: hidden;
    margin-right: 10px;
  }

  .diy-coupon .coupon-wrapper .left-content {
    width: 80px;
    height: 56px;
    padding: 0;
    box-sizing: border-box;
    color: #FFFFFF;
    flex: 1;
    background: #FF4C01;
  }

  .diy-coupon .coupon-wrapper .left-content .price {
    font-size: 20px;
    font-weight: bold;
  }

  .diy-coupon .coupon-wrapper .content-top {
    font-size: 12px;
    text-align: center;
  }
  .diy-coupon .coupon-wrapper .content-bottom{
    font-size: 10px;
    text-align: center;
  }
  .diy-coupon .coupon-wrapper .right-receive {
    height: 56px;
    width: 26px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px dashed #ffffff;
    text-align: center;
    color: #FFF5D4;
    background: #FF4C01;
    font-size: 9px;
    line-height: 10px;

  }
  .lr-tb{
    width: 13px;
  }
</style>
