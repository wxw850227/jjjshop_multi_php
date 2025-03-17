<template>
  <div>
    <!--积分设置-->
    <div class="common-form">积分设置</div>
    <el-form-item label="是否开启积分赠送：">
      <el-radio-group v-model="form.model.is_points_gift">
        <el-radio :label="1">开启</el-radio>
        <el-radio :label="0">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否允许使用积分抵扣：">
      <el-radio-group v-model="form.model.is_points_discount">
        <el-radio :label="1">允许</el-radio>
        <el-radio :label="0">不允许</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="form.model.is_points_discount == 1"
      label="最大抵扣积分数量："
      :rules="[{ required: true, message: ' ' }]"
      prop="model.max_points_discount"
    >
      <el-input
        type="number"
        v-model="form.model.max_points_discount"
        class="max-w460"
      ></el-input>
      <div class="gray9">最大抵扣积分数量，-1为使用通用设置</div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unit: "%",
      grade_unit: "%",
    };
  },
  created() {
    if (this.form.model.alone_grade_type == "20") {
      this.grade_unit = "元";
    }
    if (this.form.model.agent_money_type == "20") {
      this.unit = "元";
    }
  },
  inject: ["form"],
  methods: {
    /*换算单位*/
    changeMoneyType: function (val) {
      if (val == "10") {
        this.unit = "%";
      } else {
        this.unit = "元";
      }
    },
    /*换算单位*/
    changeGradeType: function (val) {
      if (val == "10") {
        this.grade_unit = "%";
      } else {
        this.grade_unit = "元";
      }
    },
  },
};
</script>

<style></style>
