import request from '@/utils/request'
/**
 * @description 优惠券列表
 * @param
 * @returns
 */
export async function couponList(data) {
	return request({
		url: '/supplier/coupon.coupon/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加优惠券
 * @param
 * @returns
 */
export async function addCoupon(data) {
	return request({
		url: '/supplier/coupon.coupon/add',
		method: 'post',
		data,
	});
}
/**
 * @description 获取优惠券信息
 * @param
 * @returns
 */
export async function couponDetail(data) {
	return request({
		url: '/supplier/coupon.coupon/couponDetail',
		method: 'post',
		data,
	});
}
/**
 * @description 修改优惠券
 * @param
 * @returns
 */
export async function editCoupon(data) {
	return request({
		url: '/supplier/coupon.coupon/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除优惠券
 * @param
 * @returns
 */
export async function deleteCoupon(data) {
	return request({
		url: '/supplier/coupon.coupon/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 优惠券领取记录
 * @param
 * @returns
 */
export async function receiveList(data) {
	return request({
		url: '/supplier/coupon.coupon/receive',
		method: 'post',
		data,
	});
}
/**
 * @description 去发送优惠券
 * @param
 * @returns
 */
export async function toSendCoupon(data) {
	return request({
		url: '/supplier/coupon.coupon/SendCoupon',
		method: 'get',
		data,
	});
}
/**
 * @description 发送优惠券
 * @param
 * @returns
 */
export async function SendCoupon(data) {
	return request({
		url: '/supplier/coupon.coupon/SendCoupon',
		method: 'post',
		data,
	});
}
