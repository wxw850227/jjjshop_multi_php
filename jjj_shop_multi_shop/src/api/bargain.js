import request from '@/utils/request'

/**
 * @description 砍价活动列表
 * @param
 * @returns
 */
export async function bargainList(data) {
	return request({
		url: '/shop/plus.bargain.active/index',
		method: 'post',
		data,
	});
}
/**
 * @description 删除
 * @param
 * @returns
 */
export async function deleteBargain(data) {
	return request({
		url: '/shop/plus.bargain.active/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 添加砍价活动
 * @param
 * @returns
 */
export async function addActive(data) {
	return request({
		url: '/shop/plus.bargain.active/add',
		method: 'post',
		data,
	});
}
/**
 * @description 获取砍价活动数据
 * @param
 * @returns
 */
export async function editActive(data) {
	return request({
		url: '/shop/plus.bargain.active/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存砍价活动
 * @param
 * @returns
 */
export async function saveActive(data) {
	return request({
		url: '/shop/plus.bargain.active/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 获得商品详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/plus.bargain.bargain/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 保存
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.bargain.bargain/saveData',
		method: 'post',
		data,
	});
}
/**
 * @description 保存
 * @param
 * @returns
 */
export async function editSetting(data) {
	return request({
		url: '/shop/plus.bargain.setting/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取
 * @param
 * @returns
 */
export async function settingDetail(data) {
	return request({
		url: '/shop/plus.bargain.setting/index',
		method: 'get',
		data,
	});
}
/**
 * @description 记录
 * @param
 * @returns
 */
export async function taskList(data) {
	return request({
		url: '/shop/plus.bargain.task/index',
		method: 'get',
		data,
	});
}
/**
 * @description 记录详情
 * @param
 * @returns
 */
export async function help(data) {
	return request({
		url: '/shop/plus.bargain.task/help',
		method: 'get',
		data,
	});
}
/**
 * @description 砍价活动
 * @param
 * @returns
 */
export async function postBargainaduit(data) {
	return request({
		url: '/shop/plus.bargain.Product/index',
		method: 'post',
		data,
	});
}

/**
 * @description 砍价审核
 * @param
 * @returns
 */
export async function getBargainedit(data) {
	return request({
		url: '/shop/plus.bargain.Product/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 砍价审核
 * @param
 * @returns
 */
export async function postBargainedit(data) {
	return request({
		url: '/shop/plus.bargain.Product/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 砍价删除
 * @param
 * @returns
 */
export async function delProduct(data) {
	return request({
		url: '/shop/plus.bargain.Product/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 上下架
 * @param
 * @returns
 */
export async function stateSet(data) {
	return request({
		url: '/shop/plus.bargain.Product/state',
		method: 'post',
		data,
	});
}
