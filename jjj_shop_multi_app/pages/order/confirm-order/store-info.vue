<template>
	<view style="flex: 1;">
		<!--地址-->
		<template v-if="!extract_store.store_id">
			<view class="d-b-c pr20" @click="addAddress()">
				<view class="add-address d-s-c">
					<view class="icon-box mr10">
						<text class="icon iconfont icon-dizhi1"></text>
					</view>
					<text>请选择自提点</text>
				</view>
				<view>
					<i class='iconfont icon-jiantou'></i>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="d-b-c pr20" @click="addAddress()">
				<view class="address-defalut-wrap">
					<view class="info d-s-s">
						<text class="state">当前自提点</text>
						<view class="province-c-a d-s-s flex-1">
							<text>{{ extract_store.region.province }}</text>
							<text>{{ extract_store.region.city }}</text>
							<text>{{ extract_store.region.region }}</text>
						</view>
					</view>
					<view class="address">
						<text class="fb gray3">{{ extract_store.store_name }}</text>
						<view class="icon-box"></view>
					</view>
					<view class="user">
						<text class="name">{{ extract_store.address }}</text>
						<text class="tel">{{ extract_store.phone }}</text>
					</view>
				</view>
				<view>
					<i class='iconfont icon-jiantou'></i>
				</view>
			</view>
		</template>
		<Adress :isAddress='isAddress' :chooseSotr='chooseSotr' :store_id='store_id' @close="closeAdress"></Adress>
		<!-- 		<view class="addree-bottom">
			<view class="stripe" v-for="(item, index) in 10" :key="index">
				<text :class="index % 2 == 0 ? 'red' : 'blue'"></text>
				<text class="white"></text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import Adress from './address/address';
	export default {
		data() {
			return {
				isAddress: false,
				store_id: 0
			};
		},
		components: {
			Adress,
		},
		props: ['extract_store', 'last_extract','chooseSotr'],
		onLoad() {

		},
		mounted() {

		},
		methods: {
			/*添加地址*/
			addAddress() {
				let store_id = -1;
				if (this.extract_store.store_id) {
					store_id = this.extract_store.store_id;
				}
				this.store_id = store_id
				this.isAddress = true;
			},
			closeAdress() {
				this.isAddress = false;
			}
		}
	};
</script>

<style scoped>
	.buy-checkout.vender .item .key {
		width: 200rpx;
	}

	.pr20 {
		padding-right: 20rpx;
		padding-bottom: 60rpx;
	}
</style>
