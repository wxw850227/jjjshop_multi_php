import{ap as s,o as t,c as e,a as i,M as o,V as r,$ as p,X as a,a1 as n}from"./@vue-76da2f05.js";import{_ as l}from"./index-0e3e5afc.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./element-plus-78c440b2.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const m={class:"notice-icon"},d={class:"notice-text flex-1 text-ellipsis"},c={class:"btn-edit-del"};const j=l({data:()=>({}),props:["item","index","selectedIndex"],methods:{}},[["render",function(l,j,u,x,v,y){const b=s("img-url");return t(),e("div",null,[i("div",{onClick:j[1]||(j[1]=n((s=>l.$parent.$parent.onEditer(u.index)),["stop"]))},[i("div",{class:o(["drag optional",{selected:u.index===u.selectedIndex}])},[i("div",{class:"diy-notice",style:r({padding:u.item.style.paddingTop+"px 10px",background:u.item.style.background})},[i("div",m,[p(i("img",null,null,512),[[b,u.item.params.icon]])]),i("div",d,[i("span",{style:r({color:u.item.style.textColor})},a(u.item.params.text),5)])],4),i("div",c,[i("div",{class:"btn-del",onClick:j[0]||(j[0]=n((s=>l.$parent.$parent.onDeleleItem(u.index)),["stop"]))},"删除")])],2)])])}]]);export{j as default};
