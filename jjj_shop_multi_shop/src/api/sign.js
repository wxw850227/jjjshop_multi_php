import request from '@/utils/request'
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function getData(data) {
	return request({
		url: '/shop/plus.sign/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存数据
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.sign/index',
		method: 'post',
		data,
	});
}
/**
 * @description 用户签到列表
 * @param
 * @returns
 */
export async function getSignList(data) {
	return request({
		url: '/shop/plus.sign/lists',
		method: 'post',
		data,
	});
}
