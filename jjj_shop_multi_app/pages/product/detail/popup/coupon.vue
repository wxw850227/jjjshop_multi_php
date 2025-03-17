<template>
	<view :class="Visible ? 'usable-coupon open' : 'usable-coupon close'">
		<view class="popup-bg" @click="closePopup"></view>
		<view class="main" v-on:click.stop>
			<view class="pop-title">
				<view>优惠</view>
				<view class="pop-close"  @click.stop="closePopup"><text class=" icon iconfont icon-guanbi"></text></view>
			</view>
			<view class="p-0-20">
				<view class="p-20-0 line-h-50 f22 gray3 " v-if="discount.give_points>0">
					<text class="text-box">返{{points_name()}}</text>商城购物返{{points_name()}}，订单完成后最高返{{discount.give_points}}{{points_name()}}
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-Y scroll-coupon" :style="'height:' + scrollviewHigh + 'px;'">
				<view>
					<view class=" scroll-coupon-tit">可领取优惠券</view>
					<view v-for="(item, index) in datalist" :key="index" class="mb20">
						<view
							:class="item.is_get?'coupon-item coupon-item-gray':'coupon-item coupon-item-'+item.color.text">
							<!--装饰用的小圆-->
							<view class="circles"><text v-for="(circle, num) in 6" :key="num"></text></view>
							<view class="info w100">
								<view class="d-c-c d-c">
									<text class="f40 fb w-s-n">{{ item.coupon_type.text }}</text>
								</view>
							</view>
							<view class="operation d-b-c w-b">
								<view class="flex-1 o-h">
									<template v-if=" item.coupon_type.value == 10 ">
										<view class="f34">
											<text class="f34 fb">减{{ item.reduce_price*1 }}元</text>
										</view>
									</template>
									<template v-if="item.coupon_type.value == 20 ">
										<text class="f34 fb">{{ item.discount*1 }}</text><text>折券</text>
									</template>
									<view class="f24">{{item.min_price>0?'满'+item.min_price*1+'元可用':'无门槛'}}</view>
									<block v-if="item.expire_type == 10">
										<view class="mt30 f24 ">领取{{ item.expire_day }}天内有效</view>
									</block>
									<block v-if="item.expire_type == 20">
										<view class="mt30 f24 white">{{ item.start_time.text }}~{{ item.end_time.text }}
										</view>
									</block>
								</view>
								<view class="f30 mr20 b-radio" v-if="!item.is_receive"
									@click="selectCoupon(item,index)">
									立即领取
								</view>
								<view v-else class="f30 mr20 b-radio">
									<text>已领取</text>
								</view>
							</view>

						</view>
						<view class="range_item d-b-c" v-if="item.apply_range == 20"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id='+ item.coupon_id)">
							<view>限购商户部分商品</view>
							<view><text class="icon iconfont icon-jiantou"
									style="color: #999999; font-size: 24rpx;"></text></view>
						</view>
					</view>
				</view>
			</scroll-view>
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
		props: ['isCoupon', 'couponList', 'discount'],

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
					this.scrollviewHigh = this.phoneHeight * 0.5;
				} else {
					if (count == 1) {
						this.scrollviewHigh = 250 * this.ratio + 60;
					} else if (count == 2) {
						this.scrollviewHigh = 460 * this.ratio + 60;
					}
				}
			},
			/*选择优惠券*/
			selectCoupon(e, i) {
				let self = this;
				uni.showLoading({
					title: '领取中'
				});
				self._post('user.coupon/receive', {
					coupon_id: e.coupon_id,
				}, function(res) {
					uni.hideLoading();
					uni.showToast({
						title: '领取成功',
						duration: 2000,
						icon: 'success'
					});
					self.datalist[i].is_receive = true;
				});
				// self.getData();
			},
			/*关闭弹窗*/
			closePopup() {
				this.$emit('close');
			}
		}
	};
</script>

<style lang="scss" scoped>
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
		transform: translate3d(0, 1980rpx, 0);
		transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
		padding-bottom: env(safe-area-inset-bottom);
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
		position: absolute;
		right: 0;
		border: 1rpx solid #FFFFFF;
		border-radius: 30rpx;
		padding: 10rpx 30rpx;
	}

	.range_item {
		border: 1rpx solid #D9D9D9;
		border-top: none;
		padding: 8rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		color: #666666;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	}

	.text-sheng {
		display: inline-block;
		width: 26rpx;
		height: 28rpx;
		background: linear-gradient(180deg, #FF5649 0%, #FF5649 100%);
		border-radius: 3rpx;
		font-size: 18rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 28rpx;
	}

	.text-box {
		padding: 2rpx 6rpx;
		background-color: #fbe9e7;
		color: #fd5342;
		margin-right: 10rpx;
		border-radius: 4rpx;
		font-size: 20rpx;
	}

	.line-h-50 {
		line-height: 50rpx;
	}

	.pop-title {
		padding-top: 53rpx;
		font-size: 28rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #333333;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 50rpx;
	}

	.pop-close {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		width: 60rpx;
		height: 60rpx;
		color: #999999;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon-guanbi{
			font-size: 26rpx;
		}
	}

	.scroll-coupon {
		margin: 0 20rpx;
		border-top: 1rpx solid #EEEEEE;
		width: 710rpx;
		box-sizing: border-box;
	}

	.scroll-coupon-tit {
		height: 74rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 24rpx;
		color: #999999;
	}
</style>
