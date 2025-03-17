import request from '@/utils/request'
/**
 * @description 广告列表
 * @param
 * @returns
 */
export async function adList(data) {
	return request({
		url: '/supplier/operate.ad/index',
		method: 'post',
		data,
	});
}
/**
 * @description 添加广告
 * @param
 * @returns
 */
export async function addAd(data) {
	return request({
		url: '/supplier/operate.ad/add',
		method: 'post',
		data,
	});
}
/**
 * @description 添加广告
 * @param
 * @returns
 */
export async function toaddAd(data) {
	return request({
		url: '/supplier/operate.ad/add',
		method: 'get',
		data,
	});
}
/**
 * @description 广告详情
 * @param
 * @returns
 */
export async function adDetail(data) {
	return request({
		url: '/supplier/operate.ad/edit',
		method: 'get',
		data,
	});
}
/**
 * @description 修改广告
 * @param
 * @returns
 */
export async function editAd(data) {
	return request({
		url: '/supplier/operate.ad/edit',
		method: 'post',
		data,
	});
}
/**
 * @description 删除广告
 * @param
 * @returns
 */
export async function deleteAd(data) {
	return request({
		url: '/supplier/operate.ad/delete',
		method: 'post',
		data,
	});
}


 