import request from '@/utils/request'
/**
 * @description 商品列表
 * @param
 * @returns
 */
export async function productList(data) {
	return request({
		url: '/shop/plus.advance.Product/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加商品
 * @param
 * @returns
 */
export async function getProduct(data) {
	return request({
		url: '/shop/plus.advance.Product/add',
		method: 'get',
		data,
	});
}
/**
 * @description 预售商品详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/plus.advance.Product/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存预售商品
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.advance.Product/edit',
		method: 'post',
		data,
	});
}
export async function delProduct(data) {
	return request({
		url: '/shop/plus.advance.Product/delete',
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
		url: '/shop/plus.advance.Setting/index',
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
		url: '/shop/plus.advance.Setting/index',
		method: 'get',
		data,
	});
}
/**
 * @description 获取设置
 * @param
 * @returns
 */
export async function getDiySkill(data) {
	return request({
		url: '/shop/plus.advance.Product/getDiyProduct',
		method: 'post',
		data,
	});
}

 