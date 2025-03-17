<template>
  <template v-for="(v,index) in data" :key="index">
    <span class="tag" :class="{ acitve: v.value == acitve }" @click="clickTag(v)">
      {{ v.label }}
    </span>
  </template>
</template>
<script>
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  components: {},
  props:{
    data: Array,
    acitve: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      // acitve: props.acitve,
    })
    const clickTag = (v)=>{
      state.acitve = v.value;
      emit('update:acitve', v.value)
      emit('change', v.value)
    }
    return {
      ...toRefs(state),
      clickTag,
    };
  },
  methods: {
  }
})
</script>
<style scoped lang="scss">
.tag{
  color: #333;
  padding: 0 6px;
  height: 20px;
  line-height: 20px;
  margin-right: 12px;
  cursor: pointer;
  &.acitve{
    background-color: var(--el-color-primary);
    color: #fff;
  }
}
</style>
