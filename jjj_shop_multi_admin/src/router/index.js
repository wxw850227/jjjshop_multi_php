import {
	createRouter,
	createWebHashHistory
} from 'vue-router';
import {
	setupPermissions
} from './permissions';
export const constantRoutes = [{
	path: '/login',
	name: 'login',
	meta: {
		title: '登录'
	},
	component: () => import('@/views/login/index.vue'),
},
{
	path: '/',
	name: 'Main',
	meta: {
		title: '母版'
	},
	component: () => import('@/views/layout/Main.vue'),
	children: [{
		path: '/Home',
		name: 'Home',
		meta: {
			title: '首页',
			topTree: '/Home'
		},
		component: () => import('@/views/home/Home.vue'),
	}, ]
}, /*----插件管理栏目----*/
{
	path: '/plugs',
	redirect: {
		name: 'plugs_index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		/*插件管理*/
		{
			path: '/plugs/plugs/Index',
			name: 'plugs_index',
			meta: {
				title: '插件管理'
			},
			component: () =>
				import('@/views/plugs/plugs/Index.vue')
		},
	]
},
/*----权限----*/
{
	path: '/access',
	redirect: {
		name: 'access_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		/*权限管理*/
		{
			path: 'Index',
			name: 'access_Index',
			meta: {
				title: '后台权限管理'
			},
			component: () =>
				import('@/views/access/Index.vue')
		}
	]
},
 {
	path: '/supplieraccess',
	redirect: {
		name: 'supplieraccess_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		/*权限管理*/
		{
			path: 'Index',
			name: 'supplieraccess_Index',
			meta: {
				title: '商户后台权限管理'
			},
			component: () =>
				import('@/views/supplieraccess/Index.vue')
		}
	]
},
/*----商城列表----*/
{
	path: '/shop',
	redirect: {
		name: 'shop_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		/*权限管理*/
		{
			path: 'Index',
			name: 'shop_Index',
			meta: {
				title: '权限管理'
			},
			component: () =>
				import('@/views/shop/Index.vue')
		}
	]
},
{
	path: '/message',
	redirect: {
		name: 'message_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		{
			path: '/message/Index',
			name: 'message_Index',
			meta: {
				title: '消息列表'
			},
			component: () =>
			import('@/views/message/Index.vue')
		}
	]
},
{
	path: '/region',
	redirect: {
		name: 'region_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		{
			path: '/region/Index',
			name: 'region_Index',
			meta: {
				title: '地区列表'
			},
			component: () =>
			import('@/views/region/Index.vue')
		},
		{
			path: '/region/add',
			name: 'region_add',
			meta: {
				title: '添加地区'
			},
			component: () =>
			import('@/views/region/add.vue')
		},
		{
			path: '/region/edit',
			name: 'region_edit',
			meta: {
				title: '编辑地区'
			},
			component: () =>
			import('@/views/region/edit.vue')
		},
	]
},
{
	path: '/setting',
	redirect: {
		name: 'setting_Index'
	},
	meta: {
		title: '母版'
	},
	component: () =>
		import('@/views/layout/Main.vue'),
	children: [
		{
			path: '/setting/service/index',
			name: 'setting_Index',
			meta: {
				title: '地区列表'
			},
			component: () =>
			import('@/views/setting/service/index.vue')
		}
	]
},
/*----修改密码----*/
  {
    path: '/password',
    redirect: { name: 'password_Index' },
    meta: {
      title: '母版'
    },
    component: () =>
      import('@/views/layout/Main.vue'),
    children: [
      /**/
      {
        path: 'Index',
        name: 'password_Index',
        meta: {
          title: '修改密码'
        },
        component: () =>
          import('@/views/password/Index.vue')
      }
    ]
  },
];
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});
export function setupRouter(app) {
	setupPermissions(router);
	app.use(router);
	return router;
}

export default router;