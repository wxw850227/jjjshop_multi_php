<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="points-top theme-bg d-b-c">
			<image class="bg-points" src="/static/bg-points.png" mode=""></image>
			<view class="d-c d-c-c pr ww100 hh100">
				<text class="f28 mb30">{{points_name()}}</text>
				<text class="f72 fb">{{points}}</text>
			</view>
		</view>
		<!--列表-->

		<view class="p-0-30 bg-white">
			<view class="d-b-c border-b p-30-0" v-for="(item, index) in tableData" :key="index">
				<view class="d-s-s f-w d-c flex-1">
					<text class="f28">{{points_name(item.describe)}}</text>
					<text class="pt10 gray9 20">{{item.create_time}}</text>
				</view>
				<view class="red f28" v-if="item.value>0">+{{item.value}}</view>
				<view class="red f28" v-else>{{item.value}}</view>
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="tableData.length==0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				isPop: false,
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*顶部刷新*/
				topRefresh: false,
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*数据列表*/
				tableData: [],
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 20,
				no_more: false,
				loading: true,
				points: 0,
				is_open: false,
				discount_ratio:'0',
				is_trans_balance:false
			};
		},
		computed: {

			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.tableData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.points_name()
			});
		},
		mounted() {
			/*获取数据*/
			this.getData();
		},
		onReachBottom() {
			let self = this;
			if (self.page < self.last_page) {
				self.page++;
				self.getData();
			}
			self.no_more = true;

		},
		methods: {
			closePop(e) {
				if(e!=null){
					this.page = 1;
					this.tableData = [];
					this.getData();
				}
				this.isPop = false;
			},
			/*获取数据*/
			getData() {
				let self = this;
				let page = self.page;
				let list_rows = self.list_rows;
				self._get('points.log/index', {
					page: page || 1,
					list_rows: list_rows,
				}, function(data) {
					self.loading = false;
					self.points = data.data.points;
					self.discount_ratio = data.data.discount_ratio;
					self.is_open = data.data.is_open;
					self.tableData = self.tableData.concat(data.data.list.data);
					self.last_page = data.data.list.last_page;
					if (data.data.list.last_page <= 1) {
						self.no_more = true;
						return false;
					}

				});
			},
			/*跳转积分商城*/
			gotoShop() {
				this.gotoPage('/pagesPlus/points/list/list');
			}
		}
	};
</script>

<style lang="scss">
	.points-top {
		box-sizing: border-box;
		height: 346rpx;
		padding: 0 30rpx;
		color: #FFFFFF;
		position: relative;
		z-index: 1;
		.bg-points{
			width: 750rpx;
			height: 346rpx;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.re-btn {
		height: 60rpx;
		line-height: 60rpx;
		width: 190rpx;
		padding: 0 8rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin-top: 46rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.right-btn{
		font-size: 28rpx;	
		font-weight: 500;
		color: #FFFFFF;
		position: absolute;
		right: 21rpx;
		top: 12rpx;
		background: none;
		border: none;
		padding: 0;
	}
</style>
