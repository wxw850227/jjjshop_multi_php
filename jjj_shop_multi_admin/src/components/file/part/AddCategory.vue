<template>
  <el-dialog :title="title" v-model="show"  width="480" :before-close="handleClose">
    <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="groupName">
        <el-input v-model="form.groupName" placeholder="" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from 'vue';
import { addCategory,editCategory } from '@/api/file'; 
export default defineComponent({
	props:{
		fileType: String,
	},
	components: {},
	setup(props) {
		const formRef = ref(null);
		const state = reactive({
			title: '新增分类',
			show: false,
			form:{},
			rules: {
				groupName: [{ required: true, message: '分类名称必填', trigger: 'blur' }],
			},
		});
		const open = async ()=>{
			state.form.groupType = props.fileType;
			state.show = true;
		};
		const close = () => {
			state.show = false;
		};
		return {
			...toRefs(state),
			open,
			close,
			formRef,
		};
	},
	methods: {
		test(){
			this.$emit('fetch-data');
		},
		save(){
			this.formRef.validate(async (valid) => {
				if(valid){
					const { msg } = this.form.questionCategoryId ? await editCategory(this.form) : await addCategory(this.form);
					ElMessage({
						message: msg,
						type: 'success',
					});
					this.$emit('fetch-data');
					this.close();
				}
			});
		}
	}
});
</script>
<style lang="scss" scoped>
</style>
  