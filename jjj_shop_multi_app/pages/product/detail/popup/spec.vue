<template>
	<view :class="Visible ? 'product-popup open' : 'product-popup close'" @touchmove.stop.prevent="" @click="closePopup">
		<view class="popup-bg"></view>
		<view class="main" v-on:click.stop>
			<view class="header">
				<image :src="form.show_sku.sku_image" mode="aspectFit" class="avt"></image>
				<view class="price">
					¥
					<text class="num">{{ form.show_sku.product_price }}</text>
					<text class="old-price" v-if="form.show_sku.line_price">¥{{ form.show_sku.line_price }}</text>
				</view>
				<view class="stock">库存：{{ form.show_sku.stock_num }}</view>
				<view class="select_spec">{{ selectSpec }}</view>
				<view class="close-btn" @click="closePopup"><text class="icon iconfont icon-guanbi"></text></view>
			</view>

			<view class="body">
				<!--规格-->
				<view>
					<scroll-view scroll-y="true" class="specs mt20" style="max-height: 600rpx;" v-if="form.specData != null">
						<view class="specs mt20" v-for="(item_attr, attr_index) in form.specData.spec_attr" :key="attr_index">
							<view class="specs-hd p-20-0">
								<text class="f26 gray3">{{ item_attr.group_name }}</text>
								<!-- 							<text class="ml10 red" v-if="form.productSpecArr[attr_index]==null">
								请选择{{item_attr.group_name}}
							</text> -->
							</view>
							<view class="specs-list">
								<button
									:class="item.checked ? 'btn-checked' : 'btn-checke'"
									v-for="(item, item_index) in item_attr.spec_items"
									:key="item_index"
									@click="selectAttr(attr_index, item_index)"
								>
									{{ item.spec_value }}
								</button>
							</view>
						</view>
					</scroll-view>
				</view>
				<!--选择数量-->
				<view class="level-box count_choose">
					<text class="key">数量</text>
					<view class="d-s-c">
						<view class="icon-box minus d-c-c" @click="sub()" :class="{ 'num-wrap': !issub }">
							<text class="icon iconfont icon-jian" style="font-size: 20rpx;color: #333333;"></text>
						</view>
						<view class="text-wrap"><input type="text" v-model="form.show_sku.sum"  /></view>
						<view class="icon-box plus d-c-c" :class="{ 'num-wrap': !isadd }" @click="add()">
							<text class="icon iconfont icon-jia" style="font-size: 20rpx;color: #333333;"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="btns">
				<button class="confirm-btn" v-if="!clock" @click="confirmFunc(form)">确认</button>
				<button class="confirm-btn" v-else>暂无库存</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*是否可见*/
			Visible: false,
			/*表单对象*/
			form: {
				detail: {},
				show_sku: {
					sku_image: ''
				}
			},
			/*当前商品总库存*/
			stock: 0,
			/*选择提示*/
			selectSpec: '',
			/*是否打开过多规格选择框*/
			isOpenSpec: false,
			type: '',
			clock: false
		};
	},
	props: ['isPopup', 'productModel','room_id'],
	onLoad() {},
	mounted() {},
	computed: {
		/*判断增加数量*/
		isadd: function() {
			return this.form.show_sku.sum >= this.stock || this.form.show_sku.sum >= this.form.detail.limit_num;
		},

		/*判断减少数量*/
		issub: function() {
			return this.form.show_sku.sum <= 1;
		}
	},
	watch: {
		isPopup: function(n, o) {
			if (n != o) {
				this.Visible = n;
				if (!this.isOpenSpec) {
					this.form = this.productModel;
					this.isOpenSpec = true;
					this.initShowSku();
				}
				this.form.type = this.productModel.type;
			}
		},
		'form.specData': {
			handler(n, o) {
				let str = '',
					select = '';
				this.isAll = true;
				if (n) {
					for (let i = 0; i < n.spec_attr.length; i++) {
						if (this.form.productSpecArr[i] == null) {
							this.isAll = false;
							str += n.spec_attr[i].group_name + ' ';
						} else {
							n.spec_attr[i].spec_items.forEach(item => {
								if (this.form.productSpecArr[i] == item.item_id) {
									select += '"' + item.spec_value + '" ';
								}
							});
						}
					}
					if (!this.isAll) {
						str = '请选择: ' + str;
					} else {
						select = '已选: ' + select;
					}
				}
				this.selectSpec = this.isAll ? select : str;
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		/*初始化*/
		initShowSku() {
			this.form.show_sku.sku_image = this.form.detail.image[0].file_path;
			this.form.show_sku.product_price = this.form.detail.product_price;
			if (this.form.detail.spec_type == 20) {
				if (this.form.detail.product_price != this.form.detail.product_max_price) {
					this.form.show_sku.product_price = this.form.detail.product_price + '-' + this.form.detail.product_max_price;
				}
			}
			this.form.show_sku.spec_sku_id = 0;
			this.form.show_sku.line_price = this.form.detail.line_price;
			this.form.show_sku.stock_num = this.form.detail.product_stock;
			this.form.show_sku.sum = 1;
			this.stock = this.form.detail.product_stock;
			if (this.form.plus_name == 'advance') {
				this.form.show_sku.product_price = this.form.plus_sku[0].product_price;
				this.form.show_sku.line_price = '';
				this.form.show_sku.sku_image = this.form.plus_sku[0].productSku.image ? this.form.plus_sku[0].productSku.image.file_path : this.form.detail.image[0].file_path;
				this.form.show_sku.stock_num = this.form.plus_sku[0].advance_stock;
				this.stock = this.form.plus_sku[0].advance_stock;
			}
			if (this.form.plus_name == 'seckill') {
				this.form.show_sku.product_price = this.form.plus_sku[0].seckill_price;
				this.form.show_sku.line_price = this.form.plus_sku[0].product_price;
				this.form.show_sku.sku_image = this.form.plus_sku[0].productSku.image ? this.form.plus_sku[0].productSku.image.file_path : this.form.detail.image[0].file_path;
				this.form.show_sku.stock_num = this.form.plus_sku[0].seckill_stock;
				this.stock = this.form.plus_sku[0].seckill_stock;
			}
		},

		/*选择属性*/
		selectAttr(attr_index, item_index) {
			let self = this;
			let items = self.form.specData.spec_attr[attr_index].spec_items;
			let curItem = items[item_index];
			if (curItem.checked) {
				curItem.checked = false;
				self.form.productSpecArr[attr_index] = null;
			} else {
				for (let i = 0; i < items.length; i++) {
					items[i].checked = false;
				}
				curItem.checked = true;
				self.form.productSpecArr[attr_index] = curItem.item_id;
			}
			for (let i = 0; i < self.form.productSpecArr.length; i++) {
				if (self.form.productSpecArr[i] == null) {
					self.initShowSku();
					return;
				}
			}

			// 更新商品规格信息
			self.updateSpecProduct();
		},

		/*更新商品规格信息*/
		updateSpecProduct() {
			let self = this;
			let specSkuId = self.form.productSpecArr.join('_');
			// 查找skuItem
			let spec_list = self.form.specData.spec_list;
			if (self.form.plus_sku != null) {
				spec_list = self.form.plus_sku;
			}
			let skuItem = spec_list.find(val => {
				if (self.form.plus_name) {
					return val.productSku.spec_sku_id == specSkuId;
				} else {
					return val.spec_sku_id == specSkuId;
				}
			});
			if (!skuItem) {
				self.clock = true;
				self.initShowSku();
				return;
			} else {
				self.clock = false;
			}
			if (self.form.plus_name&& !skuItem.spec_form) {
				skuItem.spec_form = skuItem.productSku;
			}
			// 记录spec_sku_id
			// 更新商品价格、划线价、库存
			if (typeof skuItem === 'object') {
				/*保存当前规格*/

				if (self.form.plus_name) {
					self.stock = skuItem[self.form.plus_name + '_stock'];
					if (self.form.show_sku.sum > self.stock) {
						self.form.show_sku.sum = self.stock > 0 ? self.stock : 1;
					}
				} else {
					self.stock = skuItem.spec_form.stock_num;
					if (self.form.show_sku.sum > self.stock) {
						self.form.show_sku.sum = self.stock > 0 ? self.stock : 1;
					}
				}
				self.form.show_sku.spec_sku_id = specSkuId;
				self.form.show_sku.product_price = skuItem.spec_form.product_price;
				self.form.show_sku.line_price = skuItem.spec_form.line_price;
				if (skuItem.spec_form.image_id > 0) {
					self.form.show_sku.sku_image = skuItem.spec_form.image_path;
				} else {
					self.form.show_sku.sku_image = self.form.detail.image[0].file_path;
				}
				self.form.show_sku.stock_num = skuItem.spec_form.stock_num;
				if (self.form.plus_name) {
					self.form.show_sku.product_price = skuItem.product_price;
					if (self.form.plus_name == 'seckill') {
						self.form.show_sku.product_price = skuItem.seckill_price;
					}
					self.form.show_sku.stock_num = skuItem[self.form.plus_name + '_stock'];
					self.form.show_sku.line_price = '';
					self.form.show_sku.sku_image = skuItem.spec_form.image?skuItem.spec_form.image.file_path : self.form.detail.image[0].file_path;
					self.form.show_sku.advance_product_id = skuItem.spec_form.image?skuItem.spec_form.image.file_path : self.form.detail.image[0].file_path
				}
			}
		},

		/*关闭弹窗*/
		closePopup() {
			this.$emit('close', this.form.specData, null);
		},

		/*确认提交*/
		confirmFunc() {
			if (this.form.specData != null) {
				for (let i = 0; i < this.form.productSpecArr.length; i++) {
					if (this.form.productSpecArr[i] == null) {
						uni.showToast({
							title: '请选择规格',
							icon: 'none',
							duration: 2000
						});
						return;
					}
				}
			}

			if (this.form.type == 'card') {
				this.addCart();
			} else {
				this.createdOrder();
			}
		},

		/*加入购物车*/
		addCart() {
			let self = this;
			let product_id = self.form.detail.product_id;
			let total_num = self.form.show_sku.sum;
			let spec_sku_id = self.form.show_sku.spec_sku_id;
			if (self.form.detail.spec_type == 20 && spec_sku_id == 0) {
				uni.showToast({
					title: '请选择属性',
					icon: 'none',
					duration: 2000
				});
				return false;
			}

			self._post(
				'order.cart/add',
				{
					product_id: product_id,
					total_num: total_num,
					spec_sku_id: spec_sku_id
				},
				function(res) {
					uni.showToast({
						title: res.msg,
						duration: 2000
					});
					self.$emit('close', null, res.data.cart_total_num);
				}
			);
		},

		/*创建订单*/
		createdOrder() {
			let product_id = this.form.detail.product_id;
			let product_num = this.form.show_sku.sum;
			let spec_sku_id = this.form.show_sku.spec_sku_id;
			let room_id = '';
			if ((this.room_id != 0) & (this.room_id != '')) {
				room_id = '&room_id=' + this.room_id;
			}
			console.log(room_id)
			let url = '/pages/order/confirm-order?product_id=' + product_id + '&product_num=' + product_num + '&product_sku_id=' + spec_sku_id + '&order_type=buy' + room_id;
			if (this.form.type == 'deposit') {
				if (this.form.plus_name == 'advance') {
					let skuItem = this.form.detail.advance.sku.find(val => {
						return val.productSku.spec_sku_id == spec_sku_id;
					});
					url =
						'/pages/order/confirm-order?product_id=' +
						product_id +
						'&product_num=' +
						product_num +
						'&product_sku_id=' +
						spec_sku_id +
						'&advance_product_sku_id=' +
						skuItem.advance_product_sku_id +
						'&advance_product_id=' +
						skuItem.advance_product_id +
						'&order_type=deposit';
				}
				if (this.form.plus_name == 'seckill') {
					let skuItem = this.form.detail.secKill.seckillSku.find(val => {
						return val.productSku.spec_sku_id == spec_sku_id;
					});
					url =
						'/pages/order/confirm-order?seckill_product_id=' +
						skuItem.seckill_product_id +
						'&product_num=' +
						product_num +
						'&product_sku_id=' +
						skuItem.productSku.spec_sku_id +
						'&seckill_product_sku_id=' +
						skuItem.seckill_product_sku_id +
						'&order_type=seckill';
				}
			}
			this.gotoPage(url);
		},

		/*商品增加*/
		add() {
			if (this.stock <= 0) {
				return;
			}
			if (this.form.show_sku.sum >= this.stock) {
				uni.showToast({
					title: '数量超过了库存',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.form.detail.limit_num > 0 && this.form.show_sku.sum >= this.form.detail.limit_num) {
				uni.showToast({
					title: '数量超过了限购数量',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			this.form.show_sku.sum++;
		},

		/*商品减少*/
		sub() {
			if (this.stock <= 0) {
				return;
			}
			if (this.form.show_sku.sum < 2) {
				uni.showToast({
					title: '商品数量至少为1',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			this.form.show_sku.sum--;
		}
	}
};
</script>

<style lang="scss">
.product-popup {
}

.product-popup .popup-bg {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 99;
}

.product-popup .main {
	position: fixed;
	width: 100%;
	bottom: 0;
	// min-height: 200rpx;
	// max-height: 1050rpx;
	background-color: #fff;
	transform: translate3d(0, 980rpx, 0);
	transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 99;
	border-radius: 12rpx;
}

.product-popup.open .main {
	transform: translate3d(0, 0, 0);
	z-index: 99;
}

.product-popup.close .popup-bg {
	display: none;
}

.product-popup.close .main {
	display: none;
	z-index: -1;
}

.product-popup .header {
	height: 200rpx;
	padding: 40rpx 0 10rpx 250rpx;
	position: relative;
	border-bottom: 1px solid #eeeeee;
}

.product-popup .header .avt {
	position: absolute;
	top: 40rpx;
	left: 30rpx;
	width: 180rpx;
	height: 180rpx;
	border: 2px solid #ffffff;
	background: #ffffff;
	border-radius: 12rpx;
}

.product-popup .header .stock {
	font-size: 26rpx;
	color: #999999;
}

.product-popup .close-btn {
	position: absolute;
	width: 40rpx;
	height: 40rpx;
	top: 40rpx;
	right: 30rpx;
}

.product-popup .price {
	@include font_color('price_color');
	font-size: 24rpx;
}

.product-popup .price .num {
	padding: 0 4rpx;
	font-size: 40rpx;
}

.product-popup .old-price {
	margin-left: 10rpx;
	font-size: 26rpx;
	color: #999999;
	text-decoration: line-through;
}

.product-popup .body {
	padding: 20rpx 30rpx 39rpx 30rpx;
	// max-height: 600rpx;
	overflow-y: auto;
}

.product-popup .level-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.product-popup .level-box .key {
	font-size: 24rpx;
	color: #999999;
}

.product-popup .level-box .icon-box {
	width: 48rpx;
	height: 40rpx;
	background: #e0e0e0;
}

.product-popup .num-wrap .iconfont {
	color: #666;
}

.product-popup .num-wrap.no-stock .iconfont {
	color: #cccccc;
}

.product-popup .level-box .text-wrap {
	margin: 0 4rpx;
	height: 60rpx;
	border: none;
	background: #ffffff;
}

.product-popup .level-box .text-wrap input {
	padding: 0 10rpx;
	height: 60rpx;
	line-height: 60rpx;
	width: 80rpx;
	font-size: 32rpx;
	text-align: center;
}

.specs .specs-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
}

.specs .specs-list button {
	margin-left: 0;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	font-size: 24rpx;
}

.specs .specs-list button:after,
.product-popup .btns button,
.product-popup .btns button:after {
	height: 88rpx;
	line-height: 88rpx;
	border: 0;
	border-radius: 0;
	margin-bottom: 55rpx;
}

.product-popup .btns .confirm-btn {
	width: 710rpx;
	height: 80rpx;
	@include background_linearmore('cart_right1', 'cart_right2', 'right_deg', 0%, 100%);
	border-radius: 40rpx;
	margin: 0 auto;
	margin-bottom: 55rpx;
	color: #ffffff;
	line-height: 80rpx;
	font-size: 32rpx;
}

.btn-checked {
	border: 1rpx solid #f6220c;
	@include border_color('background_color');
	border-radius: 6px;
	@include font_color('font_color');
	font-size: 26rpx;
	background-color: #ffffff;
}

.btn-checke {
	border: 1rpx solid #d9d9d9;
	border-radius: 6rpx;
	font-size: 26rpx;
	color: #333333;
	background-color: #ffffff;
}
</style>
