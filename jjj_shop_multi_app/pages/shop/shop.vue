<template>
	<view>
		<view class="shop_head">
			<image class="bg_topimg" src="../../static/background_top.png" mode=""></image>
			<!-- #ifdef MP-WEIXIN || APP-PLUS -->
			<view class="sticky-top">
				<image class="bg_topimg" src="../../static/background_top.png" mode=""></image>
				<view class="ww100" :style="'height:' + topBarTop() + 'px;'"></view>
				<view class="tc  head_top" :style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;'">
					<view class="reg180" @click="goback"><text class="icon iconfont icon-jiantou"></text></view>
					<view class="">商家商户</view>
				</view>
			</view>
			<!-- #endif -->
			<view class="shop_head_info">
				<view class="shop_list_body_item_shop">
					<view class="shop_list_body_item_shop_logo"><image :src="shop_info.logos" mode=""></image></view>
					<view class="shop_list_body_item_shop_info">
						<view class="h1 white fb title">{{ shop_info.store_name || '' }}</view>
						<view class="f26 white brand">主营品牌：{{ shop_info.category_name || '' }}</view>
						<view class="d-s-c">
							<view class="f22 white sales">销量:{{ shop_info.product_sales || 0 }}件</view>
							<view class="f22 white ml30 collect" style="text-align: center;">
								关注:
								<text>{{ shop_info.fav_count || 0 }}</text>
							</view>
						</view>
					</view>
					<view class="shop_list_body_item_shop_others">
						<view class="f24 white collect mb30">
							商户评分：
							<text>{{ shop_info.server_score || 0 }}</text>
						</view>
						<view v-if="isfollow == 0" class="collect_btn" @click="guanzhu()">关注</view>
						<view v-if="isfollow == 1" class="collected" @click="guanzhu()">已关注</view>
					</view>
				</view>
			</view>
			<view class="shop_head_banner" v-if="adList != '' && nav_type == 0">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper-item" v-for="(item, index) in adList" :key="index"><image :src="item.image && item.image.file_path" mode=""></image></swiper-item>
				</swiper>
			</view>
			<!-- 优惠券 -->
			<view class="coupon" v-if="listData.length >= 1 && nav_type == 2">
				<view class="diy-coupon">
					<view class=" mt20 mb20" v-for="(item, index) in listData" :key="index">
						<view class="coupon-item" :class="'bg-' + item.color.text">
							<view class="side-line left-side-line"><text class="round" v-for="(round, num) in 8" :key="num"></text></view>
							<view class="side-line right-side-line"><text class="round" v-for="(round, num) in 8" :key="num"></text></view>
							<view class="left-type d-c-c">{{ item.coupon_type.text }}</view>
							<view class="center-content pr">
								<view class="content-top">
									<template v-if="item.coupon_type.value == 10">
										<text class="f50 fb">减{{ item.reduce_price * 1 }}元</text>
										<template v-if="item.total_num >= 0">
											<text class="ml10">仅剩{{ item.total_num * 1 - item.receive_num * 1 }}张</text>
										</template>
										<template v-else>
											<text class="ml10">不限数量</text>
										</template>
									</template>
									<template v-if="item.coupon_type.value == 20">
										<text class="f50 fb">{{ item.discount }}</text>
										<text>折</text>
									</template>
								</view>
								<view class="content-bottom">
									<text class="f24">{{ item.min_price > 0 ? '满￥' + item.min_price * 1 + '元可用' : '无门槛' }}</text>
								</view>
								<view class="content-datatime">
									<template v-if="item.expire_type == 20">
										有效期：{{ item.start_time.text }} 至 {{ item.end_time.text }}
									</template>
									<template v-if="item.expire_type == 10">
										有效期：领取后{{ item.expire_day }}天有效
									</template>
								</view>
							</view>
							<!--领取-->
							<view v-if="item.is_get == 0" class="right-receive d-c-c" @click="receiveCoupon(index)">立即领取</view>
							<view v-else class="right-receive d-c-c">已领取</view>
						</view>
						<view class="range_item d-b-c" v-if="item.apply_range == 20" @click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + item.coupon_id)">
							<view>限购商户部分商品</view>
							<view><text class="icon iconfont icon-jiantou" style="color: #999999; font-size: 24rpx;"></text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 优惠券 -->
			<!-- 商品导航栏 -->
			<view class="inner-tab" v-if="nav_type == 0">
				<view :class="type_active == 'all' ? 'item active' : 'item'" @click="tabTypeFunc('all')"><view class="box">综合</view></view>
				<view :class="type_active == 'sales' ? 'item active' : 'item'" @click="tabTypeFunc('sales')"><view class="box">销量</view></view>
				<view :class="type_active == 'price' ? 'item active' : 'item'" @click="tabTypeFunc('price')">
					<view class="box"><text>价格</text></view>
				</view>
				<view class="item" @click="select_type()">
					<view class="box"><image :src="isLieBiao == true ? '/static/shop/liebiao.png' : '/static/shop/tubiao.png'"></image></view>
				</view>
			</view>
			<!-- 商品导航栏 -->
		</view>
		<scroll-view
			v-if="nav_type != 2"
			scroll-y="true"
			:style="'height:' + scrollviewHigh + 'rpx;'"
			class="scroll-Y pr bg-f2"
			lower-threshold="50"
			@scrolltolower="scrolltolowerFunc"
		>
			<view class="shop" v-if="shop_info != ''">
				<view class="shop_body" v-if="isLieBiao == true && nav_type == 0">
					<view
						class="shop_body_l_item"
						:class="index == listData.length - 1 ? 'noborder' : ''"
						v-for="(item, index) in product_list"
						:key="index"
						@click="goto_product(item.product_id)"
					>
						<view><image :src="item.product_image" mode=""></image></view>
						<view class="shop_body_l_item_info">
							<view class="shop_body_l_item_info_title gray3 f32">{{ item.product_name }}</view>
							<view class="d-b-c pb10">
								<view class="shop_body_l_item_info_price">
									<view class="f24 shop_red">
										¥
										<text class="f32 fb">{{ item.product_price }}</text>
									</view>
									<!-- <view class="h4 huaxianjia">¥<text class="h3">{{item.line_price}}</text></view> -->
								</view>
								<view class="shop_body_l_item_info_others f22">
									<view class="shop_body_l_item_info_others_sales">累计成交：{{ item.product_sales }}笔</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="shop_body2" v-if="isLieBiao == false && nav_type == 0">
					<view class="shop_body_t_item" v-for="(item, index) in product_list" :key="index" @click="goto_product(item.product_id)">
						<image :src="item.product_image" mode=""></image>
						<view class="shop_body_t_item_info">
							<view class="shop_body_t_item_info_title h1">{{ item.product_name }}</view>
							<view class="shop_body_t_item_info_price">
								<view class="f24 redF6">
									¥
									<text class="h1">{{ item.product_price }}</text>
								</view>
								<view class="f24 huaxianjia">
									¥
									<text class="h3">{{ item.line_price }}</text>
								</view>
							</view>
							<view class="shop_body_t_item_info_others h3">
								<view class="shop_body_t_item_info_others_sales">累计成交：{{ item.product_sales }}笔</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 直播 -->
				<view v-if="nav_type == 1">
					<view class="live_list" v-if="liveList.length > 0">
						<view v-for="(liveitem, liveindex) in liveList" :key="liveindex" class="live_item" @click="toRoom(liveitem)">
							<view v-if="liveitem.record_url != ''" class="record">可回放</view>
							<view v-if="liveitem.record_url == ''" class="record_off">回放生成中</view>
							<view class="live_img"><image :src="liveitem.share.file_path" mode=""></image></view>
						</view>
					</view>
					<view class="ww100" v-else><view class="f30 gray6 tc mt50 pt20">暂无直播间</view></view>
				</view>
				<!-- 客服 -->
				<view v-if="nav_type == 3">
					<view class="d-s-s d-c p20 mpservice-wrap" v-if="!isloding">
						<view class="noDatamodel" v-if="dataModel == null || (dataModel.qq == '' && dataModel.wechat == '' && dataModel.phone == '')">该商家尚未设置客服</view>
						<template v-if="dataModel != null">
							<view v-if="dataModel.qq != ''" class="d-b-c p-30-0 f34 ww100 border-b" @click="copyQQ(dataModel.qq)">
								<text class="gray9" style="width: 140rpx;"><text class="icon iconfont icon-qq"></text></text>
								<text class="p-0-30 flex-1">{{ dataModel.qq }}</text>
								<text class="blue">复制</text>
							</view>
							<view v-if="dataModel.wechat != ''" class="d-b-c p-30-0 f34 ww100 border-b" @click="copyQQ(dataModel.qq)">
								<text class="gray9" style="width: 140rpx;"><text class="icon iconfont icon-weixin"></text></text>
								<text class="p-0-30 flex-1">{{ dataModel.wechat }}</text>
								<text class="blue">复制</text>
							</view>
							<view v-if="dataModel.phone != ''" class="d-b-c p-30-0 f34 ww100" @click="callPhone(dataModel.phone)">
								<text class="gray9" style="width: 140rpx;"><text class="icon iconfont icon-002dianhua"></text></text>
								<text class="p-0-30 flex-1">{{ dataModel.phone }}</text>
								<text class="blue">拨打</text>
							</view>
						</template>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view v-if="nav_type == 0">
				<view class="d-c-c p30" v-if="product_list.length == 0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
				<view class="" style="width: 100%;height: 100rpx;"></view>
			</view>
		</scroll-view>
		<!-- 底部导航 -->
		<view class="d-a-c nav_bottom">
			<view :class="nav_type == 0 ? 'active' : ''" @click="nav_type = 0">
				<view class="icon iconfont icon-Homehomepagemenu"></view>
				<view>首页</view>
			</view>
			<view :class="nav_type == 2 ? 'active' : ''" @click="nav_type = 2">
				<view class="icon iconfont icon-quan"></view>
				<view>优惠券</view>
			</view>
			<view v-if="service_open" :class="nav_type == 3 ? 'active' : ''" @click="toSevice">
				<view class="icon iconfont icon-kefu2"></view>
				<view>客服</view>
			</view>
		</view>
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
			isLieBiao: true,
			shop_info: '', //商户信息
			product_list: '', //商品列表
			adList: '', //banner列表
			dataList: '',
			shop_supplier_id: '', //商户ID
			isfollow: '', // 是否关注本店
			// ***********
			/*是否显示点*/
			indicatorDots: false,
			/*是否自动*/
			autoplay: true,
			/*切换时间*/
			interval: 5000,
			/*动画过渡时间*/
			duration: 1000,
			/*数据列表*/
			listData: [], //优惠券列表
			// ************
			/*顶部刷新*/
			topRefresh: false,
			/*底部加载*/
			loading: true,
			/*没有更多*/
			no_more: false,
			/*类别选中*/
			type_active: 'all',
			/*价格选中*/
			price_top: false,
			/*商户列表*/
			shopData: [],
			/*当前页面*/
			page: 1,
			search: '',
			last_page: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			nav_type: 0,
			is_open: 0,
			liveList: [],
			dataModel: {
				qq: '',
				wechat: '',
				phone: ''
			},
			service_type: 0,
			service_open: 1,
			statusBarHeight: 0,
			titleBarHeight: 0
		};
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
	onLoad(option) {
		let self = this;
		self.GetStatusBarHeight();
		self.shop_supplier_id = option.shop_supplier_id;
	},
	onShow() {},
	mounted() {
		this.getData();
		this.getProduct(this.type_active);
	},
	onPullDownRefresh() {
		/*下拉到顶，页面值还原初始化*/
		this.restoreData();
		this.getData();
		this.getProduct(this.type_active);
	},
	methods: {
		GetStatusBarHeight() {
			// #ifdef MP-WEIXIN
			let that = this;
			const SystemInfo = uni.getSystemInfoSync();
			let statusBarHeight = SystemInfo.statusBarHeight;
			this.statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
			this.titleBarHeight = uni.getMenuButtonBoundingClientRect().height;
			// #endif
			// #ifndef MP-WEIXIN
			const SystemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = SystemInfo.statusBarHeight;
			this.titleBarHeight = 30;
			// #endif
		},
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
						.select('.shop_head');
					view.boundingClientRect(data => {
						let h = self.phoneHeight * 2 - data.height * 2 - 100;
						self.scrollviewHigh = h;
						uni.hideLoading();
					}).exec();
				}
			});
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
			self.getProduct(self.type_active);
		},
		getProduct(e) {
			let self = this;
			let page = self.page;
			self.loading = true;
			self._get(
				'product.product/lists',
				{
					page: page || 1,
					sortType: 'price',
					sortPrice: 1,
					sortType: e,
					shop_supplier_id: self.shop_supplier_id
				},
				function(res) {
					self.loading = false;
					self.product_list = [...self.product_list, ...res.data.list.data];
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					}
				}
			);
		},
		/*还原初始化*/
		restoreData() {
			this.shopData = [];
			this.product_list = [];
			this.page = 1;
			this.category_id = 0;
			this.search = '';
			this.sortType = '';
			this.sortPrice = 0;
		},
		getservice() {
			let self = this;
			self.isloding = true;
			self._get(
				'index/mpService',
				{
					shop_supplier_id: self.shop_supplier_id
				},
				function(res) {
					self.dataModel = res.data.mp_service;
					self.isloding = false;
				}
			);
		},
		/*类别切换*/
		tabTypeFunc(e) {
			let self = this;
			if (e != self.type_active) {
				self.product_list = [];
				self.page = 1;
				self.no_more = false;
				self.loading = true;
				self.type_active = e;
				self.getProduct(e);
			}
		},

		//获取数据列表
		getData() {
			let self = this;
			self.loading = true;
			uni.showLoading({
				title: '加载中....'
			});
			self._post(
				'supplier.index/index',
				{
					shop_supplier_id: self.shop_supplier_id,
					visitcode: self.getVisitcode()
				},
				res => {
					self.loading = false;
					self.shop_info = res.data.detail;
					self.adList = res.data.adList;
					self.isfollow = res.data.detail.isfollow;
					self.listData = res.data.couponList;
					if (res.data.mp_service) {
						self.service_type = res.data.mp_service.service_type;
					} else {
						self.service_type = 10;
					}
					if (self.scrollviewHigh == 0) {
						setTimeout(function() {
							self.init();
						}, 2001);
					} else {
						uni.hideLoading();
					}
					self.getservice();
				}
			);
		},

		//选择图标模式或者列表模式    true 为列表模式  false 为图表模式
		select_type() {
			let self = this;
			self.isLieBiao = !self.isLieBiao;
		},
		//跳转商品页面
		goto_product(product_id) {
			this.gotoPage('/pages/product/detail/detail?product_id=' + product_id);
		},
		//关注商户/取消关注
		guanzhu() {
			let self = this;
			self._post(
				'user.Favorite/add',
				{
					pid: self.shop_supplier_id,
					type: 10
				},
				res => {
					if (self.isfollow == 0) {
						self.isfollow = 1;
					} else if (self.isfollow == 1) {
						self.isfollow = 0;
					}
				}
			);
		},
		/**
		 * 领取优惠券
		 */
		receiveCoupon: function(index) {
			let self = this;
			let item = self.listData[index];
			if (item.state.value == 0) {
				uni.showToast({
					title: '已抢光',
					icon: 'none'
				});
				return false;
			}
			self._post(
				'user.coupon/receive',
				{
					coupon_id: item.coupon_id
				},
				function(result) {
					uni.showToast({
						title: '领取成功',
						icon: 'success',
						mask: true,
						duration: 2000
					});
					item.state.value = 0;
					item.state.text = '已领取';
				}
			);
			self.getData(self.type_active);
		},
		/*复制*/
		copyQQ(message) {
			//#ifdef MP-WEIXIN
			uni.setClipboardData({
				//准备复制的数据
				data: message,
				success: function(res) {
					uni.showToast({
						title: '复制成功',
						icon: 'success',
						mask: true,
						duration: 2000
					});
				}
			});
			//#endif
			//#ifdef H5
			var input = document.createElement('input');
			input.value = message;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
			document.body.removeChild(input);
			uni.showToast({
				title: '复制成功',
				icon: 'success',
				mask: true,
				duration: 2000
			});
			//#endif
		},
		/*拨打电话*/
		callPhone(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			});
		},
		toRoom(item) {
			if (item.record_url != '') {
				this.gotoPage('/pagesLive/live/playback?room_id=' + item.room_id);
			} else {
				return false;
			}
		},
		toSevice() {
			if (this.service_type == 10 || this.shop_info.user_id == uni.getStorageInfoSync('user_id')) {
				this.nav_type = 3;
			} else if (this.service_type == 20) {
				this.gotoPage(
					'/pagesPlus/chat/chat?user_id=' +
						this.shop_info.supplier_user_id +
						'&shop_supplier_id=' +
						this.shop_info.shop_supplier_id +
						'&nickName=' +
						this.shop_info.store_name
				);
			}
		},
		goback() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}

.bg-f2 {
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
	color: #e2231a;
}

.huaxianjia {
	text-decoration: line-through;
	color: #999;
	margin-left: 5rpx;
}

.shop_head {
}

.prodcut-list-wrap {
	padding-bottom: 100rpx;
}

.shop_head_info {
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding: 80rpx 20rpx 50rpx 20rpx;
	box-sizing: border-box;
	// background-color: white;
}

.shop_list_body_item_shop {
	width: 100%;
	height: 120rpx;
	display: flex;
	justify-content: space-between;
}

.shop_list_body_item_shop_logo {
	width: 120rpx;
	height: 120rpx;
}

.shop_list_body_item_shop_logo image {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 15rpx;
}

.shop_list_body_item_shop_info {
	// padding: 10rpx;
	flex: 1;
	margin-left: 32rpx;
	box-sizing: border-box;
	// margin-left: -10%;
	padding-top: 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}

.shop_list_body_item_shop_others {
	padding: 10rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	text-align: right;
	padding-top: 0;
}

.brand {
	position: relative;
	color: #ffffff;
}

.sales {
	color: #ffffff;
}

.collect {
	color: #ffffff;
}

.shop_list_body_item_shop_others button {
	// width: 140rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 30rpx;
	color: #ffffff;
	border-radius: 30rpx;
	padding: 0 40rpx;
	background-color: #f6220c;
	color: white;
}

.shop_head_banner {
	width: 100%;
	// background-color: #FFFFFF;
}

.shop_head_banner swiper {
	width: 710rpx;
	height: 200rpx;
	margin: 0 auto;
	border-radius: 12rpx;
	background: linear-gradient(-57deg, #c3c0ff 1%, #feebff 100%);
	overflow: hidden;
}

.swiper-item {
	width: 100%;
	height: 360rpx;
}

.swiper-item image {
	width: 100%;
	height: 100%;
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
	border-bottom: 1rpx solid #d9d9d9;
}

.shop_body_l_item image {
	width: 150rpx;
	height: 150rpx;
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
	border: 1rpx #e22319 solid;
	border-radius: 30rpx;
	/* font-size: 16rpx; */
	color: #e22319;
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
	width: 45%;
	margin: 0 2.5%;
	margin-top: 20rpx;
	height: 520rpx;
	overflow: hidden;
	background-color: white;
}

.collect text {
	color: #ffffff;
}

.shop_body_t_item image {
	width: 100%;
	height: 337.5rpx;
	background-color: rgba(0, 0, 0, 0.1);
}

.shop_body_t_item_info {
	height: 182.5rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10rpx;
	box-sizing: border-box;
}

.shop_body_t_item_info_title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.shop_body_t_item_info_price {
	display: flex;
	align-items: flex-end;
}

.shop_body_t_item_info_others {
	display: flex;
	justify-content: space-between;
}

.shop_body_t_item_info_others_activity {
}

.shop_body_t_item_info_others_sales {
	color: #585858;
}

/* ***************************************** */
/* ***************************************** */
/* ***************************************** */
.diy-coupon {
	margin: 20rpx;
}

.diy-coupon .swiper {
	width: 750rpx;
	height: 168rpx;
}

.diy-coupon .coupon-item {
	width: 710rpx;
	height: 200rpx;
	align-items: stretch;
	align-content: stretch;
	color: #ffffff;
}

.diy-coupon .coupon-item.bg-red {
	background: #e62423;
}

.diy-coupon .coupon-item.bg-blue {
	background: #178ed9;
}

.diy-coupon .coupon-item.bg-yellow {
	background: #f4a50b;
}

.diy-coupon .coupon-item.bg-violet {
	background: #ab0bf6;
}

.diy-coupon .coupon-item .left-type {
	padding: 0 30rpx 0 40rpx;
	width: 40rpx;
	font-size: 40rpx;
	line-height: 40rpx;
	text-align: center;
	font-weight: bold;
	border-right: 4rpx dashed rgba(255, 255, 255, 0.4);
}

.diy-coupon .left-side-line {
	position: absolute;
	width: 20rpx;
	top: 0;
	left: -15rpx;
	overflow: hidden;
}

.diy-coupon .right-side-line {
	position: absolute;
	width: 20rpx;
	top: 0;
	right: -15rpx;
	overflow: hidden;
}

.diy-coupon .side-line .round {
	display: block;
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	margin: 4rpx 0;
	background: #ffffff;
}

.diy-coupon .center-content::before,
.diy-coupon .center-content::after {
	position: absolute;
	display: block;
	content: '';
	width: 30rpx;
	height: 15rpx;
	background: #ffffff;
}

.diy-coupon .center-content::before {
	top: 0;
	right: -16rpx;
	border-radius: 0 0 15rpx 15rpx;
}

.diy-coupon .center-content::after {
	bottom: 0;
	right: -16rpx;
	border-radius: 15rpx 15rpx 0 0;
}

.diy-coupon .coupon-item .center-content {
	padding: 20rpx 40rpx;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
}

.diy-coupon .coupon-item .center-content .content-top {
	height: 50rpx;
	line-height: 50rpx;
}

.diy-coupon .coupon-item .center-content .content-datatime {
	padding: 4rpx 10rpx;
	border-radius: 30rpx;
	font-size: 20rpx;
	background: rgba(0, 0, 0, 0.2);
}

.diy-coupon .coupon-item .right-receive {
	padding: 0 40rpx 0 30rpx;
	width: 30rpx;
	text-align: center;
	font-size: 30rpx;
	line-height: 30rpx;
	text-align: center;
	border-left: 4rpx dashed rgba(255, 255, 255, 0.4);
	background: rgba(0, 0, 0, 0.6);
}

.diy-coupon .coupon-item .no-receive {
	background: #acacac;
	color: #787878;
}

/* ***************************** */
.inner-tab {
	position: relative;
	height: 80rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	// border-bottom: 1px solid #dddddd;
	background: #ffffff;
	z-index: 9;
}

.inner-tab .item {
	flex: 1;
	font-size: 30rpx;
	color: #999999;
	font-size: 32rpx;
	font-family: PingFang SC;
}

.inner-tab .item.active,
.inner-tab .item .arrow.active .iconfont {
	color: $dominant-color;
}

.inner-tab .item.active {
	color: #333333;
	font-size: 32rpx;
	font-weight: bold;
	position: relative;
}

.inner-tab .item.active::after {
	content: '';
	position: absolute;
	bottom: -8rpx;
	width: 72rpx;
	height: 4rpx;
	background: #ee1414;
	border-radius: 2rpx;
	left: 0;
	right: 0;
	margin: 0 auto;
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

.box image {
	width: 36rpx;
	height: 36rpx;
}

.nav_bottom {
	height: 100rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	background-color: #ffffff;
}

.nav_bottom .icon {
	font-size: 50rpx;
}

.nav_bottom .active {
	color: #e2231a;
}

.nav_bottom .active .icon {
	color: #e2231a;
}

.live_list {
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	padding: 0 30rpx;
}

.live_item {
	position: relative;
	margin: 10rpx 0;
}

.live_img {
	width: 100%;
}

.live_img image {
	width: 335rpx;
	height: 375rpx;
	border-radius: 15rpx;
}

.live_name {
	font-size: 34rpx;
	margin: 15rpx 0;
}

.record {
	position: absolute;
	top: 0;
	width: 150rpx;
	font-size: 22rpx;
	height: 33rpx;
	line-height: 32rpx;
	text-align: center;
	background: #fdd933;
	color: #ffffff;
}

.record_off {
	position: absolute;
	top: 0;
	width: 150rpx;
	font-size: 22rpx;
	height: 33rpx;
	line-height: 32rpx;
	text-align: center;
	background: #fdd933;
	color: #ffffff;
}

.mpservice-wrap {
	width: 100%;
	box-sizing: border-box;
}

.mpservice-wrap .mp-image {
	width: 560rpx;
	margin-top: 40rpx;
}

.mpservice-wrap .mp-image image {
	width: 100%;
}

.icon-qq {
	color: #1296db;
	font-size: 64rpx;
}

.icon-weixin {
	color: #1afa29;
	font-size: 64rpx;
}

.icon-guanbi {
	font-size: 26rpx;
}

.icon-002dianhua {
	color: #1296db;
	font-size: 52rpx;
}

.kf-close {
	justify-content: flex-end;
}

.noDatamodel {
	font-size: 30rpx;
	width: 100%;
	text-align: center;
	height: 200rpx;
	line-height: 128rpx;
	color: #929292;
}

.reg180 {
	padding: 0 20rpx;
	text-align: right;
	transform: rotateY(180deg);
	position: absolute;
	bottom: 0;
}

.icon-jiantou {
	color: #ffffff;
	font-size: 30rpx;
}

.sticky-top {
	position: sticky;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 98;
	overflow: hidden;
}

.head_top {
	position: relative;
	height: 30px;
	line-height: 30px;
	color: #ffffff;
	font-size: 30rpx;
}

.bg_topimg {
	position: absolute;
	top: 0;
	width: 100%;
	height: 400rpx;
	z-index: 0;
}

.shop {
	background: #f2f2f2;
	margin-top: 16rpx;
}

.shop_red {
	color: #f6220c;
}

.coupon {
	position: relative;
	background-color: #ffffff;
	overflow: hidden;
	padding-bottom: 160rpx;
}

.shop_list_body_item_shop_others .collected {
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border: 1rpx solid #ffffff;
	color: #ffffff;
	background: none;
	border-radius: 30rpx;
	font-size: 26rpx;
}

.shop_list_body_item_shop_others .collect_btn {
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border: 1rpx solid #f6220c;
	background: #f6220c;
	color: #ffffff;
	border-radius: 30rpx;
	font-size: 26rpx;
}

.noborder {
	border: none;
}

.range_item {
	border: 1rpx solid #d9d9d9;
	border-top: none;
	padding: 8rpx;
	border-bottom-left-radius: 10rpx;
	border-bottom-right-radius: 10rpx;
	color: #666666;
	box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
}
</style>
