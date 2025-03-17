<template>
  <div class="basic-setting-content pl16 pr16">
    <!--规格设置-->
    <div class="common-form">规格/库存</div>

    <!--减库存方式-->
    <el-form-item label="库存计算方式：">
      <el-radio-group v-model="form.model.deduct_stock_type">
        <el-radio :label="10">下单减库存</el-radio>
        <el-radio :label="20">付款减库存</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="产品规格：">
      <el-radio-group v-model="form.model.spec_type">
        <el-radio :label="10" v-if="!form.isSpecLocked||(form.isSpecLocked&&form.model.spec_type==10)">单规格</el-radio>
        <el-radio :label="20" v-if="!form.isSpecLocked||(form.isSpecLocked&&form.model.spec_type==20)">多规格</el-radio>
      </el-radio-group>
      <div v-if="form.isSpecLocked" class="red ww100">此商品正在参加活动，不能修改规格</div>
    </el-form-item>

    <!--单规格-->
    <template v-if="form.model.spec_type == 10">
      <Single></Single>
    </template>

    <!--多规格-->
    <template v-if="form.model.spec_type == 20">
      <Many></Many>
    </template>

  </div>
</template>

<script>
import Single from './spec/Single.vue';
import Many from './spec/Many.vue';
export default {
  components: {
    /*单规格*/
    Single,
    /*多规格*/
    Many
  },
  inject: ['form']
};
</script>

<style>

</style>
