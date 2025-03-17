import request from '@/utils/request';

/**
 * @description 消息列表
 * @param
 * @returns
 */
export async function messageList(data) {
	return request({
		url: '/admin/message/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加消息
 * @param
 * @returns
 */
export async function addMessage(data) {
	return request({
		url: '/admin/message/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改消息
 * @param
 * @returns
 */
export async function editMessage(data) {
	return request({
		url: '/admin/message/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除消息
 * @param
 * @returns
 */
export async function deleteMessage(data) {
	return request({
		url: '/admin/message/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 消息字段列表
 * @param
 * @returns
 */
export async function fieldList(data) {
	return request({
		url: '/admin/message/field',
		method: 'post',
		data,
	});
}

/**
 * @description 保存消息字段
 * @param
 * @returns
 */
export async function saveField(data) {
	return request({
		url: '/admin/message/saveField',
		method: 'post',
		data,
	});
}