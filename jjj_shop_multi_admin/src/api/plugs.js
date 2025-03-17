import request from '@/utils/request';
/**
 * @description 插件列表
 * @param
 * @returns
 */
export async function plugslist(data) {
	return request({
		url: '/admin/plus.plus/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取插件
 * @param
 * @returns
 */
export async function getplugs(data) {
	return request({
		url: '/admin/plus.plus/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加插件
 * @param
 * @returns
 */
export async function addplugs(data) {
	return request({
		url: '/admin/plus.plus/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑插件
 * @param
 * @returns
 */
export async function editplugs(data) {
	return request({
		url: '/admin/plus.plus/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除插件
 * @param
 * @returns
 */
export async function deleteplugs(data) {
	return request({
		url: '/admin/plus.plus/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 修改插件状态
 * @param
 * @returns
 */
export async function updatePlugsStatus(data) {
	return request({
		url: '/admin/plus.plus/updateStatus',
		method: 'post',
		data,
	});
}
/**
 * @description 是否推荐
 * @param
 * @returns
 */
export async function updatePlugsRecom(data) {
	return request({
		url: '/admin/plus.plus/updateRecom',
		method: 'post',
		data,
	});
}