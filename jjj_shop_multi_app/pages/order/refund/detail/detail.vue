<template>
	<view class="order-refund-detail pb100" v-if="!loadding" :data-theme='theme()' :class="theme() || ''">
		<!--售后状态-->
		<view class="order-state d-s-c">
			<view class="icon-box"><text class="icon iconfont icon-gantanhao"></text></view>
			<view class="state-cont flex-1">
				<view class="state-txt d-b-c">
					<text class="desc f34">{{detail.state_text}}</text>
				</view>
			</view>
			<view class="dot-bg"></view>
		</view>

		<!--商品信息-->
		<view class="p30 mt20 bg-white">
			<view class="one-product border-b-e d-s-c pb20">
				<view class="cover">
					<image :src="detail.orderproduct.image.file_path" mode="aspectFit"></image>
				</view>
				<view class="flex-1">
					<view class="pro-info">{{detail.orderproduct.product_name}}</view>
					<view class="pt10 p-0-30">
						<text class="f24 gray9">
							{{detail.orderproduct.product_attr}}
						</text>
					</view>
				</view>
			</view>
			<view class="d-e-c pt20 lh150">
				<view class="f24">
					商品金额：
					<text class="red">¥{{detail.orderproduct.total_price}}</text>
				</view>
			</view>
			<view class="d-e-c pt10 lh150">
				<view class="f24">
					订单实付金额：
					<text class="red">¥{{detail.orderproduct.total_pay_price}}</text>
				</view>
			</view>
			<view class="d-e-c pt10 lh150" v-if="detail.order_master.order_source==70">
				<view class="f24" v-if="detail.orderproduct.advance">
					定金({{detail.orderproduct.advance.money_return?'可退':'不可退'}})：
					<text class="red">¥{{detail.orderproduct.advance.pay_price}}</text>
				</view>
			</view>
		</view>

		<!-- 已退款金额 -->
		<view class="group bg-white" v-if=" detail.status.value == 20 ">
			<text class="gray9">已退款金额：</text>
			<text class="gray9">￥{{ detail.refund_money }}</text>
		</view>

		<!--申请售后信息-->
		<view class="group bg-white f24">
			<view class="p-20-0 border-b f34">
				申请退货信息
			</view>
			<view class="p-20-0 f28">
				<text class="gray9">售后类型：</text>
				<text>{{detail.type.text}}</text>
			</view>
			<view class="p-20-0 f28">
				<text class="gray9">申请原因：</text>
				<text>
					{{detail.apply_desc}}
				</text>
			</view>
			<view class="p-20-0 upload-list d-s-s f28">
				<text class="gray9">申请凭证：</text>
				<view class="d-s-s f-w">
					<block v-if="detail.image.length>0">
						<view class="item" v-for="(imgs,img_num) in detail.image" :key="img_num">
							<image :src="imgs.file_path" mode="aspectFit"></image>
						</view>
					</block>
					<block v-else>
						无
					</block>
				</view>
			</view>
		</view>

		<!-- 售后信息-->
		<view v-if="detail.plate_status.value != 0" class="group bg-white">
			<view class="p-20-0 border-b f34">
				平台处理结果:
			</view>
			<view class="p-20-0">
				<text class="red f28" v-if="detail.plate_status.value == 10">客服处理中</text>
				<text class="red f28" v-if="detail.plate_status.value == 20">平台已同意退款</text>
				<text class="red f28" v-if="detail.plate_status.value == 30">平台已拒绝退款</text>
			</view>
		</view>
		<view v-if="detail.status.value == 10" class="group bg-white">
			<view class="p-20-0 border-b f34">
				商家拒绝原因
			</view>
			<view class="p-20-0">
				<text class="red f28">{{ detail.refuse_desc }}</text>
			</view>
		</view>
		<!-- 平台拒绝原因 -->
		<view v-if="detail.plate_status.value == 30" class="group bg-white">
			<view class="p-20-0 border-b f34">
				平台拒绝原因
			</view>
			<view class="p-20-0">
				<text class="red f28">{{ detail.plate_desc }}</text>
			</view>
		</view>
		<!--退货地址-->
		<view class="group bg-white" v-if="detail.is_agree.value == 10&&detail.type.value != 30">
			<view class="p-20-0 border-b f34">
				退货地址
			</view>
			<view class="pt30 f28">
				<text class="gray9">收货人：</text>
				<text>{{detail.address.name}}</text>
			</view>
			<view class="pt30 f28">
				<text class="gray9">联系电话：</text>
				<text>{{detail.address.phone}}</text>
			</view>
			<view class="pt30 f28">
				<text class="gray9">详情地址：</text>
				<text>{{detail.address.detail}}</text>
			</view>
			<view class="pt30 f28" v-if="detail.express_no">
				<text class="gray9">物流公司：</text>
				<text>{{detail.express.express_name}}</text>
			</view>
			<view class="pt30 f28" v-if="detail.express_no">
				<text class="gray9">物流单号：</text>
				<text>{{detail.express_no}}</text>
			</view>
			<view class="pt30 f28" v-if="detail.is_plate_send">
				<text class="gray9">换货物流公司：</text>
				<text>{{detail.sendexpress.express_name}}</text>
			</view>
			<view class="pt30 f28" v-if="detail.is_plate_send"
				@click="gotoPage('/pages/order/express/refund-express?order_id=' + detail.order_refund_id);">
				<text class="gray9">换货物流单号：</text>
				<text>{{detail.send_express_no}}</text>
			</view>
			<view class="mt20 pb20 border-t gray9">
				<view class="pt20">
					· 未与卖家协商一致情况下，请勿寄到付或平邮
				</view>
				<view class="pt10">
					· 请填写真实有效物流信息
				</view>
			</view>
		</view>
		<!-- 填写物流信息 -->
		<form @submit="formSubmit"
			v-if="detail.status.value == 0 && detail.is_agree.value == 10 && detail.is_user_send == 0&&source=='user'"
			report-submit>
			<view class="group bg-white">
				<view class="p-20-0 border-b f34">
					填写物流信息
				</view>
				<view class="p-20-0 d-s-c">
					<view class="gray9">物流公司：</view>
					<view class="flex-1 p20 border">
						<picker mode="selector" @change="onExpressChange" :range="expressList" range-key="express_name"
							:value="index">
							<text v-if="index > -1 ">{{expressList[index].express_name}}</text>
							<text v-else class="col-80">请选择物流公司</text>
						</picker>
					</view>
				</view>
				<view class="p-20-0 d-s-c">
					<view class="gray9">物流单号：</view>
					<view class="flex-1 border">
						<input class="p10" placeholder="请填写物流单号" name="express_no" />
					</view>
				</view>
				<view class="mt20">
					<button class="btn-red" formType="submit">确认发货</button>
				</view>
			</view>
		</form>
		<!-- 填写物流信息 -->
		<form @submit="reReceipt"
			v-if="detail.type.value == 20 && detail.is_agree.value == 10 && detail.is_user_send == 1&&source!='user'&&detail.is_plate_send==0"
			report-submit>
			<view class="group bg-white">
				<view class="p-20-0 border-b f34">
					填写物流信息
				</view>
				<view class="p-20-0 d-s-c">
					<view class="gray9">物流公司：</view>
					<view class="flex-1 p20 border">
						<picker mode="selector" @change="onExpressChange" :range="expressList" range-key="express_name"
							:value="index">
							<text v-if="index > -1 ">{{expressList[index].express_name}}</text>
							<text v-else class="col-80">请选择物流公司</text>
						</picker>
					</view>
				</view>
				<view class="p-20-0 d-s-c">
					<view class="gray9">物流单号：</view>
					<view class="flex-1 border">
						<input class="p10" placeholder="请填写物流单号" name="send_express_no" />
					</view>
				</view>
				<view class="mt20">
					<button class="btn-red" formType="submit">确认发货</button>
				</view>
			</view>
		</form>
		<!--供应商退款审核-->
		<view class="group bg-white f24" v-if="detail.is_agree.value == 0&&source=='supplier'">
			<view class="p-20-0 border-b f34">
				<view class="mb20">审核</view>
				<view class="">
					<view class="f26 gray9">售后类型：<text class="gray3">{{detail.type.text}}</text></view>
					<view class="d-s-c mb20">
						<view class="make-top w120 mr10">
							<view class="gray9 f26">审核状态</view>
						</view>
						<radio-group class="d-a-c" @change="changeRadio($event)">
							<label class="d-s-c make-item ">
								<view>
									<radio style="transform:scale(0.7)" color="#ff6633" :checked="is_agree == 10"
										value="10" />
								</view>
								<view class="f26 color-57">同意</view>
							</label>
							<label class="d-s-c make-item ">
								<view>
									<radio style="transform:scale(0.7)" color="#ff6633" :checked="is_agree == 20"
										value="20" />
								</view>
								<view class="f26 color-57">拒绝</view>
							</label>
						</radio-group>
					</view>
					<view v-if="is_agree == 10 && detail.type.value != 30" class="d-s-c mb20">
						<picker mode="selector" @change="onAddressChange" :range="address" range-key="detail"
							:value="addressIndex">
							<text v-if="address_id !='' ">{{address[addressIndex].detail}}</text>
							<text v-else class="col-80">请选择退货地址</text>
						</picker>
					</view>
					<view v-if="is_agree == 20" class="d-s-c mb20">
						<view class="w120 mr10 f26">拒绝原因</view>
						<input type="text" class="make-item selectpicker input-box" v-model="refuse_desc" />
					</view>
					<view v-if="is_agree == 10 && detail.type.value == 30">
						<view class="d-s-c mb20">
							<view class="w120 mr10 f26">退款金额</view>
							<input type="text" class="make-item selectpicker input-box" v-model="refund_money" />
						</view>
						<view class="p-20-0 f28">
							<view class="red">
								请严格按照售后理赔标准进行赔付,避免买家对赔付有异议,请输入退款金额,最多{{detail.orderproduct.max_refund_money}}元</view>
							<view class="gray9">注：该操作将执行订单原路退款，并关闭当前售后单，请确认并填写，退款的金额(不能大于订单实付款)</view>
						</view>
					</view>
					<view class="mt20">
						<button class="btn-red" @click="sendRefund">确认审核</button>
					</view>
				</view>
			</view>
		</view>
		<!--供应商退款审核-->
		<view class="group bg-white f24"
			v-if="detail.type.value == 10 && detail.is_agree.value == 10 && detail.is_user_send == 1 && detail.is_receipt == 0&&source=='supplier'">
			<view class="p-20-0 border-b f34">
				<view class="mb20">审核</view>
				<view class="">
					<view class="f26 gray9">售后类型：<text class="gray3">{{detail.type.text}}</text></view>
					<view>
						<view class="d-s-c mb20">
							<view class="w120 mr10 f26">退款金额</view>
							<input type="text" class="make-item selectpicker input-box" v-model="refund_money" />
						</view>
						<view class="p-20-0 f28">
							<view class="red">
								请严格按照售后理赔标准进行赔付,避免买家对赔付有异议,请输入退款金额,最多{{detail.orderproduct.total_pay_price}}元</view>
							<view class="gray9">注：该操作将执行订单原路退款，并关闭当前售后单，请确认并填写，退款的金额(不能大于订单实付款)</view>
						</view>
					</view>
					<view class="mt20">
						<button class="btn-red" @click="sendReceipt">确认审核</button>
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
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				expressList: {},
				index: -1,
				order_refund_id: 0,
				/*退货详情*/
				detail: {
					address: {},
				},
				express_id: 0,
				/*消息模板*/
				temlIds: [],
				source: 'user',
				refuse_desc: '',
				refund_money: '',
				is_agree: 10,
				address: [],
				addressIndex: 0,
				address_id: ''
			}
		},
		onLoad(e) {
			this.order_refund_id = e.order_refund_id;
			this.source = e.source || 'user';
		},
		mounted() {
			/*获取详情*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self.loadding = true;
				uni.showLoading({
					title: '加载中'
				});
				let order_refund_id = self.order_refund_id;
				self._get(
					'user.refund/detail', {
						order_refund_id: order_refund_id,
						platform: self.getPlatform()
					},
					function(res) {
						self.loadding = false;
						uni.hideLoading();
						self.address = res.data.address;
						self.detail = res.data.detail;
						self.expressList = res.data.expressList;
						self.temlIds = res.data.template_arr;
					}
				);
			},
			/*选择物流*/
			onExpressChange: function(e) {
				this.index = e.detail.value;
				this.express_id = this.expressList[this.index].express_id;
			},
			/*选择物流*/
			onAddressChange: function(e) {
				this.addressIndex = e.detail.value;
				this.address_id = this.address[this.addressIndex].address_id;
				console.log(this.address_id)
			},
			/*发货*/
			formSubmit: function(e) {
				let self = this;
				var formdata = e.detail.value;
				formdata.order_refund_id = self.order_refund_id;
				formdata.express_id = self.express_id;
				let callback = function() {
					uni.showLoading({
						title: '正在提交',
						mask: true
					});
					self._post('user.refund/delivery', formdata, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.msg,
							duration: 3000,
							complete: function() {
								self.gotoPage(
									'/pages/order/refund/detail/detail?order_refund_id=' +
									self.order_refund_id);
							}
						});
					});
				};
				self.subMessage(self.temlIds, callback);
			},
			sendRefund() {
				let self = this;
				if (self.loadding) {
					return
				}
				self.loadding = true;
				if (self.refund_money > self.detail.orderproduct.total_pay_price) {
					self.showError('退款金额超过最大值');
					return;
				}
				if (self.is_agree == 10 && self.address_id == '' && self.detail.type.value != 30) {
					self.showError('请选择退货地址');
					return
				}
				let order_refund_id = self.order_refund_id;
				uni.showLoading({
					title: '提交中...'
				})
				self._post(
					'user.refund/audit', {
						order_refund_id: order_refund_id,
						is_agree: self.is_agree,
						refuse_desc: self.refuse_desc,
						order_refund_id: order_refund_id,
						refund_money: self.refund_money,
						address_id: self.address_id
					},
					function(res) {
						self.loadding = false;
						uni.hideLoading();
						self.getData();
						self.showSuccess('操作成功')
					},
					function(err) {
						self.loadding = false;
					}
				);
			},
			reReceipt(e) {
				let self = this;

				if (self.loadding) {
					return
				}
				var formdata = e.detail.value;
				formdata.order_refund_id = self.order_refund_id;
				formdata.send_express_id = self.express_id;
				formdata.refund_money = 0;
				self.loadding = true;
				let order_refund_id = self.order_refund_id;
				uni.showLoading({
					title: '提交中...'
				})
				self._post(
					'user.refund/receipt', formdata,
					function(res) {
						self.loadding = false;
						uni.hideLoading();
						self.getData();
						self.showSuccess('操作成功')
					},
					function(err) {
						self.loadding = false;
					}
				);
			},
			sendReceipt() {
				let self = this;
				if (self.loadding) {
					return
				}
				self.loadding = true;
				if (self.refund_money > self.detail.orderproduct.total_pay_price) {
					self.showError('退款金额超过最大值');
					return;
				}
				let order_refund_id = self.order_refund_id;
				uni.showLoading({
					title: '提交中...'
				})
				self._post(
					'user.refund/receipt', {
						order_refund_id: order_refund_id,
						refund_money: self.refund_money,
					},
					function(res) {
						self.loadding = false;
						uni.hideLoading();
						self.getData();
						self.showSuccess('操作成功')
					},
					function(err) {
						self.loadding = false;
					}
				);
			},
			changeRadio(e) {
				this.is_agree = e.detail.value;
			}
		}
	}
</script>

<style>
	.order-refund-detail .btn-red {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		box-shadow: 0 8rpx 16rpx 0 rgba(226, 35, 26, .6);
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

	.w120 {
		width: 120rpx;
	}
</style>
