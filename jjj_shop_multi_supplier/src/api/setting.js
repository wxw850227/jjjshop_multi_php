import request from '@/utils/request'
/**
 * @description 打印设置模板变量
 * @param
 * @returns
 */
export async function printingDetail(data) {
	return request({
		url: '/supplier/setting.printing/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存打印设置
 * @param
 * @returns
 */
export async function editPrinting(data) {
	return request({
		url: '/supplier/setting.printing/index',
		method: 'post',
		data,
	});
}
/**
 * @description 打印设置模板变量
 * @param
 * @returns
 */
export async function clearDetail(data) {
	return request({
		url: '/supplier/setting.clear/index',
		method: 'get',
		data,
	});
}
/**
 * @description 退货地址列表
 * @param
 * @returns
 */
export async function addressList(data) {
	return request({
		url: '/supplier/setting.address/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加退货地址
 * @param
 * @returns
 */
export async function addAddress(data) {
	return request({
		url: '/supplier/setting.address/add',
		method: 'post',
		data,
	});
}
/**
 * @description 退货地址详情
 * @param
 * @returns
 */
export async function addressDetail(data) {
	return request({
		url: '/supplier/setting.address/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改退货地址
 * @param
 * @returns
 */
export async function editAddress(data) {
	return request({
		url: '/supplier/setting.address/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除退货地址
 * @param
 * @returns
 */
export async function deleteAddress(data) {
	return request({
		url: '/supplier/setting.address/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 打印机列表
 * @param
 * @returns
 */
export async function printerList(data) {
	return request({
		url: '/supplier/setting.printer/index',
		method: 'post',
		data,
	});
}
/**
 * @description 打印机类型
 * @param
 * @returns
 */
export async function printerType(data) {
	return request({
		url: '/supplier/setting.printer/add',
		method: 'get',
		data,
	});
}
/**
 * @description 添加打印机
 * @param
 * @returns
 */
export async function addPrinter(data) {
	return request({
		url: '/supplier/setting.printer/add',
		method: 'post',
		data,
	});
}
/**
 * @description 打印机详情
 * @param
 * @returns
 */
export async function printerDetail(data) {
	return request({
		url: '/supplier/setting.printer/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改打印机
 * @param
 * @returns
 */
export async function editPrinter(data) {
	return request({
		url: '/supplier/setting.printer/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除打印机
 * @param
 * @returns
 */
export async function deletePrinter(data) {
	return request({
		url: '/supplier/setting.printer/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 运费模板列表
 * @param
 * @returns
 */
export async function deliveryList(data) {
	return request({
		url: '/supplier/setting.delivery/index',
		method: 'post',
		data,
	});
}
/**
 * @description 配送区域
 * @param
 * @returns
 */
export async function deliveryArea(data) {
	return request({
		url: '/supplier/setting.delivery/area',
		method: 'post',
		data,
	});
}
/**
 * @description 添加运费模板
 * @param
 * @returns
 */
export async function addDelivery(data) {
	return request({
		url: '/supplier/setting.delivery/add',
		method: 'post',
		data,
	});
}
/**
 * @description 添加运费模板
 * @param
 * @returns
 */
export async function toaddDelivery(data) {
	return request({
		url: '/supplier/setting.delivery/add',
		method: 'get',
		data,
	});
}
/**
 * @description 运费模板详情
 * @param
 * @returns
 */
export async function deliveryDetail(data) {
	return request({
		url: '/supplier/setting.delivery/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改运费模板
 * @param
 * @returns
 */
export async function editDelivery(data) {
	return request({
		url: '/supplier/setting.delivery/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除运费模板
 * @param
 * @returns
 */
export async function deleteDelivery(data) {
	return request({
		url: '/supplier/setting.delivery/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 满额包邮变量
 * @param
 * @returns
 */
export async function fullfreeDetail(data) {
	return request({
		url: '/supplier/setting.fullfree/index',
		method: 'get',
		data,
	});
}
/**
 * @description 满额包邮设置
 * @param
 * @returns
 */
export async function editFullfree(data) {
	return request({
		url: '/supplier/setting.fullfree/index',
		method: 'post',
		data,
	});
}
/**
 * @description 获取商户信息
 * @param
 * @returns
 */
export async function getSupplier(data) {
	return request({
		url: '/supplier/setting.supplier/index',
		method: 'get',
		data,
	});
}
/**
 * @description 修改商户信息
 * @param
 * @returns
 */
export async function setSupplier(data) {
	return request({
		url: '/supplier/setting.supplier/index',
		method: 'post',
		data,
	});
}
/**
 * @description 客服设置
 * @param
 * @returns
 */
export async function getService(data) {
	return request({
		url: '/supplier/setting.service/index',
		method: 'get',
		data,
	});
}
/**
 * @description 客服设置
 * @param
 * @returns
 */
export async function setService(data) {
	return request({
		url: '/supplier/setting.service/index',
		method: 'post',
		data,
	});
}
/**
 * @description 物流公司列表
 * @param
 * @returns
 */
export async function expressList(data) {
	return request({
		url: '/supplier/setting.express/index',
		method: 'post',
		data,
	});
}


  
