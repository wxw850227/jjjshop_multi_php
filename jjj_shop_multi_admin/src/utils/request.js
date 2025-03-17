import { useUserStore } from '@/store';
import router from '../router/index.js';
import axios from 'axios';
import configObj from '@/config';
let { contentType,requestTimeout,baseURL} = configObj;

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
	const userStore = useUserStore();
	const { token } = userStore;
	const hasUrl = config && config.url;
	let hasToken = '';
	if(token){
		hasToken = token;
	}
	if(config.data && config.formData){
		config.headers = {
			'Content-Type': 'multipart/form-data'
		};
	}
	config.data['token'] = `${hasToken}`;
	config.headers['token'] = `${hasToken}`;
	return config;
};

/**
 * axios响应拦截器
 * @param config 请求配置
 * @param data response数据
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async ({ config, data, status, statusText }) => {
	// removePending(config);
	// let code = data && data[statusName] ? data[statusName] : status;
	let code = data.code;
	if(code == -1){
		const userStore = useUserStore();
		const { afterLogout } = userStore;
		afterLogout();
		router.push('/login');
	}else if(code == 1){
		return data;
	}
	const errMsg = data && data.msg ? data.msg : statusText;
	ElMessage.error(errMsg);
	return Promise.reject(data);
};

/**
 * @description axios初始化
 */
const instance = axios.create({
	baseURL,
	timeout: requestTimeout,
	headers: {
		'Content-Type': contentType,
	},
});

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(config => {
	// showLoading()
	// 是否需要设置 token放在请求头
	// config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	// get请求映射params参数
	if (config.method === 'get' && config.data) {
		let url = config.url + '?';
		for (const propName of Object.keys(config.data)) {
			const value = config.data[propName];
			var part = encodeURIComponent(propName) + "=";
			if (value !== null && typeof(value) !== "undefined") {
				// 对象处理
				if (typeof value === 'object') {
					for (const key of Object.keys(value)) {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						url += subPart + encodeURIComponent(value[key]) + "&";
					}
				} else {
					url += part + encodeURIComponent(value) + "&";
				}
			}
		}
		url = url.slice(0, -1);
		config.data = {};
		config.url = url;
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})
instance.interceptors.request.use(requestConf, (error) => {
	console.log('接口请求异常，请稍后再试~');
	ElMessage.error('接口请求异常，请稍后再试~');
	return Promise.reject(error);
});

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
	(response) => handleData(response),
	(error) => {
		console.log('接口请求异常，请稍后再试~~');
		console.log(error);
		ElMessage.error('接口请求异常，请稍后重试');
		return Promise.reject(error.response);
		/* const { response } = error;
    if (error.__CANCEL__) {
      console.log("操作过于频繁，稍后重试");
    } else if(!response){
      ElMessage.error('接口请求异常，请稍后重试');
      return Promise.reject();
    }else{
      return handleData(response);
    } */
	}
);

export default instance;
