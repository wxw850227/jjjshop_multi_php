<template>
	<view class="wrap" :data-theme='theme()' :class="theme() || ''" v-if="!loading">
		<Myinfo :dis="options.order_type == 'retainage'" :Address="Address" :exist_address="exist_address"></Myinfo>
		<!--购买的产品-->
		<view class="vender">
			<view class="list">
				<view v-for="(supplier_item, supplier_index) in ProductData" :key="supplier_index">
					<view class="sup_itemtit" v-if="store_open">
						<i class="icon iconfont icon-dianpu1"></i>
						<view class="f26 gray3">
							{{supplier_item.supplier.name}}
						</view>
					</view>
					<view class="item" v-for="(item, index) in supplier_item.productList" :key="index">
						<view class="d-f">
							<view class="cover">
								<image :src="item.product_image" mode="aspectFit"></image>
							</view>
							<view class="info">
								<view class="d-b-s">
									<view class="flex-1">
										<view class="title f32 gray3">{{ item.product_name }}</view>
										<view class="theme-price mt10 f18">
											¥<text class="f26">{{ item.product_price }}</text>
										</view>
										<view class="describe mt10 f24" v-if="options.order_type=='deposit'">
											{{ item.advance_sku.product_attr }}</view>
										<view class="describe mt10 f24" v-else-if="options.order_type=='retainage'">
											{{ item.product_attr }}</view>
										<view class="describe mt10 f24" v-else>{{ item.product_sku.product_attr }}
										</view>
									</view>
									<view>
										<view class=" count_choose">
											<view class="num-wrap">
												<view class="f22 tr">×{{ item.total_num }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mt10 tr f28" v-if="item.is_user_grade==true">
							<text class="f26">会员折扣价：</text>
							<text class="theme-price f32">￥{{item.grade_product_price}}</text>
						</view>
						<view class="mt10 tr f28" v-if="item.product_reduce_money > 0">
							<text class="f26">立减：</text>
							<text class="theme-price f32">￥{{item.product_reduce_money}}</text>
						</view>
					</view>

					<view class="d-f-c" @tap="DistUp(supplier_item)">
						<view v-if="supplier_item.orderData.delivery==10">
							配送方式 <text class="extp">普通快递</text>
						</view>
						<view v-if="supplier_item.orderData.delivery==20">
							<view class="info d-s-s" style="padding-left: 0;">
								<text class="zt theme-btn">当前自提点</text>
								<view class="province-c-a d-s-s flex-1">
									<text>{{ store_list[supplier_item.shop_supplier_id]}}</text>
								</view>
							</view>
						</view>
						<view v-if="supplier_item.orderData.delivery==30">
							虚拟商品：无需物流
						</view>
						<view class="dfjac" v-if="supplier_item.orderData.delivery!=30">
							<view v-if="supplier_item.orderData.delivery==10">
								{{supplier_item.orderData.express_price != 0?"￥ "+supplier_item.orderData.express_price:"快递 免费"}}
							</view>
							<i class='iconfont icon-jiantou'></i>
						</view>
					</view>

					<template v-if="options.order_type == 'deposit'">
						<view class="d-f-c">
							<text class="key f26">定金：</text>
							<view class="f24">￥{{ OrderData.order_total_front_price }}</view>
						</view>
						<view class="d-f-c">
							<text class="key f26">尾款：</text>
							<view class="f24">
								￥{{ OrderData.order_total_pay_price }}</view>
						</view>
						<view class="f-d-c p30">
							<view class="ww100 d-e-c red">(单件商品尾款已减{{OrderData.reduce_money}}元)
							</view>
							<view class="ww100 d-e-c gray9">
								{{supplier_item.productList[0].advance.active_time[0]}}-{{supplier_item.productList[0].advance.active_time[1]}}支付尾款
							</view>
						</view>
					</template>
					<template v-else>
						<view class="d-f-c" v-if="!OrderData.force_points">
							<view class="">优惠券</view>
							<block v-if="objKeys(supplier_item.orderData.couponList,1) > 0">
								<text class="vlaue theme-price" v-if="supplier_item.orderData.coupon_money> 0"
									@tap="onTogglePopupCoupon(supplier_item.orderData.couponList,supplier_item)">-￥{{supplier_item.orderData.coupon_money}}</text>
								<text v-else class="vlaue theme-price"
									@tap="onTogglePopupCoupon(supplier_item.orderData.couponList,supplier_item)">有{{ objKeys(supplier_item.orderData.couponList,1)}}张优惠券可用<i
										class='iconfont icon-jiantou'></i></text>
							</block>
							<text v-else class="f24 gray9">无优惠券可用</text>
						</view>
						<view class="d-f-c" v-if="supplier_item.orderData.reduce">
							<view>商户{{supplier_item.orderData.reduce.active_name}}</view>
							<view class="theme-price f24">
								-￥{{supplier_item.orderData.reduce.reduced_price}}
							</view>
						</view>
						<view class="d-f-c" v-if="supplier_item.orderData.reduce_money">
							<view>尾款抵扣:</view>
							<view class="theme-price f24">
								-￥{{supplier_item.orderData.reduce_money}}
							</view>
						</view>
						<view v-if="is_use_points==1&&!OrderData.force_points&&supplier_item.orderData.points_money>0">
							<view class="d-f-c">
								<view>{{points_name()}}抵扣金额</view>
								<view class="theme-price f24">-￥{{supplier_item.orderData.points_money}}</view>
							</view>
						</view>
						<view class="d-f-c">
							<view class="ww100">
								<view class="mb20">订单备注</view>
								<view class="ww100"><textarea
										v-model="store_data[supplier_item.shop_supplier_id].remark"
										placeholder="选填,请先和商家协商一致" class="text_area" /></view>
							</view>
						</view>
						<!--总数-->
						<view class="total-box vthl">
							<view>
								<text class="f26 gray3">共{{supplier_item.productList.length}}件商品,总价:</text>
								<text class="f20 gray3">￥</text>
								<text class="f26 gray3">{{ supplier_item.orderData.order_total_price }}</text>
							</view>
							<view class="d-f">
								<view class="f26" v-if="!OrderData.force_points">
									实付款：<text class="theme-price f20">￥</text><text class="price theme-price"
										style="font-size: 32rpx;">{{toDecimal2(supplier_item.orderData.order_pay_price)}}</text>
								</view>
							</view>
						</view>
					</template>

				</view>
			</view>
		</view>
		<!--其它费用-->
		<view class="buy-checkout" v-if="options.order_type != 'deposit'">
			<view class="item">
				<text class="key f26">订单总金额：</text>
				<view>
					<text class="theme-price f24">￥{{ OrderData.order_total_price }}</text>
				</view>
			</view>
			<view class="item f26" v-if="OrderData.is_coupon">
				<text class="key">平台优惠券：</text>
				<block v-if="coupon_num > 0">
					<text class="f24  theme-price" v-if="OrderData.coupon_money_sys > 0"
						@tap="onTogglePopupCoupon(coupon_list,0)">-￥{{OrderData.coupon_money_sys}}</text>
					<text v-else class="f24  theme-price"
						@tap="onTogglePopupCoupon(coupon_list,0)">有{{ coupon_num }}张优惠券可用</text>
				</block>
				<text v-else class="f24 gray9">无优惠券可用</text>
			</view>
			<view class="item" v-if="OrderData.product_reduce_money > 0">
				<text class="key">商品立减：</text>
				<view>
					<text class="theme-price f24">-￥{{ OrderData.product_reduce_money }}</text>
				</view>
			</view>
			<view class="item" v-if="OrderData.reduce_money">
				<text class="key">尾款抵扣：</text>
				<view>
					<text class="theme-price f24">-￥{{ OrderData.reduce_money }}</text>
				</view>
			</view>
			<view class="item"
				v-if="OrderData.is_allow_points && OrderData.force_points == false &&OrderData.points_money != 0">
				<text class="key">可用{{points_name()}}抵扣：</text>
				<view class="">
					<text class="theme-price f24">-￥{{toDecimal2(OrderData.points_money)}}</text>
					<switch style="transform: scale(0.7); margin-right: -10rpx;" checked=true @change="onShowPoints" />
				</view>
			</view>
		</view>
		<!--底部支付-->
		<view class="foot-pay-btns">
			<template v-if="options.order_type=='deposit'">
				<view>
					应付
					<text class="fb theme-price">¥</text>
					<text class="num theme-price fb f38">{{ OrderData.order_total_front_price }}</text>
				</view>
			</template>
			<template v-else>
				<view class="price" v-if="!OrderData.force_points">
					¥
					<text class="num">{{ OrderData.order_pay_price }}</text>
				</view>
				<view class="price" v-if="OrderData.force_points">
					<text class="gray9">所需{{points_name()}}</text>
					<text class="num theme-price fb">{{ ProductData[0].orderData.points_num }}</text>
				</view>
			</template>
			<button type="primary" @tap="SubmitOrder">提交订单</button>
		</view>

		<!--优惠券-->
		<Coupon :isCoupon="isCoupon" :couponList="couponList" @close="closeCouponFunc"></Coupon>
		<Dist :isDist="isDist" :chooseSotr="chooseSotr" @close="closeDistFunc" :extract_store="extract_store"
			:last_extract="last_extract" :deliverySetting="deliverySetting"></Dist>

	</view>
</template>

<script>
	import Myinfo from './confirm-order/my-info';
	import Coupon from './confirm-order/coupon';
	import Dist from './confirm-order/distr';
	import {
		pay
	} from '@/common/pay.js';

	export default {
		components: {
			Myinfo,
			Coupon,
			Dist
		},
		data() {
			return {
				/*是否加载完成*/
				loading: true,
				options: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*商品id*/
				product_id: '',
				/*商品数量*/
				product_num: '',
				/*商品数据*/
				ProductData: [],
				/*订单数据数据*/
				OrderData: [],
				// 是否存在收货地址
				exist_address: false,
				/*默认地址*/
				Address: {
					region: []
				},
				extract_store: [],
				last_extract: {},
				product_sku_id: 0,
				/*配送方式*/
				delivery: 10,
				/*自提店id*/
				store_id: 0,
				/*优惠券id*/
				coupon_id: -1,
				/*是否使用积分,默认使用*/
				is_use_points: 1,
				remark: '',
				/*支付方式*/
				pay_type: 20,
				/*是否显示优惠券*/
				isCoupon: false,
				/*优惠券列表*/
				coupon_list: {},
				couponList: [],
				/*优惠券数量*/
				coupon_num: 0,
				/* 是否显示配送方式 */
				isDist: false,
				/*消息模板*/
				temlIds: [],
				/* 选择的地址 */
				// chooseAd:''
				product_couponid: 0,
				chooseSotr: 0,
				/* 支持的配送方式 */
				deliverySetting: [],
				choose_delivery: 10,
				store_data: {},
				// 当前商户选择的门店
				choose_store_id: 0,
				store_list: {},
				room_id: '',
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				balance: '',
				store_open: 1
			};
		},
		onLoad(options) {
			let self = this;
			options.room_id = !options.room_id ? 0 : options.room_id == 'undefined' ? 0 : options.room_id;
			self.options = options;
			self.room_id = options.room_id;
			console.log(self.options,'options')
			self.$fire.on('selectStoreId', function(e) { 
				self.extract_store = e;
				self.choose_store_id = e.store_id;
			});
			self.$fire.on('checkedfir', function(n) {
				self.choose_delivery = n;
			})
		},
		onShow() {
			this.getData();
		},
		mounted() {},
		methods: {
			init() {
				let key = '';
				let value = "";
				let self = this;
				self.ProductData.forEach((item, index) => {
					key = item.shop_supplier_id;
					value = {
						coupon_id: item.orderData.coupon_id,
						delivery: item.orderData.delivery,
						store_id: 0,
						remark: ""
					}
					self.store_data = {
						...self.store_data,
						[key]: value
					}
				})
			},
			/**/
			hasType(e) {
				if (this.deliverySetting.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},
			/*支付方式选择*/
			payTypeFunc(e) {
				this.pay_type = e;
			},
			/*是否使用积分选择*/
			onShowPoints: function(e) {
				let self = this;
				if (e.target.value == true) {
					self.is_use_points = 1;
				} else {
					self.is_use_points = 0;
				}
				self.getData();
			},
			/*选择优惠卷*/
			onTogglePopupCoupon(e, id) {
				let self = this;
				if (id != 0) {
					self.chooseSotr = id.shop_supplier_id;
				} else {
					self.chooseSotr = 0;
				}
				self.isCoupon = true;
				self.couponList = e;
			},
			/*关闭优惠券*/
			closeCouponFunc(e) {
				let self = this;
				if (e && typeof e != 'number') {
					self.isCoupon = false;
					return;
				}
				if (self.chooseSotr != 0) {
					let storid = self.chooseSotr;
					if (e > 0) {
						self.store_data[storid].coupon_id = e;
					} else {
						self.store_data[storid].coupon_id = 0;
					}
					self.chooseSotr = 0;
				} else {
					if (e > 0) {
						self.coupon_id = e;
					} else {
						self.coupon_id = 0;
					}

				}
				self.isCoupon = false;
				self.getData();
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});

				let callback = function(res) {
					self.OrderData = res.data.orderInfo.orderData;
					self.temlIds = res.data.template_arr;
					self.ProductData = res.data.orderInfo.supplierList;
					self.exist_address = self.OrderData.exist_address;
					self.Address = self.OrderData.address;
					self.last_extract = self.OrderData.last_extract;
					if (self.options.order_type != 'deposit') {
						self.coupon_list = self.OrderData.coupon_list;
						self.coupon_id = self.OrderData.coupon_id_sys;
						self.coupon_num = Object.keys(self.coupon_list).length;
					}

					self.balance = res.data.balance;
					//#ifdef MP-WEIXIN
					self.store_open = res.data.store_open;
					//#endif
					if (self.OrderData.order_pay_price == 0) {
						self.pay_type = 10;
					}
					if (JSON.stringify(self.store_data) == "{}") {
						self.init()
					}
					if (res.data.show_alipay) {
						self.showAlipay = true;
					}
					self.loading = false;
				};

				// 请求的参数
				let params = {
					delivery: self.delivery,
					store_id: self.store_id,
					coupon_id: self.coupon_id,
					is_use_points: self.is_use_points,
					pay_source: self.getPlatform()
					// pay_source: 'android'
				};
				if (JSON.stringify(self.store_data) == "{}") {
					params = params;
				} else {
					params = {
						...params,
						supplier: self.store_data
					};
				}
				//直接购买
				if (self.options.order_type === 'buy') {
					self._get(
						'order.order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									product_id: self.options.product_id,
									product_num: self.options.product_num,
									product_sku_id: self.options.product_sku_id,
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				//定金
				else if (self.options.order_type === 'deposit') {
					let test = Object.assign({}, params, {
						product_id: self.options.product_id,
						product_num: self.options.product_num,
						product_sku_id: self.options.product_sku_id,
						advance_product_sku_id: self.options.advance_product_sku_id,
						advance_product_id: self.options.advance_product_id
					})
					console.log(test)
					self._get(
						'plus.advance.Order/frontBuy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									product_id: self.options.product_id,
									product_num: self.options.product_num,
									product_sku_id: self.options.product_sku_id,
									advance_product_sku_id: self.options.advance_product_sku_id,
									advance_product_id: self.options.advance_product_id
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				//尾款
				else if (self.options.order_type === 'retainage') {
					self._get(
						'plus.advance.Order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									order_id: self.options.order_id,
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				// 购物车结算
				else if (self.options.order_type === 'cart') {
					self._get(
						'order.order/cart', {
							params: JSON.stringify(
								Object.assign({}, params, {
									cart_ids: self.options.cart_ids || 0
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				// 积分兑换结算
				else if (self.options.order_type == 'points') {
					console.log(self.options);
					self._get(
						'plus.points.order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									point_product_id: self.options.point_product_id,
									product_sku_id: self.options.product_sku_id,
									point_product_sku_id: self.options.point_product_sku_id,
									product_num: self.options.product_num
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				// 限时秒杀
				else if (self.options.order_type === 'seckill') {
					params.num = self.options.num;
					self._get(
						'plus.seckill.order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									seckill_product_id: self.options.seckill_product_id,
									product_sku_id: self.options.product_sku_id,
									seckill_product_sku_id: self.options.seckill_product_sku_id,
									product_num: self.options.product_num
								}))
						}

						,
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				//砍价
				else if (self.options.order_type === 'bargain') {
					self._get(
						'plus.bargain.order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									bargain_product_id: self.options.bargain_product_id,
									product_sku_id: self.options.product_sku_id,
									bargain_product_sku_id: self.options.bargain_product_sku_id,
									bargain_task_id: self.options.bargain_task_id
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
				//拼团
				else if (self.options.order_type === 'assemble') {
					self._get(
						'plus.assemble.order/buy', {
							params: JSON.stringify(
								Object.assign({}, params, {
									assemble_product_id: self.options.assemble_product_id,
									product_sku_id: self.options.product_sku_id,
									assemble_product_sku_id: self.options.assemble_product_sku_id,
									product_num: self.options.product_num,
									assemble_bill_id: self.options.assemble_bill_id,
								})
							)
						},
						function(res) {
							callback(res);
						},err=>{
							uni.navigateBack()
						}
					);
				}
			},

			toDecimal2(x) {
				var f = parseFloat(x);
				if (isNaN(f)) {
					return "0.00";
				}
				var f = Math.round(x * 100)
				var n = Math.round(x * 1000)
				var r = n.toString().split("");
				r = r[r.length - 1];
				if (r >= 5) {
					f = (f - 1) / 100
				} else {
					f = f / 100
				}
				var s = f.toString();
				var rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + 2) {
					s += '0';
				}
				return s;
			},
			/* 配送选择 */
			DistUp(item) {
				if (item.orderData.delivery == 30) {
					return
				}
				let self = this;
				self.store_id = item.shop_supplier_id;
				self.chooseSotr = item.shop_supplier_id;
				self.choose_delivery = item.orderData.delivery;
				let storid = self.chooseSotr;
				self.getData();
				self.deliverySetting = item.orderData.deliverySetting;
				self.extract_store = item.orderData.extract_store;
				this.isDist = true;

			},
			/* 关闭配送选择 */
			closeDistFunc(e) {
				let self = this;
				self.choose_delivery = e;
				self.isDist = false;
				let storname = '';
				if (self.extract_store.region) {
					storname = self.extract_store.region.province + self.extract_store.region.city + self.extract_store
						.region.region + self.extract_store.store_name;
				}
				let storid = self.chooseSotr;
				let choose_store_id = self.choose_store_id;

				self.delivery = self.choose_delivery;
				self.store_id = storid;
				self.store_data[storid].store_id = choose_store_id;
				self.store_data[storid].delivery = self.choose_delivery;
				self.store_list[storid] = storname;
				self.chooseSotr = 0;
				self.getData();
			},
			objKeys(obj, n) {
				if (obj) {
					if (n == 1) {
						return Object.keys(obj).length
					} else {
						return Object.keys(obj)
					}
				}

			},
			/*提交订单*/
			SubmitOrder() {
				console.log("订阅消息")
				let self = this;
				if (self.exist_address) {
					uni.showLoading({
						title: '加载中',
						mask: true
					});

					let params = {
						pay_type: self.pay_type,
						room_id: self.room_id,
						coupon_id: self.coupon_id,
						is_use_points: self.is_use_points,
						// pay_source: self.getPlatform()
					};

					params = Object.assign(params, {
						supplier: self.store_data
					});

					// 创建订单-直接下单
					let url = '';
					if (self.options.order_type === 'buy') {
						url = 'order.order/buy';
						params = Object.assign(params, {
							product_id: self.options.product_id,
							product_num: self.options.product_num,
							product_sku_id: self.options.product_sku_id,
							room_id: self.options.room_id || 0
						});
						params = JSON.stringify(params)
					}
					if (self.options.order_type === 'deposit') {
						url = 'plus.advance.Order/frontBuy';
						params = Object.assign(params, {
							product_id: self.options.product_id,
							product_num: self.options.product_num,
							product_sku_id: self.options.product_sku_id,
							advance_product_sku_id: self.options.advance_product_sku_id,
							advance_product_id: self.options.advance_product_id
						});
						params = JSON.stringify(params)
					}
					if (self.options.order_type === 'retainage') {
						url = 'plus.advance.Order/buy';
						params = Object.assign(params, {
							order_id: self.options.order_id,
						});
						params = JSON.stringify(params)
					}
					// 创建订单-购物车结算
					if (self.options.order_type === 'cart') {
						url = 'order.order/cart';
						params = Object.assign(params, {
							cart_ids: self.options.cart_ids || 0,
							// video_id: self.options.video_id || 0,
							room_id: self.options.room_id || 0
						});
						params = JSON.stringify(params)
					}

					// 创建订单-积分兑换
					if (self.options.order_type === 'points') {
						url = 'plus.points.order/buy';
						params = Object.assign(params, {
							point_product_id: self.options.point_product_id,
							product_sku_id: self.options.product_sku_id,
							point_product_sku_id: self.options.point_product_sku_id,
							product_num: self.options.product_num
						});
						params = JSON.stringify(params)
					}
					// 创建订单-限时秒杀
					if (self.options.order_type === 'seckill') {
						url = 'plus.seckill.order/buy';
						params.num = self.options.num;
						params = Object.assign(params, {
							seckill_product_id: self.options.seckill_product_id,
							product_sku_id: self.options.product_sku_id,
							seckill_product_sku_id: self.options.seckill_product_sku_id,
							product_num: self.options.product_num
						});
						params = JSON.stringify(params)
					}
					// 创建订单-砍价
					if (self.options.order_type === 'bargain') {
						url = 'plus.bargain.order/buy';
						params = Object.assign(params, {
							bargain_product_id: self.options.bargain_product_id,
							product_sku_id: self.options.product_sku_id,
							bargain_product_sku_id: self.options.bargain_product_sku_id,
							bargain_task_id: self.options.bargain_task_id
						});
						params = JSON.stringify(params)
					}

					// 创建订单-限时拼团
					if (self.options.order_type === 'assemble') {
						url = 'plus.assemble.order/buy';
						params = Object.assign(params, {
							assemble_product_id: self.options.assemble_product_id,
							product_sku_id: self.options.product_sku_id,
							assemble_product_sku_id: self.options.assemble_product_sku_id,
							assemble_bill_id: self.options.assemble_bill_id,
							product_num: self.options.product_num,
						});
						params = JSON.stringify(params)
					}

					let callback = function() {
						self._post(url, {
							params
						}, function(res) {
							let ids = '';
							let pages = '';
							if (self.options.order_type == 'deposit') {
								pages = '/pages/order/cashier?order_type=50&order_id=' + res.data.order_id;
							} else if (self.options.order_type == 'retainage') {
								ids = res.data.order_id;
								pages = '/pages/order/cashier?order_type=10&order_id=' + ids;
							} else {
								ids = encodeURIComponent(res.data.order_id.join(','));
								pages = '/pages/order/cashier?order_type=10&order_id=' + ids;
							}
							console.log(pages)
							self.gotoPage(pages,'reLaunch');
						});
					};
					self.subMessage(self.temlIds, callback);
				} else {
					uni.showToast({
						title: '请选择配送地址'
					})
				}
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.f-d-c {
		flex-direction: column;
	}

	.wrap {
		padding-bottom: 110rpx;
	}

	.d-f-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		padding: 30rpx 0;
		margin: 0 30rpx;
		font-size: 24rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.dfjac {
		display: flex;
		align-items: center;
	}

	.d-txar {
		white-space: nowrap;
		width: 200px;
		margin-right: 34rpx;
	}

	.extp {
		color: #9e9e9e;
		margin-left: 34rpx;
	}

	.vender .list .item {
		border-bottom: none;
	}

	.icon-jiantou {
		margin-left: 15rpx;
	}

	.icon-dianpu1 {
		margin-right: 15rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.sup_itemtit {
		padding: 40rpx 30rpx;
		display: flex;
		align-items: center;
	}

	.vender .total-box {
		height: 87rpx;
		line-height: 87rpx;
		border-bottom: 16rpx solid #f2f2f2;
	}

	.d-f {
		display: flex;
	}

	.zt {
		padding: 2rpx 10rpx;
		margin-right: 10rpx;
		border-radius: 8rpx;
		font-size: 22rpx;
	}

	.icon-box .icon-zhifubao {
		color: #1296db;
		font-size: 50rpx;
	}

	.icon-dianpu1 {}

	.text_area {
		width: 100%;
		height: 120rpx;
		background: #f2f2f2;
		border-radius: 6rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 24rpx;
	}

	.icon-xuanze {
		font-size: 38rpx;
	}

	.buy-checkout .item {
		padding: 30rpx 0;
		margin: 0 30rpx;
	}
</style>
