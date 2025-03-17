import request from '@/utils/request'
/**
 * @description 充值套餐
 * @param
 * @returns
 */
export async function listPlan(data) {
	return request({
		url: '/shop/plus.live.plan/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加套餐
 * @param
 * @returns
 */
export async function addPlan(data) {
	return request({
		url: '/shop/plus.live.plan/add',
		method: 'get',
		data,
	});
}
/**
 * @description 修改套餐
 * @param
 * @returns
 */
export async function editPlan(data) {
	return request({
		url: '/shop/plus.live.plan/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除套餐
 * @param
 * @returns
 */
export async function deletePlan(data) {
	return request({
		url: '/shop/plus.live.plan/delete',
		method: 'get',
		data,
	});
}
/**
 * @description 充值记录
 * @param
 * @returns
 */
export async function log(data) {
	return request({
		url: '/shop/plus.live.plan/log',
		method: 'post',
		data,
	});
}
