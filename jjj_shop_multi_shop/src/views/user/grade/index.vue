<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-积分管理
  -->
  <div class="common-seach-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane name="list">
        <template #label>
          <span>等级列表</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="log">
        <template #label>
          <span>升级日志</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!--积分设置-->
    <List v-if="activeName == 'list'"></List>
    <!--积分明细-->
    <Log v-if="activeName == 'log'"></Log>

  </div>
</template>
<script>
import List from './part/list.vue';
import Log from './part/log.vue';
export default {
  components: {
    List,
    Log
  },
  data() {
    return {
      activeName: 'list'
    };
  },
  methods: {}
};
</script>

<style>

</style>
