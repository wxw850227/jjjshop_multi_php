<template>
  <el-dialog
    title="编辑分类"
    v-model="dialogVisible"
    @close="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form size="small" :model="formData" :rules="formRules" ref="form">
      <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="保证金(元)"
        :label-width="formLabelWidth"
        prop="deposit_money"
      >
        <el-input v-model="formData.deposit_money" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save" :loading="loading"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs, defineComponent, onMounted } from "vue";
import { editCategory } from "@/api/supplier.js";
export default defineComponent({
  setup() {
    const state = reactive({
      formData: {
        name: "",
        deposit_money: "",
      },
      formRules: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur",
          },
        ],
        deposit_money: [
          {
            required: true,
            message: "请输入保证金",
            trigger: "blur",
          },
        ],
      },
      /*左边长度*/
      formLabelWidth: "120px",
      /*是否显示*/
      dialogVisible: false,
      loading: false,
    })
    const open = (data)=>{
      state.formData = {};
      state.formData = Object.assign(state.formData,data)
      state.dialogVisible = true;
    }
    return {
      ...toRefs(state),
      open,
    };
  },
  methods:{
    save(){
      this.loading = true;
      editCategory(this.formData, true)
        .then((data) => {
          this.loading = false;
          ElMessage({
            message: "恭喜你，修改成功",
            type: "success",
          });
          this.dialogFormVisible(true);
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    dialogFormVisible(e) {
      if (e) {
        this.$emit("closeDialog", {
          type: "success",
          openDialog: false,
        });
        this.dialogVisible = false;
      } else {
        this.$emit("closeDialog", {
          type: "error",
          openDialog: false,
        });
        this.dialogVisible = false;
      }
    },
  }
})
// export default {
//   data() {
//     return {
      
//     };
//   },
//   props: ["open_edit", "form"],
//   created() {
//     this.dialogVisible = this.open_edit;
//     this.form = Object.assign(this.form,this.$props.form)
//   },
//   methods: {
//     /*修改分类*/
//     editCategory() {
//       let self = this;
//       let params = this.form;
//       console.log("params",params)
//       /* self.loading = true;
//       editCategory(params, true)
//         .then((data) => {
//           self.loading = false;
//           ElMessage({
//             message: "恭喜你，修改成功",
//             type: "success",
//           });
//           self.dialogFormVisible(true);
//         })
//         .catch((error) => {
//           self.loading = false;
//         }); */
//     },

//     /*关闭弹窗*/
//     dialogFormVisible(e) {
//       if (e) {
//         this.$emit("closeDialog", {
//           type: "success",
//           openDialog: false,
//         });
//       } else {
//         this.$emit("closeDialog", {
//           type: "error",
//           openDialog: false,
//         });
//       }
//     },
//   },
// };
</script>

<style></style>
