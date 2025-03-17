import request from '@/utils/request'
/**
 * @description 首页概况
 * @param
 * @returns
 */
export async function index(data) {
	return request({
		url: '/supplier/cash.cash/index',
		method: 'get',
		data,
	});
}
/**
 * @description 获取用户提现账户信息
 * @param
 * @returns
 */
export async function getAccount(data) {
	return request({
		url: '/supplier/cash.cash/account',
		method: 'get',
		data,
	});
}
/**
 * @description 保存用户提现账户信息
 * @param
 * @returns
 */
export async function setAccount(data) {
	return request({
		url: '/supplier/cash.cash/account',
		method: 'post',
		data,
	});
}
/**
 * @description 提现记录
 * @param
 * @returns
 */
export async function lists(data) {
	return request({
		url: '/supplier/cash.cash/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 申请提现
 * @param
 * @returns
 */
export async function apply(data) {
	return request({
		url: '/supplier/cash.cash/apply',
		method: 'post',
		data,
	});
}
/**
 * @description 店铺结算
 * @param
 * @returns
 */
export async function settled(data) {
	return request({
		url: '/supplier/cash.settled/index',
		method: 'post',
		data,
	});
}
/**
 * @description 店铺结算详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/supplier/cash.settled/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 退保证金
 * @param
 * @returns
 */
export async function refund(data) {
	return request({
		url: '/supplier/supplier.supplier/refund',
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
		url: '/supplier/auth.user/edit',
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
		url: '/supplier/auth.user/edit',
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
		url: '/supplier/auth.user/delete',
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
		url: '/supplier/auth.loginlog/index',
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
		url: '/supplier/auth.optlog/index',
		method: 'post',
		data,
	});
}