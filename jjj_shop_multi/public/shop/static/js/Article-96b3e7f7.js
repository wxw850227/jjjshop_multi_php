import{q as e,r as a,e as t,d as s,h as l,i as o,A as r,c as m}from"./element-plus-78c440b2.js";import{g as i}from"./article-d609c59a.js";import{_ as u}from"./index-0e3e5afc.js";import{o as p,c as d,a as c,X as n,P as j,S as h,Q as y,a9 as f,T as b,W as g}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const _={data:()=>({category:{}}),props:["curItem","selectedIndex","opts"],created(){this.getData()},methods:{getData(){let e=this;i({page_id:e.page_id}).then((a=>{e.category=a.data.category})).catch((a=>{e.loading=!1}))}}},v={class:"common-form"},I=c("a",{href:"#",target:"_blank"},"内容管理 - 文章列表",-1);const V=u(_,[["render",function(i,u,_,V,w,x){const k=e,q=a,U=t,z=s,D=l,N=o,A=r,P=m;return p(),d("div",null,[c("div",v,[c("span",null,n(_.curItem.name),1)]),j(P,{size:"small",model:_.curItem,"label-width":"100px"},{default:h((()=>[j(U,{label:"文章分类："},{default:h((()=>[j(q,{modelValue:_.curItem.params.auto.category,"onUpdate:modelValue":u[0]||(u[0]=e=>_.curItem.params.auto.category=e)},{default:h((()=>[j(k,{label:"全部分类",value:"0"}),(p(!0),d(y,null,f(w.category,(e=>(p(),b(k,{key:e.category_id,label:e.name,value:""+e.category_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),j(U,{label:"显示数量："},{default:h((()=>[j(z,{type:"number",style:{width:"auto"},modelValue:_.curItem.params.auto.showNum,"onUpdate:modelValue":u[1]||(u[1]=e=>_.curItem.params.auto.showNum=e),class:"w-auto"},null,8,["modelValue"]),j(D,null,{default:h((()=>[g(" 文章数据请到 "),I,g(" 中管理 ")])),_:1})])),_:1}),j(U,{label:"显示类型："},{default:h((()=>[j(A,{modelValue:_.curItem.style.display,"onUpdate:modelValue":u[2]||(u[2]=e=>_.curItem.style.display=e)},{default:h((()=>[j(N,{label:"10"},{default:h((()=>[g("有图模式")])),_:1}),j(N,{label:"20"},{default:h((()=>[g("无图模式")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"])])}]]);export{V as default};
