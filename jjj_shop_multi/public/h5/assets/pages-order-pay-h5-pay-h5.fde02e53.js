import{_ as a,z as e,B as r,o as s,c as t,w as d,f as l,h as o,d as _,e as u,t as c,R as p,k as i,j as n}from"./index-73db7405.js";const f=a({data:()=>({urls:"",order_id:0,order:{},order_type:"",loading:!0,use_balance:0}),onLoad(a){this.order_id=a.order_id,this.order_type=a.order_type,this.use_balance=a.use_balance,e({title:"加载中"}),this.getData()},methods:{getData(){let a=this;a._post("user.userweb/payH5",{order_id:a.order_id,order_type:a.order_type,pay_source:"payH5",use_balance:a.use_balance},(function(e){a.order=e.data.order,a.urls=e.data.mweb_url+"&redirect_url="+e.data.return_Url,r(),a.loading=!1}))}}},[["render",function(a,e,r,f,y,b){const h=o,m=i,g=n;return y.loading?l("",!0):(s(),t(h,{key:0,class:"pay-wrap"},{default:d((()=>[_(h,{class:"top-container"},{default:d((()=>[_(h,{class:"pay-title"},{default:d((()=>[u(" 微信支付 ")])),_:1}),_(h,{class:"price p-20-0"},{default:d((()=>[u(" 支付金额："),_(m,{class:"red f40 fb"},{default:d((()=>[u("￥"+c(y.order.pay_price),1)])),_:1})])),_:1})])),_:1}),_(h,{class:"p30"},{default:d((()=>[_(h,{class:"product-name mt30"},{default:d((()=>[u(" 订单号："+c(y.order.order_no),1)])),_:1}),_(h,{class:"mt30"},{default:d((()=>[p("a",{class:"pay",href:y.urls},[_(g,{class:"pay"},{default:d((()=>[u("确认支付")])),_:1})],8,["href"])])),_:1})])),_:1})])),_:1}))}],["__scopeId","data-v-d9909ffb"]]);export{f as default};
