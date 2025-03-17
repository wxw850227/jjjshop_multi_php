<template>
  <el-dialog v-model="show" title="评估模板库" width="800" :before-close="handleClose">
    <!-- <el-button type="primary"> 刷新 </el-button> -->
    <el-table :data="tableData" border class="mt-defaul" ref="tableRef">
      <el-table-column prop="" label="" width="70">
        <template #default="{ $index,row }">
          <el-checkbox v-model="tableData[$index].check" @change="handleCheckChange(row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="positionId" label="#">
		<template #default="{ $index }">
			{{ (queryData.pageIndex - 1) * queryData.pageSize + $index + 1 }}
		</template>
	  </el-table-column>
      <el-table-column prop="name" label="评估模板名称" />
      <el-table-column prop="name" label="适用类别" />
      <el-table-column prop="name" label="所属目录" />
      <el-table-column prop="name" label="创建人" />
    </el-table>
    <el-pagination 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="queryData.pageIndex"
      :page-size="queryData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from 'vue';
import { positionIndex } from '@/api/setting';
export default defineComponent({
	components: {},
	props:{
		/* maxNum代表可选最大数量，负数不限，正数最大多少个 */
		maxNum: {
			type: Number,
			default: -1,
		}
	},
	setup(props) {
		const formRef = ref(null);
		const state = reactive({
			checkAll:null,
			tableRef:null,
			show: false,
			form: {},
			tableData: [],
			checkList:[],
			queryData:{
				pageIndex:1,
				pageSize:2,
			},
			total:0,
		});
		const fetchData = async ()=>{
			const { data:{ records,total } } = await positionIndex(state.queryData);
			state.tableData = records;
			state.total = total;
		};
		// list 为需要回显的值
		const open = async (list) => {
			await fetchData();
			state.checkList = [];
			showData(list);
			state.show = true;
		};
		const showData = (list)=>{
			if(list && list.length > 0){
				list.forEach((v)=>{
					state.tableData.forEach((item)=>{
						item.check = false;
						if(item.positionId == v.positionId){
							setTimeout(() => {
								item.check = true;
							});
						}
					});
				});
				state.checkList = list;
			}else{
				state.tableData.forEach(item => {
					item.check = false;
				});
			}
		};
		const close = () => {
			state.show = false;
		};
		const handleCheckChange = (row)=>{
			if(props.maxNum < 0){
				if(row.check){
					state.checkList.push(row);
				}else{
					let idx = this.checkList.findIndex((v)=>v.positionId == row.positionId);
					state.checkList.splice(idx,1);
				}
			}else{
				state.checkList = [];
				state.tableData.forEach((v)=>{
					v.check = false;
				});
				row.check = true;
				if(row.check){
					state.checkList.push(row);
				}
			}
		};
		return {
			...toRefs(state),
			open,
			close,
			fetchData,
			showData,
			handleCheckChange,
			formRef,
		};
	},
	methods: {
		async handleCurrentChange(val) {
			this.queryData.pageIndex = val;
			await this.fetchData();
			this.showData(this.checkList);
		},
		handleSizeChange(val) {
			this.queryData.pageIndex = 1;
			this.queryData.pageSize = val;
			this.fetchData();
		},
		save(){
			if(this.checkList && this.checkList.length > 0){
				this.$emit('check-evaluation',this.checkList);
			}
			this.close();
		}
	}
});
</script>
<style scoped></style>
