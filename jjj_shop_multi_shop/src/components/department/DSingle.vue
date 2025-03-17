<template>
  <el-dialog v-model="show" title="部门列表" width="300" :before-close="handleClose">
    <el-button type="primary"> 刷新 </el-button>

    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />

    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs, defineComponent, ref } from 'vue';
import { departmentIndex } from '@/api/enterprise';

export default defineComponent({
	components: {},
	setup() {
		const formRef = ref(null);
		const state = reactive({
			checkAll:null,
			tableRef:null,
			show: false,
			form: {},
			tableData: [],
			treeData: [],
			checkList:[],
			queryData:{
				pageIndex:1,
				pageSize:2,
			},
			total:0,
		});
		const fetchData = async ()=>{
			const { data } = await departmentIndex ();
			state.treeData = data;
		};
		const open = async () => {
			await fetchData();
			state.show = true;
		};
		const close = () => {
			state.show = false;
		};
		return {
			...toRefs(state),
			open,
			close,
			fetchData,
			formRef,
		};
	},
	methods: {


		save(){
			if(this.checkList && this.checkList.length > 0){
				this.$emit('check-Role',this.checkList[0]);
			}
			this.close();
		}
	}
});
</script>

<style scoped></style>
