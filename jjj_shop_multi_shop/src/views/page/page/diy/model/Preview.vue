<template>
<div class="drag optional" :class="{ selected: index === selectedIndex }"
    @click.stop="$parent.$parent.onEditer(index)">
    <div class="diy-preview">
      <div class="diy-head d-b-c" :style="'background: url('+item.style.background_image+');'">
        <div class="left d-s-c">
          <div class="name"> </div>
        </div>
        <div class="right mr10 white">更多</div>
      </div>
      <ul class="product-list column__3"   :style="{ background: item.style.background_color,width: getUlwidth(item)}">
        <li class="product-item" v-for="(product, index) in item.data" :key="index">
          <!-- 两列三列 -->
          <div class="datetime d-s-c"  :style="{ background: item.style.countdown_back_color,color: item.style.countdown_color}">
            <img style="width: 51px;height: 19px;" :src="item.style.top_image" alt="">
            <div class="daybox hour">12天</div>
            <span class="hour">30</span>
            <span class="text">:</span>
            <span class="hour">00</span>
            <span class="text">:</span>
            <span class="hour">00</span>
          </div>
          <div class="d-b-c" style="padding: 7px;">
            <div class="product-info flex-1">
              <div class="price  f12">
                <div class="red"   :style="{ color: item.style.color}">¥{{product.product_price}}起</div>
                <div class="gray3 text-ellipsis">{{product.product_name}}</div>
                <div class="gray6 text-d-line">¥{{product.original_price}}</div>
              </div>
            </div>
            <div class="product-cover"><img v-img-url="product.image" /></div>
          </div>
        </li>
      </ul>
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
        /*分类id*/
        category_id: 0
      };
    },
    created() {},
    props: ['item', 'index', 'selectedIndex'],
    methods: {
      /*计算宽度*/
      getUlwidth(item) {
        if (item.style.display == 'slide') {
          let total = 0;
          if (item.params.source == 'choice') {
            total = item.data.length;
          } else {
            total = item.defaultData.length;
          }
          let w = 0;
          if (item.style.column == 2) {
            w = total * 150;
          } else {
            w = total * 100;
          }
          return  w + 'px;';
        }
      }
    }
  };
</script>

<style>
  .diy-preview {
    padding: 10px;
    border-radius: 10px;
  }

  .diy-preview .diy-head {
    padding: 0 10px;
    height: 45px;
    background-size: 100% 100% !important;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .diy-preview .diy-head .name {
    font-size: 18px;
    font-weight: bold;
    width: 100px;
  }

  .diy-preview .diy-head .datetime {
    margin-left: 20px;
  }

  .diy-preview .diy-head .datetime>span {
    display: inline-block;
  }

  .diy-preview .diy-head .datetime .text {
    padding: 0 4px;
  }

  .diy-preview .diy-head .datetime .box {
    padding: 2px;
    border-radius: 4px;
    background: #000000;
    color: #ffffff;
  }

  .diy-preview .product-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: linear-gradient(180deg, #F4DCD2 0%, #FFFFFF 100%);
    box-shadow: 0px 4px 2px 0px rgba(6, 0, 1, 0.03);
    padding:10px;
    box-sizing: border-box;
    height: 215px;
    box-sizing: border-box;
    flex-direction: column;
    border-radius: 0 0 8px 8px;
  }

  .diy-preview .product-list .product-title {
    margin-top: 4px;
    height: 40px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .diy-preview .display__list .column__3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .diy-preview .product-list.column__3 .product-item {
    width: 150px;
    margin-right: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .diy-preview .product-list.column__3 .product-item .product-cover {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    overflow: hidden;
  }

  .diy-preview .product-list.column__3 .product-item .product-cover img {
    width: 44px;
    height: 44px;
  }

  .diy-preview .product-list.column__3 .product-title {
    height: 20px;
    overflow: hidden;
  }
</style>
