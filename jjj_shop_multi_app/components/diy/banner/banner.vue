<template>
	<view class="diy-banner-box pr" :class="itemData.style.imgShape"
		:style="'background-color:'+itemData.style.background+';'">
		<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" @change="changeSwiper"  :style="itemData.style.imgShape=='square'?'height:'+itemData.style.height+'rpx;':'height:'+(itemData.style.height*0.92)+'rpx;'">
			<swiper-item v-for="(item,index) in itemData.data" :key="index" @click="gotoPages(item)">
				<image :style="itemData.style.imgShape=='square'?'height:'+itemData.style.height+'rpx;':'height:'+(itemData.style.height*0.92)+'rpx;'" :src="item.imgUrl"></image>
			</swiper-item>
		</swiper>
		<view class="swiper-dots ww100 d-c-c" :class="itemData.style.btnShape">
			<view :class="current==index?'swiper-dot active':'swiper-dot'" v-for="(item,index) in itemData.data"
				:style="current==index?'background-color:'+indicatorActiveColor+';':''" :key="index">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				indicatorActiveColor: '#ffffff',
				current: 0
			}
		},
		props: ['itemData'],
		created() {
			this.interval = this.itemData.params.interval;
			this.indicatorActiveColor = this.itemData.style.btnColor;
		},
		methods: {
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			/*跳转页面*/
			gotoPages(e) {
				this.gotoPage(e.linkUrl);
			}
		}
	}
</script>

<style>
	.diy-banner-box{
		overflow: hidden;
	}
	.diy-banner-box,
	.diy-banner-box .swiper {
		width: 750rpx;
		/* background-color: #FFFFFF; */
	}

	.diy-banner-box.round,
	.diy-banner-box.round .swiper {
		width: 750rpx;
		/* background-color: #FFFFFF; */
	}

	.diy-banner-box image {
		width: 750rpx;
	}
	.diy-banner-box.round{
		padding: 30rpx;
		box-sizing: border-box;
	}
	.diy-banner-box.round image {
		width: 690rpx;
		border-radius: 12rpx;
	}

	.diy-banner-box.round .swiper-dots {
		position: absolute;
		bottom: 40rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.diy-banner-box.square .swiper-dots {
		position: absolute;
		bottom: 20rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.swiper-dots.square .swiper-dot {
		width: 14rpx;
		height: 14rpx;
		margin: 0 4rpx;
		background: #ebedf0;
		opacity: 0.3;
	}

	.swiper-dots.round .swiper-dot {
		width: 22rpx;
		height: 22rpx;
		margin: 0 4rpx;
		background: #ebedf0;
		opacity: 0.3;
		border-radius: 50%;
	}

	.swiper-dots.rectangle .swiper-dot {
		width: 40rpx;
		height: 6rpx;
		margin: 0 4rpx;
		background: #ebedf0;
		opacity: 0.3;
		border-radius: 4rpx;
	}

	.swiper-dots.round .swiper-dot.active,
	.swiper-dots.square .swiper-dot.active,
	.swiper-dots.rectangle .swiper-dot.active {
		opacity: 1;
	}
</style>
