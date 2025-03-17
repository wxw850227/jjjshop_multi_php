import request from '@/utils/request'
/**
 * @description 列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/shop/plus.table.table/index',
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
		url: '/shop/plus.table.table/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改
 * @param
 * @returns
 */
export async function toEdit(data) {
	return request({
		url: '/shop/plus.table.table/edit',
		method: 'get',
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
        url: '/shop/plus.table.table/edit',
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
        url: '/shop/plus.table.table/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 列表
 * @param
 * @returns
 */
export async function getRecordList(data) {
	return request({
        url: '/shop/plus.table.record/index',
		method: 'post',
		data,
	});
}
export async function delRecord(data) {
	return request({
        url: '/shop/plus.table.record/delete',
		method: 'post',
		data,
	});
}