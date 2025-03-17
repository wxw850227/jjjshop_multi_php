import request from '@/utils/request'
/**
 * @description 获取数据列表
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/shop/link.link/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取数据列表
 * @param
 * @returns
 */
export async function getPageList(data) {
	return request({
		url: '/shop/link.link/getPageList',
		method: 'post',
		data,
	});
}

