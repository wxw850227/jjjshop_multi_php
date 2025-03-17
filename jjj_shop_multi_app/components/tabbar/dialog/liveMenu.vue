<template>
	<view class="live-menu">
		<Popup v-show="isPopup" :width="width" :height="height" :backgroundColor="backgroundColor" :boxShadow="boxShadow" :padding="0" @hidePopup="hidePopupFunc">
			<view class="d-c-c d-c ww100 list-item" v-if="loading">
				<button type="default" class="ww100 d-c-c" @tap="gotoLive">
					<text class="iconfont"></text>
					<text>直播</text>
				</button>
				<button type="default" class="ww100 mt20" @tap="addVideo">
					<text class="iconfont"></text>
					<text>发布短视频</text>
				</button>
			</view>
			<view class="close-btns" @tap="hidePopupFunc(true)"><text class="icon iconfont icon-guanbi"></text></view>
		</Popup>
	</view>
</template>

<script>
import Popup from '@/components/uni-popup.vue';
export default {
	components: {
		Popup
	},
	data() {
		return {
			/*是否加载完成*/
			loading:false,
			/*是否显示*/
			isPopup: false,
			/*展示类别*/
			type: 0,
			/*宽度*/
			width: 400,
			/*高度*/
			height: 400,
			/*背景颜色*/
			backgroundColor: 'none',
			/*阴影*/
			boxShadow: 'none',
			/*是否是主播*/
			is_agent:false,
			/*个人信息*/
			userInfo:{}
		};
	},
	props: ['open'],
	watch:{
		open:function(n,o){
			if(n!=o){
				this.isPopup=n;
				this.getData();
			}
		}
	},
	created() {
		
	},
	mounted() {
		
	},
	methods: {
		
		/*获取数据*/
		getData() {
			let self = this;
			self._get('user.index/detail', {}, function(res) {
				self.is_agent = res.data.agent.is_agent;
				self.userInfo = res.data.userInfo;
				uni.hideLoading();
				self.loading=true;
			});
		},
		
		/*获取弹出层内容*/
		setData() {
			this.isPopup = true;
		},
		
		/*关闭弹窗*/
		hidePopupFunc(e) {
			this.$emit('close');
		},
		
		/*发布短视频*/
		addVideo(){
			this.hidePopupFunc();
			let url='pages/user/my-video/add/add';
			this.gotoPage(url);
		},
		
		/*直播*/
		gotoLive(){
			let self=this, url='';
			if(self.userInfo.is_realname == 1){
				self.hidePopupFunc();
				url='pages/user/my-live/live/live';
				self.gotoPage(url);
			}else{
				uni.showModal({
				    title: '提示',
				    content: '你还没有实名认证，前往实名认证',
				    success: function (res) {
				        if (res.confirm) {
				            url = '/pages/user/authentication/authentication';
							self.gotoPage(url);
				        } else if (res.cancel) {
				            self.hidePopupFunc();
				        }
				    }
				});
			}
			
		}
		
	}
};
</script>

<style lang="scss">
.live-menu .list-item button{
	height: 100rpx;
	line-height: 100rpx;
}
	
.live-menu .close-btns {
	margin: 50rpx auto 0;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background: none;
	border: 2px solid #ffffff;
}

.live-menu .close-btns .iconfont {
	color: #ffffff;
}
</style>
