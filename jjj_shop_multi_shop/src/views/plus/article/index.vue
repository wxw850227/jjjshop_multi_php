<template>
  <div class="user">
    <div class="common-seach-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="文章管理" name="articles">
          <Articles v-if="activeName == 'articles'"></Articles>
        </el-tab-pane>
        <el-tab-pane label="分类管理" name="categorys">
          <Categorys v-if="activeName == 'categorys'"></Categorys>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from "vue";
import Articles from "./article/Index.vue";
import Categorys from "./category/Index.vue";
export default defineComponent({
  components: {
    Articles,
    Categorys,
  },
  setup() {
    const state = reactive({
      activeName: "articles",
      /*是否加载完成*/
      loading: true,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
