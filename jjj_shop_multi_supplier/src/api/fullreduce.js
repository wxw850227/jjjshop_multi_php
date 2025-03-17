import request from '@/utils/request'
/**
 * @description 列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/supplier/setting.fullreduce/index',
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
		url: '/supplier/setting.fullreduce/add',
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
		url: '/supplier/setting.fullreduce/edit',
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
		url: '/supplier/setting.fullreduce/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 列表
 * @param
 * @returns
 */
export async function product(data) {
	return request({
		url: '/supplier/operate.fullreduce/product',
		method: 'post',
		data,
	});
}
export async function editProduct(data) {
	return request({
		url: '/supplier/operate.fullreduce/editProduct',
		method: 'post',
		data,
	});
}
