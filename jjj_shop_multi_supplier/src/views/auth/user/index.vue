<template>
  <div class="user">
    <!--添加管理员-->
    <div class="common-level-rail">
      <el-button
        size="small"
        type="primary"
        icon="Plus"
        @click="addClick"
        v-auth="'/auth/user/add'"
        >添加管理员</el-button
      >
    </div>

    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table
          size="small"
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="supplier_user_id"
            label="管理员ID"
          ></el-table-column>
          <el-table-column prop="user_name" label="用户名"></el-table-column>
          <el-table-column prop="role.role_name" label="所属角色">
            <template #default="scope">
              <div v-if="scope.row.is_super == 0">
                <span
                  class="mr10 green"
                  v-for="(item, index) in scope.row.userRole"
                  :key="index"
                  >{{ item.role.role_name }}</span
                >
              </div>
              <div class="gray" v-if="scope.row.is_super == 1">超级管理员</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template #default="scope">
              <el-button
                v-if="scope.row.is_super < 1"
                @click="editClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/auth/user/edit'"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.is_super < 1"
                @click="deleteClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/auth/user/delete'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="curPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"
        ></el-pagination>
      </div>
    </div>

    <Add :open="open_add" :roleList="roleList" @close="closeAdd"></Add>

    <Edit
      :open="open_edit"
      :roleList="roleList"
      :supplier_user_id="curModel.supplier_user_id"
      @close="closeEdit"
    ></Edit>
  </div>
</template>

<script>
import { userList, userDelete } from "@/api/auth.js";
import Add from "./dialog/Add.vue";
import Edit from "./dialog/Edit.vue";
export default {
  components: {
    Add,
    Edit,
  },
  inject: ["reload"],
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*角色是否加载完成*/
      role_loading: true,
      /*列表数据*/
      tableData: [],
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*横向表单数据模型*/
      formInline: {
        user: "",
        region: "",
      },
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      curModel: {},
      /*角色列表*/
      roleList: [],
    };
  },
  created() {
    /*获取列表*/
    this.getTableList();
  },
  methods: {
    /*选择第几页*/
    handleCurrentChange(val) {
      let self = this;
      self.curPage = val;
      self.loading = true;
      self.getTableList();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.curPage = 1;
      this.pageSize = val;
      this.getTableList();
    },

    /*获取列表*/
    getTableList() {
      let self = this;
      let Params = {};
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      userList(Params, true)
        .then((data) => {
          self.loading = false;
          self.role_loading = false;
          self.roleList = data.data.roleList;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },

    /*打开添加*/
    addClick() {
      if (!this.role_loading) {
        this.open_add = true;
      }
    },

    /*关闭添加*/
    closeAdd(e) {
      this.open_add = false;
      if (e) {
        this.getTableList();
      }
    },

    /*打开编辑*/
    editClick(row) {
      this.curModel = row;
      this.open_edit = true;
    },

    /*关闭编辑*/
    closeEdit(e) {
      this.open_edit = false;
      if (e) {
        this.getTableList();
      }
    },

    /*删除*/
    deleteClick(row) {
      let self = this;
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          userDelete(
            {
              supplier_user_id: row.supplier_user_id,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，该管理员删除成功",
                  type: "success",
                });
                //刷新页面
                self.getTableList();
              } else {
                self.loading = false;
              }
            })
            .catch((error) => {
              self.loading = false;
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
