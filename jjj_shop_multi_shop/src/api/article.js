import request from '@/utils/request'

/**
 * @description 文章列表
 * @param
 * @returns
 */
export async function articlelist(data) {
	return request({
		url: '/shop/plus.article.article/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取文章分类
 * @param
 * @returns
 */
export async function getCategory(data) {
	return request({
		url: '/shop/plus.article.category/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加文章
 * @param
 * @returns
 */
export async function addArticle(data) {
	return request({
		url: '/shop/plus.article.article/add',
		method: 'post',
		data,
	});
}
/**
 * @description 文章详情
 * @param
 * @returns
 */
export async function toEditArticle(data) {
	return request({
		url: '/shop/plus.article.article/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 编辑文章
 * @param
 * @returns
 */
export async function editArticle(data) {
	return request({
		url: '/shop/plus.article.article/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除文章
 * @param
 * @returns
 */
export async function deleteArticle(data) {
	return request({
		url: '/shop/plus.article.article/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 添加分类
 * @param
 * @returns
 */
export async function addCategiry(data) {
	return request({
		url: '/shop/plus.article.category/add',
		method: 'post',
		data,
	});
}
/**
 * @description 编辑分类
 * @param
 * @returns
 */
export async function editCategory(data) {
	return request({
		url: '/shop/plus.article.category/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除分类
 * @param
 * @returns
 */
export async function deleteCategory(data) {
	return request({
		url: '/shop/plus.article.category/delete',
		method: 'post',
		data,
	});
}
