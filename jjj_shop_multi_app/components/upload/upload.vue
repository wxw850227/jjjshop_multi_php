<template>
	<view></view>
</template>

<script>
export default {
	data() {
		return {
			/*需要返回的图片*/
			imageList: []
		};
	},
	props: ['num', 'isVideo'],
	onLoad() {},
	mounted() {
		this.chooseImageFunc();
	},
	methods: {
		/*打开相机或者相册，选择图片*/
		chooseImageFunc() {
			let self = this;
			if (this.isVideo) {
				uni.chooseVideo({
					// 来源相册或者拍摄
					maxDuration: 60,
					// 设置最长时间60s
					camera: 'back',
					// 后置摄像头
					success: res => {
						console.log(res);
						if (res) {
							let arr = [];
							arr.push(res.tempFilePath);
							console.log(arr);
							self.uploadFile(arr);
						}
					},
					fail(err) {
						console.log(err);
						self.$emit('getImgs', null);
					}
				});
			} else {
				uni.chooseImage({
					count: self.num || 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						self.uploadFile(res.tempFilePaths);
					},
					fail: function(res) {
						self.$emit('getImgs', null);
					},
					complete: function(res) {}
				});
			}
		},

		/*上传图片*/
		uploadFile: function(tempList) {
			let self = this;
			let i = 0;
			let img_length = tempList.length;
			let params = {
				token: uni.getStorageSync('token'),
				app_id: self.getAppId(),
				file_type: self.isVideo ? 'video' : 'image'
			};
			uni.showLoading({
				title: '上传中'
			});
			tempList.forEach(function(filePath, fileKey) {
				uni.uploadFile({
					url: self.websiteUrl + '/index.php?s=/api/file.upload/image',
					filePath: filePath,
					name: 'iFile',
					formData: params,
					success: function(res) {
						let result = typeof res.data === 'object' ? res.data : JSON.parse(res.data);
						if (result.code === -1) {
							// 登录态失效, 重新登录
							console.log('登录态失效, 重新登录');
							self.doLogin();
							return
						}
						if (result.code === 1) {
							self.imageList.push(result.data);
						}
						
					},
					complete: function() {
						i++;
						if (img_length === i) {
							uni.hideLoading();
							// 所有文件上传完成
							self.$emit('getImgs', self.imageList);
						}
					}
				});
			});
		}
	}
};
</script>

<style></style>
