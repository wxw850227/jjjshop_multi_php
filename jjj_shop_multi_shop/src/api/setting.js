import request from '@/utils/request'
/**
 * @description 商城设置模板变量
 * @param
 * @returns
 */
export async function storeDetail(data) {
	return request({
		url: '/shop/setting.store/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存商城设置
 * @param
 * @returns
 */
export async function editStore(data) {
	return request({
		url: '/shop/setting.store/index',
		method: 'post',
		data,
	});
}
/**
 * @description 交易设置模板变量
 * @param
 * @returns
 */
export async function tradeDetail(data) {
	return request({
		url: '/shop/setting.trade/index',
		method: 'get',
		data,
	});
}
/**
 * @description 保存交易设置
 * @param
 * @returns
 */
export async function editTrade(data) {
	return request({
		url: '/shop/setting.trade/index',
		method: 'post',
		data,
	});
}
/**
 * @description 短信通知模板变量
 * @param
 * @returns
 */
export async function smsDetail(data) {
	return request({
		url: '/shop/setting.sms/index',
		method: 'get',
		data,
	});
}  
/**
 * @description 保存短信通知
 * @param
 * @returns
 */
export async function editSms(data) {
	return request({
		url: '/shop/setting.sms/index',
		method: 'post',
		data,
	});
}    
/**
 * @description 发送短信
 * @param
 * @returns
 */
export async function sendSms(data) {
	return request({
		url: '/shop/setting.sms/smsTest',
		method: 'post',
		data,
	});
}     
/**
 * @description 上传设置模板变量
 * @param
 * @returns
 */
export async function storageDetail(data) {
	return request({
		url: '/shop/setting.storage/index',
		method: 'get',
		data,
	});
}     
/**
 * @description 保存上传设置
 * @param
 * @returns
 */
export async function editStorage(data) {
	return request({
		url: '/shop/setting.storage/index',
		method: 'post',
		data,
	});
}     
/**
 * @description 打印设置模板变量
 * @param
 * @returns
 */
export async function printingDetail(data) {
	return request({
		url: '/shop/setting.printing/index',
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
		url: '/shop/setting.printing/index',
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
		url: '/shop/setting.clear/index',
		method: 'get',
		data,
	});
}       
/**
 * @description 保存缓存
 * @param
 * @returns
 */
export async function editCache(data) {
	return request({
		url: '/shop/setting.clear/index',
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
		url: '/shop/setting.express/index',
		method: 'post',
		data,
	});
}     
/**
 * @description 添加物流公司
 * @param
 * @returns
 */
export async function addExpress(data) {
	return request({
		url: '/shop/setting.express/add',
		method: 'post',
		data,
	});
}      
/**
 * @description 物流公司详情
 * @param
 * @returns
 */
export async function expressDetail(data) {
	return request({
		url: '/shop/setting.express/edit',
		method: 'get',
		data,
	});
}       
/**
 * @description 修改物流公司
 * @param
 * @returns
 */
export async function editExpress(data) {
	return request({
		url: '/shop/setting.express/edit',
		method: 'post',
		data,
	});
}         
/**
 * @description 删除物流公司
 * @param
 * @returns
 */
export async function deleteExpress(data) {
	return request({
		url: '/shop/setting.express/delete',
		method: 'post',
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
		url: '/shop/setting.address/index',
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
		url: '/shop/setting.address/add',
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
		url: '/shop/setting.address/edit',
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
		url: '/shop/setting.address/edit',
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
		url: '/shop/setting.address/delete',
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
		url: '/shop/setting.printer/index',
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
		url: '/shop/setting.printer/add',
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
		url: '/shop/setting.printer/add',
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
		url: '/shop/setting.printer/edit',
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
		url: '/shop/setting.printer/edit',
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
		url: '/shop/setting.printer/delete',
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
		url: '/shop/setting.delivery/index',
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
		url: '/shop/setting.delivery/area',
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
		url: '/shop/setting.delivery/add',
		method: 'post',
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
		url: '/shop/setting.delivery/edit',
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
		url: '/shop/setting.delivery/edit',
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
		url: '/shop/setting.delivery/delete',
		method: 'post',
		data,
	});
}       
/**
 * @description 物流公司编码表
 * @param
 * @returns
 */
export async function getCompany(data) {
	return request({
		url: '/shop/setting.express/companyList',
		method: 'post',
		data,
	});
}    
/**
 * @description 获取客服设置
 * @param
 * @returns
 */
export async function getMpService(data) {
	return request({
		url: '/shop/setting.MpService/index',
		method: 'get',
		data,
	});
}    
/**
 * @description 修改客服设置
 * @param
 * @returns
 */
export async function setMpService(data) {
	return request({
		url: '/shop/setting.MpService/index',
		method: 'post',
		data,
	});
}    
/**
 * @description 获取手机号设置
 * @param
 * @returns
 */
export async function getPhoneDetail(data) {
	return request({
		url: '/shop/setting.message/getphone',
		method: 'get',
		data,
	});
}   
/**
 * @description 保存获取手机号设置
 * @param
 * @returns
 */
export async function editGetPhone(data) {
	return request({
		url: '/shop/setting.message/getphone',
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
		url: '/shop/plus.fullfree/index',
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
		url: '/shop/plus.fullfree/index',
		method: 'post',
		data,
	});
}     
/**
 * @description 客服设置模板变量
 * @param
 * @returns
 */
export async function serviceDetail(data) {
	return request({
		url: '/shop/setting.service/index',
		method: 'get',
		data,
	});
}      
/**
 * @description 保存客服设置
 * @param
 * @returns
 */
export async function editService(data) {
	return request({
		url: '/shop/setting.service/index',
		method: 'post',
		data,
	});
}       
/**
 * @description 任务中心设置
 * @param
 * @returns
 */
export async function getTask(data) {
	return request({
		url: '/shop/plus.task/index',
		method: 'get',
		data,
	});
}       
/**
 * @description 任务中心设置
 * @param
 * @returns
 */
export async function editTask(data) {
	return request({
		url: '/shop/plus.task/index',
		method: 'post',
		data,
	});
}       
 
 