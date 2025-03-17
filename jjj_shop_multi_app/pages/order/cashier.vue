<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="tc buy-checkout-top">
			<view class="f32 mb20">待支付</view>
			<view class="redA8 f60 fb">￥{{ payPrice || '0.00' }}</view>
		</view>
		<view class="buy-checkout p-0-30">
			<view v-for="(item, index) in checkedPay" :key="index">
				<view v-if="item == 20" :class="pay_type == 20 ? 'item active' : 'item'" @tap="payTypeFunc(20)">
					<view class="d-s-c">
						<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-weixin"></text></view>
						<text class="key">微信支付：</text>
					</view>
					<view class="icon-box d-c-c"><text class="icon iconfont icon-xuanze"></text></view>
				</view>
				<view v-if="item == 30" :class="pay_type == 30 ? 'item active' : 'item'" @tap="payTypeFunc(30)">
					<view class="d-s-c">
						<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-zhifubao"></text></view>
						<text class="key">支付宝支付：</text>
					</view>
					<view class="icon-box d-c-c"><text class="icon iconfont icon-xuanze"></text></view>
				</view>
			</view>
			<view class="item">
				<view class="d-s-c">
					<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-yue"></text></view>
					<text class="key">余额抵扣：(剩余：{{ balance }})</text>
				</view>
				<switch :color="getTheme()" style="transform:scale(0.7);margin-right: -20rpx;" :checked="balanceType"
					@change="switch2Change" />
			</view>
		</view>
		<view class="bottom-btn" @click="submit"><button type="default">立即支付</button></view>
	</view>
</template>

<script>
	import {
		pay
	} from '@/common/pay.js';
	export default {
		data() {
			return {
				balance: '',
				balanceType: true,
				type: 0,
				loading: true,
				order_id: 0,
				/* 0创建订单;10 20保证金 30直播充值 40充值 50预售定金 60尾款*/
				order_type: 0,
				pay_type: 20,
				checkedPay: [],
				payPrice: '',
				isPay: false
			};
		},
		computed: {
			hasBanlance() {
				if (this.order_type == 40 || this.balance <= 0) {
					return false;
				}
				let n = this.checkedPay.indexOf(10);
				if (n == -1) {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad(e) {
			let self = this;
			this.order_id = decodeURIComponent(e.order_id);
			if (e.order_type) {
				this.order_type = e.order_type;
			}
			this.getData();
		},
		onBackPress(options) {
			console.log(!this.isPay);
			if (!this.isPay) {
				if (this.order_type != 20 && this.order_type != 30 && this.order_type != 40) {
					if (options.from === 'navigateBack') {
						return true;
					}
					this.back();
					return true;
				}
			}

		},

		methods: {
			back() {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '您的订单如在规定时间内未支付将被取消，请尽快完成支付',
					cancelText: '继续支付',
					confirmText: '确认离开',
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/order/order-detail?order_id=' + self.order_id
							})
						} else if (res.cancel) {
							/* uni.navigateBack({
								delta:1,
							}) */
							console.log('用户点击取消');
						}
					}
				});
			},
			getTheme() {
				let name = this.theme();
				let color = '#ff5704';
				switch (name) {
					case 'theme0':
						color = '#ff5704';
						break;
					case 'theme1':
						color = '#19ad57';
						break;
					case 'theme2':
						color = '#ffcc00';
						break;
					case 'theme3':
						color = '#33a7ff';
						break;
					case 'theme4':
						color = '#e4e4e4';
						break;
					case 'theme5':
						color = '#c8ba97';
						break;
					case 'theme6':
						color = '#623ceb';
						break;
				}
				return color;
			},
			getData() {
				let self = this;
				self.loading = true;
				uni.showLoading({
					title: '加载中'
				});
				let url = 'user.order/pay';
				if (self.order_type == 20) {
					url = 'supplier.index/pay';
				}
				if (self.order_type == 30) {
					url = 'plus.live.plan/pay';
				}
				if (self.order_type == 40) {
					url = 'balance.plan/pay';
				}
				if (self.order_type == 50) {
					url = 'plus.advance.Order/pay';
				}
				let params = {
					order_id: self.order_id,
					pay_source: self.getPlatform()
				};
				self._get(url, params, function(res) {
					self.loading = false;
					let list = [];
					res.data.payTypes.forEach(item => {
						list.push(item * 1);
					});
					self.checkedPay = list;
					self.payPrice = res.data.payPrice;
					self.balance = res.data.balance || '';
					if (self.checkedPay[0] != 10) {
						self.pay_type = self.checkedPay[0] || self.checkedPay[1] || 20;
					} else {
						self.pay_type = self.checkedPay[1] || self.checkedPay[0];
					}
					uni.hideLoading();
				});
			},
			switch2Change(e) {
				this.balanceType = e.detail.value;
			},
			submit() {
				let self = this;
				self.loading = true;
				uni.showLoading({
					title: '加载中'
				});
				let url = 'user.order/pay';
				if (self.order_type == 20) {
					url = 'supplier.index/pay';
				}
				if (self.order_type == 40) {
					url = 'balance.plan/pay';
				}
				if (self.order_type == 30) {
					url = 'plus.live.plan/pay';
				}
				if (self.order_type == 50) {
					url = 'plus.advance.Order/pay';
				}
				let use_balance = self.balanceType == true ? 1 : 0;
				if (self.payPrice == 0) {
					use_balance = 1;
				}
				let params = {
					order_id: self.order_id,
					pay_source: self.getPlatform(),
					payType: self.pay_type,
					use_balance: use_balance
				};

				self._post(url, params, function(res) {
					self.loading = false;
					self.isPay = true;
					uni.hideLoading();
					pay(res, self, self.paySuccess, self.payError);
				});
			},
			paySuccess(result) {
				let self = this;
				self.isPay = true;
				console.log(self.order_type);
				if (self.order_type == 30 || self.order_type == 40) {
					self.showSuccess('支付成功', function() {
						console.log('back');
						// #ifndef H5
						uni.navigateBack({
							delta: 1 //返回层数，2则上上页
						});
						// #endif
						// #ifdef H5
						history.go(-1);
						// #endif
					});
					return;
				} else if (self.order_type == 20) {
					self.showSuccess('支付成功', function() {
						self.gotoPage('/pages/user/my_shop/my_shop', 'reLaunch');
					});
					return;
				} else if (self.order_type == 50) {
					self.showSuccess('支付成功', function() {
						self.gotoPage('/pages/order/myorder', 'reLaunch');
					});
					return;
				} else {
					self.gotoPage('/pages/order/pay-success/pay-success?order_id=' + result.data.order_id, 'reLaunch');
					return;
				}
			},
			payError(result) {
				let self = this;
				self.isPay = true;
				let url = '/pages/order/myorder';
				if (self.order_type == 30 || self.order_type == 40) {
					// #ifndef H5
					uni.navigateBack({
						delta: parseInt(1)
					});
					// #endif
					// #ifdef H5
					history.go(-1);
					// #endif
				} else if (self.order_type == 20) {
					self.gotoPage('/pages/user/my_shop/my_shop', 'redirect');
				} else if (self.order_type == 50) {
					self.gotoPage('/pages/order/myorder', 'redirect');
				} else {
					self.gotoPage('/pages/order/myorder', 'redirect');
				}
			},
			payTypeFunc(n) {
				this.pay_type = n;
			}
		}
	};
</script>

<style lang="scss">
	.buy-checkout-top {
		padding: 100rpx 0;
	}

	.buy-checkout {
		.item {
			background-color: #ffffff;
			margin-bottom: 28rpx;
			box-shadow: 0rpx 13rpx 27rpx 0rpx rgba(172, 172, 172, 0.09);
			border-bottom: none;
			border-radius: 2rpx;
		}
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		@include background_color('background_color');
		@include font_color('text_color2');
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.bottom-btn>button {
		width: 100%;
		height: 116rpx;
		@include background_color('background_color');
		@include font_color('text_color2');
		border: none;
		border-radius: 0;
		font-size: 35rpx;
		font-weight: bold;
		display: flexd;
		justify-content: center;
		align-items: center;
		line-height: 116rpx;
	}
</style>