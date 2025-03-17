<template>
	<!-- 作者 luoyiming 时间：2019-10-26 描述：设置-物流公司 -->
	<div class="user ww100">
		<div class="common-form">物流公司列表</div>
		<!-- 添加等级 -->
		<div class="common-level-rail">
			<el-button size="small" type="primary" icon="Plus" @click="addClick"
				v-auth="'/setting/express/add'">添加</el-button>
		</div>

		<!-- 内容 -->
		<div class="product-content">
			<div class="table-wrap">
				<el-table size="small" :data="tableData" border style="width: 100%" :loading="loading">
					<el-table-column prop="express_id" label="物流公司ID"></el-table-column>
					<el-table-column prop="express_name" label="物流公司名称"></el-table-column>
					<el-table-column prop="express_code" label="物流公司代码"></el-table-column>
					<el-table-column prop="wx_code" label="微信物流公司id"></el-table-column>
					<el-table-column prop="sort" label="排序"></el-table-column>
					<el-table-column prop="create_time" label="添加时间"></el-table-column>
					<el-table-column fixed="right" label="操作" width="90">
						<template #default="scope">
							<el-button @click="editClick(scope.row)" link type="primary" size="small"
								v-auth="'/setting/express/edit'">编辑</el-button>
							<el-button @click="deleteClick(scope.row)" link type="primary" size="small"
								v-auth="'/setting/express/delete'">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 分页 -->
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
					:total="totalDataNumber">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		expressList,
		deleteExpress
	} from "@/api/setting.js";
	import {
		ref,
		reactive
	} from "vue";
	import {
		ElMessage,
		ElMessageBox
	} from "element-plus";
	import {
		useRouter
	} from "vue-router";
	export default {
		setup() {
			/* 是否加载完成 */
			const loading = ref(true);
			/* 列表数据 */
			const tableData = reactive([]);
			/* 一页多少条 */
			const pageSize = ref(20);
			/* 一共多少条数据 */
			const totalDataNumber = ref(0);
			/* 当前是第几页 */
			const curPage = ref(1);
			const router = useRouter();

			/* 获取列表 */
			const getData = () => {
				let Params = {
					page: curPage.value,
					list_rows: pageSize.value,
				};
				expressList(Params, true)
					.then((data) => {
						loading.value = false;
						tableData.splice(0, tableData.length, ...data.data.list.data);
						totalDataNumber.value = data.data.list.total;
					})
					.catch((error) => {});
			};

			/* 选择第几页 */
			const handleCurrentChange = (val) => {
				curPage.value = val;
				loading.value = true;
				getData();
			};

			/* 每页多少条 */
			const handleSizeChange = (val) => {
				curPage.value = 1;
				pageSize.value = val;
				getData();
			};

			/* 打开添加 */
			const addClick = () => {
				router.push("/setting/express/add");
				console.log(router);
			};

			/* 打开编辑 */
			const editClick = (item) => {
				router.push({
					path: "/setting/express/edit",
					query: {
						express_id: item.express_id,
					},
				});
			};

			/* 删除用户 */
			const deleteClick = (row) => {
				ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
					.then(() => {
						loading.value = true;
						deleteExpress({
								express_id: row.express_id
							}, true)
							.then((data) => {
								loading.value = false;
								ElMessage({
									message: data.msg,
									type: "success",
								});
								getData();
							})
							.catch((error) => {
								loading.value = false;
							});
					})
					.catch(() => {});
			};

			// Call the initial getData() function to fetch data when the component is created
			getData();

			return {
				loading,
				tableData,
				pageSize,
				totalDataNumber,
				curPage,
				addClick,
				editClick,
				deleteClick,
				handleCurrentChange,
				handleSizeChange,
			};
		},
	};
</script>

<style></style>