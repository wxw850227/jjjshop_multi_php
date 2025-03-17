<template>
  <el-dialog
    title="编辑插件"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form size="small" :model="form" ref="form">
      <el-form-item
        label="插件名称"
        :label-width="formLabelWidth"
        :rules="[{ required: true, message: ' ' }]"
        prop="plus_name"
      >
        <el-input
          v-model="form.plus_name"
          autocomplete="off"
          placeholder="请输入插件名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="插件描述" :label-width="formLabelWidth">
        <el-input
          v-model="form.desc"
          autocomplete="off"
          placeholder="请输入插件描述"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="ico图标"
        :label-width="formLabelWidth"
        :rules="[{ required: true, message: ' ' }]"
        prop="ico"
      >
        <el-input
          v-model="form.ico"
          autocomplete="off"
          placeholder="请输入图标名名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="插件分类" :label-width="formLabelWidth">
        <el-select v-model="form.parent_id" placeholder="请选择分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.plus_name"
            :value="item.plus_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="插件URL" :label-width="formLabelWidth">
        <el-input
          v-model="form.url"
          autocomplete="off"
          placeholder="例如：index/index"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="排序"
        :label-width="formLabelWidth"
        :rules="[{ required: true, message: ' ' }]"
        prop="sort"
      >
        <el-input v-model="form.sort" placeholder="请输入数字"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editPlugs" :loading="loading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { plugslist, editplugs } from "@/api/plugs.js";
export default {
  data() {
    return {
      categoryList: [],
      /*左边长度*/
      formLabelWidth: "120px",
      /*是否显示*/
      dialogVisible: false,
      loading: false,
    };
  },
  props: ["open_edit", "form"],
  created() {
    this.dialogVisible = this.open_edit;
    /*获取插件列表*/
    this.getCategoryList();
  },
  methods: {
    /*获取插件*/
    getCategoryList() {
      let self = this;
      let Params = {};
      plugslist(Params, true)
        .then((data) => {
          self.loading = false;
          self.categoryList = data.data.accessList;
        })
        .catch((error) => {});
    },
    /*修改插件*/
    editPlugs() {
      let self = this;
      let params = this.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;
          editplugs(params, true)
            .then((data) => {
              self.loading = false;
              ElMessage({
                message: "恭喜你，修改成功",
                type: "success",
              });
              self.dialogFormVisible(true);
            })
            .catch((error) => {});
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
