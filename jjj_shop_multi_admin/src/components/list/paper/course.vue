<template>
  <el-dialog v-model="show" title="课程库" width="1110" :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="已选课程库" prop="groupName">
          <div class="tagBox">
            <div class="btnTag"  v-for="(tag,index) in checkList" :key="index">
              <span>{{ tag.name }}</span>
              <el-icon><CloseBold /></el-icon>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeTab" @tab-change="tabChange">
        <el-tab-pane label="单位课程库" :name="1" />
        <el-tab-pane label="公共课程库" :name="2" />
      </el-tabs>
      <el-row style="gap: 20px;margin-top: 10px">
        <el-card shadow="never" class="leftMenu">
          <div class="titleWrap">目录</div>
          <div class="treeWrap">
            <el-tree :data="classfiy" :node-key="defaultProps.children" :props="defaultProps" @node-click="nodeClick"
            :default-expand-all="true">
            <template #default="{ node, data }">
              <span class="custom-tree-node" :class="[node.isCurrent ? 'checkStyle' : '']">
                <span v-if="node.level === 1" class="iconfont icon-jurassic_folder"></span>
                <span v-if="node.childNodes.length && node.level !== 1" class="iconfont icon-jurassic_folder"></span>
                <span v-show="!node.isCurrent && !node.childNodes.length && node.level !== 1"
                  class="iconfont icon-shiyongwendang"></span>
                <span v-show="node.isCurrent && !node.childNodes.length && node.level !== 1"
                  class="iconfont icon-shiyongwendang"></span>
                <span class="txt">{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
          </div>
        </el-card>
        <el-card shadow="never" class="flexAuto">
          <el-table :data="tableData" border ref="tableRef" :max-height="300">
            <el-table-column prop="" label="" width="40">
              <template #default="{ $index, row }">
                <el-checkbox v-model="tableData[$index].check" @change="handleCheckChange(row)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="#" width="40">
                <template #default="{ $index }">
                    {{ $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称(课件/系列课程)" />
<!--            <el-table-column prop="name" label="课件数量"  width="60"/>-->
            <el-table-column prop="time" label="课件时长（分钟）" />
<!--            <el-table-column prop="" label="类型" width="60" />-->
            <el-table-column prop="categoryName" label="所属目录" />
            <el-table-column prop="createTime" label="创建日期" >
              <template #default="{ row }">
                {{ handTime(row.createTime) }}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page="queryData.pageIndex" :page-size="queryData.pageSize" layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>

      </el-row>
    </div>

    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from "vue";
import { coursewareIndex, courseCategory } from "@/api/course.js";

export default defineComponent({
  components: {},
  props: {
    /* maxNum代表可选最大数量，负数不限，正数最大多少个 */
    maxNum: {
      type: Number,
      default: -1,
    }
  },
  setup(props) {
    const formRef = ref(null)
    const state = reactive({
      activeTab: 1,
      checkAll: null,
      tableRef: null,
      show: false,
      form: {},
      tableData: [],
      checkList: [],
      queryData: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'departmentId',
      },
      classfiy: [],
    })
    const fetchData = async () => {
      const { data: { records,total } } = await coursewareIndex(state.queryData);
      state.tableData = records;
      state.total = total;
    }
    const getDepartment = async () => {
      const { data } = await courseCategory();
      state.classfiy = data;
    }

    // list 为需要回显的值
    const open = async (list) => {
      getDepartment();
      await fetchData();
      state.checkList = [];
      showData(list);
      state.show = true;
    }
    const showData = (list) => {
      if (list && list.length > 0) {
        list.forEach((v) => {
          state.tableData.forEach((item) => {
            item.check = false;
            if (item.enterpriseEmpId == v.enterpriseEmpId) {
              setTimeout(() => {
                item.check = true;
              });
            }
          })
        })
        state.checkList = list;
      } else {
        state.tableData.forEach(item => {
          item.check = false;
        });
      }
    }
    const close = () => {
      state.show = false;
    }
    const handleCheckChange = (row) => {
      if (props.maxNum < 0) {
        if (row.check) {
          state.checkList.push(row)
        } else {
          let idx = state.checkList.findIndex((v) => v.enterpriseEmpId == row.enterpriseEmpId)
          state.checkList.splice(idx, 1)
        }
      } else {
        state.checkList = [];
        state.tableData.forEach((v) => {
          v.check = false;
        })
        row.check = true;
        if (row.check) {
          state.checkList.push(row)
        }
      }
    }
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
    save() {
      if (this.checkList && this.checkList.length > 0) {
        this.$emit('check-course', this.checkList)
      }
      this.close();
    },
    handTime(str){
      if(str){
        return str.substring(0,10)
      }
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
  font-size: 15px;
  color: #5757bc;
  padding-bottom: 10px;
}
.treeWrap{
  padding-top: 10px;
}
.leftMenu{
  width: 200px;
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
.icon-jurassic_folder{
    color: var(--el-color-primary);
    font-size: 18px;
  }
  .icon-shiyongwendang{
    color: #8BA5C9;
  }
  .tagBox{
    background: #fff;
    border: 1px solid var(--el-border-color-light);
    padding: 5px;
    padding-bottom: 0px;
    min-height: 30px;
    max-height: 105px;
    overflow-y: scroll;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .btnTag{
    background: #eee;
    padding: 5px 10px;
    display: inline-block;
    margin-right: 5px;
    font-weight: normal;
    margin-bottom: 5px;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    vertical-align: middle;
    .el-icon{
      color: red;
      position: relative;
      left: 2px;
      top: 1px;
      cursor: pointer;
    }
  }
</style>
