<template>
  <el-dialog title="会员等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickName" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="等级" :label-width="formLabelWidth">
        <el-select v-model="form.grade_id" placeholder="-请选择等级-">
          <el-option v-for="(item,index) in gradeList" :key="index" :label="item.name" :value="item.grade_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark" placeholder="请输入管理员备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editUser" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {editgrade} from '@/api/user.js';
  export default {
    data() {
      return {
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        loading: false,
        dialogVisible: false,
      };
    },
    props: ['open_edit', 'form', 'gradeList'],
    created() {

      this.dialogVisible = this.open_edit;

    },
    methods: {

      /*修改用户*/
      editUser() {
        let self = this;
        self.loading = true;
        let params = self.form;
        editgrade(params, true)
          .then(data => {
            self.loading = false;
            if (data.code == 1) {
              ElMessage({
                message: '恭喜你，用户修改成功',
                type: 'success'
              });
              self.dialogFormVisible(true);
            }
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*关闭弹窗*/
      dialogFormVisible(e) {
        if (e) {
          this.$emit('closeDialog', {
            type: 'success',
            openDialog: false
          })
        } else {
          this.$emit('closeDialog', {
            type: 'error',
            openDialog: false
          })
        }
      }

    }
  };
</script>

<style></style>
