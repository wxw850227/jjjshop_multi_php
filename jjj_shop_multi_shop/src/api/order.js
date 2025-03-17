import request from '@/utils/request'
/**
 * @description 订单列表
 * @param
 * @returns
 */
export async function orderlist(data) {
	return request({
		url: '/shop/order.order/index',
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
		url: '/shop/order.order/detail',
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
		url: '/shop/order.refund/index',
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
		url: '/shop/order.order/delivery',
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
		url: '/shop/order.Operate/confirmCancel',
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
		url: '/shop/order.refund/detail',
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
		url: '/shop/order.refund/audit',
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
		url: '/shop/order.refund/receipt',
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
		url: '/shop/order.operate/extract',
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
		url: '/shop/order.order/updatePrice',
		method: 'post',
		data,
	});
}
/**
 * @description 平台售后管理
 * @param
 * @returns
 */
export async function orderplaterefund(data) {
	return request({
		url: '/shop/order.platerefund/index',
		method: 'post',
		data,
	});
}
/**
 * @description 平台售后详情
 * @param
 * @returns
 */
export async function refundplateDetail(data) {
	return request({
		url: '/shop/order.platerefund/detail',
		method: 'get',
		data,
	});
}
/**
 * @description 平台售后审核
 * @param
 * @returns
 */
export async function plateApproval(data) {
	return request({
		url: '/shop/order.platerefund/audit',
		method: 'get',
		data,
	});
}
export async function queryLogistics(data) {
	return request({
		url: '/shop/order.order/express',
		method: 'post',
		data,
	});
}
export async function updateAddress(data) {
	return request({
		url: '/shop/order.order/updateAddress',
		method: 'post',
		data,
	});
}

    
    
    
  
   
    
   
   
  
   