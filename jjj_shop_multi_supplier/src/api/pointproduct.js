import request from '@/utils/request'
/**
 * @description 商品列表
 * @param
 * @returns
 */
export async function productList(data) {
	return request({
		url: '/supplier/plus.points.product/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加商品
 * @param
 * @returns
 */
export async function addProduct(data) {
	return request({
		url: '/supplier/plus.points.product/add',
		method: 'post',
		data,
	});
}
 /**
 * @description 获取详情
 * @param
 * @returns
 */
 export async function getProduct(data) {
	return request({
		url: '/supplier/plus.points.product/add',
		method: 'get',
		data,
	});
}
 /**
 * @description 获取积分商品
 * @param
 * @returns
 */
 export async function getPointProduct(data) {
	return request({
		url: '/supplier/plus.points.product/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 编辑积分商品
 * @param
 * @returns
 */
export async function editPointProduct(data) {
	return request({
		url: '/supplier/plus.points.product/edit',
		method: 'post',
		data,
	});
} 
/**
 * @description 删除商品
 * @param
 * @returns
 */
export async function deleteProduct(data) {
	return request({
		url: '/supplier/plus.points.product/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 保存配置
 * @param
 * @returns
 */
export async function saveConfig(data) {
	return request({
		url: '/supplier/plus.points.product/settings',
		method: 'post',
		data,
	});
} 
 /**
 * @description 保存配置
 * @param
 * @returns
 */
 export async function getConfig(data) {
	return request({
		url: '/supplier/plus.points.product/settings',
		method: 'get',
		data,
	});
}
/**
 * @description 获取兑换记录
 * @param
 * @returns
 */
export async function getExchange(data) {
	return request({
		url: '/supplier/plus.points.product/record',
		method: 'post',
		data,
	});
}

