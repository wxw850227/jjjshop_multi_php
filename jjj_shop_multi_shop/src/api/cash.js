import request from '@/utils/request'

/**
 * @description 首页概况
 * @param
 * @returns
 */
export async function index(data) {
	return request({
		url: '/shop/cash.cash/index',
		method: 'post',
		data,
	});
}
/**
 * @description 首页概况
 * @param
 * @returns
 */
export async function settled(data) {
	return request({
		url: '/shop/cash.settled/index',
		method: 'post',
		data,
	});
}
export async function getSettledByDate(data) {
	return request({
		url: '/shop/cash.settled/data',
		method: 'post',
		data,
	});
}
/**
 * @description 订单结算
 * @param
 * @returns
 */
export async function order(data) {
	return request({
		url: '/shop/cash.order/index',
		method: 'post',
		data,
	});
}
/**
 * @description 订单结算详情
 * @param
 * @returns
 */
export async function orderDetail(data) {
	return request({
		url: '/shop/cash.order/detail',
		method: 'post',
		data,
	});
}
