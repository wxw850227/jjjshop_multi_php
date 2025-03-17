<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-编辑等级
  -->
  <el-dialog title="编辑等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="等级名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="等级权重" :label-width="formLabelWidth" prop="weight" :rules="[{required: true,message: '请输入等级权重'}]">
        <el-input v-model="form.weight" type="number" placeholder="请输入等级权重"></el-input>
        <div class="gray9">权重越大，等级越高</div>
      </el-form-item>
      <el-form-item label="等级折扣" :label-width="formLabelWidth" prop="equity" :rules="[{required: true,message: '请输入等级折扣'}]">
        <el-input type="number" :precision="1" :step="1" :min="0" :max="100" placeholder="请输入等级折扣" v-model="form.equity">
            <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form.is_default==0" label="奖励积分" :label-width="formLabelWidth" prop="give_points" :rules="[{required: true,message: '请输入奖励积分'}]">
        <el-input v-model="form.give_points" type="number" placeholder="请输入奖励积分"></el-input>
        <div class="gray9">升级后奖励会员积分</div>
      </el-form-item>
      <el-form-item label="升级条件" :label-width="formLabelWidth" v-if="form.is_default==0">
        <div class="gray9">满足以下勾选的其中一个条件，会员自动升级到该等级</div>
        <div class="d-s-c mt16">
          <el-checkbox v-model="form.open_money">累计消费满</el-checkbox>
          <el-input v-model="form.upgrade_money" type="number" :disabled="form.open_money==0" style="width: 160px; margin-left: 10px;" ></el-input>
          <span class="ml10">元</span>
        </div>
        <div class="d-s-c mt16">
          <el-checkbox v-model="form.open_points">累计积分满</el-checkbox>
          <el-input v-model="form.upgrade_points" type="number" :disabled="form.open_points==0" style="width: 160px;margin-left: 10px;"></el-input>
          <span class="ml10">个</span>
        </div>
        <div class="d-s-c mt16">
          <el-checkbox v-model="form.open_invite">推荐人数满</el-checkbox>
          <el-input v-model="form.upgrade_invite" type="number" :disabled="form.open_invite==0" style="width: 160px;margin-left: 10px;"></el-input>
          <span class="ml10">人</span>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editGrade" :disabled="submit_loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {editGrade} from '@/api/user.js';
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
      this.form.open_money=this.form.open_money==1?true:false;
      this.form.open_points=this.form.open_points==1?true:false;
      this.form.open_invite=this.form.open_invite==1?true:false;
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
            if(params.is_default==0){
              params.open_money=params.open_money==true?1:0;
              params.open_points=params.open_points==true?1:0;
              params.open_invite=params.open_invite==true?1:0;
            }else{
              delete params.open_money;
              delete params.open_points;
              delete params.open_invite;
              delete params.upgrade_money;
              delete params.upgrade_points;
              delete params.upgrade_invite;
            }
            editGrade(params, true)
              .then(data => {
                self.submit_loading = false;
                ElMessage({
                  message: '恭喜你，等级修改成功',
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
