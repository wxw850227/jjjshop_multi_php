import{E as s,K as t,e as a,f as i,c as o}from"./element-plus-78c440b2.js";import{i as e,_ as r,C as l}from"./index-0e3e5afc.js";import{o as n,c as m,a as p,P as d,S as u,W as c,b as j}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const f={data:()=>({mobile_url:l,form:{status:!1},Data:[],loading:!1,rules:{status:[{required:!0,message:"请输入活动名称",trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let s=this;(async function(s){return e({url:"/shop/plus.officia/index",method:"get",data:s})})({}).then((t=>{s.loading=!1,"1"==t.data.vars.values.status?s.form.status=!0:s.form.status=!1})).catch((t=>{s.loading=!1}))},onSubmit(){let t=this,a={};t.form.status?a.status=1:a.status=0,t.loading=!0,async function(s){return e({url:"/shop/plus.officia/index",method:"post",data:s})}(a).then((a=>{t.loading=!1,1==a.code?(s({message:"恭喜你，保存成功",type:"success"}),t.getData()):t.loading=!1})).catch((s=>{t.loading=!1}))}}},g={class:"attention pb50"},h={class:"attention-left"},v=["src"],b={class:"attention-right"},y=j('<div class="alert-warning"><div class="alert-icon"><span class="icon iconfont icon-gantanhao"></span></div><span class="alert-desc"><div> 1.使用该功能前，需前往小程序后台，在“设置”-&gt;“接口设置”-&gt;“公众号关注组件”中设置要展示的公众号。注：设置的公众号需与小程序主体一致。 <a href="https://mp.weixin.qq.com" target="_blank">去配置</a></div><div>2.若没有配置公众号，功能将不生效。</div><div class="attention-tips"> 3.在一个小程序的生命周期内，只有从以下场景进入小程序，才具有展示引导关注公众号的能力: <p>a）当小程序从扫小程序码打开时。</p><p> b）当从其他小程序返回小程序时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。 </p></div></span></div>',1),x={class:"common-button-wrapper"};const _=r(f,[["render",function(s,e,r,l,j,f){const _=t,w=a,q=i,k=o;return n(),m("div",g,[p("div",h,[p("img",{src:j.mobile_url,alt:"mobile"},null,8,v)]),p("div",b,[y,d(k,{ref:"form",size:"small",model:j.form,rules:j.rules,"label-width":"100px"},{default:u((()=>[d(w,{label:"公众号关注",prop:"status"},{default:u((()=>[d(_,{modelValue:j.form.status,"onUpdate:modelValue":e[0]||(e[0]=s=>j.form.status=s)},null,8,["modelValue"])])),_:1}),p("div",x,[d(q,{type:"primary",size:"small",onClick:f.onSubmit,loading:j.loading},{default:u((()=>[c("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])])}]]);export{_ as default};
