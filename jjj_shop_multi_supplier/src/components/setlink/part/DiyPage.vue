<template>
	<el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="url"
		v-loading="loading">
		<el-option v-for="item in pages" :key="item.url" :label="item.name" :value="item"></el-option>
	</el-select>
</template>

<script>
export default {
	data() {
		return {
			/*是否正在加载*/
			loading: true,
			/*页面数据*/
			pages: [],
			/*选中的值*/
			activePage: {}
		};
	},
	created() {
		this.getData();
	},
	methods: {

		/*获取自定义页面*/
		getData() {
			
		},

		/*选中的值*/
		changeFunc(e) {
			this.$emit('changeData', e);
		}
	}
};
</script>

<style></style>