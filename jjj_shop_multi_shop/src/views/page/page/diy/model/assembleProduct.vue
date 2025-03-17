<template>
 <div class="drag optional" :class="{ selected: index === selectedIndex }"
    @click.stop="$parent.$parent.onEditer(index)">
    <div class="diy-sharpproduct" style="background: #ffffff">
      <div class="sharpproduct-head d-b-c">
        <img v-img-url="item.style.background_image" />
      </div>
      <ul class="product-list assemble" :class="['column__3']" :style="getUlwidth(item)">
        <li class="product-item" v-for="(product, index) in item.data" :key="index">
          <div v-if="item.style.show.productName == '1'" class="product-title">{{ product.product_name }}</div>
          <div class="d-b-s">
            <div class="product-cover">
              <img v-img-url="product.image" />
              <div class="desc-situation product-sale">
                <span class="">2人团</span>
              </div>
            </div>
            <div class="flex-1">
              <div class="">
                <div class="f12">
                  <div>
                    <span v-if="item.style.show.assemblePrice == '1'" style="color:#f6220c;" class="f12">¥</span><span
                      style="color:#f6220c;" class="f16 fb" v-if="item.style.show.assemblePrice == '1'">233.00</span>
                  </div>
                  <div v-if="item.style.show.linePrice == '1'" class="text-d-line-through gray9">¥233</div>
                </div>
              </div>
              <div class="assemble_btns">去开团</div>
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

<style scoped>
  .diy-sharpproduct {
    padding: 3px 10px;
    background-color: #F2F2F2;
  }

  .diy-sharpproduct .product-list.assemble {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: #FFFFFF;
  }

  .diy-sharpproduct .product-list.assemble .product-title {
    height: 40px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-bottom: 18px;
  }

  .diy-sharpproduct .product-list.assemble .price {
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: center;
  }

  .diy-sharpproduct .display__list .column__3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .diy-sharpproduct .product-list.assemble.column__3 {
    overflow-x: scroll;
    flex-wrap: nowrap;
    background: #FFFFFF;
  }

  .diy-sharpproduct .product-list.assemble.column__3 .product-item {
    width: 221px;
    margin-right: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    background: #ffffff;
    flex-shrink: 0;
    margin-right: 10px;
    background: linear-gradient(180deg, #FFEFE8 0%, #FFFFFF 100%);
    padding: 15px;
    box-sizing: border-box;
  }

  .diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover {
    width: 63px;
    height: 57px;
    border-radius: 3px;
    background-color: #f6f6f6;
    overflow: hidden;
    position: relative;
  }

  .diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover img {
    width: 63px;
    height: 57px;
    border-radius: 3px;
  }

  .diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover .desc-situation {
    position: absolute;
    bottom: 1px;
    left: 1px;
    background: linear-gradient(60deg, #FC4528 0%, #FC573C 43%, #FC7639 100%);
    color: #FFFFFF !important;
    padding: 0 3px;
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .diy-sharpproduct .product-list.assemble.column__3 .product-title {
    margin: 0 auto;
    margin-bottom: 8px;
    width: 100%;
    height: 36px;
    line-height: 18px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 12px;
  }

  .sharpproduct-head {
    height: 40px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .sharpproduct-head .name.assemble_name {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
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

  .diy-sharpproduct .product-list.assemble .assemble_btns {
    line-height: 20px;
    font-size: 10px;
    text-align: center;
    color: #FFFFFF;
    width: 63px;
    height: 20px;
    background: #FF4C01;
    border-radius: 10px;
  }
</style>
