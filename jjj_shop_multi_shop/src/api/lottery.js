import request from '@/utils/request'
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function getData(data) {
	return request({
		url: '/shop/plus.lottery/setting',
		method: 'get',
		data,
	});
}
/**
 * @description 编辑
 * @param
 * @returns
 */
export async function EditLottery(data) {
	return request({
		url: '/shop/plus.lottery/setting',
		method: 'post',
		data,
	});
}
/**
 * @description 列表
 * @param
 * @returns
 */
export async function recordList(data) {
	return request({
		url: '/shop/plus.lottery/record',
		method: 'post',
		data,
	});
}
export async function getAward(data) {
	return request({
		url: '/shop/plus.lottery/award',
		method: 'post',
		data,
	});
}
export async function send(data) {
	return request({
		url: '/shop/plus.lottery/send',
		method: 'post',
		data,
	});
}
export async function detail(data) {
	return request({
		url: '/shop/plus.lottery/detail',
		method: 'post',
		data,
	});
}
