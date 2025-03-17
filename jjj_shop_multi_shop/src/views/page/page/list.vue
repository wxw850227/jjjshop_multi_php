<template>
  <div class="d-b-s diy-preview">
    <!--手机diy容器-->
    <div class="diy-phone">
      <Model
        v-if="!loading"
        ref="model"
        :form="form"
        :defaultData="defaultData"
        :diyData="diyData"
      ></Model>
    </div>
    <div class="user flex-1">
      <!--添加页面-->
      <div class="common-level-rail">
        <el-button
          size="small"
          type="primary"
          icon="Plus"
          @click="addClick()"
          v-auth="'/page/page/addpage'"
          >添加页面</el-button
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
              prop="page_id"
              label="页面ID"
              width="80"
            ></el-table-column>
            <el-table-column prop="page_name" label="页面名称">
              <template #default="scope">
                <span>{{ scope.row.page_name }}</span>
                <span class="red" v-if="scope.row.is_default != 0">(默认)</span>
                <!-- <span class="gray">（首页）</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="page_type" label="页面类型">
              <template #default="scope">
                <span v-if="scope.row.page_type == 10">商城首页</span>
                <span v-if="scope.row.page_type == 20">自定义页</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="添加时间"
            ></el-table-column>
            <el-table-column
              prop="update_time"
              label="更新时间"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
              <template #default="scope">
                <el-button
                  v-if="scope.row.is_default == 0"
                  @click="setHomeClick(scope.row.page_id)"
                  link
                  type="primary"
                  size="small"
                  v-auth="'/page/page/setPage'"
                  >设为默认</el-button
                >
                <el-button
                  @click="editClick(scope.row.page_id)"
                  link
                  type="primary"
                  size="small"
                  v-auth="'/page/page/editPage'"
                  >编辑</el-button
                >
                <el-button
                  v-if="scope.row.is_default == 0"
                  @click="deleteClick(scope.row.page_id)"
                  link
                  type="primary"
                  size="small"
                  v-auth="'/page/page/deletePage'"
                  >删除
                </el-button>
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
  </div>
</template>

<script>
import { HomeList, todeletePage, setPage } from "@/api/page.js";
import Model from "./diy/Preview.vue";
export default {
  components: {
    Model,
  },
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
      /*默认数据*/
      defaultData: {},
      /*组件数据列表*/
      diyData: {
        items: [],
      },
      /*表单对象*/
      form: {
        umeditor: {},
        /*当前选中*/
        curItem: {},
        /*当前选中的元素（下标）*/
        selectedIndex: -1,
      },
    };
  },
  created() {
    /*获取列表*/
    this.getTableList();
  },
  methods: {
    onEditer() {
      return;
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

    /*获取列表*/
    getTableList() {
      let self = this;
      let Params = {};
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      HomeList(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.diyData = data.data.default.page_data;
          console.log(self.diyData);
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },

    /*删除数据*/
    deleteClick(row) {
      let self = this;
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          todeletePage(
            {
              page_id: row,
            },
            true
          )
            .then((data) => {
              if (data.code == 1) {
                self.loading = false;
                ElMessage({
                  message: "恭喜你，删除成功",
                  type: "success",
                });
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

    /*添加页面*/
    addClick() {
      this.$router.push("/page/page/addpage");
    },

    /*设为首页*/
    setHomeClick(page_id) {
      let self = this;
      ElMessageBox.confirm("确定要将此页面设置为默认首页吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          setPage(
            {
              page_id: page_id,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，设置成功",
                  type: "success",
                });
                self.getTableList();
              } else {
                ElMessage.error("错了哦，这是一条错误消息");
              }
            })
            .catch((error) => {
              self.loading = false;
            });
        })
        .catch(() => {});
    },

    /*编辑*/
    editClick(page_id) {
      let self = this;
      self.$router.push({
        path: "/page/page/editpage",
        query: {
          page_id: page_id,
        },
      });
    },
  },
};
</script>
<style>
.diy-preview .diy-phone {
  width: 375px;
  margin-right: 20px;
  flex-shrink: 0;
}
.diy-preview .diy-phone .btn-edit-del {
  display: none;
}
.diy-preview .diy-phone .diy-phone-container .diy-phone-item > div:hover,
.diy-preview .diy-phone .diy-phone-container .diy-phone-item.active > div {
  border: 2px solid #f1f1f2;
}
</style>
