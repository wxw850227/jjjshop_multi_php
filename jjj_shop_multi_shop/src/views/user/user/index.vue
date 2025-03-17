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
        <el-form-item label="关键词">
          <el-input
            v-model="formInline.nick_name"
            placeholder="请输入昵称|手机号|ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="formInline.grade_id" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option
              v-for="(item, index) in gradeList"
              :key="index"
              :label="item.name"
              :value="item.grade_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select v-model="formInline.reg_source" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="小程序" value="wx"></el-option>
            <el-option label="APP" value="app"></el-option>
            <el-option label="H5" value="h5"></el-option>
			<el-option label="公众号" value="mp"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="formInline.reg_date"
              type="daterange"
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="mb16">
        <span>标签</span>
        <span class="pl10">
          <el-radio-group
            v-model="formInline.tag_id"
            size="mini"
            @change="onSubmit"
          >
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button
              :label="item.tag_id"
              v-for="(item, index) in allTag"
              :key="index"
            >
              {{ item.tag_name }}
            </el-radio-button>
          </el-radio-group>
        </span>
      </div>
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
            prop="user_id"
            label="ID"
            width="80"
          ></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="nickName" label="微信头像">
            <template #default="scope">
              <img v-img-url="scope.row.avatarUrl" :width="50" :height="50" />
            </template>
          </el-table-column>
          <el-table-column prop="" label="会员等级">
            <template #default="scope">
              <span v-if="scope.row.grade_id == 0">无等级</span>
              <span v-else>{{ scope.row.grade.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="来源">
            <template #default="scope">
              <span v-if="scope.row.reg_source == 'wx'">小程序</span>
              <span v-if="scope.row.reg_source == 'app'">APP</span>
              <span v-if="scope.row.reg_source == 'h5'">H5</span>
			  <span v-if="scope.row.reg_source == 'mp'">公众号</span>
            </template>
          </el-table-column>
          <el-table-column prop="points" label="积分"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            width="140"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template #default="scope">
              <el-button
                @click="addClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/user/user/recharge'"
                >充值
              </el-button>
              <el-button
                @click="editClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/user/user/edit'"
                >编辑
              </el-button>
              <el-button
                @click="gradeClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/user/user/grade'"
                >等级
              </el-button>
              <el-button
                @click="tagClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/user/user/delete'"
                >标签
              </el-button>
              <el-button
                @click="deleteClick(scope.row)"
                link
                type="primary"
                size="small"
                v-auth="'/user/user/delete'"
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
        ></el-pagination>
      </div>
    </div>

    <!--会员充值-->
    <Recharge
      v-if="open_add"
      :open_add="open_add"
      :form="userModel"
      :gradeList="gradeList"
      @closeDialog="closeDialogFunc($event, 'add')"
    ></Recharge>
    <!--会员等级-->
    <Grade
      v-if="open_edit"
      :open_edit="open_edit"
      :form="userModel"
      :gradeList="gradeList"
      @closeDialog="closeDialogFunc($event, 'edit')"
    ></Grade>
    <!--会员标签-->
    <Tag
      v-if="open_tag"
      :open_tag="open_tag"
      :form="userModel"
      @closeDialog="closeDialogFunc($event, 'tag')"
    ></Tag>
  </div>
</template>

<script>
import { userlist, deleteuser } from "@/api/user.js";
import Grade from "./dialog/Grade.vue";
import Recharge from "./dialog/Recharge.vue";
import Tag from "./dialog/Tag.vue";
export default {
  components: {
    /*编辑组件*/
    Grade,
    Recharge,
    Tag,
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
      /*横向表单数据模型*/
      formInline: {
        nick_name: "",
        grade_id: "",
        reg_date: "",
        tag_id: 0,
        reg_source: "",
      },
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      userModel: {},
      /*等级*/
      gradeList: [],
      open_tag: false,
      /*所有标签*/
      allTag: [],
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
      userlist(Params, true)
        .then((data) => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
          self.gradeList = data.data.grade;
          self.allTag = data.data.allTag;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*搜索查询*/
    onSubmit() {
      let self = this;
      self.loading = true;
      let Params = self.formInline;
      self.getTableList();
    },

    /*打开添加*/
    addClick(item) {
      this.userModel = item;
      this.open_add = true;
    },
    /*打开编辑*/
    editClick(item) {
      let self = this;
      let params = item.user_id;
      this.$router.push({
        path: "/user/user/edit",
        query: {
          user_id: params,
        },
      });
    },
    /*打开编辑*/
    gradeClick(item) {
      this.userModel = item;
      this.open_edit = true;
    },

    tagClick(item) {
      this.userModel = item;
      this.open_tag = true;
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
      if (f == "tag") {
        this.open_tag = e.openDialog;
        if (e.type == "success") {
          this.getTableList();
        }
      }
    },

    /*删除用户*/
    deleteClick(row) {
      let self = this;
      ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.loading = true;
          deleteuser(
            {
              user_id: row.user_id,
            },
            true
          )
            .then((data) => {
              self.loading = false;
              if (data.code == 1) {
                ElMessage({
                  message: "恭喜你，用户删除成功",
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
        .catch(() => {
          self.loading = false;
        });
    },
  },
};
</script>
<style></style>
