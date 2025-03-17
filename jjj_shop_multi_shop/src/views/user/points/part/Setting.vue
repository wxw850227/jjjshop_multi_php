<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-积分管理-积分设置
  -->
  <div class="pb50">
    <el-form ref="form" size="small" :model="form" label-width="200px">
      <div class="common-form">积分设置</div>
      <el-form-item label="积分名称 " prop="points_name" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.points_name" autocomplete="off" class="max-w460"></el-input>
        <div class="lh18 mt10 gray9">
          <p>注：修改积分名称后，在买家端的所有页面里，看到的都是自定义的名称</p>
          <p>例：商家使用自定义的积分名称来做品牌运营。如京东把积分称为“京豆”，淘宝把积分称为“淘金币”</p>
        </div>
      </el-form-item>
      <el-form-item label="积分说明" :rules="[{required: true,message: ' '}]">
        <el-input type="textarea" rows="5" v-model="form.describe" autocomplete="off"></el-input>
      </el-form-item>
      <div class="common-form">积分赠送</div>
      <el-form-item label="是否开启购物送积分">
        <el-radio-group v-model="form.is_shopping_gift">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <div class="lh18 mt10 gray9">
          <p>注：如开启则订单完成后赠送用户积分</p>
          <p>积分赠送规则：1.订单确认收货已完成；2.已完成订单超出后台设置的申请售后期限</p>
        </div>
      </el-form-item>
      <el-form-item label="积分赠送比例 " prop="gift_ratio" :rules="[{required: true,message: ' '}]">
        <el-input placeholder="请输入内容" v-model="form.gift_ratio" class="max-w460">
          <template slot="append">%</template>
        </el-input>
        <div class="lh18 mt10 gray9">
          <p> 注：赠送比例请填写数字0~100；订单的运费不参与积分赠送</p>
          <p> 例：订单付款金额(100.00元) * 积分赠送比例(100%) = 实际赠送的积分(100积分)</p>
        </div>
      </el-form-item>
      <div class="common-form">积分抵扣</div>
      <el-form-item label=" 是否允许下单使用积分抵扣 ">
        <el-radio-group v-model="form.is_shopping_discount" class="max-w460">
          <el-radio :label="1">允许</el-radio>
          <el-radio :label="0">不允许</el-radio>
        </el-radio-group>
        <div class="lh18 mt10 gray9">
          <p>注：如开启则用户下单时可选择使用积分抵扣订单金额</p>
        </div>
      </el-form-item>
      <el-form-item label=" 积分抵扣比例">
        <el-input placeholder="请输入内容" v-model="form.discount.discount_ratio" class="max-w460">
          <template #prepend>1个积分可抵扣</template>
          <template #append>元</template>
        </el-input>
        <div class="lh18 mt10 gray9">
          <p>例如：1积分可抵扣0.01元，100积分则可抵扣1元，1000积分则可抵扣10元</p>
        </div>
      </el-form-item>
      <el-form-item label=" 抵扣条件">
        <el-input placeholder="请输入内容" v-model="form.discount.full_order_price" class="max-w460">
          <template #prepend>订单满</template>
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-input placeholder="请输入内容" v-model="form.discount.max_money_ratio" class="max-w460">
          <template #prepend>最高可抵扣金额</template>
          <template #append>%</template>
        </el-input>
        <div class="lh18 mt10 gray9">
          <p>温馨提示：例如订单金额100元，最高可抵扣10%，此时用户可抵扣10元</p>
        </div>
      </el-form-item>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="primary" size="small" @click="onSubmit" :loading="loading">提交</el-button>
      </div>

    </el-form>
  </div>
</template>
<script>
  import {setPoints,getPoints} from '@/api/points.js';
  export default {
    data() {
      return {
        form: {
          is_shopping_gift: 1,
          gift_ratio: 10,
          is_shopping_discount: 1,
          discount: {
            discount_ratio: 0,
            full_order_price: 0,
            max_money_ratio: 0,
          },
          is_trans_balance: 0,
        },
        loading: false,
      };
    },
    created() {
      /*获取数据*/
      this.getData();
    },
    methods: {
      /*获取数据*/
      getData() {
        let self = this;
        let Params = {};
        getPoints(Params, true).then(data => {
          self.form = data.data.values;
          self.form.is_shopping_gift = parseInt(data.data.values.is_shopping_gift);
          self.form.is_shopping_discount = parseInt(data.data.values.is_shopping_discount);
          self.form.is_trans_balance = parseInt(data.data.values.is_trans_balance);
        }).catch(error => {

        });
      },

      /*保存*/
      onSubmit() {
        let self = this;
        let form = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            setPoints(form, true)
              .then(data => {
                self.loading = false;
                if (data.code === 1) {
                  ElMessage({
                    message: '恭喜你，保存成功',
                    type: 'success'
                  });
                } else {
                  self.loading = false;
                }
              })
              .catch(error => {
                self.loading = false;
              });

          }
        });


      },
    }
  };
</script>

<style>
</style>
