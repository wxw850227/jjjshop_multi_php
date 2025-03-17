<template>
	<el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="url">
		<el-option v-for="item in pages" :key="item.url" :value-key="item.name" :label="item.name"
			:value="item"></el-option>
	</el-select>
</template>

<script>
export default {
	data() {
		return {
			/*页面数据*/
			pages: [{
				url: 'pages/index/index',
				name: '首页',
				type: '页面'
			},
			{
				url: 'pages/product/category',
				name: '分类',
				type: '页面'
			},
			{
				url: 'pages/article/list/list',
				name: '文章首页',
				type: '页面',
			},
			{
				url: 'pages/shop/shop_list',
				name: '商户',
				type: '页面',
			},
			{
				url: 'pages/cart/cart',
				name: '购物车',
				type: '页面',
			},
			{
				url: 'pages/user/index/index',
				name: '我的',
				type: '页面',
			}
			],
			/*选中的值*/
			activePage: '首页'
		};
	},
	created() {
		/*初始化*/
		this.changeFunc(this.pages[0]);
	},
	methods: {
		/*选中的值*/
		changeFunc(e) {
			this.$emit('changeData', e);
		}
	}
};
</script>

<style>
</style>