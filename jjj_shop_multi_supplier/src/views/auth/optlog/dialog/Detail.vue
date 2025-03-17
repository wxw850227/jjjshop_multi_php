<template>
  <el-dialog
    title="详情"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-press-escape="false"
  >
    <el-form size="mini" :model="form">
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.title }}</el-col>
      </el-form-item>
      <el-form-item label="id：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.opt_log_id }}</el-col>
      </el-form-item>
      <el-form-item label="用户名：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.user_name }}</el-col>
      </el-form-item>
      <el-form-item label="真实姓名：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.real_name }}</el-col>
      </el-form-item>
      <el-form-item label="url：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.url }}</el-col>
      </el-form-item>
      <el-form-item label="内容：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.content }}</el-col>
      </el-form-item>
      <el-form-item label="ip：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.ip }}</el-col>
      </el-form-item>
      <el-form-item label="agent：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.agent }}</el-col>
      </el-form-item>
      <el-form-item label="添加时间：" :label-width="formLabelWidth">
        <el-col class="item-content-box">{{ form.create_time }}</el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      /*左边长度*/
      formLabelWidth: "140px",
      /*是否显示*/
      dialogVisible: false,
    };
  },
  props: ["open", "form"],
  created() {},
  watch: {
    open: function (n, o) {
      if (n != o && n) {
        this.dialogVisible = this.open;
      }
    },
  },
  methods: {
    /*关闭弹窗*/
    dialogFormVisible(e) {
      this.$emit("close", {});
    },
  },
};
</script>

<style scoped="scoped">
.item-content-box {
  padding-top: 4px;
  line-height: 20px;
  min-height: 20px;
  color: #333333;
  border-bottom: 1px solid #eeeeee;
}
</style>
