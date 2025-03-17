<template>
  <el-dialog v-model="show" title="文件列表" width="1000" :before-close="close">
    <div class="w100 mb-small">
      <el-row justify="space-between">
        <div>
          <el-button @click="editCategory">
            <el-icon class="el-icon--left"><Plus /></el-icon>
            添加分类
          </el-button>
          <el-dropdown v-if="typeList && typeList.length > 0">
            <el-button style="margin: 0 20px ">
              移动至
              <el-icon class="el-icon--right"><CaretBottom /></el-icon>
            </el-button> 
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item,index) in typeList" :key="index">
                  {{item.groupName }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="danger" @click="deleteFileFunc(false)">
            <el-icon class="el-icon--left"><Delete /></el-icon>
            批量删除
          </el-button>
        </div>
        <div>
          <el-upload 
            multiple
            ref="upload"
            action="string"
            :accept="accept"
            :before-upload="onBeforeUploadImage"
            :http-request="UploadImage"
            :show-file-list="false"
            :on-change="fileChange"
          >
            <el-button type="primary">
              点击上传
              <el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
          </el-upload>
        </div>
      </el-row>
    </div>
    <el-row style="gap: 12px">
      <el-scrollbar height="440px" class="classfiyBox">
        <div class="titleWrap">文件分类</div>
          <div class="contentMask">
            <el-tree 
              :data="typeList"
              :node-key="groupId"
              :props="defaultProps"
              :default-expanded-keys="expandedKey"
              :accordion="true"
              @node-click="selectTypeFunc"
              @check="handleCheckChange"
            >
              <template #default="{ node, data }">
                <span class="custom-tree-node" :class="[node.isCurrent ? 'checkStyle' : '']">
                  <span class="iconfont icon-duoren"></span>
                  <span class="txt">{{ node.label }}</span>
                </span>
              </template>
            </el-tree>
          </div>
      </el-scrollbar>
      <div v-if="config.fileType == 'image'" class="flexAuto">
        <el-table :data="fileList" border ref="tableRef" :height="440" class="w100">
          <el-table-column type="selection" width="60" />
          <el-table-column label="#" fixed="left" width="60">
            <template #default="{ $index }">
              {{ (queryData.pageIndex - 1) * queryData.pageSize  +  $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="图片">
            <template #default="{ row }">
              <img :src="row.filePath" class="tableImg" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="上传日期" width="150"/>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button type="primary" plain size="small">编辑</el-button>
              <el-button type="danger" plain size="small" @click="deleteFileFunc(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="config.fileType == 'document'" class="flexAuto">
        <el-table :data="fileList" border ref="tableRef" :height="440" class="w100" @select="handSelectChange" @select-all="allSelect('tableRef')">
          <el-table-column type="selection" width="60" />
          <el-table-column label="#" fixed="left" width="60">
            <template #default="{ $index }">
              {{ (queryData.pageIndex - 1) * queryData.pageSize  +  $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="附件名称"/>
          <el-table-column prop="createTime" label="上传日期" width="150"/>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button type="primary" plain size="small">编辑</el-button>
              <el-button type="danger" plain size="small" @click="deleteFileFunc(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="queryData.pageIndex"
      :page-size="queryData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>




    
   <!--  <div class="fileContainer">
      <div class="file-type">
          <ul>
            <li :class="activeType==item.groupId?'item active':'item'" v-for="(item,index) in typeList" :key="index"
              @click="selectTypeFunc(item.groupId)">
              {{item.groupName}}
              <div class="operation" @click.stop v-if="item.groupId!=null">
                <p @click="editCategoryFunc(item)"><i class="el-icon-edit"></i></p>
                <p @click="deleteCategoryFunc(item.groupId)"><i class="el-icon-delete"></i></p>
              </div>
            </li>
          </ul>
      </div>
      <div class="file-content">
          <ul>
            <li class="file" v-for="(item, index) in fileList" :key="index" @click="selectFileFunc(item,index)">
              <div v-if="item.selected==true" class="selectedIcon">
                <el-icon><Check /></el-icon>
              </div>
              <img v-if="config.fileType == 'image'" :scr="item.filePath" :style="'background-image:url('+item.filePath+')'" alt="" />
              <div v-else-if="config.fileType == 'document'">
                <el-icon :size="22"><Document /></el-icon>
              </div>
              <p class="desc">{{ item.realName }}</p>
              <div class="bottom-shade" @click.stop>
                <a href="javascript:void(0)"  @click="deleteFileFunc(item)">
                  <el-icon class="el-icon-delete"><Delete /></el-icon>
                </a>
              </div>
            </li>
          </ul>
        </div>
    </div> -->

    
   
    <template #footer>
      <el-row justify="space-between" class="w100 mt-defaul">
        <div></div>
        <div>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </div>
      </el-row>
    </template>
  </el-dialog>
  <AddCategory ref="AddCategoryRef" :fileType="config.fileType" @fetch-data="fetchData"></AddCategory>
</template>
<script>
import { reactive, toRefs, defineComponent, ref,computed, nextTick } from 'vue';
import AddCategory from './part/AddCategory.vue';
import { fileCategory,fileList,uploadFile,delFiles  } from '@/api/file';
import { baseMessageBox, isString, isArray } from '@/utils/validate';
export default defineComponent({
	components: {
		AddCategory
	},
  //maxNum -1为无限
  props:{
    type: String,
    maxNum:{
      type: String,
      default: -1, 
    }
  },
	setup(props) {
		const AddCategoryRef = ref(null);
		const state = reactive({
      tableRef: null,
      expandedKey: [],
			fileType: null,
			show: false,
			config: {
				total: props.maxNum || 1,
				fileType: props.type
			},
			activeType: null,
			fileList:[],
			typeList:[],
			queryData:{
				pageIndex:1,
				pageSize:10,
			},
			total:0,
      defaultProps: {
        children: 'children',
        label: 'groupName',
        value: 'groupId',
      },
      checkList: [],
			// accept:"image/jpeg,image/png,image/jpg,.pdf,.doc,.docx",
			// accept:".pdf, .doc, .docx",
		});
		const accept = computed(()=>{
			if(isString(props.type)){
				if(props.type == 'image'){
					return 'image/jpeg,image/png,image/jpg';
				}else if(props.type == 'document'){
					return ".pdf, .doc, .docx, .xlsx"
				}
			}
			return 'image/jpeg,image/png,image/jpg';
		});
		/* onMounted(()=>{
			fetchData();
		}); */
		const fetchData = ()=>{
			 getFileCategory();
		};
		const getFileCategory = async ()=>{
			const { data } = await fileCategory({type:state.config.fileType});
			let type = [{
				groupId: null,
				groupName: '全部'
			}];
			state.typeList = type.concat(data);
			getData();
		};
		const getData = async ()=>{
			let param = {
				pageIndex: state.queryData.pageIndex,
				pageSize: state.queryData.pageSize,
				groupId: state.activeType,
				fileType: state.config.fileType
			};
			const { data:{ records,total } } = await fileList(param);
			state.fileList = records;
			state.total = total;
      if(state.checkList && state.checkList.length > 0){
        state.checkList.forEach((items)=>{
          state.fileList.forEach((item)=>{
            if(items.fileId == item.fileId){
              nextTick(()=>{
                state.tableRef.toggleRowSelection(item,true);
              })
            }
          })
        })
      }
		};
		const open = async (data,type) => {
      state.fileList = [];
      state.checkList = data;
			state.fileType = type;
      fetchData();
			state.show = true;
		};
		const close = () => {
			state.show = false;
		};
    const handSelectChange = (list,row)=>{
      state.checkList = state.checkList || [];
      if(props.maxNum < 0){
        let idx = state.checkList.findIndex((v)=>{
          return v.fileId == row.fileId
        })
        if(idx == -1){
          state.checkList.push(row)
        }else{
          state.checkList.splice(idx,1)
        }
      }else if(props.maxNum == 1){
        state.tableRef.clearSelection();
        state.tableRef.toggleRowSelection(row,true);
        state.checkList = [];
        state.checkList.push(row)
      }
    }
    const allSelect = (ref)=>{
      if(props.maxNum > 0){
        state[ref].clearSelection();
        state.checkList = [];
      }
    }
		return {
			...toRefs(state),
			fetchData,
			open,
			close,
			getData,
			accept,
			AddCategoryRef,
			handSelectChange,
			allSelect,
		};
	},
	methods: {
		selectTypeFunc(v) {
			this.activeType = v[this.defaultProps.value];
			this.queryData.pageIndex = 1;
			this.getData();
		},
		// selectFileFunc(item, index) {
		// 	if (item.selected) {
		// 		item.selected = false;
		// 		this.record--;
		// 	} else {
		// 		item.selected = true;
		// 		this.record++;
		// 	}
		// 	// this.$set(this.fileList, index, item);
		// },
		editCategory(){
			this['AddCategoryRef'].open();
		},
		onBeforeUploadImage(file) {
			return true;
		},
		async UploadImage(param) {
			const formData = new FormData();
			formData.append('iFile', param.file);
			formData.append('groupId', this.activeType == null ? 0 : this.activeType);
			formData.append('fileType', this.config.fileType);
			const { msg } = await uploadFile(formData);
			ElMessage({
				message: msg,
				type: 'success',
			});
			this.getData();
		},
		deleteFileFunc(e) {
			baseMessageBox('此操作将永久删除该记录, 是否继续?', null, async () => {
				let temp_list=[];
				if(e){
					temp_list.push(e.fileId);
				}else{
					for (let i = 0; i < this.fileList.length; i++) {
						let item = this.fileList[i];
						if (item.selected) {
							temp_list.push(item.fileId);
						}
					}
				}
				if(temp_list.length==0){
					ElMessage({
						message: '请选择文件',
						type: 'warning',
					});
					return;
				}
				temp_list = temp_list.join(',');
				const { msg } = await delFiles({fileIds:temp_list});
				ElMessage({
					message: msg,
					type: 'success',
				});
				this.getData();
			});
		},
		handleCurrentChange(val) {
			this.queryData.pageIndex = val;
			this.fetchData();
		},
		handleSizeChange(val) {
			this.queryData.pageIndex = 1;
			this.queryData.pageSize = val;
			this.fetchData();
		},
		save(){
			/* let list = [];
			let leng=0;
			for (let i = 0; i < this.fileList.length; i++) {
				let item = this.fileList[i];
				if (item.selected) {
					let obj = {
						fileId: item.fileId,
						filePath: item.filePath,
						realName: item.realName
					};
					list.push(obj);
					leng++;
				}
        if(this.config.total > 0){
          if(leng == this.config.total){
            break;
          }
        }else if(this.config.total != -1 && leng - 1 > this.config.total){
          break;
        }
			}

			this.$emit('return-file', list, this.fileType);
			this.close(); */
      this.$emit('return-file',this.checkList,this.fileType)
      this.close(); 
		}
	}
});
</script>
<style lang="scss" scoped>
.classfiyBox{
  border: 1px solid var(--el-border-color-light);
  width: 200px;
  .titleWrap {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #efefef;
    background: #fff;
    font-weight: 700;
    font-size: 16px;
    color: #5757bc;
    padding: 10px 0;
  }
  .contentMask {
    padding: 10px;
    min-height: 300px;
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
    .icon-duoren {
      font-size: 18px;
      margin-right: 6px;
      color: var(--el-color-primary);
    }
    .checkStyle {
      background: #DFF2E2;

      &::before {
        opacity: 1;
      }
    }
  }
  
}





.fileContainer {
    position: relative;
    padding-left: 120px;
    margin-top: 20px;
    // height: 300px;
    .file-type{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      width: 120px;
      li{
        padding: 10px 0;
        cursor: pointer;
        text-align: center;
        padding-right: 20px;
        min-height: 20px;
        position: relative;
        &.active{
          background: #b4b4b4;
          color: #FFFFFF
        }
        &.operation{
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
        }
        &:hover .operation{
          display: block;
        }
      }
    }
  }
  .file-content {
    height: 300px;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    margin: 0;
    overflow-y: auto;
    border: 1px solid #c6c6c6;
    
    li.file {
      list-style: none;
      float: left;
      margin: 10px 9px 0;
      position: relative;
      width: 100px;
      cursor: pointer;
      .selectedIcon {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
        background: #ff9900;
        z-index: 1;
        color: #FFFFFF;
        cursor: pointer;
      }
      img{
        display: inline-block;
        width: 100px;
        height: 100px;
        cursor: pointer;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #fff;
      }
      p.desc {
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
      .bottom-shade{
        position: absolute;
        bottom: 16px;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        height: 26px;
        line-height: 26px;
        width: 100%;
        display: none;
        transform: all 0.2s ease-out 0s;
        color: #FFFFFF;
        a{
          color:#FFFFFF;
        }
      }
      &:hover{
        .bottom-shade{
          display: block;
        }
      }
    }
  }
</style>
  