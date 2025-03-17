import request from '@/utils/request'
/**
 * @description 添加门店
 * @param
 * @returns
 */
export async function addShop(data) {
	return request({
		url: '/supplier/store.store/add',
		method: 'post',
		data,
	});
}
/**
 * @description 门店详情
 * @param
 * @returns
 */
export async function shopDetail(data) {
	return request({
		url: '/supplier/store.store/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 门店编辑
 * @param
 * @returns
 */
export async function editShop(data) {
	return request({
		url: '/supplier/store.store/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除门店
 * @param
 * @returns
 */
export async function deleteShop(data) {
	return request({
		url: '/supplier/store.store/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 门店列表
 * @param
 * @returns
 */
export async function shoplist(data) {
	return request({
		url: '/supplier/store.store/index',
		method: 'post',
		data,
	});
}
/**
 * @description 门店选择列表
 * @param
 * @returns
 */
export async function storeLists(data) {
	return request({
		url: '/supplier/store.store/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 店员列表
 * @param
 * @returns
 */
export async function clerklist(data) {
	return request({
		url: '/supplier/store.clerk/index',
		method: 'post',
		data,
	});
}
/**
 * @description 店员添加
 * @param
 * @returns
 */
export async function toaddClerk(data) {
	return request({
		url: '/supplier/store.clerk/add',
		method: 'get',
		data,
	});
}
/**
 * @description 店员添加
 * @param
 * @returns
 */
export async function addClerk(data) {
	return request({
		url: '/supplier/store.clerk/add',
		method: 'post',
		data,
	});
}
/**
 * @description 店员详情
 * @param
 * @returns
 */
export async function clerkDetail(data) {
	return request({
		url: '/supplier/store.clerk/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 店员编辑
 * @param
 * @returns
 */
export async function editClerk(data) {
	return request({
		url: '/supplier/store.clerk/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除店员
 * @param
 * @returns
 */
export async function deleteClerk(data) {
	return request({
		url: '/supplier/store.clerk/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 弹出层查询
 * @param
 * @returns
 */
export async function search(data) {
	return request({
		url: '/supplier/store.clerk/search',
		method: 'post',
		data,
	});
}
/**
 * @description 核销订单列表
 * @param
 * @returns
 */
export async function orderList(data) {
	return request({
		url: '/supplier/store.order/index',
		method: 'post',
		data,
	});
}
