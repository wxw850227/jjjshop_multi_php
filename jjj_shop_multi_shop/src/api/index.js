import request from '@/utils/request'
/**
 * @description 基础配置
 * @param
 * @returns
 */
export async function base(data) {
	return request({
		url: '/shop/index/base',
		method: 'post',
		data,
	});
}
/**
 * @description 商城首页
 * @param
 * @returns
 */
export async function getCount(data) {
	return request({
		url: '/shop/Index/index',
		method: 'post',
		data,
	});
}