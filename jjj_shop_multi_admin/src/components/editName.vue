<template>
    <el-dialog v-model="show" :title="title" width="400" :before-close="close">
        <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name" placeholder="" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" :loading="loading" @click="save"> 确定 </el-button>
            <el-button @click="close"> 取消 </el-button>
        </template>
    </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from "vue";
import { trainCourseCategoryAdd, trainCourseCategoryEdit } from "@/api/course/course.js"; 
import { dangerAccordCategoryAdd, dangerAccordCategoryEdit, dangerCheckCategoryAdd, dangerCheckCategoryEdit } from "@/api/prevention/danger/danger.js";

export default defineComponent({
    components: {},
    setup() {
        const state = reactive({
            formRef: null,
            title: "",
            loading: false,
            show: false,
            form: {},
            rules: {
				name: [{ required: true, message: '分类名称必填', trigger: 'blur' }],
			},
            type: null,
            typeName: null,
        })
        const open = (type,row,typeName) => {
            state.typeName = typeName;
            state.type = type;
            state.form = {};
            if(type == 'edit'){
                state.title = '编辑分类';
                state.form = Object.assign(state.form,row);
            }else {
                state.title = '新增分类';
                if(typeName == 'trainCourseCategory'){ 
                    state.form.parentId = row.categoryId;
                }else if(typeName == 'dangerAccordCategory'){
                    state.form.parentId = row.typeId; 
                }else if(typeName == 'dangerCheckCompanyCategory'){
                    state.form.parentId = row.typeId; 
                }
            }
            state.show = true;
        }
        return {
            ...toRefs(state),
            open,
        };
    },
    methods: {
        close() {
            this.show = false;
        },
        save() {
            this.formRef.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    if(this.typeName == 'trainCourseCategory'){
                        if(this.type == 'edit'){
                            trainCourseCategoryEdit(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName)
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }else{
                            trainCourseCategoryAdd(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName)
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }
                    }else if(this.typeName == 'dangerAccordCategory'){
                        this.form.typeName = this.form.name;
                        if(this.type == 'edit'){
                            this.form.categoryType = 3;
                            dangerAccordCategoryEdit(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName) 
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }else{
                            this.form.categoryType = 3;
                            dangerAccordCategoryAdd(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName)
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }
                    }else if(this.typeName == 'dangerCheckCompanyCategory'){
                        this.form.typeName = this.form.name;
                        if(this.type == 'edit'){
                            this.form.categoryType = 2;
                            dangerCheckCategoryEdit(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName) 
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }else{
                            this.form.categoryType = 2;
                            dangerCheckCategoryAdd(this.form).then((response)=>{
                                const { msg } = response;
                                ElMessage({
                                    message: msg,
                                    type: 'success',
                                });
                                this.close();
                                this.$emit("get-data",this.typeName)
                                this.loading = false;
                            })
                            .catch(()=>{
                                this.loading = false;
                            })
                        }
                    }
                }
            })
        }
    }
})
</script>
<style scoped></style>
    