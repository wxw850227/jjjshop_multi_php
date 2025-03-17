import request from '@/utils/request'
/**
 * @description 等级列表
 * @param
 * @returns
 */
export async function gradelist(data) {
	return request({
		url: '/shop/plus.agent.grade/index',
		method: 'post',
		data,
	});
}
export async function toAddgrade(data) {
	return request({
		url: '/shop/plus.agent.grade/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加等级
 * @param
 * @returns
 */
export async function addgrade(data) {
	return request({
		url: '/shop/plus.agent.grade/add',
		method: 'post',
		data,
	});
}
export async function toEditgrade(data) {
	return request({
		url: '/shop/plus.agent.grade/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改等级
 * @param
 * @returns
 */
export async function editGrade(data) {
	return request({
		url: '/shop/plus.agent.grade/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除等级
 * @param
 * @returns
 */
export async function deletegrade(data) {
	return request({
		url: '/shop/plus.agent.grade/delete',
		method: 'get',
		data,
	});
}
/**
 * @description 等级日志
 * @param
 * @returns
 */
export async function loglist(data) {
	return request({
		url: '/shop/plus.agent.grade/log',
		method: 'post',
		data,
	});
}
