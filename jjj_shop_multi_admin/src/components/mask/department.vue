<template>
  <el-dialog v-model="show" title="选择部门" width="400" :before-close="close">
    <el-scrollbar height="400px">
      <el-card shadow="never">
        <div class="titleWrap">部门</div>
        <div class="contentMask">
          <el-tree :data="tableData" node-key="departmentId" :props="defaultProps" @node-click="nodeClick" ref="treeRef">
            <template #default="{ node, data }">
              <span class="custom-tree-node" :class="[node.isCurrent ? 'checkStyle' : '']">
                <span class="iconfont icon-duoren"></span>
                <!-- <span v-if="node.level === 1" class="iconfont icon-jurassic_folder"></span>
                <span v-if="node.childNodes.length && node.level !== 1" class="iconfont icon-jurassic_folder"></span>
                <span v-show="!node.isCurrent && !node.childNodes.length && node.level !== 1"
                  class="iconfont icon-shiyongwendang"></span>
                <span v-show="node.isCurrent && !node.childNodes.length && node.level !== 1"
                  class="iconfont icon-shiyongwendang"></span> -->
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
import { reactive, toRefs, defineComponent, ref } from "vue";
import { departmentIndex } from "@/api/enterprise";
export default defineComponent({
  components: {},
  props: {
    /* maxNum: {
      type: Number,
      default: -1,
    } */
  },
  setup(props) {
    const formRef = ref(null)
    const state = reactive({
      show: false,
      check: {},
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'departmentId',
      },
    })
    const fetchData = async () => {
      const { data } = await departmentIndex(state.queryData);
			let list = [];
			list.push({name: '测试有限公司',departmentId: -1})
			list[0].children = data;
			state.tableData = list;
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
    nodeClick(data){
      this.check = data;
    },
    save() {
      if(this.check && this.check.departmentId){
        this.$emit('check-department', this.check)
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
