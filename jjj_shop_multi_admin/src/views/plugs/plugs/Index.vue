<template>
	<div class="plus-container">
		<!--插件首页-->
		<div class="common-level-rail">
			<!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="addType">添加类别</el-button> -->
		</div>

		<div v-for="(item, index) in tableData" :key="index" class="mb16">
			<div class="common-form d-s-c">
				<span>{{item.name}}</span>
				<!-- <a href="javascript:void(0);" class="close-btn ml10 d-c-c" @click="deleteClick(item)">
          <i class="el-icon-error f20"></i>
        </a> -->
			</div>
			<div class="plus-list">
				<div class="item" v-for="(child, num) in item.children" :key="num">
					<div class="item-box pr">
						<a href="javascript:void(0);" class="close-btn" @click="deleteClick(child)">
							<!-- <i class="el-icon-error f20"></i> -->
							<el-icon :size="20">
								<CircleCloseFilled />
							</el-icon>
						</a>
						<a>
							<span class="iconfont" :class="child.icon" style="color: #fff;font-size: 20px;"></span>
							<div class="ml10">
								<h3>{{child.name}}</h3>
								<p>{{child.remark}}</p>
							</div>
						</a>
					</div>
				</div>
				<div class="item">
					<div class="d-s-c mt10">
						<div class="add-item-box d-c-c" @click="addClick(item)">
							<el-icon :size="16">
								<Plus />
							</el-icon>
						</div>
						<div class="ml10">
							<p class="f14 gray9">添加插件到此类别下</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--添加-->
		<Add v-if="open_add" :open_add="open_add" :curModel="curModel" @closeDialog="closeDialogFunc($event, 'add')">
		</Add>
	</div>
</template>

<script>
import {
	plugslist,
	updatePlugsStatus,
	updatePlugsRecom,
	deleteplugs
} from '@/api/plugs.js';
import {
	reactive,
	toRefs,
	defineComponent,
	onMounted,
	inject
} from 'vue';
import Add from './dialog/Add.vue';
import {
	deepClone
} from '@/utils/base.js';
export default defineComponent({
	components: {
		Add
	},
	setup() {
		const state = reactive({
			/*是否正在加载*/
			loading: true,
			/*表格数据*/
			tableData: [],
			/*总条数*/
			totalDataNumber: 0,
			/*是否打开添加弹窗*/
			open_add: false,
			/*是否打开编辑弹窗*/
			open_edit: false,
			/*是否打开类别弹窗*/
			open_type: false,
			/*当前编辑的对象*/
			curModel: {}
		});
		const getData = () => {
			state.loading = true;
			plugslist({}).then(res => {
				const { data: { accessList } } = res;
				state.tableData = accessList;
				state.loading = false;
			})
			.catch(error => {
				state.loading = false;
			});
		};
		getData();
		return {
			...toRefs(state),
			getData
		};
	},
	methods: {
		/*添加插件类别*/
		addType() {
			this.open_type = true;
			//this.tableData.push({plus_name:'新类别'});
		},

		/*启用插件*/
		statusChange: function(checked, row) {
			let self = this;
			self.loading = true;
			updatePlugsStatus({
				plus_id: row.plus_id
			}).then((response) => {
				self.loading = false;
				row.status = checked;
			})
				.catch(() => {
					self.loading = false;
					row.status = !checked;
				});
		},

		/*推荐插件*/
		recomChange: function(checked, row) {
			let self = this;
			self.loading = true;
			updatePlugsRecom({
				plus_id: row.plus_id
			}).then((response) => {
				self.loading = false;
				row.is_recom = checked;
			})
				.catch(() => {
					self.loading = false;
					row.is_recom = !checked;
				});
		},

		/*打开添加*/
		addClick(e) {
			this.curModel = e;
			this.open_add = true;
		},

		/*打开编辑*/
		editClick(item) {
			// this.userModel = item;
			this.userModel = deepClone(item);
			this.open_edit = true;
		},

		closeDialogFunc(e, f) {
			if (f == 'type') {
				this.open_type = e.openDialog;
				if (e.type == 'success') {
					this.tableData.push({
						plus_name: '新类别'
					});
				}
			}
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
		/*删除插件*/
		deleteClick(row) {
			let self = this;
			ElMessageBox.confirm(
				'删除后不可恢复，确认删除该记录吗?',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				self.loading = true;
				deleteplugs({
					plus_id: row.access_id
				}).then((data) => {
					if (data.code == 1) {
						self.loading = false;
						ElMessage({
							message: data.msg,
							type: 'success',
						});
						self.getData();
					}
				})
					.catch(() => {
						self.loading = false;
					});
			})
				.catch(() => {});
		}
	}
});
</script>

<style>
	.plus-container {
		min-height: 400px;
	}

	.plus-container .common-form .close-btn {
		color: #CCCCCC;
	}

	.plus-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.plus-list .item {
		width: 25%;
	}

	.plus-list .item .item-box {
		margin: 0 10px 20px;
		border: 1px solid #FFFFFF;
	}

	.plus-list .item .item-box .close-btn {
		position: absolute;
		padding-left: 0;
		width: 20px;
		height: 20px;
		top: 20px;
		right: 4px;
		color: #ff0000;
		display: none;
	}

	.plus-list .item .item-box:hover {
		border-radius: 8px;
		border: 1px dashed #CCCCCC;
	}

	.plus-list .item .item-box:hover .close-btn {
		display: block;
	}

	.plus-list .item .add-item-box {
		width: 40px;
		height: 40px;
		margin-left: 20px;
		border-radius: 8px;
		border: 1px solid #186eeb;
	}

	.plus-list .item a {
		display: flex;
		height: 60px;
		padding-left: 10px;
		justify-content: flex-start;
		align-items: center;
	}

	.plus-list .item a h3 {
		font-weight: normal;
		color: #333333;
	}

	.plus-list .item a:hover h3 {
		color: #3a8ee6;
	}

	.plus-list .item a p {
		font-size: 12px;
		color: #999999;
	}

	.plus-list .item .item-box .iconfont {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border-radius: 8px;
		line-height: 40px;
		background: #3a8ee6;
	}

	.plus-list .item a .iconfont.icon {
		font-size: 22px;
		color: #ffffff;
	}
</style>