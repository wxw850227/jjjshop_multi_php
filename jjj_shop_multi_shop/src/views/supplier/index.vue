<template>
  <div class="common-seach-wrap">
    <!--商户列表-->
    <List v-if="activeName === 'list'" />
    <!--提现记录-->
    <Cash v-if="activeName === 'cash'" />
  </div>
</template>

<script>
import { ref, onBeforeUnmount, onMounted, watch } from "vue";
import { useUserStore } from "@/store";
import List from "./supplier/index.vue";
import Cash from "./supplier/cash.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    List,
    Cash,
  },
  setup() {
    const { bus_on, bus_emit, bus_off } = useUserStore();
    const router = useRoute();
    const isAuth = (path) => {};
    const loading = ref(true);
    const form = ref({});
    const param = ref({});
    const activeName = ref("list");
    const sourceList = [
      {
        key: "list",
        value: "商户列表",
        path: "/supplier/index",
      },
      {
        key: "cash",
        value: "提现记录",
        path: "/supplier/supplier/cash",
      },
    ];
    const tabList = ref([]);
    const authFilter = () => {
      const list = [];
      for (const element of sourceList) {
        const item = element;
        if (isAuth(item.path)) {
          list.push(item);
        }
      }
      return list;
    };

    onMounted(() => {
      tabList.value = authFilter();

      if (tabList.value.length > 0) {
        activeName.value = tabList.value[0].key;
      }

      if (router.query.type !== null) {
        activeName.value = router.query.type;
      }

      /*监听传插件的值*/
      const onActiveValue = (res) => {
        activeName.value = res;
      };
      bus_on("activeValue", onActiveValue);

      //发送类别切换
      const params = {
        active: activeName.value,
        list: tabList.value,
        tab_type: "supplier",
      };
      bus_emit("tabData", params);
    });

    onBeforeUnmount(() => {
      //发送类别切换
      bus_emit("tabData", { active: null, tab_type: "supplier", list: [] });
      bus_off("activeValue", onActiveValue);
    });

    watch(activeName, (newValue, oldValue) => {});

    return {
      loading,
      form,
      param,
      activeName,
      tabList,
    };
  },
  methods: {
    /*权限过滤*/
    authFilter() {
      const list = [];
      for (const element of this.sourceList) {
        const item = element;
        if (isAuth(item.path)) {
          list.push(item);
        }
      }
      return list;
    },
  },
};
</script>

<style>
.operation-wrap {
  height: 124px;
  border-radius: 8px;
  justify-content: center;
  padding: 30px 30px;
  flex-direction: column;
  overflow: hidden;
  background: #909399;
  background-size: 100% 100%;
  color: #fff;
}
</style>
