<template>
	<view>
		<scroll-view scroll-y="true" class="scroll" @scroll="scrollChnage">
			<view class="navbar-section" :class="{'navbar-fixed-section': isFixed}">
				<ss-scroll-navbar :tabCurrentIndex="currentIndex" @navbarTap="navbarTapHandler" :scrollChangeIndex="currentI"
				 :navArr="navList"></ss-scroll-navbar>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import ssScrollNavbar from '@/components/navBar/scroll-navbar.vue'

	export default {
		props: ['currentI', 'navList'],
		components: {
			ssScrollNavbar
		},
		data() {
			return {
				currentIndex: 0,
				isFixed: false,
				topHeight: 0,
				listData: [],
			}
		},
		onLoad(options) {
			// uni.setNavigationBarTitle({
			// 	title: options.title
			// });
			this.calculateTopSectionHeight();
		},
		created() {},
		methods: {

			navbarTapHandler(index) {
				this.currentIndex = index;
				this.$emit('currentIndex', index)
			},
			scrollChnage(e) {
				let top = e.detail.scrollTop;
				if (top >= this.topHeight) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			},
			/**
			 * 计算头部视图的高度
			 */
			calculateTopSectionHeight() {
				var that = this;
				let topView = uni.createSelectorQuery().select(".top-section");
				topView.fields({
					size: true
				}, data => {
					that.topHeight = data.height;
				}).exec();
			}
		},
		watch: {
			currentI: function(newVal) {
				this.navbarTapHandler(newVal)
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		// position: absolute;
		// top: 0upx;
		// left: 0upx;
		// bottom: 0upx;
		// right: 0upx;

		// .navbar-fixed-section {
		// 	position: fixed;
		// 	top: 0upx;
		// 	left: 0upx;
		// 	right: 0upx;
		// }

		.top-section {
			height: 350upx;
			background-color: green;
		}

		.bottom-section {
			height: 1500upx;
			background-color: yellow;
		}

		.footer-section {
			height: 1500upx;
			background-color: blue;
		}
	}
</style>
