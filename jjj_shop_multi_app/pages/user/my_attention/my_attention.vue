<template>
	<view class="shop_body">
		<scroll-view scroll-y="true" :style="'height:' + scrollviewHigh + 'px;'" class="scroll-Y" lower-threshold="50"
			@scrolltolower="scrolltolowerFunc">
			<view class="shop_body_l_item" v-for="(item,index) in product_list" :key="index">
				<image :src="item.product_image" @click="goto_product(item.product_id)" />
				<view class="shop_body_l_item_info" @click="goto_product(item.product_id)">
					<view class="shop_body_l_item_info_title h1">{{item.product_name}}</view>
					<view class="shop_body_l_item_info_price">
						<view class="h2 red">¥<text class="h1">{{item.product_price}}</text></view>
						<view class="h4 huaxianjia">¥<text class="h3">{{item.line_price}}</text></view>
					</view>
					<view class="shop_body_l_item_info_others h3">
						<view class="shop_body_l_item_info_others_sales">累计销量：{{item.product_sales}}件</view>
					</view>
				</view>
				<button type="default" @click="guanzhu(item.product_id)">取消关注</button>
			</view>
			<view class="d-c-c p30" v-if="product_list.length==0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</scroll-view>
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
				/*底部加载*/
				loading: true,
				/*没有更多*/
				no_more: false,
				//页面高度
				scrollviewHigh: '',
				//商品列表
				product_list: [],
				//当前页
				page: 1,
				//总页数
				last_page: '',
				isfollow: '',
			}
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.product_list.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onShow() {
			this.init();
			this.getData();
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				self.page = 1;
				self.product_list = [];
				uni.getSystemInfo({
					success(res) {
						self.scrollviewHigh = res.windowHeight;
					}
				});
			},
			//获取数据
			getData() {
				let self = this;
				self.loading = true;
				self._post('user.Favorite/list', {
					page: self.page,
					type: 20,
					list_rows: 15,
				}, (res) => {
					self.loading = false;
					self.last_page = res.data.list.last_page;
					self.product_list = self.product_list.concat(res.data.list.data);
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
				})

			},
			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			},
			goto_product(e) {
				this.gotoPage('pages/product/detail/detail?product_id=' + e);
			},
			//关注商户/取消关注
			guanzhu(product_id) {
				let self = this;
				self.page = 1
				self.loading = true;
				self._post('user.Favorite/add', {
					pid: product_id,
					type: 20,
				}, (res) => {
					self.loading = false;
					self._post('user.Favorite/list', {
						page: self.page,
						type: 20,
						list_rows: 15,
					}, (res) => {
						self.product_list = res.data.list.data;

					})
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f2f2f2;
	}

	.h1 {
		font-size: 32rpx;
	}

	.h2 {
		font-size: 28rpx;
	}

	.h3 {
		font-size: 24rpx;
	}

	.h4 {
		font-size: 20rpx;
	}

	.h5 {
		font-size: 16rpx;
	}

	.h6 {
		font-size: 12rpx;
	}

	.red {
		color: #E2231A;
	}

	.huaxianjia {
		text-decoration: line-through;
		color: #585858;
		margin-left: 5rpx;
	}

	.shop_body {
		width: 100%;
		background-color: #f2f2f2;
	}

	.shop_body_l_item {
		width: 90%;
		height: 250rpx;
		margin: 0 auto;
		background-color: white;
		border-radius: 15rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
	}

	.shop_body_l_item image {
		width: 34.5%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.shop_body_l_item_info {
		width: 65.5%;
		height: 170rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.shop_body_l_item_info_title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
	}

	.shop_body_l_item_info_price {
		display: flex;
		align-items: flex-end;
	}

	.shop_body_l_item_info_price view {
		margin-right: 15rpx;
	}

	.shop_body_l_item_info_others {
		width: 100%;
		height: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.shop_body_l_item_info_others_activity {
		width: 150rpx;
		height: 30rpx;
		line-height: 30rpx;
		border: 1rpx #E22319 solid;
		border-radius: 30rpx;
		/* font-size: 16rpx; */
		color: #E22319;
		text-align: center;
		box-sizing: border-box;
	}

	.shop_body_l_item_info_others_sales {
		color: #585858;
	}

	.shop_body_l_item button {
		font-size: 24rpx;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0;
		background-image: linear-gradient(90deg, #F11E0B, #F77737);
		color: white;
		position: absolute;
		top: 165rpx;
		left: 530rpx;
		z-index: 999;
	}
</style>