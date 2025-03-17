<template>
 <div class="drag optional " :class="{ selected: index === selectedIndex }"
    @click.stop="$parent.$parent.onEditer(index)">
    <div class="diy-sharpproduct" :style="{ background: item.style.background }">
      <div class="sharpproduct-head d-b-c" :style="'background: url('+item.style.background_image+');'">
        <div class="left d-s-c">
          <div class="name"> </div>
          <div class="datetime d-s-c">
            <div class="daybox hour"
              :style="{ background: item.style.countdown_back_color,color: item.style.countdown_color}">12天</div>
            <span class="hour" :style="{color: item.style.color}">30</span>
            <span class="text" :style="{ color: item.style.color }">:</span>
            <span class="hour" :style="{color: item.style.color}">00</span>
            <span class="text" :style="{ color: item.style.color }">:</span>
            <span class="hour" :style="{color: item.style.color}">00</span>
          </div>
        </div>
        <div class="right mr10">更多</div>
      </div>
      <ul class="product-list column__3" :style="getUlwidth(item)">
        <li class="product-item" v-for="(product, index) in item.data" :key="index">
          <!-- 两列三列 -->
          <div class="product-cover"><img v-img-url="product.image" /></div>
          <div class="product-info p-0-10">
            <div class="price d-b-c f12 tc">
              <div v-if="item.style.show.floorPrice == '1'">
                <div class="red">¥120</div>
                <div v-if="item.style.show.originalPrice == '1'" class="gray6 text-d-line">¥233</div>
              </div>
            </div>
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
  // import ProductApi from '@/api/product.js';
  export default {
    data() {
      return {
        /*商品列表*/
        tableData: [],
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
          return 'width:' + w + 'px;';
        }
      }
    }
  };
</script>

<style>
  .diy-sharpproduct {
    padding: 10px;
  }

  .diy-sharpproduct .product-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: linear-gradient(180deg, #F4DCD2 0%, #FFFFFF 100%);
    box-shadow: 0px 4px 2px 0px rgba(6, 0, 1, 0.03);
  }

  .diy-sharpproduct .product-list .product-title {
    margin-top: 4px;
    height: 20px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .diy-sharpproduct .display__list .column__3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
  }

  .diy-sharpproduct .product-list.column__3 .product-item {
    width: 66px;
    margin-bottom: 10px;
    margin-right: 23px;
    padding: 10px;
  }

  .diy-sharpproduct .product-list.column__3 .product-item .product-cover {
    width: 66px;
    height: 66px;
    border-radius: 6px;
    overflow: hidden;
  }

  .diy-sharpproduct .product-list.column__3 .product-item .product-cover img {
    width: 66px;
    height: 66px;
  }

  .diy-sharpproduct .product-list.column__3 .product-title {
    height: 20px;
    overflow: hidden;
  }

  .diy-sharpproduct .sharpproduct-head {
    height: 45px;
    align-items: center;
    background-size: 100% 100% !important;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
	overflow: hidden;
	
  }

  .sharpproduct-head .name {
    font-size: 18px;
    font-weight: bold;
    width: 100px;
  }

  .sharpproduct-head .datetime {
    margin-left: 20px;
  }

  .sharpproduct-head .datetime>span {
    display: inline-block;
  }

  .sharpproduct-head .datetime .text {
    padding: 0 2px;
  }

  .sharpproduct-head .datetime .box {
    padding: 2px;
    background: #000000;
    color: #ffffff;
  }

  .diy-sharpproduct .product-list .barginbtns {
    width: 100px;
    background: linear-gradient(90deg, #FF4545 0%, #F6220C 100%);
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    text-align: center;
    color: #FFFFFF;
    margin: 0 auto;
    border-radius: 13px;
  }

  .left .datetime {
    padding: 1px;
    border-radius: 200px 0 200px 200px;
    border: 1px solid #EEEEEE;
    padding-right: 4px;
  }

  .left .datetime .daybox {
    padding: 0 10px;
    border-radius: 200px;
    margin-right: 5px;
  }
</style>
