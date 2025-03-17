import {
	defineStore
} from 'pinia';
import {
	login
} from '@/api/user';
import {
	getRoleList
} from '@/api/auth';
import {
	setToken,
	getToken,
	removeToken
} from '@/utils/token';
import {
	setStorage,
	getStorage
} from '@/utils/storageData';
import {
	handRouterTable,
	handMenuData
} from '@/utils/router';
import configObj from '@/config'; 
let { strongToken, renderMenu, menu } = configObj;
export const useUserStore = defineStore('main', {
	state: () => {
		return {
			token: getToken(strongToken),
			menus: getStorage(menu),
			renderMenus: getStorage(renderMenu),
			userInfo: getStorage('userInfo'),
			app_id: getStorage('app_id'),
			list: {},
		};
	},
	getters: {

	},
	actions: {
		bus_on(name, fn) {
			let self = this;
			self.list[name] = self.list[name] || [];
			self.list[name].push(fn);
		},
		// 发布
		bus_emit(name, data) {
			let self = this;
			if (self.list[name]) {
				self.list[name].forEach((fn) => {
					fn(data);
				});
			}
		},
		// 取消订阅
		bus_off(name) {
			let self = this;
			if (self.list[name]) {
				delete self.list[name];
			}
		},
		/**
		 * @description 登录
		 * @param {*} token
		 */
		async afterLogin(info) {
			this.userInfo = this.userInfo || {};
			const {
				data
			} = await login(info);
			console.log(data);
			setToken(data.token || 'token', strongToken);
			setStorage(data.app_id, 'app_id');
			this.userInfo.username = data.user_name || '';
			this.userInfo.version = data.version || '';
			setStorage(JSON.stringify(this.userInfo), 'userInfo');
			this.token = data.token || '';
			this.app_id = data.app_id || '';
			const res = await getRoleList();
			let menus = res.data.menus;
			let renderMenusList = handMenuData(JSON.parse(JSON.stringify(menus)));
			let menusList = handRouterTable(JSON.parse(JSON.stringify(menus)));
			setStorage(JSON.stringify(menusList), menu);
			setStorage(JSON.stringify(renderMenusList), renderMenu);
			this.menus = menusList;
			this.renderMenus = renderMenusList;
		},
		/**
		 * @description 退出登录
		 * @param {*} token
		 */
		afterLogout() {
			removeToken();
			this.token = null;
			this.menus = null;
			this.userInfo = null;
			this.app_id = null;
			setStorage(null, 'userInfo');
		},
	}
});
export default useUserStore;