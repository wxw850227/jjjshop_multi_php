<template>
	<view class="diy-coupon"
		:style="{ background: itemData.style.background, padding: itemData.style.paddingTop + 'px 20rpx' }">
		<scroll-view scroll-x="true">
			<view class="swiper swiper-list">
				<view class="coupon-item d-b-c" :class="'bg-' + item.color.text" v-for="(item, index) in listData"
					:key="index">
					<view class="side-line left-side-line"><text class="round"
							:style="{ background: itemData.style.background}"></text></view>
					<view class="side-line right-side-line"><text class="round"
							:style="{ background: itemData.style.background}"></text></view>
					<view class="center-content pr">
						<view class="content-top">
							<template v-if="item.coupon_type.value == 10">
								<text class="f40">{{ item.reduce_price*1 }}</text>
							</template>
							<template v-if="item.coupon_type.value == 20">
								<text class="f40">{{ item.discount*1 }}</text>
								<text class="f24">折</text>
							</template>
						</view>
						<view class="content-bottom tc">
							<text class="f20">{{item.min_price>0?'满'+item.min_price*1+'元可用':'无门槛'}}</text>
						</view>
						<view class="op8 f20 tc text-ellipsis">
							<text v-if="item.apply_range==10">全品类券</text>
							<text v-if="item.apply_range==20">指定商品可用</text>
							<text v-if="item.apply_range==30">指定品类可用</text>
						</view>
					</view>
					<!--领取-->
					<view v-if="item.state.value == 1" class="right-receive" @click="receiveCoupon(index)">
						<view class="lr-tb">立即领取</view>
					</view>
					<view v-else class="right-receive">
						<view class="lr-tb">{{ item.state.text }}</view>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否显示点*/
				indicatorDots: false,
				/*是否自动*/
				autoplay: true,
				/*切换时间*/
				interval: 5000,
				/*动画过渡时间*/
				duration: 1000,
				/*数据列表*/
				listData: []
			};
		},
		props: ['itemData'],
		created() {
			this.listData = this.itemData.data;
		},
		methods: {
			scroll(e) {},
			/**
			 * 领取优惠券
			 */
			receiveCoupon: function(index) {
				let self = this;
				let item = self.listData[index];
				if (item.state.value == 0) {
					return false;
				}
				self._post(
					'user.coupon/receive', {
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
			}
		}
	};
</script>

<style lang="scss">
	.diy-coupon {
		margin: 0 20rpx;
		border-radius: 6rpx;
	}

	.f-s-0 {
		flex-shrink: 0;
	}

	.diy-coupon .swiper {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow-x: auto;
	}

	.diy-coupon .coupon-item {
		width: 254rpx;
		height: 154rpx;
		color: #ffffff;
		flex-shrink: 0;
		margin: 8rpx;
		position: relative;
		border-radius: 8rpx;
		overflow: hidden;
		@include background_color("bg-coupon"); 
		color: #ffffff;
	}

	.diy-coupon .coupon-item .left-type {
		padding: 4rpx 8rpx;
		font-size: 18rpx;
		line-height: 18rpx;
		text-align: center;
		position: absolute;
		right: 0;
		top: 0;
		color: #ffffff;
		background: linear-gradient(to right, #ff5b00, #fe8802);
		border-bottom-left-radius: 8rpx;
	}

	.diy-coupon .left-side-line {
		position: absolute;
		width: 24rpx;
		top: -14rpx;
		right: 42rpx;
		overflow: hidden;
	}

	.diy-coupon .right-side-line {
		position: absolute;
		width: 24rpx;
		bottom: -14rpx;
		right: 42rpx;
		overflow: hidden;
	}

	.diy-coupon .side-line .round {
		display: block;
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
	}

	.diy-coupon .center-content::before {
		top: 0;
		right: -16rpx;
		border-radius: 0 0 15rpx 15rpx;
	}

	.diy-coupon .coupon-item .center-content {
		padding: 26rpx 23rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		flex: 1;
		width: 200rpx;
		height: 154rpx;
		box-sizing: border-box;
		@include font_color('text-coupon');
	}

	.diy-coupon .coupon-item .center-content .content-top {
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		margin-bottom: 8rpx;
		justify-content: center;
		align-items: center;
	}

	.diy-coupon .coupon-item .center-content .content-datatime {
		padding: 4rpx 10rpx;
		border-radius: 30rpx;
		font-size: 20rpx;
		background: rgba(0, 0, 0, .2);
	}

	.diy-coupon .coupon-item .right-receive {
		height: 112rpx;
		width: 52rpx;
		text-align: center;
		font-size: 18rpx;
		line-height: 20rpx;
		text-align: center;
		flex-shrink: 0;
		@include font_color('text-coupon');
		display: flex;
		justify-content: center;
		align-items: center;
		border-left: 1rpx dashed #ffffff;

		.lr-tb {
			width: 26rpx;
		}
	}

	.diy-coupon .coupon-item .no-receive {
		background: #acacac !important;
		color: #ffffff;
	}

	.op8 {
		opacity: 0.8;
	}
</style>
