import request from '@/utils/request'
/**
 * @description 供应商列表
 * @param
 * @returns
 */
export async function supplierList(data) {
	return request({
		url: '/shop/supplier.supplier/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加供应商
 * @param
 * @returns
 */
export async function toaddSupplier(data) {
	return request({
		url: '/shop/supplier.supplier/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加供应商
 * @param
 * @returns
 */
export async function addSupplier(data) {
	return request({
		url: '/shop/supplier.supplier/add',
		method: 'post',
		data,
	});
}
/**
 * @description 供应商编辑
 * @param
 * @returns
 */
export async function toEditSupplier(data) {
	return request({
		url: '/shop/supplier.supplier/edit',
		method: 'get',
		data,
	});
} 
/**
 * @description 供应商编辑
 * @param
 * @returns
 */
export async function editSupplier(data) {
	return request({
		url: '/shop/supplier.supplier/edit',
		method: 'post',
		data,
	});
}   
/**
 * @description 删除供应商
 * @param
 * @returns
 */
export async function deleteSupplier(data) {
	return request({
		url: '/shop/supplier.supplier/delete',
		method: 'post',
		data,
	});
}     
/**
 * @description 提现记录
 * @param
 * @returns
 */
export async function cashList(data) {
	return request({
		url: '/shop/supplier.cash/index',
		method: 'post',
		data,
	});
}     
/**
 * @description 提现审核
 * @param
 * @returns
 */
export async function cashSubmit(data) {
	return request({
		url: '/shop/supplier.cash/submit',
		method: 'post',
		data,
	});
}       
/**
 * @description 提现确认打款
 * @param
 * @returns
 */
export async function cashMoney(data) {
	return request({
		url: '/shop/supplier.cash/money',
		method: 'post',
		data,
	});
}    
/**
 * @description 供应商待审核列表
 * @param
 * @returns
 */
export async function supplierPendList(data) {
	return request({
		url: '/shop/supplier.supplier/apply',
		method: 'post',
		data,
	});
}      
/**
 * @description 供应商审核详情
 * @param
 * @returns
 */
export async function toAudit(data) {
	return request({
		url: '/shop/supplier.supplier/audit',
		method: 'get',
		data,
	});
}        
/**
 * @description 供应商审核
 * @param
 * @returns
 */
export async function audit(data) {
	return request({
		url: '/shop/supplier.supplier/audit',
		method: 'post',
		data,
	});
}         
/**
 * @description 获取主营分类
 * @param
 * @returns
 */
export async function Category(data) {
	return request({
		url: '/shop/supplier.Category/index',
		method: 'post',
		data,
	});
}      
/**
 * @description 添加分类
 * @param
 * @returns
 */
export async function addCategory(data) {
	return request({
		url: '/shop/supplier.Category/add',
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
		url: '/shop/supplier.Category/edit',
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
		url: '/shop/supplier.Category/delete',
		method: 'post',
		data,
	});
}       
/**
 * @description 押金列表
 * @param
 * @returns
 */
export async function supplierOrder(data) {
	return request({
		url: '/shop/supplier.Order/index',
		method: 'post',
		data,
	});
}       
/**
 * @description 押金列表
 * @param
 * @returns
 */
export async function refundList(data) {
	return request({
		url: '/shop/supplier.supplier/refund',
		method: 'post',
		data,
	});
}        
/**
 * @description 退押金操作
 * @param
 * @returns
 */
export async function refundSubmit(data) {
	return request({
		url: '/shop/supplier.supplier/submit',
		method: 'post',
		data,
	});
}         
/**
 * @description 服务保障申请列表
 * @param
 * @returns
 */
export async function securityList(data) {
	return request({
		url: '/shop/supplier.supplier/security',
		method: 'post',
		data,
	});
}    
/**
 * @description 服务保障操作
 * @param
 * @returns
 */
export async function securityVerify(data) {
	return request({
		url: '/shop/supplier.supplier/verify',
		method: 'post',
		data,
	});
}      
/**
 * @description 获取广告分类
 * @param
 * @returns
 */
export async function SecurityList(data) {
	return request({
		url: '/shop/supplier.Security/index',
		method: 'post',
		data,
	});
}      
/**
 * @description 添加分类
 * @param
 * @returns
 */
export async function addSecurity(data) {
	return request({
		url: '/shop/supplier.Security/add',
		method: 'post',
		data,
	});
}         
/**
 * @description 编辑分类
 * @param
 * @returns
 */
export async function editSecurity(data) {
	return request({
		url: '/shop/supplier.Security/edit',
		method: 'post',
		data,
	});
}    
/**
 * @description 删除分类
 * @param
 * @returns
 */
export async function deleteSecurity(data) {
	return request({
		url: '/shop/supplier.Security/delete',
		method: 'post',
		data,
	});
}    
/**
 * @description 开启禁止
 * @param
 * @returns
 */
export async function supplierRecycle(data) {
	return request({
		url: '/shop/supplier.supplier/recycle',
		method: 'post',
		data,
	});
}     
  