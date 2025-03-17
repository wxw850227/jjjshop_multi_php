import config from '../env/config.js'
/*导航菜单白名单*/
const tabBarLinks = [
	'/pages/index/index',
	'/pages/product/category',
	'/pages/shop/middle',
	'/pages/cart/cart',
	'/pages/user/index/index'
];

/*分享页面,扫码白名单*/
const shareLinks = [
	'/pagesPlus/assemble/fight-group-detail/fight-group-detail',
	'/pagesPlus/bargain/haggle/haggle',
	'/pages/user/invite/invite',
	'/pages/product/detail/detail'
]

/*
 * 跳转页面
 */
export const gotopage = (url, type) => {
	console.log(url,'url')
	console.log(type,'type')
	if (!url || url.length == 0) {
		return false;
	}

	if (url.substr(0, 1) !== '/') {
		url = '/' + url;
	}
	let p = url;
	if (url.indexOf('?') != -1) {
		p = url.substr(0, url.indexOf('?'));
		// #ifdef  H5
		if (url.search("app_id") == -1) {
			url = url + '&app_id=' + config.app_id;
		}
		console.log("跳转的url",url)
		// #endif
	} else {
		// #ifdef  H5
		if (url.search("app_id") == -1) {
			url = url + '?app_id=' + config.app_id;
		}
		// #endif
	}

	let diyTabBarLinks = uni.getStorageSync('TabBar').list;
	let res = diyTabBarLinks.some(item => {
		if (item.link_url == p) {
			return true
		}
	})
	if (res) {
		uni.reLaunch({
			url: url
		});
		return
	}
	// tabBar页面
	if (tabBarLinks.indexOf(p) > -1) {
		uni.reLaunch({
			url: url
		})
	} else {
		if (process.env.NODE_ENV === 'production') {
			//判断是否分享页面
			if (shareLinks.indexOf(p) > -1) {
				//公众号
				// #ifdef  H5
				if(config.app_url.search(/h5/) < 0){
					window.location.href = config.app_url + config.h5_addr + url;
				}
				return;
				// #endif
			}
		}
		if (type == 'redirect') {
			uni.redirectTo({
				url: url
			});
			return
		}
		if (type == 'reLaunch') {
			uni.reLaunch({
				url: url
			});
			return
		}
		// 普通页面
		uni.navigateTo({
			url: url
		});
	}
}
