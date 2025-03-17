<template>
	<div class="marketing-box">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="签到" name="signin"></el-tab-pane>
		</el-tabs>
		<el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="id">
			<el-option v-for="(item, index) in pages" :key="index" :label="item.name" :value="item"></el-option>
		</el-select>
	</div>
</template>

<script>
import {
	getList
} from '@/api/link.js';
export default {
	data() {
		return {
			/*tab切换选择中值*/
			activeTab: 'signin',
			/*页面数据*/
			pages: [],
			/*选中的值*/
			activePage: null,
			/*签到数据*/
			signinList: [{
				id: 0,
				url: 'pagesPlus/signin/signin',
				name: '签到',
				type: '营销'
			}],
			// 万能表单
			tableList: [],
			previewList: [{
				id: 0,
				url: 'pagesPlus/preview/list',
				name: '预告',
				type: '营销'
			}]
		};
	},
	watch: {
		activeTab: function(n, o) {
			let self = this;
			self.pages = [];
			if (n != o) {
				if (n == 'signin') {
					self.pages = self.signinList;
				} 
				self.autoSend();
			}
		}
	},
	created() {
		this.pages = this.signinList;
		this.autoSend();
	},
	methods: {

		/*自动发送*/
		autoSend() {
			if (this.pages.length > 0) {
				this.activePage = this.pages[0];
				this.changeFunc();
			}
		},

		/*选中的值*/
		changeFunc(e) {
			this.$emit('changeData', this.activePage);
		}
	}
};
</script>

<style></style>