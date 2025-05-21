<template>
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form
        size="small"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="连续签到天数">
          <el-select v-model="formInline.days" placeholder="连续签到天数">
            <el-option label="不限" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in daysList"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签到时间">
          <el-select v-model="formInline.sign_date" placeholder="签到时间">
            <el-option label="全部" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in signTime"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" v-if="formInline.sign_date == 3">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              size="small"
              v-model="formInline.create_time"
              type="daterange"
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="formInline.nickName"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="product-content">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="table-wrap">
          <el-table
            size="small"
            :data="tableData"
            border
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column
              prop="user.nickName"
              label="用户"
            ></el-table-column>
            <el-table-column
              prop="sign_date"
              label="签到日期"
            ></el-table-column>
            <el-table-column prop="days" label="连续签到天数"></el-table-column>
            <el-table-column prop="prize" label="活动奖品">
              <template #default="scope">
                <span class="orange">{{ scope.row.prize }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
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
import { getSignList } from "@/api/sign.js";
export default {
  data() {
    return {
      formInline: {
        days: -1,
        sign_date: -1,
      },
      form: {},
      tableData: [],
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*是否加载完成*/
      loading: true,
      /*搜索条件*/
      daysList: [
        "2天",
        "3天",
        "4天",
        "5天",
        "6天",
        "7天",
        "15天",
        "30天",
        "60天",
      ],
      /*搜索条件*/
      signTime: ["最近7天", "最近15天", "最近30天", "自定义"],
    };
  },
  created() {
    /*获取列表*/
    this.getData();
  },
  methods: {
    /*获取列表*/
    getData() {
      let self = this;
      let Params = {};
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      getSignList(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },
    onSubmit() {
      let self = this;
      let Params = this.formInline;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      self.loading = true;
      getSignList(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch((error) => {});
    },
    /*选择第几页*/
    handleCurrentChange(val) {
      let self = this;
      self.curPage = val;
      self.loading = true;
      self.getData();
    },

    /*每页多少条*/
    handleSizeChange(val) {
      this.curPage = 1;
      this.pageSize = val;
      this.getData();
    },
  },
};
</script>

<style></style>
