<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-编辑等级
  -->
  <el-dialog title="编辑等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="标签名称" :label-width="formLabelWidth" prop="tag_name" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.tag_name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editGrade" :disabled="submit_loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {editTag} from '@/api/tag.js';
  export default {
    data() {
      return {
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        /*是否正在提交*/
        submit_loading: false,
      };
    },
    props: ['open_edit', 'form'],
    created() {
      this.dialogVisible = this.open_edit;
    },
    methods: {
      /*修改用户*/
      editGrade() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            editTag(params, true)
              .then(data => {
                self.submit_loading = false;
                ElMessage({
                  message: '恭喜你，修改成功',
                  type: 'success'
                });
                self.dialogFormVisible(true);

              })
              .catch(error => {
                self.submit_loading = false;
              });

          }
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
