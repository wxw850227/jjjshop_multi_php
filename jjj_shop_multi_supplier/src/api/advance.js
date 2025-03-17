import request from '@/utils/request'
/**
 * @description 商品列表
 * @param
 * @returns
 */
export async function productList(data) {
	return request({
		url: '/supplier/activity.advance/index',
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
		url: '/supplier/activity.advance/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加商品
 * @param
 * @returns
 */
export async function addProduct(data) {
	return request({
		url: '/supplier/activity.advance/add',
		method: 'post',
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
		url: '/supplier/activity.advance/edit',
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
		url: '/supplier/activity.advance/edit',
		method: 'post',
		data,
	});
}
export async function delProduct(data) {
	return request({
		url: '/supplier/activity.advance/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 删除广告
 * @param
 * @returns
 */
export async function getDiySkill(data) {
	return request({
		url: '/supplier/activity.advance/getDiyProduct',
		method: 'post',
		data,
	});
}


 