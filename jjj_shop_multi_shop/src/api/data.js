import request from '@/utils/request'

/**
 * @description 用户接口
 * @param
 * @returns
 */
export async function getUser(data) {
	return request({
		url: '/shop/data.user/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 用户接口
 * @param
 * @returns
 */
export async function getRegion(data) {
	return request({
		url: '/shop/data.region/lists',
		method: 'post',
		data,
	});
}