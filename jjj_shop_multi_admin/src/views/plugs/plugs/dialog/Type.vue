<template>
  <el-dialog
    title="添加类别"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth"
        ><el-input
          v-model="form.plus_name"
          autocomplete="off"
          placeholder="请输入类别名称"
        ></el-input
      ></el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="addClick()" :loading="loading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addplugs } from "@/api/plugs.js";
export default {
  data() {
    return {
      /*表单数据对象*/
      form: {
        plus_name: "",
      },
      /*左边长度*/
      formLabelWidth: "120px",
      /*是否显示*/
      dialogVisible: false,
      loading: false,
    };
  },
  props: ["open_type"],
  created() {
    this.dialogVisible = this.open_type;
  },
  methods: {
    /*添加插件*/
    addClick() {
      let self = this;
      let params = this.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;
          addplugs(params, true)
            .then((res) => {
              self.loading = false;
              if (res.code == 1) {
                ElMessage({
                  message: "恭喜你，添加成功",
                  type: "success",
                });
                self.dialogFormVisible(true);
              } else {
                self.loading = false;
                ElMessage.error("错了哦，这是一条错误消息");
              }
            })
            .catch((error) => {
              self.loading = false;
            });
        }
      });
    },
    /*关闭弹窗*/
    dialogFormVisible(e) {
      if (e) {
        this.$emit("closeDialog", {
          type: "success",
          openDialog: false,
        });
      } else {
        this.$emit("closeDialog", {
          type: "error",
          openDialog: false,
        });
      }
    },
  },
};
</script>

<style></style>
