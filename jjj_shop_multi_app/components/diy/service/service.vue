<template>
	<view class="diy-service drag optional drag__nomove" :style="{ right: itemData.style.right + '%', bottom: itemData.style.bottom + '%', opacity: itemData.style.opacity / 100 }">
		<!-- #ifndef MP-WEIXIN -->
		<view class="service-icon" @click="callPhone"><image :src="itemData.params.image" mode="aspectFill"></image></view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button class="service-icon" open-type="contact" session-from="wxapp" v-if="itemData.params.type == 'chat'">
			<image :src="itemData.params.image" mode="aspectFill"></image>
		</button>
		<view class="service-icon" v-if="itemData.params.type == 'phone'" @click="callPhone"><image :src="itemData.params.image" mode="aspectFill"></image></view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	methods: {
		/*拨打电话*/
		callPhone() {
			let self = this;
			uni.makePhoneCall({
				phoneNumber: self.itemData.params.phone_num
			});
		}
	}
};
</script>

<style>
.diy-service {
	position: fixed;
	width: 120rpx;
	height: 120rpx;
	z-index: 90;
	right: 0;
	bottom: 0;
}

.diy-service .service-icon {
	width: 120rpx;
	height: 120rpx;
}

.diy-service button.service-icon {
	padding: 0;
	background: none;
}

.diy-service .service-icon image {
	width: 100%;
	height: 100%;
}
</style>
