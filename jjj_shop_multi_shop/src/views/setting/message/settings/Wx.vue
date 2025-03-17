<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form size="small">
      <div class="table-wrap">
        <div class="operation-wrap">
          <p>配置说明：</p>
          <p>1、微信小程序订阅模板里有的字段才勾选，如果没有请勿勾选。</p>
          <p>2、模板变量替换成微信小程序订阅模板里的字段。</p>
        </div>
        <div>
          <el-form-item label="模板id：">
            <el-input
              size="small"
              class="max-w460"
              v-model="template_id"
              placeholder="请填写申请的微信小程序订阅模板消息idid"
            ></el-input>
          </el-form-item>
        </div>
        <el-table
          border
          ref="fieldTable"
          :data="fieldList"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="字段名称">
            <template #default="scope">
              <label v-text="scope.row.field_name"></label>
            </template>
          </el-table-column>
          <el-table-column label="模板变量名">
            <template #default="scope">
              <el-input
                size="small"
                prop="field_new_ename"
                v-model="scope.row.field_new_ename"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="模板内容">
            <template #default="scope">
              <el-input
                size="small"
                prop="filed_new_value"
                :disabled="scope.row.is_var === 1"
                v-model="scope.row.filed_new_value"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="saveTemplate" :loading="loading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { nextTick } from "vue";
import { fieldList, saveSettings } from "@/api/message.js";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogVisible: false,
      loading: false,
      isupload: false,
      fieldList: [],
      title: "设置小程序消息订阅模板",
      checkList: [],
      settings: {},
      template_id: "",
    };
  },
  props: ["open_wx", "messageModel"],
  mounted() {
    this.$nextTick(function () {
      this.initChecked();
    });
    this.dialogVisible = this.open_wx;
    this.title = this.title + "(" + this.messageModel.message_name + ")";
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      self.loading = true;
      fieldList(
        {
          message_id: self.messageModel.message_id,
          message_type: "wx",
        },
        true
      )
        .then((data) => {
          data.data.list.forEach(function (field) {
            field["field_new_ename"] = field.field_ename;
            field["filed_new_value"] = field.filed_value;
          });
          self.fieldList = data.data.list;
          //设置字段
          if (data.data.settings == null || data.data.settings.length == 0) {
            self.settings = {};
            self.template_id = "";
          } else {
            self.settings = data.data.settings;
            self.template_id = data.data.settings["template_id"];
          }
          self.loading = false;
          nextTick(() => {
            self.initChecked();
          });
        })
        .catch((error) => {});
    },
    saveTemplate() {
      let self = this;
      self.loading = true;
      saveSettings({
        fieldList: self.checkList,
        message_id: self.messageModel.message_id,
        message_type: "wx",
        template_id: self.template_id,
      })
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          self.dialogFormVisible(true);
        })
        .catch((error) => {
          self.loading = false;
        });
    },
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
    handleSelectionChange(val) {
      this.checkList = val;
    },
    initChecked() {
      let self = this;
      if (JSON.stringify(self.settings) == "{}") {
        return;
      }
      Object.keys(self.settings.var_data).forEach(function (key) {
        self.fieldList.forEach(function (field) {
          if (field.field_ename == key) {
            self.$refs.fieldTable.toggleRowSelection(field, true);
            field.field_new_ename = self.settings.var_data[key].field_name;
            field.filed_new_value = self.settings.var_data[key].filed_value;
          }
        });
      });
    },
  },
};
</script>
