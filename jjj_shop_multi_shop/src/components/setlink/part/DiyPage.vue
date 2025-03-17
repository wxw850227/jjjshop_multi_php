<template>
	<el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="url"
		v-loading="loading">
		<el-option v-for="item in pages" :key="item.url" :label="item.name" :value="item"></el-option>
	</el-select>
</template>

<script>
import {
	getPageList
} from '@/api/link.js';
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
			let self = this;
			getPageList({}, true)
				.then(res => {
					self.loading = false;
					let list = [];
					for (let i = 0, length = res.data.list.length; i < length; i++) {
						let item = res.data.list[i];
						let url = 'pages/diy-page/diy-page?page_id=' + item.page_id;
						let LinkList = {
							url: url,
							name: item.page_name,
							type: '自定义页面'
						};
						list.push(LinkList);
					}
					self.pages = list;
					if (self.pages.length > 0) {
						self.activePage = self.pages[0];
						self.changeFunc(self.activePage);
					}
				})
				.catch(error => {
					self.loading = false;
				});
		},

		/*选中的值*/
		changeFunc(e) {
			this.$emit('changeData', e);
		}
	}
};
</script>

<style></style>