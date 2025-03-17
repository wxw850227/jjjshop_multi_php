<template>
  <div class="product-list">
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
          <el-table-column prop="money" label="提现金额">
            <template #default="scope">
              <span class="fb red">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pay_type" label="打款方式">
            <template #default="scope">
              <span>{{ scope.row.pay_type.text }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="apply_status" label="状态">
            <template #default="scope">
              <span>{{ scope.row.apply_status.text }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="申请时间"
          ></el-table-column>
        </el-table>
      </div>
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
</template>

<script>
import { lists } from "@/api/cash.js";
export default {
  components: {},
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*一页多少条*/
      pageSize: 10,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*搜索参数*/
      searchForm: {
        apply_status: 0,
      },
      /*列表数据*/
      tableData: [],
      /*全部分类*/
      categoryList: [
        {
          name: "待审核",
          apply_status: 10,
        },
        {
          name: "审核通过",
          apply_status: 20,
        },
        {
          name: "驳回",
          apply_status: 30,
        },
        {
          name: "已打款",
          apply_status: 40,
        },
      ],
    };
  },
  created() {
    /*获取列表*/
    this.getData();
  },
  methods: {
    /*选择第几页*/
    handleCurrentChange(val) {
      let self = this;
      self.loading = true;
      self.curPage = val;
      self.getData();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },

    /*切换菜单*/
    handleClick(tab, event) {
      let self = this;
      self.curPage = 1;
      self.getData();
    },

    /*获取列表*/
    getData() {
      let self = this;
      let Params = self.searchForm;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      self.loading = true;
      lists(Params, true)
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
      this.getData();
    },

    /*打开编辑*/
    editClick(row) {
      this.$router.push({
        path: "/product/product/edit",
        query: {
          product_id: row.product_id,
          scene: "edit",
        },
      });
    },

    /*删除*/
    delClick: function (row) {
      let self = this;
      ElMessageBox.confirm("删除后不可恢复，确认删除该记录吗?", "提示", {
        type: "warning",
      }).then(() => {
        PorductApi.delProduct({
          product_id: row.product_id,
        }).then((data) => {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          self.getData();
        });
      });
    },
  },
};
</script>

<style></style>
