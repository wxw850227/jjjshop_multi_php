<template>
	<view class="diy-notice"
		:style="{ padding: itemData.style.paddingTop + 'px' + ' 10px', background: itemData.style.background }"
		@click="gotoPages(item)">
		<view class="notice-icon">
			<image :src="itemData.params.icon" mode="aspectFill"></image>
		</view>
		<view class="notice-text flex-1 text-ellipsisss">
			<view class="transtext" :style="'color:'+itemData.style.textColor+';left:'+textW+'rpx'">{{ textData }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textData: '',
				n: 0,
				textW: 0,
				start: 0,
				times: null
			};
		},
		props: ['itemData'],
		created() {
			this.textData = this.itemData.params.text;
			this.$nextTick(()=>{
				this.init();
			})
			this.horseRaceLamp();
		},
		beforeUnmount() {
			clearTimeout(this.times)
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						// 计算组件的高度
						let view = uni.createSelectorQuery().in(self).select('.transtext');
						view.boundingClientRect(data => {
							let h = data.width;
							self.textW = 0;
							self.start = 2 * h;
						}).exec();
					}
				});
			},
			horseRaceLamp() {
				let self = this;
				// return
				self.times = setTimeout(function() {
					self.textW--;
					if (self.textW * (-1) >= self.start) {
						self.textW = 710
					}
					// let firstWord=self.textData.slice(0,1);
					// let afterWord=self.textData.slice(1,self.textData.length);
					// self.textData=afterWord+firstWord;
					self.horseRaceLamp();
				}, 10);
			},

			/*跳转页面*/
			gotoPages(e) {
				this.gotoPage(e.linkUrl);
			}
		}
	};
</script>

<style>
	.diy-notice {
		margin: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-radius: 6rpx;
		/* box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1); */

	}

	.diy-notice .notice-icon {
		width: 64rpx;
		height: 64rpx;
		margin-right: 20rpx;
	}

	.diy-notice .notice-icon image {
		width: 100%;
		height: 100%;
	}

	.diy-notice .notice-text {
		overflow: hidden;
		white-space: nowrap;
		position: relative;
		height: 64rpx;
	}

	.transtext {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 0;
		line-height: 64rpx;
		/* display: inline-block; */
	}
</style>
