import request from '@/utils/request'
/**
 * @description 秒杀活动列表
 * @param
 * @returns
 */
export async function activeList(data) {
	return request({
		url: 'shop/plus.seckill.Active/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加秒杀活动
 * @param
 * @returns
 */
export async function addActive(data) {
	return request({
		url: '/shop/plus.seckill.Active/add',
		method: 'post',
		data,
	});
}
/**
 * @description 获取秒杀活动数据
 * @param
 * @returns
 */
export async function getActive(data) {
	return request({
		url: '/shop/plus.seckill.Active/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 保存秒杀活动
 * @param
 * @returns
 */
export async function saveActive(data) {
	return request({
		url: '/shop/plus.seckill.Active/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除秒杀活动
 * @param
 * @returns
 */
export async function delActive(data) {
	return request({
		url: '/shop/plus.seckill.Active/delete',
		method: 'post',
		data,
	});
} 
/**
 * @description 查看商品
 * @param
 * @returns
 */
export async function seeActive(data) {
	return request({
		url: '/shop/plus.seckill.Active/see',
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
		url: '/shop/plus.seckill.Product/add',
		method: 'post',
		data,
	});
}   
/**
 * @description 获取活动已选商品
 * @param
 * @returns
 */
export async function selectProduct(data) {
	return request({
		url: '/shop/plus.seckill.Product/selectProduct',
		method: 'post',
		data,
	});
}    
/**
 * @description 秒杀商品详情
 * @param
 * @returns
 */
export async function detail(data) {
	return request({
		url: '/shop/plus.seckill.Product/detail',
		method: 'post',
		data,
	});
}     
/**
 * @description 保存秒杀商品
 * @param
 * @returns
 */
export async function saveData(data) {
	return request({
		url: '/shop/plus.seckill.Product/saveData',
		method: 'post',
		data,
	});
}  
/**
 * @description 保存秒杀商品
 * @param
 * @returns
 */   
export async function delProduct(data) {
	return request({
		url: '/shop/plus.seckill.Product/delete',
		method: 'post',
		data,
	});
}     
/**
 * @description 保存设置
 * @param
 * @returns
 */   
export async function saveSetting(data) {
	return request({
		url: '/shop/plus.seckill.Setting/index',
		method: 'post',
		data,
	});
}       
/**
 * @description 获取设置
 * @param
 * @returns
 */   
export async function getSetting(data) {
	return request({
		url: '/shop/plus.seckill.Setting/index',
		method: 'get',
		data,
	});
}       
/**
 * @description 获取设置
 * @param
 * @returns
 */   
export async function getDiySkill(data) {
	return request({
		url: '/shop/plus.seckill.Active/getDiyProduct',
		method: 'post',
		data,
	});
}    
/**
 * @description 获取审核列表
 * @param
 * @returns
 */   
export async function postSkilladuit(data) {
	return request({
		url: '/shop/plus.seckill.Product/index',
		method: 'post',
		data,
	});
}      
/**
 * @description 获取审核详情
 * @param
 * @returns
 */   
export async function getSkilledit(data) {
	return request({
		url: '/shop/plus.seckill.Product/edit',
		method: 'get',
		data,
	});
}    
/**
 * @description 提交审核状态
 * @param
 * @returns
 */   
export async function postSkilledit(data) {
	return request({
		url: '/shop/plus.seckill.Product/edit',
		method: 'post',
		data,
	});
}      
/**
 * @description 上下架
 * @param
 * @returns
 */   
export async function stateSet(data) {
	return request({
		url: '/shop/plus.seckill.Product/state',
		method: 'post',
		data,
	});
}    
