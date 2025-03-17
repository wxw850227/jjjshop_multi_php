<template>
  <div v-loading="loading" class="diy-container clearfix">
    <!--类别选择-->
    <div class="diy-menu"><Type v-if="!loading" :defaultData="defaultData"></Type></div>

    <!--手机diy容器-->
    <div class="diy-phone"><Model v-if="!loading" ref="model" :form="form" :defaultData="defaultData" :diyData="diyData"></Model></div>

    <!--参数设置-->
    <div class="diy-info"><Params v-if="!loading" :form="form" :defaultData="defaultData" :diyData="diyData"></Params></div>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button  size="small" type="info" @click="gotoBack">返回上一页</el-button>
      <el-button size="small" type="primary" @click="Submit()" :loading="loading">保存</el-button>
    </div>
  </div>
</template>

<script>
import {deepClone} from '@/utils/base.js'
import { toAddPage, addPage } from '@/api/page.js'; 
import Type from './diy/Type.vue';
import Model from './diy/Model.vue';
import Params from './diy/Params.vue';
export default {
  components: {
    /*组件类别*/
    Type,
    /*组件信息*/
    Model,
    /*参数信息*/
    Params
  },
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*默认数据*/
      defaultData: {},
      /*组件数据列表*/
      diyData: {
        items: []
      },
      opts: {},
      /*表单对象*/
      form: {
        umeditor: {},
        /*当前选中*/
        curItem: {},
        /*当前选中的元素（下标）*/
        selectedIndex: -1
      }
    };
  },
  created() {
    /*获取列表*/
    this.getData();
  },
  methods: {

    /*获取初始化数据*/
    getData() {
      let self = this;
      toAddPage({}, true)
        .then(res => {
          self.defaultData = res.data.defaultData;
          self.diyData = res.data.jsonData;
          self.form.curItem=self.diyData.page;
          self.opts = res.data.opts;
          self.loading = false;
        })
        .catch(error => {
          self.loading = false;
        });
    },

    /**
     * 新增Diy组件
     * @param key
     */
    onAddItem: function(key) {
      // 复制默认diy组件数据
      let item = deepClone(this.defaultData[key]);
      this.diyData.items.push(item);
      // 编辑当前选中的元素
      this.$refs.model.onEditer(this.diyData.items.length - 1);
    },

    /*添加页面*/
    Submit() {
      let self = this;
      let params = self.diyData;
      if (params.items.length < 1) {
        ElMessage({
					message: '至少要选择一个组件',
					type: 'warning'
				});
        return;
      }
      self.loading = true;
      addPage(
        {
          params: JSON.stringify(params)
        },
        true
      )
        .then(data => {
          self.loading = false;
          self.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
          self.gotoBack();
        })
        .catch(error => {
          self.loading = false;
        });
    },

    /*返回上一页面*/
    gotoBack(){
      this.$router.back(-1);
    }

  }
};
</script>

<style lang="scss">
// @import '@/styles/page/diy.scss';
</style>
