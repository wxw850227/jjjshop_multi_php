<template>
  <el-dialog
    title="查看礼物排行"
    v-model="dialogVisible"
    @close="cancelFunc"
    :close-on-press-escape="false"
    width="800px"
  >
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table
          :data="tableData"
          size="small"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="user.nickName"
            label="用户名"
          ></el-table-column>
          <el-table-column prop="gift_num" label="礼物数"></el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="curPage"
          :page-sizes="[2, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getUserGift } from "@/api/live.js";
export default {
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*当前是第几页*/
      curPage: 1,
      /*一页多少条*/
      pageSize: 15,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*会员列表*/
      tableData: [],
      /*是否显示*/
      dialogVisible: false,
    };
  },
  props: {
    is_open: Boolean,
    curModel: Object,
  },
  watch: {
    is_open: function (n, o) {
      if (n != o && n) {
        this.dialogVisible = n;
        if (n) {
          this.getTableList();
        }
      }
    },
  },
  created() {},
  methods: {
    /*选择第几页*/
    handleCurrentChange(val) {
      this.curPage = val;
      this.getTableList();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.curPage = 1;
      this.pageSize = val;
      this.getTableList();
    },

    /*获取数据*/
    getTableList() {
      let self = this;
      self.loading = true;
      let params = {};
      params.page = self.curPage;
      params.list_rows = self.pageSize;
      params.room_id = self.curModel.room_id;
      getUserGift(params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
          self.gradeList = data.data.grade;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*关闭弹窗*/
    cancelFunc(e) {
      this.$emit("close", {
        type: "error",
      });
    },
  },
};
</script>

<style></style>
