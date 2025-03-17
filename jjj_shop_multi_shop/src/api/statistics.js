import request from '@/utils/request'
/**
 * @description 订单数据统计
 * @param
 * @returns
 */
export async function getOrderTotal(data) {
	return request({
		url: '/shop/statistics.sales/index',
		method: 'post',
		data,
	});
}
/**
 * @description 订单时间段统计
 * @param
 * @returns
 */
export async function getOrderByDate(data) {
	return request({
		url: '/shop/statistics.sales/order',
		method: 'post',
		data,
	});
}
/**
 * @description 商品时间段统计
 * @param
 * @returns
 */
export async function getProductByDate(data) {
	return request({
		url: '/shop/statistics.sales/product',
		method: 'post',
		data,
	});
}
/**
 * @description 会员数据统计
 * @param
 * @returns
 */
export async function getUserTotal(data) {
	return request({
		url: '/shop/statistics.user/index',
		method: 'post',
		data,
	});
}
/**
 * @description 成交占比
 * @param
 * @returns
 */
export async function getUserScale(data) {
	return request({
		url: '/shop/statistics.user/scale',
		method: 'post',
		data,
	});
}
/**
 * @description 新增会员
 * @param
 * @returns
 */
export async function getNewUser(data) {
	return request({
		url: '/shop/statistics.user/new_user',
		method: 'post',
		data,
	});
}
/**
 * @description 成交会员数
 * @param
 * @returns
 */
export async function getPayUser(data) {
	return request({
		url: '/shop/statistics.user/pay_user',
		method: 'post',
		data,
	});
}
/**
 * @description 供应商统计
 * @param
 * @returns
 */
export async function getSupplierTotal(data) {
	return request({
		url: '/shop/statistics.supplier/index',
		method: 'post',
		data,
	});
}
/**
 * @description 供应商时间段统计
 * @param
 * @returns
 */
export async function getSupplierByDate(data) {
	return request({
		url: '/shop/statistics.supplier/data',
		method: 'post',
		data,
	});
}
/**
 * @description 访问统计
 * @param
 * @returns
 */
export async function getAccessTotal(data) {
	return request({
		url: '/shop/statistics.access/index',
		method: 'post',
		data,
	});
}
/**
 * @description 访问时间段统计
 * @param
 * @returns
 */
export async function getAccessByDate(data) {
	return request({
		url: '/shop/statistics.access/data',
		method: 'post',
		data,
	});
}