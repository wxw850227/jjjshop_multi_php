import{f as e,b as l,c as a,d as i,p as s,e as o}from"./element-plus-a75e5680.js";import{i as m}from"./request-5f88d5f5.js";import{_ as r}from"./index-88c54a2c.js";import{c as d,O as p,R as t,o as n,a as u,V as c,P as _,X as f}from"./@vue-5c89b57d.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-85afefd9.js";import"./dayjs-4d201c0d.js";import"./@element-plus-ef0dbc7a.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./axios-85bcd05e.js";import"./vue-router-2af8da50.js";import"./pinia-3964e703.js";import"./vue-demi-71ba0ef2.js";const v={data:()=>({loading:!1,form:{weixin_service:{}}}),created(){this.getParams()},methods:{getParams(){let e=this;(async function(e){return m({url:"/admin/setting.service/index",method:"get",data:e})})({}).then((l=>{e.form=l.data.vars.values,e.form.weixin_service.is_open=parseInt(e.form.weixin_service.is_open),e.loading=!1})).catch((l=>{e.loading=!1}))},onSubmit(){let l=this,a=this.form;l.$refs.form.validate((i=>{i&&(l.loading=!0,async function(e){return m({url:"/admin/setting.service/index",method:"post",data:e})}(a).then((a=>{l.loading=!1,e({message:"恭喜你，设置成功",type:"success"}),l.$router.push("/setting/service/index")})).catch((e=>{l.loading=!1})))}))}}},x={class:"product-add"},h=u("div",{class:"common-form"},"商城后台设置",-1),V=u("div",{class:"tips"}," shop端商城名称，显示在登录页 ",-1),w=u("div",{class:"tips"}," shop端商城登录背景，不填则为系统默认登录背景，填写网络地址 ",-1),g=u("div",{class:"common-form"},"商户后台设置",-1),b=u("div",{class:"tips"}," 商户端名称，显示在登录页 ",-1),y=u("div",{class:"tips"}," 商户端登录背景，不填则为系统默认登录背景，填写网络地址 ",-1),j=u("div",{class:"common-form"},"微信服务商支付设置",-1),k=u("div",{class:"tips"}," 填写服务商户号、10位数字 ",-1),U=u("div",{class:"tips"}," 填写服务商户支付秘钥apikey ",-1),q=u("div",{class:"tips"}," 填写服务商户号绑定的公众号appid ",-1),P=u("div",{class:"tips"}," 填写平台支付证书序列号serial ",-1),C=u("div",{class:"tips"},"使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来",-1),O=u("div",{class:"tips"},"使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来",-1),S={class:"button-wrapper"};const $=r(v,[["render",function(e,m,r,v,$,z){const I=a,R=i,X=s,A=o,B=l;return n(),d("div",x,[p(B,{ref:"form",model:$.form,"label-width":"150px"},{default:t((()=>[h,p(R,{label:"商城系统名称",rules:[{required:!0,message:" "}],prop:"shop_name"},{default:t((()=>[p(I,{modelValue:$.form.shop_name,"onUpdate:modelValue":m[0]||(m[0]=e=>$.form.shop_name=e),placeholder:"商城名称",class:"max-w460"},null,8,["modelValue"]),V])),_:1}),p(R,{label:"商城登录背景",prop:"shop_bg_img"},{default:t((()=>[p(I,{modelValue:$.form.shop_bg_img,"onUpdate:modelValue":m[1]||(m[1]=e=>$.form.shop_bg_img=e),placeholder:"商城登录背景",class:"max-w460"},null,8,["modelValue"]),w])),_:1}),g,p(R,{label:"商户系统名称",rules:[{required:!0,message:" "}],prop:"supplier_name"},{default:t((()=>[p(I,{modelValue:$.form.supplier_name,"onUpdate:modelValue":m[2]||(m[2]=e=>$.form.supplier_name=e),placeholder:"商户系统名称",class:"max-w460"},null,8,["modelValue"]),b])),_:1}),p(R,{label:"商户登录背景",prop:"supplier_bg_img"},{default:t((()=>[p(I,{modelValue:$.form.supplier_bg_img,"onUpdate:modelValue":m[3]||(m[3]=e=>$.form.supplier_bg_img=e),placeholder:"商户登录背景",class:"max-w460"},null,8,["modelValue"]),y])),_:1}),j,p(R,{label:"是否开启微信服务商支付"},{default:t((()=>[u("div",null,[p(X,{modelValue:$.form.weixin_service.is_open,"onUpdate:modelValue":m[4]||(m[4]=e=>$.form.weixin_service.is_open=e),label:1},{default:t((()=>[c("开启")])),_:1},8,["modelValue"]),p(X,{modelValue:$.form.weixin_service.is_open,"onUpdate:modelValue":m[5]||(m[5]=e=>$.form.weixin_service.is_open=e),label:0},{default:t((()=>[c("关闭")])),_:1},8,["modelValue"])])])),_:1}),1==$.form.weixin_service.is_open?(n(),d(_,{key:0},[p(R,{label:"服务商户号"},{default:t((()=>[p(I,{modelValue:$.form.weixin_service.mch_id,"onUpdate:modelValue":m[6]||(m[6]=e=>$.form.weixin_service.mch_id=e),placeholder:"服务商户号",class:"max-w460"},null,8,["modelValue"]),k])),_:1}),p(R,{label:"服务商支付秘钥apikey"},{default:t((()=>[p(I,{modelValue:$.form.weixin_service.apikey,"onUpdate:modelValue":m[7]||(m[7]=e=>$.form.weixin_service.apikey=e),placeholder:"服务商支付秘钥apikey",class:"max-w460"},null,8,["modelValue"]),U])),_:1}),p(R,{label:"服务商appid"},{default:t((()=>[p(I,{modelValue:$.form.weixin_service.app_id,"onUpdate:modelValue":m[8]||(m[8]=e=>$.form.weixin_service.app_id=e),placeholder:"服务商appid",class:"max-w460"},null,8,["modelValue"]),q])),_:1}),p(R,{label:"证书序列号serial"},{default:t((()=>[p(I,{modelValue:$.form.weixin_service.serial_no,"onUpdate:modelValue":m[9]||(m[9]=e=>$.form.weixin_service.serial_no=e),placeholder:"证书序列号serial",class:"max-w460"},null,8,["modelValue"]),P])),_:1}),p(R,{label:"apiclient_cert.pem"},{default:t((()=>[p(I,{type:"textarea",rows:4,placeholder:"使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来",modelValue:$.form.weixin_service.cert_pem,"onUpdate:modelValue":m[10]||(m[10]=e=>$.form.weixin_service.cert_pem=e),class:"max-w460"},null,8,["modelValue"]),C])),_:1}),p(R,{label:"apiclient_key.pem"},{default:t((()=>[p(I,{type:"textarea",rows:4,placeholder:"使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来",modelValue:$.form.weixin_service.key_pem,"onUpdate:modelValue":m[11]||(m[11]=e=>$.form.weixin_service.key_pem=e),class:"max-w460"},null,8,["modelValue"]),O])),_:1})],64)):f("",!0),p(R,{label:""},{default:t((()=>[u("div",S,[p(A,{type:"primary",onClick:z.onSubmit,loading:$.loading},{default:t((()=>[c("提交")])),_:1},8,["onClick","loading"])])])),_:1})])),_:1},8,["model"])])}]]);export{$ as default};
