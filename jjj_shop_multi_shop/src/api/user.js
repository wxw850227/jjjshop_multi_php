import request from '@/utils/request';
/**
 * @description 用户登录
 * @param
 * @returns
 */
export async function login(data) {
	return request({
		url: '/shop/passport/login',
		method: 'post',
		data,
	});
}
/**
 * @description 用户登录
 * @param
 * @returns
 */
export async function saasLogin(data) {
	return request({
		url: '/shop/passport/saasLogin',
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
		url: '/shop/passport/logout',
		method: 'post',
		data,
	});
}
/**
 * @description 添加用户
 * @param
 * @returns
 */
export async function adduser(data) {
	return request({
		url: '/shop/user.user/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改用户
 * @param
 * @returns
 */
export async function edituser(data) {
	return request({
		url: '/shop/user.user/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 充值
 * @param
 * @returns
 */
export async function userRecharge(data) {
	return request({
		url: '/shop/user.user/recharge',
		method: 'post',
		data,
	});
}
/**
 * @description 删除用户
 * @param
 * @returns
 */
export async function deleteuser(data) {
	return request({
		url: '/shop/user.user/delete',
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
 * @description 等级列表
 * @param
 * @returns
 */
export async function gradelist(data) {
	return request({
		url: '/shop/user.grade/index',
		method: 'post',
		data,
	});
}
/**
 * @description 等级列表
 * @param
 * @returns
 */
export async function gradelog(data) {
	return request({
		url: '/shop/user.grade/log',
		method: 'post',
		data,
	});
}
/**
 * @description 添加等级
 * @param
 * @returns
 */
export async function addgrade(data) {
	return request({
		url: '/shop/user.grade/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改等级
 * @param
 * @returns
 */
export async function editGrade(data) {
	return request({
		url: '/shop/user.grade/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除等级
 * @param
 * @returns
 */
export async function deletegrade(data) {
	return request({
		url: '/shop/user.grade/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 用户余额
 * @param
 * @returns
 */
export async function BalanceLog(data) {
	return request({
		url: '/shop/user.Balance/log',
		method: 'post',
		data,
	});
}
/**
 * @description 充值记录
 * @param
 * @returns
 */
export async function RechargeOrder(data) {
	return request({
		url: '/shop/user.Recharge/order',
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
		url: '/shop/passport/editPass',
		method: 'post',
		data,
	});
}
/**
 * @description 用户标签
 * @param
 * @returns
 */
export async function toEditTag(data) {
	return request({
		url: '/shop/user.user/tag',
		method: 'get',
		data,
	});
}
/**
 * @description 用户标签
 * @param
 * @returns
 */
export async function editTag(data) {
	return request({
		url: '/shop/user.user/tag',
		method: 'post',
		data,
	});
}
/**
 * @description 修改用户
 * @param
 * @returns
 */
export async function getuser(data) {
	return request({
		url: '/shop/user.user/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改用户
 * @param
 * @returns
 */
export async function editgrade(data) {
	return request({
		url: '/shop/user.user/grade',
		method: 'post',
		data,
	});
}