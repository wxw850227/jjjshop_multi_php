export default{
	baseURL: process.env.NODE_ENV === 'development' ? '/api/index.php' : `${import.meta.env.VITE_BASIC_URL}/index.php`,
	isDev : process.env.NODE_ENV === 'development' ? true : false,
	contentType: 'application/json;charset=UTF-8',
	requestTimeout: 50000,
	successCode: [200, 0, '200', '0'],
	statusName: 'code',
	messageName: 'msg',
};