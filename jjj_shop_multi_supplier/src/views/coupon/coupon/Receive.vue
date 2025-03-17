<template>
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
    </div>

    <div class="product-content">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="table-wrap">
          <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="user.nickName" label="用户"></el-table-column>
            <el-table-column prop="coupon_id" label="优惠券ID"></el-table-column>
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="coupon_type" label="优惠券类型"></el-table-column>
            <el-table-column prop="min_price" label="最低消费金额"></el-table-column>
            <el-table-column prop="seckill_stock" label="优惠方式">
              <template #default="scope">
                <div v-if="scope.row.coupon_type.value==10">
                  <span>立减 <strong class="orange">{{scope.row.reduce_price}}</strong> 元</span>
                </div>
                <div v-if="scope.row.coupon_type.value==20">
                  <span>打 <strong class="orange">{{scope.row.discount}}</strong> 折</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="seckill_stock" label="有效期">
              <template #default="scope">
                <div v-if="scope.row.expire_type==10">
                  <span>领取 <strong class="orange">{{scope.row.expire_day}}</strong> 天内有效</span>
                </div>
                <div v-if="scope.row.expire_type==20">
                  <span>
                    {{scope.row.start_time.text}}
                    ~
                    {{scope.row.end_time.text}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="领取时间"></el-table-column>
          </el-table>
        </div>
      </el-form>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage"
           :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {receiveList} from '@/api/coupon.js';
  export default {
    data() {
      return {
        formInline: {},
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
        receiveList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          })
          .catch(error => {});
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
        this.getTableList();
      }
    }
  };
</script>

<style>
</style>
