import request from '@/utils/request'

/**
 * @description 添加邀请有礼
 * @param
 * @returns
 */
export async function addInvitation(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑邀请有礼
 * @param
 * @returns
 */
export async function editInvitation(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 列表
 * @param
 * @returns
 */
export async function InvitationList(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 发布
 * @param
 * @returns
 */
export async function send(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/send',
		method: 'post',
		data,
	});
}
/**
 * @description 终止
 * @param
 * @returns
 */
export async function end(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/end',
		method: 'post',
		data,
	});
}
/**
 * @description 删除
 * @param
 * @returns
 */
export async function del(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/del',
		method: 'post',
		data,
	});
}
/**
 * @description 获取数据
 * @param
 * @returns
 */
export async function getInvitation(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/getDatas',
		method: 'post',
		data,
	});
}
/**
 * @description 推广二维码
 * @param
 * @returns
 */
export async function qrcode(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/qrcode',
		method: 'post',
		data,
	});
}
/**
 * @description 推广二维码
 * @param
 * @returns
 */
export async function partakelist(data) {
	return request({
		url: '/shop/plus.invitationgift.invitation/partakelist',
		method: 'post',
		data,
	});
}

