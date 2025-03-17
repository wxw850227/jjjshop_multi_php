<template>
  <el-dialog
    title="添加管理员"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >
    <!--form表单-->
    <el-form
      size="small"
      ref="form"
      :model="form"
      :rules="formRules"
      :label-width="formLabelWidth"
    >
      <el-form-item label="用户名" prop="user_name"
        ><el-input
          v-model="form.user_name"
          placeholder="请输入用户名"
        ></el-input
      ></el-form-item>
      <el-form-item label="所属角色" prop="access_id">
        <el-select v-model="form.access_id" :multiple="true">
          <el-option
            v-for="item in roleList"
            :value="item.role_id"
            :key="item.role_id"
            :label="item.role_name_h1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定用户">
        <el-row>
          <el-button @click="addClick" icon="Plus">选择会员</el-button>
          <div v-if="form.user_info.user_id != ''" class="img">
            <img
              :src="form.user_info.user.avatarUrl"
              width="100"
              height="100"
            />
          </div>
        </el-row>
      </el-form-item>
      <el-form-item label="登录密码" prop="password"
        ><el-input
          v-model="form.password"
          placeholder="请输入登录密码"
          type="password"
        ></el-input
      ></el-form-item>
      <el-form-item label="确认密码" prop="confirm_password"
        ><el-input
          v-model="form.confirm_password"
          placeholder="请输入确认密码"
          type="password"
        ></el-input
      ></el-form-item>
      <el-form-item label="姓名" prop="real_name"
        ><el-input v-model="form.real_name"></el-input
      ></el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading"
        >确 定</el-button
      >
    </div>
    <!--添加-->
    <GetUser :is_open="open_add" @close="closeDialogFunc"></GetUser>
  </el-dialog>
</template>

<script>
import { userAdd } from "@/api/auth.js";
import GetUser from "@/components/user/GetUser.vue";
export default {
  data() {
    return {
      /*左边长度*/
      formLabelWidth: "120px",
      /*是否显示*/
      loading: false,
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否显示*/
      dialogVisible: false,
      /*form表单对象*/
      form: {
        user_name: "",
        access_id: [],
        user_id: 0,
        user_info: {
          user: {},
        },
      },
      /*form验证*/
      formRules: {
        user_name: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
        role_id: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
        confirm_password: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
        real_name: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: ["open", "roleList"],
  watch: {
    open: function (n, o) {
      if (n != o) {
        this.dialogVisible = this.open;
      }
    },
  },
  components: {
    GetUser,
  },
  watch: {
    open: function (n, o) {
      if (n != o) {
        this.dialogVisible = this.open;
        this.form = {
          user_name: "",
          access_id: [],
          user_id: 0,
          user_info: {
            user: {},
          },
        };
      }
    },
  },
  methods: {
    /*添加*/
    onSubmit() {
      let self = this;
      self.loading = true;
      let params = self.form;
      userAdd(params, true)
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，添加成功",
            type: "success",
          });

          self.dialogFormVisible(true);
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    addClick() {
      this.open_add = true;
    },
    /*关闭获取用户弹窗*/
    closeDialogFunc(e) {
      if (e && e.type != "error") {
        this.form.user_info = e.params[0];
        this.form.user_id = e.params[0].user_id;
      }
      this.open_add = false;
    },
    /*关闭弹窗*/
    dialogFormVisible(e) {
      if (e) {
        this.$emit("close", {
          type: "success",
          openDialog: false,
        });
      } else {
        this.$emit("close", {
          type: "error",
          openDialog: false,
        });
      }
    },
  },
};
</script>

<style></style>
