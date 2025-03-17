import request from '@/utils/request'
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function getData(data) {
	return request({
		url: '/shop/plus.collection/index',
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
		url: '/shop/plus.collection/index',
		method: 'post',
		data,
	});
}

