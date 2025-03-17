import request from '@/utils/request'
/**
 * @description 直播列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/supplier/plus.live.wx/index',
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
		url: '/supplier/plus.live.wx/syn',
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
		url: '/supplier/plus.live.wx/settop',
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
		url: '/supplier/live.room/index',
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
		url: '/supplier/live.room/edit',
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
		url: '/supplier/live.room/delete',
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
		url: '/supplier/live.gift/index',
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
		url: '/supplier/live.gift/add',
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
		url: '/supplier/live.gift/edit',
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
		url: '/supplier/live.gift/delete',
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
		url: '/supplier/live.room/product',
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
		url: '/supplier/live.room/getOrderList',
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
		url: '/supplier/live.room/user_gift',
		method: 'post',
		data,
	});
}