<template>
	<view class="look-evaluate">
		<view class="top-tabbar">
			<view :class="state_active == -1 ? 'tab-item active' : 'tab-item'" @click="stateFunc(0)">全部({{ Total.all }})
			</view>
			<view :class="state_active == 10 ? 'tab-item active' : 'tab-item'" @click="stateFunc(10)">
				<view class="d-c-c">
					<text class="icon iconfont icon-pingjiahaoping"></text>
					<text class="ml10 gray9">好评({{ Total.praise }})</text>
				</view>
			</view>
			<view :class="state_active == 20 ? 'tab-item active' : 'tab-item'" @click="stateFunc(20)">
				<view class="d-c-c">
					<text class="icon iconfont icon-pingjiazhongping"></text>
					<text class="ml10 gray9">中评({{ Total.review }})</text>
				</view>
			</view>
			<view :class="state_active == 30 ? 'tab-item active' : 'tab-item'" @click="stateFunc(30)">
				<view class="d-c-c">
					<text class="icon iconfont icon-pingjiachaping"></text>
					<text class="ml10 gray9">差评({{ Total.negative }})</text>
				</view>
			</view>
		</view>

		<!--评论列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltolower="scrolltolowerFunc">
			<view class="comment-list">
				<view class="item" v-for="(item, index) in tableData" :key="index">
					<view class="cmt-user">
						<view class="left">
							<image class="photo" :src="item.users.avatarUrl" mode="aspectFill"></image>
							<text class="name">{{ item.users.nickName }}</text>
						</view>
					</view>
					<view class="d-b-c p20">
						<view class="d-s-c">
							<view v-if="item.score == 10" class="d-c-c mr20">
								<text class="icon iconfont icon-pingjiahaoping"></text>
								<text class="ml10 gray9">好评</text>
							</view>
							<view v-if="item.score == 20" class="d-c-c mr20">
								<text class="icon iconfont icon-pingjiazhongping"></text>
								<text class="ml10 gray9">中评</text>
							</view>
							<view v-if="item.score == 30" class="d-c-c mr20">
								<text class="icon iconfont icon-pingjiachaping"></text>
								<text class="ml10 gray9">差评</text>
							</view>
						</view>
						<text class="datetime gray9">{{ item.create_time }}</text>
					</view>
					<view class="p-0-20 f24 gray3">{{ item.content }}</view>
					<view class="imgs d-s-c p-0-20">
						<view class="box" v-for="(imgs, img_num) in item.image" :key="img_num">
							<image @click="preview(item.image,imgs.file_path)" :src="imgs.file_path" mode="aspectFill"
								width=""></image>
						</view>
					</view>
				</view>
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="tableData.length==0 && !loading">
					<view class="none-data-box">
						<image src="/static/none.png" mode="widthFix"></image>
						<text>亲，暂无相关记录哦</text>
					</view>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>
		<view v-if="isopenimg" class="popimg" @click="isopenimg=false">
			<image :src="popImg" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*选中状态*/
				state_active: -1,
				/*商品id*/
				product_id: 0,
				/*评论列表*/
				tableData: [],
				/*统计*/
				Total: {
					/*总数*/
					all: 0,
					/*score = 30*/
					negative: 0,
					/*score = 10*/
					praise: 0,
					/*score = 20*/
					negative: 0,
					review: 0
				},
				/*页码*/
				page: 1,
				list_rows: 15,
				no_more: false,
				loading: true,
				/*最后一页码数*/
				last_page: 0,
				popImg: '',
				isopenimg: false
			};
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.tableData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onLoad(e) {
			this.product_id = e.product_id;
		},
		mounted() {
			this.init();
			/*获取数据*/
			this.getData();
		},
		methods: {
			preview(list, img) {
				// #ifdef H5
				if (!this.isWeixin()) {
					this.isopenimg = true;
					this.popImg = img;
				}else{
					this.openImg(list, img);
				}
				return
				// #endif
				this.openImg(list, img);
			},
			openImg(list, img) {
				let arr = [];
				list.forEach((item, index) => {
					arr.push(item.file_path)
				})
				uni.previewImage({
					urls: arr,
					current: img,
					fail(err) {
						this.showError(err)
						console.log(err)
					}
				});
			},
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
				let _this = this;
				let product_id = _this.product_id;
				_this._get(
					'product.comment/lists', {
						product_id: product_id,
						scoreType: _this.state_active,
						page: _this.page,
						list_rows: _this.list_rows
					},
					function(res) {
						_this.loading = false;
						_this.Total = res.data.total;
						_this.tableData = _this.tableData.concat(res.data.list.data);
						_this.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							_this.no_more = true;
						}
					}
				);
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				self.bottomRefresh = true;
				self.page++;
				self.loading = true;
				if (self.page > self.last_page) {
					self.loading = false;
					self.no_more = true;
					return;
				}
				self.getData();
			},

			/*类别切换*/
			stateFunc(e) {
				let self = this;
				if (self.state_active != e) {
					self.tableData = [];
					self.no_more = false;
					self.loading = true;
					self.state_active = e;
					self.page = 1;
					self.getData();
				}
			}
		}
	};
</script>

<style>
	.look-evaluate .comment-list {
		background: #ffffff;
	}

	.look-evaluate .comment-list .item {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		border-top: none;
		border-bottom: 1px solid #dddddd;
	}

	.look-evaluate .iconfont {
		border-radius: 50%;
		font-size: 40rpx;
		text-align: center;
	}

	.look-evaluate .icon-pingjiahaoping {
		color: #f42222;
	}

	.look-evaluate .icon-pingjiazhongping {
		color: #f2b509;
	}

	.look-evaluate .icon-pingjiachaping {
		color: #999999;
	}

	.look-evaluate .imgs {
		flex-wrap: wrap;
	}

	.look-evaluate .imgs .box {
		margin-top: 10rpx;
		margin-right: 10rpx;
	}

	.look-evaluate .imgs .box:nth-child(3n) {
		margin-right: 0;
	}

	.look-evaluate .imgs .box,
	.look-evaluate .imgs .box image {
		width: 210rpx;
		height: 210rpx;
	}

	.popimg {
		position: fixed;
		width: 750rpx;
		height: 100vh;
		background-color: #000000;
		top: 0;
		left: 0;
		z-index: 2000;
	}
</style>
