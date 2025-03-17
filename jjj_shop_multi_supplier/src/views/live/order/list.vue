<template>
  <div class="list">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form
        size="small"
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item
          ><el-input
            size="small"
            v-model="searchForm.order_no"
            placeholder="请输入订单号"
          ></el-input
        ></el-form-item>
        <el-form-item
          ><el-input
            size="small"
            v-model="searchForm.room_name"
            placeholder="请输入直播间名称"
          ></el-input
        ></el-form-item>
        <el-form-item
          ><el-input
            size="small"
            v-model="searchForm.real_name"
            placeholder="请输入主播名称"
          ></el-input
        ></el-form-item>
        <el-form-item
          ><el-input
            size="small"
            v-model="searchForm.supplier_name"
            placeholder="请输入商户名称"
          ></el-input
        ></el-form-item>
        <el-form-item>
         <el-button size="small" type="primary" icon="Search" @click="searchSubmit">查询</el-button> 
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
          <el-table-column prop="order_no" label="订单号"></el-table-column>
          <el-table-column
            prop="user.nickName"
            label="购买用户"
          ></el-table-column>
          <el-table-column
            prop="room.user.nickName"
            label="主播名称"
          ></el-table-column>
          <el-table-column prop="supplier.name" label="商户"></el-table-column>
          <el-table-column
            prop="product[0].product_name"
            label="商品名称"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="room.name"
            label="所属直播间"
          ></el-table-column>
          <el-table-column
            prop="pay_price"
            label="订单金额"
            width="100"
          ></el-table-column>
          <el-table-column prop="state_text" label="订单状态"></el-table-column>
          <el-table-column
            prop="create_time"
            label="下单时间"
          ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="openDetail(scope.row)"
                v-auth="'/order/order/detail'"
                >详情</el-button
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
  </div>
</template>

<script>
import { getOrderList } from "@/api/live.js";
export default {
  components: {},
  inject: ["reload"],
  data() {
    return {
      /*是否加载完成*/
      loading: false,
      /*列表数据*/
      tableData: [],
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*横向表单数据模型*/
      searchForm: {
        order_no: "",
        room_name: "",
        real_name: "",
        supplier_name: "",
      },
    };
  },
  created() {
    /*获取列表*/
    this.getTableList();
  },
  methods: {
    /*搜索*/
    searchSubmit() {
      this.curPage = 1;
      this.getTableList();
    },

    /*选择第几页*/
    handleCurrentChange(val) {
      let self = this;
      self.curPage = val;
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
      let Params = self.searchForm;

      Params.page = self.curPage;
      Params.list_rows = self.pageSize;

      self.loading = true;

      getOrderList(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*打开详情*/
    openDetail(row) {
      let self = this;
      let params = row.order_id;
      self.$router.push({
        path: "/order/order/Detail",
        query: {
          order_id: params,
        },
      });
    },
  },
};
</script>

<style></style>
