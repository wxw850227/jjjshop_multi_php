<template>
	<!-- 首页隐私政策 -->
	<view>
		<!-- 背景图 -->
		<view class="d-c-c position-absolute " :style="'width: 750rpx;height:'+windowHeight+'px;'">
			<view class="d-c bg-white box-shadow rounded-3" style="width: 580rpx;height: 460rpx;">
				<view class="d-c-c" style="height: 100rpx;">
					<text class="fb f32">服务协议和隐私政策</text>
				</view>
				<view class="flex-1 my-2 f26 liln-h-40">
					<view class="ti2">请你务必审慎阅读、充分理解"用户协议"和"隐私政策"各条款,包括但不限于:为了更好的向你提供服务,我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。
					</view>
					<view class="ti2">
						<text>你可阅读</text>
						<text class="blue" @click="xieyi('service')">《服务协议》</text>
						和
						<text class="blue" @click="xieyi('privacy')">《隐私政策》</text>
						了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。
					</view>
				</view>
				<view class="d-c-c d-cr" style="height: 80rpx;">
					<view class="d-c-c flex-1 " @click="quit"><text class="text-muted blue f26">暂不同意</text></view>
					<view class="d-c-c flex-1  main-bg" @click="submit"><text class="text-white f26">同意并接受</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				windowWidth: 0,
				service: '',
				privacy: ''
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync();
			this.windowWidth = res.windowWidth;
			this.windowHeight = res.windowHeight;
			this.getData();
		},
		methods: {
			getData() {
				let self = this;
				self._get('user.userapple/policy', {
					platform: self.getPlatform(),
					referee_id: uni.getStorageSync('referee_id')
				}, function(res) {
					console.log(res);
					self.service = res.data.service;
					self.privacy = res.data.privacy;
				});
			},
			// 同意隐私
			submit() {
				uni.setStorageSync('firstEnter', 1);
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			// 退出应用
			quit() {
				plus.runtime.disagreePrivacy();
				//android退出应用
				plus.runtime.quit();
				//ios退出应用
				plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
			},
			xieyi(type) {
				let url = '';
				if (type == 'service') {
					url = this.service;
				} else {
					url = this.privacy;
				}
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + url
				});
			}
		}
	}
</script>

<style lang="scss">
	.position-absolute {
		position: absolute;
		background: rgba(0, 0, 0, .6)
	}

	.d-cr {
		display: flex;
		flex-direction: row;
	}

	.ti2 {
		text-indent: 2em;
	}

	.liln-h-40 {
		line-height: 40rpx;
	}

	.box-shadow {
		border-radius: 12rpx;
		padding: 30rpx;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.2);
	}
</style>