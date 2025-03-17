<template>
	<view class="diy-product" :style="{ background: itemData.style.background }">
		<view :class="['display__' + itemData.style.display]">
			<template v-if="itemData.style.display == 'list'">
				<view class="product-list" :class="['column__' + itemData.style.column]">
					<view class="product-item" v-for="(product, index) in itemData.data" :key="index"
						@click="gotoDetail(product.product_id)">
						<!-- 单列商品 -->
						<template v-if="itemData.style.column == 1">
							<view class="product-item-box">
								<!-- 商品图片 -->
								<view class="product-cover">
									<image :src="product.image" mode="aspectFill"></image>
								</view>
								<view class="product-info">
									<!-- 商品名称 -->
									<view v-if="itemData.style.show.productName" class="product-title">
										<text>{{ product.product_name }}</text>
									</view>
									<!-- 商品卖点 -->
									<view v-if="itemData.style.show.sellingPoint" class="selling-point gray9">
										<text>{{ product.selling_point }}</text>
									</view>
									<!-- 商品销量 -->
									<view v-if="itemData.style.show.productSales" class="already-sale">
										<text>已售{{ product.product_sales }}件</text>
									</view>
									<!-- 商品价格 -->
									<view class="price d-s-c mt10">
										<view v-if="itemData.style.show.productPrice" class="theme-price">
											<text>¥</text>
											<text class="">{{ product.product_price }}</text>
										</view>
										<view class="ml10 gray9 text-d-line f28"
											v-if="itemData.style.show.linePrice && product.line_price > 0">
											<text>¥</text>
											<text>{{ product.line_price }}</text>
										</view>
									</view>
								</view>
							</view>
						</template>

						<!-- 两列三列 -->
						<template v-else>
							<view class="product-cover">
								<image :src="product.image" mode="aspectFill"></image>
							</view>
							<view class="product-info">
								<view v-if="itemData.style.show.productName == 1" class="product-title">
									{{ product.product_name }}</view>
								<view class="price d-s-c">
									<view v-if="itemData.style.show.productPrice == 1" class="theme-price">
										<text class="f22">¥</text>
										<text class="">{{ product.product_price }}</text>
									</view>
									<view class="ml20 gray9 text-d-line"
										v-if="itemData.style.show.linePrice == 1 && product.line_price > 0"><text
											class="f22">¥</text>{{ product.line_price }}</view>
								</view>
							</view>
						</template>
					</view>
				</view>
			</template>
			<template v-else>
				<scroll-view :scroll-top="scrollTop" scroll-x="true">
					<view class="product-list" :class="['column__' + itemData.style.column]">
						<view v-for="(product, index) in itemData.data" :key="index"
							@click="gotoDetail(product.product_id)">
							<view class="product-item">
								<view class="product-cover">
									<image :src="product.image" mode="aspectFill"></image>
								</view>
								<view class="product-info">
									<view v-if="itemData.style.show.productName == 1" class="product-title">
										{{ product.product_name }}</view>
									<view class="price d-s-c f12">
										<view v-if="itemData.style.show.productPrice == 1" class="theme-price">
											<text>¥</text>
											<text class="">{{ product.product_price }}</text>
										</view>
										<view class="ml10 gray9 text-d-line"
											v-if="itemData.style.show.linePrice == 1 && product.line_price > 0">
											¥{{ product.line_price }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {};
		},
		props: ['itemData'],
		created() {},
		methods: {
			scroll(e) {},

			/*跳转产品详情*/
			gotoDetail(e) {
				let url = '/pages/product/detail/detail?product_id=' + e;
				this.gotoPage(url);
			}
		}
	};
</script>

<style>
	.diy-product {
		padding: 0 20rpx;
	}

	.diy-product .product-list.column__1 .product-item {
		margin-bottom: 20rpx;
		background: #ffffff;
		width: 100%;
	}

	.diy-product .product-list.column__1 .product-item-box {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
	}

	.diy-product .product-list .product-cover image {
		width: 100%;
		height: 100%;
	}

	.diy-product .product-list.column__1 .product-cover {
		width: 240rpx;
		height: 240rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.diy-product .product-list.column__1 .product-info {
		margin: 20rpx 20rpx 20rpx 30rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.diy-product .product-list .product-info .already-sale text {
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		background: #f2f2f7;
		color: #999;
	}

	.diy-product .product-list .product-title {
		display: -webkit-box;
		font-size: 32rpx;
		overflow: hidden;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.diy-product .product-list.column__1 .product-title {
		max-height: 80rpx;
		line-height: 40rpx;
	}

	.diy-product .product-list.column__1 .selling-point {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 30rpx;
		max-height: 60rpx;
	}

	.diy-product .product-list.column__1 .already-sale {
		margin-top: 10rpx;
	}

	.diy-product .product-list.column__2 .product-title {
		height: 80rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}

	.diy-product .product-list.column__3 .product-title {
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		height: 72rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}

	.diy-product .product-list.column__2 .product-info {
		padding: 0 24rpx;
	}

	.diy-product .product-list .price {
		font-size: 34rpx;
	}

	.diy-product .product-list.column__2 .price {
		margin-top: 10rpx;
		font-size: 30rpx;
	}

	.diy-product .product-list.column__3 .price {
		margin-top: 10rpx;
		padding: 0 10rpx;
		font-size: 28rpx;
	}

	.diy-product .product-list.column__3 .price .text-d-line {
		font-size: 22rpx;
	}

	.diy-product .product-list.column__2,
	.diy-product .product-list.column__3 {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.diy-product .column__2 .product-item {
		width: 345rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		overflow: hidden;
		background: #ffffff;
		box-shadow: 0px 8rpx 3rpx 0px rgba(6, 0, 1, 0.03);
		border-radius: 12rpx;
	}

	.diy-product .display__list .column__2 .product-item:nth-child(2n + 0) {
		margin-right: 0;
	}

	.diy-product .column__2 .product-cover {
		width: 220rpx;
		height: 220rpx;
		border-radius: 12rpx;
		margin: 20rpx auto;
	}

	.diy-product .column__3 .product-item {
		width: 230rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-bottom: 10rpx;
		border-radius: 8rpx;
		overflow: hidden;
		background: #ffffff;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	}

	.diy-product .display__list .column__3 .product-item:nth-child(3n + 0) {
		margin-right: 0;
	}

	.diy-product .column__3 .product-cover {
		width: 230rpx;
		height: 230rpx;
	}

	.diy-product .display__slide .product-list {
		flex-wrap: nowrap;
	}

	.diy-product .display__slide .column__2 .product-item {
		width: 300rpx;
	}

	.diy-product .display__slide .column__3 .product-item {
		width: 200rpx;
	}
</style>
