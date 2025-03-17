<template>
  <div class="user clearfix">
    <!--添加商户-->
    <div class="common-level-rail fl">
      <el-button
        size="small"
        type="primary"
        icon="Plus"
        @click="addClick"
        v-auth="'/supplier/supplier/add'"
        >添加商户</el-button
      >
    </div>
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
            placeholder="请输入商户名称"
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
            prop="shop_supplier_id"
            label="商户ID"
            width="90"
          ></el-table-column>
          <el-table-column prop="name" label="商户名称"></el-table-column>
          <el-table-column
            prop="superUser.user_name"
            label="登录账号"
          ></el-table-column>
          <el-table-column label="logo" width="80">
            <template #default="scope">
              <el-image
                v-if="scope.row.logo"
                :src="scope.row.logo.file_path"
                style="width: 50px; height: 50px"
                :preview-src-list="getLogoList(scope.$index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="营业执照" width="80">
            <template #default="scope">
              <el-image
                v-if="scope.row.business"
                :src="scope.row.business.file_path"
                width="50"
                height="50"
                :preview-src-list="getBusinessList(scope.$index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="保证金" width="80">
            <template #default="scope">
              <span v-if="scope.row.status == 0" class="green">已缴纳</span>
              <span v-if="scope.row.status == 10">申请退出</span>
              <span v-if="scope.row.status == 20" class="gray">未缴纳</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="link_name"
            label="联系人"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="link_phone"
            label="联系电话"
            width="120"
          ></el-table-column>
          <el-table-column prop="address" label="联系地址"></el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
            width="150"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button
                @click="recycle(scope.row, 0)"
                link
                type="primary"
                size="small"
                v-auth="'/supplier/supplier/edit'"
                v-if="scope.row.is_recycle == 1"
                style="color: gray"
                >开启</el-button
              >
              <el-button
                @click="recycle(scope.row, 1)"
                link
                type="primary"
                size="small"
                v-auth="'/supplier/supplier/edit'"
                v-else
                >禁用</el-button
              >
              <el-button
                @click="editClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/supplier/supplier/edit'"
                >编辑</el-button
              >
              <el-button
                @click="deleteClick(scope.row.shop_supplier_id)"
                link
                type="primary"
                size="small"
                v-auth="'/supplier/supplier/delete'"
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
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  supplierList,
  deleteSupplier,
  supplierRecycle,
} from "@/api/supplier.js";
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
      logoImgs: [],
      businessImgs: [],
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
      let Params = this.formInline;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      Params.list_rows = self.pageSize;
      supplierList(Params, true)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data.list.data;
          self.totalDataNumber = res.data.list.total;
          self.tableData.forEach(function (item) {
            if (item.business) {
              self.businessImgs.push(item.business.file_path);
            }
            if (item.logo) {
              self.logoImgs.push(item.logo.file_path);
            }
          });
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    getLogoList(index) {
      return this.logoImgs.slice(index).concat(this.logoImgs.slice(0, index));
    },
    getBusinessList(index) {
      return this.businessImgs
        .slice(index)
        .concat(this.businessImgs.slice(0, index));
    },
    /*搜索查询*/
    onSubmit() {
      this.curPage = 1;
      this.getTableList();
    },

    /*打开添加*/
    addClick() {
      this.$router.push("/supplier/supplier/add");
    },

    /*打开编辑*/
    editClick(row) {
      let params = row.shop_supplier_id;
      this.$router.push({
        path: "/supplier/supplier/edit",
        query: {
          shop_supplier_id: params,
        },
      });
    },
    /* 强制下架上架*/
    recycle(row, state) {
      let self = this;
      let war = "";
      if (state == 1) {
        war = "禁止";
      } else if (state == 0) {
        war = "开启";
      }
      ElMessageBox.confirm("确认要" + war + "吗?", "提示", {
        type: "warning",
      }).then(() => {
        supplierRecycle({
          shop_supplier_id: row.shop_supplier_id,
          is_recycle: state,
        }).then((data) => {
          ElMessage({
            message: war + "成功",
            type: "success",
          });
          self.getTableList();
        });
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
          deleteSupplier(
            {
              shop_supplier_id: row,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，商户删除成功",
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
