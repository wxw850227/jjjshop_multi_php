<template>
	<div v-loading="loading">
		<!--添加商城-->
		<div class="common-level-rail"><el-button type="primary" @click="addClick">添加商城</el-button></div>
		<!--内容-->
		<div class="product-content">
			<div class="table-wrap">
				<div>
					<el-table size="small" :data="tableData" style="width: 100%;" row-key="access_id" border
						default-expand-all v-loading="loading">
						<el-table-column prop="app_id" label="商城ID"></el-table-column>
						<el-table-column prop="app_name" label="商城名称"></el-table-column>
						<el-table-column prop="user_name" label="超管账号"></el-table-column>
						<el-table-column prop="is_recycle" label="状态">
							<template #default="scope">
								<el-checkbox v-model="scope.row.is_recycle"
									@change="checked => statusChange(checked, scope.row)">启用</el-checkbox>
							</template>
						</el-table-column>
						<el-table-column prop="weixin_service" label="微信服务商支付">
							<template #default="scope">
								<el-checkbox v-model="scope.row.weixin_service"
									@change="checked => wxStatusChange(checked, scope.row)">启用</el-checkbox>
							</template>
						</el-table-column>
						<el-table-column prop="expire_time_text" label="过期时间"></el-table-column>
						<el-table-column prop="create_time" label="添加时间"></el-table-column>
						<el-table-column label="操作" width="150">
							<template #default="scope">
								<el-link :href="'/shop'"
									target="_blank" link type="primary" size="small">进入商城</el-link>
								<el-link class="ml10" @click="editClick(scope.row)" link type="primary"
									size="small">编辑</el-link>
								<el-link class="ml10" @click="deleteClick(scope.row)" link type="primary"
									size="small">删除</el-link>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!--添加-->
		<Add v-if="open_add" :open_add="open_add" @closeDialog="closeDialogFunc($event, 'add')"></Add>

		<!--编辑-->
		<Edit v-if="open_edit" :open_edit="open_edit" :curModel="curModel"
			@closeDialog="closeDialogFunc($event, 'edit')">
		</Edit>

		<!--分页-->
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
				:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
				:total="totalDataNumber"></el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		toRefs,
		defineComponent,
		inject
	} from "vue";
	import {
		shopList,
		updateStatus,
		updateWxStatus,
		deleteShop,
		storeEnter
	} from '@/api/shop.js';
	import {
		deepClone
	} from '@/utils/base.js';
	import Edit from './part/Edit.vue';
	import Add from './part/Add.vue';
	export default defineComponent({
		components: {
			/*编辑组件*/
			Edit: Edit,
			Add: Add
		},
		setup() {
			const state = reactive({
				baseConfirm: inject('$baseConfirm'),
				/*是否正在加载*/
				loading: true,
				/*表格数据*/
				tableData: [],
				/*一页多少条*/
				pageSize: 15,
				/*一共多少条数据*/
				totalDataNumber: 0,
				/*当前是第几页*/
				curPage: 1,
				/*是否打开添加弹窗*/
				open_add: false,
				/*是否打开编辑弹窗*/
				open_edit: false,
				/*当前编辑的对象*/
				curModel: {
					no_expire: false
				},
			})
			return {
				...toRefs(state),
			};
		},
		mounted() {
			this.getData();
		},
		methods: {

			/*选择第几页*/
			handleCurrentChange(val) {
				let self = this;
				self.curPage = val;
				self.loading = true;
				self.getData();
			},

			/*每页多少条*/
			handleSizeChange(val) {
				this.curPage = 1;
				this.pageSize = val;
				this.getData();
			},

			/*获取列表*/
			getData() {
				let self = this;
				shopList({
						page: self.curPage,
						list_rows: self.pageSize
					})
					.then(data => {
						self.loading = false;
						self.tableData = data.data.list.data;
						self.totalDataNumber = data.data.list.total;
						self.tableData.forEach(function(message) {
							message.is_recycle = message.is_recycle === 0 ? true : false;
							message.weixin_service = message.weixin_service === 1 ? true : false;
						});
					})
					.catch(error => {});
			},

			/*打开添加*/
			addClick() {
				this.open_add = true;
			},

			/*打开编辑*/
			editClick(e) {
				this.open_edit = true;
				this.curModel = deepClone(e);
				if (this.curModel.expire_time == 0) {
					this.curModel.expire_time_text = '';
					this.curModel.no_expire = true;
				} else {
					this.curModel.no_expire = false;
				}
			},

			/*关闭*/
			closeDialogFunc(e, f) {
				if (f == 'add') {
					this.open_add = e.openDialog;
					if (e.type == 'success') {
						this.getData();
					}
				}
				if (f == 'edit') {
					this.open_edit = e.openDialog;
					if (e.type == 'success') {
						this.getData();
					}
				}
			},

			/*启用*/
			statusChange: function(checked, row) {
				let self = this;
				self.loading = true;
				updateStatus({
						app_id: row.app_id
					})
					.then(data => {
						self.loading = false;
						row.is_recycle = checked;
					})
					.catch(error => {
						self.loading = false;
						row.is_recycle = !checked;
					});
			},

			/*启用*/
			wxStatusChange: function(checked, row) {
				let self = this;
				self.loading = true;
				updateWxStatus({
							app_id: row.app_id
						},
						true
					)
					.then(data => {
						self.loading = false;
						row.weixin_service = checked;
					})
					.catch(error => {
						self.loading = false;
						row.weixin_service = !checked;
					});
			},

			/*删除商城*/
			deleteClick(row) {
				console.log(this, 'this')
				this.baseConfirm("删除后不可恢复，确认删除该记录吗?", '提示', () => {
					deleteShop({
							app_id: row.app_id
						}).then(data => {
							this.loading = false;
							const {
								msg
							} = data;
							ElMessage({
								message: msg,
								type: 'success'
							});
							this.getData();
						})
						.catch(error => {
							this.loading = false;
						});
				})
			},

			/*进入商城*/
			storeEnter(e) {
				storeEnter({
						app_id: e
					})
					.then(data => {})
					.catch(error => {});
			}
		}
	})
</script>

<style>
	.el-link.is-underline:hover {
		opacity: 0.8;
	}

	.el-link.is-underline:hover:after {
		display: none;
	}
</style>