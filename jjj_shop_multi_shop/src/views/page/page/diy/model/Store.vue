<template>
   <div @click.stop="$parent.$parent.onEditer(index)">
      <div class="drag optional" :class="{selected:index === selectedIndex}" :style="{ background: item.style.background }">
        <div class="diy-shop">
          <div class="diy-head d-b-c">
            <div class="left d-s-c">
              <div class="name">
                线下门店
              </div>
            </div>
          </div>
          <div class="shop-item" :key="index" v-for="(shop, index) in (item.params.source == 'choice' ? item.data : item.defaultData)">
            <div class="shop-item-logo">
              <img v-img-url="shop.logo_image" alt="门店logo">
            </div>
            <div class="shop-item-content">
              <div class="shop-item-title">
                <span>{{ shop.shop_name }}</span>
              </div>
              <div class="shop-item-address">
                <span>门店地址：{{ shop.region.province }}{{ shop.region.city }}{{ shop.region.region }}{{ shop.address }}</span>
              </div>
              <div class="shop-item-phone">
                <span>联系电话：{{ shop.phone }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-edit-del">
          <div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div>
        </div>
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
.diy-shop .diy-head {
    height: 40px;
  }
.diy-shop .diy-head .name {
    font-size: 18px;
    font-weight: bold;
  }
.diy-shop .shop-item{ display: flex; justify-content: flex-start; align-items: center;}
.diy-shop .shop-item-logo, .diy-shop .shop-item-logo img{ width: 60px; height: 60px; border-radius: 50%;}
.diy-shop .shop-item{ padding: 10px;}
.diy-shop .shop-item .shop-item-content{ margin-left: 10px;}
.diy-shop .shop-item .shop-item-title{ font-size: 16px; color:rgb(255, 51, 0);}
.diy-shop .shop-item .shop-item-address{ padding-top: 6px; color: #999999;}
.diy-shop .shop-item .shop-item-phone{ padding-top: 6px; color: #999999;}
</style>
