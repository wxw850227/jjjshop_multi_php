
import request from '@/utils/request'
/**
 * @description 粉丝列表
 * @param
 * @returns
 */
export async function fansList(data) {
	return request({
		url: '/supplier/operate.fans/index',
		method: 'post',
		data,
	});
}