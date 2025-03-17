<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-添加等级
  -->
  <el-dialog title="添加等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="等级名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请输入等级名称'}]">
        <el-input v-model="form.name" placeholder="请输入等级名称"></el-input>
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
      <el-form-item label="奖励积分" :label-width="formLabelWidth" prop="give_points" :rules="[{required: true,message: '请输入奖励积分'}]">
        <el-input v-model="form.give_points" type="number" placeholder="请输入奖励积分"></el-input>
        <div class="gray9">升级后奖励会员积分</div>
      </el-form-item>
      <el-form-item label="升级条件" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="addGrade()" :disabled="submit_loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addgrade} from '@/api/user.js';
  export default {
    data() {
      return {
        form: {
          /*昵称*/
          name: '',
          /*等级折扣*/
          equity: '',
          /*是否打开累计消费满*/
          open_money:0,
          /*累计消费满*/
          upgrade_money:0,
          /*是否打开累计积分满*/
          open_points:0,
          /*累计积分满*/
          upgrade_points:0,
          /*是否推荐人数满*/
          open_invite:0,
          /*推荐人数满*/
          upgrade_invite:0,
          /*等级权重*/
          weight: 100,
          give_points: 0
        },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        /*是否正在提交*/
        submit_loading: false,
      };
    },
    props: ['open_add'],
    created() {
      this.dialogVisible = this.open_add;
    },
    methods: {

      /*添加等级*/
      addGrade() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            params.open_money=params.open_money==true?1:0;
            params.open_points=params.open_points==true?1:0;
            params.open_invite=params.open_invite==true?1:0;
            addgrade(params, true).then(data => {
                self.submit_loading = false;
                ElMessage({
                  message: data.msg,
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
