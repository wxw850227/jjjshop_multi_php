import request from '@/utils/request'
/**
 * @description 订单列表
 * @param
 * @returns
 */
export async function orderlist(data) {
	return request({
		url: '/supplier/order.order/index',
		method: 'post',
		data,
	});
}
/**
 * @description 订单详情
 * @param
 * @returns
 */
export async function orderdetail(data) {
	return request({
		url: '/supplier/order.order/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 售后管理
 * @param
 * @returns
 */
export async function orderrefund(data) {
	return request({
		url: '/supplier/order.refund/index',
		method: 'post',
		data,
	});
}
/**
 * @description 去发货
 * @param
 * @returns
 */
export async function delivery(data) {
	return request({
		url: '/supplier/order.order/delivery',
		method: 'post',
		data,
	});
}
/**
 * @description 确认审核
 * @param
 * @returns
 */
export async function confirm(data) {
	return request({
		url: '/supplier/order.Operate/confirmCancel',
		method: 'post',
		data,
	});
}
 /**
 * @description 售后详情
 * @param
 * @returns
 */
export async function refundDetail(data) {
	return request({
		url: '/supplier/order.refund/detail',
		method: 'get',
		data,
	});
}
 /**
 * @description 售后审核
 * @param
 * @returns
 */
 export async function Approval(data) {
	return request({
		url: '/supplier/order.refund/audit',
		method: 'get',
		data,
	});
}
/**
 * @description 确认收货并退款
 * @param
 * @returns
 */
export async function receipt(data) {
	return request({
		url: '/supplier/order.refund/receipt',
		method: 'post',
		data,
	});
}
/**
 * @description 核销
 * @param
 * @returns
 */
export async function extract(data) {
	return request({
		url: '/supplier/order.operate/extract',
		method: 'post',
		data,
	});
}
/**
 * @description 修改价格
 * @param
 * @returns
 */
export async function updatePrice(data) {
	return request({
		url: '/supplier/order.order/updatePrice',
		method: 'post',
		data,
	});
}
/**
 * @description 分销订单
 * @param
 * @returns
 */
export async function agentOrder(data) {
	return request({
		url: '/supplier/order.agent/index',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function queryLogistics(data) {
	return request({
		url: '/supplier/order.order/express',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function updateAddress(data) {
	return request({
		url: '/supplier/order.order/updateAddress',
		method: 'post',
		data,
	});
}
/**
 * @description 批量发货
 * @param
 * @returns
 */
export async function batchDelivery(data) {
	return request({
		url: '/supplier/order.operate/batchDelivery',
		method: 'post',
		data,
		formData: true,
	});
}
/**
 * @description 取消订单
 * @param
 * @returns
 */
export async function orderCancel(data) {
	return request({
		url: '/supplier/order.order/orderCancel',
		method: 'post',
		data,
		formData: true,
	});
}
/**
 * @description 虚拟商品发货
 * @param
 * @returns
 */
export async function virtual(data) {
	return request({
		url: '/supplier/order.order/virtual',
		method: 'post',
		data,
		formData: true,
	});
}
/**
 * @description 微信小程序发货
 * @param
 * @returns
 */
export async function wxDelivery(data) {
	return request({
		url: '/supplier/order.order/wxDelivery',
		method: 'post',
		data,
		formData: true,
	});
}

