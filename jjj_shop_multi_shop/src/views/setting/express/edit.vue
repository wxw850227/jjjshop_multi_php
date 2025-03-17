<template>
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" :model="state.form" label-width="200px" :ref="formRef">
			<!--添加门店-->
			<div class="common-form">修改物流公司</div>
			<el-form-item label="物流公司名称 ">
				<el-input v-model="state.form.express_name" class="max-w460"></el-input>
				<div class="tips">
					请对照
					<el-link type="primary" :underline="false" @click="gotoCompany()">物流公司编码表</el-link>
					填写
				</div>
			</el-form-item>
			<el-form-item label="物流公司代码 ">
				<el-input v-model="state.form.express_code" class="max-w460"></el-input>
				<div class="tips">用于快递100API查询物流信息，务必填写正确</div>
			</el-form-item>
			<el-form-item label="微信物流公司id ">
				<el-input v-model="state.form.wx_code" class="max-w460"></el-input>
				<div class="tips">请对照
					<el-link type="primary" :underline="false" @click="gotoWxCompany()">
						微信物流公司编码表
					</el-link>
					填写
				</div>
				<div class="tips">用于向小程序发货的物流公司id，下载微信物流表格对比快递100物流公司编码表，务必填写正确，没有找到编码不填</div>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="state.form.sort" type="number" class="max-w460"></el-input>
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
		ref
	} from "vue";
	import {
		ElMessage
	} from "element-plus";
	import {
		expressDetail,
		editExpress
	} from "@/api/setting.js";
	import {
		useRoute
	} from "vue-router";
	export default {
		setup() {
			const formRef = ref(null);
			const loading = ref(false);

			// 使用ref创建响应式数据
			const state = ref({
				form: {
					express_id: "",
					express_name: "",
					express_code: "",
					wx_code: "",
					sort: "",
				},
			});
			const router = useRoute();

			/*获取数据*/
			const getData = () => {
				console.log(router);
				// 取到路由带过来的参数
				const params = router.query.express_id;
				console.log(params);
				expressDetail({
						express_id: params
					}, true)
					.then((data) => {
						let detail = data.data.detail;
						// 将数据放在响应式对象中
						state.value.form.express_id = detail.express_id;
						state.value.form.express_name = detail.express_name;
						state.value.form.express_code = detail.express_code;
						state.value.form.wx_code = detail.wx_code;
						state.value.form.sort = detail.sort;
					})
					.catch((error) => {});
			};

			/*提交表单*/
			const onSubmit = () => {
				loading.value = true;
				let params = state.value.form;
				editExpress(params, true)
					.then((data) => {
						loading.value = false;
						ElMessage({
							message: "恭喜你，修改成功",
							type: "success",
						});
						router.push("/setting/express/index");
					})
					.catch((error) => {
						loading.value = false;
					});
			};

			/*跳转物流编码*/
			const gotoCompany = () => {
				let baseUrl = window.location.protocol + "//" + window.location.host;
				window.location.href = baseUrl + "/express.xlsx";
			};
			/*跳转微信物流编码*/
			const gotoWxCompany = () => {
				const baseUrl = window.location.protocol + '//' + window.location.host;
				window.location.href = baseUrl + '/wx_express.xlsx';
			}
			getData();

			return {
				state: state.value,
				loading,
				getData,
				onSubmit,
				gotoCompany,
				formRef,
				router,
				gotoWxCompany
			};
		},
	};
</script>

<style></style>