<template>
  <div class="user clearfix">
    <div class="common-seach-wrap fr">
      <el-form
        size="small"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="">
          <el-input
            v-model="formInline.search"
            placeholder="请输入店员姓名/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
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
            prop="clerk_id"
            label="门店ID"
            width="60"
          ></el-table-column>
          <el-table-column prop="nickName" label="微信头像" width="70">
            <template #default="scope">
              <img
                v-if="scope.row.user"
                v-img-url="scope.row.user.avatarUrl"
                width="30"
                height="30"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="user.nickName"
            label="微信昵称"
          ></el-table-column>
          <el-table-column
            prop="store.supplier.name"
            label="商户名称"
          ></el-table-column>
          <el-table-column
            prop="store.store_name"
            label="所属门店"
          ></el-table-column>
          <el-table-column prop="real_name" label="店员姓名"></el-table-column>
          <el-table-column prop="mobile" label="店员手机号"></el-table-column>
          <el-table-column prop="status.text" label="状态">
            <template #default="scope">
              <span
                :class="{
                  green: scope.row.status.value == 1,
                  gray: scope.row.status.value == 0,
                }"
                >{{ scope.row.status.text }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
          ></el-table-column>
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
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { clerklist, deleteClerk } from "@/api/store.js";
export default {
  components: {},
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*列表数据*/
      tableData: [],
      /*门店列表数据*/
      storeList: [],
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*横向表单数据模型*/
      formInline: {
        shop_id: "",
        search: "",
      },
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      userModel: {},
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
      clerklist(Params, true)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data.list.data;
          self.totalDataNumber = res.data.list.total;
          self.storeList = res.data.store_list.data;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*搜索查询*/
    onSubmit() {
      let self = this;
      self.loading = true;
      let Params = this.formInline;
      clerklist(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*打开添加*/
    addClick() {
      this.$router.push("/store/clerk/add");
    },

    /*打开编辑*/
    editClick(row) {
      let self = this;
      let params = row.clerk_id;
      this.$router.push({
        path: "/store/clerk/edit",
        // name: 'mallList',
        query: {
          clerk_id: params,
        },
      });
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
          deleteClerk(
            {
              clerk_id: row,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，店员删除成功",
                  type: "success",
                });
                self.getTableList();
              }
            })
            .catch((error) => {
              self.loading = false;
            });
        })
        .catch(() => {
          self.loading = false;
        });
    },
  },
};
</script>

<style></style>
