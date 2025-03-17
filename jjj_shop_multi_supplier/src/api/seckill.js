import request from '@/utils/request'
/**
 * @description 
 * @param
 * @returns
 */
export async function activeList(data) {
	return request({
		url: '/supplier/activity.seckill/index',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function getProduct(data) {
	return request({
		url: '/supplier/activity.seckill/add',
		method: 'get',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function addProduct(data) {
	return request({
		url: '/supplier/activity.seckill/add',
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
		url: '/supplier/activity.seckill/my',
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
		url: '/supplier/activity.seckill/edit',
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
		url: '/supplier/activity.seckill/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function delProduct(data) {
	return request({
		url: '/supplier/activity.seckill/del',
		method: 'post',
		data,
	});
}
 

