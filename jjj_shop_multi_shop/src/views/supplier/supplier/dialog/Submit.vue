<template>
  <div v-if="status !== 30">
    <el-dialog
      title="提现审核"
      v-model="dialogVisible"
      @close="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <el-form-item label="审核状态" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="form.apply_status" :label="20"
              >审核通过</el-radio
            >
            <el-radio v-model="form.apply_status" :label="30">驳回</el-radio>
          </div>
        </el-form-item>
        <div v-if="form.apply_status === 30">
          <el-form-item label="驳回原因" :label-width="formLabelWidth">
            <el-input
              v-model="form.reject_reason"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible(false)">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <div v-else>
    <el-dialog
      title="驳回原因"
      v-model="dialogVisible"
      @close="dialogFormVisible(false)"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p>{{ reject_reason }}</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible(false)">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent, watch } from 'vue';
import { cashSubmit } from "@/api/supplier.js";
import { ElMessage } from "element-plus"; 

export default defineComponent({
  props: ["open", "form"],
  setup(props) {
    const state = reactive({
      status:"",
      reject_reason:"",
      formLabelWidth:"120px",
      dialogVisible: false,
    })
    watch(
      () => props.open,
      (n, o) => {
        state.dialogVisible = n;
        if (n !== o && n) {
          state.status = props.form.apply_status;
          if (state.status === 30) {
            state.reject_reason = props.form.reject_reason;
          }
        }
      }
    );
    return {
			...toRefs(state),
		};
  },
  methods:{
    save(){
      let params = this.$props.form;
      cashSubmit(params, true)
        .then((data) => {
          ElMessage({
            message: "恭喜你，修改成功",
            type: "success",
          });
          this.dialogFormVisible(true);
        })
        .catch((error) => {});
    },
    dialogFormVisible(e) {
      if (e) {
        this.$emit('close', true);
      } else {
        this.$emit('close', false);
      }
    }
  },
  
})


// export default {
//   props: ["open", "form"],
//   setup(props) {
//     const status = ref("");
//     const reject_reason = ref("");
//     const formLabelWidth = "120px";
//     const dialogVisible = ref(false);

    

//     const cashSubmit = () => {
//       let params = props.form;
//       cashSubmit(params, true)
//         .then((data) => {
//           ElMessage({
//             message: "恭喜你，修改成功",
//             type: "success",
//           });
//           dialogFormVisible(true);
//         })
//         .catch((error) => {});
//     };

//     const dialogFormVisible = (e) => {
//       console.log("e",e)
//       if (e) {
//         dialogVisible.value = true;
//       } else {
//         dialogVisible.value = false;
//       }
//     };

//     return {
//       status,
//       reject_reason,
//       formLabelWidth,
//       dialogVisible,
//       cashSubmit,
//       dialogFormVisible,
//     };
//   },
// };
</script>

<style></style>
