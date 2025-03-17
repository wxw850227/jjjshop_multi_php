
import request from '@/utils/request'
/**
 * @description 基础配置
 * @param
 * @returns
 */
export async function base(data) {
	return request({
		url: '/supplier/index/base',
		method: 'post',
		data,
	});
}
/**
 * @description 首页
 * @param
 * @returns
 */
export async function getCount(data) {
	return request({
		url: '/supplier/index/index',
		method: 'post',
		data,
	});
}