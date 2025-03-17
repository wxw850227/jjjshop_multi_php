import request from '@/utils/request'

/**
 * @description 积分设置
 * @param
 * @returns
 */
export async function setSettings(data) {
	return request({
		url: '/shop/user.balance/setting',
		method: 'post',
		data,
	});
}
/**
 * @description 获取设置
 * @param
 * @returns
 */
export async function getSettings(data) {
	return request({
		url: '/shop/user.balance/setting',
		method: 'get',
		data,
	});
}
/**
 * @description 获取积分列表
 * @param
 * @returns
 */
export async function getBalanceLog(data) {
	return request({
		url: '/shop/user.balance/log',
		method: 'get',
		data,
	});
}
/**
 * @description 充值套餐
 * @param
 * @returns
 */
export async function listPlan(data) {
	return request({
		url: '/shop/user.plan/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加套餐
 * @param
 * @returns
 */
export async function addPlan(data) {
	return request({
		url: '/shop/user.plan/add',
		method: 'get',
		data,
	});
}
/**
 * @description 修改套餐
 * @param
 * @returns
 */
export async function editPlan(data) {
	return request({
		url: '/shop/user.plan/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除套餐
 * @param
 * @returns
 */
export async function deletePlan(data) {
	return request({
		url: '/shop/user.plan/delete',
		method: 'get',
		data,
	});
}
/**
 * @description 充值记录
 * @param
 * @returns
 */
export async function log(data) {
	return request({
		url: '/shop/user.plan/log',
		method: 'post',
		data,
	});
}
/**
 * @description 获取提现设置
 * @param
 * @returns
 */
export async function getCashSetting(data) {
	return request({
		url: '/shop/user.cash/setting',
		method: 'get',
		data,
	});
}
/**
 * @description 提现设置
 * @param
 * @returns
 */
export async function cashSetting(data) {
	return request({
		url: '/shop/user.cash/setting',
		method: 'post',
		data,
	});
}
/**
 * @description 提现记录
 * @param
 * @returns
 */
export async function cashList(data) {
	return request({
		url: '/shop/user.cash/index',
		method: 'post',
		data,
	});
}
/**
 * @description 提现审核
 * @param
 * @returns
 */
export async function cashAudit(data) {
	return request({
		url: '/shop/user.cash/audit',
		method: 'post',
		data,
	});
}

/**
 * @description 确认打款
 * @param
 * @returns
 */
export async function cashMoney(data) {
	return request({
		url: '/shop/user.cash/money',
		method: 'post',
		data,
	});
}
/**
 * @description 微信付款
 * @param
 * @returns
 */
export async function cashWxpay(data) {
	return request({
		url: '/shop/user.cash/wxpay',
		method: 'post',
		data,
	});
}

