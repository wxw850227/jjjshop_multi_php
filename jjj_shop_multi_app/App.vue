<script>
import utils from './common/utils.js';
import config from "./env/config.js";
// const { changePoints, changeTheme } = useUserStore();
export default {
	onLaunch: function(e) {
		console.log('App Launch');
		// 隐私政策
		// #ifdef APP-PLUS
		this.isFirstEnter();
		// #endif
		//#ifdef MP-WEIXIN
		//检查更新
		this.updateManager();
		//#endif
		let self = this;
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			console.log('------------------------------');
			uni.request({
				url: config.app_url + '/index.php/api/index/update',
				data: {
					version: widgetInfo.version,
					name: widgetInfo.name,
					app_id: config.app_id,
					platform: uni.getSystemInfoSync().platform
				},
				success: data => {
					if (data.update && data.wgtUrl) {
						self.updateWgt(data.wgtUrl);
					}
					if (data.update && data.pkgUrl) {
						plus.nativeUI.confirm(
							'有新版本更新，请点击确认更新到最新版本，以免影响使用',
							function(e) {
								if (e.index == 0) {
									plus.runtime.openURL(data.pkgUrl);
								}
							},
							{ title: '更新提示', buttons: ['确定', '取消'], verticalAlign: 'center' }
						);
					}
				},
				error: error => {
					console.log('----------------error');
					console.log(error);
				}
			});
		});
		// #endif
		//应用启动参数
		this.onStartupScene(e.query);
		this.getNav();
	},
	onShow: function() {
		//console.log('App Show')
		//#ifdef APP-PLUS
		getApp().globalData.vueObj = this;
		//#endif
	},
	onHide: function() {
		//console.log('App Hide')
	},
	methods: {
		isFirstEnter() {
			var firstEnter = uni.getStorageSync('firstEnter'); //同步获取缓存中是否有首次进入字段
			let self = this;
			uni.getSystemInfo({
				success(data) {
					console.log('firstEnter=' + firstEnter);
					// 如果是ios并且没有firstEnter缓存则弹出模态框
					if (data.platform == 'ios' && !firstEnter) {
						console.log('---------------');
						uni.navigateTo({
							url: '/pages/privacy/privacy'
						});
					}
				}
			});
		},
		updateManager: function() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，即将重启应用',
							showCancel: false,
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '更新提示',
					content: '检查到有新版本，但下载失败，请检查网络设置',
					showCancel: false
				});
			});
		},
		/**
		 * 小程序启动场景
		 */
		onStartupScene(query) {
			// 获取场景值
			let scene = utils.getSceneData(query);
			// 记录推荐人id
			let refereeId = query.referee_id;
			if (refereeId > 0) {
				if (!uni.getStorageSync('referee_id')) {
					uni.setStorageSync('referee_id', refereeId);
				}
			}
			// 记录分销人id
			let uid = scene.uid;
			if (uid > 0) {
				if (!uni.getStorageSync('referee_id')) {
					uni.setStorageSync('referee_id', uid);
				}
			}
			// 如果是h5，设置app_id
			// #ifdef  H5
			let appId = query.app_id;
			if (appId > 0) {
				uni.setStorageSync('app_id', appId);
			}
			if (uni.getStorageSync('app_id')) {
				this.config.app_id = uni.getStorageSync('app_id');
			}
			// #endif
		},
		getNav() {
			// 如果是android不处理图标,不起作用
			uni.request({
				url: this.config.app_url + '/index.php/api/index/nav',
				data: {
					app_id: this.config.app_id
				},
				success: result => {
					let vars = result.data.data.vars.data;
					let theme = result.data.data.theme.theme;
					/* changePoints(result.data.data.points_name);
					changeTheme(theme); */
					// this.$store.commit('changePoints', result.data.data.points_name);
					// this.$store.commit('changeTheme', theme);
					uni.setStorageSync('TabBar', vars);
					uni.setStorageSync('theme', theme);
				}
			});
		},
		updateWgt(wgtUrl) {
			uni.showModal({
				title: '版本更新',
				content: '检查到有新版本，请点击更新',
				confirmText: '更新',
				showCancel: false,
				success: function(e) {
					if (e.confirm) {
						var dtask = plus.downloader.createDownload(wgtUrl, {}, function(d, status) {
							uni.showToast({
								title: '下载完成',
								mask: false,
								duration: 1000
							});
							// 下载完成
							if (status == 200) {
								plus.runtime.install(
									d.filename,
									{
										force: true
									},
									function() {
										console.log('install success...');
										plus.nativeUI.alert(
											'已更新至最新版本，确定后将重启应用',
											function() {
												plus.runtime.restart();
											},
											'更新提示',
											'确定'
										);
									},
									function(e) {
										console.log(e);
										console.log(d.filename);
										uni.showToast({
											title: '安装失败-01',
											mask: false,
											duration: 1500
										});
									}
								);
							} else {
								uni.showToast({
									title: '更新失败-02',
									mask: false,
									duration: 1500
								});
							}
						});
						try {
							dtask.start(); // 开启下载的任务
							var prg = 0;
							var showLoading = plus.nativeUI.showWaiting('正在下载'); //创建一个showWaiting对象
							dtask.addEventListener('statechanged', function(task, status) {
								// 给下载任务设置一个监听 并根据状态  做操作
								switch (task.state) {
									case 1:
										showLoading.setTitle('正在下载');
										break;
									case 2:
										showLoading.setTitle('已连接到服务器');
										break;
									case 3:
										prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
										showLoading.setTitle('  正在下载' + prg + '%  ');
										break;
									case 4:
										plus.nativeUI.closeWaiting();
										//下载完成
										break;
								}
							});
						} catch (err) {
							plus.nativeUI.closeWaiting();
							uni.showToast({
								title: '更新失败-03',
								mask: false,
								duration: 1500
							});
						}
					} else {
						//取消
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import './common/iconfont.css';
@import './common/myIcon.css';
/*每个页面公共css */
@import './common/style.scss';
page{
	background: #f6f6f6;
    font-size: 0.75rem;
	min-height: 100vh;
}
.icon.iconfont{
	font-family: iconfont !important;
}
</style>
