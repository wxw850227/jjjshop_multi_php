<template>
  <div class="common-seach-wrap">
    <!--优惠券列表-->
    <List v-show="activeName=='list'"></List>
    <!--领取记录-->
    <Receive v-show="activeName=='receive'"></Receive>
    <!--发送优惠券-->
    <SendCoupon v-show="activeName=='send'"></SendCoupon>
  </div>
</template>
<script>
  //import bus from '@/utils/eventBus.js';
  import { reactive, toRefs, defineComponent } from 'vue';
  import { useUserStore } from "@/store";
  import List from './coupon/index.vue';
  import Receive from './coupon/Receive.vue';
  import SendCoupon from './coupon/SendCoupon.vue';
  export default defineComponent({
    components: {
      List,
      Receive,
      SendCoupon
    },
    setup(){
      const { bus_emit, bus_off, bus_on } = useUserStore();
      const state = reactive({
        bus_emit,
        bus_off,
        bus_on,
        /*是否加载完成*/
        loading: true,
        form: {},
        /*参数*/
        param: {},
        /*当前选中*/
        activeName: '',
        /*切换数组原始数据*/
        sourceList: [
            {
                key: 'list',
                value: '优惠券列表',
                path:'/coupon/coupon/index'
            },
            {
                key: 'receive',
                value: '领取记录',
                path:'/coupon/coupon/receive'
            },
            {
                key: 'send',
                value: '发送优惠券',
                path:'/coupon/coupon/SendCoupon'
            }
        ],
        /*权限筛选后的数据*/
        tabList:[],
      })
      return {
        ...toRefs(state),
      };
    },
    mounted() {
      this.init();
    },
    beforeDestroy () {
        //发送类别切换
      this.bus_emit('tabData', {active: null,tab_type:'coupon', list: []});
      this.bus_off('activeValue');
    },
    methods: {
      init(){
        this.tabList = this.authFilter();

        if(this.tabList.length>0){
          this.activeName=this.tabList[0].key;
        }

        if (this.$route.query.type != null) {
          this.activeName = this.$route.query.type;
        }

        /*监听传插件的值*/
        bus.$on('activeValue', res =>
        {
            this.activeName = res;
        });

        //发送类别切换
        let params = {
            active: this.activeName,
            list: this.tabList,
            tab_type:'coupon'
        }
        bus.$emit('tabData', params);
      },
      /*权限过滤*/
      authFilter(){
        let list=[];
        for(let i=0;i<this.sourceList.length;i++){
          let item=this.sourceList[i];
          if(this.$filter.isAuth(item.path)){
            list.push(item);
          }
        }
        return list;
      },

    }
  });
</script>

<style>
  .operation-wrap {
    height: 124px;
    border-radius: 8px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 30px 30px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    background: #909399;
    background-size: 100% 100%;
    color: #fff;
  }
</style>
