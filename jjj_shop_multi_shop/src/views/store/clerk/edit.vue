<template>
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--店员修改-->
      <div class="common-form">店员修改</div>
      <el-form-item label="所属门店">
        <el-select v-model="form.store_id" placeholder="请选择">
          <el-option
            v-for="(item, index) in storeList"
            :key="index"
            :label="item.store_name"
            :value="item.store_id"
          ></el-option>
        </el-select>
        <el-col>
          <el-link :underline="false" disabled
            >请选择店员所属的门店，用于核销订单</el-link
          >
        </el-col>
      </el-form-item>
      <el-form-item
        label="店员姓名"
        prop="real_name"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          class="max-w460"
          v-model="form.real_name"
          placeholder="请输入店员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="mobile"
        :rules="[{ required: true, message: ' ' }]"
      >
        <el-input
          class="max-w460"
          v-model="form.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >提交</el-button
        >
      </div>
    </el-form>

    <!--添加-->
    <GetUser
      :is_open="open_add"
      @close="closeDialogFunc($event, 'add')"
    ></GetUser>
  </div>
</template>

<script>
import { clerkDetail, editClerk } from "@/api/store.js";
import GetUser from "@/components/user/GetUser.vue";
import { formatModel } from "@/utils/base.js";
export default {
  components: {
    /*编辑组件*/
    GetUser,
  },
  data() {
    return {
      /*切换菜单*/
      // activeIndex: '1',
      /*form表单数据*/
      form: {
        clerk_id: null,
        store_id: "",
        status: "",
        real_name: "",
        mobile: "",
      },

      /*是否打开添加弹窗*/
      open_add: false,
      storeList: [],
      loading: false,
    };
  },
  created() {
    this.form.clerk_id = this.$route.query.clerk_id;

    this.getParams();
  },

  methods: {
    getParams() {
      let self = this;
      // 取到路由带过来的参数

      clerkDetail(
        {
          clerk_id: self.form.clerk_id,
        },
        true
      )
        .then((data) => {
          // 将数据放在当前组件的数据内
          self.form = formatModel(self.form, data.data.detail);
          self.form.status = data.data.detail.status.value;
          self.storeList = data.data.store_list;
        })
        .catch((error) => {});
    },
    onSubmit() {
      let self = this;
      let form = self.form;
      self.$refs.form.validate((valid) => {
        if (valid) {
          self.loading = true;
          editClerk(form, true)
            .then((data) => {
              ElMessage({
                message: "恭喜你，修改成功",
                type: "success",
              });
              self.$router.push("/store/clerk/index");
            })
            .catch((error) => {
              self.loading = true;
            });
        }
      });
    },

    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-setting-content {
}

.product-add {
  padding-bottom: 50px;
}
</style>
