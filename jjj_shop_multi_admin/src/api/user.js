import request from '@/utils/request';
/**
 * @description 用户登录
 * @param
 * @returns
 */
export async function login(data) {
	return request({
		url: '/admin/passport/login',
		method: 'post',
		data,
	});
}
/**
 * @description 修改密码
 * @param
 * @returns
 */
export async function editPassword(data) {
	return request({
		url: '/admin/admin.user/renew',
		method: 'post',
		data,
	});
}
/**
 * @description 退出登录
 * @param
 * @returns
 */
export async function loginOut(data) {
	return request({
		url: '/admin/passport/logout',
		method: 'post',
		data,
	});
}
/**
 * @description 获取版本
 * @param
 * @returns
 */
export async function getVersion(data) {
	return request({
		url: '/admin/index/index',
		method: 'post',
		data,
	});
}