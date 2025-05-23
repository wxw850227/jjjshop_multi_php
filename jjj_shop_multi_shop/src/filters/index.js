import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/base.js'
import {
  createdAuth
} from '@/utils/createdAuth.js'
import qs from 'qs';
import {
	useUserStore
} from '@/store';
const filters = {

  /*测试过滤*/
  testFilter:function(val){
    console.log(val);
    return val%2==0?true:false;
  },

  /*判断有没有权限*/
  isAuth:function(val){
    let auth=getSessionStorage('authlist');
    if(!auth){
      let authlist={}
      createdAuth(auth,authlist);
      setSessionStorage('authlist', authlist);
      auth=authlist;
    }
    let value=val.toLowerCase();
    if(auth[value]!=true){
      return false;
    }else{
      return true;
    }
  },

	/*判断字段是否为空，为空的话先说-*/
	isNull:function(val){

		if(val==null||val==undefined||val===""||val==="null"||val=='undefined'){
			return '-';
		}else if(val==0 || val=='0'){
			return val;
		}
		else{
			return val;
		}
	},

	/*百分比*/
	returnPercentage:function(val){
		if(val!==null&&val!==''&&val!==undefined){
			let num=(val*100).toFixed(2);
			return num+'%';
		}else{
			return '-';
		}
	},

	/*小数点后面保留位数*/
	returnToFixed:function(val,num){
		if(val!=null){
			let nums=val.toFixed(num);
			return nums;
		}else{
			if(val!=null&&val!==""){
				return val;
			}else{
				return '-';
			}
		}
	},

	/*取万元*/
	tenThousand:function(val){
		if(val!=null&&val!=''){
			var x=(val/10000).toFixed(2);
			var f = Math.round(x * 100) / 100;
   			var s = f.toString();
			return s;
		}else{
			return '-';
		}
	},

	/*数字换成周*/
	numTabWeek: function(val) {

		let ch = '';
		switch(val) {
			case 1:
				ch = '一';
				break;
			case 2:
				ch = '二';
				break;
			case 3:
				ch = '三';
				break;
			case 4:
				ch = '四';
				break;
			case 5:
				ch = '五';
				break;
			case 6:
				ch = '六';
				break;
			case 7:
				ch = '日';
				break;
		}
		return ch;

	},

	/*返回性别*/
	convertSex: function(num){
		let sex = '';
		switch(num) {
			case 0:
				sex = '女';
				break;
			case 1:
				sex= '男';
				break;
			default:
				sex = '其他';
		}
		return sex;
	},
	/* 导出 */
	onExportFunc: function(url, params) {
		const {
			app_id
		} = useUserStore();
		params.AppID = app_id;
		let baseUrl = import.meta.env.VITE_BASIC_URL;
		if (!baseUrl) {
			baseUrl = window.location.protocol + '//' + window.location.host;
		}
		window.location.href =
			baseUrl +
			url + "?" +
			qs.stringify(params);
	},


}

export default filters;
