import request from '@/utils/request'
/**
 * @description 用户登录
 * @param
 * @returns
 */
export async function login(data) {
	return request({
		url: '/supplier/passport/login',
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
		url: '/supplier/passport/logout',
		method: 'post',
		data,
	});
}
/**
 * @description 用户列表
 * @param
 * @returns
 */
export async function userlist(data) {
	return request({
		url: '/shop/user.user/index',
		method: 'post',
		data,
	});
}
/**
 * @description 修改密码
 * @param
 * @returns
 */
export async function EditPass(data) {
	return request({
		url: '/supplier/passport/editPass',
		method: 'post',
		data,
	});
}