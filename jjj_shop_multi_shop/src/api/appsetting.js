import request from '@/utils/request'

/**
 * @description 小程序
 * @param
 * @returns
 */
export async function appwxDetail(data) {
	return request({
		url: '/shop/appsetting.appwx/index',
		method: 'get',
		data,
	});
}
export async function editAppWx(data) {
	return request({
		url: '/shop/appsetting.appwx/index',
		method: 'post',
		data,
	});
}
/**
 * @description 公众号
 * @param
 * @returns
 */
export async function appmpDetail(data) {
	return request({
		url: '/shop/appsetting.appmp/index',
		method: 'get',
		data,
	});
}
export async function editAppMp(data) {
	return request({
		url: '/shop/appsetting.appmp/index',
		method: 'post',
		data,
	});
}
/**
 * @description app
 * @param
 * @returns
 */
export async function appDetail(data) {
	return request({
		url: '/shop/appsetting.app/index',
		method: 'get',
		data,
	});
}
export async function editApp(data) {
	return request({
		url: '/shop/appsetting.app/index',
		method: 'post',
		data,
	});
}
/**
 * @description app开放平台
 * @param
 * @returns
 */
export async function appopenDetail(data) {
	return request({
		url: '/shop/appsetting.appopen/index',
		method: 'get',
		data,
	});
}
export async function editAppOpen(data) {
	return request({
		url: '/shop/appsetting.appopen/index',
		method: 'post',
		data,
	});
}
/**
 * @description app分享
 * @param
 * @returns
 */
export async function appshareDetail(data) {
	return request({
		url: '/shop/appsetting.appshare/index',
		method: 'get',
		data,
	});
}
export async function editAppShare(data) {
	return request({
		url: '/shop/appsetting.appshare/index',
		method: 'post',
		data,
	});
}
/**
 * @description app升级-列表
 * @param
 * @returns
 */
export async function appUpdateList(data) {
	return request({
		url: '/shop/appsetting.appupdate/index',
		method: 'post',
		data,
	});
}
/**
 * @description app升级-新增
 * @param
 * @returns
 */
export async function addAppUpdate(data) {
	return request({
		url: '/shop/appsetting.appupdate/add',
		method: 'get',
		data,
	});
}
/**
 * @description app升级-修改
 * @param
 * @returns
 */
export async function editAppUpdate(data) {
	return request({
		url: '/shop/appsetting.appupdate/edit',
		method: 'post',
		data,
	});
}
/**
 * @description app升级-删除
 * @param
 * @returns
 */
export async function delAppUpdate(data) {
	return request({
		url: '/shop/appsetting.appupdate/delete',
		method: 'post',
		data,
	});
}
/**
 * @description h5支付宝支付
 * @param
 * @returns
 */
export async function h5AlipayDetail(data) {
	return request({
		url: '/shop/appsetting.apph5/pay',
		method: 'get',
		data,
	});
}
/**
 * @description app支付宝支付
 * @param
 * @returns
 */
export async function editH5Alipay(data) {
	return request({
		url: '/shop/appsetting.apph5/pay',
		method: 'post',
		data,
	});
}
/**
 * @description 支付方式
 * @param
 * @returns
 */
export async function payDetail(data) {
	return request({
		url: '/shop/appsetting.app/pay',
		method: 'get',
		data,
	});
}
/**
 * @description 支付方式
 * @param
 * @returns
 */
export async function editPay(data) {
	return request({
		url: '/shop/appsetting.app/pay',
		method: 'post',
		data,
	});
}
