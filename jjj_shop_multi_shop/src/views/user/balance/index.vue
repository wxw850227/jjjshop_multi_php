<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-积分管理
  -->
  <div class="common-seach-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane name="log">
        <template #label>
          <span>余额明细</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!--余额明细-->
    <Log v-if="activeName == 'log'"></Log>
  </div>
</template>
<script>
import Log from './part/Log.vue';
export default {
  components: {
    Log
  },
  data() {
    return {
      form: {
        status: 0
      },
      activeName: 'log'
    };
  },
  methods: {}
};
</script>

<style>

</style>
