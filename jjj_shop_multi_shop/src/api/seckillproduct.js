import request from '@/utils/request'
/**
 * @description 添加秒杀商品
 * @param
 * @returns
 */
export async function addProduct(data) {
	return request({
		url: '/shop/plus.seckill.product/add',
		method: 'post',
		data,
	});
}
/**
 * @description 秒杀商品列表
 * @param
 * @returns
 */
export async function productList(data) {
	return request({
		url: '/shop/plus.seckill.product/index',
		method: 'post',
		data,
	});
}
/**
 * @description 秒杀商品详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/plus.seckill.product/detail',
		method: 'post',
		data,
	});
}
/**
 * @description 修改秒杀商品
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.seckill.product/saveData',
		method: 'post',
		data,
	});
}
/**
 * @description 删除秒杀商品
 * @param
 * @returns
 */
export async function deleteProduct(data) {
	return request({
		url: '/shop/plus.seckill.product/delete',
		method: 'post',
		data,
	});
}
