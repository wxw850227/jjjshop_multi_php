import request from '@/utils/request';
/**
 * @description 客服设置模板变量
 * @param
 * @returns
 */
export async function serviceDetail(data) {
	return request({
		url: '/admin/setting.service/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存客服设置
 * @param
 * @returns
 */
export async function editService(data) {
	return request({
		url: '/admin/setting.service/index',
		method: 'post',
		data,
	});
}