import{H as e,e as t,G as l,f as a,i as s,A as o,h as r,d as m,c as u}from"./element-plus-78c440b2.js";import{ap as i,o as d,c as p,a as n,X as c,P as j,S as f,a1 as I,W as y,$ as b}from"./@vue-76da2f05.js";import{_}from"./index-0e3e5afc.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const h={class:"common-form"},V={class:"d-s-c"},g={class:"d-s-c"};const x=_({data:()=>({}),props:["curItem","selectedIndex","opts"],created(){this.curItem.style.paddingTop=parseInt(this.curItem.style.paddingTop)},methods:{}},[["render",function(_,x,v,C,k,w){const F=e,U=t,T=l,$=a,E=s,q=o,z=r,R=m,S=u,A=i("img-url");return d(),p("div",null,[n("div",h,[n("span",null,c(v.curItem.name),1)]),j(S,{size:"small",model:v.curItem,"label-width":"100px"},{default:f((()=>[j(U,{label:"上下边距："},{default:f((()=>[j(F,{modelValue:v.curItem.style.paddingTop,"onUpdate:modelValue":x[0]||(x[0]=e=>v.curItem.style.paddingTop=e),"show-input":""},null,8,["modelValue"])])),_:1}),j(U,{label:"背景颜色："},{default:f((()=>[n("div",V,[j(T,{modelValue:v.curItem.style.background,"onUpdate:modelValue":x[1]||(x[1]=e=>v.curItem.style.background=e)},null,8,["modelValue"]),j($,{type:"button",style:{"margin-left":"10px"},onClick:x[2]||(x[2]=I((e=>_.$parent.onEditorResetColor(v.curItem.style,"background","#F5F5F5")),["stop"]))},{default:f((()=>[y("重置")])),_:1})])])),_:1}),j(U,{label:"文字颜色："},{default:f((()=>[n("div",g,[j(T,{modelValue:v.curItem.style.textColor,"onUpdate:modelValue":x[3]||(x[3]=e=>v.curItem.style.textColor=e)},null,8,["modelValue"]),j($,{type:"button",style:{"margin-left":"10px"},onClick:x[4]||(x[4]=I((e=>_.$parent.onEditorResetColor(v.curItem.style,"textColor","#FF0000")),["stop"]))},{default:f((()=>[y("重置")])),_:1})])])),_:1}),j(U,{label:"图标显示："},{default:f((()=>[j(q,{modelValue:v.curItem.params.show_icon,"onUpdate:modelValue":x[5]||(x[5]=e=>v.curItem.params.show_icon=e)},{default:f((()=>[j(E,{label:"yes"},{default:f((()=>[y("显示")])),_:1}),j(E,{label:"no"},{default:f((()=>[y("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),j(U,{label:"标题图标："},{default:f((()=>[j(z,{class:"diy-notice-icon"},{default:f((()=>[b(n("img",{alt:"",onClick:x[6]||(x[6]=e=>_.$parent.onEditorSelectImage(v.curItem.params,"icon"))},null,512),[[A,v.curItem.params.icon]])])),_:1}),j(z,null,{default:f((()=>[y("建议尺寸32×32")])),_:1})])),_:1}),j(U,{label:"标题文字："},{default:f((()=>[j(R,{modelValue:v.curItem.params.title,"onUpdate:modelValue":x[7]||(x[7]=e=>v.curItem.params.title=e),class:"w-auto"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])}]]);export{x as default};
