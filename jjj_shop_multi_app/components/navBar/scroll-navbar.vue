<template>
	<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
		<view v-for="(item, index) in navArr" :key="item.category_id" class="nav-item" :class="{current: index === tabCurrentIndex}"
		 @click="tabChange(index)" :id="'item-' + index">
			<text class="title">{{item.name}}</text>
		</view>
	</scroll-view>


</template>

<script>
	export default {
		name: 'ss-scroll-navbar',
		props: {
			navArr: {
				type: Array,
				default () {
					return [{
						name: '推荐',
						category_id: 'recent'
					}]
				}
			},
			tabCurrentIndex: {
				type: Number,
				default: 0
			},
			scrollChangeIndex: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0,
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange(index) {
				this.$emit('navbarTap', index);
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -= this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth() {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) => {
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth() {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			}
		},
		created() {
			var that = this;
			this.calculateWindowWidth();
			setTimeout(function() {
				that.calculateItemWidth();
			}, 1000);
		},
		watch: {
			scrollChangeIndex(val) {
				this.tabChange(val)
			},
		},

	}
</script>

<style lang="scss">
	.ss-scroll-navbar {
		width: 100%;
		height: 80rpx;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		white-space: nowrap;
		text-align: start;
		.nav-item {
			height: 80rpx;
			text-align: center;
			padding: 0upx 20upx;
			color: #FFFFFF;
			display: inline-block;
			position: relative;
			font-size: 32upx;

			.title {
				line-height: 80rpx;
			}

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #ffffff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #ffffff;
			font-weight: bold;
			&:after {
				width: 50%;
			}
		}
	}
</style>
