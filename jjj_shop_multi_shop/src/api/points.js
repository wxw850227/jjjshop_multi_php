import request from '@/utils/request'
/**
 * @description 积分设置
 * @param
 * @returns
 */
export async function setPoints(data) {
	return request({
		url: '/shop/user.points/setting',
		method: 'post',
		data,
	});
}
/**
 * @description 获取设置
 * @param
 * @returns
 */
export async function getPoints(data) {
	return request({
		url: '/shop/user.points/setting',
		method: 'get',
		data,
	});
}
/**
 * @description 获取积分列表
 * @param
 * @returns
 */
export async function GetUserList(data) {
	return request({
		url: '/shop/user.points/log',
		method: 'get',
		data,
	});
}

