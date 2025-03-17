import request from '@/utils/request'

/**
 * @description 列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/shop/plus.fullreduce/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加
 * @param
 * @returns
 */
export async function add(data) {
	return request({
		url: '/shop/plus.fullreduce/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改
 * @param
 * @returns
 */
export async function edit(data) {
	return request({
		url: '/shop/plus.fullreduce/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除
 * @param
 * @returns
 */
export async function del(data) {
	return request({
		url: '/shop/plus.fullreduce/delete',
		method: 'post',
		data,
	});
}