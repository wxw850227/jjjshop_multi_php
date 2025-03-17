<template>
	<view class="my_info br6">
		<!--地址-->
		<view class="add-address d-s-c" @click="addAddress()" v-if="Address==null">
			<view class="icon-box mr10">
				<text class="icon iconfont icon-dizhi1"></text>
			</view>
			<text>请添加收货地址</text>
		</view>

		<view class="address-defalut-wrap" @click="addAddress()" v-else>
			<view class="d-b-c">
				<view class="add-addr flex-1">
					<view class="icon-box mr10 f-s-0">
						<text class="icon iconfont icon-dizhi1"></text>
					</view>
					<view class="flex-1">
						<view class="info mb10">
							<text class="province-c-a f28 fb text-ellipsis-2">{{Address.region.province}}{{Address.region.city}} {{Address.region.region}}{{Address.detail}}</text>
						</view>
						<view class="gray9 f22">
							<text>{{Address.name}}{{Address.phone}}</text>
						</view>
					</view>
				</view>
				<view class="icon iconfont icon-jiantou ml80 f-s-0">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['Address', 'exist_address','dis'],
		onLoad() {

		},
		mounted() {

		},
		methods: {
			/*添加地址*/
			addAddress() {
				if(this.dis){
					return
				}
				let url = '/pages/user/address/address?source=order';
				if (!this.exist_address) {
					url = '/pages/user/address/add/add?delta=1';
				}
				this.gotoPage(url);
			}
		}
	}
</script>

<style lang="scss">
	.info {
		font-size: 33rpx;
		line-height: 43rpx;
	}

	.add-addr {
		display: flex;
		align-items: center;
	}

	.tel {
		font-size: 27rpx;
		color: #999999;
	}

	.choose-address {
		width: 88rpx;
		height: 88rpx;
		margin-right: 35rpx;
	}

	.icon-dizhi {
		margin-right: 25rpx;
		color: #ff6633;
		font-size: 60rpx;
	}

	.addree_icon {
		width: 42rpx;
		height: 42rpx;
	}

	.my_info {
		background-color: #FFFFFF;
		margin-top: 16rpx;
	}

	.icon-box .icon.icon-dizhi1 {
		@include font_color('font_color');
		font-size: 44rpx;
	}

	.my_info .icon.icon-jiantou {
		color: #333333;
		font-size: 24rpx;
	}
</style>
