import{G as e,f as t,e as s,H as o,c as r}from"./element-plus-78c440b2.js";import{o as a,c as l,a as m,X as i,P as p,S as n,a1 as u,W as d}from"./@vue-76da2f05.js";import{_ as c}from"./index-0e3e5afc.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const j={class:"common-form"},h={class:"d-s-c"};const f=c({data:()=>({}),props:["curItem","selectedIndex","opts"],created(){this.curItem.style.height=parseInt(this.curItem.style.height)},methods:{}},[["render",function(c,f,y,b,I,g){const v=e,x=t,V=s,k=o,_=r;return a(),l("div",null,[m("div",j,[m("span",null,i(y.curItem.name),1)]),p(_,{size:"small",model:y.curItem,"label-width":"100px"},{default:n((()=>[p(V,{label:"背景颜色："},{default:n((()=>[m("div",h,[p(v,{modelValue:y.curItem.style.background,"onUpdate:modelValue":f[0]||(f[0]=e=>y.curItem.style.background=e)},null,8,["modelValue"]),p(x,{type:"button",style:{"margin-left":"10px"},onClick:f[1]||(f[1]=u((e=>c.$parent.onEditorResetColor(y.curItem.style,"background","#ffffff")),["stop"]))},{default:n((()=>[d("重置")])),_:1})])])),_:1}),p(V,{label:"组件高度："},{default:n((()=>[p(k,{modelValue:y.curItem.style.height,"onUpdate:modelValue":f[2]||(f[2]=e=>y.curItem.style.height=e),min:1,max:200,"show-input":""},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])}]]);export{f as default};
