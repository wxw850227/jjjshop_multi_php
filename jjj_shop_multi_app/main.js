import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import onfire from '@/common/onfire.js'
// 公共组件
import headerBar from './components/header.vue'
//请求加载组件
import requestLoading from './components/jjjloading.vue';
/*底部数据*/
import tabBar from "@/components/tabbar/footTabbar.vue"
/* 配置 */
import config from './env/config'
import {
	gotopage
} from '@/common/gotopage.js'
import requestFun from '@/utils/request.js';
import validator from '@/utils/validator.js';
import store from "./store/index.js"
//#ifdef H5
import jweixin from 'weixin-js-sdk'; 
//#endif
export function createApp() {
	const app = createSSRApp(App)

	app.component("header-bar", headerBar)
	app.component("request-loading", requestLoading)
	app.component("tabBar", tabBar)

	app.use(store)

	app.config.globalProperties.$store = store;
	app.config.globalProperties.footTabberData = {
		active: 'home'
	}
	app.config.globalProperties.$fire = new onfire()
	app.config.globalProperties.config = config
	app.config.globalProperties.websiteUrl = config.app_url;
	app.config.globalProperties.app_id = config.app_id;
	//h5发布路径
	// app.config.globalProperties.h5_addr = config.h5_addr;
	// #ifdef H5
	app.config.globalProperties.configWx = function(signPackage, shareParams, params) {
		if (signPackage == '') {
			return;
		} 
		let self = this;
		
		jweixin.config(JSON.parse(signPackage));
		let url_params = self.getShareUrlParams(params);
		
		jweixin.ready(function(res) {
			jweixin.updateAppMessageShareData({
			// jweixin.onMenuShareAppMessage({
				title: shareParams.title,
				desc: shareParams.desc,
				link: self.websiteUrl + self.h5_addr + shareParams.link + '?' + url_params,
				imgUrl: shareParams.imgUrl,
				success: function() {

				}
			});
			jweixin.updateTimelineShareData({
				title: shareParams.title,
				desc: shareParams.desc,
				link: self.websiteUrl + self.h5_addr + shareParams.link + '?' + url_params,
				imgUrl: shareParams.imgUrl,
				success: function() {

				}
			});
		});
	};
	app.config.globalProperties.configWxScan = function(signPackage) {
        if (signPackage == '') {
            return;
        }
        jweixin.config(JSON.parse(signPackage));
        return jweixin;
    };
	// #endif
	/*页面跳转*/
	app.config.globalProperties.gotoPage = gotopage;
	app.config.globalProperties.font_url = config.font_url;
	app.config.globalProperties.test = 'testtesta'

	app.config.globalProperties.points_name = function(e) {
		if (!e) {
			return store.state.points_name;
		} else {
			let re = new RegExp("积分", "g");
			return e.replace(re, store.state.points_name);
		}
	}

	/* 路由此处暂时没想到办法 */
	/* ----------------------- */

	//请求
	requestFun(app);

	validator(app);

	app.config.globalProperties.theme = function() {
		return 'theme' + this.$store.state.theme || ''
	}

	app.config.globalProperties.getTabBarLinks = function() {
		let vars = uni.getStorageSync('TabBar');
		let theme = uni.getStorageSync('theme');
		if (vars != null && vars != '') {
			this.setTabBarLinks(vars, theme);
		} else {
			uni.request({
				url: this.config.app_url + '/index.php/api/index/nav',
				data: {
					app_id: this.config.app_id
				},
				success: (result) => {
					let vars = result.data.data.vars.data;
					let theme = result.data.data.theme.theme;
					this.$store.commit('changeTheme', theme);
					uni.setStorageSync('TabBar', vars);
					uni.setStorageSync('theme', theme);
					this.setTabBarLinks(vars, theme);
				}
			});
		}
	}

	app.config.globalProperties.setTabBarLinks = function(vars, theme) {
		if (vars.is_auto == '0') {
			uni.showTabBar();
			vars.list = [];
			let color = ['#ff5704', '#19ad57', '#ffcc00', '#1774ff', '#e4e4e4', '#c8ba97',
				'#623ceb'
			]
			uni.setTabBarStyle({
				color: '#333333',
				selectedColor: color[theme],
			})
			uni.setTabBarItem({
				index: 0,
				text: '首页',
				iconPath: '/static/tabbar/home.png',
				selectedIconPath: '/static/tabbar/home_' + theme + '.png'
			})
			uni.setTabBarItem({
				index: 1,
				text: '分类',
				iconPath: '/static/tabbar/category.png',
				selectedIconPath: '/static/tabbar/category_' + theme + '.png'
			})
			uni.setTabBarItem({
				index: 2,
				text: '商户',
				iconPath: '/static/tabbar/shop.png',
				selectedIconPath: '/static/tabbar/shop_' + theme + '.png'
			})
			uni.setTabBarItem({
				index: 3,
				text: '购物车',
				iconPath: '/static/tabbar/cart.png',
				selectedIconPath: '/static/tabbar/cart_' + theme + '.png'
			})
			uni.setTabBarItem({
				index: 4,
				text: '我的',
				iconPath: '/static/tabbar/user.png',
				selectedIconPath: '/static/tabbar/user_' + theme + '.png'
			})
		} else {
			uni.hideTabBar();
		}
	}
	app.config.globalProperties.getThemeColor = function() {
		let theme = this.$store.state.theme;
		let color = ['#ff5704', '#19ad57', '#ffcc00', '#1774ff', '#e4e4e4', '#c8ba97', '#623ceb'];
		return color[theme]
	}


	return {
		app,
	}
}
// #endif