<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-签到有礼
  -->
  <div class="common-seach-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane label="签到设置" name="setting"> </el-tab-pane>
      <el-tab-pane label="签到记录" name="receive"> </el-tab-pane>
    </el-tabs>

    <!--签到设置-->
    <Setting v-if="activeName == 'setting'"></Setting>

    <!--签到记录-->
    <Receive v-if="activeName == 'receive'"></Receive>
  </div>
</template>
<script>
import Setting from "./setting/Setting.vue";
import Receive from "./receive/Receive.vue";
export default {
  components: {
    Setting,
    Receive,
  },
  data() {
    return {
      form: {
        status: 0,
      },
      /*当前选中*/
      activeName: "setting",
    };
  },
  methods: {},
};
</script>

<style></style>
