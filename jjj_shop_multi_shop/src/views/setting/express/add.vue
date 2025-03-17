<template>
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" :model="form" label-width="200px" ref="formRef">
			<!--添加门店-->
			<div class="common-form">新增物流公司</div>
			<el-form-item label="物流公司名称" prop="express_name" :rules="[{ required: true, message: '请填写物流公司名称' }]">
				<el-input v-model="form.express_name" class="max-w460"></el-input>
				<div class="tips">
					请对照
					<el-link type="primary" :underline="false" @click="gotoCompany()">
						物流公司编码表
					</el-link>
					填写
				</div>
			</el-form-item>
			<el-form-item label="物流公司代码" prop="express_code" :rules="[{ required: true, message: '请填写物流公司代码' }]">
				<el-input v-model="form.express_code" class="max-w460"></el-input>
				<div class="tips">用于快递100API查询物流信息，请务必填写正确</div>
			</el-form-item>
			<el-form-item label="微信物流公司id " prop="wx_code">
				<el-input v-model="form.wx_code" class="max-w460"></el-input>
				<div class="tips">请对照
					<el-link type="primary" :underline="false" @click="gotoWxCompany()">
						微信物流公司编码表
					</el-link>
					填写
				</div>
				<div class="tips">用于向小程序发货的物流公司id，下载微信物流表格对比快递100物流公司编码表，务必填写正确，没有找到编码不填</div>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="form.sort" type="number" class="max-w460"></el-input>
				<div class="tips">数字越小越靠前</div>
			</el-form-item>

			<!--提交-->
			<div class="common-button-wrapper">
				<el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {
		reactive,
		toRefs,
		defineComponent,
		ref
	} from "vue";
	import {
		ElMessage
	} from "element-plus";
	import {
		addExpress
	} from "@/api/setting.js";
	import {
		useRouter
	} from "vue-router";
	export default defineComponent({
		setup() {
			const state = reactive({
				formRef: null,
				show: false,
				form: {
					express_name: "",
					express_code: "",
					wx_code: '',
					sort: 1,
					app_id: "",
				},
			});
			const router = useRouter();
			const gotoCompany = () => {
				const baseUrl = window.location.protocol + "//" + window.location.host;
				window.location.href = baseUrl + "/express.xlsx";
			};
			/*跳转微信物流编码*/
			const gotoWxCompany = () => {
				const baseUrl = window.location.protocol + '//' + window.location.host;
				window.location.href = baseUrl + '/wx_express.xlsx';
			}

			const onSubmit = () => {
				state.formRef.validate(async (valid) => {
					if (valid) {
						state.loading = true;
						const {
							msg
						} = await addExpress(state.form);
						ElMessage({
							message: msg,
							type: "success",
						});
						router.push("/setting/express/index");
						state.loading = false;
						state.formRef.value.resetFields();
					}
				});
			};

			return {
				...toRefs(state),
				gotoCompany,
				onSubmit,
				gotoWxCompany,
			};
		},
	});
</script>

<style></style>