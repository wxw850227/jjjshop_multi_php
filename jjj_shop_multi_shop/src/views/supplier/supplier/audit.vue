<template>
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-width="200px">
			<!--商户-->
			<div class="common-form">商户详情</div>
			<el-form-item label="会员昵称" prop="supplier.nickName">
				<el-input class="max-w460" :value="form.supplier.user ? form.supplier.user.nickName : ''"
					:disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="商户名称" prop="supplier.store_name">
				<el-input class="max-w460" v-model="form.supplier.store_name" placeholder="请输入商户名称"
					:disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="supplier.mobile" :rules="[{ required: true, message: ' ' }]">
				<el-input class="max-w460" v-model="form.supplier.mobile" placeholder="请输入账号"
					:disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="supplier.user_name">
				<el-input v-model="form.supplier.user_name" placeholder="姓名" type="text" class="max-w460"
					:disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="营业执照:">
				<el-row>
					<div v-if="form.supplier.business_id != 0" class="img">
						<el-image :src="form.supplier.businessImage.file_path" style="width: 100px; height: 100px"
							:preview-src-list="srcList" />
					</div>
				</el-row>
			</el-form-item>
			<el-form-item label="主营类别" prop="supplier.category">
				<el-input class="max-w460" :value="form.supplier.category ? form.supplier.category.name : ''"
					:disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-radio-group v-model="form.status">
					<el-radio :label="1">通过</el-radio>
					<el-radio :label="2">未通过</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注" prop="content">
				<el-input type="textarea" v-model="form.content" class="max-w460"></el-input>
			</el-form-item>
			<!--提交-->
			<div class="common-button-wrapper">
				<el-button size="small" type="info" @click="cancelFunc">取消</el-button>
				<el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {
		toAudit,
		audit
	} from "@/api/supplier.js";
	import {
		formatModel
	} from "@/utils/base.js";
	export default {
		data() {
			return {
				/*form表单数据*/
				form: {
					supplier_apply_id: 0,
					supplier: {
						store_name: "",
						mobile: "",
						user_name: "",
						image_frontid: "",
						image_backid: "",
						idcard: "",
						user_id: "",
						logo_id: 0,
						business_id: 0,
						address: "",
						user: {},
						category: {},
						content: "",
					},
					content: "",
					status: 1,
				},
				imagefront_file_path: "",
				imageback_file_path: "",
				/*是否打开添加弹窗*/
				open_add: false,
				storeList: [],
				/*是否上传图片*/
				isupload: false,
				loading: false,
				type: "logo",
				srcList: [],
			};
		},
		created() {
			this.form.supplier_apply_id = this.$route.query.supplier_apply_id;
			this.getData();
		},
		methods: {
			/*获取参数*/
			getData() {
				let self = this;
				toAudit({
							supplier_apply_id: self.form.supplier_apply_id,
						},
						true
					)
					.then((res) => {
						self.form.supplier = res.data.model;
						if (self.form.supplier.business_id != 0) {
							self.srcList.push(self.form.supplier.businessImage.file_path);
						}
					})
					.catch((error) => {});
			},

			/*添加用户*/
			onSubmit() {
				let self = this;
				let form = self.form;
				self.$refs.form.validate((valid) => {
					if (valid) {
						self.loading = true;
						audit({
									supplier_apply_id: self.form.supplier_apply_id,
									status: self.form.status,
									content: self.form.content,
								},
								true
							)
							.then((data) => {
								self.loading = false;
								if (data.code == 1) {
									ElMessage({
										message: "恭喜你，修改成功",
										type: "success",
									});
									self.$router.push("/supplier/supplier/apply");
								} else {
									self.loading = false;
								}
							})
							.catch((error) => {
								self.loading = false;
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
	.basic-setting-content {}

	.product-add {
		padding-bottom: 50px;
	}

	.img {
		margin-top: 10px;
	}
</style>