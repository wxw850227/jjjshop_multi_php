<template>
	<view class="recommend-product" v-if="isShow" :data-theme='theme()' :class="theme() || ''">
		<view class="title d-c-c">
			<text class="line-left"></text>
			<text class="name">{{showName}}</text>
			<text class="line-right"></text>
		</view>
		<view class="recommend-product-list">
			<view class="item" v-for="(item, index) in listData" :key="index" @click="gotoProduct(item.product_id)">
				<view class="product-cover">
					<image :src="item.product_image" mode="aspectFill"></image>
				</view>
				<view class="product-info">
					<view class="product-title">{{ item.product_name }}</view>
					<view class="d-b-c mt20">
						<view class="price f18 theme-price">
							¥
							<text class="num">{{ item.product_sku.product_price }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*数据*/
				listData: [],
				isShow: false,
				showName: ''
			};
		},
		created() {
			this.getData();
		},
		props: ['location'],
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				let page = self.page;
				self._post(
					'product.product/recommendProduct', {
						location: self.location
					},
					function(res) {
						if (res.data.is_recommend == true) {
							self.isShow = true;
							self.showName = res.data.recommend.name;
							self.listData = res.data.list;
						}
					}
				);
			},

			/*推荐商品跳转*/
			gotoProduct(e) {
				let url = 'pages/product/detail/detail?product_id=' + e
				this.gotoPage(url);
			}
		}
	};
</script>

<style lang="scss">
	.recommend-product {
		margin-top: 40rpx;
	}

	.recommend-product .title {
		height: 100rpx;
		font-size: 30rpx;
	}

	.recommend-product .title .name {
		margin: 0 20rpx;
		font-size: 24rpx;
	}

	.recommend-product .title .line {
		position: relative;
		display: block;
		width: 100rpx;
		border-top: 1px solid red;
	}

	.recommend-product .title .line::after {
		position: absolute;
		content: '';
		display: block;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background: red;
	}

	.recommend-product .title .left-line::after {
		right: 0;
		top: -9rpx;
	}

	.recommend-product .title .right-line::after {
		left: 0;
		top: -9rpx;
	}

	.recommend-product-list {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.recommend-product-list .item {
		width: 350rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		overflow: hidden;
		background: #ffffff;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, .1);
		margin-bottom: 10rpx;
	}

	.recommend-product-list .item:nth-child(2n+0) {
		margin-right: 0;
	}

	.recommend-product-list .product-cover {
		width: 220rpx;
		height: 220rpx;
		margin: 0 auto;
	}

	.recommend-product-list image {
		width: 100%;
		height: 100%;
	}

	.recommend-product-list .product-info {
		padding: 0 24rpx;
	}

	.recommend-product-list .product-title {
		height: 80rpx;
		margin-top: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 30rpx;
	}

	.recommend-product-list .price .num {
		font-size: 32rpx;
		font-weight: bold;
	}

	.line-left {
		width: 80px;
		height: 3px;
		@include background_color("background_color");
		// background-image: linear-gradient(to right, #EBEBEB, #666666);
	}

	.line-right {
		width: 80px;
		height: 3px;
		@include background_color("background_color");
		// background-image: linear-gradient(to left, #EBEBEB, #666666);
	}
</style>
