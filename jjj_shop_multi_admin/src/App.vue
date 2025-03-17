<template>
	<el-config-provider :locale="locale">
		<!-- <PDFView pdfUrl="https://qn-cdn.jjjshop.net/20230406142606996.pdf" /> -->
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
	import zhCn from 'element-plus/lib/locale/lang/zh-cn';
	// import PDFView from "./components/pdfPreview.vue"
	export default defineComponent({
		components: {
			[ElConfigProvider.name]: ElConfigProvider,
			// PDFView
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
	@import './assets/font/iconfont.css';
	@import './assets/font/myIcon.css';

	* {
		margin: 0;
		padding: 0;
		font-size: 12px;
		//   color: #333;
	}
</style>