<template>
	<view>
		<view class="top-tabbar">
			<view :class="state_active == 0 ? 'tab-item active' : 'tab-item'" @click="stateFunc(0)">未使用</view>
			<view :class="state_active == 1 ? 'tab-item active' : 'tab-item'" @click="stateFunc(1)">已使用</view>
			<view :class="state_active == 2 ? 'tab-item active' : 'tab-item'" @click="stateFunc(2)">已过期</view>
		</view>

		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltoupper="scrolltoupperFunc" @scrolltolower="scrolltolowerFunc">
			<view class="p30 bg-white">
				<view class="item-wrap mb20" v-for="(item, index) in supList" :key="index"
					v-if="supList.length > 0">
					<view class="d-f" v-if="supList[0].list.length > 0">
						<text class="icon iconfont icon-dianpu1"></text>
						<view class="con_tit">{{item.name}}</view>
					</view>
					<view v-for="(sup_item,sup_index) in item.list" :key="sup_index" class="coupon_item"
						v-if="item.list.length > 0">
						<view
							:class="sup_item.is_expire==0&&sup_item.is_use==0 ? 'coupon-item coupon-item-'+sup_item.color.text : 'coupon-item coupon-item-gray'"
							@click="lookRule(sup_item)">
							<view class="coupon_type">
								{{item.name=='平台优惠券'?'平台通用':item.name}}
							</view>
							<!--装饰用的小圆-->
							<view class="circles">
								<text v-for="(circle, num) in 8" :key="num"></text>
							</view>
							<view class="info">
								<view>{{sup_item.coupon_type.text}}</view>
							</view>
							<view class="operation d-b-c">
								<view class="flex-1 coupon-content">
									<view>
										<template v-if=" sup_item.coupon_type.value == 10 ">
											<view class="price">
												<text class="f40 fb">减{{ sup_item.reduce_price*1 }}元</text>
											</view>
										</template>
										<template v-if="sup_item.coupon_type.value == 20 ">
											<text class="f40 fb">{{ sup_item.discount }}</text><text>折</text>
										</template>
									</view>
									<view class="f30">{{sup_item.min_price>0?'满'+sup_item.min_price*1+'元可用':'无门槛'}}
									</view>
									<view class="f24">
										有效期：{{sup_item.start_time.text}}至{{sup_item.end_time.text}}
									</view>
								</view>

								<view class="right-box d-c-c">
									<template v-if="sup_item.state.value>0">
										<view type="default" v-if="sup_item.apply_range!=10" class="f30"
											@click.stop="gotoPage('/pages/coupon/detail?coupon_id='+ sup_item.coupon_id+'&apply_range='+sup_item.apply_range)">
											立即使用
										</view>
										<view v-else-if="sup_item.shop_supplier_id == 0 " type="default" class="f30"
											@click.stop="gotoPage('/pages/index/index')">
											立即使用
										</view>
										<view v-else type="default" class="f30"
											@click.stop="gotoPage('/pages/shop/shop?shop_supplier_id='+sup_item.shop_supplier_id)">
											立即使用
										</view>
									</template>
									<view v-else class="f30">
										<text>{{sup_item.state.text}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="range_item d-b-c" v-if="sup_item.apply_range == 20"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id='+ sup_item.coupon_id+'&apply_range='+sup_item.apply_range)">
							<view>仅可购买指定部分商品</view>
							<view><text class="icon iconfont icon-jiantou"
									style="color: #999999; font-size: 24rpx;"></text></view>
						</view>
						<view class="range_item d-b-c" v-if="sup_item.apply_range == 30"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id='+ sup_item.coupon_id+'&apply_range='+sup_item.apply_range)">
							<view>仅可购买指定分类商品</view>
							<view><text class="icon iconfont icon-jiantou"
									style="color: #999999; font-size: 24rpx;"></text></view>
						</view>
					</view>
					<view class="">
						<view class="bottom-refresh">
							<view class="d-c-c p30" v-if="loading">
								<text class="gray3">加载中...</text>
							</view>
							<view class="d-c-c p30" v-if="no_more ">
								<text class="gray3">~~加载完成~~</text>
							</view>
						</view>
					</view>
					<view class="d-c-c p30" v-if="DataList.length==0 && !loading">
						<text class="iconfont icon-wushuju"></text>
						<text class="cont">亲，暂无相关记录哦</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: 0,
				/*列表*/
				DataList: {},
				no_more: false,
				loading: false,
				data_type: 'not_use',
				supList: []
			};
		},
		mounted() {
			/*初始化*/
			this.init();
			/*获取数据*/
			this.getData();
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},

			/*获取数据*/
			getData() {

				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let data_type = self.data_type;
				self._get('user.coupon/lists', {
					data_type: data_type,
				}, function(res) {
					uni.hideLoading();
					self.DataList = res.data.list;
					self.getSup();
				});
			},
			/* 优惠券分类 */
			getSup() {
				let self = this;
				let supList = [];
				let platformCoupon = {
					name: "平台优惠券",
					list: []
				};
				self.DataList.forEach((item, index) => {
					console.log(index)
					if (item.supplier == null) {
						platformCoupon.list.push(item)
					} else {
						if (supList == '') {
							supList.push({
								name: item.supplier.name,
								list: [item]
							})
						} else {
							let flag = true;
							supList.forEach((sup_item, sup_index) => {
								if (sup_item.name === item.supplier.name) {
									flag = false;
									sup_item.list.push(item)
								}
							})
							if (flag) {
								supList.push({
									name: item.supplier.name,
									list: [item]
								})
							}
						}
					}
				})
				console.log(supList)
				supList.push(platformCoupon);
				self.supList = supList;
			},
			/*状态切换*/
			stateFunc(e) {
				let self = this;
				if (self.state_active != e) {
					if (e == 0) {
						self.data_type = 'not_use';
					}
					if (e == 1) {
						self.data_type = 'is_use';
					}
					if (e == 2) {
						self.data_type = 'is_expire';
					}
					self.state_active = e;
					self.getData();
				}
			},

			/*可滚动视图区域到顶触发*/
			scrolltoupperFunc() {
				console.log('滚动视图区域到顶');
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				console.log('滚动视图区域到底');
			},

			/*查看规则*/
			lookRule(item) {
				item.rule = true;
			},

			/*关闭规则*/
			closeRule(item) {
				item.rule = false;
			}
		}
	};
</script>

<style>
	.d-f {
		display: flex;
		align-items: center;
	}

	.icon-dianpu1 {
		margin-right: 15rpx;
	}

	.coupon_type {
		padding: 10rpx 20rpx;
		position: absolute;
		z-index: 100;
		color: #ffffff;
		right: 0;
		top: 0;
		background: #cacaca80;
		height: 36rpx;
		border-bottom-left-radius: 18rpx;
	}

	.con_tit {
		font-weight: 800;
		font-size: 31rpx
	}

	.coupon_item {
		margin: 20rpx 0;
	}

	.range_item {
		border: 1rpx solid #D9D9D9;
		border-top: none;
		padding: 8rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		color: #666666;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	}
</style>