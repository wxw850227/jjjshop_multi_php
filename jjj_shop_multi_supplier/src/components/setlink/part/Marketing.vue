<template>
	<div class="marketing-box">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="签到" name="signin"></el-tab-pane>
			<el-tab-pane label="积分商城" name="points"></el-tab-pane>
			<el-tab-pane label="预售" name="presale"></el-tab-pane>
			<el-tab-pane label="秒杀" name="seckill"></el-tab-pane>
			<el-tab-pane label="拼团" name="assemble"></el-tab-pane>
			<el-tab-pane label="砍价" name="bargain"></el-tab-pane>
			<el-tab-pane label="预告" name="preview"></el-tab-pane>
			<el-tab-pane label="领券中心" name="coupon"></el-tab-pane>
			<el-tab-pane label="幸运转盘" name="lottery"></el-tab-pane>
			<el-tab-pane label="万能表单" name="table"></el-tab-pane>
		</el-tabs>
		<el-select v-model="activePage" placeholder="请选择" class="percent-w100" @change="changeFunc" value-key="id">
			<el-option v-for="(item, index) in pages" :key="index" :label="item.name" :value="item"></el-option>
		</el-select>
	</div>
</template>

<script>
// import {
// 	getList
// } from '@/api/link.js';
export default {
	data() {
		return {
			/*tab切换选择中值*/
			activeTab: 'signin',
			/*页面数据*/
			pages: [],
			/*选中的值*/
			activePage: null,
			/*秒杀数据*/
			seckillList: [{
				id: 0,
				url: 'pages/plus/seckill/list/list',
				name: '秒杀',
				type: '营销'
			}],
			/*秒杀数据*/
			presaleList: [{
				id: 0,
				url: 'pages/plus/presale/list',
				name: '预售',
				type: '营销'
			}],
			/*签到数据*/
			signinList: [{
				id: 0,
				url: 'pages/plus/signin/signin',
				name: '签到',
				type: '营销'
			}],
			/*积分商城数据*/
			pointsList: [{
				id: 0,
				url: 'pages/plus/points/list/list',
				name: '积分商城',
				type: '营销'
			}],
			/*拼团*/
			assembleList: [{
				id: 0,
				url: 'pages/plus/assemble/list/list',
				name: '拼团',
				type: '营销'
			}],
			/*砍价*/
			bargainList: [{
				id: 0,
				url: 'pages/plus/bargain/list/list',
				name: '砍价',
				type: '营销'
			}],
			/*领券中心*/
			couponList: [{
				id: 0,
				url: 'pages/coupon/coupon',
				name: '领券中心',
				type: '营销'
			}],
			/*幸运转盘*/
			lotteryList: [{
				id: 0,
				url: 'pages/plus/lottery/lottery',
				name: '幸运转盘',
				type: '营销'
			}],
			// 万能表单
			tableList: [],
			previewList: [{
				id: 0,
				url: 'pages/plus/preview/list',
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
				} else if (n == 'points') {
					self.pages = self.pointsList;
				} else if (n == 'presale') {
					self.pages = self.presaleList;
				} else if (n == 'seckill') {
					self.pages = self.seckillList;
				} else if (n == 'assemble') {
					self.pages = self.assembleList;
				} else if (n == 'bargain') {
					self.pages = self.bargainList;
				} else if (n == 'coupon') {
					self.pages = self.couponList;
				} else if (n == 'lottery') {
					self.pages = self.lotteryList;
				} else if (n == 'table') {
					self.pages = self.tableList;
				} else if (n == 'preview') {
					self.pages = self.previewList;
				}
				self.autoSend();
			}
		}
	},
	created() {
		this.pages = this.signinList;
		this.getData();
		this.autoSend();
	},
	methods: {
		/*获取数据*/
		getData() {
			/* let self = this;
			getList({
				activeName: self.activeTab
			},
			true
			)
				.then(res => {
					self.tableList = res.data.tableList;
				})
				.catch(error => {}); */
		},

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