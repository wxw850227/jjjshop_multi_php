<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-退货地址列表
  -->
  <div class="user">
    <div class="common-form">退货地址列表</div>
    <!--添加退货地址-->
    <div class="common-level-rail">
      <el-button
        size="small"
        type="primary"
        @click="addClick"
        v-auth="'/setting/address/add'"
        >添加</el-button
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
          :loading="loading"
        >
          <el-table-column prop="address_id" label="地址ID"></el-table-column>
          <el-table-column prop="name" label="收货人姓名"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="detail" label="详细地址"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
          ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                @click="editClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/setting/address/edit'"
                >编辑</el-button
              >
              <el-button
                @click="deleteClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/setting/address/delete'"
                >删除</el-button
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
import { ref, reactive } from "vue";
import { addressList, deleteAddress } from "@/api/setting.js";

export default {
  setup() {
    const loading = ref(true);
    /*列表数据*/
    const tableData = reactive([]);
    /*一页多少条*/
    const pageSize = ref(20);
    /*一共多少条数据*/
    const totalDataNumber = ref(0);
    /*当前是第几页*/
    const curPage = ref(1);

    const getData = () => {
      const Params = {
        page: curPage.value,
        list_rows: pageSize.value,
      };
      addressList(Params, true)
        .then((data) => {
          loading.value = false;
          tableData.value = data.data.list.data;
          totalDataNumber.value = data.data.list.total;
        })
        .catch((error) => {});
    };

    /*选择第几页*/
    const handleCurrentChange = (val) => {
      curPage.value = val;
      loading.value = true;
      getData();
    };

    /*每页多少条*/
    const handleSizeChange = (val) => {
      curPage.value = 1;
      pageSize.value = val;
      getData();
    };

    /*打开添加*/
    const addClick = () => {
      this.$router.push("/setting/address/add");
    };

    /*打开编辑*/
    const editClick = (item) => {
      this.$router.push({
        path: "/setting/address/edit",
        query: {
          address_id: item.address_id,
        },
      });
    };

    /*删除用户*/
    const deleteClick = (row) => {
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAddress(
            {
              address_id: row.address_id,
            },
            true
          )
            .then((data) => {
              ElMessage({
                message: data.msg,
                type: "success",
              });
              getData();
            })
            .catch((error) => {});
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };

    getData(); // 获取列表数据

    return {
      loading,
      tableData,
      pageSize,
      totalDataNumber,
      curPage,
      handleCurrentChange,
      handleSizeChange,
      addClick,
      editClick,
      deleteClick,
    };
  },
};
</script>

<style></style>
