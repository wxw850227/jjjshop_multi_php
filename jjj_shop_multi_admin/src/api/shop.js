import request from '@/utils/request';
/**
 * @description 商城列表
 * @param
 * @returns
 */
export async function shopList(data) {
	return request({
		url: '/admin/shop/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加商城
 * @param
 * @returns
 */
export async function addShop(data) {
	return request({
		url: '/admin/shop/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改商城
 * @param
 * @returns
 */
export async function editShop(data) {
	return request({
		url: '/admin/shop/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 启用商城
 * @param
 * @returns
 */
export async function updateStatus(data) {
	return request({
		url: '/admin/shop/updateStatus',
		method: 'post',
		data,
	});
}
/**
 * @description 进入商城
 * @param
 * @returns
 */
export async function storeEnter(data) {
	return request({
		url: '/admin/shop/enter',
		method: 'post',
		data,
	});
}
/**
 * @description 删除商城
 * @param
 * @returns
 */
export async function deleteShop(data) {
	return request({
		url: '/admin/shop/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 启用商城
 * @param
 * @returns
 */
export async function updateWxStatus(data) {
	return request({
		url: '/admin/shop/updateWxStatus',
		method: 'post',
		data,
	});
}