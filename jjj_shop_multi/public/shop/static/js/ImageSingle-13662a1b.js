import{_ as e}from"./Setlink-a4343e56.js";import{H as t,e as s,G as l,f as a,F as i,d as o,h as n,c as d}from"./element-plus-78c440b2.js";import{ae as m,ap as r,o as p,c as u,a as c,X as f,P as j,S as k,a1 as h,W as g,Q as y,a9 as I,T as _,$ as b,Y as x}from"./@vue-76da2f05.js";import{_ as v}from"./index-73113c1c.js";import"./article-507cbf4e.js";import"./product-b0159307.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const V={components:{Setlink:e},data:()=>({is_linkset:!1,index:null}),props:["curItem","selectedIndex"],created(){this.curItem.style.paddingTop=parseInt(this.curItem.style.paddingTop),this.curItem.style.paddingLeft=parseInt(this.curItem.style.paddingLeft)},methods:{changeLink(e){this.is_linkset=!0,this.index=e},closeLinkset(e){this.is_linkset=!1,this.curItem.data[this.index].linkUrl=e.url,this.curItem.data[this.index].name="链接到 "+e.type+" "+e.name}}},C={class:"common-form"},L={class:"d-s-c"},U={class:"delete-box"},D={class:"pic",style:{"margin-bottom":"10px"}},w=["onClick"],T={class:"d-s-c"},$={class:"url-box flex-1"},E=c("span",{class:"key-name"},"链接地址：",-1),S={class:"url-box ml10"};const q=v(V,[["render",function(v,V,q,z,F,A){const G=t,H=s,P=l,Q=a,R=m("DeleteFilled"),W=i,X=o,Y=n,B=d,J=e,K=r("img-url");return p(),u("div",null,[c("div",C,[c("span",null,f(q.curItem.name),1)]),j(B,{size:"small",model:q.curItem,"label-width":"100px"},{default:k((()=>[j(H,{label:"上下边距："},{default:k((()=>[j(G,{modelValue:q.curItem.style.paddingTop,"onUpdate:modelValue":V[0]||(V[0]=e=>q.curItem.style.paddingTop=e),"show-input":""},null,8,["modelValue"])])),_:1}),j(H,{label:"左右边距："},{default:k((()=>[j(G,{modelValue:q.curItem.style.paddingLeft,"onUpdate:modelValue":V[1]||(V[1]=e=>q.curItem.style.paddingLeft=e),min:0,max:50,"show-input":""},null,8,["modelValue"])])),_:1}),j(H,{label:"背景颜色："},{default:k((()=>[c("div",L,[j(P,{modelValue:q.curItem.style.background,"onUpdate:modelValue":V[2]||(V[2]=e=>q.curItem.style.background=e)},null,8,["modelValue"]),j(Q,{type:"button",style:{"margin-left":"10px"},onClick:V[3]||(V[3]=h((e=>v.$parent.onEditorResetColor(q.curItem.style,"background","#ffffff")),["stop"]))},{default:k((()=>[g("重置 ")])),_:1})])])),_:1}),j(H,{label:"图片："},{default:k((()=>[(p(!0),u(y,null,I(q.curItem.data,((e,t)=>(p(),_(Y,{class:"param-img-item",key:t},{default:k((()=>[c("div",U,[j(W,{onClick:e=>v.$parent.onEditorDeleleData(t,q.selectedIndex)},{default:k((()=>[j(R)])),_:2},1032,["onClick"])]),c("div",D,[b(c("img",{alt:"",onClick:t=>v.$parent.onEditorSelectImage(e,"imgUrl")},null,8,w),[[K,e.imgUrl]])]),c("div",T,[c("div",$,[E,j(X,{modelValue:e.name,"onUpdate:modelValue":t=>e.name=t},null,8,["modelValue","onUpdate:modelValue"])]),c("div",S,[j(Q,{type:"primary",onClick:e=>A.changeLink(t)},{default:k((()=>[g("选择链接")])),_:2},1032,["onClick"])])])])),_:2},1024)))),128)),j(Y,{class:"d-c-c"},{default:k((()=>[j(Q,{onClick:v.$parent.onEditorAddData},{default:k((()=>[g("添加一个")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["model"]),F.is_linkset?(p(),_(J,{key:0,is_linkset:F.is_linkset,onCloseDialog:A.closeLinkset},{default:k((()=>[g("选择链接")])),_:1},8,["is_linkset","onCloseDialog"])):x("",!0)])}]]);export{q as default};
