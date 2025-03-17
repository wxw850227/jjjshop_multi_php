import request from '@/utils/request'
/**
 * @description 会员模板列表
 * @param
 * @returns
 */
export async function messageList(data) {
	return request({
		url: '/shop/setting.message/index',
		method: 'post',
		data,
	});
}
/**
 * @description 会员模板字段列表
 * @param
 * @returns
 */
export async function fieldList(data) {
	return request({
		url: '/shop/setting.message/field',
		method: 'post',
		data,
	});
}
/**
 * @description 会员模板字段设置保存
 * @param
 * @returns
 */
export async function saveSettings(data) {
	return request({
		url: '/shop/setting.message/saveSettings',
		method: 'post',
		data,
	});
}
/**
 * @description 会员模板设置状态修改
 * @param
 * @returns
 */
export async function updateSettingsStatus(data) {
	return request({
		url: '/shop/setting.message/updateSettingsStatus',
		method: 'post',
		data,
	});
}
