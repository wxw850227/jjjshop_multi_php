import{_ as a}from"./Upload-4b5e65e6.js";import{E as s,d as e,e as o,f as t,c as l}from"./element-plus-78c440b2.js";import{t as m,u as i}from"./setting-c6db5bb6.js";import{_ as r}from"./index-0e3e5afc.js";import{ap as p,o as d,c as n,P as u,S as c,W as f,$ as j,a as h,T as g,Y as b}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const v={components:{Upload:a},data:()=>({loading:!0,formData:{qq:"",wechat:"",mp_image:""},isupload:!1}),created(){this.getParams()},methods:{getParams(){let a=this;m({}).then((s=>{1==s.code&&(a.formData=s.data.vars.values,a.loading=!1)})).catch((a=>{}))},onSubmit(){let a=this,e=this.formData;a.$refs.formData.validate((o=>{o&&(a.loading=!0,i(e).then((e=>{a.loading=!1,s({message:"恭喜你， 客服设置成功",type:"success"})})).catch((s=>{a.loading=!1})))}))},chooseImg(){this.isupload=!0},returnImgsFunc(a){this.isupload=!1,this.formData.mp_image=a[0].file_path}}},D=h("div",{class:"common-form"},"客服设置",-1),_={class:"mt10",width:200},q={class:"common-button-wrapper"};const w=r(v,[["render",function(s,m,i,r,v,w){const y=e,x=o,k=t,I=l,Q=a,V=p("img-url");return d(),n("div",null,[u(I,{size:"small",ref:"formData",model:v.formData,"label-width":"150px"},{default:c((()=>[D,u(x,{label:"QQ",rules:[{required:!0,message:"请输入QQ"}]},{default:c((()=>[u(y,{type:"number",modelValue:v.formData.qq,"onUpdate:modelValue":m[0]||(m[0]=a=>v.formData.qq=a),placeholder:"请输入QQ",class:"max-w460"},null,8,["modelValue"])])),_:1}),u(x,{label:"微信号",rules:[{required:!0,message:"请输入微信号"}]},{default:c((()=>[u(y,{modelValue:v.formData.wechat,"onUpdate:modelValue":m[1]||(m[1]=a=>v.formData.wechat=a),placeholder:"请输入微信号",class:"max-w460"},null,8,["modelValue"])])),_:1}),u(x,{label:"公众号二维码",rules:[{required:!0,message:"请输入上传公众号二维码"}]},{default:c((()=>[u(k,{onClick:w.chooseImg},{default:c((()=>[f("选择图片")])),_:1},8,["onClick"]),j(h("img",_,null,512),[[V,v.formData.mp_image]])])),_:1}),h("div",q,[u(k,{size:"small",type:"primary",onClick:w.onSubmit,disabled:v.loading},{default:c((()=>[f("提交")])),_:1},8,["onClick","disabled"])])])),_:1},8,["model"]),v.isupload?(d(),g(Q,{key:0,isupload:v.isupload,config:{total:3},onReturnImgs:w.returnImgsFunc},null,8,["isupload","onReturnImgs"])):b("",!0)])}]]);export{w as default};
