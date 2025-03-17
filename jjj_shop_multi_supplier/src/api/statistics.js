import request from '@/utils/request'
/**
 * @description 订单数据统计
 * @param
 * @returns
 */
export async function getOrderTotal(data) {
	return request({
		url: '/supplier/statistics.sales/index',
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
		url: '/supplier/statistics.sales/order',
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
		url: '/supplier/statistics.sales/product',
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
		url: '/supplier/statistics.user/index',
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
		url: '/supplier/statistics.user/scale',
		method: 'post',
		data,
	});
}
/**
 * @description 访问统计
 * @param
 * @returns
 */
export async function getVisit(data) {
	return request({
		url: '/supplier/statistics.user/visit',
		method: 'post',
		data,
	});
}
