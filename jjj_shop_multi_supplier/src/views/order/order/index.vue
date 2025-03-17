<template>
	<div class="user">
		<!--搜索表单-->
		<div class="common-seach-wrap">
			<el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item label="会员信息">
					<el-input v-model="searchForm.search" placeholder="请输入昵称|手机号|ID"></el-input>
				</el-form-item>
				<el-form-item label="订单号">
					<el-input size="small" v-model="searchForm.order_no" placeholder="请输入订单号"></el-input>
				</el-form-item>
				<el-form-item label="配送方式">
					<el-select size="small" v-model="searchForm.style_id" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in exStyle" :key="index" :label="item.name"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="门店地址">
					<el-select size="small" v-model="searchForm.store_id" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item, index) in shopList" :key="index" :label="item.store_name"
							:value="item.store_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="起始时间">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker size="small" v-model="searchForm.create_time" type="daterange"
							value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期"></el-date-picker>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="Search" @click="onSubmit">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="success" @click="onExport"
						v-auth="'/order/operate/export'">导出</el-button>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button size="small" type="warning" @click="showBatchDelivery"
						v-auth="'/order/operate/batchDelivery'">批量发货</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--内容-->
		<div class="product-content">
			<div class="table-wrap">
				<el-tabs v-model="activeName" @tab-change="handleClick">
					<el-tab-pane label="全部订单" name="all">
						<template #label>
							<span>全部订单</span>
						</template>
					</el-tab-pane>
					<el-tab-pane :label="'未付款'" name="payment">
						<template #label>
							<span>未付款 <el-tag size="small">{{order_count.payment}}</el-tag></span>
						</template>
					</el-tab-pane>
					<el-tab-pane :label="'待发货'" name="delivery">
						<template #label>
							<span>待发货 <el-tag size="small">{{order_count.delivery}}</el-tag></span>
						</template>
					</el-tab-pane>
					<el-tab-pane :label="'待收货'" name="received">
						<template #label>
							<span>待收货 <el-tag size="small">{{order_count.received}}</el-tag></span>
						</template>
					</el-tab-pane>
					<el-tab-pane :label="'待取消'" name="cancel">
						<template #label>
							<span>待取消 <el-tag size="small">{{order_count.cancel}}</el-tag></span>
						</template>
					</el-tab-pane>
					<el-tab-pane label="待评价" name="comment">
						<template #label>
							<span>待评价</span>
						</template>
					</el-tab-pane>
					<el-tab-pane label="已完成" name="complete">
						<template #label>
							<span>已完成</span>
						</template>
					</el-tab-pane>
				</el-tabs>
				<el-table size="small" :data="tableData.data" :span-method="arraySpanMethod" border style="width: 100%"
					v-loading="loading">
					<el-table-column prop="order_no" label="订单信息" width="400">
						<template #default="{ row }">
							<div class="order-code" v-if="row.is_top_row">
								<span class="state-text"
									:class="{'state-text-red':row.order_source != 10}">{{row.order_source_text}}</span>
								<span class="c_main">&nbsp;订单号：{{ row.order_no }}</span>
								<span class="pl16">下单时间：{{ row.create_time }}</span>
								<!--是否取消申请中-->
								<span class="pl16" v-if="row.order_status == 21">
									<el-tag effect="dark" size="mini">取消申请中</el-tag>
								</span>
							</div>
							<template v-else>
								<div class="product-info" v-for="(item, index) in row.product" :key="index">
									<div class="pic"><img v-img-url="item.image.file_path" alt="" /></div>
									<div class="info">
										<div class="name gray3 product-name">
											<span>{{ item.product_name }}</span>
										</div>
										<div class="gray9" v-if="item.product_attr">{{ item.product_attr }}</div>
										<div class="orange" v-if="item.refund">
											{{ item.refund.type.text }}-{{ item.refund.status.text }}
										</div>
									</div>
									<div class="d-c-c d-c">
										<div class="orange">￥ {{ item.product_price }}</div>
										<div class="gray3">x{{ item.total_num }}</div>
									</div>
								</div>
							</template>
						</template>
					</el-table-column>
					<el-table-column prop="pay_price" label="实付款">
						<template #default="{ row }">
							<div v-if="!row.is_top_row">
								<div class="orange" v-if="row.order_source!=70">{{ row.pay_price }}</div>
								<p class="orange" v-if="row.order_source==70">定金：{{ row.advance.pay_price }}</p>
								<p class="orange" v-if="row.order_source==70">尾款：{{ row.pay_price }}</p>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="" label="买家">
						<template #default="{ row }">
							<div v-if="!row.is_top_row">
								<div>{{ row.user.nickName }}</div>
								<div class="gray9">ID：({{ row.user.user_id }})</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="state_text" label="交易状态">
						<template #default="{ row }">
							<span v-if="!row.is_top_row">{{ row.state_text }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="pay_type.text" label="支付方式">
						<template #default="{ row }">
							<span v-if="!row.is_top_row" class="gray9">{{ row.pay_type.text }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="delivery_type.text" label="配送方式">
						<template #default="{ row }">
							<div v-if="!row.is_top_row">
								<span class="green">{{ row.delivery_type.text }}</span>
								<span v-if="row.delivery_type.value == 30">手机号:{{row.user.mobile}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="结算状态">
						<template #default="{ row }">
							<span v-if="row.is_settled == 0">未结算</span>
							<span v-if="row.is_settled == 1" class="green">已结算</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="210">
						<template #default="{ row }">
							<div v-if="!row.is_top_row">
								<el-button @click="addClick(row)" link type="primary" size="small"
									v-auth="'/order/order/detail'">订单详情
								</el-button>
								<el-button v-if="row.delivery_type.value==10&&row.delivery_status.value==20"
									@click="getLogistics(row)" link type="primary" size="small"
									v-auth="'/order/order/detail'">查看物流
								</el-button>
								<!-- <div v-if=""></div> -->
								<el-button v-if="row.pay_status.value == 20 && row.delivery_status.value == 10
                && row.order_status.value != 20 && row.order_status.value != 21
                && row.delivery_type.value == 10
                && !(row.assemble_status == 10 || row.assemble_status == 30)
                " @click="addClick(row)" link type="primary" size="small" v-auth="'/order/order/delivery'">
									去发货
								</el-button>
								<el-button v-if="row.pay_status.value == 20 && row.delivery_status.value == 10
                && row.order_status.value != 20 && row.order_status.value != 21
                && row.delivery_type.value == 20" @click="addClick(row)" link type="primary" size="small"
									v-auth="'/order/operate/extract'">
									去核销
								</el-button>
								<el-button v-if="row.pay_status.value == 20 && row.delivery_status.value == 10
                && row.order_status.value != 20 && row.order_status.value != 21
                && row.delivery_type.value == 30
                && !(row.assemble_status == 10 || row.assemble_status == 30)
                " @click="addClick(row)" link type="primary" size="small" v-auth="'/order/order/delivery'">
									去发货
								</el-button>
								<el-button v-if="row.pay_status.value == 20 && row.delivery_status.value == 10
                && row.order_status.value == 10" @click="cancelClick(row)" link type="primary" size="small"
									v-auth="'/order/order/orderCancel'">
									取消订单
								</el-button>
								<el-button v-if="row.order_status.value == 21" @click="addClick(row)" link
									type="primary" size="small" v-auth="'/order/operate/confirmCancel'">去审核</el-button>
								<el-button
									v-if="row.pay_type.value == 20 &&row.pay_status.value == 20 && row.delivery_status.value == 20 && row.order_status.value == 10 && row.wx_delivery_status==10 && row.pay_source=='wx'"
									@click="wxdeliveryClick(row)" link type="primary" size="small"
									v-auth="'/order/order/wxDelivery'">小程序发货</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!--分页-->
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
					:total="totalDataNumber"></el-pagination>
			</div>
		</div>
		<Logistics :logisticsData="logisticsData" :isLogistics="isLogistics" @closeDialog='closeLogistics'></Logistics>
		<el-dialog title="批量发货说明" v-model="dialogBatchDelivery" width="30%">
			<div>1、先按未发货条件筛选后，导出订单</div>
			<div>2、在导出excel中填写物流公司、物流单号，然后点批量发货导入填好的excel文件</div>
			<div>3、请检查物流公司是否已经添加到系统，<el-link type="primary" :underline="false" @click="gotoExpress()">查看</el-link>
			</div>
			<div style="padding-top: 20px;padding-bottom: 20px;text-align: center;">
				<el-upload class="avatar-uploader" ref="upload" action="string"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					:before-upload="onBeforeUploadImage" :http-request="UploadImage" :show-file-list="false">
					<el-button size="small" icon="Upload" type="primary">上传发货表格</el-button>
				</el-upload>
			</div>
		</el-dialog>
		<!--处理-->
		<Cancel v-if="open_edit" :open_edit="open_edit" :order_no="order_no"
			@closeDialog="closeDialogFunc($event, 'edit')">
		</Cancel>
	</div>
</template>

<script>
import {
	orderlist,
	queryLogistics,
	batchDelivery,
	wxDelivery
} from '@/api/order.js';
import Logistics from '@/components/logistics/viewLogistics.vue';
import qs from 'qs';
import Cancel from './dialog/cancel.vue';
import {
	useUserStore
} from '@/store';
const {
	token
} = useUserStore();
export default {
	components: {
		Cancel,
		Logistics
	},
	data() {
		return {
			/*切换菜单*/
			activeName: 'all',
			/*是否加载完成*/
			loading: true,
			/*列表数据*/
			tableData: [],
			/*一页多少条*/
			pageSize: 20,
			/*一共多少条数据*/
			totalDataNumber: 0,
			/*当前是第几页*/
			curPage: 1,
			/*横向表单数据模型*/
			searchForm: {
				search: '',
				order_no: '',
				style_id: '',
				store_id: '',
				create_time: '',
				token,
			},
			/*配送方式*/
			exStyle: [],
			/*门店列表*/
			shopList: [],
			/*时间*/
			create_time: '',
			/*统计*/
			order_count: {
				payment: 0,
				delivery: 0,
				received: 0,
				cancel: 0
			},
			isLogistics: false,
			logisticsData: {},
			dialogBatchDelivery: false,
			/*是否打开编辑弹窗*/
			open_edit: false,
			/*当前编辑的对象*/
			order_no: 0,
		};
	},
	created() {
		/*获取列表*/
		this.getData();
	},
	methods: {
		/*跨多列*/
		arraySpanMethod(row) {
			if (row.rowIndex % 2 == 0) {
				if (row.columnIndex === 0) {
					return [1, 8];
				}
			}
		},
		/*选择第几页*/
		handleCurrentChange(val) {
			let self = this;
			self.curPage = val;
			self.getData();
		},

		/*每页多少条*/
		handleSizeChange(val) {
			this.curPage = 1;
			this.pageSize = val;
			this.getData();
		},

		/*切换菜单*/
		handleClick(tab, event) {
			let self = this;
			self.curPage = 1;
			self.getData();
		},

		/*获取列表*/
		getData() {
			let self = this;
			let Params = this.searchForm;
			Params.dataType = self.activeName;
			Params.page = self.curPage;
			Params.list_rows = self.pageSize;
			self.loading = true;
			orderlist(Params, true)
				.then(res => {
					let list = [];
					for (let i = 0; i < res.data.list.data.length; i++) {
						let item = res.data.list.data[i];
						let topitem = {
							order_no: item.order_no,
							create_time: item.create_time,
							order_source: item.order_source,
							order_source_text: item.order_source_text,
							order_status: item.order_status.value,
							is_top_row: true
						};
						list.push(topitem);
						list.push(item);
					}
					self.tableData.data = list;
					self.totalDataNumber = res.data.list.total;
					self.exStyle = res.data.ex_style;
					self.shopList = res.data.shop_list;
					self.order_count = res.data.order_count.order_count;
					self.loading = false;
				})
				.catch(error => {});
		},
		/*打开取消*/
		cancelClick(item) {
			this.order_no = item.order_no;
			this.open_edit = true;
		},
		/*关闭弹窗*/
		closeDialogFunc(e, f) {
			if (f == 'edit') {
				this.open_edit = e.openDialog;
				if (e.type == 'success') {
					this.getData();
				}
			}
		},
		/*打开添加*/
		addClick(row) {
			let self = this;
			let params = row.order_id;
			self.$router.push({
				path: '/order/order/detail',
				query: {
					order_id: params
				}
			});
		},
		getLogistics(row) {
			let self = this;
			let Params = {
				order_id: row.order_id,
			};
			self.loading = true;
			queryLogistics(Params, true)
				.then(res => {
					self.loading = false;
					self.logisticsData = res.data.express.list;
					console.log(self.logisticsData);
					self.openLogistics();
				})
				.catch(error => {
					self.loading = false;
				});
		},
		openLogistics() {
			this.isLogistics = true;

		},
		closeLogistics() {
			this.isLogistics = false;
		},
		/*搜索查询*/
		onSubmit() {
			this.curPage = 1;
			this.tableData = [];
			this.getData();
		},
		onExport: function() {
			let url = '/index.php/supplier/order.operate/export';
			let params = this.searchForm;
			this.$filter.onExportFunc(url, params);
		},
		// 显示批量发货说明
		showBatchDelivery() {
			this.dialogBatchDelivery = true;
		},
		/*跳转物流公司*/
		gotoExpress() {
			let self = this;
			self.$router.push('/setting/express/index');
		},
		wxdeliveryClick(row) {
			let self = this;
			let order_id = row.order_id;
			ElMessageBox.confirm('确定发货吗?', '提示', {
				type: 'warning'
			}).then(() => {
				wxDelivery({
					order_id
				},
				true
				)
					.then(data => {
						self.loading = false;
						ElMessage({
							message: '恭喜你，操作成功',
							type: 'success'
						});
						self.getData();
					})
					.catch(error => {
						self.loading = false;
					});
			}).catch(() => {
				ElMessage({
					type: 'info',
					message: '已取消发货'
				});
			});

		},
		/*选择图片之前*/
		onBeforeUploadImage(file) {
			var fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
			const isEXCEL = fileType === 'xlsx';
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isEXCEL) {
				ElMessage.error('上传文件只能是excel格式!');
			}
			if (!isLt10M) {
				ElMessage.error('上传文件大小不能超过 10MB!');
			}
			return isEXCEL && isLt10M;
		},

		/*上传图片*/
		UploadImage(param) {
			let self = this;
			const loading = ElLoading.service({
				lock: true,
				text: '正在处理,请等待',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			const formData = new FormData();
			formData.append('iFile', param.file);
			batchDelivery(formData)
				.then(response => {
					loading.close();
					self.dialogBatchDelivery = false;
					ElMessage({
						message: response.msg,
						type: 'warning'
					});
				})
				.catch(response => {
					loading.close();
					ElMessage({
						message: '本次处理失败',
						type: 'warning'
					});
					param.onError();
				});
		},
	}
};
</script>
<style lang="scss">
	.product-info {
		padding: 10px 0;
		border-top: 1px solid #eeeeee;
	}

	.order-code .state-text {
		padding: 2px 4px;
		border-radius: 4px;
		background: #808080;
		color: #ffffff;
	}

	.order-code .state-text-red {
		background: red;
	}

	.table-wrap .product-info:first-of-type {
		border-top: none;
	}

	.table-wrap .el-table__body tbody .el-table__row:nth-child(odd) {
		background: #f5f7fa;
	}
</style>