import request from '@/utils/request'

/**
 * @description 保存礼包
 * @param
 * @returns
 */
export async function SavePackage(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/saveGift',
		method: 'post',
		data,
	});
}
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function getData(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/getGiftPackage',
		method: 'post',
		data,
	});
}
/**
 * @description 保存礼包
 * @param
 * @returns
 */
export async function deleteFiles(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 列表
 * @param
 * @returns
 */
export async function giftpackageList(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 发布礼包
 * @param
 * @returns
 */
export async function send(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/send',
		method: 'post',
		data,
	});
}
/**
 * @description 终止礼包
 * @param
 * @returns
 */
export async function end(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/end',
		method: 'post',
		data,
	});
}
/**
 * @description 删除
 * @param
 * @returns
 */
export async function delpackage(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/del',
		method: 'post',
		data,
	});
}
/**
 * @description 订单
 * @param
 * @returns
 */
export async function orderlist(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/orderlist',
		method: 'post',
		data,
	});
}
/**
 * @description 推广二维码
 * @param
 * @returns
 */
export async function qrcode(data) {
	return request({
		url: '/shop/plus.giftpackage.giftpackage/qrcode',
		method: 'post',
		data,
	});
}

