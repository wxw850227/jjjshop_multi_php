let url = 'http://www.jjj-shop-enterprise.com';
if(process.env.NODE_ENV != 'development'){
	url = '/api';
}
export default {
	url
}
