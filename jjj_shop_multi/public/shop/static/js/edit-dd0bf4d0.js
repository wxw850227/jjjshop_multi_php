import{E as e,d as s,O as o,e as t,f as a,c as l}from"./element-plus-78c440b2.js";import{n as r,o as i}from"./setting-c6db5bb6.js";import{b as m}from"./vue-router-590ae0e4.js";import{_ as p}from"./index-0e3e5afc.js";import{r as d,o as n,c as u,P as c,S as f,a as x,W as j}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const _={setup(){const s=d(null),o=d(!1),t=d({form:{express_id:"",express_name:"",express_code:"",wx_code:"",sort:""}}),a=m(),l=()=>{const e=a.query.express_id;r({express_id:e}).then((e=>{let s=e.data.detail;t.value.form.express_id=s.express_id,t.value.form.express_name=s.express_name,t.value.form.express_code=s.express_code,t.value.form.wx_code=s.wx_code,t.value.form.sort=s.sort})).catch((e=>{}))};return l(),{state:t.value,loading:o,getData:l,onSubmit:()=>{o.value=!0;let s=t.value.form;i(s).then((s=>{o.value=!1,e({message:"恭喜你，修改成功",type:"success"}),a.push("/setting/express/index")})).catch((e=>{o.value=!1}))},gotoCompany:()=>{let e=window.location.protocol+"//"+window.location.host;window.location.href=e+"/express.xlsx"},formRef:s,router:a,gotoWxCompany:()=>{const e=window.location.protocol+"//"+window.location.host;window.location.href=e+"/wx_express.xlsx"}}}},w={class:"product-add"},v=x("div",{class:"common-form"},"修改物流公司",-1),h={class:"tips"},y=x("div",{class:"tips"},"用于快递100API查询物流信息，务必填写正确",-1),b={class:"tips"},g=x("div",{class:"tips"},"用于向小程序发货的物流公司id，下载微信物流表格对比快递100物流公司编码表，务必填写正确，没有找到编码不填",-1),V=x("div",{class:"tips"},"数字越小越靠前",-1),C={class:"common-button-wrapper"};const k=p(_,[["render",function(e,r,i,m,p,d){const _=s,k=o,U=t,q=a,S=l;return n(),u("div",w,[c(S,{size:"small",model:m.state.form,"label-width":"200px",ref:m.formRef},{default:f((()=>[v,c(U,{label:"物流公司名称 "},{default:f((()=>[c(_,{modelValue:m.state.form.express_name,"onUpdate:modelValue":r[0]||(r[0]=e=>m.state.form.express_name=e),class:"max-w460"},null,8,["modelValue"]),x("div",h,[j(" 请对照 "),c(k,{type:"primary",underline:!1,onClick:r[1]||(r[1]=e=>m.gotoCompany())},{default:f((()=>[j("物流公司编码表")])),_:1}),j(" 填写 ")])])),_:1}),c(U,{label:"物流公司代码 "},{default:f((()=>[c(_,{modelValue:m.state.form.express_code,"onUpdate:modelValue":r[2]||(r[2]=e=>m.state.form.express_code=e),class:"max-w460"},null,8,["modelValue"]),y])),_:1}),c(U,{label:"微信物流公司id "},{default:f((()=>[c(_,{modelValue:m.state.form.wx_code,"onUpdate:modelValue":r[3]||(r[3]=e=>m.state.form.wx_code=e),class:"max-w460"},null,8,["modelValue"]),x("div",b,[j("请对照 "),c(k,{type:"primary",underline:!1,onClick:r[4]||(r[4]=e=>m.gotoWxCompany())},{default:f((()=>[j(" 微信物流公司编码表 ")])),_:1}),j(" 填写 ")]),g])),_:1}),c(U,{label:"排序"},{default:f((()=>[c(_,{modelValue:m.state.form.sort,"onUpdate:modelValue":r[5]||(r[5]=e=>m.state.form.sort=e),type:"number",class:"max-w460"},null,8,["modelValue"]),V])),_:1}),x("div",C,[c(q,{type:"primary",onClick:m.onSubmit,loading:m.loading},{default:f((()=>[j("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{k as default};
