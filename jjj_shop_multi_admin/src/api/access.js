import request from '@/utils/request';

/**
 * @description 菜单列表
 * @param
 * @returns
 */
export async function accessList(data) {
	return request({
		url: '/admin/Access/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加菜单
 * @param
 * @returns
 */
export async function addpAccess(data) {
	return request({
		url: '/admin/Access/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑菜单
 * @param
 * @returns
 */
export async function editAccess(data) {
	return request({
		url: '/admin/Access/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除菜单
 * @param
 * @returns
 */
export async function delAccess(data) {
	return request({
		url: '/admin/Access/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 修改状态
 * @param
 * @returns
 */
export async function status(data) {
	return request({
		url: '/admin/Access/status',
		method: 'post',
		data,
	});
}
/**
 * @description 菜单列表
 * @param
 * @returns
 */
export async function supplieraccessList(data) {
	return request({
		url: '/admin/SupplierAccess/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加菜单
 * @param
 * @returns
 */
export async function supplieraddpAccess(data) {
	return request({
		url: '/admin/SupplierAccess/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑菜单
 * @param
 * @returns
 */
export async function suppliereditAccess(data) {
	return request({
		url: '/admin/SupplierAccess/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除菜单
 * @param
 * @returns
 */
export async function supplierdelAccess(data) {
	return request({
		url: '/admin/SupplierAccess/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 修改状态
 * @param
 * @returns
 */
export async function supplierstatus(data) {
	return request({
		url: '/admin/SupplierAccess/status',
		method: 'post',
		data,
	});
}