<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<!-- #ifdef APP-PLUS -->
		<header-bar></header-bar>
		<!-- #endif -->
		<view class="top-box">
			<view class="index-search-box index-search-box_re d-b-c" id="searchBox">
				<view class="index-search index-search_re t-c flex-1">
					<text class="icon iconfont icon-sousuo"></text>
					<input
						type="text"
						v-model="searchtxt"
						class="flex-1 ml10 f30 gray3"
						
						placeholder-class="f24 gray6"
						placeholder="搜索商户"
						confirm-type="search"
						@confirm="search()"
					/>
				</view>
			</view>
			<view class="inner-tab">
				<view :class="type_active == 'all' ? 'item active' : 'item'" @click="tabTypeFunc('all')"><view class="box">综合</view></view>
				<view :class="type_active == 'sales' ? 'item active' : 'item'" @click="tabTypeFunc('sales')"><view class="box">销量</view></view>
				<view :class="type_active == 'score' ? 'item active' : 'item'" @click="tabTypeFunc('score')">
					<view class="box"><text>评分</text></view>
				</view>
			</view>
		</view>
		<view class="prodcut-list-wrap">
			<scroll-view
				scroll-y="true"
				class="scroll-Y"
				:style="'height:' + scrollviewHigh + 'px;'"
				lower-threshold="50"
				:refresher-triggered="triggered"
				@scrolltolower="scrolltolowerFunc"
				refresher-enabled="true"
				@refresherrefresh="onRefresh"
				@refresherrestore="onRestore"
			>
				<view class="shop_list_body">
					<view class="shop_list_body_item" v-for="(item, index) in shopData" :key="index">
						<view class="shop_list_body_item_shop" @click="goto_shop(item.shop_supplier_id)">
							<view class="shop_list_body_item_shop_logo"><image :src="item.logos"></image></view>
							<view class="shop_list_body_item_shop_info">
								<view class="h1 title">{{ item.name }}</view>
								<view class="h3 brand">主营品牌：{{ item.category_name }}</view>
								<view class="h3 sales">
									销量{{ item.product_sales }}件
									<text class="ml10 mr10">|</text>
									{{ item.fav_count }}人关注
								</view>
							</view>
							<view class="shop_list_body_item_shop_others">
								<view class="f26 gray3 collect">商户评分</view>
								<view>
									<text class="redEe f32 fb">{{ item.server_score }}</text>
								</view>
							</view>
						</view>
						<view v-if="item.productList.length > 0" :class="item.productList.length < 3 ? 'shop_list_body_item_product2' : 'shop_list_body_item_product'">
							<view class="shop_list_body_item_product_item" v-for="(pitem, index2) in item.productList" :key="index2" @click="goto_product(pitem.product_id)">
								<view><image :src="pitem.image[0].file_path"></image></view>
								<view class="shop_list_body_item_product_item_price">
									<view class="f22 red">
										¥
										<text class="f32">{{ pitem.product_price }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="shopData.length == 0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</scroll-view>
		</view>
		<tabBar></tabBar>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			triggered: true,
			/*手机高度*/
			phoneHeight: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			/*状态选中*/
			state_active: -1,
			no_more: false,
			loading: true,
			/*最后一页码数*/
			last_page: 0,
			/*当前页面*/
			page: 1,
			/*每页条数*/
			list_rows: 10,
			/*顶部刷新*/
			topRefresh: false,
			/*类别选中*/
			type_active: 'all',
			/*价格选中*/
			price_top: false,
			/*商户列表*/
			shopData: [],
			/*当前页面*/
			searchtxt: '',
			keyWord: '',
			stateTab: false
		};
	},
	computed: {
		/*加载中状态*/
		loadingType() {
			if (this.loading) {
				return 1;
			} else {
				if (this.shopData.length != 0 && this.no_more) {
					return 2;
				} else {
					return 0;
				}
			}
		}
	},
	onShow() {
		this.getTabBarLinks();
	},
	mounted() {
		this.init();
		this._freshing = false;
		this.restoreData();
		/*获取订单列表*/
		this.getData();
	},
	methods: {
		/*初始化*/
		init() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					self.phoneHeight = res.windowHeight;
					// 计算组件的高度
					let view = uni
						.createSelectorQuery()
						.in(self)
						.select('.top-box');
					view.boundingClientRect(data => {
						console.log(data);
						let h = self.phoneHeight - data.height;
						self.scrollviewHigh = h;
					}).exec();
				}
			});
		},
		/*还原初始化*/
		restoreData() {
			this.shopData = [];
			this.page = 1;
			this.no_more = false;
			this.loading = true;
			this.category_id = 0;
			this.searchtxt = '';
			this.sortType = '';
			this.sortPrice = 0;
		},
		/*类别切换*/
		tabTypeFunc(e) {
			let self = this;
			self.shopData = [];
			self.page = 1;
			self.no_more = false;
			self.loading = true;
			self.type_active = e;
			self.getData();
		},

		/*获取数据*/
		getData() {
			let self = this;
			let page = self.page;
			let list_rows = self.list_rows;
			self.loading = true;
			self._post(
				'supplier.index/list',
				{
					page: page || 1,
					list_rows: list_rows,
					sortType: self.type_active,
					name: self.keyWord
				},
				res => {
					self.loading = false;
					self.last_page = res.data.list.last_page;
					self.shopData = self.shopData.concat(res.data.list.data);
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
				}
			);
		},
		onRefresh() {
			if (this._freshing) return;
			this._freshing = true;
			this.restoreData();
			this.getData();
			setTimeout(() => {
				this.triggered = false;
				this._freshing = false;
			}, 2000);
		},
		onRestore() {
			this.triggered = 'restore'; // 需要重置
		},
		/*搜索*/
		search() {
			let self = this;
			self.keyWord = self.searchtxt;
			self.restoreData();
			self.getData();
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

		//跳转商户首页
		goto_shop(shop_supplier_id) {
			this.gotoPage('/pages/shop/shop?shop_supplier_id=' + shop_supplier_id);
		},
		//跳转商品页面
		goto_product(product_id) {
			this.gotoPage('/pages/product/detail/detail?product_id=' + product_id);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}

.foot_ {
	height: 98rpx;
	width: 100%;
}

.seacth {
	width: 750rpx;
	height: 110rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.seacth input {
	width: 675rpx;
	height: 70rpx;
	border: 1px #d7d7d7 solid;
	border-radius: 20rpx;
	background-color: white;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	font-size: 24rpx !important;
}

.seacth input::before {
	margin-right: 10rpx;
	font-size: 24rpx !important;
}

.inner-tab {
	position: relative;
	height: 80rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: #ffffff;
	z-index: 9;
}

.inner-tab .item {
	flex: 1;
	font-size: 30rpx;
	height: 100%;
	line-height: 80rpx;
	position: relative;
	color: #666666;
	font-size: 30rpx;
}

.inner-tab .item.active,
.inner-tab .item .arrow.active .iconfont {
	color: #333333;
}

.inner-tab .item.active::after {
	content: '';
	width: 72rpx;
	height: 4rpx;
	@include background_color('background_color');
	border-radius: 2rpx;
	position: absolute;
	bottom: 14rpx;
	left: 0;
	right: 0;
	margin: auto;
}

.inner-tab .item .box {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.inner-tab .item .arrows {
	margin-left: 10rpx;
	line-height: 0;
}

.inner-tab .item .iconfont {
	line-height: 24rpx;
	font-size: 24rpx;
}

.inner-tab .item .arrow,
.inner-tab .item .svg-icon {
	width: 20rpx;
	height: 20rpx;
}

.prodcut-list-wrap {
	// padding-bottom: 98rpx;
}

.prodcut-list-wrap .list {
	background: #ffffff;
}

.prodcut-list-wrap .list .item {
	padding: 20rpx;
	display: flex;
	border-bottom: 16rpx solid #f6f6f6;
}

.prodcut-list-wrap .product-cover,
.prodcut-list-wrap .product-cover image {
	width: 220rpx;
	height: 220rpx;
}

.prodcut-list-wrap .product-info {
	flex: 1;
	margin-left: 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.prodcut-list-wrap .product-title {
	display: -webkit-box;
	line-height: 40rpx;
	height: 80rpx;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	font-size: 32rpx;
}

.prodcut-list-wrap .already-sale {
	margin-top: 20rpx;
	color: #999;
	font-size: 24rpx;
}

.prodcut-list-wrap .already-sale > text {
	padding: 6rpx 10rpx;
	background-color: #f2f2f7;
}

.prodcut-list-wrap .price {
	@include font_color('price_color');
	font-size: 24rpx;
}

.prodcut-list-wrap .price .num {
	margin-left: 6rpx;
	padding: 0 4rpx;
	font-size: 40rpx;
}

// *********************
// *********************
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

.huaxianjia {
	text-decoration: line-through;
	color: #585858;
	margin-left: 4rpx;
}

.shop_list_body {
	width: 100%;
	// padding: 20rpx;
	box-sizing: border-box;
}

.shop_list_body_item {
	display: flex;
	width: 100%;
	max-height: 470rpx;
	margin-top: 30rpx;
	flex-direction: column;
	background-color: white;
	// border-radius: 20rpx;
	padding: 20rpx;
	// border-bottom: 2rpx #e8e8e8 solid;
	box-sizing: border-box;
}

.shop_list_body_item_shop {
	width: 100%;
	height: 150rpx;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.shop_list_body_item_shop_logo {
	width: 150rpx;
	height: 150rpx;
}

.shop_list_body_item_shop_logo image {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 15rpx;
}

.shop_list_body_item_shop_info {
	padding: 10rpx;
	padding-left: 20rpx;
	box-sizing: border-box;
	padding-top: 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	flex: 1;
}

.shop_list_body_item_shop_others {
	padding: 10rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	text-align: right;
	padding-top: 0;
	font-size: 26rpx;
	color: #333333;
}

.shop_list_body_item_product {
	width: 100%;
	height: 280rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	// background-color: #f2f2f2;
	padding: 10rpx;
	box-sizing: border-box;
	// border-radius: 15rpx;
}

.shop_list_body_item_product2 {
	width: 100%;
	height: 280rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	// background-color: #f2f2f2;
	padding: 10rpx;
	box-sizing: border-box;
	border-radius: 15rpx;
}

.shop_list_body_item_product2 .shop_list_body_item_product_item {
	margin: 0 10rpx;
}

.shop_list_body_item_product_item {
	width: 30%;
	background-color: white;
	// border-radius: 10rpx;
	overflow: hidden;
}

.shop_list_body_item_product_item image {
	width: 210rpx;
	height: 180rpx;
	border-radius: 12rpx;
	background-color: rgba(0, 0, 0, 0.1);
}

.shop_list_body_item_product_item view {
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.shop_list_body_item_product_item_price {
	padding: 15rpx;
	display: flex;
	align-items: baseline;
	justify-content: center;
	font-size: 32rpx;
}

.brand {
	position: relative;
	color: #585858;
}

.sales {
	color: #585858;
}

.collect {
	margin-bottom: 26rpx;
}
</style>
