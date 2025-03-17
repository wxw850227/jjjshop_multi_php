<template>
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-width="200px">
			<!--添加门店-->
			<div class="common-form">新增物流公司</div>
			<el-form-item label="地区类型">
				<div>
					<el-radio v-model="form.level" :label="1">省份</el-radio>
					<el-radio v-model="form.level" :label="2">城市</el-radio>
					<el-radio v-model="form.level" :label="3">地区</el-radio>
				</div>
			</el-form-item>
			<el-form-item label="选择上级" v-if="form.level > 1">
				<el-select v-if="form.level > 1" v-model="form.province_id" placeholder="省" @change="initCity">
					<el-option :label="item.name" :value="item.id" v-for="(item,index) in areaList"
						:key='index'></el-option>
				</el-select>
				<el-select v-if="form.province_id!='' && form.level > 2" v-model="form.city_id" placeholder="市">
					<el-option :label="item1.name" :value="item1.id"
						v-for="(item1,index1) in areaList[form.province_id]['city']" :key='index1'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="地区名称 " prop="name" :rules="[{required: true,message: ' '}]">
				<el-input v-model="form.name" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="简称" prop="shortname">
				<el-input v-model="form.shortname" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="全称" prop="merger_name">
				<el-input v-model="form.merger_name" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="拼音" prop="pinyin">
				<el-input v-model="form.pinyin" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="邮编" prop="zip_code">
				<el-input v-model="form.zip_code" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="首字母" prop="first">
				<el-input v-model="form.first" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="经度" prop="lng">
				<el-input v-model="form.lng" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="纬度" prop="lat">
				<el-input v-model="form.lat" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="form.sort" type="number" class="max-w460"></el-input>
				<div class="tips">数字越小越靠前</div>
			</el-form-item>
			<!--提交-->
			<el-form-item>
				<el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import {
	toAddRegion,
	addRegion
} from '@/api/region.js';
export default {
	data() {
		return {
			loading: false,
			/*form表单数据*/
			form: {
				province_id: '',
				city_id: '',
				level: 1
			},
			/*省市区*/
			areaList: [],
		};
	},
	created() {
		this.getData();
	},

	methods: {
		getData() {
			let self = this;
			toAddRegion({})
				.then(res => {
					self.areaList = res.data.regionData;
				})
				.catch(error => {

				});
		},
		//提交表单
		onSubmit() {
			let self = this;
			let form = this.form;
			self.$refs.form.validate((valid) => {
				if (valid) {
					self.loading = true;
					addRegion(form)
						.then(data => {
							self.loading = false;
							ElMessage({
								message: '恭喜你，添加成功',
								type: 'success'
							});
							self.$router.push('/region/Index');
						})
						.catch(error => {
							self.loading = false;
						});
				}
			});
		},
		/*初始化城市id*/
		initCity() {
			this.form.city_id = '';
		},
	}
};
</script>

<style>
	.tips {
		color: #ccc;
	}
</style>