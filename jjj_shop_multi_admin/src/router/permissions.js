/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import {
	useUserStore
} from '@/store';
import router from './index.js';
import dealWithRoute from './dealWithRoute.js';
export async function setupPermissions(router) {
	let load = 0;
	router.beforeEach(async (to, from, next) => {
		const {
			token,
			menus
		} = useUserStore();
		const whiteList = ['/login'];
		console.log(token);
		if (!token) {
			if (whiteList.includes(to.path)) {
				next();
				return;
			}
			next('/login');
		} else {
			if (to.path == '/login') {
				next({
					path: '/home'
				});
				return;
			}
			if (menus && load == 0) {
				load++;
				dealWithRoute(menus);
				// console.log(router.getRoutes())
				next({
					...to,
					replace: true
				});
				return;
			}
			next();
		}
	});

}