import request from '@/utils/request'
/**
 * @description 等级列表
 * @param
 * @returns
 */
export async function tagList(data) {
	return request({
		url: '/shop/user.tag/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加等级
 * @param
 * @returns
 */
export async function addTag(data) {
	return request({
		url: '/shop/user.tag/add',
		method: 'post',
		data,
	});
}
/**
 * @description 修改等级
 * @param
 * @returns
 */
export async function editTag(data) {
	return request({
		url: '/shop/user.tag/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除等级
 * @param
 * @returns
 */
export async function deleteTag(data) {
	return request({
		url: '/shop/user.tag/delete',
		method: 'post',
		data,
	});
}
   
 