<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="top-tabbar">
			<view :class="state_active == 0 ? 'tab-item active' : 'tab-item'" @click="stateFunc(0)">全部订单</view>
			<view :class="state_active == 1 ? 'tab-item active' : 'tab-item'" @click="stateFunc(1)">待付款</view>
			<view :class="state_active == 2 ? 'tab-item active' : 'tab-item'" @click="stateFunc(2)">待发货</view>
			<view :class="state_active == 3 ? 'tab-item active' : 'tab-item'" @click="stateFunc(3)">待收货</view>
			<view :class="state_active == 4 ? 'tab-item active' : 'tab-item'" @click="stateFunc(4)">待评价</view>
		</view>
		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltolower="scrolltolowerFunc">
			<view :class="topRefresh ? 'top-refresh open' : 'top-refresh'">
				<view class="circle" v-for="(circle, n) in 3" :key="n"></view>
			</view>
			<view class="order-list">
				<view class="item" v-for="(item, index) in listData" :key="index">
					<view class="d-b-c pb38">
						<view class="item-dianpu" @click="toShop(item.supplier.shop_supplier_id)">
							<view class="item-d-l mr10">
								<i class="icon iconfont icon-dianpu1"></i>
								<text class="fb gray3 f32" v-if="item.supplier">{{item.supplier.name}}</text>
							</view>
							<view>
								<i class="icon iconfont icon-jiantou"></i>
							</view>
						</view>
						<view class="state">
							<text class="redF6">{{ item.state_text }}</text>
						</view>
					</view>
					<view class="order-head d-b-c">
						<view>
							<text class="state-text">{{ item.order_source_text }}</text>
							<text class="shop-name flex-1 fb">订单号：{{ item.order_no }}</text>
						</view>
					</view>
					<!--多个商品显示-->
					<view class="product-list pr" v-if="item.product.length > 1" @click="gotoOrder(item.order_id)">
						<scroll-view scroll-x="true">
							<view class="list d-s-c pr100">
								<view class="cover mr10" v-for="(img, num) in item.product" :key="num">
									<image :src="img.image.file_path" mode="aspectFit"></image>
								</view>
							</view>
						</scroll-view>
						<view class="total-count">
							<view class="left-shadow"></view>
							<view class="price f24">
								¥
								<text class="f32">{{ item.pay_price}}</text>
							</view>
							<view class="count">共{{ item.product.length }}件</view>
						</view>
					</view>
					<!--一个商品显示-->
					<view class="one-product d-s-c" v-else @click="gotoOrder(item.order_id)">
						<view class="cover" v-for="(img, num) in item.product" :key="num">
							<image :src="img.image.file_path" mode="aspectFit"></image>
						</view>
						<view class="pro-info flex-1">{{ item.product[0].product_name }}</view>
						<view class="total-count">
							<view class="left-shadow"></view>
							<view class="price f24" v-if="item.order_source==70">
								¥<text class="f32">{{ (item.pay_price*1 + item.advance.pay_price*1).toFixed(2) }}</text>
							</view>
							<view class="price f24" v-else>
								¥<text class="f32">{{ item.pay_price}}</text>
							</view>
							<view class="count">共{{ item.product[0].total_num }}件</view>
						</view>
					</view>
					<view class="order-bts presale" v-if="item.order_source==70">
						<view class="d-b-c line-h-50 f24 gray9">
							<view>定金</view>
							<view>
								<text>{{item.advance.pay_status.value == 20?'已支付':'待支付'}}</text>￥{{item.advance.pay_price}}
							</view>
						</view>
						<view class="d-b-c line-h-50  f24 gray9">
							<view>尾款</view>
							<view>
								<text>{{item.advance.pay_status.value == 20&&item.pay_status.value == 20?'已支付':'待支付'}}</text>￥{{item.pay_price}}
							</view>
						</view>
						<template v-if="item.order_status.value==10">
							<view class="d-e-c  line-h-50  f24 gray9"
								v-if="item.advance&&item.advance.pay_status.value==20">
								<view v-if="nowOverTime(item.advance.end_time)&&item.pay_end_time_format">
									尾款支付截止时间:<text class="redF11">{{item.pay_end_time_format}}</text>
								</view>
								<view v-else-if="item.advance.end_time_text">
									尾款支付时间:<text class="redF11">{{item.advance.end_time_text}}</text>
								</view>
							</view>
						</template>
						<template>
							<view class="d-e-c  line-h-50  f24 gray9"
								v-if="item.advance.pay_status.value == 10&&item.advance.order_status==10">
								<view
									v-if="!nowOverTime(item.advance.pay_end_time)&&!nowOverTime(item.advance.end_time)">
									定金支付截止时间: <text class="redF11">{{countDown(item.advance.pay_end_time)}}</text>
								</view>
							</view>
						</template>
						<template v-if="item.order_status.value != 21">
							<view class="d-e-c">
								<!-- 订单付款 -->
								<template v-if="item.advance.pay_status.value == 20&&item.pay_status.value == 10">
									<template v-if="nowOverTime(item.advance.end_time)&&item.order_status.value!=20">
										<view class="d-e-c mt10">
											<button class="pay-btn theme-btn"
												@click="gotoPage('/pages/order/cashier?order_id='+item.order_id)">支付尾款</button>
										</view>
									</template>
								</template>
								<view class="d-e-c mt10"
									v-if="item.pay_status.value == 10&&item.advance.order_status==10&&item.advance.money_return==1">
									<button class="pay-btn theme-borderbtn"
										@click="cancelAdvance(item.advance.order_advance_id)">取消定金</button>
								</view>
								<template v-if="item.order_status.value ==10&&item.pay_status.value == 20">
									<template v-if="item.delivery_status.value == 10">
										<button @click="cancelOrder(item.order_id)"
											class="theme-borderbtn">申请取消</button>
									</template>
								</template>
								<view class="d-e-c mt10"
									v-if="item.advance.pay_status.value == 10&&item.order_status.value!=20&&!nowOverTime(item.advance.pay_end_time)">
									<button class="pay-btn theme-btn"
										@click="gotoPage('/pages/order/cashier?order_type=50&order_id=' + item.advance.order_advance_id)">支付定金
									</button>
								</view>
								<view class="d-e-c mt10"
									v-if="item.delivery_status.value == 20 && item.receipt_status.value == 10">
									<button v-if="item.pay_type.value ==20" @click="wxOrder(item)"
										class="pay-btn theme-btn">确认收货</button>
									<button v-else @click="orderReceipt(item)"
										class="pay-btn theme-btn">确认收货</button>
								</view>
								<view class="d-e-c mt10" v-if="item.order_status.value == 30 && item.is_comment == 0">
									<button class="pay-btn theme-btn" @click="gotoEvaluate(item.order_id)">评价
									</button>
								</view>
							</view>
						</template>
						<view v-else class="count d-e-c ww100 redF11">取消申请中</view>
					</view>
					<view class="order-bts" v-else>
						<block v-if="item.order_status.value ==10">
							<!-- 未支付取消订单 -->
							<button @click="cancelOrder(item.order_id)" class="theme-borderbtn"
								v-if="item.pay_status.value == 10">取消</button>
							<!-- 已支付取消订单 -->
							<block v-if="item.pay_status.value == 20 && item.delivery_status.value == 10">
								<button @click="cancelOrder(item.order_id)" class="theme-borderbtn">申请取消</button>
							</block>
							<!-- 订单核销码 -->
							<template
								v-if="item.pay_status.value == 20 && item.delivery_type.value == 20 && item.delivery_status.value == 10">
								<button v-if="item.order_source == 30 && item.assemble_status==20"
									@click="onQRCode(item.order_id)" class="theme-borderbtn">核销码</button>
								<button v-if="item.order_source != 30" @click="onQRCode(item.order_id)"
									class="theme-borderbtn">核销码</button>
							</template>
							<!-- 订单付款 -->
							<block v-if="item.pay_status.value == 10"><button class="theme-btn"
									@click="onPayOrder(item.order_id)">付款</button></block>
							<!-- 确认收货 -->
							<block v-if="item.delivery_status.value == 20 && item.receipt_status.value == 10">
								<button class="theme-btn" v-if="item.pay_type.value ==20"
									@click="wxOrder(item)">确认收货</button>
								<button class="theme-btn" v-else @click="orderReceipt(item)">确认收货</button>
							</block>
						</block>
						<text v-if="item.order_status.value == 21" class="count">取消申请中</text>
						<!-- 订单评价 -->
						<button class="theme-btn" v-if="item.order_status.value == 30 && item.is_comment == 0"
							@click="gotoEvaluate(item.order_id)">评价</button>
						<template v-if="item.assemble_status == 10 && item.order_source == 30">
							<button class="theme-btn"
								@click="gotoAssembleShare(item.product[0].bill_source_id)">邀请好友拼单</button>
						</template>
					</view>
				</view>
				<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>
		<!--核销二维码-->
		<Popup :show="isCodeImg" type="middle" @hidePopup="hideCodePopupFunc">
			<view class="ww100 p20 box-s-b">
				<image class="ww100" :src="codeImg" mode="widthFix"></image>
			</view>
		</Popup>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {
		pay
	} from '@/common/pay.js';
	export default {
		components: {
			Popup,
			uniLoadMore
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: 0,
				/*顶部刷新*/
				topRefresh: false,
				/*数据*/
				listData: [],
				/*数据类别*/
				dataType: 'all',
				/*是否显示支付类别弹窗*/
				isPayPopup: false,
				/*支付方式*/
				pay_type: 20,
				/*订单id*/
				order_id: 0,
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
				/*有没有等多*/
				no_more: false,
				/*是否正在加载*/
				loading: true,
				/*是否显示核销二维码*/
				isCodeImg: false,
				codeImg: '',
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				isfirst: false,
				mch_id: "",
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
			if (typeof e.dataType != 'undefined') {
				this.dataType = e.dataType;
			}

			if (this.dataType == 'payment') {
				this.state_active = 1;
			} else if (this.dataType == 'received') {
				this.state_active = 3;
			} else if (this.dataType == 'comment') {
				this.state_active = 4;
			} else if (this.dataType == 'delivery') {
				this.state_active = 2;
			}
		},
		mounted() {
			this.init();
			this.initData();
			/*获取订单列表*/
			this.getData();
		},
		onShow() {
			if (this.isfirst) {
				this.initData();
				this.getData();
			}
		},
		methods: {
			initData() {
				let self = this;
				self.page = 1;
				self.listData = [];
				self.no_more = false;
			},
			cancelAdvance(e) {
				let self = this;
				let order_id = e;
				uni.showModal({
					title: '提示',
					content: '您确定要取消吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._get(
								'plus.advance.Order/cancelFront', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '操作成功',
										duration: 2000,
										icon: 'success'
									});
									self.listData = [];
									self.getData();
								}
							);
						}
					}
				});
			},
			depositPay(e) {
				this.gotoPage('/pages/order/confirm-order?order_type=retainage&order_id=' + e)
			},
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().in(self).select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			/*状态切换*/
			stateFunc(e) {
				console.log(11111, e);
				let self = this;
				if (self.state_active != e) {
					self.page = 1;
					self.loading = true;
					self.state_active = e;
					switch (e) {
						case 0:
							self.listData = [];
							self.dataType = 'all';
							break;
						case 1:
							self.listData = [];
							self.dataType = 'payment';
							break;
						case 2:
							self.listData = [];
							self.dataType = 'delivery';
							break;
						case 3:
							self.listData = [];
							self.dataType = 'received';
							break;
						case 4:
							self.listData = [];
							self.dataType = 'comment';
							break;
					}
					self.getData();
				}
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

			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				let dataType = self.dataType;
				self._get(
					'user.order/lists', {
						dataType: dataType,
						page: self.page,
						pay_source: self.getPlatform(),
						list_rows: self.list_rows
					},
					function(res) {
						self.loading = false;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						self.mch_id = res.data.mch_id;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						} else {
							self.no_more = false;
						}
						if (res.data.show_alipay) {
							self.showAlipay = true;
						}
						self.isfirst = true;
					}
				);
			},

			/*跳转页面*/
			gotoOrder(e) {
				this.gotoPage('/pages/order/order-detail?order_id=' + e);
			},

			/*隐藏支付方式*/
			hidePopupFunc() {
				this.isPayPopup = false;
			},
			toShop(id) {
				this.gotoPage('/pages/shop/shop?shop_supplier_id=' + id);
			},
			/*去支付*/
			payTypeFunc(payType) {
				let self = this;
				self.isPayPopup = false;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'user.order/pay', {
						payType: payType,
						order_id: self.order_id,
						pay_source: self.getPlatform()
					},
					function(res) {
						pay(res, self);
					}
				);
			},

			/*支付方式选择*/
			onPayOrder(orderId) {
				let self = this;
				self.gotoPage('/pages/order/cashier?order_type=1&order_id=' + orderId);
			},

			/*确认收货*/
			orderReceipt(item) {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '您确定要收货吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'user.order/receipt', {
									order_id: item.order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon: 'success'
									});
									self.listData = [];
									self.getData();
								}
							);
						} else {
							uni.showToast({
								title: '取消收货',
								duration: 1000,
								icon: 'none'
							});
						}
					}
				});
			},
			/*计算时分秒*/
			countDown(t) {
				let time = t - (Date.now() / 1000);
				//天数
				let day = Math.floor(time / (60 * 60 * 24));
				//取模（余数）
				let modulo = time % (60 * 60 * 24);
				//小时数
				let hour = Math.floor(modulo / (60 * 60));
				modulo = modulo % (60 * 60);
				//分钟
				let minute = Math.floor(modulo / 60);
				//秒
				let second = modulo % 60;
				day = this.convertTwo(day);
				hour = this.convertTwo(hour);
				minute = this.convertTwo(minute);
				second = this.convertTwo(second);
				let text = parseInt(day) > 0 ? (parseInt(day) + '天 ') : '' + parseInt(hour) + '时' + parseInt(minute) +
					'分' + parseInt(second) + '秒';
				return text
			},
			/*取消订单*/
			cancelOrder(e) {
				let self = this;
				let order_id = e;
				uni.showModal({
					title: '提示',
					content: '您确定要取消吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._get(
								'user.order/cancel', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '操作成功',
										duration: 2000,
										icon: 'success'
									});
									self.listData = [];
									self.getData();
								}
							);
						}
					}
				});
			},

			/*去评论*/
			gotoEvaluate(e) {
				this.gotoPage('/pages/order/evaluate/evaluate?order_id=' + e);
			},

			/*核销码*/
			onQRCode(e) {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let order_id = e;
				let source = self.getPlatform();
				self._get(
					'user.order/qrcode', {
						order_id: order_id,
						source: source
					},
					function(res) {
						uni.hideLoading();
						self.isCodeImg = true;
						self.codeImg = res.data.qrcode;
					}
				);
			},
			nowOverTime(t) {

				let now = new Date().getTime();
				let time = new Date(t * 1000).getTime();
				return now >= time
			},
			/*关闭核销二维码*/
			hideCodePopupFunc() {
				this.isCodeImg = false;
			},

			/*分享拼团*/
			gotoAssembleShare(e) {
				this.gotoPage('/pagesPlus/assemble/fight-group-detail/fight-group-detail?assemble_bill_id=' + e);
			},
			wxOrder(item) {
				let self = this;
				if (wx.openBusinessView) {
					wx.openBusinessView({
						businessType: 'weappOrderConfirm',
						extraData: {
							merchant_id: self.mch_id,
							merchant_trade_no: item.trade_no,
							transaction_id: item.transaction_id
						},
						success() {
							self._post(
								'user.order/receipt', {
									order_id: item.order_id
								},
								function(res) {
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon: 'success'
									});
									self.listData = [];
									self.getData();
								}
							);
						},
						fail() {
							//dosomething
						},
						complete() {
							//dosomething
						}
					});
				} else {
					//引导用户升级微信版本
				}
			},
		}
	};
</script>

<style lang="scss">
	@import url("css/myorder.css");
</style>