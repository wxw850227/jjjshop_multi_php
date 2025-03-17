<template>
	<view class="coupon-wrap bg-white" v-if="!loadding">
		<block v-if="DataList.length > 0">
			<view class="item-wrap" v-for="(item, index) in DataList" :key="index">
				<view :class="'coupon-item coupon-item-'+item.color.text" @click="lookRule(item)">
					<!--装饰用的小圆-->
					<view class="circles">
						<text v-for="(circle,num) in 8" :key="num"></text>
					</view>
					<view class="info">
						<view >{{item.coupon_type.text}}</view>
					</view>
					<view class="operation d-b-c w-b">
						<view class="flex-1 coupon-content">
							<view :class="item.is_expire==0&&item.is_use==0?item.color.text:''">
								<template v-if=" item.coupon_type.value == 10 ">
									<view class="price" >
										<text>￥</text>
										<text class="f40 fb">{{ item.reduce_price }}</text>
									</view>
								</template>
								<template v-if="item.coupon_type.value == 20 ">
									<text class="f40 fb">{{ item.discount }}</text><text>折</text>
								</template>
							</view>
							<view class="f30">{{item.name}}</view>
							<view class="f24">
								<template v-if="item.expire_type ==10">
									有效期：领取{{ item.expire_day }}天内有效
								</template>
								<template v-if="item.expire_type ==20">
									有效期：{{item.start_time.text}}至{{item.end_time.text}}
								</template>
							</view>
						</view>
						<view class="btns d-c-c">
							<button type="default" v-if="item.state.value>0" :class="'btn-'+item.color.text" v-on:click.stop="receive(item.coupon_id )">
								立即领取
							</button>
							<button type="default" v-else class="btn-gray" v-on:click.stop>
								{{ item.state.text }}
							</button>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="none-data-box">
				<image src="/static/none.png" mode="widthFix"></image>
				<text>暂无数据</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				DataList: [],
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
			};
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取优惠券列表*/
			this.getData();
		},
		methods: {
			
			/*获取数据*/
			getData() {
				let self = this;
				self._get('coupon.coupon/lists', {
					page: self.page,
					list_rows: self.list_rows,
				}, function(res) {
					self.DataList = res.data.list;
					self.loadding = false;
					uni.hideLoading();
				});
			},
			/*查看规则*/
			lookRule(item) {
				item.rule = true;
			},

			/*关闭规则*/
			closeRule(item) {
				item.rule = false;
			},

			/*领取优惠券*/
			receive(e) {

				let self = this;
				uni.showLoading({
					title: '领取中'
				});
				self._post('user.coupon/receive', {
					coupon_id: e,
				}, function(res) {
					uni.hideLoading();
					uni.showToast({
						title: '领取成功',
						duration: 2000,
						icon: 'success'
					});
				});
				self.getData();
			},

		}
	};
</script>

<style>
	.coupon-wrap {
		padding: 30rpx;
	}

	.item-wrap {
		margin-bottom: 20rpx;
	}
</style>
