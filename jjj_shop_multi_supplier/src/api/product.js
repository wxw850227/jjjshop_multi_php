import request from '@/utils/request'
/**
 * @description 分类管理
 * @param
 * @returns
 */
export async function catList(data) {
	return request({
		url: '/supplier/product.category/index',
		method: 'post',
		data,
	});
}
/**
 * @description 分类添加
 * @param
 * @returns
 */
export async function catAdd(data) {
	return request({
		url: '/supplier/product.category/add',
		method: 'post',
		data,
	});
}
/**
 * @description 分类删除
 * @param
 * @returns
 */
export async function catDel(data) {
	return request({
		url: '/supplier/product.category/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 分类修改
 * @param
 * @returns
 */
export async function catEdit(data) {
	return request({
		url: '/supplier/product.category/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 产品列表
 * @param
 * @returns
 */
export async function productList(data) {
	return request({
		url: '/supplier/product.product/index',
		method: 'post',
		data,
	});
}
/**
 * @description 产品选择列表
 * @param
 * @returns
 */
export async function chooseLists(data) {
	return request({
		url: '/supplier/data.product/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 规格选择列表
 * @param
 * @returns
 */
export async function chooseSpec(data) {
	return request({
		url: '/supplier/data.product/spec',
		method: 'post',
		data,
	});
}
/**
 * @description 新增产品
 * @param
 * @returns
 */
export async function addProduct(data) {
	return request({
		url: '/supplier/product.product/add',
		method: 'post',
		data,
	});
}
/**
 * @description 产品基础数据
 * @param
 * @returns
 */
export async function getBaseData(data) {
	return request({
		url: '/supplier/product.product/add',
		method: 'get',
		data,
	});
}
/**
 * @description 删除产品
 * @param
 * @returns
 */
export async function delProduct(data) {
	return request({
		url: '/supplier/product.product/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 产品基础数据
 * @param
 * @returns
 */
export async function getEditData(data) {
	return request({
		url: '/supplier/product.product/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 新增产品
 * @param
 * @returns
 */
export async function editProduct(data) {
	return request({
		url: '/supplier/product.product/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 新增规格组
 * @param
 * @returns
 */
export async function addSpec(data) {
	return request({
		url: '/supplier/product.spec/addSpec',
		method: 'post',
		data,
	});
}
/**
 * @description 新增规格值
 * @param
 * @returns
 */
export async function addSpecValue(data) {
	return request({
		url: '/supplier/product.spec/addSpecValue',
		method: 'post',
		data,
	});
}
/**
 * @description 商品列表不带分页
 * @param
 * @returns
 */
export async function getList(data) {
	return request({
		url: '/supplier/data.product/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 商品列表不带分页
 * @param
 * @returns
 */
export async function getActiveProductList(data) {
	return request({
		url: '/supplier/plus.fans.product/lists',
		method: 'post',
		data,
	});
}
/**
 * @description 商品评论列表
 * @param
 * @returns
 */
export async function getCommentList(data) {
	return request({
		url: '/supplier/product.comment/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取评论详情
 * @param
 * @returns
 */
export async function getComment(data) {
	return request({
		url: '/supplier/product.comment/detail',
		method: 'post',
		data,
	});
} 
/**
 * @description 获取评论详情
 * @param
 * @returns
 */
export async function editComment(data) {
	return request({
		url: '/supplier/product.comment/edit',
		method: 'post',
		data,
	});
}  
/**
 * @description 删除评论
 * @param
 * @returns
 */
export async function delComment(data) {
	return request({
		url: '/supplier/product.comment/delete',
		method: 'post',
		data,
	});
} 
/**
 * @description 得到分类图片
 * @param
 * @returns
 */
export async function cateImage(data) {
	return request({
		url: '/supplier/product.category/image',
		method: 'post',
		data,
	});
}
/**
 * @description 修改状态
 * @param
 * @returns
 */
export async function changeStatus(data) {
	return request({
		url: '/supplier/product.product/state',
		method: 'post',
		data,
	});
}
   

  

