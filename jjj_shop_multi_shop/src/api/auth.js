import request from '@/utils/request';
/**
 * @description 获取当前角色权限
 * @param
 * @returns
 */
export async function getRoleList(data) {
	return request({
		url: '/shop/auth.user/getRoleList',
		method: 'post',
		data,
	});
}
/**
 * @description 获取角色信息
 * @param
 * @returns
 */
export async function getUserInfo(data) {
	return request({
		url: '/shop/auth.user/getUserInfo',
		method: 'post',
		data,
	});
}
/**
 * @description 角色列表
 * @param
 * @returns
 */
export async function roleList(data) {
	return request({
		url: '/shop/auth.role/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加角色需要的数据
 * @param
 * @returns
 */
export async function roleAddInfo(data) {
	return request({
		url: '/shop/auth.role/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加角色
 * @param
 * @returns
 */
export async function roleAdd(data) {
	return request({
		url: '/shop/auth.role/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改角色需要的数据
 * @param
 * @returns
 */
export async function roleEditInfo(data) {
	return request({
		url: '/shop/auth.role/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改角色
 * @param
 * @returns
 */
export async function roleEdit(data) {
	return request({
		url: '/shop/auth.role/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除角色
 * @param
 * @returns
 */
export async function roleDelete(data) {
	return request({
		url: '/shop/auth.role/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 管理员列表
 * @param
 * @returns
 */
export async function userList(data) {
	return request({
		url: '/shop/auth.user/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加管理员需要的数据
 * @param
 * @returns
 */
export async function userAddInfo(data) {
	return request({
		url: '/shop/auth.user/addInfo',
		method: 'post',
		data,
	});
}
/**
 * @description 添加管理员
 * @param
 * @returns
 */
export async function userAdd(data) {
	return request({
		url: '/shop/auth.user/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改管理员需要的数据
 * @param
 * @returns
 */
export async function userEditInfo(data) {
	return request({
		url: '/shop/auth.user/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改管理员
 * @param
 * @returns
 */
export async function userEdit(data) {
	return request({
		url: '/shop/auth.user/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除管理员
 * @param
 * @returns
 */
export async function userDelete(data) {
	return request({
		url: '/shop/auth.user/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 登录日志
 * @param
 * @returns
 */
export async function loginlog(data) {
	return request({
		url: '/shop/auth.loginlog/index',
		method: 'post',
		data,
	});
}
/**
 * @description 操作日志
 * @param
 * @returns
 */
export async function optlog(data) {
	return request({
		url: '/shop/auth.optlog/index',
		method: 'post',
		data,
	});
}