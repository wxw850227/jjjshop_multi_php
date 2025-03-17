<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-文章-列表
      -->
  <div>
    <div class="common-level-rail">
      <el-button size="small" type="primary" icon="Plus" @click="addArticle"
        >添加文章</el-button
      >
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column
          prop="article_id"
          label="文章ID"
          width="60"
        ></el-table-column>
        <el-table-column prop="address" label="封面" width="50">
          <template #default="scope">
            <img v-if="scope.row.image"
			 v-img-url="scope.row.image.file_path"
              width="30"
              height="30"
            />
          </template>
        </el-table-column>
        <el-table-column prop="article_title" label="文章标题">
          <template #default="scope">
            <div class="text-ellipsis" :title="scope.row.article_title">
              {{ scope.row.article_title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="category.name"
          label="文章分类"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="virtual_views"
          label="实际阅读量"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="article_sort"
          label="文章排序"
          width="100"
        ></el-table-column>
        <el-table-column prop="article_status" label="状态" width="100">
          <template #default="scope">
            <span v-if="scope.row.article_status == 1" class="green">显示</span>
            <span v-if="scope.row.article_status == 0" class="gray">隐藏</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          width="140"
        ></el-table-column>
        <el-table-column prop="name" label="操作" width="100">
          <template #default="scope">
            <el-button
              @click="editArticle(scope.row)"
              link
              type="primary"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteArticle(scope.row)"
              link
              type="primary"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
import { reactive, toRefs, defineComponent, onMounted } from "vue";
import { articlelist, deleteArticle, deleteCategory } from "@/api/article.js";
export default defineComponent({
  setup() {
    const state = reactive({
      /*分类*/
      categoryData: [],
      /*表单数据*/
      tableData: [],
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      userModel: {},
      commentData: [],
      loading: true,
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
    });
    return {
      ...toRefs(state),
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      let self = this;
      let Params = {};
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      articlelist(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.tableData.forEach((item) => {
            item["file_path"] = item.image.file_path;
          });
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    /*添加文章*/
    addArticle() {
      this.$router.push({
        path: "/plus/article/article/add",
      });
    },
    /*编辑文章*/
    editArticle(row) {
      let params = row.article_id;
      this.$router.push({
        path: "/plus/article/article/edit",
        query: {
          article_id: params,
        },
      });
    },

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

    /*删除文章*/
    deleteArticle(row) {
      let self = this;
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          deleteArticle(
            {
              article_id: row.article_id,
            },
            true
          )
            .then((data) => {
              ElMessage({
                message: data.msg,
                type: "success",
              });
              self.loading = false;
              self.getTableList();
            })
            .catch((error) => {});
        })
        .catch(() => {});
    },

    /*删除文章分类*/
    deleteCategory(row) {
      let self = this;
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCategory(
            {
              category_id: row.category_id,
            },
            true
          )
            .then((data) => {
              ElMessage({
                message: data.msg,
                type: "success",
              });
              self.getTableList();
            })
            .catch((error) => {});
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(tab, event) {},

    /*打开分类添加*/
    addCategory() {
      this.open_add = true;
    },

    /*打开分类编辑*/
    editCategory(item) {
      this.userModel = item;
      this.open_edit = true;
    },

    /*关闭弹窗*/
    closeDialogFunc(e, f) {
      if (f == "add") {
        this.open_add = e.openDialog;
        if (e.type == "success") {
          this.getTableList();
        }
      }
      if (f == "edit") {
        this.open_edit = e.openDialog;
        if (e.type == "success") {
          this.getTableList();
        }
      }
    },
  },
});
</script>

<style></style>
