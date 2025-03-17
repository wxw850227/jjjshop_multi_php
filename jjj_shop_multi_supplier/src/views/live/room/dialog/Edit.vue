<template>
  <el-dialog
    title="修改"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
  >
    <el-form size="small" :model="form" ref="form">
      <el-form-item
        label="虚拟人数"
        :label-width="formLabelWidth"
        prop="name"
        :rules="[{ required: true, message: '请输入虚拟人数' }]"
      >
        <el-input
          type="number"
          v-model="form.virtual_num"
          placeholder="请输入虚拟人数"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="是否置顶"
        prop="audit_status"
        :label-width="formLabelWidth"
      >
        <el-radio v-model="form.is_top" :label="0">未置顶</el-radio>
        <el-radio v-model="form.is_top" :label="1">已置顶</el-radio>
      </el-form-item>
      <el-form-item
        label="是否显示"
        prop="is_delete"
        :label-width="formLabelWidth"
      >
        <el-radio v-model="form.is_delete" :label="0">显示</el-radio>
        <el-radio v-model="form.is_delete" :label="1">隐藏</el-radio>
      </el-form-item>
      <el-form-item
        label="排序"
        :label-width="formLabelWidth"
        prop="sort"
        :rules="[{ required: true, message: '请输入排序' }]"
      >
        <el-input
          type="number"
          v-model="form.sort"
          placeholder="请输入排序"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="confirmFunc" :loading="loading"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { editRoom } from "@/api/live.js";
export default {
  components: {},
  data() {
    var audit_status = (rule, value, callback) => {
      if (value === "" || value === 0) {
        callback(new Error("请选择状态"));
      } else {
        callback();
      }
    };

    return {
      /*左边长度*/
      formLabelWidth: "120px",
      /*是否显示*/
      dialogVisible: false,
      loading: false,
    };
  },
  props: ["open", "form"],
  watch: {
    open: function (n, o) {
      if (n != o) {
        this.dialogVisible = n;
      }
    },
  },
  created() {},
  methods: {
    /*审核*/
    confirmFunc() {
      let self = this;
      let params = self.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;

          editRoom(params, true)
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "修改成功",
                type: "success",
              });
              self.dialogFormVisible(true);
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
        this.$emit("close", true);
      } else {
        this.$emit("close", null);
      }
    },
  },
};
</script>

<style>
.img {
  margin-top: 10px;
}
</style>
