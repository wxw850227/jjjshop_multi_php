<template>
	<view>
		<!--限时秒杀-->
		<view class="limited-spike m-0-20 d-b-s">
			<view class="active-name mr20">
				<view>预</view>
				<view>告</view>
			</view>
			<view class="flex-1 pt16">
				<view class="white">
					<text class="f28 fb">￥</text>
					<text class="f42 fb">{{ subPrice(detail.product_price, '1') }}.</text>
					<text class="f24 fb">{{ subPrice(detail.product_price, '2') }}</text>
				</view>
				<view class="old-price">￥{{ detail.product_sku.line_price }}</view>
			</view>
			<view class="right-time">
				<Countdown
					activeName="previewProduct"
					ref="countdown"
					:config="{ startstamp: detail.preview.start_time, endstamp: detail.preview.end_time, type: 'preview' }"
					:start_name="'距开始仅剩'"
					:end_name="'距开始仅剩'"
					@returnVal="returnValFunc"
				></Countdown>
			</view>
		</view>
		<!--基本信息-->
		<view class="bg-white  m-0-20 mb20 p20 mt-down-box">
			<view class="f30 gray3">{{ detail.product_name }}</view>
			<view class="product-describe" v-if="detail.selling_point">{{ detail.selling_point }}</view>
			<view class="border-t d-b-c mt20">
				<button class="flex-1 active-btn d-c-c" @click="sendFunc('showShare')">
					<text class="icon iconfont icon-fenxiang3 shoucang-icon"></text>
					<text class="f28 gray9">分享</text>
				</button>
				<button class="flex-1 active-btn d-c-c" @click="sendFunc('favorite')">
					<text :class="is_fav ? 'icon-shoucang2 dominant' : 'icon-shoucang1'" class="icon iconfont shoucang-icon" src="/static/icon/sc.png" mode=""></text>
					<text class="f28" :class="is_fav ? 'dominant' : 'gray9'">收藏</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import Countdown from '@/components/countdown/countdown-act.vue';
export default {
	components: {
		Countdown
	},
	data() {
		return {};
	},
	props: ['detail', 'is_fav'],
	methods: {
		sendFunc(e) {
			this.$emit('send', e);
		},
		returnValFunc(e) {}
	}
};
</script>

<style lang="scss">
/* 预售 */
.product-detail .limited-spike {
	position: relative;
	z-index: 2;
	margin-top: -112rpx;
	color: #ffffff;
	background: linear-gradient(140deg, #f11e0b 0%, #f77737 100%);
	border-radius: 15rpx;
	height: 246rpx;
	padding: 14rpx 18rpx 14rpx 20rpx;
	box-sizing: border-box;
}
.mt-down-box {
	margin-top: -102rpx;
	z-index: 3;
	position: relative;
	border-radius: 15rpx;
	padding-bottom: 0;
}
.limited-spike .right-time {
	padding-top: 45rpx;
}
.limited-spike .right-time::v-deep text {
	font-size: 22rpx;
}

.limited-spike .right-time::v-deep .box {
	padding: 0;
	font-size: 22rpx;
	background: #ffffff;
	color: #ff4c01;
	width: 36rpx;
	height: 36rpx;
	display: inline-block;
	line-height: 36rpx;
	text-align: center;
	border-radius: 8rpx;
}
.limited-spike .right-time::v-deep .daybox {
	padding: 0;
	font-size: 22rpx;
	background: none;
}
.limited-spike .right-time::v-deep .countdown {
	border: none;
	padding: 0;
	font-size: 22rpx;
	white-space: nowrap;
}
.limited-spike .old-price {
	font-size: 24rpx;
	color: #ffffff;
	text-decoration: line-through;
}
.active-name {
	background-color: rgba(#000000, 0.2);
	font-size: 28rpx;
	padding: 20rpx 22rpx;
	box-sizing: border-box;
	color: #ffffff;
	border-radius: 8rpx;
}
.active-btn {
	height: 100rpx;
	background: none;
}
.shoucang-icon {
	font-size: 28rpx;
	color: #999999;
	margin-right: 10rpx;
}
</style>
