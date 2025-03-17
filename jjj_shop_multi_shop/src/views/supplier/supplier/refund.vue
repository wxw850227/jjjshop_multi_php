<template>
  <div class="user clearfix">
    <div class="common-seach-wrap fr">
      <el-form
        size="small"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="审核状态">
          <el-select
            size="small"
            v-model="formInline.status"
            placeholder="请选择"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
            <el-option label="未通过" value="2"></el-option>
          </el-select>
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
            prop="deposit_refund_id"
            label="ID"
            width="90"
          ></el-table-column>
          <el-table-column prop="" label="商户">
            <template #default="scope">
              <span>{{ scope.row.supplier.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="deposit_money"
            label="金额"
            width="190"
          ></el-table-column>
          <el-table-column prop="pay_status" label="状态" width="190">
            <template #default="scope">
              <span v-if="scope.row.status == 0" class="orange">待审核</span>
              <span v-if="scope.row.status == 1">已通过</span>
              <span v-if="scope.row.status == 2" class="gray">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="audit_time" label="审核时间" width="150">
            <template #default="scope">
              <span>{{ scope.row.audit_time.text }}</span>
            </template></el-table-column
          >
          <el-table-column
            prop="create_time"
            label="添加时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="编辑时间"
            width="150"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template #default="scope">
              <el-button
                @click="Audite(scope.row, 1)"
                link
                type="primary"
                size="small"
                v-if="scope.row.status == 0"
                >同意</el-button
              >
              <el-button
                @click="Audite(scope.row, 2)"
                link
                type="primary"
                size="small"
                v-if="scope.row.status == 0"
                >拒绝</el-button
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
import { refundList, refundSubmit } from "@/api/supplier.js";
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
        status: "",
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
      let Params = this.formInline;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      refundList(Params, true)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data.list.data;
          self.totalDataNumber = res.data.list.total;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*搜索查询*/
    onSubmit() {
      this.curPage = 1;
      this.getTableList();
    },

    /* 强制下架上架*/
    Audite(row, state) {
      let self = this;
      let war = "";
      let war_ = "";
      if (state == 1) {
        (war = "同意退押金"), (war_ = "退押金");
      } else if (state == 2) {
        (war = "拒绝退押金"), (war_ = "操作");
      }
      ElMessageBox.confirm("确认要" + war + "吗?", "提示", {
        type: "warning",
      }).then(() => {
        refundSubmit({
          deposit_refund_id: row.deposit_refund_id,
          state,
        })
          .then((data) => {
            ElMessage({
              message: war_ + "成功",
              type: "success",
            });
            self.getTableList();
          })
          .catch((error) => {
            self.loading = false;
          });
      });
    },
  },
};
</script>

<style></style>
