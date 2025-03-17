<template>
	<!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-商城设置
  -->
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-width="150px">
			<!--添加门店-->
			<div class="common-form">商城设置</div>
			<el-form-item label="商城名称" :rules="[{ required: true, message: ' ' }]" prop="name">
				<el-input v-model="form.name" placeholder="商城名称" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="配送方式">
				<el-checkbox-group v-model="form.checkedCities">
					<el-checkbox v-for="(item, index) in all_type" :label="item.value"
						:key="index">{{ item.name }}</el-checkbox>
				</el-checkbox-group>
				<div class="tips">注：配送方式至少选择一个</div>
			</el-form-item>
			<div class="common-form">小程序设置</div>
			<el-form-item label="小程序发货" prop="is_send_wx">
				<el-checkbox v-model="form.is_send_wx">向小程序发货</el-checkbox>
				<div class="tips">后台发货后自动向小程序发货</div>
			</el-form-item>
			<el-form-item label="是否显示商户信息">
				<el-radio-group v-model="form.store_open">
					<el-radio label="1">显示</el-radio>
					<el-radio label="0">关闭</el-radio>
				</el-radio-group>
				<div class="tips">主要用于微信小程序过审隐藏</div>
			</el-form-item>
			<div class="common-form">日志记录</div>
			<el-form-item label="是否记录查询日志" prop="customer">
				<el-checkbox v-model="form.is_get_log">是否记录查询日志</el-checkbox>
				<div class="tips">如果记录，日志量会有点大</div>
			</el-form-item>
			<div class="common-form">物流查询api</div>
			<el-form-item label="快递100 Customer" :rules="[{ required: true, message: ' ' }]" prop="customer">
				<el-input v-model="form.customer" placeholder="" class="max-w460"></el-input>
				<div class="tips">
					用于查询物流信息,<el-link :underline="false" href="https://www.kuaidi100.com/openapi/" target="_blank"
						type="primary">快递100申请</el-link>
				</div>
			</el-form-item>
			<el-form-item label="快递100 Key" :rules="[{ required: true, message: ' ' }]" prop="key">
				<el-input v-model="form.key" placeholder="" class="max-w460"></el-input>
			</el-form-item>
			<div class="common-form">平台运营设置</div>
			<el-form-item label="抽成百分比(%)" :rules="[{ required: true, message: ' ' }]" prop="commission_rate">
				<el-input v-model="form.commission_rate" placeholder="抽查比例" class="max-w460" type="number"
					@keyup.native="renumber($event)"></el-input>
			</el-form-item>
			<el-form-item label="商品新增是否审核">
				<div>
					<el-radio v-model="form.add_audit" label="1">是</el-radio>
					<el-radio v-model="form.add_audit" label="0">否</el-radio>
				</div>
			</el-form-item>
			<el-form-item label="商品修改是否审核">
				<div>
					<el-radio v-model="form.edit_audit" label="1">是</el-radio>
					<el-radio v-model="form.edit_audit" label="0">否</el-radio>
				</div>
			</el-form-item>
			<div class="common-form">政策协议</div>
			<el-form-item label="服务协议" :rules="[{ required: true, message: ' ' }]" prop="service">
				<el-input v-model="form.service" placeholder="" class="max-w460"></el-input>
				<div class="tips">进入app和登录、注册页面显示</div>
			</el-form-item>
			<el-form-item label="隐私政策" :rules="[{ required: true, message: ' ' }]" prop="privacy">
				<el-input v-model="form.privacy" placeholder="" class="max-w460"></el-input>
			</el-form-item>
			<!--提交-->
			<div class="common-button-wrapper">
				<el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
			</div>
		</el-form>
		<!--上传图片-->
		<Upload v-if="isupload" :isupload="isupload" :type="type" :config="{ total: 3 }" @returnImgs="returnImgsFunc">
		</Upload>
	</div>
</template>

<script>
	import {
		storeDetail,
		editStore
	} from "@/api/setting.js";
	import Upload from "@/components/file/Upload.vue";
	import {
		formatModel
	} from '@/utils/base.js';
	export default {
		components: {
			Upload,
		},
		data() {
			return {
				/*是否正在加载*/
				loading: false,
				/*form表单数据*/
				form: {
					name: "",
					customer: "",
					key: "",
					supplier_cash: "",
					operate_type: "",
					commission_rate: "",
					sms_open: "",
					supplier_logo: "",
					checkedCities: [],
					edit_audit: 1,
					add_audit: 1,
					is_get_log: 0,
					service: "",
					privacy: "",
					store_open: "",
					is_send_wx: 0,
				},
				all_type: [],
				type: [],
				/*是否打开图片选择*/
				isupload: false,
			};
		},
		created() {
			this.getParams();
		},

		methods: {
			/*获取配置数据*/
			getParams() {
				let self = this;
				storeDetail({}, true)
					.then((res) => {
						let vars = res.data.vars.values;
						self.form = formatModel(self.form, vars);

						self.form.checkedCities = res.data.vars.values.delivery_type;
						// 转成整数，兼容组件
						for (let i = 0; i < self.form.checkedCities.length; i++) {
							self.form.checkedCities[i] = parseInt(self.form.checkedCities[i]);
						}
						self.type = vars.delivery_type;
						self.form.customer = vars.kuaidi100.customer;
						self.form.key = vars.kuaidi100.key;
						self.form.service = vars.policy.service;
						self.form.privacy = vars.policy.privacy;
						self.all_type = res.data.all_type;
						self.loading = false;
					})
					.catch((error) => {});
			},

			/*提交*/
			onSubmit() {
				let self = this;
				let params = this.form;
				if (params.checkedCities.length < 1) {
					ElMessage({
						message: "配送方式至少选择一种！",
						type: "warning",
					});
					return;
				}
				self.loading = true;
				editStore(params, true)
					.then((data) => {
						self.loading = false;
						ElMessage({
							message: "恭喜你，商城设置成功",
							type: "success",
						});
						self.$router.push("/setting/store/index");
					})
					.catch((error) => {
						self.loading = false;
					});

				self.$refs.form.validate((valid) => {
					if (valid) {

					}
				});
			},
			renumber(e) {
				var keynum = window.event ? e.keyCode : e.which;
				var keycar = String.fromCharCode(keynum);
				if (keynum == 189 || keynum == 190 || keynum == 110 || keynum == 109) {
					this.$message.warning("禁止输入小数和负数");
					e.target.value = "";
				}
			},
			/*选择图片*/
			chooseImg(e) {
				this.type = e;
				this.isupload = true;
			},

			/*关闭选择图片*/
			returnImgsFunc(e) {
				this.isupload = false;
				if (e != null && e.length > 0) {
					if (this.type == "logo") {
						this.form.supplier_logo = e[0].file_path;
					} else if (this.type == "image") {
						this.form.supplier_image = e[0].file_path;
					}
				}
			},
		},
	};
</script>
<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}
</style>