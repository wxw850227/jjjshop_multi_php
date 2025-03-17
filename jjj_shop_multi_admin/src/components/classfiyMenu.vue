<template>
  <div class="classfiyBox" :style="{ height: `${maxHeight}` }">
    <div class="header" ref="headerRef">
      <slot name="header"></slot>
    </div>
    <el-row class="w100 content">
      <el-card shadow="never" class="menuBox">
        <div class="titleWrap">{{ showData.title }}</div>
        <div class="treeWrap" v-if="!loading">
          <el-tree :data="list" :node-key="showData.props && showData.props.value" :props="showData.props" @nodeClick="nodeClick" :expand-on-click-node="false" :default-expand-all="true" ref="treeRef" v-if="!show">
            <template #default="{ node }">
              <span class="custom-tree-node" :class="[node.isCurrent ? 'checkStyle' : '']">
                  <span v-if="node.level === 1" class="iconfont icon-gongsi"></span>
                  <span class="iconfont icon-duoren" v-else></span>
                  <span class="txt">
                    <span style="padding-right: 6px;">{{ node.label }}</span>
                    <span v-if="operation && (node.level < maxNum + 1 || maxNum == -1)">
                      <span class="iconList" v-if="node.label != '根目录'">
                      <el-icon @click.stop="clickEdit('add', node)">
                        <Plus />
                      </el-icon>
                      <el-icon @click.stop="clickEdit('edit', node)">
                        <Edit />
                      </el-icon>
                      <el-icon @click.stop="clickDel(node)">
                        <Delete />
                      </el-icon>
                    </span>
                    <span class="iconList" v-else>
                      <el-icon @click.stop="clickEdit('add', node)" style="color: var(--el-color-primary)">
                        <Plus />
                      </el-icon>
                    </span>
                    </span>
                   
                  </span>
                </span>

              <!-- </span> -->
            </template>
          </el-tree>
        </div>
      </el-card>
      <el-card shadow="never" class="tableBox flexAuto" :style="{ minHeight: `${maxHeight}` }">
        <slot></slot>
      </el-card>
    </el-row>
  </div>
  <editName ref="editNameRef" @get-data="open" />
</template>
<script>
import { reactive, toRefs, defineComponent, watch, nextTick, inject } from "vue";
import { departmentIndex } from '@/api/enterprise';
import { roleList } from '@/api/setting';
import { trainCourseCategoryIndex, trainCourseCategoryDel } from "@/api/course/course.js"; 
import { dangerAccordCategoryTree, dangerAccordCategoryDel, dangerCheckCategoryTree, dangerCheckCategoryDel } from "@/api/prevention/danger/danger.js";
import { flowList } from "@/api/setting";
import editName from "./editName.vue";

export default defineComponent({
  components: {
    editName
  },
  props: {
    title: String,
    active: Number,
    maxHeight: Number,
    maxNum: {
      type: Number,
      default: -1,
    },
    // 对分类的操作 true 可以增加删除 false 只可查看
    operation:{
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const state = reactive({
      loading: true,
      baseConfirm: inject('$baseConfirm'),
      editNameRef: null,
      treeRef: null,
      headerRef: null,
      headerHeigth: 0,
      data: {
        // 部门分类
        department:{
          title: '部门',
          props:{
            children: 'children',
            label: 'name',
            value: 'departmentId',
          },
        },
        // 角色
        role:{
          title: '角色',
          props:{
            children: 'children',
            label: 'roleName',
            value: 'roleId',
          },
        },
        // 单位课程库
        trainCourseCategory:{
          title: '目录',
          props:{
            children: 'children',
            label: 'name',
            value: 'categoryId',
          },
        },
        // 自建检查依据分类
        dangerAccordCategory: {
          title: '目录',
          props: {
            children: 'childList',
            label: 'typeName',
            value: 'typeId',
          }
        },
        // 公共检查依据分类
        dangerAccordPublicCategory: {
          title: '目录',
          props: {
            children: 'childList',
            label: 'typeName',
            value: 'typeId',
          }
        },
        // 基础检查依据分类
        dangerAccordBasicCategory: {
          title: '目录',
          props: {
            children: 'childList',
            label: 'typeName',
            value: 'typeId',
          }
        },
        // 公司基础表
        dangerCheckCompanyCategory: {
          title: '目录',
          props: {
            children: 'childList',
            label: 'typeName',
            value: 'typeId',
          }
        },
        // 公共检查表
        dangerCheckPublicCategory: {
          title: '目录',
          props: {
            children: 'childList',
            label: 'typeName',
            value: 'typeId',
          }
        },
        // 审批流程模块分类
        flowCategory:{
          title: '目录',
          props: {
            children: 'childList',
            label: 'name',
            value: 'name',
          }
        }
        
      },
      list: [],
      showData: {
        title: '目录',
        props: {
          children: 'children',
          label: 'name',
          value: 'id',
        },
      },
      typeName: null,
    })
    const open = async (type) => {
      state.loading = true;
      state.typeName = type;
      state.show = true;
      if(type == 'department'){
        const { data } = await departmentIndex();
        let list = [{ name: '根目录', departmentId: 0 }];
        if (data && data.length > 0) {
          list[0].children = data;
        }
        state.list = list;
        state.showData = state.data[type];
      }else if(type == 'role'){
        const { data } = await roleList();
        let list = [{ roleName: '根目录', roleId: 0 }];
        if (data && data.length > 0) {
          list[0].children = data;
        }
        state.list = list;
        state.showData = state.data[type];
      } else if(type == 'trainCourseCategory'){
        const { data } = await trainCourseCategoryIndex();
        let list = [{ name: '根目录', courseId: 0 }];
        if (data && data.length > 0) {
          list[0].children = data;
        }
        state.list = list;
        state.showData = state.data[type];
      } else if (type == 'dangerAccordCategory') {
        const { data } = await dangerAccordCategoryTree({categoryType:3});
        let list = [{ typeName: '根目录', typeId: 0 }];
        if (data && data.length > 0) {
          list[0].childList = data;
        }
        state.list = list;
        state.showData = state.data[type];
      }else if (type == 'dangerAccordPublicCategory') {
        const { data } = await dangerAccordCategoryTree({categoryType:2});
        let list = [{ typeName: '根目录', typeId: 0 }];
        if (data && data.length > 0) {
          list[0].childList = data;
        }
        state.list = list;
        state.showData = state.data[type];
      }else if (type == 'dangerAccordBasicCategory') {
        const { data } = await dangerAccordCategoryTree({categoryType:1});
        let list = [{ typeName: '根目录', typeId: 0 }];
        if (data && data.length > 0) {
          list[0].childList = data;
        }
        state.list = list;
        state.showData = state.data[type];
      }else if(type == 'dangerCheckCompanyCategory'){
				const { data } = await dangerCheckCategoryTree({categoryType:2});
        let list = [{ typeName: '根目录', typeId: 0 }];
        if (data && data.length > 0) {
          list[0].childList = data; 
        }
        state.list = list;
        state.showData = state.data[type];
			} else if(type == 'dangerCheckPublicCategory'){
				const { data } = await dangerCheckCategoryTree({categoryType:1});
        let list = [{ typeName: '根目录', typeId: 0 }];
        if (data && data.length > 0) {
          list[0].childList = data; 
        }
        state.list = list;
        state.showData = state.data[type];
			} else if(type == 'flowCategory'){
				const { data } = await flowList({});
        let list = [{ name: '根目录'}];
        if (data && data.list && data.list.length > 0) {
          list[0].childList = data.list;
        }
        state.list = list;
        state.showData = state.data[type];
			} 
      state.loading = false;
      state.show = false;
    }
    return {
      ...toRefs(state),
      open,
    };
  },
  methods: {
    clickEdit(type, v) {
      this.editNameRef.open(type, v.data, this.typeName)
    },
    nodeClick(v) {
      this.$emit('chang-category', v)
    },
    clickDel(node) {
      this.baseConfirm("您确定要删除当前分类吗？", null, async () => {
        if (this.typeName == 'trainCourseCategory') {
          const { data: { categoryId } } = node;
          const { msg } = await trainCourseCategoryDel({ id: categoryId });
          ElMessage({
            message: msg,
            type: 'success',
          });
          this.open(this.typeName);
        } else if(this.typeName == 'dangerAccordCategory'){
          const { data: { typeId } } = node;
          const { msg } = await dangerAccordCategoryDel({ id: typeId });
          ElMessage({
            message: msg,
            type: 'success',
          });
          this.open(this.typeName);
        } else if(this.typeName == 'dangerCheckCompanyCategory'){
          const { data: { typeId } } = node;
          const { msg } = await dangerCheckCategoryDel({ id: typeId });
          ElMessage({
            message: msg,
            type: 'success',
          });
          this.open(this.typeName);
        } else if(this.typeName == 'dangerCheckPublicCategory'){
          const { data: { typeId } } = node;
          const { msg } = await dangerCheckCategoryDel({ id: typeId });
          ElMessage({
            message: msg,
            type: 'success',
          });
          this.open(this.typeName);
        }
      });
    }
  }
})
</script>
<style scoped lang="scss">
::v-deep(.el-card__body){
  --el-card-padding: 12px !important;
}
$width: 250px;

.iconList {
  .el-icon {
    color: var(--el-color-primary);
    margin-right: 4px;
  }

  .el-icon:last-child {
    margin-right: none;
    color: var(--el-color-danger);
  }
}

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

.classfiyBox {
  .content {
    height: 100%;
  }
}

.menuBox {
  width: $width;
  float: left;
}

.tableBox {
  position: absolute;
  left: calc($width + 12px);
  width: calc(100% - $width - 12px);
}

.iconfont.checkStyle {
  background: #DFF2E2;
  border: 1px solid var(--el-color-primary);
}

.txt.checkStyle {
  color: var(--el-color-primary);
}

.custom-tree-node {
  position: relative;
  padding: 3px 5px;
  z-index: 10;

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

.icon-gongsi {
  color: var(--el-color-primary);
}

.icon-shiyongwendang {
  color: #8BA5C9;
}

.icon-duoren {
  font-size: 18px;
  margin-right: 6px;
  color: var(--el-color-primary);
}
</style>
