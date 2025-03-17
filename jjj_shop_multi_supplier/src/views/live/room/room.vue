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
        <el-form-item>
          <el-input
            size="small"
            v-model="searchForm.search"
            placeholder="请输入用户名和真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="Search"
            @click="searchSubmit"
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
          <el-table-column prop="name" label="标题">
            <template #default="scope">
              <div class="text-ellipsis">
                <span class="red" v-if="scope.row.is_top == 1">[置顶]</span
                >{{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="share_img_id" label="封面" width="120">
            <template #default="scope">
              <div class="picture-box d-c-c" v-if="scope.row.share_img_id > 0">
                <img :src="scope.row.share.file_path" alt="封面" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status_text"
            label="直播状态"
          ></el-table-column>
          <el-table-column prop="status_text" label="开播时间">
            <template #default="scope">
              <span
                class="fb green"
                v-if="
                  scope.row.live_status == 103 || scope.row.live_status == 101
                "
              >
                {{ scope.row.real_start_time_text }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status_text" label="结束时间">
            <template #default="scope">
              <span class="fb green" v-if="scope.row.live_status == 103">
                {{ scope.row.real_end_time_text }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="房间状态">
            <template #default="scope">
              <span class="fb red" v-if="scope.row.is_delete == 1">隐藏</span>
              <span class="fb green" v-if="scope.row.is_delete == 0">显示</span>
            </template>
          </el-table-column>
          <el-table-column prop="anchor_name" label="主播名" width="70">
            <template #default="scope">
              <div class="user-info d-s-c">
                <span class="ml10">{{ scope.row.user.nickName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数据统计" width="150">
            <template #default="scope">
              <div>观看人数：{{ scope.row.view_num }}</div>
              <div>礼物收入：{{ scope.row.gift_num }}</div>
              <div>订单数量：{{ scope.row.sales_num }}</div>
              <div>点赞数量：{{ scope.row.digg_num }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
            width="120"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                @click="editClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/live/room/edit'"
                >修改</el-button
              >
              <el-button
                @click="showGift(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/live/room/user_gift'"
                >礼物排行</el-button
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

    <!--查看房间商品-->
   <!--  <Products
      :is_open="open_product"
      :curModel="curModel"
      @close="closeProducts"
    ></Products> -->

    <!--编辑-->
    <Edit :open="open_edit" :form="curModel" @close="closeEdit"></Edit>

    <!--查看房间礼物排行-->
    <Gift :is_open="open_gift" :curModel="curModel" @close="closeGift"></Gift>
  </div>
</template>

<script>
import { getRoom, deleteRoom } from "@/api/live.js";
// import Products from "./dialog/Products.vue";
import Edit from "./dialog/Edit.vue";
import Gift from "./dialog/Gift.vue";
export default {
  components: {
    // Products,
    Edit,
    Gift,
  },
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
      searchForm: {
        search: "",
      },
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*编辑对象*/
      curModel: {},
      /*是否打开商品*/
      open_product: false,
      /*是否审核*/
      open_audit: false,
      /*是否打开礼物*/
      open_gift: false,
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
      let Params = {
        page: self.curPage,
        list_rows: self.pageSize,
        username: self.searchForm.search,
      };

      getRoom(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },

    /*删除分类*/
    deleteClick(row) {
      let self = this;
      ElMessageBox.confirm("删除后不可恢复，确认删除该记录吗?", "提示", {
        type: "warning",
      }).then(() => {
        deleteRoom({
          room_id: row.room_id,
        }).then((data) => {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          self.getTableList();
        });
      });
    },

    /*查看商品*/
    showProduct(item) {
      this.curModel = item;
      this.open_product = true;
    },

    /*关闭商品*/
    closeProducts() {
      this.open_product = false;
    },

    /*查看礼物*/
    showGift(item) {
      this.curModel = item;
      this.open_gift = true;
    },

    /*关闭礼物*/
    closeGift() {
      this.open_gift = false;
    },
    /*打开编辑*/
    editClick(e) {
      this.curModel = e;
      this.open_edit = true;
    },

    /*关闭编辑*/
    closeEdit() {
      this.open_edit = false;
      this.getTableList();
    },
  },
};
</script>

<style scoped="scoped">
.picture-box {
  width: 50px;
  height: 50px;
}

.picture-box img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
