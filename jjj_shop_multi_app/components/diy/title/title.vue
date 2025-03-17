<template>
	<view class="diy-notice pr"
		:style="{ padding: itemData.style.paddingTop + 'px' + ' 10px', background: itemData.style.background }"
		@click="gotoPages(item)">
		<view class="notice-icon pr" :style="{background: itemData.style.background }"
			v-if="itemData.params.show_icon=='yes'">
			<image :src="itemData.params.icon" mode="aspectFill"></image>
		</view>
		<text class="pr notice-text text-ellipsisss f38 fb"
			:style="{background: itemData.style.background, color: itemData.style.textColor }">
			{{ itemData.params.title }}
		</text>
		<view class="center-line"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ['itemData'],
		created() {},
		methods: {
			/*跳转页面*/
			gotoPages(e) {
				this.gotoPage(e.linkUrl);
			}
		}
	};
</script>

<style>
	.diy-notice {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.diy-notice .notice-icon {
		width: 26px;
		height: 26px;
		background-color: #FFFFFF;
		padding: 0 10rpx;
		z-index: 1;
	}

	.diy-notice .notice-icon image {
		width: 100%;
		height: 100%;
	}

	.diy-notice .notice-text {
		overflow: hidden;
		white-space: nowrap;
		background-color: #FFFFFF;
		padding: 0 10rpx;
		z-index: 1;
	}
	.center-line{
		width: 490rpx;
		height: 2rpx;
		background-color: #c7c7c7;
		border-radius: 2rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		margin: auto;
		z-index: 0;
	}
</style>
