import pro_url from './production.js';
var app_url = '';
// 如果是本地测试环境
if (process.env.NODE_ENV === 'development') {
	//#ifdef H5
	app_url = '/api';
	//#endif
}
// 如果是生产环境，h5环境下直接读取url
if (process.env.NODE_ENV === 'production') {
	//#ifdef H5
	if(pro_url.url){
		app_url = pro_url.url + '//' + window.location.host;
	}else{
		app_url = window.location.protocol + '//' + window.location.host;
	}
	//#endif
}
// 非h5都读生产环境
//#ifndef H5
	app_url = pro_url.url;
//#endif
console.log("开发环境",process.env.NODE_ENV)
console.log('app_url='+app_url);
export default {
	/*服务器地址*/
	app_url: app_url,
	/*appid*/
	app_id: 10001,
	//h5发布路径
	h5_addr: '/h5',
	//inonfont 字体url
	font_url: 'https://at.alicdn.com/t/c/font_4197023_t7j01i1rx6j.ttf?t=1699249073419'
}
