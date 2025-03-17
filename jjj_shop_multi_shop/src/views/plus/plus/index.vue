<template>
  <div class="plus-container" v-loading="loading">
    <div v-for="(item, index) in listData" :key="index">
      <div class="common-form">{{ item.name }}</div>
      <div class="plus-list">
        <div
          class="item"
          v-for="(child, num) in item.children"
          :key="num"
          v-auth="child.path"
        >
          <div class="item-box" @click="gotoPath(child)">
            <div class="card">
              <div class="icon iconfont" :class="hasIcon(child.icon)"></div>
              <div class="ml10 r">
                <h3>{{ child.name }}</h3>
                <p>{{ child.remark }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plusList } from "@/api/plus.js";

export default {
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*数据*/
      listData: [],
      /*插件列表数据*/
      list: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      plusList({}, true)
        .then((res) => {
          self.loading = false;
          self.listData = res.data.list;
          //self.buildTree(data.data.list, false);
          console.log(res);
        })
        .catch((error) => {});
    },

    /*构建树结构*/
    buildTree(list, flag) {
      if (!flag) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if (item.parent_id == 0) {
            item.children = [];
            this.list.push(item);
            list.splice(i, 1);
            i--;
          }
        }
      } else {
        for (let i = 0, leng = list.length; i < leng; i++) {
          let item = list[i];
          for (let j = 0, j_leng = this.list.length; j < j_leng; j++) {
            let j_item = this.list[j];
            if (item.parent_id == j_item.plus_id) {
              j_item.children.push(item);
              list.splice(i, 1);
              i--;
              break;
            }
          }
        }
      }

      if (!flag) {
        this.buildTree(list, true);
      }
      return;
    },

    /*生成二级菜单 并把子集的以下全编程二级*/
    /* buildTree(list) {
      for (let i = 0, leng = list.length; i < leng; i++) {
        let item = list[i];
        if (item.parent_id == 0) {
          item.children = [];
          this.list.push(item);
          list.splice(i,1);
          i--;
        } else {
          for (let j = 0, j_leng = this.list.length; j < j_leng; j++) {
            let j_item = this.list[j];
            if (item.parent_id == j_item.plus_id) {
              j_item.children.push(item);
              list.splice(i,1);
              i--;
              break;
            }
            else{
              for(let p=0,p_leng=j_item.children.length;p<p_leng;p++){
                let child=j_item.children[p];
                if(item.parent_id==child.plus_id){
                  j_item.children.push(item);
                  list.splice(i,1);
                  i--;
                  break;
                }
              }
            }
          }
        }
      }
      if(list.length>0){
        this.buildTree(list);
      }
      return;
    }, */

    //判断是否有图标
    hasIcon(e) {
      if (e != null && e.length > 0) {
        return e;
      } else {
        return "icon-chajian1";
      }
    },
    gotoPath(v){
      let path = v.path;
      if(v.redirect_name){
        path = v.redirect_name;
      }
      this.$router.push(path)
    }
  },
};
</script>

<style lang="scss">
.plus-container {
  width: 100%;
  min-height: 400px;
  .item{
    cursor: pointer;
    
    &:hover{
      h3{
        color: #3a8ee6;
      }
    }
  }
  .card{
    display: flex;
    .iconfont {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      line-height: 40px;
      background: #3a8ee6;
      color: #ffffff;
      font-size: 22px;
    }
  }
  .r{
    flex: 1;
    h3 {
      font-weight: normal;
      color: #333333;
      font-size: 14px;
    }
    p{
      font-size: 12px;
      color: #999999;
    }
  }
}
.plus-container .common-form {
  margin-bottom: 0;
}
.plus-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.plus-list .item {
  width: 25%;
}
.plus-list .item .item-box {
  padding: 20px;
}
.plus-list .item .item {
  width: 100%;
  display: flex;
  height: 60px;
  padding-left: 10px;
  justify-content: flex-start;
  align-items: center;
}
</style>
