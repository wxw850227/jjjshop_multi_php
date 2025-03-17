import request from '@/utils/request'
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/page.page/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 上架样式
 * @param
 * @returns
 */
export async function toAddPage(data) {
	return request({
		url: '/shop/page.page/add',
		method: 'get',
		data,
	});
}
/**
 * @description 上架样式
 * @param
 * @returns
 */
export async function addPage(data) {
	return request({
		url: '/shop/page.page/add',
		method: 'post',
		data,
	});
}
/**
 * @description 页面列表
 * @param
 * @returns
 */
export async function PageList(data) {
	return request({
		url: '/shop/page.page/index',
		method: 'post',
		data,
	});
}
/**
 * @description 删除页面
 * @param
 * @returns
 */
export async function deletePage(data) {
	return request({
		url: '/shop/page.page/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 删除页面
 * @param
 * @returns
 */
export async function todeletePage(data) {
	return request({
		url: '/shop/page.page/deletePage',
		method: 'post',
		data,
	});
}
/**
 * @description 设为首页
 * @param
 * @returns
 */
export async function setHome(data) {
	return request({
		url: '/shop/page.page/setHome',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑页面
 * @param
 * @returns
 */
export async function editHome(data) {
	return request({
		url: '/shop/page.page/home',
		method: 'get',
		data,
	});
}
/**
 * @description 页面列表编辑页面
 * @param
 * @returns
 */
export async function pageEdit(data) {
	return request({
		url: '/shop/page.page/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存编辑页面
 * @param
 * @returns
 */
export async function SavePage(data) {
	return request({
		url: '/shop/page.page/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 获取分类
 * @param
 * @returns
 */
export async function getCategory(data) {
	return request({
		url: '/shop/page.page/category',
		method: 'get',
		data,
	});
}
/**
 * @description 提交分类
 * @param
 * @returns
 */
export async function postCategory(data) {
	return request({
		url: '/shop/page.page/category',
		method: 'post',
		data,
	});
}

/**
 * @description 获取导航
 * @param
 * @returns
 */
export async function getNav(data) {
	return request({
		url: '/shop/page.page/nav',
		method: 'get',
		data,
	});
}
/**
 * @description 提交导航
 * @param
 * @returns
 */
export async function postNav(data) {
	return request({
		url: '/shop/page.page/nav',
		method: 'post',
		data,
	});
}
/**
 * @description 广告列表
 * @param
 * @returns
 */
export async function menuList(data) {
	return request({
		url: '/shop/page.page.Mymenu/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加广告
 * @param
 * @returns
 */
export async function addMenu(data) {
	return request({
		url: '/shop/page.page.Mymenu/add',
		method: 'post',
		data,
	});
}
/**
 * @description 广告详情
 * @param
 * @returns
 */
export async function menuDetail(data) {
	return request({
		url: '/shop/page.page.Mymenu/detail',
		method: 'get',
		data,
	});
}
/**
 * @description 修改广告
 * @param
 * @returns
 */
export async function editMenu(data) {
	return request({
		url: '/shop/page.page.Mymenu/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除广告
 * @param
 * @returns
 */
export async function deleteMenu(data) {
	return request({
		url: '/shop/page.page.Mymenu/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 首页模板列表
 * @param
 * @returns
 */
export async function HomeList(data) {
	return request({
		url: '/shop/page.page/list',
		method: 'post',
		data,
	});
}
/**
 * @description 设为首页
 * @param
 * @returns
 */
export async function setPage(data) {
	return request({
		url: '/shop/page.page/setPage',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑页面
 * @param
 * @returns
 */
export async function getHome(data) {
	return request({
		url: '/shop/page.page/addpage',
		method: 'get',
		data,
	});
}
/**
 * @description 保存编辑页面
 * @param
 * @returns
 */
export async function addhome(data) {
	return request({
		url: '/shop/page.page/addpage',
		method: 'post',
		data,
	});
}
/**
 * @description 保存编辑页面
 * @param
 * @returns
 */
export async function getEdit(data,method='get') {
	return request({
		url: '/shop/page.page/editpage',
		// method: 'get',
		method,
		data,
	});
}
/**
 * @description 保存编辑页面
 * @param
 * @returns
 */
export async function editPageHome(data) {
	return request({
		url: '/shop/page.page/editpage',
		method: 'post',
		data,
	});
}
/* export async function editPage(data) {
	return request({
		url: '/shop/page.page/editPage',
		method: 'post',
		data,
	});
} */
/**
 * @description 主题详情
 * @param
 * @returns
 */
export async function themeDetail(data) {
	return request({
		url: '/shop/page.theme/index',
		method: 'get',
		data,
	});
}
/**
 * @description 修改广告
 * @param
 * @returns
 */
export async function editTheme(data) {
	return request({
		url: '/shop/page.theme/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取导航
 * @param
 * @returns
 */
export async function getbottomNav(data) {
	return request({
		url: '/shop/page.page/bottomnav',
		method: 'get',
		data,
	});
}
/**
 * @description 获取导航
 * @param
 * @returns
 */
export async function editTabbar(data) {
	return request({
		url: '/shop/page.page/bottomedit',
		method: 'post',
		data,
	});
}


