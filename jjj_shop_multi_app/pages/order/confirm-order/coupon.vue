<template>
	<view :class="Visible ? 'usable-coupon open' : 'usable-coupon close'">
		<view class="popup-bg" @click="closePopup(null)"></view>
		<view class="main pt30" v-on:click.stop>
			<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'">
				<view class="p-0-30">
					<view @click="selectCoupon(item.user_coupon_id)" style="margin-bottom: 15rpx;"
						:class="'coupon-item coupon-item-'+item.color.text" v-for="(item, index) in datalist"
						:key="index">
						<!--装饰用的小圆-->
						<view class="circles"><text v-for="(circle, num) in 6" :key="num"></text></view>
						<view class="info w100">
							<view class="d-c-c d-c">
								<text class="f40 fb w-s-n">{{ item.coupon_type.text }}</text>
							</view>
						</view>
						<view class="operation d-b-c w-b pr">
							<view class="flex-1 o-h">
								<view class="f34">
									<template v-if="item.coupon_type.value == 10">
										<text class="f40">减{{ item.reduce_price*1 }}元</text>
									</template>
									<template v-if="item.coupon_type.value == 20">
										<text class="f40">{{ item.discount*1 }}</text>
										<text class="f24">折</text>
									</template>
								</view>
								<view class=" f24">{{item.min_price>0?'满'+item.min_price*1+'元可用':'无门槛'}}</view>
								<view class="mt30 f24 white">{{ item.start_time.text }}~{{ item.end_time.text }}</view>
							</view>
							<view class="f30 mr20 b-radio" style="position: absolute;right: 0;">
								立即使用
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="coupon-btns"><button type="default" @click="closePopup(0)" class="btn-cancel">不使用优惠券</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*是否可见*/
				Visible: false,
				/*优惠券列表*/
				datalist: {},
				/*尺寸比例*/
				ratio: 1
			};
		},
		props: ['isCoupon', 'couponList'],

		onLoad() {},
		mounted() {
			this.init();
		},
		watch: {
			isCoupon: function(n, o) {
				if (n != o) {
					this.Visible = n;
					this.datalist = this.couponList;
					this.getHeight();
				}
			}
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						self.ratio = res.windowWidth / 750;
						self.getHeight();
					}
				});
			},

			/*获取高度*/
			getHeight() {
				let count = Object.keys(this.couponList).length;
				if (count > 2) {
					this.scrollviewHigh = this.phoneHeight * 0.6;
				} else {
					if (count == 1) {
						this.scrollviewHigh = 230 * this.ratio;
					} else if (count == 2) {
						this.scrollviewHigh = 460 * this.ratio;
					}
				}
			},

			/*选择优惠券*/
			selectCoupon(e) {
				this.closePopup(e);
			},
			/*关闭弹窗*/
			closePopup(e) {
				this.$emit('close', e);
			}
		}
	};
</script>

<style>
	.usable-coupon .popup-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99;
	}

	.usable-coupon .main {
		position: fixed;
		width: 100%;
		bottom: 0;
		min-height: 200rpx;
		background-color: #fff;
		transform: translate3d(0, 980rpx, 0);
		transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
		bottom: env(safe-area-inset-bottom);
		z-index: 99;
	}

	.usable-coupon .main {
		position: fixed;
		width: 100%;
		bottom: 0;
		min-height: 200rpx;
		background-color: #fff;
		transform: translate3d(0, 980rpx, 0);
		transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
		bottom: env(safe-area-inset-bottom);
		z-index: 99;
	}

	.usable-coupon.open .main {
		transform: translate3d(0, 0, 0);
	}

	.usable-coupon.close .popup-bg {
		display: none;
	}

	.coupon-item-red .operation {
		/* background: #fdf1df; */
	}

	.coupon-btns .btn-cancel {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 30rpx;
		background: #999999;
		color: #ffffff;
		border-radius: 0;
	}

	.coupon-item .w100 {
		padding: 0 75rpx;
	}

	.b-radio {
		border: 1rpx solid #FFFFFF;
		border-radius: 30rpx;
		padding: 10rpx 30rpx;
	}
</style>
