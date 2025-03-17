<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="list">
			<view class="listItem" v-for="(item,index) in list" :key="index">
				<view class="timeBox">
					<view class="time">
						<text class="data">{{ item.data }}</text>
						<text class="line"></text>
						<text class="mouth">{{ item.mouth }}<text class="unit">月</text></text>
						<text class="line"></text>
						<text class="year">{{ item.year }}<text class="unit">年</text></text>
					</view>
					<view class="delTxt" @click="del(item,index)">删除</view>
				</view>
				
				<view class="con">
					<view>{{ item.content }}</view>
					<image class="img" mode="aspectFit" :src="v.file_path" v-for="(v,idx) in item.image" :key="idx"></image>
				</view>
				<view class="prodcut" v-if="item.OrderProduct">
					<image v-if="item.OrderProduct.image" :src="item.OrderProduct.image.file_path" model="aspectFit"></image>
					<view class="r">
						<view class="title">{{ item.OrderProduct.product_name }}</view>
						<view class="spec">{{ item.OrderProduct.product_attr }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="d-c-c p30" v-if="list.length == 0 && !loading">
			<text class="iconfont icon-wushuju"></text>
			<text class="cont">亲，暂无相关记录哦</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				state_active: 0,
				list: [],
				last_page: 0,
				no_more: false,
				page: 1,
			}
		},
		onLoad: function(options) {
			// this.options = options;
		},
		onShow: function() {
			this.page = 1;
			this.list = [];
			uni.showLoading({
				title: '加载中'
			});
			/*获取地址列表*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._post(
					'product.comment/userLists',
					{
						page: self.page,
						list_rows: 10,
					},
					function(res) {
						if(res.data.list.data && res.data.list.data.length > 0){
							res.data.list.data.forEach((v)=>{
								v.year = v.create_time.substr(0,4);
								v.mouth = v.create_time.substr(5,2);
								v.data = v.create_time.substr(8,2);
							})
						}
						self.list = self.list.concat(res.data.list.data);
						self.last_page = res.data.lastPage;
						self.loading = false;
						if (self.last_page <= 1) {
							self.no_more = true;
							return false;
						}
						uni.hideLoading();
					}
				);
			},
			del(v,index){
				let self = this;
				wx.showModal({
					title: '提示',
					content: '您确定删除该评论吗?',
					success: function(o) {
						if (o.confirm) {
							self._post(
								'product.comment/delete',
								{
									comment_id: v.comment_id,
								},
								function(res) {
									uni.showToast({
										title: '删除成功',
										duration: 1000,
										icon: 'none'
									});
									self.list.splice(index,1)
								}
							);
						}
					}
				});
			},
			onReachBottom(){
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EBEBEB;
	}
	.list{
		padding: 20rpx;
	}
	.listItem{
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.timeBox{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.delTxt{
			color: #FD6A03;
		}
		.time{
			.unit{
				color:rgba(0,0,0,0.9);
				font-weight: 400;
			}
			text{
				font-size: 26rpx;
				color: #000000;
				font-weight: 800;
			}
			.data{
				font-size: 38rpx;
			}
			.line{
				width: 4rpx;
				height: 22rpx;
				background-color: #FD6A03;
				display: inline-block;
				margin: 0 6rpx;
				transform: rotate(18deg);
			}
		}
		.con{
			letter-spacing: 1rpx;
			line-height: 42rpx;
			margin: 60rpx 0 30rpx 0;
			.img{
				width: 200rpx;
				height: 200rpx;
				display: inline-block;
				margin-right: 20rpx;
			}
		}
		.prodcut{
			display: flex;
			align-items: center;
			background: rgba(235,235,235,0.8);
			font-size: 26rpx;
			image{
				width: 90rpx;
				height: 90rpx;
				margin-right: 6rpx;
				border-radius: 6rpx;
			}
			.spec{
				color: #959595;
				font-size: 24rpx;
				margin-top: 6rpx;
			}
		}
	}
</style>
