<template>
	<view  :data-theme='theme()'  :class="'order-datail pb100 ' + theme()" v-if="!loadding">
		<!--详情状态-->
		<view class="order-state d-s-c">
			<view class="icon-box">
				<text v-if="detail.state_text == '已付款，待发货'" class="icon iconfont icon-icon"></text>
				<text v-if="detail.state_text == '待付款'" class="icon iconfont icon-icon"></text>
				<text v-if="detail.state_text == '已发货，待收货'" class="icon iconfont icon-daishouhuo"></text>
				<text v-if="detail.state_text == '已完成'" class="icon iconfont icon-xuanze"></text>
				<text v-if="detail.state_text == '已取消'" class="icon iconfont icon-gantanhao"></text>
			</view>
			<view class="state-cont flex-1">
				<view class="state-txt d-b-c">
					<text class="desc f34">{{ detail.state_text }}</text>
				</view>
				<view class="status-price pt10" v-if="detail.pay_status.value == 10">应付金额：¥ {{ detail.pay_price }}
				</view>
				<view class="countdown-datetime" v-if="detail.pay_end_time">
					<text>剩{{detail.pay_end_time}}自动关闭</text>
				</view>
			</view>
			<view class="dot-bg"></view>
		</view>

		<!--物流地址-->
		<view class="order-express p30 d-s-c" v-if="detail.delivery_type.value == 10">
			<view class="icon-box">
				<image style="width: 42rpx;height: 42rpx;" src="../../static/icon/address_icon.png" mode=""></image>
			</view>
			<view class="cont-text flex-1 o-h ml20 f30">
				<view class="express-text f32">{{ detail.address.name }}<text class="f26 gray9">
						{{ detail.address.phone }}</text></view>
				<view class="gray3 f26 pt10">
					{{ detail.address.region.province }}{{ detail.address.region.city }}{{ detail.address.region.region }}{{ detail.address.detail }}
				</view>
			</view>
			<view class="icon iconfont icon-jiantou"></view>
		</view>
		<!-- 上门自提：自提门店 -->
		<view class="order-express p30 d-s-s" v-if="detail.delivery_type.value == 20">
			<view class="flow-delivery__title m-top20"><text class="icon iconfont icon-dizhi1">自提门店</text></view>
			<view class="cont-text flex-1 o-h ml20 f30">
				<view class="express-text">
					{{ extractStore.store_name }} {{ extractStore.phone }}
					<view class="f24 gray9 pt10">
						{{ extractStore.region.province }} {{ extractStore.region.city }}
						{{ extractStore.region.region }} {{ extractStore.address }}
					</view>
				</view>
			</view>
		</view>

		<!-- 物流信息 -->
		<view class="group bg-white" v-if="detail.delivery_type.value == 10 && detail.delivery_status.value == 20"
			@click="gotoExpress(detail.order_id)">
			<view class="d-b-c">
				<view class="f28">
					<view class="p-20-0">
						<text class="gray9">物流公司：</text>
						<text>{{ detail.express.express_name }}</text>
					</view>
					<view class="p-20-0">
						<text class="gray9">物流单号：</text>
						<text>{{ detail.express_no }}</text>
					</view>
				</view>
				<view><text class="icon iconfont icon-jiantou"></text></view>
			</view>
		</view>

		<!--购物列表-->
		<view class="shops group bg-white">
			<view class="group-hd border-b-e"
				@tap="gotoPage('/pages/shop/shop?shop_supplier_id='+detail.supplier.shop_supplier_id)">
				<view class="left ">
					<i class="icon iconfont icon-dianpu1"></i>
					<text class="min-name">{{detail.supplier.name}}</text>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
			<view class="list">
				<view class="one-product p-20-0" v-for="(item, index) in detail.product" :key="index">
					<view class="d-f">
						<view class="cover">
							<image :src="item.image.file_path" mode="aspectFit"></image>
						</view>
						<view class="info flex-1 p-0-20">
							<view class="d-b-s">
								<view class="flex-1">
									<view class="title f28 gray3">{{ item.product_name }}</view>
									<view class="describe mt10 f24" v-if="item.spec_type==20">{{ item.product_attr }}
									</view>
								</view>
								<view>
									<view class=" count_choose">
										<view class="price">
											¥
											<text class="num">{{ item.product_price }}</text>
										</view>
										<view class="num-wrap">
											<view class="f22 tr">×{{ item.total_num }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="mt10 tr f28" v-if="item.is_user_grade==true">
						<text class="theme-price f26">会员折扣价：</text>
						<text class="theme-price f32">{{item.grade_product_price}}</text>
					</view>
					<view class="pt10 d-e-c" v-if="source=='user'">
						<!-- 申请售后 -->
						<view class="m-top20 dis-flex flex-x-end">
							<text v-if="item.refund">已申请售后</text>
							<view v-else-if="detail.isAllowRefund" @click="onApplyRefund(item.order_product_id)"><button
									type="default">申请售后</button></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--订单信息-->
		<view class="group bg-white f26">
			<view class="p-20-0">
				<text class="">订单编号：</text>
				<text>{{ detail.order_no }}</text>
			</view>
			<view class="p-20-0">
				<text class="">下单时间：</text>
				<text>{{ detail.create_time }}</text>
			</view>
			<view class="p-20-0">
				<text class="">支付方式：</text>
				<text>{{ detail.pay_type.text }}</text>
			</view>
			<view class="p-20-0">
				<text class="">配送方式：</text>
				<text>{{ detail.delivery_type.text }}</text>
			</view>
			<view class="p-20-0"
				v-if="detail.delivery_type.value==30 && detail.order_status.value==30 && detail.virtual_content !=''">
				<text class="">发货信息：</text>
				<text>{{ detail.virtual_content }}</text>
			</view>
			<view class="p-20-0">
				<text class="">备注：</text>
				<text>{{ detail.buyer_remark }}</text>
			</view>
			<view class="p-20-0" v-if="detail.order_status.value==20 && detail.cancel_remark !=''">
				<text class="">商家备注：</text>
				<text>{{ detail.cancel_remark }}</text>
			</view>
			<view v-if="service_open&&detail.supplier.user_id!=user_id" class="p-20-0 kefu" @click="tochat">
				<text class="icon iconfont icon-kefu2"></text>
				<text class="">联系卖家</text>
			</view>
		</view>

		<view class="group bg-white f26">
			<view class="p-20-0 d-b-c" v-if="detail.order_source!=70">
				<text class="">商品总价</text>
				<text>¥ {{ detail.total_price }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.order_source==70">
				<text class="">定金：</text>
				<text>￥{{ detail.advance.pay_price }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.pay_price&&detail.order_source==70">
				<text class="">尾款：</text>
				<text>￥{{ detail.total_price }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.advance&&detail.advance.reduce_money > 0">
				<text class="">尾款立减</text>
				<text>-¥ {{ detail.advance.reduce_money }}</text>
			</view>
			<view class="p-20-0 d-b-c">
				<text class="">运费</text>
				<text>¥ {{ detail.express_price }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.product_reduce_money > 0">
				<text class="">商品立减</text>
				<text>-¥ {{ detail.product_reduce_money }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.points_money>0">
				<text class="">{{points_name()}}抵扣金额：</text>
				<text class="theme-price">- ¥{{ detail.points_money }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if=" detail.coupon_money>0">
				<text class="">商户优惠券</text>
				<text class="theme-price">- ¥ {{ detail.coupon_money }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if=" detail.coupon_money_sys>0">
				<text class="">平台优惠券</text>
				<text class="theme-price">- ¥ {{ detail.coupon_money_sys }}</text>
			</view>
			<view class="p-20-0 d-b-c" v-if="detail.fullreduce_money>0">
				<text class="">商户满减</text>
				<text class="theme-price">- ¥ {{ detail.fullreduce_money }}</text>
			</view>
			<view class="p-20-0 d-e-c fb f34">
				实付金额：
				<text class="red" v-if="detail.order_source==70">¥{{ (detail.pay_price*1+detail.advance.pay_price*1).toFixed(2) }}</text>
				<text class="red" v-else>¥ {{ detail.pay_price }}</text>
			</view>
		</view>
		<view class="group bg-white" v-if="detail.pay_status.value == 20 && detail.delivery_type.value == 10 && detail.order_status.value==10&&detail.delivery_status.value == 10&&source=='supplier'">
		<!-- <view> -->
			<view class="f32 fb p-0-20">去发货</view>
			<!-- 下拉框 -->
			<view class="table-item">
				<view class="d-s-c make-top">
					<view class="fb color-28 f26 mr20">物流公司</view>
				</view>
				<view class="">
					<picker class=""  @change="changeSelect($event)" :range="expressList" range-key='express_name'>
						<view class="selectpicker">
							<view class="make-item input-box flex-1">{{express_name|| '请选择'}}</view>
							<view class="icon iconfont icon-jiantou"></view>
						</view>
					</picker>
				</view>
			</view>
			<view class="table-item">
				<view class="d-s-c make-top">
					<view class="fb color-28 f26 mr20">物流单号</view>
				</view>
				<view class="pr">
					<input class="make-item selectpicker input-box" v-model="express_no" type="text"
						placeholder="请输入" />
				</view>
			</view>
			<view></view>
			<view><button type="default" class="btn-blue send_btn" @click="sendPro">确认发货</button></view>
		</view>
		<view  v-if="detail.pay_status.value == 20 && detail.order_status.value == 21 &&source=='supplier'">
			<view class="f32 fb p-0-20 mb20 mt20">用户取消订单</view>
			<view class="red p-0-20 mb20">当前买家已付款申请取消订单,请审核是否同意，如同意则自动退回付款金额(微信支付原路退款)并关闭订单</view>
			<view class="p-0-20">
				<view class="d-s-c mb20">
					<view class="make-top w120 mr10">
						<view class="fb color-28 f26">审核状态</view>
					</view>
					<radio-group class="d-a-c" @change="changeRadio($event)">
						<label class="d-s-c make-item ">
							<view>
								<radio style="transform:scale(0.7)" color="#ff6633" :checked="status == 1" :value="1" />
							</view>
							<view class="f26 color-57">同意</view>
						</label>
						<label class="d-s-c make-item ">
							<view>
								<radio style="transform:scale(0.7)" color="#ff6633" :checked="status == 0" :value="0" />
							</view>
							<view class="f26 color-57">拒绝</view>
						</label>
					</radio-group>
				</view>
				<view v-if="status == 0" class="d-s-c mb20">
					<view class="w120 mr10">拒绝原因</view>
					<input type="text" class="make-item selectpicker input-box" v-model="cancel_refuse" />
				</view>
			</view>
			<view><button  class="theme-btn send_btn" @click="Cancel">确认</button></view>
		</view>
		<template  v-if="detail.order_source!=70">
			<!-- 操作栏 -->
			<view v-if="detail.order_status.value != 20&&detail.order_status.value != 30 && source=='user'"
				class="foot-btns">
				<!-- 取消订单 -->
				<button class="theme-borderbtn" v-if="detail.pay_status.value == 10"
					@click="cancelOrder(detail.order_id)">取消订单</button>
			
				<block v-if="detail.order_status.value != 21">
					<block v-if="detail.pay_status.value == 20 && detail.delivery_status.value == 10">
						<button @click="cancelOrder(detail.order_id)" class="theme-borderbtn">申请取消</button>
					</block>
				</block>
				<text v-else class="count f28 gray9">取消申请中</text>
				<block v-if="detail.pay_status.value == 10">
					<!-- 订单付款 -->
					<button @click="onPayOrder(detail.order_id)"  v-if="detail.pay_status.value == 10"
						class="ml10 theme-btn">去支付</button>
				</block>
				<!-- 确认收货 -->
				<block v-if="detail.delivery_status.value == 20 && detail.receipt_status.value == 10">
					<button class="theme-btn" @click="orderReceipt(detail.order_id)">确认收货</button>
				</block>
			</view>
		</template>
		

		<!--支付选择-->
		<!-- <Popup :show="isPayPopup" msg="支付方式" @hidePopup="hidePopupFunc">
			<view class="buy-checkout ww100">
				<view :class="pay_type == 20 ? 'item active border-b-e' : 'item border-b-e'" @click="payTypeFunc(20)">
					<view class="d-s-c">
						<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-weixin"></text></view>
						<text class="key">微信支付</text>
					</view>
					<view class="icon-box d-c-c"></view>
				</view>
				<view v-if="showAlipay" :class="pay_type == 30 ? 'item active border-b-e' : 'item border-b-e'"
					@click="payTypeFunc(30)">
					<view class="d-s-c">
						<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-zhifubao"></text></view>
						<text class="key">支付宝支付</text>
					</view>
					<view class="icon-box d-c-c"></view>
				</view>
				<view :class="pay_type == 10 ? 'item active' : 'item'" @click="payTypeFunc(10)">
					<view class="d-s-c">
						<view class="icon-box d-c-c mr10"><text class="icon iconfont icon-yue"></text></view>
						<text class="key">余额支付</text>
					</view>
					<view class="icon-box d-c-c"></view>
				</view>
			</view>
			<view class="bts"></view>
		</Popup> -->
		<Mpservice v-if="isMpservice" :isMpservice="isMpservice" :shopSupplierId="detail.supplier.shop_supplier_id"
			@close="closeMpservice"></Mpservice>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	import {
		pay
	} from '@/common/pay.js';
	import Mpservice from '@/components/mpservice/Mpservice.vue';
	export default {
		data() {
			return {
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*是否显示支付类别弹窗*/
				isPayPopup: false,
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
				extractStore: {},
				source: 'user',
				service_open: 0,
				service_type: 10,
				isMpservice: false,
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				user_id: 0,
				expressList: [],
				express_id: '',
				express_name:'',
				express_no: '',
				status: 1,
				cancel_refuse: '',
				pay_type:10
			};
		},
		components: {
			Popup,
			Mpservice,
		},
		onLoad(e) {
			this.order_id = e.order_id;
			this.user_id = uni.getStorageSync('user_id');
			if (e.source) {
				this.source = e.source;
			}
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取订单详情*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				let order_id = self.order_id;
				let url = 'user.order/detail';
				if (this.source == 'supplier') {
					url = 'supplier.order/detail';
				}
				self.loadding = true;
				self._get(url, {
						order_id: order_id,
						pay_source: self.getPlatform()
					},
					function(res) {
						self.expressList=res.data.expressList;
						self.detail = res.data.order;
						self.extractStore = res.data.order.extractStore;
						self.service_open = res.data.setting.service_open;
						if (res.data.setting.mp_service == null) {
							self.service_type = 10;
						} else {
							self.service_type = res.data.setting.mp_service.service_type;
						}
						if (res.data.show_alipay) {
							self.showAlipay = true;
						}
						self.loadding = false;
						uni.hideLoading();
					}
				);
			},
			/*显示支付方式*/
			hidePopupFunc() {
				this.isPayPopup = false;
			},

			/*取消订单*/
			cancelOrder(e) {
				let self = this;
				let order_id = e;
				wx.showModal({
					title: '提示',
					content: '您确定要取消当前订单吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._get(
								'user.order/cancel', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '操作成功',
										duration: 2000,
										icon: 'success'
									});
									self.getData();
								}
							);
						}
					}
				});
			},

			/*确认收货*/
			orderReceipt(order_id) {
				let self = this;
				wx.showModal({
					title: '提示',
					content: '您确定要收货吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'user.order/receipt', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon: 'success'
									});
									self.getData();
								}
							);
						}
					}
				});
			},
			/*查看物流*/
			gotoExpress(order_id) {
				this.gotoPage('/pages/order/express/express?order_id=' + order_id);
			},
			/*申请售后*/
			onApplyRefund(e) {
				this.gotoPage('/pages/order/refund/apply/apply?order_product_id=' + e);
			},

			/*去支付*/
			payTypeFunc(payType) {
				let self = this;
				let order_id = self.order_id;
				self.isPayPopup = false;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'user.order/pay', {
						payType: payType,
						order_id: order_id,
						pay_source: self.getPlatform()
					},
					function(res) {
						uni.hideLoading();
						pay(res, self);
					}
				);
			},

			/*支付方式选择*/
			onPayOrder(orderId) {
				let self = this;
				self.gotoPage('/pages/order/cashier?order_type=1&order_id='+orderId)
			},
			gotoProduct(item) {
				this.gotoPage('/pages/product/detail/detail?product_id=' + item.product_id);
			},
			tochat() {
				if (this.service_type == 10) {
					this.isMpservice = true;
				}
				if (this.service_type == 20) {
					this.gotoPage('/pagesPlus/chat/chat?user_id=' + this.detail.supplier.supplier_user_id +
						'&shop_supplier_id=' + this.detail.supplier
						.shop_supplier_id + "&nickName=" + this.detail.supplier.name + '&order_id=' + this
						.order_id);
				}
			},
			changeRadio(e) {
				this.status = e.detail.value;
			},
			Cancel(){
				let self = this;
				wx.showModal({
					title: '提示',
					content: '您确定审核吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'supplier.order/confirmCancel', {
									order_id:self.detail.order_id,
									is_cancel: self.status,
									cancel_refuse:self.cancel_refuse
								},
								function(res) {
									uni.hideLoading();
									self.showSuccess(res.msg);
									self.getData();
								}
							);
						}
					}
				});
			},
			changeSelect(e){
				console.log(e);
				this.express_name =this.expressList[e.detail.value].express_name;
				this.express_id = this.expressList[e.detail.value].express_id;
			},
			sendPro(){
				let self = this;
				wx.showModal({
					title: '提示',
					content: '您确定要发货吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'supplier.order/delivery', {
									order_id:self.detail.order_id,
									express_id: self.express_id,
									express_no:self.express_no
								},
								function(res) {
									uni.hideLoading();
									self.showSuccess(res.msg);
									self.getData();
								}
							);
						}
					}
				});
			}
		}
	};
</script>

<style scoped>
	page {}

	.order-express {
		background: #ffffff;
		margin: 0 20rpx;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}

	.order-express .icon-box .iconfont {
		font-size: 50rpx;
	}

	.order-datail {
		padding-bottom: 90 rpx;
		background-color: #F2F2F2;
	}

	.order-datail .fight-users {
		margin: 0 auto;
	}

	.order-datail .fight-users .user-box {
		width: 80rpx;
		height: 80rpx;
		margin: 10rpx;
		border-radius: 50%;
		border: 1px dashed #cccccc;
	}

	.order-datail .fight-users {
		padding: 30rpx;
	}

	.order-datail .fight-users .user-box image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.order-datail .fight-users .user-box .leader {
		position: absolute;
		top: -20rpx;
		left: 50%;
		margin-left: -30rpx;
		width: 60rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		color: #ffffff;
		border-radius: 30rpx;
		border: 1px solid #ffffff;
		background: red;
	}

	.order-datail .fight-users .user-box.user-who {
		font-size: 50rpx;
		color: #999999;
	}

	.state-cont .countdown-datetime {
		margin-top: 16rpx;
	}

	.state-cont .countdown-datetime text {
		padding: 4rpx 8rpx;
		border-radius: 4rpx;
		background: rgba(0, 0, 0, .4);
	}

	.icon-dianpu1 {
		margin-right: 15rpx;
	}

	.kefu {
		border-top: 1rpx solid #cacaca;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.kefu .icon-kefu2 {
		color: #1296db;
		margin-right: 8rpx;
	}

	.group {
		margin: 0 20rpx;
		margin-top: 20rpx;
		border-radius: 12rpx;
	}

	.foot-btns button {
		color: #FFFFFF;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
	}
	.table-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 26rpx;
		box-sizing: border-box;
	}
	.selectpicker {
		width: 400rpx;
		height: 65rpx;
		line-height: 65rpx;
		padding: 0 23rpx;
		box-sizing: border-box;
		border: 2rpx solid #BFBFBF;
		border-radius: 5rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #575757;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.selectpicker .jiantou {
		color: #575757;
		font-size: 22rpx;
	}
	
	.send_btn {
		width: 200rpx;
		margin: 0 auto;
	}
	.w120{
		width: 120rpx;
	}
</style>
