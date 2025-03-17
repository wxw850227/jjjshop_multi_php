<template>
	<view class="address-form" :data-theme="theme()" :class="theme() || ''">
		<view class="bg-white p-0-30 f30">
			<view class="d-b-c border-b info-item avatar">
				<text class="key-name">头像</text>
				<!-- #ifndef MP-WEIXIN -->
				<view class="d-e-c" @click="changeAvatarUrl">
					<view class="info-image"><image :src="userInfo.avatarUrl || '/static/default.png'" mode=""></image></view>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="d-e-c">
					<view class="info-image">
						<button style="padding: 0;" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image :src="userInfo.avatarUrl || '/static/default.png'" mode=""></image>
						</button>
					</view>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
				<!-- #endif -->
			</view>
			<view class="d-b-c p-30-0 border-b">
				<text class="key-name">会员ID</text>
				<view class="d-e-c">
					<text class="mr20">{{ userInfo.user_id }}</text>
				</view>
			</view>
			<view class="d-b-c p-30-0 border-b">
				<text class="key-name">昵称</text>
				<view class="d-e-c" @click="changeName('nickName')">
					<text class="mr20">{{ userInfo.nickName }}</text>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
			<view class="d-b-c p-30-0">
				<text class="key-name">手机号码</text>
				<view class="d-e-c" v-if="userInfo.mobile">
					<text class="mr20">{{ userInfo.mobile }}</text>
				</view>
				<view class="d-e-c" v-if="!userInfo.mobile" @click="gotoBind">
					<text class="mr20">未绑定</text>
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="d-b-c p-30-0 border-b">
				<text class="key-name">当前版本</text>
				<view class="d-e-c">
					<text class="mr20">{{ version_no }}</text>
				</view>
			</view>
			<view class="d-b-c p-30-0 border-b" @click="deleteAccount()">
				<text class="key-name">删除账号</text>
				<view class="d-e-c">
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
			<!-- #endif -->
			<view class="setup-btn" @tap="logout()">退出登录</view>
		</view>
		<!-- 修改资料 -->
		<Popup :show="isPopup" type="bottom" :width="750" :padding="0" @hidePopup="hidePopupFunc">
			<form @submit="subName" class="ww100">
				<view class="d-s-s d-c p20 mpservice-wrap">
					<view class="tc f32 fb ww100">修改</view>
					<template v-if="type == 'mobile' || type == 'nickName' || type == 'user_name' || type == 'email' || type == 'idcard'">
						<view class="pop-input d-b-c">
							<!-- #ifdef MP-WEIXIN -->
							<input name="newName" :type="type == 'nickName' ? 'nickname' : 'text'" class="flex-1" placeholder="请输入" :value="newName" @input="changeinput" />
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<input type="text" name="newName" class="flex-1" placeholder="请输入" :value="newName" @input="changeinput" />
							<!-- #endif -->
							<view class="icon-guanbi icon iconfont" @click="clearName"></view>
						</view>
					</template>
					<view class="d-a-c ww100">
						<button class="btn-gray-border" @click="hidePopupFunc">取消</button>
						<button class="theme-btn" form-type="submit">确认</button>
					</view>
				</view>
			</form>
		</Popup>
		<!-- 上传头像 -->
		<Upload v-if="isUpload" @getImgs="getImgsFunc"></Upload>
	</view>
</template>

<script>
import Upload from '@/components/upload/uploadOne.vue';
import Popup from '@/components/uni-popup.vue';
export default {
	components: {
		Upload,
		Popup
	},
	data() {
		return {
			userInfo: {},
			isUpload: false,
			isPopup: false,
			newName: '',
			type: '',
			version_no: '',
			imageList: []
		};
	},
	onShow() {
		/*获取个人中心数据*/
		this.getData();
	},
	methods: {
		onChooseAvatar(e) {
			let self = this;
			console.log(e);
			self.uploadFile([e.detail.avatarUrl]);
		},
		/*获取数据*/
		getData() {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			self._get('user.index/setting', {}, function(res) {
				self.userInfo = res.data.userInfo;
				uni.hideLoading();
			});
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				self.version_no = widgetInfo.version;
			});
			// #endif
		},
		gotoBind() {
			this.gotoPage('/pages/user/modify-phone/modify-phone');
		},
		logout() {
			uni.removeStorageSync('token');
			uni.removeStorageSync('user_id');
			this.gotoPage('/pages/index/index');
		},
		changeName(type) {
			let self = this;
			if (type == 'mobile') {
				self.oldmobile = self.userInfo.mobile;
			}
			self.type = type;
			self.newName = self.userInfo[type];
			self.isPopup = true;
		},
		hidePopupFunc() {
			this.newName = '';
			this.isPopup = false;
		},
		changeinput(e) {
			this.newName = e.detail.value;
		},
		clearName() {
			this.newName = '';
		},
		subName(e) {
			let self = this;
			if (self.loading) {
				return;
			}
			self.newName = e.detail.value.newName;
			self.userInfo[self.type] = this.newName;
			self.update();
		},
		/* 修改头像 */
		changeAvatarUrl() {
			let self = this;
			self.isUpload = true;
		},
		/*上传图片*/
		uploadFile: function(tempList) {
			let self = this;
			let i = 0;
			let img_length = tempList.length;
			let params = {
				token: uni.getStorageSync('token'),
				app_id: self.getAppId()
			};
			uni.showLoading({
				title: '图片上传中'
			});
			tempList.forEach(function(filePath, fileKey) {
				uni.uploadFile({
					url: self.websiteUrl + '/index.php?s=/api/file.upload/image',
					filePath: filePath,
					name: 'iFile',
					formData: params,
					success: function(res) {
						let result = typeof res.data === 'object' ? res.data : JSON.parse(res.data);
						if (result.code === 1) {
							self.imageList.push(result.data);
						} else {
							self.showError(result.msg);
						}
					},
					complete: function() {
						i++;
						if (img_length === i) {
							uni.hideLoading();
							// 所有文件上传完成
							self.getImgsFunc(self.imageList);
						}
					}
				});
			});
		},
		/*获取上传的图片*/
		getImgsFunc(e) {
			let self = this;
			if (e && typeof e != 'undefined') {
				let self = this;
				self.userInfo.avatarUrl = e[0].file_path;
				self.update();
				self.isUpload = false;
			}
		},
		update() {
			let self = this;
			if (self.loading) {
				return;
			}
			uni.showLoading({
				title: '加载中'
			});
			let params = self.userInfo;
			self.loading = true;
			self._post('user.user/updateInfo', params, function(res) {
				self.showSuccess(
					'修改成功',
					function() {
						self.loading = false;
						self.isPopup = false;
						uni.hideLoading();
						self.getData();
					},
					function(err) {
						uni.hideLoading();
						self.loading = false;
						self.isPopup = false;
					}
				);
			});	
		},
		deleteAccount() {
			let  self = this;
			uni.showModal({
				title: '提示',
				content: '是否确认删除账号？删除后您将无法用此账号登录，此账户下的数据也将删除',
				success: function(res) {
					if (res.confirm) {
						self._post('user.user/deleteAccount', {}, result => {
							self.showSuccess('删除成功', () => {
								uni.removeStorageSync('token');
								uni.removeStorageSync('user_id');
								self.gotoPage('/pages/index/index');
							});
						}, false, () => {
							uni.hideLoading();
						});
					}
				}
			})
		},
	}
};
</script>

<style lang="scss">
.address-form .key-name {
	width: 200rpx;
}

.address-form .btn-red {
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 44rpx;
}

.setup-btn {
	position: fixed;
	bottom: 20rpx;
	left: 5%;
	width: 90%;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 80rpx;
	@include background_color('background_color');
	color: #fff;
	font-size: 30rpx;
	display: flex;
	justify-content: center;
	margin: 0 auto;
}

.info-item.avatar {
	height: 162rpx;
}

.info-image {
	width: 112rpx;
	height: 112rpx;
	border-radius: 10rpx;
	margin-right: 20rpx;

	image {
		width: 112rpx;
		height: 112rpx;
		border-radius: 10rpx;
	}
}
.make-item {
	height: 60rpx;
}

.btn-red.code-btn {
	height: 54rpx;
	line-height: 54rpx;
}

.btn-red.code-btn.issend {
	background: #666666;
	border: none;
	color: #ffffff;
	box-shadow: none;
}

.pop-input {
	width: 100%;
	margin: 26rpx 0;
	box-sizing: border-box;
	border-bottom: 2rpx solid #d9d9d9;
}

.pop-input input {
	width: 100%;
	padding-left: 15rpx;

	font-size: 26rpx;
	color: #333333;
	margin: 16rpx 0;
	text-align: left;
	height: 60rpx;
	line-height: 60rpx;
}

.pop-input .icon.icon-guanbi {
	width: 38rpx;
	height: 38rpx;
	background-color: #999999;
	color: #ffffff;
	font-size: 22rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	opacity: 0.8;
}

.sub-box {
	padding: 40rpx 0;

	.setup-btn {
		width: 686rpx;
		height: 84rpx;
		@include background_color('background_color');
		border-radius: 6rpx;
		line-height: 84rpx;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}
}
</style>
