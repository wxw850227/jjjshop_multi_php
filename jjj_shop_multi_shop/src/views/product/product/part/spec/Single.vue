<template>
  <div>
    <el-form-item label="产品编码：" :rules="[{ required: true, message: '请填写产品编码' }]" prop="model.sku.product_no">
      <el-input v-model="form.model.sku.product_no" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="产品价格：" width="80" :rules="[{ required: true, message: '请填写产品价格' }]" prop="model.sku.product_price">
      <el-input type="number" v-model="form.model.sku.product_price" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="产品划线价：" :rules="[{ required: true, message: '请填写产品划线价' }]" prop="model.sku.line_price">
      <el-input type="number" v-model="form.model.sku.line_price" class="max-w460"></el-input>
     </el-form-item>
    <el-form-item label="库存数量：" :rules="[{ required: true, message: '请填写库存数量' }]" prop="model.sku.stock_num">
      <el-input type="number" v-model="form.model.sku.stock_num" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="商品重量(Kg)：" :rules="[{ required: true, message: '请填写商品重量' }]" prop="model.sku.product_weight">
      <el-input type="number" v-model="form.model.sku.product_weight" class="max-w460"></el-input>
    </el-form-item>
  </div>
</template>

<script>
  export default{
    inject: ['form']
  }
</script>

<style></style>
