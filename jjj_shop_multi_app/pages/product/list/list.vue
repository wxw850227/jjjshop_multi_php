<template>
	<view>
		<view class="top-box">
			<view class="index-search-box index-search-box_re d-b-c" id="searchBox">
				<view class="index-search index-search_re t-c flex-1">
					<text class="icon iconfont icon-sousuo"></text>
					<input type="text" v-model="search" class="flex-1 ml10 f26 gray3" placeholder-class="f26 gray9"
					 placeholder="搜索商品" confirm-type="search" @confirm="searchFunc()" />
				</view>
			</view>
			<view class="inner-tab">
				<view :class="type_active==0?'item active':'item'" @click="tabTypeFunc(0)">
					<view class="box">综合</view>
				</view>
				<view :class="type_active==1?'item active':'item'" @click="tabTypeFunc(1)">
					<view class="box">销量</view>
				</view>
				<view :class="type_active==2?'item active':'item'" @click="tabTypeFunc(2)">
					<view class="box">
						<text>价格</text>
						<view class="arrows">
							<view :class="price_top&&type_active==2?'arrow active':'arrow'">
								<text class="icon iconfont icon-sanjiao2"></text>
							</view>
							<view :class="!price_top&&type_active==2?'arrow active':'arrow'">
								<text class="icon iconfont icon-sanjiao1"></text>
							</view>
						</view>
					</view>
				</view>
				<view class="item"  @click="select_type()">
					<view class="box" style="height: 100%;">
						<image style="width: 36rpx;height: 36rpx;" :src="isLieBiao == true?'/static/shop/liebiao.png':'/static/shop/tubiao.png'"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="prodcut-list-wrap">
			<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			 @scrolltolower="scrolltolowerFunc">
				<view :class="topRefresh?'top-refresh open':'top-refresh'">
					<view class="circle" v-for="(circle,n) in 3" :key="n"></view>
				</view>
				<view class="shop_body" v-if="isLieBiao ==true">
					<view class="shop_body_l_item" :class="index==listData.length-1?'noborder':''" v-for="(item,index) in listData"
					 :key="index" @click="gotoList(item.product_id)">
						<view>
							<image :src="item.product_image" mode=""></image>
						</view>
						<view class="shop_body_l_item_info">
							<view class="shop_body_l_item_info_title gray3 f32">{{item.product_name}}</view>
							<view class="d-b-c pb10">
								<view class="shop_body_l_item_info_price">
									<view class="f24 shop_red">¥<text class="f32 fb">{{item.product_price}}</text></view>
								</view>
								<view class="shop_body_l_item_info_others f22">
									<view class="shop_body_l_item_info_others_sales">累计成交：{{item.product_sales}}笔</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="shop_body2" v-if="isLieBiao ==false">
					<view class="shop_body_t_item" :class="index % 2 == 0?'ml20 mr20':' mr20'" v-for="(item,index) in listData" :key="index"
					 @click="gotoList(item.product_id)">
						<image :src="item.product_image" mode=""></image>
						<view class="shop_body_t_item_info">
							<view class="shop_body_t_item_info_title f26">{{item.product_name}}</view>
							<view class="shop_body_t_item_info_others f24 gray9 mt">
								<view class="shop_body_t_item_info_others_sales">累计成交：{{item.product_sales}}笔</view>
							</view>
							<view class="shop_body_t_item_info_price">
								<view class="f20 redF6">¥<text class="f32">{{item.product_price}}</text></view>
							</view>

						</view>
					</view>
				</view>
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="listData.length==0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</scroll-view>
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
				isLieBiao: true,
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*顶部刷新*/
				topRefresh: false,
				/*底部加载*/
				loading: true,
				/*没有更多*/
				no_more: false,
				/*类别选中*/
				type_active: 0,
				/*价格选中*/
				price_top: false,
				/*商品列表*/
				listData: [],
				/*当前页面*/
				page: 1,
				category_id: 0,
				search: '',
				sortType: '',
				sortPrice: 0,
				list_rows: 10,
				last_page: 0,
			};
		},
		computed: {

			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.listData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onLoad(e) {
			/*分类id*/
			this.category_id = e.category_id;
			if (e.search) {
				this.search = e.search;
			}
			if (e.sortType) {
				this.sortType = e.sortType;
			}
			if (e.sortPrice) {
				this.sortPrice = e.sortPrice;
			}
		},
		mounted() {
			this.init();
			/*获取产品列表*/
			this.getData();
		},
		onPullDownRefresh() {
			/*下拉到顶，页面值还原初始化*/
			this.restoreData();
			this.getData();
		},
		methods: {
			searchFunc() {
				this.listData = [];
				this.page = 1;
				/*获取产品列表*/
				this.getData();
			},
			/*初始化*/
			init() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-box');
						view.boundingClientRect(data => {
							let h = _this.phoneHeight - data.height;
							_this.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			/*还原初始化*/
			restoreData() {
				this.listData = [];
				this.category_id = 0;
				this.search = '';
				this.sortType = '';
				this.sortPrice = 0;
			},
			/*类别切换*/
			tabTypeFunc(e) {
				let self = this;
				self.listData = [];
				self.page = 1;
				self.no_more = false;
				self.loading = true;
				if (e == 2) {
					self.price_top = !this.price_top;
					if (self.price_top == true) {
						self.sortPrice = 0;
					} else {
						self.sortPrice = 1;
					}
					self.sortType = 'price';
				} else if (e == 1) {
					self.price_top = !this.price_top;
					self.sortType = 'sales';
				}
				self.type_active = e;
				console.log(self.type_active)
				self.getData();
			},

			/*获取数据*/
			getData() {
				let self = this;
				let page = self.page;
				let list_rows = self.list_rows;
				let category_id = self.category_id;
				let search = self.search;
				let sortType = self.sortType;
				let sortPrice = self.sortPrice;
				self.loading = true;
				self._get('product.product/lists', {
					page: page || 1,
					category_id: category_id,
					search: search,
					sortType: sortType,
					sortPrice: sortPrice,
					list_rows: list_rows,
				}, function(res) {
					self.loading = false;
					self.listData = self.listData.concat(res.data.list.data);
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					}
				});
			},

			/*跳转产品列表*/
			gotoList(e) {
				let url = 'pages/product/detail/detail?product_id=' + e
				this.gotoPage(url);
			},

			/*跳转搜索页面*/
			gotoSearch() {
				self.gotoPage('/pages/product/search/search');
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				self.bottomRefresh = true;
				self.page++;
				self.loading = true;
				if (self.page > self.last_page) {
					self.loading = false;
					self.no_more = true;
					return;
				}
				self.getData();
			},
			//选择图标模式或者列表模式    true 为列表模式  false 为图表模式
			select_type() {
				let self = this;
				self.isLieBiao = !self.isLieBiao
			},
			/** 设置分享内容*/
			onShareAppMessage() {
				// 构建分享参数
				return {
					title: "全部分类",
					path: "/pages/product/category?" + this.getShareUrlParams()
				};
			},
		}
	};
</script>

<style lang="scss" scoped>
	.inner-tab {
		position: relative;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// border-bottom: 16rpx solid #F2F2F2;
		background: #ffffff;
		z-index: 9;
	}

	.inner-tab .item {
		flex: 1;
		height: 100%;
		line-height: 90rpx;
		position: relative;
		color: #999;
		font-size: 32rpx;
	}

	.inner-tab .item.active,
	.inner-tab .item .arrow.active .iconfont {
		color: #333333;
		font-weight: bold;
	}

	.item.active::after {
		content: '';
		width: 72rpx;
		height: 4rpx;
		background: #EE1414;
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
		padding-top: 20rpx;
	}

	.prodcut-list-wrap .list {
		background: #FFFFFF;
	}

	.prodcut-list-wrap .list .item {
		padding: 20rpx;
		display: flex;
		border-bottom: 1rpx solid #f6f6f6;
	}

	.prodcut-list-wrap .product-cover,
	.prodcut-list-wrap .product-cover image {
		width: 150rpx;
		height: 150rpx;
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
		line-height: 36rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 26rpx;
	}

	.prodcut-list-wrap .already-sale {
		// margin-top: 20rpx;
		color: #999;
		font-size: 22rpx;
	}

	.prodcut-list-wrap .already-sale>text {
		padding: 6rpx 10rpx;
		// background-color: #f2f2f7;
	}

	.prodcut-list-wrap .price {
		color: $dominant-color;
		font-size: 24rpx;
	}

	.prodcut-list-wrap .price .num {
		margin-left: 6rpx;
		padding: 0 4rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.inner-tab .item .box {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.shop_body {
		width: 100%;
		background-color: #ffffff;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
	}

	.shop_body_l_item {
		// width: 90%;
		// height: 250rpx;
		margin: 0 auto;
		background-color: white;
		// border-radius: 15rpx;
		// margin-top: 20rpx;
		display: flex;
		padding: 40rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #D9D9D9;

	}

	.shop_body_l_item image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 12rpx;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.shop_body_l_item_info {
		// width: 70%;
		// height: 100%;
		flex: 1;
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
		// width: 100%;
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
		color: #333333;
	}

	.shop_body2 {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		background-color: #f2f2f2;
	}

	.shop_body_t_item {
		width: 345rpx;
		// margin: 0 2.5%;
		margin-bottom: 20rpx;
		height: 520rpx;
		overflow: hidden;
		background-color: white;
		border-radius: 12rpx;
	}

	.collect text {
		color: #FFFFFF;
	}

	.shop_body_t_item image {
		width: 100%;
		height: 337.5rpx;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.shop_body_t_item_info {
		// height: 182.5rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.shop_body_t_item_info_title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		margin-bottom: 30rpx;
	}

	.shop_body_t_item_info_price {
		display: flex;
		align-items: flex-end;

	}

	.shop_body_t_item_info_others {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}

	.shop_body_t_item_info_others_activity {}

	.shop_body_t_item_info_others_sales {
		color: #999999;
	}

	.huaxianjia {
		text-decoration: line-through;
		color: #999;
		margin-left: 5rpx;
	}

	.shop_red {
		color: #F6220C;
	}

	.inner-tab .item .icon-sanjiao2 {
		font-size: 13rpx;
	}

	.inner-tab .item .icon-sanjiao1 {
		font-size: 13rpx;
	}

	.noborder {
		border: none;
	}
</style>
