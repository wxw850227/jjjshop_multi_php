import request from '@/utils/request';
/**
 * @description 消息列表
 * @param
 * @returns
 */
export async function regionList(data) {
	return request({
		url: '/admin/region/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加消息
 * @param
 * @returns
 */
export async function toAddRegion(data) {
	return request({
		url: '/admin/region/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加消息
 * @param
 * @returns
 */
export async function addRegion(data) {
	return request({
		url: '/admin/region/add',
		method: 'post',
		data,
	});
}
/**
 * @description 物流公司详情
 * @param
 * @returns
 */
export async function regionDetail(data) {
	return request({
		url: '/admin/region/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改消息
 * @param
 * @returns
 */
export async function editRegion(data) {
	return request({
		url: '/admin/region/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除消息
 * @param
 * @returns
 */
export async function deleteRegion(data) {
	return request({
		url: '/admin/region/delete',
		method: 'post',
		data,
	});
}