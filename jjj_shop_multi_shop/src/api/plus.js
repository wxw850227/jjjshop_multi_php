import request from '@/utils/request'
/**
 * @description 插件列表
 * @param
 * @returns
 */
export async function plusList(data) {
	return request({
		url: '/shop/plus.plus/index',
		method: 'post',
		data,
	});
}
/**
 * @description 入驻申请列表
 * @param
 * @returns
 */
export async function saleList(data) {
	return request({
		url: '/shop/plus.agent.apply/index',
		method: 'post',
		data,
	});
}
/**
 * @description 分销商审核
 * @param
 * @returns
 */
export async function editApplyStatus(data) {
	return request({
		url: '/shop/plus.agent.apply/editApplyStatus',
		method: 'post',
		data,
	});
}
/**
 * @description 分销商列表
 * @param
 * @returns
 */
export async function agentList(data) {
	return request({
		url: '/shop/plus.agent.user/index',
		method: 'post',
		data,
	});
}
/**
 * @description 查看下级用户
 * @param
 * @returns
 */
export async function agentUserFans(data) {
	return request({
		url: '/shop/plus.agent.user/fans',
		method: 'post',
		data,
	});
}
/**
 * @description 修改分销商
 * @param
 * @returns
 */
export async function toAgentUserEdit(data) {
	return request({
		url: '/shop/plus.agent.user/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改分销商
 * @param
 * @returns
 */
export async function agentUserEdit(data) {
	return request({
		url: '/shop/plus.agent.user/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除分销商
 * @param
 * @returns
 */
export async function deleteagent(data) {
	return request({
		url: '/shop/plus.agent.user/delete',
		method: 'post',
		data,
	});
}
/**
 * @description 分销订单
 * @param
 * @returns
 */
export async function agentOrder(data) {
	return request({
		url: '/shop/plus.agent.order/index',
		method: 'post',
		data,
	});
}
/**
 * @description 提现申请
 * @param
 * @returns
 */
export async function cash(data) {
	return request({
		url: '/shop/plus.agent.cash/index',
		method: 'post',
		data,
	});
}
/**
 * @description 分销商提现审核
 * @param
 * @returns
 */
export async function cashSubmit(data) {
	return request({
		url: 'shop/plus.agent.cash/submit',
		method: 'post',
		data,
	});
}
/**
 * @description 微信打款
 * @param
 * @returns
 */
export async function WxPay(data) {
	return request({
		url: '/shop/plus.agent.cash/wechat_pay',
		method: 'post',
		data,
	});
}
/**
 * @description 分销商确认打款
 * @param
 * @returns
 */
export async function money(data) {
	return request({
		url: '/shop/plus.agent.cash/money',
		method: 'post',
		data,
	});
}
/**
 * @description 分销设置
 * @param
 * @returns
 */
export async function agentSet(data) {
	return request({
		url: '/shop/plus.agent.setting/index',
		method: 'post',
		data,
	});
}
/**
 * @description 分销设置-基础设置
 * @param
 * @returns
 */
export async function basic(data) {
	return request({
		url: '/shop/plus.agent.setting/basic',
		method: 'post',
		data,
	});
}
/**
 * @description 分销设置-分销商条件
 * @param
 * @returns
 */
export async function condition(data) {
	return request({
		url: '/shop/plus.agent.setting/condition',
		method: 'post',
		data,
	});
}
/**
  * @description 分销设置-佣金设置
  * @param
  * @returns
  */
 export async function commission(data) {
 	return request({
 		url: '/shop/plus.agent.setting/commission',
 		method: 'post',
 		data,
 	});
 }
/**
  * @description 分销设置-佣金设置
  * @param
  * @returns
  */
 export async function settlement(data) {
 	return request({
 		url: '/shop/plus.agent.setting/settlement',
 		method: 'post',
 		data,
 	});
 }
/**
  * @description 分销设置-自定义文字
  * @param
  * @returns
  */
 export async function words(data) {
 	return request({
 		url: '/shop/plus.agent.setting/words',
 		method: 'post',
 		data,
 	});
 }     
/**
  * @description 分销设置-申请协议
  * @param
  * @returns
  */
 export async function license(data) {
 	return request({
 		url: '/shop/plus.agent.setting/license',
 		method: 'post',
 		data,
 	});
 }        
/**
  * @description 分销设置-页面背景图
  * @param
  * @returns
  */
 export async function background(data) {
 	return request({
 		url: '/shop/plus.agent.setting/background',
 		method: 'post',
 		data,
 	});
 }       
/**
  * @description 分销设置-模板消息
  * @param
  * @returns
  */
 export async function templateMsg(data) {
 	return request({
 		url: '/shop/plus.agent.setting/templateMsg',
 		method: 'post',
 		data,
 	});
 }          
/**
  * @description 分销设置-分销海报
  * @param
  * @returns
  */
 export async function SaveBackground(data) {
 	return request({
 		url: '/shop/plus.agent.setting/qrcode',
 		method: 'post',
 		data,
 	});
 }             
 /**
   * @description 分销设置-获取分销海报
   * @param
   * @returns
   */
  export async function GetBackground(data) {
  	return request({
  		url: '/shop/plus.agent.setting/qrcode',
  		method: 'post',
  		data,
  	});
  }          
   
   
   
   
   
  
   
   
   
   