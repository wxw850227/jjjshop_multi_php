import request from '@/utils/request'

/**
 * @description 拼团活动列表
 * @param
 * @returns
 */
export async function activeList(data) {
	return request({
		url: '/shop/plus.assemble.active/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加拼团活动
 * @param
 * @returns
 */
export async function addActive(data) {
	return request({
		url: '/shop/plus.assemble.active/add',
		method: 'post',
		data,
	});
}
/**
 * @description 获取拼团活动数据
 * @param
 * @returns
 */
export async function editActive(data) {
	return request({
		url: '/shop/plus.assemble.active/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存拼团活动
 * @param
 * @returns
 */
export async function saveActive(data) {
	return request({
		url: '/shop/plus.assemble.active/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除拼团活动
 * @param
 * @returns
 */
export async function delActive(data) {
	return request({
		url: '/shop/plus.assemble.active/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 获取活动已选商品
 * @param
 * @returns
 */
export async function selectProduct(data) {
	return request({
		url: '/shop/plus.assemble.product/selectProduct',
		method: 'post',
		data,
	});
}
/**
 * @description 拼团商品详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/plus.assemble.product/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 保存拼团商品
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.assemble.product/saveData',
		method: 'post',
		data,
	});
}
export async function delProduct(data) {
	return request({
		url: '/shop/plus.assemble.product/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 保存设置
 * @param
 * @returns
 */
export async function saveSetting(data) {
	return request({
		url: '/shop/plus.assemble.setting/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取设置
 * @param
 * @returns
 */
export async function getSetting(data) {
	return request({
		url: '/shop/plus.assemble.setting/index',
		method: 'get',
		data,
	});
}
/**
 * @description 拼团活动
 * @param
 * @returns
 */
export async function postAssembleaduit(data) {
	return request({
		url: '/shop/plus.assemble.Product/index',
		method: 'post',
		data,
	});
}

/**
 * @description 拼团审核
 * @param
 * @returns
 */
export async function getAssembleedit(data) {
	return request({
		url: '/shop/plus.assemble.Product/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 拼团审核
 * @param
 * @returns
 */
export async function postAssembleedit(data) {
	return request({
		url: '/shop/plus.assemble.Product/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 上下架
 * @param
 * @returns
 */
export async function stateSet(data) {
	return request({
		url: '/shop/plus.assemble.Product/state',
		method: 'post',
		data,
	});
}