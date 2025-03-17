<template>
   <div @click.stop="$parent.$parent.onEditer(index)">
    <div class="drag optional" :class="{selected:index === selectedIndex}">
      <div class="diy-article">
        <div class="article-item"
          v-for="(item,index) in (item.params.source == 'choice' ? item.data : item.defaultData)"
          :class="'show-type__' + item.show_type" :key="index">
          <!-- 小图模式 -->
          <template>
            <div class="article-item__image">
              <img v-img-url="item.image" alt="">
            </div>
            <div class="article-item__left flex-1">
              <div class="article-item__title text-ellipsis-2">
                <span class="f18">{{ item.article_title }}</span>
              </div>
              <div class="article-item__footer d-b-c">
                <span class="gray9">
                  {{ item.views_num }}次浏览
                </span>
                <span class="gray9">
                  2022-02-22
                </span>
              </div>
            </div>
          </template>
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
  .diy-article .show-type__10 {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #EEEEEE;
  }

  .diy-article .show-type__10 .article-item__image {
    width: 123px;
    height: 70px;
    border-radius: 3px;
    overflow: hidden;
  }

  .diy-article .show-type__10 .article-item__image>img {
    width: 123px;
    height: 70px;
  }

  .diy-article .show-type__10 .article-item__title {
    height: 40px;
  }
</style>
