<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-积分管理
  -->
  <div class="common-seach-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <template #label>
          <span>积分设置</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span>积分明细</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!--积分设置-->
    <Setting v-if="activeName == 'first'"></Setting>
    <!--积分明细-->
    <Log v-if="activeName == 'second'"></Log>
    
  </div>
</template>
<script>
import Setting from './part/Setting.vue';
import Log from './part/Log.vue';
export default {
  components: {
    Setting,
    Log
  },
  data() {
    return {
      form: {
        status: 0
      },
      activeName: 'first'
    };
  },
  methods: {}
};
</script>

<style>

</style>
