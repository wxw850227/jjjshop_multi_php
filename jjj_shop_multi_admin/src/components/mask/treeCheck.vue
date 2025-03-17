<template>
  <el-dialog v-model="show" :title="dialogTitle" width="400" :before-close="close">
    <el-scrollbar height="400px">
      <el-card shadow="never">
        <div class="titleWrap">{{ title }}</div>
        <div class="contentMask">
          <el-tree
            :data="tableData"
            show-checkbox
            :node-key="defaultProps.value"
            :props="defaultProps"
            :default-expand-all="true"
            @check="handleCheckChange"
          >
          <template #default="{ node, data }">
            <span class="mr-small">{{ node.label }}</span>
            <!-- <span v-if="true" style="color: var(--el-color-primary)">(已设置)</span> -->
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
import { reactive, toRefs, defineComponent, ref } from "vue";
import { departmentIndex } from "@/api/enterprise";
export default defineComponent({
  components: {},
  props: {
    /* maxNum: {
      type: Number,
      default: -1,
    } */
    title:{
      type: String,
    },
    dialogTitle:{
      type: String,
    },
    defaultProps:{
      type: Object,
    },
    // course 课件目录
    type:{
      type: String,
    },
  },
  setup(props) {
    const formRef = ref(null)
    const state = reactive({
      show: false,
      check: {},
      tableData: [],
    })
    const fetchData = async () => {
      console.log(props.type,'..')
      // 这里调用部门的接口
      if(props.type == 'departmen'){
        const { data } = await departmentIndex(state.queryData);
        state.tableData = data;
      }
    }
    // list 为需要回显的值
    const open = async () => {
      await fetchData();
      state.show = true;
    }
    const close = () => {
      state.show = false;
    }
    return {
      ...toRefs(state),
      open,
      close,
    };
  },
  methods: {
    handleCheckChange(data, checked) {
      this.check = checked.checkedNodes.concat(checked.halfCheckedNodes);
    },
    save() {
      if(this.check && this.check.length > 0){
        this.$emit('tree-check', this.check)
      }
      this.close();
    }
  }
})
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
.icon-duoren{
  font-size: 18px;
  margin-right: 6px;
  color: var(--el-color-primary);
}
.custom-tree-node{
  position: relative;
  padding: 3px 5px ;
  &::before{
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
.checkStyle{
    background: #DFF2E2;
    &::before{
      opacity: 1;
    }
  }
</style>
