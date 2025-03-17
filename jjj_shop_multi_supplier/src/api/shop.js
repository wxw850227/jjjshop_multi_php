import request from '@/utils/request'
/**
 * @description 服务保障
 * @param
 * @returns
 */
export async function security(data) {
	return request({
		url: '/supplier/shop.security/index',
		method: 'post',
		data,
	});
}
/**
 * @description 申请服务
 * @param
 * @returns
 */
export async function apply(data) {
	return request({
		url: '/supplier/shop.security/apply',
		method: 'post',
		data,
	});
}
/**
 * @description 退出申请
 * @param
 * @returns
 */
export async function quit(data) {
	return request({
		url: '/supplier/shop.security/quit',
		method: 'post',
		data,
	});
}

