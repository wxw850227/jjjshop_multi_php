<template>
	<view :class="theme() || ''"  :data-theme='theme()'>
		<view v-if="Visible" class="pop_bg" @click="closeFunc"></view>
		<view :class=" Visible ? 'address-distr_open' : 'address-distr_close'">
			<view class="address-list bg-white">
				<scroll-view scroll-y="true" class="specs mt20" style="max-height: 600rpx;">
					<view   class="p20 address-item" v-for="(item,index) in storeList" :key="index">
						<view   :class="item.store_id == selectedId?'active':''" class="address  d-s-c">
							<view class="info flex-1" @click="onSelectedStore(item)">
								<view class="user f34">
									<text>{{item.store_name}}</text>
								</view>
								<view class="pt10 user f30 gray6">
									<text>{{item.phone}}</text>
								</view>
								<view class="pt10 f24 gray6">
									<text> {{item.region.province}}{{item.region.city}}{{item.region.region}}{{item.address}}</text>
								</view>
								<view>{{item.distance_unit}}</view>
							</view>
						</view>
					</view>
					<!-- 无数据提供的页面 -->
					<view v-if="!isLoading && !storeList.length">
						<view class="yoshop-notcont">
							<text class="iconfont icon-wushuju"></text>
							<text class="cont">亲，暂无自提门店哦</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>


<script>
	//#ifdef H5
	import jweixin from 'weixin-js-sdk';
	//#endif
	export default {
		data() {
			return {
				/*数据*/
				listData: [],
				isLoading: true, // 是否正在加载中
				storeList: [], // 门店列表,
				longitude: '',
				latitude: '',
				selectedId: -1,
				Visible:false,
				url: '',
			}
		},
		props: ['isAddress','store_id','chooseSotr'],
		watch:{
			isAddress(val){
				this.Visible=val;
				if(val){
					//#ifdef H5
					if(this.isWeixin()){
						this.url = window.location.href;
					}
					//#endif
					// 记录已选中的id
					this.selectedId = this.$props.store_id;
					console.log(this.selectedId)
					/*获取地址列表*/
					this.getData(true);
					// #ifndef H5
					this.getLocation();
					// #endif
					// #ifdef H5
					if(!this.isWeixin()){
						this.getLocation();
					}
					// #endif
				}
			}
		},
		methods: {
			  /*授权启用定位权限 */
			  onAuthorize() {
			    let self = this;
			    uni.openSetting({
			      success(res) {
			        if (res.authSetting["scope.userLocation"]) {
			          console.log('授权成功');
					  self.isAuthor = true;
			          setTimeout(() => {
			            // 获取用户坐标
			            self.getLocation((res) => {
			             
			            });
			          }, 1000);
			        }
			      }
			    })
			  },
			/**
			 * 获取用户坐标
			 */
			getLocation(callback) {
				let self = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						self.longitude = res.longitude;
						self.latitude = res.latitude;
						self.getData(false);
					},
					fail() {
						uni.showToast({
						    title: '获取定位失败，请点击右下角按钮打开定位权限',
						    duration: 2000,
							icon:"none"
						});
						self.isAuthor=false;
					},
				})
			},
			/**
			 * 公众号获取位置
			 */
			getWxLocation(signPackage, callback){
				let self = this;
				// var jweixin = require('jweixin-module');
				jweixin.config(JSON.parse(signPackage));
				jweixin.ready(function(res) {
					jweixin.getLocation({
						type: 'wgs84', 
						success: function (res) {
							self.longitude = res.longitude;
							self.latitude = res.latitude;
							self.getData(false);
						}
					});
				});
				jweixin.error(function(res){
				    console.log(res);
				});
			},

			/*获取数据*/
			getData(isFirst) {
				let self = this;
				self.isLoading = true;
				self._get('store.store/lists', {
					longitude: self.longitude,
					latitude: self.latitude,
					shop_supplier_id:self.$props.chooseSotr,
					url: self.url
				}, function(res) {
					self.isLoading = false;
					self.storeList = res.data.list;
					// 第一次，如果是公众号，则初始化微信sdk配置
					if(isFirst){
						// #ifdef H5
						if(self.isWeixin()){
							self.getWxLocation(res.data.signPackage);
						}
						// #endif
					}
				});
			},
			closeFunc(){
				this.$emit('close',null);
			},
			/* 选择门店 */
			onSelectedStore(e) {
				let self = this;
				self.selectedId = e;
				// 设置上级页面的门店id
				self.$fire.fire('selectStoreId',e);	
				this.$emit('close',e);
			}
		}
	}
</script>

<style lang="scss">
	.pop_bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #66666666;
		z-index: 100;
	}
	.address-list {
		padding-bottom: 90rpx;
	}
	.address-item{
		border-bottom: 1rpx solid #eeeeee;
	}
	.address-item:last-child{
		border-bottom: none;
	}
	.foot-btns {
		padding: 0;
	}
	
	.address {
		padding: 24rpx;
	}
	
	.address.active {
		@include background_color("bg-tips");
	}
	
	.closeicon{
		position: absolute;
		right: 20rpx;
		top: 60rpx;
	}
	.foot-btns .btn-red {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 0;
	}
	.address-distr_open{
		position: absolute;
		bottom: env(safe-area-inset-bottom);
		left: 0;
		width: 100%;
		display: block;
		z-index: 101;
	}
	.address-distr_close{
		position: absolute;
		bottom: env(safe-area-inset-bottom);
		left: 0;
		width: 100%;
		display: none;
	}
	.yoshop-notcont{
		padding: 0 25rpx;
		padding-bottom: 20rpx;
	}
</style>
