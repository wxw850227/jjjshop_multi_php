<template>
  <div class="user">
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
            prop="store_id"
            label="门店ID"
            width="60"
          ></el-table-column>
          <el-table-column label="Logo" width="60">
            <template #default="scope">
              <img
                v-img-url="scope.row.logo.file_path"
                :width="30"
                :height="30"
              />
            </template>
          </el-table-column>
          <el-table-column prop="store_name" label="门店名称"></el-table-column>
          <el-table-column
            prop="supplier.name"
            label="商户名称"
          ></el-table-column>
          <el-table-column prop="shop_hours" label="营业时间"></el-table-column>
          <el-table-column prop="linkman" label="联系人"></el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="detail_address"
            label="门店地址"
            width="240"
          ></el-table-column>
          <el-table-column prop="is_check" label="自提核销">
            <template #default="scope">
              <span
                :class="{
                  green: scope.row.is_check.value == 1,
                  gray: scope.row.is_check.value == 0,
                }"
                >{{ scope.row.is_check.text }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="status" label="门店状态">
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
            label="创建时间"
            width="140"
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
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { shoplist, deleteShop } from "@/api/store.js";
export default {
  components: {},
  inject: ["reload"],
  data() {
    return {
      /*是否加载完成*/
      loading: true,
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
      shoplist(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },

    /*打开添加*/
    addClick() {
      this.$router.push("/store/store/add");
    },

    /*打开编辑*/
    editClick(row) {
      let self = this;
      let params = row.store_id;
      this.$router.push({
        path: "/store/store/edit",
        // name: 'mallList',
        query: {
          store_id: params,
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
          deleteShop(
            {
              store_id: row.store_id,
            },
            true
          )
            .then((data) => {
              ElMessage({
                message: "恭喜你，门店删除成功",
                type: "success",
              });
              self.getTableList();
            })
            .catch((error) => {});
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
