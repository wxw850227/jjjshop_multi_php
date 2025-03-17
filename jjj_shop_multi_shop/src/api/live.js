import request from '@/utils/request'

/**
 * @description 直播列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/shop/plus.live.wx/index',
		method: 'post',
		data,
	});
}
/**
 * @description 直播列表同步
 * @param
 * @returns
 */
export async function syn(data) {
	return request({
		url: '/shop/plus.live.wx/syn',
		method: 'post',
		data,
	});
}
/**
 * @description 置顶设置
 * @param
 * @returns
 */
export async function settop(data) {
	return request({
		url: '/shop/plus.live.wx/settop',
		method: 'post',
		data,
	});
}
/**
 * @description 直播间列表
 * @param
 * @returns
 */
export async function getRoom(data) {
	return request({
		url: '/shop/plus.live.room/index',
		method: 'post',
		data,
	});
}
/**
 * @description 直播间修改
 * @param
 * @returns
 */
export async function editRoom(data) {
	return request({
		url: '/shop/plus.live.room/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除直播间
 * @param
 * @returns
 */
export async function deleteRoom(data) {
	return request({
		url: '/shop/plus.live.room/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 获取礼物列表
 * @param
 * @returns
 */
export async function getGift(data) {
	return request({
		url: '/shop/plus.live.gift/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加礼物
 * @param
 * @returns
 */
export async function addGift(data) {
	return request({
		url: '/shop/plus.live.gift/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑礼物
 * @param
 * @returns
 */
export async function editGift(data) {
	return request({
		url: '/shop/plus.live.gift/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除礼物
 * @param
 * @returns
 */
export async function deleteGift(data) {
	return request({
		url: '/shop/plus.live.gift/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 获取直播设置
 * @param
 * @returns
 */
export async function getSetting(data) {
	return request({
		url: '/shop/plus.live.setting/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存直播设置
 * @param
 * @returns
 */
export async function setSetting(data) {
	return request({
		url: '/shop/plus.live.setting/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取直播间商品列表
 * @param
 * @returns
 */
export async function getProduct(data) {
	return request({
		url: '/shop/plus.live.room/product',
		method: 'post',
		data,
	});
}
/**
 * @description 获取直播间商品列表
 * @param
 * @returns
 */
export async function getOrderList(data) {
	return request({
		url: '/shop/plus.live.order/list',
		method: 'post',
		data,
	});
}
/**
 * @description 获取直播间商品列表
 * @param
 * @returns
 */
export async function getUserGift(data) {
	return request({
		url: '/shop/plus.live.room/user_gift',
		method: 'post',
		data,
	});
}
/**
 * @description 审核中
 * @param
 * @returns
 */
export async function auditRoom(data) {
	return request({
		url: '/shop/plus.live.room/audit',
		method: 'post',
		data,
	});
}