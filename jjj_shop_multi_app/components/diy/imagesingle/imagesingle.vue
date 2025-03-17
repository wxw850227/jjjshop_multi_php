<template>
	
		<view
			class="diy-imageSingle"
			:style="
				'padding-top: ' +
					itemData.style.paddingTop +
					'px;padding-bottom:' +
					itemData.style.paddingTop +
					'px; padding-left:' +
					itemData.style.paddingLeft +
					'px;padding-right:' +
					itemData.style.paddingLeft +
					'px;  background:' +
					itemData.style.background
			"
		>
		<view class="d-c-c" v-for="(imageSingle, index) in itemData.data" :key="index"  @click="gotoPages(imageSingle)">
			<image :src="imageSingle.imgUrl" mode="widthFix"></image>
		</view>
			
		</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	methods: {
		/*跳转页面*/
		gotoPages(e) {
			this.gotoPage(e.linkUrl);
		}
	}
};
</script>

<style>
.diy-imageSingle image {
	width: 100%;
}
</style>
