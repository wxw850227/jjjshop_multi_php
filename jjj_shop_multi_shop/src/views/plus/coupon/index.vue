<template>
  <div class="common-seach-wrap">
    <!--优惠券列表-->
    <list v-if="activeName == 'list'"></list>
    <!--领取记录-->
    <receive v-if="activeName == 'receive'"></receive>
    <!--发送优惠券-->
    <send v-if="activeName == 'send'"></send>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent } from "vue";
import { useUserStore } from "@/store";
import list from "./coupon/index.vue";
import receive from "./coupon/Receive.vue";
import send from "./coupon/SendCoupon.vue";

export default defineComponent({
  components: {
    list,
    receive,
    send,
  },
  setup() {
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
      activeName: "",
      /*切换数组原始数据*/
      sourceList: [
        {
          key: "list",
          value: "优惠券列表",
          path: "/plus/coupon/coupon/index",
        },
        {
          key: "receive",
          value: "领取记录",
          path: "/plus/coupon/coupon/Receive",
        },
        {
          key: "send",
          value: "发送优惠券",
          path: "/plus/coupon/coupon/SendCoupon",
        },
      ],
      /*权限筛选后的数据*/
      tabList: [],
    });
    return {
      ...toRefs(state),
    };
  },
  created() {
    this.tabList = this.authFilter();

    if (this.tabList.length > 0) {
      this.activeName = this.tabList[0].key;
    }

    if (this.$route.query.type != null) {
      this.activeName = this.$route.query.type;
    }

    /*监听传插件的值*/
    this.bus_on("activeValue", (res) => {
      this.activeName = res;
    });

    //发送类别切换
    let params = {
      active: this.activeName,
      list: this.tabList,
      tab_type: "coupon",
    };
    this.bus_emit("tabData", params);
  },
  beforeUnmount() {
    //发送类别切换
    this.bus_emit("tabData", { active: null, tab_type: "coupon", list: [] });
    this.bus_off("activeValue");
  },
  methods: {
    /*权限过滤*/
    authFilter() {
      let list = [];
      for (let i = 0; i < this.sourceList.length; i++) {
        let item = this.sourceList[i];
        if (this.$filter.isAuth(item.path)) {
          list.push(item);
        }
      }
      return list;
    },
  },
});
</script>

<style></style>
