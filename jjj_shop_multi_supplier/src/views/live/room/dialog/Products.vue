<template>
  <el-dialog
    title="查看商品"
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
          <el-table-column prop="" label="商品" width="70">
            <template #default="scope">
              <img
                :src="scope.row.product.image[0].file_path"
                class="radius"
                width="30"
                height="30"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="product.product_name"
            label="商品名称"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="140"
          ></el-table-column>
          <!-- <el-table-column label="操作" width="50">
            <template #default="scope">
              <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column> -->
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

    <!-- <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmFunc">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import { getProduct } from "@/api/live.js";
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
      /*搜索表单对象*/
      formInline: {
        /*等级*/
        grade_id: "",
        /*昵称*/
        nickName: "",
        /*性别*/
        sex: "",
      },
      /*会员等级列表*/
      gradeList: [],
      /*会员列表*/
      tableData: [],
      /*性别列表*/
      sex: ["女", "男", "未知"],
      /*选中的*/
      multipleSelection: [],
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
      let params = self.formInline;
      params.page = self.curPage;
      params.list_rows = self.pageSize;
      params.shop_supplier_id = self.curModel.supplier.shop_supplier_id;
      getProduct(params, true)
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

    /*查询*/
    search() {
      this.curPage = 1;
      this.tableData = [];
      this.getTableList();
    },

    /*关闭弹窗*/
    cancelFunc(e) {
      this.$emit("close", {
        type: "error",
      });
    },

    /*删除分类*/
    deleteClick(row) {
      let self = this;
      ElMessageBox.confirm("删除后不可恢复，确认删除该记录吗?", "提示", {
        type: "warning",
      }).then(() => {
        videoApi
          .deleteComment({
            comment_id: row.comment_id,
          })
          .then((data) => {
            ElMessage({
              message: "删除成功",
              type: "success",
            });
            self.getTableList();
          });
      });
    },
  },
};
</script>

<style></style>
