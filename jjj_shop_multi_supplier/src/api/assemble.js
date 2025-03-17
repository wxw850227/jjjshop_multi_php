import request from '@/utils/request'
/**
 * @description 拼团活动列表
 * @param
 * @returns
 */
export async function activeList(data) {
	return request({
		url: '/supplier/activity.assemble/index',
		method: 'post',
		data,
	});
}
export async function getProduct(data) {
	return request({
		url: '/supplier/activity.assemble/add',
		method: 'get',
		data,
	});
}
export async function addProduct(data) {
	return request({
		url: '/supplier/activity.assemble/add',
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
		url: '/supplier/activity.assemble/my',
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
		url: '/supplier/activity.assemble/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 根据主键查询
 * @param
 * @returns
 */
export async function saveProduct(data) {
	return request({
		url: '/supplier/activity.assemble/edit',
		method: 'post',
		data,
	});
}
export async function delProduct(data) {
	return request({
		url: '/supplier/activity.assemble/del',
		method: 'post',
		data,
	});
}


 