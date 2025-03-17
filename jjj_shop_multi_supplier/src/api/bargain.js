import request from '@/utils/request'
/**
 * @description 活动列表
 * @param
 * @returns
 */
export async function activeList(data) {
	return request({
		url: '/supplier/activity.bargain/index',
		method: 'post',
		data,
	});
}
export async function getProduct(data) {
	return request({
		url: '/supplier/activity.bargain/add',
		method: 'get',
		data,
	});
}
export async function addProduct(data) {
	return request({
		url: '/supplier/activity.bargain/add',
		method: 'post',
		data,
	});
}
/**
 * @description 我的活动列表
 * @param
 * @returns
 */
export async function myList(data) {
	return request({
		url: '/supplier/activity.bargain/my',
		method: 'post',
		data,
	});
}
/**
 * @description 根据主键查询
 * @param
 * @returns
 */
export async function detailProduct(data) {
	return request({
		url: '/supplier/activity.bargain/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存
 * @param
 * @returns
 */
export async function saveProduct(data) {
	return request({
		url: '/supplier/activity.bargain/edit',
		method: 'post',
		data,
	});
}
export async function delProduct(data) {
	return request({
		url: '/supplier/activity.bargain/del',
		method: 'post',
		data,
	});
}