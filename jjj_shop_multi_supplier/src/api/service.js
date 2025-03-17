import request from '@/utils/request'
/**
 * @description 聊天列表
 * @param
 * @returns
 */
export async function servicelist(data) {
	return request({
		url: '/supplier/chat.chat/index',
		method: 'post',
		data,
	});
}
/**
 * @description 聊天列表
 * @param
 * @returns
 */
export async function recordlist(data) {
	return request({
		url: '/supplier/chat.chat/record',
		method: 'post',
		data,
	});
}
export async function deleteShop(data) {
	return request({
		url: '/supplier/chat.chat/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function getinfo(data) {
	return request({
		url: '/supplier/chat.chat/getinfo',
		method: 'post',
		data,
	});
}
/**
 * @description 聊天列表
 * @param
 * @returns
 */
export async function chatlist(data) {
	return request({
		url: '/supplier/chat.chat/list',
		method: 'post',
		data,
	});
}
/**
 * @description 
 * @param
 * @returns
 */
export async function bindUid(data) {
	return request({
		url: '/supplier/chat.chat/bindClient',
		method: 'post',
		data,
	});
}
 

 
