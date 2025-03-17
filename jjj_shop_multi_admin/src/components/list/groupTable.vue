<template>
    <el-dialog v-model="show" :title="dialogTitle" width="1100" :before-close="handleClose" class="noBg">
      <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
          <el-form-item label="已选" prop="groupName">
            <div class="tagScroll">
              <div class="btnTag"  v-for="(tag,index) in checkList" :key="index">
                <span>{{ tag[data[activeName].name] }}</span>
                <el-icon><CloseBold /></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-card shadow="never">
            <el-tabs @tab-change="changTab" v-model="activeName" style="margin-bottom: 20px">
                <el-tab-pane :name="v.name" :label="v.label" v-for="v in tabList" :key="v"></el-tab-pane>
            </el-tabs>
            <div v-if="activeName == 'staff'">
                <el-table 
                    :data="data.staff.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('enterpriseEmpRef')"
                    border
                    ref="enterpriseEmpRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="enterpriseEmpId" label="#" width="60">
                    <template #default="{ $index }">
                      {{ (data.staff.queryData.pageIndex - 1) * data.staff.queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column :prop="v.prop" :label="v.label" :width="v.width" v-for="(v,idx) in data.staff.columnData" :key="idx" />
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data.staff.queryData.pageIndex" :page-size="data.staff.queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data.staff.total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'department'">
                <el-table 
                    :data="data[activeName].tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('departmentRef')"
                    border
                    ref="departmentRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="55" />
                    <el-table-column prop="departmentId" label="#">
                      <template #default="{ $index }">
                          {{ $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="员工名称" />
                    <el-table-column prop="createTime" label="创建时间" />
                </el-table>
            </div>
            <div v-if="activeName == 'companyRisk'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-form-item label="固有风险评估方法：" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state1" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" /> 
                      <el-option label="直接判断" :value="2" />
                      <el-option label="LEC" :value="3" />
                      <el-option label="LS" :value="4" />
                      <el-option label="MES" :value="5" />
                  </el-select>
                </el-form-item>
                <el-form-item label="现状风险评估方法：" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state2" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" />
                      <el-option label="LEC" :value="2" />
                      <el-option label="LS" :value="3" />
                      <el-option label="MES" :value="4" />
                  </el-select>
                </el-form-item>
                <el-form-item label="筛选条件：" prop="groupName">
                  <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入附件名称进行查找" class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-form>
                <el-table 
                    :data="data.staff.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('companyRiskRef')"
                    border
                    ref="companyRiskRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data.staff.queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="风险点名称" width="100" />
                    <el-table-column prop="name" label="图示">
                      <template #default="{ row }">
                        <img class="tableImg" src="https://img1.baidu.com/it/u=4187576923,2280195799&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=500" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="风险点类型"  width="100" />
                    <el-table-column prop="name" label="固有风险评估方法"  width="140" />
                    <el-table-column prop="name" label="现状风险评估方法" width="140" />
                    <el-table-column prop="name" label="辨识数据" width="120">
                      <template #default="{ row }">
                        <el-button type="primary" link>直接措施：51 条</el-button>
                        <el-button type="warning" link>管理措施：6 条</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="最近修改日期" width="150" />
                    <el-table-column prop="createTime" label="最近修改人" width="140" />
                    <el-table-column prop="createTime" label="关键词" />
                    <el-table-column prop="createTime" label="备注" />
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'platformRisk'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-form-item label="固有风险评估方法：" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state1" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" />
                      <el-option label="直接判断" :value="2" />
                      <el-option label="LEC" :value="3" />
                      <el-option label="LS" :value="4" />
                      <el-option label="MES" :value="5" />
                  </el-select>
                </el-form-item>
                <el-form-item label="现状风险评估方法：" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state2" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" />
                      <el-option label="LEC" :value="2" />
                      <el-option label="LS" :value="3" />
                      <el-option label="MES" :value="4" />
                  </el-select>
                </el-form-item>
                <el-form-item label="筛选条件：" prop="groupName">
                  <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入名称进行查找" class="searchInputW mr-small" @change="query"/>
                  <el-button type="primary" icon="Search" @click="query">查询</el-button>
                </el-form-item>
              </el-form>
                <el-table 
                    :data="data.platformRisk.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('platformRiskRef')"
                    border
                    ref="platformRiskRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="pointName" label="风险点名称" width="100" />
                    <el-table-column prop="name" label="图示">
                        <template #default="{ row }">
                            <img class="tableImg" :src="row.imageUrl" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="风险点类型"  width="100">
                        <template #default="{ row }">
                            {{ row.pointType == 1 ? '设备设施' :  row.pointType == 2 ? '部位场所' : row.pointType == 3 ? '作业活动' : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="inherentIdentifyType" label="固有风险评估方法"  width="140" />
                    <el-table-column prop="identifyType" label="现状风险评估方法" width="140" />
                    <el-table-column prop="name" label="辨识数据" width="120">
                      <template #default="{ row }">
                        <el-button type="primary" link>直接措施：51 条</el-button>
                        <el-button type="warning" link>管理措施：6 条</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="最近修改日期" width="150" />
                    <el-table-column prop="createTime" label="最近修改人" width="140" />
                    <el-table-column prop="createTime" label="关键词" />
                    <el-table-column prop="createTime" label="备注" />
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'companyCheck'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-form-item label="检查表层级" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state1" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" />
                      <el-option label="两级检查表" :value="2" />
                      <el-option label="单击检查表" :value="3" />
                  </el-select>
                </el-form-item>
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                  <div>
                    <el-button type="primary" @click="">添加到我的检查表</el-button>
                    <el-button type="danger" @click="">批量删除</el-button>
                  </div>
                </el-row>
              </el-form>
                <el-table 
                    :data="data.companyCheck.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('companyCheckRef')"
                    border
                    ref="companyCheckRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="检查表名称" />
                    <el-table-column prop="records" label="所属目录"  />
                    <el-table-column prop="deepType" label="检查表层级" />
                    <el-table-column prop="updateTime" label="编辑日期" width="100" />
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button type="primary" plain size="small">查看详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'publicCheck'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-form-item label="检查表层级" prop="groupName">
                    <el-select v-model="data[activeName].queryData.state1" placeholder="" class="inlineWidth" @change="query" clearable>
                      <el-option label="不限" :value="1" />
                      <el-option label="两级检查表" :value="2" />
                      <el-option label="单击检查表" :value="3" />
                  </el-select>
                </el-form-item>
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
                <el-table 
                    :data="data.publicCheck.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('publicCheckRef')"
                    border
                    ref="publicCheckRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="检查表名称" />
                    <el-table-column prop="records" label="所属目录" />
                    <el-table-column prop="deepType" label="检查表层级"  />
                    <el-table-column prop="updateTime" label="编辑日期" width="100" />
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button type="primary" plain size="small">查看详情</el-button>
                        <div class="mt-small">
                          <el-button type="warning" plain size="small">图解详情</el-button>
                        </div>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'areaCheck'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
                <el-table 
                    :data="data.areaCheck.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('areaCheckRef')"
                    border
                    ref="areaCheckRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="检查表名称" />
                    <el-table-column prop="typeName" label="类型" />
                    <el-table-column prop="areaName" label="区域位置" />
                    <el-table-column prop="deepType" label="检查表层级" />
                    <el-table-column prop="author" label="编制人" />
                    <el-table-column prop="updateTime" label="编辑日期" width="100" />
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button type="primary" plain size="small">查看检查表</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'pointCheck'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
                <el-table 
                    :data="data.pointCheck.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('pointCheckRef')"
                    border
                    ref="pointCheckRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="检查表名称" />
                    <el-table-column prop="pointName" label="风险点名称" />
                    <el-table-column prop="deepType" label="检查表层级" width="100" />
                    <el-table-column prop="author" label="编制人" width="100" />
                    <el-table-column prop="updateTime" label="编辑日期" width="100" />
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button type="primary" plain size="small">查看检查表</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'myCheck'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
                <el-table 
                    :data="data.myCheck.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('myCheckRef')"
                    border
                    ref="myCheckRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                    <el-table-column label="#" fixed="left" width="40">
                      <template #default="{ $index }">
                        {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="检查表名称" />
                    <el-table-column prop="deepType" label="检查表层级"/>
                    <el-table-column prop="updateTime" label="编辑日期" width="100" />
                    <el-table-column label="操作" width="100">
                      <template #default="{ $index }">
                        <el-button type="primary" plain size="small">查看详情</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'build'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
              <el-table 
                    :data="data.build.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('buildRef')"
                    border
                    ref="buildRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                  <el-table-column label="#" fixed="left" width="40">
                    <template #default="{ $index }">
                      {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="施工单位名称" />
                  <el-table-column prop="charge" label="主要负责人" />
                  <el-table-column prop="phone" label="电话" />
                  <el-table-column prop="deepType" label="安全协议期限" />
              </el-table>
            </div>
            <div v-if="activeName == 'lessee'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
              <el-table 
                    :data="data.lessee.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('lesseeRef')"
                    border
                    ref="lesseeRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                  <el-table-column label="#" fixed="left" width="40">
                    <template #default="{ $index }">
                      {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="施工单位名称" />
                  <el-table-column prop="charge" label="主要负责人" />
                  <el-table-column prop="phone" label="电话" />
                  <el-table-column prop="deepType" label="安全协议期限" />
              </el-table>
            </div>
            <div v-if="activeName == 'mangmentCompany'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
              <el-table 
                    :data="data.mangmentCompany.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('mangmentCompanyRef')"
                    border
                    ref="mangmentCompanyRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                  <el-table-column label="#" fixed="left" width="40">
                    <template #default="{ $index }">
                      {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="检查表名称" />
                  <el-table-column prop="charge" label="检查表说明" />
              </el-table>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'mangmentPublic'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
              <el-table 
                    :data="data.mangmentPublic.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('mangmentPublicRef')"
                    border
                    ref="mangmentPublicRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                  <el-table-column label="#" fixed="left" width="40">
                    <template #default="{ $index }">
                      {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="检查表名称" />
                  <el-table-column prop="charge" label="检查表说明" />
              </el-table>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
            <div v-if="activeName == 'mangmentMy'">
              <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-row justify="space-between">
                  <el-form-item label="筛选条件：" prop="groupName">
                    <el-input v-model="data[activeName].queryData.keyWord" placeholder="请输入检查表名称进行查找" class="searchInputW mr-small" @change="query"/>
                    <el-button type="primary" icon="Search" @click="query">查询</el-button>
                  </el-form-item>
                  <el-button type="primary" @click="clickMangmentMyAdd"><span class="iconfont icon-jiajianzujianjiahao mr-short"></span>新增</el-button>
                </el-row>
              </el-form>
              <el-table 
                    :data="data.mangmentPublic.tableData"
                    @select="handSelectChange"
                    @select-all="allSelect('mangmentMyRef')"
                    border
                    ref="mangmentMyRef"
                    :max-height="400"
                  >
                  <el-table-column type="selection" width="60" />
                  <el-table-column label="#" fixed="left" width="40">
                    <template #default="{ $index }">
                      {{ (data[activeName].queryData.pageIndex - 1) * data[activeName].queryData.pageSize  +  $index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="检查表名称" />
                  <el-table-column prop="charge" label="检查表说明" />
              </el-table>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="data[activeName].queryData.pageIndex" :page-size="data[activeName].queryData.pageSize" layout="total, prev, pager, next, jumper"
                :total="data[activeName].total">
                </el-pagination>
            </div>
        </el-card>
      </div>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </template>
    </el-dialog>
    <addMyCheckIndex ref="addMyCheckIndexRef" />
  </template>
  <script>
  import { reactive, toRefs, defineComponent, ref } from "vue";
  import { userIndex } from "@/api/enterprise";
  import { departmentIndex } from "@/api/enterprise";
  import { dangerIdentifyIndex } from "@/api/prevention/risk/library.js"; 
  import { isArray } from "@/utils/validate";
  import addMyCheckIndex from "@/views/spot/manage/facility/my/addMyCheck/index.vue";
  export default defineComponent({
    components: {
      addMyCheckIndex
    },
    props: {
      // type为组合类 staff 员工 department 部门 companyRisk 公司风险辨识库 platformRisk 平台风险辨识库
      // 公司检查表 companyCheck 公共检查表publicCheck 区域位置检查表 areaCheck 风险点检查表 pointCheck 我的检查表 myCheck
      //  build 施工单位 lessee 承租单位
      //现场管理 公司检查表 mangmentCompany 公共检查表 mangmentPublic 我的检查表 mangmentMy
      type:{
        type: Array,
      },
      dialogTitle:{
        type: String,
        default: '选择'
      },
      /* maxNum代表可选最大数量，负数不限，正数最大多少个 */
      maxNum: {
        type: Number,
        default: -1,
      },
    },
    setup(props) {
      const formRef = ref(null)
      const state = reactive({
        addMyCheckIndexRef: null,
        enterpriseEmpRef: null,
        departmentRef: null,
        companyRiskRef: null,
        platformRiskRef: null,
        companyCheckRef: null,
        publicCheckRef: null,
        areaCheckRef: null,
        pointCheckRef: null,
        myCheckRef: null,
        buildRef: null,
        lesseeRef: null,
        mangmentCompanyRef: null,
        mangmentPublicRef: null,
        mangmentMyRef: null,
        activeName: 'staff',
        checkAll: null,
        tableRef: null,
        show: false,
        form: {},
        tabInfo:{
          staff:{
            label: '选择人员',
            name: 'staff',
          },
          department:{
            label: '选择部门',
            name: 'department',
          },
          companyRisk:{
            label: '公司风险辨识库',
            name: 'companyRisk',
          },
          platformRisk:{
            label: '平台风险辨识库',
            name: 'platformRisk',
          },
          companyCheck:{
            label: '公司检查表',
            name: 'companyCheck',
          },
          publicCheck:{
            label: '公共检查表',
            name: 'publicCheck',
          },
          areaCheck:{
            label: '区域位置检查表',
            name: 'areaCheck',
          },
          pointCheck:{
            label: '风险点检查表',
            name: 'pointCheck',
          },
          myCheck:{
            label: '我的检查表',
            name: 'myCheck',
          },
          build:{
            label: '选择施工单位',
            name: 'build',
          },
          lessee:{
            label: '选择承租单位',
            name: 'lessee',
          },
          mangmentCompany:{
            label: '公司检查表',
            name: 'mangmentCompany',
          },
          mangmentPublic:{
            label: '公共检查表',
            name: 'mangmentPublic',
          },
          mangmentMy:{
            label: '我的检查表',
            name: 'mangmentMy',
          },
        },

        tabList: [],
        data:{
          staff:{
            id: 'enterpriseEmpId',
            name: 'userName',
            ref: 'enterpriseEmpRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            columnData:[
              {
                label: '员工名称',
                prop: 'userName',
              },
              {
                label: '创建时间',
                prop: 'createTime',
                width: 150,
              },
            ],
            total: 0,
            tableData: [],
          },
          department:{
            id:'departmentId',
            name: 'name',
            ref: 'departmentRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          companyRisk:{
            id:'companyRiskId',
            name: 'name',
            ref: 'companyRiskRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          platformRisk:{
            id:'pointId',
            name: 'pointName',
            ref: 'platformRiskRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          companyCheck:{
            id:'companyCheckId',
            name: 'name',
            ref: 'companyCheckRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          publicCheck:{
            id:'publicCheckId',
            name: 'name',
            ref: 'publicCheckRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          areaCheck:{
            id:'areaCheckId',
            name: 'name',
            ref: 'areaCheckRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          pointCheck:{
            id:'pointCheckId',
            name: 'name',
            ref: 'pointCheckRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          myCheck:{
            id:'myCheckId',
            name: 'name',
            ref: 'myCheckRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          build:{
            id:'buildId',
            name: 'name',
            ref: 'buildRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          lessee:{
            id:'lesseeId',
            name: 'name',
            ref: 'lesseeRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          mangmentCompany:{
            id:'mangmentCompanyId',
            name: 'name',
            ref: 'mangmentCompanyRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          mangmentPublic:{
            id:'mangmentPublicId',
            name: 'name',
            ref: 'mangmentPublicRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
          mangmentMy:{
            id:'mangmentMyId',
            name: 'name',
            ref: 'mangmentMyRef',
            queryData:{
                pageIndex: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [],
          },
        },
        checkList: [],
        showType: null,
      })
      // 获取员工
      const getStaff = async () => {
        const { data: { records,total } } = await userIndex(state.data.staff.queryData);
        records.forEach((v)=>{
          v.type = 'staff';
        })
        state.data[state.activeName].tableData = records;
        state.data[state.activeName].total = total;
      }
      // 获取部门
      const getDepartment = async()=>{
        const { data } = await departmentIndex();
        data.forEach((v)=>{
          v.type = 'department'
        })
        state.data[state.activeName].tableData = data;
      }
      // 获取公司风险辨识库
      const getCompanyRisk = async()=>{
        /* const { data } = await departmentIndex();
        data.forEach((v)=>{
          v.type = 'department'
        })
        state.data[state.activeName].tableData = data; */
      }
      // 获取平台风险辨识库
      const getPlatformRisk = async()=>{
        state.data[state.activeName].queryData.pointSource = 3;
        const { data: { records, total } } = await dangerIdentifyIndex(state.data[state.activeName].queryData);
        state.data[state.activeName].tableData = records;
        state.data[state.activeName].total = total;
      }
      const getCompanyCheck = async ()=>{
        state.data.companyCheck.tableData = [
          {
            companyCheckId:1,
            sort: 1,
            name: '公司综合检查表1',
            records:'综合检查表',
            deepType:'两级检查表',
            updateTime: '2023-03-06',
          },
        ]
      }
      const getPublicCheck = async ()=>{
        state.data.publicCheck.tableData = [
          {
            publicCheckId: 1,
            sort: 1,
            name: '公司综合检查表2',
            records:'综合检查表',
            deepType:'两级检查表',
            updateTime: '2023-03-06',
          },
        ]
      }
      const getAreaCheck = async ()=>{
        state.data.areaCheck.tableData = [
          {
            areaCheckId: 1,
            sort: 1,
            name: '【切割机】岗位日常检查（每2天）3',
            typeName:'位置检查表',
            areaName:'切割机',
            deepType:'两级检查表',
            author:'系统管理员',
            updateTime: '2023-03-06',
          },
        ]
      }
      const getPointCheck = async ()=>{
        state.data.pointCheck.tableData = [
          {
            pointCheckId:1,
            sort: 1,
            name: '【切割机】岗位日常检查（每2天）【哔哔哔哔哔哔】岗位日常检查表（每天）4',
            pointName: '哔哔哔哔哔哔',
            deepType:'两级检查表',
            author:'系统管理员',
            updateTime: '2023-03-06',
          },
        ]
      }
      const getMyCheck = async ()=>{
        state.data.myCheck.tableData = [
          {
            name: '名字5',
            myCheckId:1,
            sort: 1,
            deepType:'两级检查表',
            updateTime: '2023-03-06',
          },
        ]
      }
      const getBuild = async ()=>{
        state.data.build.tableData = [
          {
            name: '北京建筑有限公司',
            buildId:1,
            charge: '王五',
            phone: '18888888882'
          },
          {
            name: '学堂有限公司',
            buildId:2,
            charge: '王五',
            phone: '18888888882'
          },
        ]
      }
      const getLessee = async ()=>{
        state.data.lessee.tableData = [
          {
            name: '车辆制造有限公司',
            lesseeId:1,
            charge: '王五',
            phone: '18888888882'
          },
          {
            name: '曹曹烟草批发有限公司',
            lesseeId:2,
            charge: '王五',
            phone: '18888888882'
          },
        ]
      }
      
      const getMangmentCompany = async ()=>{
        state.data.mangmentCompany.tableData = [
          {
            name: '车辆制造有限公司',
          },
          {
            name: '曹曹烟草批发有限公司',
          },
        ]
      }
      
      const getMangmentPublic = async ()=>{
        state.data.mangmentPublic.tableData = [
          {
            name: '车辆制造有限公司',
          },
          {
            name: '曹曹烟草批发有限公司',
          },
        ]
      }

      const getMangmentMy = async ()=>{
        state.data.mangmentMy.tableData = [
          {
            name: '车辆制造有限公司',
          },
          {
            name: '曹曹烟草批发有限公司',
          },
        ]
      }


      // list 为需要回显的值
      const open = async (list,showType) => {
        state.tabList = [];
        state.checkList = [];
        if(isArray(props.type)){
          state.activeName = props.type[0];
          props.type.forEach((v)=>{
            state.tabList.push(state.tabInfo[v])
          })
          if(isArray(list)){
            state.checkList = list;
          }
          state.showType = showType;
          await changTab();
        }
        state.show = true;
      }
      // 数据回显
      const showData = (list) => {
        // console.log("list",list)
        let data = state.data[state.activeName].tableData;
        if(list && list.length > 0 && data && data.length > 0){
          list.forEach((items)=>{
            data.forEach((item)=>{
              if(items[state.data[state.activeName].id] == item[state.data[state.activeName].id] && items.type == item.type){
                setTimeout(()=>{
                  if(state[state.data[state.activeName].ref]){
                    state[state.data[state.activeName].ref].toggleRowSelection(item,true)
                  } 
                })
              }
            })
          })
        }
      }
      const close = () => {
        state.show = false;
      }
      const handSelectChange = (list,row)=>{
        if(props.maxNum < 0){
          let idx = state.checkList.findIndex((v)=>{
            return v[state.data[state.activeName].id] == row[state.data[state.activeName].id] && v.type == row.type
          })
          if(idx == -1){
            state.checkList.push(row)
          }else{
            state.checkList.splice(idx,1)
          }
        }else if(props.maxNum == 1){
          state[state.data[state.activeName].ref].clearSelection();
          state[state.data[state.activeName].ref].toggleRowSelection(row,true);
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
      const changTab = async ()=>{
        if(state.activeName == 'staff'){
          await getStaff();
        }else if(state.activeName == 'department'){
          await getDepartment();
        }else if(state.activeName == 'companyRisk'){
          await getCompanyRisk();
        }else if(state.activeName == 'platformRisk'){
          await getPlatformRisk();
        }else if(state.activeName == 'companyCheck'){
          await getCompanyCheck();
        }else if(state.activeName == 'publicCheck'){
          await getPublicCheck();
        }else if(state.activeName == 'areaCheck'){
          await getAreaCheck();
        }else if(state.activeName == 'pointCheck'){
          await getPointCheck();
        }else if(state.activeName == 'myCheck'){
          await getMyCheck();
        }else if(state.activeName == 'build'){
          await getBuild();
        }else if(state.activeName == 'lessee'){
          await getLessee();
        }else if(state.activeName == 'mangmentCompany'){
          await getMangmentCompany();
        }else if(state.activeName == 'mangmentPublic'){
          await getMangmentPublic();
        }else if(state.activeName == 'mangmentMy'){
          await getMangmentMy();
        }
        showData(state.checkList);
      }
      return {
        ...toRefs(state),
        open,
        close,
        showData,
        // handleCheckChange,
        handSelectChange,
        allSelect,
        formRef,
        changTab,
      };
    },
    methods: {
      clickMangmentMyAdd(){
        this.addMyCheckIndexRef.open();
      },
      async handleCurrentChange(val) {
        this.data[this.activeName].queryData.pageIndex = val;
        await this.changTab();
      },
      handleSizeChange(val) {
        this.data[this.activeName].queryData.pageIndex = 1;
        this.data[this.activeName].queryData.pageSize = val;
      },
      query(){
        this.data[this.activeName].queryData.pageIndex = 1;
        this.changTab();
      },
      save() {
        this.$emit('check-group', this.checkList,this.showType)
        this.close();
      }
    }
  })
  </script>
  <style scoped lang="scss">
  ::v-deep(.el-form-item){
    margin-bottom: 6px !important;
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
  