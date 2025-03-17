<template>
	<view class="store-container bg-white" v-if="!loading">
		<view class="logo ww100 p-30-0 d-c-c">
			<image :src="storeDetail.logo.file_path" mode="aspectFill"></image>
		</view>
		<view class="d-c-c d-c ww100">
			<text class="f40">{{storeDetail.store_name}}</text>
			<text class="f28 gray9">营业时间:{{storeDetail.shop_hours}}</text>
		</view>
		
		<view class="f30 mt30">
			<view class="d-b-c p30 border-b" @click="callPhone(storeDetail.phone)">
				<text class="gray9">联系电话</text>
				<view class="">
					<text class="iconfont icon-002dianhua"></text>
					<text>{{storeDetail.phone}}</text>
				</view>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">联系人</text>
				<text>{{storeDetail.linkman}}</text>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">状态</text>
				<text class="green">{{storeDetail.status.text}}</text>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">是否支持自提核销</text>
				<text class="green">{{storeDetail.is_check.text}}</text>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">省市区</text>
				<text>{{storeDetail.region.province}}{{storeDetail.region.city}}{{storeDetail.region.region}}</text>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">地址</text>
				<text>{{storeDetail.address}}</text>
			</view>
			<view class="d-b-c p30 border-b">
				<text class="gray9">简介</text>
				<text class="flex-1 o-h tr">{{storeDetail.summary}}</text>
			</view>
		</view>
		<view class="store-map">
			<map :latitude="storeDetail.latitude" :longitude="storeDetail.longitude" :markers="covers">
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否正在加载*/
				loading:true,
				/*门店ID*/
				store_id:null,
				/*门店详情*/
				storeDetail:{},
				/*标记点*/
				covers: []
			}
		},
		onLoad(e) {
			
			this.store_id=e.store_id;
		},
		mounted() {
			/*获取订单详情*/
			this.getData();
		},
		methods: {
			
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._get(
					'store.store/detail', {
						store_id: self.store_id,
					},
					function(res) {
						self.storeDetail=res.data.detail;
						let obj={ 
							latitude: res.data.detail.latitude,
				            longitude: res.data.detail.longitude
						}
						self.covers.push(obj);
						self.loading=false;
						uni.hideLoading();
					}
				);
			},
			
			/*拨打电话*/
			callPhone(phone){
				let self=this;
				uni.makePhoneCall({
					phoneNumber: phone
				});
			}
		}
	}
</script>

<style lang="scss">
.store-container .logo image{ width: 200rpx; height: 200rpx;}
.store-container .store-map{ width: 750rpx; height: 400rpx;}
.store-container .store-map map{ width: 100%; height: 100%;}
.store-container .icon-002dianhua{ font-size:34rpx; font-weight: bold; color: $dominant-color;}
</style>
