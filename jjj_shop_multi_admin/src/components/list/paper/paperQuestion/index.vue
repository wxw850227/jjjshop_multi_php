<template>
  <el-dialog v-model="show" title="试题选择" width="1110" :before-close="handleClose">
    
      <el-button type="danger" link>总题数：6道 总分数：14分</el-button>
      <span> 包含试题： 单选题：(0) 多选题：(0) 判断题：(4) 填空题：(2) 问答题：(0)</span>
      <!-- <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="已选试题" prop="groupName">
          <div class="tagBox">
            <div class="btnTag" v-for="(tag, index) in checkList" :key="index">
              <span>{{ tag.name }}</span>
              <el-icon>
                <CloseBold />
              </el-icon>
            </div>
          </div>
        </el-form-item>
      </el-form> -->
      <el-tabs v-model="activeTab" @tab-change="tabChange">
        <el-tab-pane label="单位题库" name="unit" />
        <el-tab-pane label="公共题库" name="pulic" />
      </el-tabs>
    <el-scrollbar :max-height="400"> 
      <el-row style="gap: 20px;margin-top: 10px" class="w100">
        <div class="exam w100" v-for="(v, index) in tableData" :key="v">
            <el-row>
              <div class="flexAuto">
                <el-row class="con">
                  <el-row align="middle">
                    <el-checkbox :model-value="tableData[index].check" :true-label="true" :false-label="false"
                      @change="changTopic(index, tableData[index])">
                      &nbsp;
                    </el-checkbox>
                    <div class="flexAuto">
                      <span>{{ index + 1 }}、</span>

                      <span>{{ tableData[index].stem }}</span>
                    </div>
                  </el-row>
                </el-row>
                <div class="option">
                  <div v-for=" v in tableData[index].options"> {{ v.option + '、' + v.description }}</div>
                </div>
                <div class="answer">
                  <div><span class="pre">正确答案</span><span class="result" v-for=" v in tableData[index].answer">{{ v }}</span>
                  </div>
                  <div><span class="pre">分值</span><span class="result">{{ tableData[index].score }}</span></div>
                </div>
              </div>
              <div class="detail">
                <div class="answer">

                  <div><span class="pre">难度</span><span class="">{{ tableData[index].difficultyText }}</span></div>
                  <div><span class="pre">题型</span><span class="">{{ tableData[index].questionTypeText }}</span></div>
                  <div><span class="pre">状态</span><span class="">{{ tableData[index].statusText }}</span></div>
                  <div><span class="pre">专业分类</span><span class="">{{ tableData[index].specialTypeText }}</span></div>
                  <!--            <div><span class="pre">所属目录</span><span class="">三级安全教育培训</span></div>-->
                  <div><span class="pre">解析</span>{{ tableData[index].analysis }}</div>
                </div>
              </div>
            </el-row>
          </div>
      </el-row>
    </el-scrollbar>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from "vue";
import {questionIndex, questionGenerate, questionSetCategory} from '@/api/paper.js';
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
      activeTab: 'unit',
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
      const { data: { records, total } } = await questionIndex(state.queryData);
      state.tableData = records;
      state.total = total;
    }
    // list 为需要回显的值
    const open = async (list) => {
      // 公共题库
      if(state.activeTab == 'unit'){

      }else if(state.activeTab == 'pulic'){

      }
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
            if (item.questionId == v.questionId) {
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
    return {
      ...toRefs(state),
      open,
      close,
      fetchData,
      showData,
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
    changTopic(index,item){
      this.checkList = this.checkList || [];
			if(this.tableData[index].check){
				let idx = this.checkList.findIndex((v)=>{
					return v.questionId == item.questionId;
				});
				this.checkList.splice(idx,1);
			}else{
				this.checkList.push(item);
			}
			this.tableData[index].check = !this.tableData[index].check;
		},
		allCheck(){
			if(this.tableData && this.tableData.length > 0){
				let flag = this.tableData.every((v)=>{
					return v.check;
				});
				if(flag){
					this.tableData.forEach((v)=>{
						v.check = false;
					});
				}else{
					this.tableData.forEach((v)=>{
						v.check = true;
					});
				}
				this.checkList = tableData;
			}
		},
    save() {
      if (this.checkList && this.checkList.length > 0) {
        this.$emit('check-course', this.checkList)
      }
      this.close();
    },
    handTime(str) {
      if (str) {
        return str.substring(0, 10)
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

.treeWrap {
  padding-top: 10px;
}

.leftMenu {
  width: 200px;
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
}

.icon-jurassic_folder {
  color: var(--el-color-primary);
  font-size: 18px;
}

.icon-shiyongwendang {
  color: #8BA5C9;
}

.tagBox {
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

.btnTag {
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

  .el-icon {
    color: red;
    position: relative;
    left: 2px;
    top: 1px;
    cursor: pointer;
  }
}
.exam{
    background: rgba(64,158,255,.1);
    border-radius: 4px;
    border: 1px solid #c6e2ff;
    padding: 10px;
    // width: 100%;
    margin-bottom: 10px;
    color: #000;
    .detail{
        width: 400px;
        position: relative;
        padding: 0  20px;
        &::before{
            content: "";
            position: absolute;
            left: 8px;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #c6e2ff;
        }
    }
    .con{
    font-weight: bold;
    font-size: 14px;
    div,span{
        font-size: inherit;
    }
}
.option{
    margin-top: 20px;
    margin-bottom: 12px;
    div{
        line-height: 20px;
    }
}
.answer{
    /* background: #ffffff;
    padding: 10px;
    border: 1px solid #c6e2ff;
    border-radius: 5px;
    margin-bottom: 10px; */
    position: relative;
    .actionBtn{
        position: absolute;
        right: 0;
        top: 0;
    }
    .pre{
        font-weight: bold;
        margin-right: 6px;
    }
    div{
        margin-bottom: 6px;
    }
    div:last-child{
        margin-bottom: 0;
    }
    .result{
        color: green;
        font-weight: bold;
    }
}
}
</style>
