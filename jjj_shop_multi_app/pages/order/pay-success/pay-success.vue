<template >
	<view class="pay-success" v-if="!loadding">
		<view class="success-icon d-c-c d-c">
			<text class="iconfont icon-queren"></text>
			<text class="name">支付成功</text>
		</view>
		<view class="success-price d-c-c">
			￥<text class="num">{{detail.pay_price}}</text>
		</view>
		<view class="order-info mt30 f28" v-if="detail.points_bonus > 0">
			<view class="d-b-c p20 border-b">
				<text class="gray9">{{points_name()}}赠送</text>
				<text class="gray3">{{detail.points_bonus}}</text>
			</view>
		</view>
		<view class="success-btns d-b-c">
			<button type="default" class="flex-1 mr10" @click="goHome()">返回首页</button>
			<button type="primary" class="flex-1 ml10" @click="goMyorder">我的订单</button>
		</view>
		<!--推荐-->
		<view><recommendProduct :location="30"></recommendProduct></view>
	</view>
</template>

<script>
	import recommendProduct from '@/components/recommendProduct/recommendProduct.vue';
	export default {
		components: {
			recommendProduct
		},
		data() {
			return {
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*订单id*/
				order_id: 0,
				/*订单详情*/
				detail: {
					order_status: [],
					address: {
						region: []
					},
					product: [],
					pay_type: [],
					delivery_type: [],
					pay_status: []
				},

			}
		},
		onLoad(e) {
			this.order_id = e.order_id;
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取订单详情*/
			this.getData();
		},
		methods: {
			/*获取订单详情*/
			getData() {
				let _this = this;
				let order_id = _this.order_id;
				_this._get(
					'user.order/paySuccess', {
						order_id: order_id
					},
					function(res) {
						_this.detail = res.data.order;
						_this.loadding = false;
						uni.hideLoading();
					}
				);
			},
			/*返回首页*/
			goHome(){
				this.gotoPage('/pages/index/index')
			},
			/*返回我的订单*/
			goMyorder(){
				this.gotoPage('/pages/order/myorder');
			}
		}
	}
</script>

<style>
	.pay-success .success-icon {
		display: flex;
		padding: 60rpx;
	}

	.pay-success .success-icon .iconfont {
		padding: 30rpx;
		background: #04BE01;
		border-radius: 50%;
		font-size: 80rpx;
		color: #FFFFFF;
	}

	.pay-success .success-icon .name {
		margin-top: 20rpx;
		font-size: 30rpx;
	}

	.pay-success .success-price {
		font-size: 36rpx;
	}

	.pay-success .success-price .num {
		font-size: 60rpx;
		font-weight: bold;
	}

	.pay-success .order-info {
		background: #FFFFFF;
	}

	.pay-success .success-btns {
		margin-top: 50rpx;
		padding: 30rpx;
	}

	.pay-success .success-btns button {
		font-size: 30rpx;
	}

	.pay-success .success-btns button[type="default"] {
		border: 1px solid #04BE01;
		color: #04BE01;
	}
</style>
