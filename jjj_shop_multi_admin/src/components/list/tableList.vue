<template>
  <el-dialog v-model="show" :title="dialogTxt" width="1100" :before-close="handleClose">
    <div>
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="已选" prop="groupName">
          <div class="tagBox">
            <div class="btnTag" v-for="(tag,index) in checkList" :key="index">
              <span>{{ tag[data[type].name] }}</span>
              <el-icon>
                <CloseBold/>
              </el-icon>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-row style="gap: 20px;margin-top: 6px">
        <!-- <el-card shadow="never" class="leftMenu">
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

        </el-card> -->
        <el-card shadow="never" class="flexAuto">
          <div v-if="type == 'staff'">
            <el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index, row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="empNo" label="员工编号"/>
              <el-table-column prop="realName" label="员工名称"/>
              <el-table-column prop="createTime" label="创建时间"/>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
          </div>
          <div v-if="type == 'position'">
            <el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index,row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="positionId" label="编号"/>
              <el-table-column prop="name" label="岗位名称"/>
              <el-table-column prop="createTime" label="创建时间"/>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
          </div>
		  <div v-if="type == 'department'">
            <el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index,row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="departmentId" label="编号"/>
              <el-table-column prop="name" label="部门名称"/>
              <el-table-column prop="createTime" label="创建时间"/>
            </el-table>
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination> -->
          </div>
          <div v-if="type == 'role'">
            <el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index,row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="roleId" label="编号"/>
              <el-table-column prop="roleName" label="角色名称"/>
              <el-table-column prop="createTime" label="创建时间"/>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
          </div>
          <div v-if="type == 'coursewareFile'">
            <el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-row justify="space-between">
                <el-form-item label="筛选条件">
                  <el-input v-model="data[type].queryData.name" placeholder="请输入附件名称进行查找"
                            class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
                <div>
                  <el-upload
                      ref="upload"
                      action="string"
                      accept="image/jpeg,image/png,image/jpg,.pdf,.doc,.docx"
                      :http-request="UploadImage"
                      :show-file-list="false"
                      :on-change="fileChange"
                  >
                    <el-button type="primary">
                      上传附件
                    </el-button>
                  </el-upload>
                </div>
              </el-row>
            </el-form>
            <el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index, row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="fileId" label="附件Id"/>
              <el-table-column prop="realName" label="附件名称"/>
              <el-table-column prop="createTime" label="创建时间"/>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
          </div>
          <div v-if="type == 'identification'">
            <el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-form-item label="筛选条件">
                <el-input v-model="data[type].queryData.keyWord" placeholder="请输入名称进行模糊查找"
                          class="searchInputW mr-small" @change="query"/>
                <el-button type="primary" icon="Search" @click="query">查询</el-button>
              </el-form-item>
            </el-form>
            <el-row style="gap: 12px;margin-top: 6px" class="w100">
              <el-card style="width: 100px;position:relative" :body-style="{padding: '5px'}"
                       v-for="(v,idx) in data[type].tableData" :key="v">
                <!-- {{ data[type].tableData[idx] }} -->
                <div class="checkBox">
                  <el-checkbox v-model="data[type].tableData[idx].check"
                               @change="handleCheckChange(data[type].tableData[idx])"></el-checkbox>
                </div>
                <img :src="v.img" class="w100"/>
                <div>{{ v.name }}</div>
              </el-card>
            </el-row>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
          </div>
          <div v-if="type == 'warning'">
            <el-row style="gap: 20px">
              <div style="width: 200px">
                <el-card shadow="never">
                  <template #header>
                    <div class="cardHeader">
                      涉及的事故类型
                    </div>
                  </template>
                  <div>1、物体打击</div>
                  <div>2、车辆伤害</div>
                  <div>3、火灾</div>
                </el-card>
              </div>
              <div class="flexAuto">

                <el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
                  <el-row>
                    <el-form-item label="一级目录">
                      <tagGroup :data="warningOptions" v-model:acitve="data[type].queryData.state"
                                @change="query"></tagGroup>
                    </el-form-item>
                    <el-divider border-style="dashed"/>
                    <el-form-item label="二级目录">
                      <tagGroup :data="warningOptionsChildren" v-model:acitve="data[type].queryData.state1"
                                @change="query"></tagGroup>
                    </el-form-item>
                  </el-row>
                  <el-form-item label="筛选条件">
                    <el-input v-model="data[type].queryData.keyWord" placeholder="请输入名称进行模糊查找"
                              class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-form>
                <el-row style="gap: 12px;margin-top: 6px" class="w100">
                  <el-card style="width: 100px;position:relative" :body-style="{padding: '5px'}"
                           v-for="(v,idx) in data[type].tableData" :key="v">
                    <!-- {{ data[type].tableData[idx] }} -->
                    <div class="checkBox">
                      <el-checkbox v-model="data[type].tableData[idx].check"
                                   @change="handleCheckChange(data[type].tableData[idx])"></el-checkbox>
                    </div>
                    <img :src="v.img" class="w100"/>
                    <div>{{ v.name }}</div>
                  </el-card>
                </el-row>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :current-page="data[type].queryData.pageIndex"
                    :page-size="data[type].queryData.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="data[type].total"
                >
                </el-pagination>
              </div>
            </el-row>
          </div>
		  <div v-if="type == 'dangerPosition'">
			<el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
              <el-table-column prop="" label="" width="70">
                <template #default="{ $index,row }">
                  <el-checkbox v-model="data[type].tableData[$index].check"
                               @change="handleCheckChange(row)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="positionId" label="#" width="70">
				<template #default="{ $index }">
					{{ $index + 1 }}
				</template>
			  </el-table-column>
              <el-table-column prop="name" label="位置名称"/>
              <el-table-column prop="areaName" label="所属区域"/>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="data[type].queryData.pageIndex"
                :page-size="data[type].queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data[type].total"
            >
            </el-pagination>
		  </div>
		  <div v-if="type == 'emergencyFile'">
			<el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-row justify="space-between">
                <el-form-item label="筛选条件">
                  <el-input v-model="data[type].queryData.name" placeholder="请输入附件名称进行查找"
                            class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>
			<el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
			<el-table-column prop="" label="" width="70">
				<template #default="{ $index,row }">
				<el-checkbox v-model="data[type].tableData[$index].check"
							@change="handleCheckChange(row)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="typeName" label="文件类型"/>
			<el-table-column prop="fileName" label="文件名称"/>
			<el-table-column prop="formalName" label="签发版本"/>
			<el-table-column prop="createTime" label="实施时间"/>
			<el-table-column prop="departmentName" label="适用部门"/>
			</el-table>
		  </div>
		  <div v-if="type == 'subsidiary'">
			<el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-row justify="space-between">
                <el-form-item label="筛选条件">
                  <el-input v-model="data[type].queryData.name" placeholder="请输入附件名称进行查找"
                            class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>
			<el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
			<el-table-column prop="" label="" width="70">
				<template #default="{ $index,row }">
				<el-checkbox v-model="data[type].tableData[$index].check"
							@change="handleCheckChange(row)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="superiorName" label="上级单位"/>
			<el-table-column prop="name" label="单位名称"/>
			<el-table-column prop="formalName" label="行业"/>
			<el-table-column prop="createTime" label="安全管理员"/>
			<el-table-column prop="departmentName" label="主要负责人"/>
			<el-table-column prop="departmentName" label="风险点类型"/>
			</el-table>
		  </div>
		  <div v-if="type == 'harmFactor'">
			<el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-row justify="space-between">
                <el-form-item label="筛选条件">
                  <el-input v-model="data[type].queryData.name" placeholder="请输入危害因素名称名称进行查找"
                            class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>
			<el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
			<el-table-column prop="" label="" width="70">
				<template #default="{ $index,row }">
				<el-checkbox v-model="data[type].tableData[$index].check"
							@change="handleCheckChange(row)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="typeName" label="危害因素类别">
				<template #default="{ row }">
					<el-button  link v-if="row.category == 1">物理因素类</el-button>
					<el-button  link v-else-if="row.category == 2">化学因素类</el-button>
					<el-button  link v-else-if="row.category == 3">生物因素类</el-button>
					<el-button  link v-else-if="row.category == 4">粉尘类</el-button>
					<el-button  link v-else-if="row.category == 5">其他</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="elementName" label="危害因素名称"/>
			<el-table-column prop="casno" label="CAS.NO."/>
			</el-table>
		  </div>
		  <div v-if="type == 'equipmentType'">
			<el-form :model="data[type].queryData" inline label-width="80px" class="searchFormBox">
              <el-row justify="space-between">
                <el-form-item label="筛选条件">
                  <el-input v-model="data[type].queryData.name" placeholder="请输入附件名称进行查找"
                            class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>
			<el-table :data="data[type].tableData" border ref="tableRef" :max-height="400">
			<el-table-column prop="" label="" width="70">
				<template #default="{ $index,row }">
				<el-checkbox v-model="data[type].tableData[$index].check"
							@change="handleCheckChange(row)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="消防器材类型"/>
			<el-table-column prop="typeName" label="检查卡"/>
			<el-table-column prop="typeName" label="最近修改人"/>
			<el-table-column prop="typeName" label="最近修改日期" width="150"/>
			</el-table>
		  </div>
        </el-card>
      </el-row>
    </div>

    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save"> 确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import {reactive, toRefs, defineComponent, ref, computed} from 'vue';
import {userIndex,departmentIndex} from '@/api/enterprise';
import {positionIndex, roleIndex} from '@/api/setting';
import {fileList} from '@/api/file.js';
import { hazardIndex } from "@/api/health/element";

export default defineComponent({
	components: {},
	props: {
		/* maxNum代表可选最大数量，负数不限，正数最大多少个 */
		maxNum: {
			type: Number,
			default: -1,
		},
		//staff 员工 position 岗位 department 部门 role 角色 identification个体防护标志  warning 警示标志 dangerPosition隐患位置
		// emergencyFile 现行应急预案文件 下辖单位 subsidiary
		// harmFactor 职业病危害因素
		// 消防器材类型 equipmentType
		type: {
			type: String,
			default: 'staff',
		},
		dialogTitle: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const formRef = ref(null);
		const state = reactive({
			warningOptions: [
				{
					label: '不限',
					value: 0,
				},
				{
					label: '安全标志',
					value: 1,
				},
				{
					label: '职业健康',
					value: 2,
				},
				{
					label: '消防安全标志',
					value: 3,
				},
			],
			warningOptionsChildren: [
				{
					label: '警号类',
					value: 0,
				},
				{
					label: '警示类',
					value: 1,
				},
			],
			show: false,
			form: {},
			checkList: [],
			data: {
				staff: {
					id: 'enterpriseUserId',
					name: 'realName',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '人员列表',
					tableData: [],
				},
				position: {
					id: 'positionId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '岗位列表',
					tableData: [],
				},
				department: {
					id: 'departmentId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '部门列表',
					tableData: [],
				},
				role: {
					id: 'roleId',
					name: 'roleName',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '角色列表',
					tableData: [],
				},
				adnexa: {
					id: 'roleId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择附件库',
					tableData: [],
				},
				identification: {
					id: 'identificationId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择标识',
					tableData: [],
				},
				warning: {
					id: 'warningId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择标识',
					tableData: [],
				},
				coursewareFile: {
					id: 'roleId',
					name: 'realName',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
						attachType: 1,
					},
					total: 0,
					dialogTitle: '课件附件库',
					tableData: [],
				},
				dangerPosition: {
					id: 'dangerId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择位置',
					tableData: [],
				},
				emergencyFile: {
					id: 'emergencyFileId',
					name: 'fileName',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '现行应急预案',
					tableData: [],
				},
				subsidiary: {
					id: 'subsidiaryId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择下级单位',
					tableData: [],
				},
				harmFactor:{
					id: 'elementId',
					name: 'elementName',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '从数据库选择职业病危害因素',
					tableData: [],
				},
				equipmentType:{
					id: 'equipmentTypeId',
					name: 'name',
					queryData: {
						pageIndex: 1,
						pageSize: 10,
					},
					total: 0,
					dialogTitle: '选择消防器材类型',
					tableData: [],
				},
			},
			classfiy: [],
			dataType: null,
		});
		const dialogTxt = computed(() => {
			if (!props.dialogTitle) {
				return state.data[props.type].dialogTitle;
			}
			return '列表';
		});

		const getStaff = async () => {
			const {data: {records, total}} = await userIndex(state.data.staff.queryData);
			state.data.staff.tableData = records;
			state.data.staff.total = total;
		};

		const getPosition = async () => {
			const {data: {records, total}} = await positionIndex(state.data.position.queryData);
			state.data.position.tableData = records;
			state.data.position.total = total;
		};
		const getDepartment = async () => {
			const { data } = await departmentIndex(state.data.department.queryData);
      		state.data.department.tableData = data;
		};

		const getRole = async () => {
			const {data: {records, total}} = await roleIndex(state.data.role.queryData);
			state.data.role.tableData = records;
			state.data.role.total = total;
		};

		const getAdnexa = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
		};

		const getCoursewareFile = async () => {
			const {data: {records, total}} = await fileList(state.data.coursewareFile.queryData);
			state.data.coursewareFile.tableData = records;
			state.data.coursewareFile.total = total;
		};

		const getIdentification = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.identification.tableData = [
				{
					identificationId: 1,
					name: '必须穿工作服',
					img: 'https://lib.ehsway.com/Uploads/00001/20190512/601a55be-dc7a-4e4a-9548-cb0a2e7ab55b.png',
				},
				{
					identificationId: 2,
					name: '必须带防护面罩',
					img: 'https://lib.ehsway.com/Uploads/00001/20190512/c78dc48c-9274-4776-bad7-774f0c78342d.png',
				},
				{
					identificationId: 3,
					name: '必须带自救器',
					img: 'https://lib.ehsway.com/Uploads/00001/20190512/0ea6c161-737f-44c6-99b1-be584264a10d.png',
				},
				{
					identificationId: 4,
					name: '必须用防护屏',
					img: 'https://lib.ehsway.com/Uploads/00001/20190512/6b896859-3b91-4f88-8ba7-c9f03c0a25b8.png',
				},
			];
			state.data.identification.total = 4;
		};

		const getWarning = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.warning.tableData = [
				{
					warningId: 1,
					name: '当心中毒',
					img: 'https://lib.ehsway.com/Uploads/00000/20210617/07335a6c-f015-42db-8237-b85a9181d30b.png',
				},
				{
					warningId: 2,
					name: '当心腐蚀',
					img: 'https://lib.ehsway.com/Uploads/00000/20200714/07cf45db-4513-449d-8d1a-6386073bb228.png',
				},
				{
					warningId: 3,
					name: '当心感染',
					img: 'https://lib.ehsway.com/Uploads/00000/20200714/3321b74e-4cf3-43ae-904e-8491fd0801c8.png',
				},
				{
					warningId: 4,
					name: '当心弧光',
					img: 'https://lib.ehsway.com/Uploads/00000/20200714/bba0f3ae-f693-4499-82fd-a2c8879154b6.png',
				},
			];
			state.data.warning.total = 4;
		};
		
		const getDangerPosition = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.dangerPosition.tableData = [
				{
					dangerId: 1,
					name: '叉车',
					areaName: '安环部',
				},
				{
					dangerId: 2,
					name: '磨具架存放处',
					areaName: '仓储部',
				},
			];
			state.data.warning.total = 4;
		};
		const getEmergencyFile = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.emergencyFile.tableData = [
				{
					emergencyFileId: 1,
					typeName: '综合应急预案',
					fileName: 'axure原型的设计规范（更新中）',
					createTime: '2023-04-18',
					departmentName: '所有部门',
				},
				{
					emergencyFileId: 2,
					typeName: '专项应急预案',
					fileName: '伟岸特种设备专项预案',
					createTime: '02 特种设备事故专项应急预案',
					departmentName: '工程部',
				},
				{
					emergencyFileId: 3,
					typeName: '综合应急预案',
					fileName: '益戈伟岸集团机械制造有限公司',
					createTime: '2022-01-01',
					departmentName: '工程部',
				},
			];
			state.data.warning.total = 4;
		};
		const getSubsidiary = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.subsidiary.tableData = [
				{
					subsidiaryId: 1,
					superiorName: '	测试有限公司',
					name: '	广东环保设备制造有限公司',
				},
				{
					subsidiaryId: 2,
					superiorName: '	测试有限公司',
					name: '广东特种材料有限公司',
				},
				{
					subsidiaryId: 3,
					superiorName: '	测试有限公司',
					name: '	广东特殊钢制造有限公司',
				},
			];
			state.data.warning.total = 3;
		};
		const getHarmFactor = async () => {
			const { data:{ records,total } } = await hazardIndex(state.data.harmFactor.queryData);
			state.data.harmFactor.tableData = records;
			state.data.harmFactor.total = total;
		};
		const getEquipmentType = async () => {
			// const { data:{ records,total } } = await roleIndex(state.data.role.queryData);
			// state.data.role.tableData = records;
			// state.data.role.total = total;
			state.data.equipmentType.tableData = [
				{
					equipmentTypeId: 1,
					typeName: '粉尘类',
					name: '石棉粉尘',
				},
				{
					equipmentTypeId: 2,
					typeName: '粉尘类',
					name: '煤尘',
				},
				{
					equipmentTypeId: 3,
					typeName: '粉尘类',
					name: '游离二氧化硅粉尘（结晶型二氧化硅粉尘）',
				},
			];
			state.data.warning.total = 3;
		};
		
		const fetchData = async () => {
			if (props.type == 'staff') {
				await getStaff();
			} else if (props.type == 'position') {
				await getPosition();
			} else if (props.type == 'department') {
				await getDepartment();
			} else if (props.type == 'role') {
				await getRole();
			} else if (props.type == 'coursewareFile') {
				await getCoursewareFile();
			} else if (props.type == 'identification') {
				await getIdentification();
			} else if (props.type == 'warning') {
				await getWarning();
			}else if (props.type == 'dangerPosition') {
				await getDangerPosition();
			}else if (props.type == 'emergencyFile') {
				await getEmergencyFile();
			}else if (props.type == 'subsidiary') {
				await getSubsidiary();
			}else if (props.type == 'harmFactor') {
				await getHarmFactor();
			}else if (props.type == 'equipmentType') {
				await getEquipmentType();
			}
		};
		// list 为需要回显的值
		const open = async (list, type) => {
			state.dataType = type;
			await fetchData();
			state.checkList = [];
			showData(list);
			state.show = true;
		};
		const showData = (list) => {
			if (list && list.length > 0) {
				list.forEach((v) => {
					state.data[props.type].tableData.forEach((item) => {
						item.check = false;
						if (item[state.data[props.type].id] == v[state.data[props.type].id]) {
							setTimeout(() => {
								item.check = true;
							});
						}
					});
				});
				state.checkList = list;
			} else {
				state.data[props.type].tableData.forEach(item => {
					item.check = false;
				});
			}
		};
		const close = () => {
			state.show = false;
		};
		const handleCheckChange = (row) => {
			if (props.maxNum < 0) {
				if (row.check) {
					state.checkList.push(row);
				} else {
					let idx = state.checkList.findIndex((v) => v[state.data[props.type].id] == row[state.data[props.type].id]);
					state.checkList.splice(idx, 1);
				}
			} else {
				state.checkList = [];
				state.data[props.type].tableData.forEach((v) => {
					v.check = false;
				});
				row.check = true;
				if (row.check) {
					state.checkList.push(row);
				}
			}
		};
		const handleCurrentChange = async (val) => {
			state.data[props.type].queryData.pageIndex = val;
			await fetchData();
			state.showData(state.checkList);
		};
		const handleSizeChange = () => {
			state.data[props.type].queryData.pageIndex = 1;
			state.data[props.type].queryData.pageSize = val;
			state.fetchData();
		};
		return {
			...toRefs(state),
			open,
			close,
			fetchData,
			showData,
			handleCheckChange,
			formRef,
			dialogTxt,
			handleCurrentChange,
			handleSizeChange,
		};
	},
	methods: {
		async query() {
			await this.fetchData();
			this.showData(this.checkList);
		},
		async UploadImage(param) {
			const formData = new FormData();
			formData.append('iFile', param.file);
			formData.append('groupId', 0);
			formData.append('fileType');
			// const { msg } = await uploadFile(formData);
			// ElMessage({
			//     message: msg,
			//     type: 'success',
			// });
			// await this.fetchData();
			// this.showData(this.checkList);
		},

		save() {
			if (this.checkList && this.checkList.length > 0) {
				this.$emit('check-Table', this.checkList, this.dataType);
			}
			this.close();
		}
	}
});
</script>
<style scoped lang="scss">
::v-deep(.el-divider--horizontal) {
  margin: 0;
}

.checkBox {
  position: absolute;
  top: -3px;
  left: 4px;
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
</style>
  