import request from '@/utils/request'
/**
 * @description 文件类别列表
 * @param
 * @returns
 */
export async function fileCategory(data) {
	return request({
		url: '/supplier/file.file/category',
		method: 'post',
		data,
	});
}
/**
 * @description 文件列表
 * @param
 * @returns
 */
export async function fileList(data) {
	return request({
		url: '/supplier/file.file/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 删除多文件
 * @param
 * @returns
 */
export async function deleteFiles(data) {
	return request({
		url: '/supplier/file.file/deleteFiles',
		method: 'post',
		data,
	});
}
/**
 * @description 添加文件分类
 * @param
 * @returns
 */
export async function addCategory(data) {
	return request({
		url: '/supplier/file.file/addGroup',
		method: 'post',
		data,
	});
}
/**
 * @description 修改文件分类
 * @param
 * @returns
 */
export async function editCategory(data) {
	return request({
		url: '/supplier/file.file/editGroup',
		method: 'post',
		data,
	});
}
/**
 * @description 删除文件分类
 * @param
 * @returns
 */
export async function deleteCategory(data) {
	return request({
		url: '/supplier/file.file/deleteGroup',
		method: 'post',
		data,
	});
}
/**
 * @description 上传
 * @param
 * @returns
 */
export async function uploadFile(data) {
	return request({
		url: '/supplier/file.upload/image',
		method: 'post',
		data,
	});
}
/**
 * @description 移动文件
 * @param
 * @returns
 */
export async function moveFile(data) {
	return request({
		url: '/supplier/file.upload/moveFiles',
		method: 'post',
		data,
	});
}
