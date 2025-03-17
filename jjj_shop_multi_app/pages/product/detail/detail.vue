<template>
	<view class="product-detail pr" :data-theme="theme()" :class="theme() || ''">
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="tc  header"
			:style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;padding-top:' + topBarTop() + 'px'">
			<view class="reg180" :style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;'">
				<image @click="goback" src="/static/icon/back-jianatou.png" mode="" style="width: 48rpx;height: 48rpx;">
				</image>
			</view>
		</view>
		<!-- #endif -->
		<scroll-view scroll-y="true" class="scroll-Y scroll-box" :style="'height:' + scrollviewHigh + 'px;'"
			v-if="!loadding">
			<!--图片-->
			<view class="ww100" :style="'height:' + topBarTop() + 'px'"></view>
			<view class="product-pic">
				<swiper class="swiper" indicator-active-color="#ffffff" indicator-color="rgba(255,255,255,.3)"
					:indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					@change="changeSwiper">
					<swiper-item v-if="detail.video_id != 0">
						<view v-if="!isVideoPlay" class="icon iconfont icon-bofang" @click="isVideoPlay = true"></view>
						<image v-if="!isVideoPlay"
							:src="detail.poster ? detail.poster.file_path : detail.image[0].file_path" mode=""
							@click="isVideoPlay = true"></image>
						<video v-if="isVideoPlay" :src="detail.video.file_path" :autoplay="isVideoPlay"
							@click="isVideoPlay = false" class="video" :controls="false" :show-center-play-btn="false"
							:show-play-btn="false" :enable-progress-gesture="false"
							@ended="isVideoPlay = false"></video>
					</swiper-item>
					<swiper-item v-for="(item, index) in detail.image" :key="index">
						<image @click="yulan(detail.image, index)" :src="item.file_path" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
			</view>
			<template v-if="is_preview == 1">
				<previewProduct v-if="!loadding" :detail="detail" @send="sendFunc" :is_fav="is_fav"></previewProduct>
			</template>
			<!--基本信息-->
			<template v-if="ispresale">
				<!--限时秒杀-->
				<view class="limited-spike m-0-20">
					<view class="d-s-c mb16">
						<view class="f32" v-if="activeName == 'advance'">
							￥
							<text
								class="f42 fb">{{ subPrice(detail[activeName][skuName][0].product_price, '1') }}.</text>
							<text
								class="f24 fb">{{ subPrice(detail[activeName][skuName][0].product_price, '2') }}</text>
						</view>
						<view class="f32" v-else>
							￥
							<text
								class="f42 fb">{{ subPrice(detail[activeName][skuName][0][activePrice], '1') }}.</text>
							<text class="f24 fb">{{ subPrice(detail[activeName][skuName][0][activePrice], '2') }}</text>
						</view>
						<view class="tips-box" v-if="activeName == 'advance'">
							预估到手价￥{{ (detail[activeName][skuName][0].product_price * 1 - detail[activeName][skuName][0][activePrice] * 1).toFixed(2) }}
						</view>
					</view>
					<text class="left-name" v-if="activeName == 'advance'">定金¥{{ detail[activeName].money }}
						(尾款立减¥{{ detail[activeName][skuName][0][activePrice] }})</text>
					<view class="right-time">
						<view class="d-e-c mb16">
							{{ activeText }}
							<image class="jiantou" src="/static/icon/jiantou-white.png" mode=""></image>
						</view>
						<Countdown ref="countdown"
							:config="{ startstamp: detail[activeName].start_time, endstamp: detail[activeName].end_time }"
							@returnVal="returnValFunc"></Countdown>
					</view>
				</view>
				<!--基本信息-->
				<view class="bg-white  m-0-20 mb20 p20 mt-down-box">
					<view class="f30 gray3">{{ detail.product_name }}</view>
					<view class="product-describe" v-if="detail.selling_point">{{ detail.selling_point }}</view>
					<view class="product-presale" v-if="activeName == 'advance'">
						<view class="d-b-s">
							<view class="gray3 f24" style="width: 100rpx;">尾款：</view>
							<view class="flex-1">
								<view class="f24 redF11">
									￥{{ (detail[activeName][skuName][0].product_price * 1 - detail[activeName][skuName][0][activePrice] * 1).toFixed(2) }}
								</view>
								<view class="gray9 f24">
									({{ detail[activeName].active_time[0] }}-{{ detail[activeName].active_time[1] }})
								</view>
							</view>
						</view>
						<view class="d-b-s">
							<view class="gray3 f24" style="width: 100rpx;">流程：</view>
							<view class="flex-1 gray6 f24">1.付定金-2.付尾款-3.发货</view>
						</view>
					</view>
				</view>
			</template>
			<!--基本信息-->
			<view class="bg-white p30 mb22" v-if="!ispresale && is_preview != 1">
				<view class="price-wrap">
					<view class="d-s-s d-c ww100">
						<view class="d-s-c pr ww100 mb16">
							<view class="new-price theme-price">
								<text class="fn mr10" v-if="detail.is_user_grade">会员价</text>
								<text>¥</text>
								<text class="num">{{ detail.product_sku.product_price }}</text>
								<text class="num"
									v-if="detail.spec_type == 20 && detail.product_sku.product_price != detail.product_max_price">
									-{{ detail.product_max_price }}
								</text>
							</view>
							<!--分享-->
							<view class="share-box">
								<button @click="showShare">
									<image class="share_img" src="/static/icon/fx.png" mode=""></image>
									<text class="f22">分享</text>
								</button>
							</view>
							<view class="sc-box">
								<button @click="favorite()">
									<image :class="isfollow ? '' : 'img_gray'" class="share_img"
										src="/static/icon/sc.png" mode=""></image>
									<text class="f22" :class="isfollow ? 'red' : 'gray3'">收藏</text>
								</button>
							</view>
						</view>
						<view>
							<text class="old-price mr16">¥{{ detail.product_sku.line_price }}</text>
							<text class="already-sale ">已售{{ detail.product_sales }}件</text>
						</view>
					</view>
				</view>
				<view class="product-name text-ellipsis-2">
					<view class="store_type" v-if="detail.supplier.store_type == 20">自营</view>
					{{ detail.product_name }}
				</view>
				<view class="product-describe" v-if="detail.selling_point">{{ detail.selling_point }}</view>
			</view>
			<view class="o-h p-0-30 bg-white mb21 pb44" v-if="show_discount">
				<!--已选择-->
				<view class="already-choice" @click="openCoupon()">
					<view class="group-hd d-b-s" style="height: auto;">
						<view class="left"><text class="min-name gray3">优惠：</text></view>
					</view>
					<view class="d-b-c">
						<view class="flex-1">
							<view class="pb20 line-h-50 f26 gray3 " v-if="discount.give_points > 0">
								<text class="text-box">返{{ points_name() }}</text>
								商城购物返{{ points_name() }}，订单完成后最高返{{ discount.give_points }}{{ points_name() }}
							</view>
							<view class="flex-1 d-b-c" v-if="discount.product_coupon.length > 0">
								<view class="f26 gray3 line-h-50 pb20 flex-1">
									<view class=" d-b-c">
										<text class="text-box ">领券</text>
										<view class="flex-1 text-coupon-list">
											<template v-for="(item, index) in discount.product_coupon" :key="index">
												<view class="ml20 text-coupon-box " v-if="index <= 2">
													<view class="text-coupon-left"></view>
													<view class="text-coupon">{{ item.name }}</view>
													<view class="text-coupon-right"></view>
												</view>
											</template>

										</view>
									</view>
								</view>
							</view>
						</view>
						<view><text class="icon iconfont icon-jiantou" style="color: #999999;font-size: 22rpx;"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="o-h p-0-30 bg-white mb21">
				<!--已选择-->
				<view class="already-choice" :class="detail.server != '' ? 'border-b-d9' : ''"
					v-if="detail.spec_type == 20" @click="openPopup(ispresale ? 'deposit' : 'order')">
					<view class="group-hd">
						<view class="left"><text class="min-name gray9">选择：</text></view>
						<view class="flex-1 p-0-20 center-content f28 text-ellipsis o-h">{{ alreadyChioce }}</view>
						<view class="right"><text class="icon iconfont icon-jiantou"
								style="font-size: 22rpx;color: #9A9A9A;"></text></view>
					</view>
				</view>
			</view>

			<!--评价-->
			<view class="product-comment">
				<view class="p-0-30 d-b-c">
					<view class="group-hd left">
						<text class="min-name f28">评价({{ detail.comment_data_count }})</text>
					</view>
					<view class="right" @click="lookEvaluate(detail.product_id)">
						<text class="more">查看全部</text>
						<text class="icon iconfont icon-jiantou" style="font-size: 22rpx;color: #9A9A9A;"></text>
					</view>
				</view>
				<view class="comment-list" v-if="detail.comment_data_count > 0">
					<view class="item" v-if="index <= 1" v-for="(item, index) in detail.commentData" :key="index">
						<view class="cmt-user">
							<view class="left">
								<image class="photo" :src="item.user.avatarUrl" mode="aspectFill"></image>
								<text class="name">{{ item.user.nickName }}</text>
							</view>
							<text class="datetime">{{ item.create_time }}</text>
						</view>
						<view class="mt20 lh150 f24">{{ item.content }}</view>
					</view>
				</view>
			</view>
			<!-- 商户信息 -->
			<view class="shop_head_info" v-if="store_open">
				<view class="shop_list_body_item_shop">
					<view class="shop_list_body_item_shop_logo">
						<image :src="shop_info.logos" mode=""></image>
					</view>
					<view class="shop_list_body_item_shop_info flex-1">
						<view class="f32 title fb">{{ shop_info.name }}</view>
						<view class="f26 brand gray9">主营品牌： {{ shop_info.category_name }}</view>
						<view class="f26 sales gray9">销量：{{ shop_info.product_sales }}件</view>
					</view>
					<view class="shop_list_body_item_shop_others">
						<view class="f26 collect">
							商户评分：
							<text class="fb">{{ shop_info.server_score }}</text>
						</view>
						<button class="theme-borderbtn" @click="goto_shop()">进店看看</button>
					</view>
				</view>
			</view>
			<!--详情内容-->
			<view class="product-content">
				<view class="p-0-30  border-b-e">
					<view class="group-hd d-s-c"><text class="min-name f28">商品介绍</text></view>
				</view>
				<view v-if="detail.is_picture == 0" class="content-box" v-html="detail.content"></view>
				<view v-if="detail.is_picture == 1" class="content-box">
					<view class="ww100" v-for="(item, index) in detail.contentImage" :key="index">
						<image class="ww100" :src="item.file_path" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="sage-bottom"></view>
		</scroll-view>

		<!--底部按钮-->
		<view class="btns-wrap">
			<view class="icon-box d-c-c" @click="gotoPage('/pages/index/index')">
				<button class="d-c-c d-c bg-white">
					<text class="btn_btom pr icon iconfont icon-Homehomepagemenu gray3"
						style="height: 50rpx;line-height: 60rpx;"></text>
					<text class="f22 gray3" style="height: 50rpx;line-height: 40rpx;">首页</text>
				</button>
			</view>
			<!-- 购物车 -->
			<view class="icon-box d-c-c" @click="gotoPage('/pages/cart/cart')">
				<button class="pr d-c-c d-c bg-white">
					<text class="gray3 icon iconfont icon-gouwuche1"
						style="font-size: 36rpx;height: 50rpx;line-height: 60rpx;"></text>
					<text class="f22 gray3" style="height: 50rpx;line-height: 40rpx;">购物车</text>
					<text v-if="cart_total_num > 0" class="cart_num">{{ cart_total_num }}</text>
				</button>
			</view>
			<view v-if="service_open" class="icon-box d-c-c" @click="openService">
				<button class="d-c-c d-c bg-white">
					<text class="icon iconfont icon-kefu2 gray3" style="height: 50rpx;line-height: 60rpx;"></text>
					<text class="f22 gray3" style="height: 50rpx;line-height: 40rpx;">客服</text>
				</button>
			</view>
			<template v-if="is_preview == 1">
				<button class="add-cart-no" style="border-radius: 40rpx;margin-right: 20rpx;">暂未开始售卖</button>
			</template>
			<template v-else>
				<button v-if="!room_id == true && !is_virtual && !ispresale" class="add-cart"
					@click="openPopup('card')">加入购物车</button>
				<button v-else class="add-cart-no">加入购物车</button>
				<button class="buy" @click="openPopup('order')">立即购买</button>
			</template>
		</view>

		<!--购物确定-->
		<spec :isPopup="isPopup" :productModel="productModel" @close="closePopup" :room_id="room_id"></spec>
		<!--底部弹窗-->
		<share :isbottmpanel="isbottmpanel" :product_id="product_id" @close="closeBottmpanel"></share>
		<!-- 保障弹窗 -->
		<guarantee :isguarantee="isguarantee" :server="detail.server" @close="closeGuarantee"></guarantee>
		<!--生成图片-->
		<uniPopup :show="isCreatedImg" type="middle" @hidePopup="hidePopupFunc">
			<view class="d-c-c d-c create-img">
				<image :src="poster_img" mode="widthFix"></image>
				<!-- #ifdef MP -->
				<button class="btn-red mt20" type="default" @click="savePosterImg">保存图片</button>
				<!-- #endif  -->
				<!-- #ifdef H5 -->
				<view class="mt20 f34 red" type="default">长按保存图片</view>
				<!-- #endif -->
			</view>
		</uniPopup>

		<!--客服-->
		<Mpservice v-if="isMpservice" :isMpservice="isMpservice" :shopSupplierId="shop_supplier_id"
			@close="closeMpservice"></Mpservice>
		<!--优惠券-->
		<coupon :isCoupon="isCoupon" :discount="discount" :couponList="discount.product_coupon"
			@close="closeCouponFunc"></coupon>
	</view>
</template>

<script>
	import share from './popup/share.vue';
	import guarantee from '@/components/guarantee.vue';
	import coupon from './popup/coupon.vue';
	import spec from './popup/spec.vue';
	import uniPopup from '@/components/uni-popup.vue';
	import Mpservice from '@/components/mpservice/Mpservice.vue';
	import utils from '@/common/utils.js';
	import Countdown from '@/components/countdown/countdown-presale.vue';
	import previewProduct from './productinfo/previewProduct.vue';
	export default {
		components: {
			spec,
			share,
			uniPopup,
			Mpservice,
			guarantee,
			coupon,
			Countdown,
			previewProduct
		},
		data() {
			return {
				ispresale: false,
				statusBarHeight: 0,
				titleBarHeight: 0,
				store_open: 1,
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*是否加载完成*/
				loadding: true,
				/*是否显示面板指示点*/
				indicatorDots: true,
				/*是否知道切换*/
				autoplay: false,
				/*自动切换时间间隔*/
				interval: 2000,
				/*滑动动画时长*/
				duration: 500,
				/*是否确定购买弹窗*/
				isPopup: false,
				/*商品id*/
				product_id: null,
				/*商品详情*/
				detail: {
					product_sku: {},
					show_sku: {
						product_price: '',
						product_sku_id: 0,
						line_price: '',
						stock_num: 0,
						sku_image: ''
					}
				},
				/*商品属性*/
				specData: null,
				/*子级页面传参*/
				productModel: {},

				buyNow: false,
				url: '',
				/*规格数组*/
				productSpecArr: [],
				/*购物车商品数量*/
				cart_total_num: 0,
				/*分享*/
				isbottmpanel: false,
				isguarantee: false,
				/*是否生成图片*/
				isCreatedImg: false,
				poster_img: '',
				/*是否打开客服*/
				isMpservice: false,
				/*已经选择的规格*/
				alreadyChioce: '',
				shop_info: '', //商户信息
				isfollow: '', //是否收藏商品
				shop_supplier_id: '', //商户ID
				serverList: '', //保障
				room_id: '',
				service_open: 1,
				service_type: 0,
				user_id: 0,
				is_virtual: 1,
				couponList: [],
				isCoupon: false,
				middle: 1,
				isVideoPlay: false,
				show_discount: '',
				discount: {
					product_coupon: [],
					give_points: ''
				},
				/* 活动字段 */
				activeName: '',
				activePrice: '',
				activeText: '',
				skuName: '',
				is_preview: 0
			};
		},
		onLoad(e) {
			/*商品id*/
			this.GetStatusBarHeight();
			let scene = utils.getSceneData(e);
			this.user_id = uni.getStorageInfoSync('user_id');
			this.room_id = e.room_id;
			this.product_id = e.product_id ? e.product_id : scene.gid;
			//#ifdef H5
			if (this.isWeixin()) {
				this.url = window.location.href;
			}
			//#endif
		},
		onReady() {
			this.init();
			/*获取产品详情*/
			this.getData();
		},
		methods: {
			GetStatusBarHeight() {
				// #ifdef MP-WEIXIN
				let that = this;
				const SystemInfo = uni.getSystemInfoSync();
				let statusBarHeight = SystemInfo.statusBarHeight;
				this.statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
				this.titleBarHeight = uni.getMenuButtonBoundingClientRect().height;
				// #endif
				// #ifndef MP-WEIXIN
				const SystemInfo = uni.getSystemInfoSync();
				this.statusBarHeight = SystemInfo.statusBarHeight;
				this.titleBarHeight = 30;
				// #endif
			},
			/*初始化*/
			init() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.btns-wrap');
						view.boundingClientRect(data => {
							let h = _this.phoneHeight - data.height;
							//#ifdef MP-WEIXIN
							h = _this.phoneHeight;
							//#endif
							_this.scrollviewHigh = h;
						}).exec();
					}
				});
			},

			/*获取数据*/
			getData() {
				let self = this;
				let product_id = self.product_id;
				uni.showLoading({
					title: '加载中'
				});
				self._get(
					'product.product/detail', {
						product_id: product_id,
						url: self.url,
						visitcode: self.getVisitcode()
					},
					function(res) {
						console.log(res.data.detail.is_preview == 1 && new Date().valueOf() / 1000 < res.data.detail
							.preview_time);
						if (res.data.detail.is_preview == 1 && new Date().valueOf() / 1000 < res.data.detail
							.preview_time) {
							/* 是否在预告中 */
							self.is_preview = res.data.detail.is_preview;
							self.activeText = '预告';
							self.activeName = 'preview';
							self.activePrice = 'preview_price';
							res.data.detail.preview = {
								start_time: new Date().valueOf() / 1000,
								end_time: res.data.detail.preview_time
							};
						} else if (res.data.detail.advance && res.data.detail.advance != null) {
							self.ispresale = true;
							self.activeName = 'advance';
							self.activeText = '预售';
							self.activePrice = 'advance_price';
							self.skuName = 'sku';
						} else if (res.data.detail.secKill && res.data.detail.secKill != null) {
							self.ispresale = true;
							self.activeName = 'secKill';
							self.activeText = '秒杀';
							self.activePrice = 'seckill_price';
							self.skuName = 'seckillSku';
							res.data.detail.secKill.start_time = res.data.detail.secKill.active.start_time;
							res.data.detail.secKill.end_time = res.data.detail.secKill.active.end_time;
						}
						self.shop_supplier_id = res.data.detail.supplier.shop_supplier_id;
						self.shop_info = res.data.detail.supplier;
						self.isfollow = res.data.detail.isfollow;
						self.is_virtual = res.data.detail.is_virtual;
						self.couponList = res.data.couponList;
						if (res.data.mp_service == null) {
							self.service_type = 10;
						} else {
							self.service_type = res.data.mp_service.service_type;
						}
						self.cart_total_num = res.data.cart_total_num;
						//#ifdef MP-WEIXIN
						self.store_open = res.data.store_open;
						//#endif
						/*详情内容格式化*/
						res.data.detail.content = utils.format_content(res.data.detail.content);

						// 初始化商品多规格
						if (self.activeName && self.activeName != 'advance') {
							if (res.data.detail[self.activeName].specData) {
								self.initSpecData(res.data.detail[self.activeName].specData);
							}
						} else {
							if (res.data.detail.spec_type == 20) {
								self.initSpecData(res.data.specData);
							}
						}
						self.detail = res.data.detail;
						self.show_discount = res.data.show_discount;
						self.discount = res.data.discount;
						// 配置微信分享参数
						//#ifdef H5
						if (self.url != '') {
							let params = {
								product_id: self.product_id
							};
							self.configWx(res.data.share.signPackage, res.data.share.shareParams, params); 
						}
						//#endif
						self.loadding = false;
						uni.hideLoading();
					}
				);
			},
			/*多规格商品*/
			initSpecData(data) {
				for (let i in data.spec_attr) {
					for (let j in data.spec_attr[i].spec_items) {
						data.spec_attr[i].spec_items[j].checked = false;
					}
				}
				this.specData = data;
				if (this.specData.spec_attr) {
					this.specData.spec_attr.forEach(item => {
						this.alreadyChioce += item.group_name;
						this.alreadyChioce += ' / ';
					});
					this.alreadyChioce = this.alreadyChioce.replace(/(\s\/\s)$/gi, '');
				}
			},

			/*选规格*/
			openPopup(e) {
				let obj = {
					specData: this.specData,
					detail: this.detail,
					productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
					show_sku: {
						sku_image: '',
						price: 0,
						product_sku_id: 0,
						line_price: 0,
						stock: 0,
						product_sku_id: 0,
						sum: 1
					},
					plus_sku: null,
					type: e,
					plus_name: ''
				};
				if (this.activeName == 'advance') {
					obj.plus_sku = this.detail.advance.sku;
					obj.plus_name = 'advance';
				}
				if (this.activeName == 'secKill') {
					obj.plus_sku = this.detail.secKill.seckillSku;
					obj.plus_name = 'seckill';
				}
				this.productModel = obj;
				this.isPopup = true;
			},

			/*关闭弹窗*/
			closePopup(e, cart_total_num) {
				this.isPopup = false;
				if (e && e.spec_attr) {
					this.alreadyChioce = '';
					let has = '已选：';
					let noone = '';
					e.spec_attr.forEach(item => {
						if (item.spec_items) {
							let h = '';
							for (let i = 0; i < item.spec_items.length; i++) {
								let child = item.spec_items[i];
								if (child.checked) {
									h = child.spec_value + ' / ';
									break;
								}
							}
							if (h != '') {
								has += h;
							} else {
								noone += item.group_name;
							}
						}
					});
					if (noone != '') {
						this.alreadyChioce = noone;
					} else {
						has = has.replace(/(\s\/\s)$/gi, '');
						this.alreadyChioce = has;
					}
				}
				if (cart_total_num) {
					this.cart_total_num = cart_total_num;
				}
			},

			/*查看更多评价*/
			lookEvaluate(product_id) {
				this.gotoPage('/pages/product/detail/look-evaluate/look-evaluate?product_id=' + product_id);
			},

			/*分享*/
			onShareAppMessage() {
				let self = this;
				// 构建页面参数
				let params = self.getShareUrlParams({
					product_id: self.product_id
				});
				return {
					title: self.detail.product_name,
					path: '/pages/product/detail/detail?' + params
				};
			},
			goback() {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				console.log(routes.length);
				if (routes.length <= 1) {
					this.gotoPage('/pages/index/index');
				} else {
					uni.navigateBack();
				}
			},
			/*跳转购物车*/
			gotocart() {
				this.gotoPage('/pages/cart/cart');
			},

			//关闭分享
			closeBottmpanel(data) {
				this.isbottmpanel = false;
				if (data.type == 2) {
					this.poster_img = data.poster_img;
					this.isCreatedImg = true;
				}
			},
			closeGuarantee() {
				this.isguarantee = false;
			},
			showGuarantee() {
				this.isguarantee = true;
			},
			//分享按钮
			showShare() {
				let self = this;
				//#ifndef APP-PLUS
				self.isbottmpanel = true;
				//#endif
			},
			//关闭生成图片
			hidePopupFunc() {
				this.isCreatedImg = false;
			},

			//保存海报图片
			savePosterImg() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				// 下载海报图片
				uni.downloadFile({
					url: self.poster_img,
					success(res) {
						uni.hideLoading();
						// 图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(data) {
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
								// 关闭商品海报
								self.isCreatedImg = false;
							},
							fail(err) {
								if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
									uni.showToast({
										title: '请允许访问相册后重试',
										icon: 'none',
										duration: 1000
									});
									setTimeout(() => {
										uni.openSetting();
									}, 1000);
								}
							},
							complete(res) {
								console.log('complete');
							}
						});
					}
				});
			},
			openCoupon() {
				this.isCoupon = !this.isCoupon;
			},
			/*打开客服*/
			openService() {
				if (this.service_type == 10) {
					this.isMpservice = true;
				}
				if (this.service_type == 20) {
					this.gotoPage(
						'/pagesPlus/chat/chat?user_id=' +
						this.shop_info.supplier_user_id +
						'&product_id=' +
						this.product_id +
						'&shop_supplier_id=' +
						this.shop_info.shop_supplier_id +
						'&nickName=' +
						this.shop_info.name
					);
				}
			},

			/*关闭客服*/
			closeMpservice() {
				this.isMpservice = false;
			},
			/*关闭优惠券*/
			closeCouponFunc(e) {
				this.isCoupon = false;
			},
			//跳转商户首页
			goto_shop() {
				let self = this;
				self.gotoPage('/pages/shop/shop?shop_supplier_id=' + self.shop_supplier_id);
			},
			//收藏商品
			favorite() {
				let self = this;
				self._post(
					'user.Favorite/add', {
						pid: self.product_id,
						type: 20
					},
					res => {
						if (self.isfollow == 0) {
							uni.showToast({
								icon: 'none',
								title: '收藏成功，请到“我的->我的收藏”查看和管理哦'
							});
							self.isfollow = 1;
						} else if (self.isfollow == 1) {
							self.isfollow = 0;
							uni.showToast({
								icon: 'none',
								title: '取消成功'
							});
						}
					}
				);
			},
			changeSwiper() {
				this.isVideoPlay = false;
			},
			returnValFunc(e) {},
			sendFunc(e) {
				this[e]();
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.product-detail {}

	.product-detail .product-pic,
	.product-detail .product-pic .swiper,
	.product-detail .product-pic image {
		width: 750rpx;
		height: 750rpx;
	}

	.product-detail .price-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-detail .price-wrap .left {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.product-detail .price-wrap .new-price {
		@include font_color('price_color');
		font-size: 30rpx;
		font-weight: bold;
		margin-right: 14rpx;
	}

	.fn {
		font-weight: normal;
	}

	.product-detail .price-wrap .new-price .num {
		padding: 0 4rpx;
		font-size: 40rpx;
	}

	.product-detail .price-wrap .old-price {
		font-size: 26rpx;
		color: #999999;
		text-decoration: line-through;
	}

	// .product-detail .price-wrap .is-user-grade {
	// 	padding: 0 10rpx;
	// 	border-radius: 12rpx;
	// 	margin-left: 10rpx;
	// 	border: 2rpx solid $dominant-color;
	// 	color: $dominant-color;
	// }

	.product-detail .already-sale {
		font-size: 24rpx;
		color: #999999;
	}

	.product-detail .product-name {
		padding-top: 26rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
	}

	.scroll-box {
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
	}

	.product-detail .product-describe {
		padding: 18rpx;
		line-height: 40rpx;
		font-size: 26rpx;
		color: #666666;
		word-break: break-all;
		margin-top: 28rpx;
	}

	.already-choice {
		background: #ffffff;
	}

	.already-choice .center-content {
		// line-height: 90rpx;
	}

	.product-comment,
	.product-content {
		margin-top: 20rpx;
		background: #ffffff;
	}

	.product-content .content-box p image {
		width: 100%;
	}

	.product-content .content-box {
		font-size: 36rpx;
	}

	.sage-bottom {
		width: 100%;
		height: calc(100rpx + env(safe-area-inset-bottom));
	}

	.btns-wrap {
		position: fixed;
		height: 100rpx;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		background: #ffffff;
		align-items: center;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.btns-wrap .icon-box {
		width: 92rpx;
		height: 100rpx;
	}

	.btns-wrap .icon-box .iconfont {
		font-size: 40rpx;
		color: #888888;
	}

	.btns-wrap .icon-box .iconfont .num {
		position: absolute;
		top: 10rpx;
		left: 50%;
		height: 30rpx;
		min-width: 30rpx;
		overflow: hidden;
		line-height: 32rpx;
		border-radius: 15rpx;
		font-size: 20rpx;
		color: #ffffff;
		background: red;
	}

	.btns-wrap button,
	.btns-wrap button:after {
		height: 100rpx;
		line-height: 100rpx;
		margin: 0;
		padding: 0;
		flex: 1;
		border-radius: 0;
		border: 0;
	}

	.btns-wrap button.add-cart {
		font-size: 28rpx;
		width: 214rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		margin-left: 17rpx;
		@include font_color('text_color2');
		@include background_linearmore('cart_left1', 'cart_left2', 'left_deg', 0%, 100%);
	}

	.btns-wrap button.add-cart-no {
		font-size: 28rpx;
		width: 214rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		color: #ffffff;
		margin-left: 17rpx;
		background: #cccccc;
	}

	.btns-wrap button.buy {
		font-size: 28rpx;
		width: 214rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-top-right-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		margin-right: 30rpx;
		@include font_color('text_color1');
		@include background_linearmore('cart_right1', 'cart_right2', 'right_deg', 0%, 100%);
	}

	.btns-wrap button.buy.ispresale {
		line-height: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.red {
		color: #f6220c !important;
	}

	.shoucang-box {
		position: fixed;
		padding-right: 10rpx;
		width: 80rpx;
		height: 80rpx;
		right: 0;
		bottom: 270rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx 0 0 16rpx;
		background: rgba(0, 0, 0, 0.8);
	}

	.shoucang-box button {
		padding: 0;
		background: 0;
		line-height: 60rpx;
	}

	.shoucang-box .iconfont {
		margin-bottom: 10rpx;
		font-size: 50rpx;
		color: #ffffff;
		position: relative;
		top: 5rpx;
	}

	.share-box {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		right: 0;
		bottom: -16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share-box button {
		padding: 0;
		background: 0;
		line-height: 60rpx;
		border-radius: 0;
	}

	.share-box .iconfont {
		margin-bottom: 10rpx;
		font-size: 50rpx;
		color: #ffffff;
	}

	.sc-box {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		right: 78rpx;
		bottom: -16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sc-box button {
		padding: 0;
		background: 0;
		line-height: 60rpx;
		border-radius: 0;
	}

	.sc-box .iconfont.icon {
		font-size: 38rpx;
	}

	.create-img {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.create-img image {
		width: 100%;
	}

	.create-img button {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		box-shadow: 0 8rpx 16rpx 0 rgba(226, 35, 26, 0.6);
	}

	.shop_head_info {
		margin: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: white;
		border-radius: 12rpx;
	}

	.shop_list_body_item_shop {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
	}

	.shop_list_body_item_shop_logo {
		width: 120rpx;
		height: 120rpx;
	}

	.shop_list_body_item_shop_logo image {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 12rpx;
	}

	.shop_list_body_item_shop_info {
		box-sizing: border-box;
		margin-left: 20rpx;
		padding-top: 0;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.shop_list_body_item_shop_others {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		text-align: right;
		padding-top: 0;
	}

	.shop_list_body_item_shop_others button {
		width: 160rpx;
		height: 60rpx;
		border: 1rpx solid #f6220c;
		border-radius: 30rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #f6220c;
		text-align: center;
		padding: 0;
		background-color: #ffffff;
	}

	.h1 {
		font-size: 32rpx;
	}

	.h2 {
		font-size: 28rpx;
	}

	.h3 {
		font-size: 24rpx;
	}

	.h4 {
		font-size: 20rpx;
	}

	.h5 {
		font-size: 16rpx;
	}

	.h6 {
		font-size: 12rpx;
	}

	.collect text {
		color: #f6220c;
	}

	.store_type {
		display: inline-block;
		background-color: #f6220c;
		color: #ffffff;
		border-radius: 7rpx;
		font-weight: 200;
		height: 35rpx;
		line-height: 35rpx;
		font-size: 21rpx;
		padding: 0 10rpx;
		margin-right: 20rpx;
	}

	.share_img {
		width: 42rpx;
		height: 42rpx;
		margin: 0 auto;
		margin-bottom: 4rpx;
	}

	.share_img.img_gray {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}

	.share_text {
		line-height: 34rpx;
	}

	.reg180 {
		padding-right: 20rpx;
		text-align: center;
		transform: rotateY(180deg);
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.header {
		z-index: 99;
		position: fixed;
		height: 30px;
		line-height: 30px;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: var(--status-bar-height);
	}

	.header .reg180 .icon-jiantou {
		color: #ffffff;
		background: rgba($color: #000000, $alpha: 0.6);
		display: block;
		width: 44rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 50%;
	}

	.btn_btom {
		height: 90rpx;
		line-height: 45rpx;
	}

	.btnname {
		position: absolute;
		bottom: -16px;
		left: 0;
		right: 0;
	}

	.icon-dianpu1 {
		color: #333333;
	}

	.icon-kefu2 {
		color: #333333;
	}

	.coupon_item {
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 6rpx;
		background-color: #fff2f1;
		color: #f6220c;
		padding: 0 16rpx;
		text-align: center;
		font-size: 22rpx;
		margin-left: 10rpx;
	}

	.pro_nameline {
		width: 4rpx;
		height: 24rpx;
		background-color: #f6220c;
		margin-right: 12rpx;
	}

	.icon.icon-shoucang {
		font-size: 34rpx;
	}

	.icon-shoucang.gray3 {
		color: #333333;
	}

	.cart_num {
		position: absolute;
		background: #f6220c;
		width: 30rpx;
		height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		border-radius: 50%;
		color: #ffff;
		right: 4rpx;
		top: 4rpx;
	}

	.video {
		width: 100%;
		height: 100%;
	}

	.product-detail .product-pic .swiper .icon-bofang {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 48rpx;
		color: #ffffff;
		border-radius: 50%;
		border: 4rpx solid #ffffff;
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00000080;
		padding-left: 16rpx;
		box-sizing: border-box;
		z-index: 10;
	}

	.group-hd {
		position: relative;
		padding-left: 24rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.text-box {
			padding: 2rpx 6rpx;
			background-color: #fbe9e7;
			color: #fd5342;
			margin-right: 10rpx;
			border-radius: 4rpx;
			font-size: 20rpx;
			height: 32rpx;
			line-height: 32rpx;
		}
	}

	.group-hd.d-b-s {
		height: auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.text-box {
		padding: 2rpx 6rpx;
		background-color: #fbe9e7;
		color: #fd5342;
		margin-right: 10rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		height: 32rpx;
		line-height: 32rpx;
	}

	.group-hd::after {
		content: '';
		width: 8rpx;
		height: 33rpx;
		position: absolute;
		top: 30rpx;
		left: 0;
		@include background_linear('titleft1', 'titleft2', 180deg, 0%, 100%);
	}

	.hide.group-hd::after {
		width: 0;
	}

	.group-hd .line-h-90 {
		line-height: 90rpx;
	}

	.group-hd .line-h-50 {
		line-height: 50rpx;
	}

	.text-coupon-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.text-coupon-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 36rpx;
		border: 1rpx solid #dddddd;
		border-radius: 5rpx;
		position: relative;
		box-sizing: border-box;
		padding: 0 16rpx;
	}

	.text-coupon {
		color: #ff5649;
		font-size: 24rpx;
		line-height: 1.5;
	}

	.text-coupon-left {
		position: absolute;
		left: -5rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		border-right: 1rpx solid #dddddd;
		z-index: 0;
		background: #ffffff;
	}

	.text-coupon-right {
		position: absolute;
		right: -5rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		border-left: 1rpx solid #dddddd;
		z-index: 0;
		background: #ffffff;
	}

	/* 预售 */
	.product-detail .limited-spike {
		position: relative;
		z-index: 2;
		margin-top: -112rpx;
		padding: 0 35rpx;
		color: #ffffff;
		background: linear-gradient(140deg, #f11e0b 0%, #f77737 100%);
		border-radius: 15rpx;
		height: 278rpx;
		padding: 40rpx 21rpx;
		box-sizing: border-box;
	}

	.product-detail .limited-spike .left-name {
		font-size: 22rpx;
		color: #ffffff;
	}

	.product-detail .limited-spike .right-time {
		position: absolute;
		right: 20rpx;
		top: 58rpx;
	}

	.product-detail .limited-spike .right-time .jiantou {
		width: 20rpx;
		height: 20rpx;
		margin-left: 9rpx;
	}

	.mt-down-box {
		margin-top: -107rpx;
		z-index: 3;
		position: relative;
		border-radius: 15rpx;
		min-height: 68rpx;
	}

	.tips-box {
		margin-left: 8rpx;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 24rpx 0 14rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		font-weight: 500;
		color: #ffffff;
		background-color: rgba($color: #ffffff, $alpha: 0.45);
		border-radius: 20rpx;
	}

	.product-detail .product-presale {
		padding: 26rpx;
		line-height: 40rpx;
		font-size: 26rpx;
		color: #666666;
		background-color: rgba($color: #31c19e, $alpha: 0.1);
		border-radius: 12rpx;
		word-break: break-all;
		margin-top: 28rpx;
	}
</style>