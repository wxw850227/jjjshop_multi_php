<template>
	<el-dialog v-model="show" :title="data[type]?.dialogTitle || '选择目录'" width="400" :before-close="close">
		<el-scrollbar height="400px">
			<el-card shadow="never">
				<div class="titleWrap">{{ data[type].title }}</div>
				<div class="contentMask" v-if="!loading">
					<el-tree 
						:data="tableData"
						:node-key="data[type].id"
						:props="data[type].defaultProps"
						:default-expanded-keys="expandedKey"
						:accordion="true"
						@node-click="nodeClick"
						@check="handleCheckChange"
						:show-checkbox="maxNum > 0"
						:expand-on-click-node="false"
					>
						<template #default="{ node, data }">
							<span class="custom-tree-node" :class="[node.isCurrent ? 'checkStyle' : '']">
								<span class="iconfont icon-duoren"></span>
								<span class="txt">{{ node.label }}</span>
							</span>
						</template>
					</el-tree>
				</div>
			</el-card>
		</el-scrollbar>
		<template #footer>
			<el-button @click="close">取消</el-button>
			<el-button type="primary" @click="save"> 确定 </el-button>
		</template>
	</el-dialog>
</template>
<script>

import { reactive, toRefs, defineComponent, ref } from 'vue';
import { roleIndex } from "@/api/setting";
import { departmentIndex } from '@/api/enterprise';
import { questionCategoryIndex, paperTree } from '@/api/paper';
import { trainCourseCategoryIndex } from "@/api/course/course.js"; 
import { dangerAccordCategoryTree, dangerTypeIndex, dangerCheckCategoryTree } from "@/api/prevention/danger/danger.js";
import { flowList } from "@/api/setting";

export default defineComponent({
	components: {},
	props: {
		title: {
			type: String,
		},
		dialogTitle: {
			type: String,
			default: 'questionCategory'
		},
		defaultProps: {
			type: Object,
		},
		// course 课件目录 paper 试卷目录
		type: {
			type: String,
			default:'questionCategory' 
		},
		maxNum:{
			type: Number,
			default: -1,
		}
	},
	setup(props,{ emit }) {
		const formRef = ref(null);
		const state = reactive({
			loading: true,
			treeType: null,
			show: false,
			check: {},
			checks:[],
			tableData: [],
			expandedKey: [],
			data:{
				// 角色列表
				role:{
					dialogTitle: '选择角色',
					title: '角色',
					id:'roleId',
					defaultProps: {
						children: 'children',
						label: 'roleName',
						value: 'roleId',
					},
				},
				questionCategory:{
					dialogTitle: '选择目录',
					title: '课件目录',
					id:'questionCategoryId',
					defaultProps: {
						children: 'children',
						label: 'name',
						value: 'questionCategoryId',
					},
				},
				department:{
					dialogTitle: '选择部门',
					title: '部门目录',
					id:'departmentId',
					defaultProps: {
						children: 'children',
						label: 'name',
						value: 'departmentId',
					},
				},
				//试卷目录
				paperCategory:{
					dialogTitle: '选择试卷目录',
					title: '试卷目录',
					id:'paperCategoryId',
					defaultProps: {
						children: 'children',
						label: 'name',
						value: 'paperCategoryId',
					},
				},
				// 单位课程目录
				trainCourseCategory:{
					dialogTitle: '选择单位课程',
					title: '目录',
					id:'categoryId',
					defaultProps: {
						children: 'children',
						label: 'name',
						value: 'categoryId',
					},
				},
				// 自建依据分类
				dangerAccordCategory:{
					dialogTitle: '选择自建依据分类',
					title: '目录',
					id:'typeId',
					defaultProps: {
						children: 'childList',
						label: 'typeName',
						value: 'typeId',
					},
				},
				// 隐患分类
				dangerType:{
					dialogTitle: '隐患分类',
					title: '目录',
					id:'typeId',
					defaultProps: {
						children: 'children',
						label: 'typeName',
						value: 'typeId',
					},
				},
				// 公司检查表分类
				dangerCheckCompanyCategory:{
					dialogTitle: '公司检查表分类',
					title: '目录',
					id:'typeId',
					defaultProps: {
						children: 'childList',
						label: 'typeName',
						value: 'typeId',
					},
				},
				// 操作类型分类
				flowCategory:{
					dialogTitle: '操作类型分类',
					title: '目录',
					id:'name',
					defaultProps: {
						children: 'childList',
						label: 'name',
						value: 'name',
					},
				}
			}
		});
		const fetchData = async () => {
			state.loading = true;
			state.expandedKey = [];
			if(props.type == 'role'){
				const { data:{ records } } = await roleIndex({pageIndex:1,pageSize: 9999,});
				let list = [];
				list.push({roleName: '根目录', roleId: null});
				list[0].children = records;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'questionCategory'){
				const { data } = await questionCategoryIndex();
				let list = [];
				list.push({name: '根目录', questionCategoryId: null});
				list[0].children = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'department'){
				const { data } = await departmentIndex();
				let list = [];
				list.push({name: '测试有限公司', departmentId: null});
				list[0].children = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'trainCourseCategory'){
				const { data } = await trainCourseCategoryIndex();
				let list = [];
				list.push({name: '根目录', categoryId: 0});
				list[0].children = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'paperCategory'){
				const { data } = await paperTree();
				let list = [];
				list.push({name: '根目录', paperCategoryId: 0});
				list[0].children = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'dangerAccordCategory'){
				const { data } = await dangerAccordCategoryTree({categoryType:3});
				let list = [];
				list.push({typeName: '根目录', typeId: 0});
				list[0].childList = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'dangerType'){
				const { data } = await dangerTypeIndex({categoryType:3});
				let list = [];
				list.push({typeName: '根目录', typeId: 0});
				list[0].children = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'dangerCheckCompanyCategory'){
				const { data } = await dangerCheckCategoryTree({categoryType:2});
				let list = [];
				list.push({typeName: '根目录', typeId: 0});
				list[0].childList = data;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}else if(props.type == 'flowCategory'){
				const { data } = await flowList({});
				let list = [];
				list.push({name: '根目录'});
				list[0].childList = data.list;
				state.tableData = list;
				state.expandedKey.push(list[0][state.data[props.type].id])
			}
			state.loading = false;
		};
		// list 为需要回显的值
		const open = async (type) => {
			state.treeType = type;
			state.checks = [];
			state.check = {};
			await fetchData();
			state.show = true;
		};
		const close = () => {
			state.show = false;
		};
		const save = ()=>{
			if(props.maxNum > 0){
				state.checks = state.checks.filter((v)=>{
					return v[state.data[props.type].id]
				})
				emit('check-tree', state.checks,state.treeType);
			}else{
				emit('check-tree', state.check,state.treeType);
			}
			close();
		}
		return {
			...toRefs(state),
			open,
			close,
			save,
		};
	},
	methods: {
		handleCheckChange(data, checked) {
			this.checks = checked.checkedNodes.concat(checked.halfCheckedNodes);
		},
		nodeClick(data) {
			this.check = data;
		},
	}
});
</script>
<style scoped lang="scss">
.titleWrap {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #efefef;
	background: #fff;
	font-weight: 700;
	font-size: 16px;
	color: #5757bc;
	padding-bottom: 10px;
}

.contentMask {
	padding: 10px;
	min-height: 300px;
}

.icon-duoren {
	font-size: 18px;
	margin-right: 6px;
	color: var(--el-color-primary);
}

.custom-tree-node {
	position: relative;
	padding: 3px 5px;

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		border: 1px solid #5DBE70;
		width: 100%;
		height: calc(100% - 2px);
		opacity: 0;
	}
}

.checkStyle {
	background: #DFF2E2;

	&::before {
		opacity: 1;
	}
}</style>
