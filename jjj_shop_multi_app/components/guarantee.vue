<template>

	<view class="bottom-panel" :class="Visible?'bottom-panel open':'bottom-panel close'" @click="closePopup">
		<view class="popup-bg">
		</view>
		<view class="content" v-on:click.stop>
			<view class="module-box module-share">
				<view class="hd d-c-c">
					<text class="">基础服务</text>
					<text class="iconfont icon-guanbi" @click="closePopup"></text>
				</view>
				<scroll-view scroll-y="true" style="height: 600rpx;min-height: 300rpx;">
					<view class="p30 box-s-b" v-for="(item,index) in server" :key="index">
						<view class="d-s-s">
							<view>
								<view class="icon iconfont icon-tijiaochenggong"></view>
							</view>
							<view class="ml30">
								<view class="f26 gray9 mb10">{{item.name}}</view>
								<view class="f22 gray9">{{item.describe}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				/*是否可见*/
				Visible: false,
				poster_img: '',
			}
		},
		props: ['isguarantee', 'server'],
		watch: {
			'isguarantee': function(n, o) {
				if (n != o) {
					this.Visible = n;
				}
			}
		},
		methods: {
			/*关闭弹窗*/
			closePopup(type) {
				this.$emit('close', {
					type: type,
					poster_img:this.poster_img
				})
			},
		}
	}
</script>

<style>
	.bottom-panel .popup-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 98;
	}
	.bottom-panel .popup-bg .wechat-box{ padding-top: var(--window-top);}
	.bottom-panel .popup-bg .wechat-box image{ width: 100%;}

	.bottom-panel .content {
		position: fixed;
		width: 80%;
		top: 20vh;
		left: 0;
		right: 0;
		margin: auto;
		min-height: 200rpx;
		max-height: 900rpx;
		background-color: #fff;
		transform: translate3d(0, 1980rpx, 0);
		transition: transform .2s cubic-bezier(0, 0, .25, 1);
		border-radius: 12rpx;
		z-index: 99;
	}

	.bottom-panel.open .content {
		transform: translate3d(0, 0, 0);
	}

	.bottom-panel.close .popup-bg {
		display: none;
	}

	.module-share .hd {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 36rpx;
	}
	
	.module-share .item button,.module-share .item button::after{ background: none; border: none;}
	

	.module-share .icon-box {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: #f6bd1d;
	}

	.module-share .icon-box .iconfont {
		font-size: 60rpx;
		color: #FFFFFF;
	}

	.module-share .btns {
		margin-top: 30rpx;
	}

	.module-share .btns button {
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 0;
		border-top: 1px solid #EEEEEE;
	}

	.module-share .btns button::after {
		border-radius: 0;
	}

	.module-share .share-friend {
		background: #04BE01;
	}
	.icon-tijiaochenggong{
		width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 20rpx;
		color: #FF6633;
		border-radius: 50%;
		border: 1rpx solid #ff6633;
		margin-top: 7rpx;
		flex-shrink:initial;
	}
	.mb10{
		margin-bottom: 10rpx;
	}
	.iconfont.icon-guanbi {
		position: absolute;
		right: 20rpx;
		top: 0;
		font-size: 32rpx;
		color: #999999;
	}
</style>
