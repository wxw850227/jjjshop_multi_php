<template>
  <div class="user clearfix">
    <!--提现管理-->
    <div class="common-seach-wrap fr">
      <el-form
        size="small"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="商户名称">
          <el-input
            v-model="formInline.search"
            placeholder="请输入商户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.apply_status" placeholder="请选择状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="待审核" value="10"></el-option>
            <el-option label="审核通过" value="20"></el-option>
            <el-option label="已打款" value="40"></el-option>
            <el-option label="驳回" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现方式">
          <el-select v-model="formInline.pay_type" placeholder="请选择提现方式">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="支付宝" value="10"></el-option>
            <el-option label="银行卡" value="20"></el-option>
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
          <el-table-column prop="supplier.name" label="商户">
            <template #default="scope">
              <span v-if="scope.row.supplier">{{
                scope.row.supplier.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="提现金额">
            <template #default="scope">
              <span class="fb orange">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="打款方式">
            <template #default="scope">
              {{ scope.row.pay_type.text }}
            </template>
          </el-table-column>
          <el-table-column label="打款信息">
            <template #default="scope">
              <span v-if="scope.row.pay_type.value == 10 && scope.row.account"
                >姓名:{{ scope.row.account.alipay_name }}<br />
                账号:{{ scope.row.account.alipay_account }}</span
              >
              <span v-if="scope.row.pay_type.value == 20 && scope.row.account"
                >姓名:{{ scope.row.account.bank_account }}<br />开户行:{{
                  scope.row.account.bank_name
                }}
                <br />账号:{{ scope.row.account.bank_card }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="apply_status" label="状态">
            <template #default="scope">
              <span v-if="scope.row.apply_status.value == 10">待审核</span>
              <span v-if="scope.row.apply_status.value == 20">审核通过</span>
              <div v-if="scope.row.apply_status.value == 30">
                驳回
                <span class="red">原因：{{ scope.row.reject_reason }}</span>
              </div>
              <span v-if="scope.row.apply_status.value == 40">已打款</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
            width="150"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template #default="scope">
              <template v-if="scope.row.apply_status.value == 10">
                <el-button
                  @click="submitClick(scope.row)"
                  link
                  type="primary"
                  size="small"
                  >审核</el-button
                >
              </template>
              <template v-if="scope.row.apply_status.value == 20">
                <el-button
                  @click="makeMoney(scope.row)"
                  link
                  type="primary"
                  size="small"
                  >确认打款</el-button
                >
              </template>
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

    <!--审核-->
    <Submit :open="open_submit" :form="curModel" @close="closeSubmit"></Submit>
  </div>
</template>

<script>
import { cashList, cashMoney } from "@/api/supplier.js";
import Submit from "./dialog/Submit.vue";
import { deepClone } from "@/utils/base";
export default {
  components: {
    Submit,
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*列表数据*/
      tableData: [],
      /*门店列表数据*/
      storeList: [],
      /*一页多少条*/
      pageSize: 15,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*横向表单数据模型*/
      formInline: {
        search: "",
        apply_status: "-1",
        pay_type: "-1",
      },
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      curModel: {},
      /*是否打开审核 */
      open_submit: false,
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
      let Params = self.formInline;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      cashList(Params, true)
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

    /*审核*/
    submitClick(row) {
      this.curModel = deepClone(row);
      this.open_submit = true;
    },

    /*关闭审核*/
    closeSubmit(e) {
      this.open_submit = false;
      if (e) {
        this.getTableList();
      }
    },

    /*确认打款*/
    makeMoney(e) {
      let self = this;
      ElMessageBox.confirm("确认要打款吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          cashMoney(
            {
              id: e.id,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，操作成功",
                  type: "success",
                });
                this.getTableList();
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
  },
};
</script>

<style></style>
