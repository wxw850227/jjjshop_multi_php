<template>
	<el-dialog title="添加插件" v-model="dialogVisible" @close='dialogFormVisible'>
		<el-table size="small" :data="categoryList" border style="width: 100%" v-loading="loading">
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="name" label="操作" width="80">
				<template v-slot="scope">
					<el-button @click="addClick(scope.row)" size="small">添加</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
import {
	getplugs,
	addplugs
} from '@/api/plugs.js';
import {
	reactive,
	toRefs,
	defineComponent
} from 'vue';
export default defineComponent({
	props:['open_add','curModel'],
	setup(props) {
		const state = reactive({
			form: {
				status: 0,
				srot: 1,
				plus_name: '',
				desc: '',
				ico: '',
				url: 'index/index',
				sort: 1,

			},
			categoryList: [],
			srot: '1',
			radio: '1',
			/*左边长度*/
			formLabelWidth: '120px',
			/*是否显示*/
			dialogVisible: props.open_add,
			/*是否正在加载*/
			loading: true,
			curModel: props.curModel,
		});
		console.log(state.dialogVisible);
		const getCategoryList = async () => {
			let self = state;
			let Params = {
				plus_category_id: self.curModel.plus_category_id
			};
			const data = await getplugs(Params);
			self.loading = false;
			self.categoryList = data.data.accessList;
		};
		// state.dialogVisible = state.open_add;
		/*获取插件列表*/
		getCategoryList();

		return {
			...toRefs(state),
			getCategoryList
		};
	},
	methods: {
		/*添加插件*/
		async addClick(e) {
			let self = this;
			let params = {
				access_id: e.access_id,
				plus_category_id: self.curModel.plus_category_id
			};
			const res = await addplugs(params, true);
			self.loading = false;
			if (res.code == 1) {
				ElMessage({
					message: '恭喜你，添加成功',
					type: 'success'
				});
				self.dialogFormVisible(true);
			} else {
				self.loading = false;
				ElMessage.error('错了哦，这是一条错误消息');
			}
		},

		/*关闭弹窗*/
		dialogFormVisible(e) {
			if (e) {
				this.$emit('closeDialog', {
					type: 'success',
					openDialog: false
				});
			} else {
				this.$emit('closeDialog', {
					type: 'error',
					openDialog: false
				});
			}
		}

	}
});
</script>

<style></style>