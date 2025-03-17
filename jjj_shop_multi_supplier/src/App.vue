<template>
	<el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>
<script>
import {
	reactive,
	toRefs,
	defineComponent
} from 'vue';
import {
	ElConfigProvider
} from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
	components: {
		[ElConfigProvider.name]: ElConfigProvider,
	},
	setup() {
		let locale = zhCn;
		const state = reactive({});
		return {
			...toRefs(state),
			locale,
		};
	}
});
</script>
<style lang="scss">
	@import '@/assets/font/iconfont.css';
	@import '@/assets/font/myIcon.css';

	* {
		margin: 0;
		padding: 0;
		font-size: 12px;
		//   color: #333;
	}
</style>