import{d as e,e as t,G as l,f as o,h as a,c as s}from"./element-plus-78c440b2.js";import{ap as r,o as m,c as u,a as c,X as n,P as d,S as i,a1 as p,W as f,$ as _}from"./@vue-76da2f05.js";import{_ as j}from"./index-73113c1c.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const y={class:"common-form"},b={class:"d-s-c"},I={class:"d-s-c"},g={class:"d-s-c"},k={class:"d-s-c"};const V=j({data:()=>({}),props:["curItem","selectedIndex"],created(){},methods:{}},[["render",function(j,V,h,v,w,x){const C=e,$=t,E=l,U=o,R=a,S=s,q=r("img-url");return m(),u("div",null,[c("div",y,[c("span",null,n(h.curItem.name),1)]),d(S,{size:"small",model:h.curItem,"label-width":"100px"},{default:i((()=>[d($,{label:"显示数量："},{default:i((()=>[d(C,{modelValue:h.curItem.params.showNum,"onUpdate:modelValue":V[0]||(V[0]=e=>h.curItem.params.showNum=e),class:"w-auto"},null,8,["modelValue"])])),_:1}),d($,{label:"时间颜色："},{default:i((()=>[c("div",b,[d(E,{modelValue:h.curItem.style.countdown_color,"onUpdate:modelValue":V[1]||(V[1]=e=>h.curItem.style.countdown_color=e)},null,8,["modelValue"]),d(U,{type:"button",style:{"margin-left":"10px"},onClick:V[2]||(V[2]=p((e=>j.$parent.onEditorResetColor(h.curItem.style,"countdown_color","#ff4c01")),["stop"]))},{default:i((()=>[f("重置 ")])),_:1})])])),_:1}),d($,{label:"价格颜色："},{default:i((()=>[c("div",I,[d(E,{modelValue:h.curItem.style.color,"onUpdate:modelValue":V[3]||(V[3]=e=>h.curItem.style.color=e)},null,8,["modelValue"]),d(U,{type:"button",style:{"margin-left":"10px"},onClick:V[4]||(V[4]=p((e=>j.$parent.onEditorResetColor(h.curItem.style,"color","#ff4c01")),["stop"]))},{default:i((()=>[f("重置 ")])),_:1})])])),_:1}),d($,{label:"时间背景颜色："},{default:i((()=>[c("div",g,[d(E,{modelValue:h.curItem.style.countdown_back_color,"onUpdate:modelValue":V[5]||(V[5]=e=>h.curItem.style.countdown_back_color=e)},null,8,["modelValue"]),d(U,{type:"button",style:{"margin-left":"10px"},onClick:V[6]||(V[6]=p((e=>j.$parent.onEditorResetColor(h.curItem.style,"countdown_back_color","#fef7e4")),["stop"]))},{default:i((()=>[f("重置 ")])),_:1})])])),_:1}),d($,{label:"背景颜色："},{default:i((()=>[c("div",k,[d(E,{modelValue:h.curItem.style.background_color,"onUpdate:modelValue":V[7]||(V[7]=e=>h.curItem.style.background_color=e)},null,8,["modelValue"]),d(U,{type:"button",style:{"margin-left":"10px"},onClick:V[8]||(V[8]=p((e=>j.$parent.onEditorResetColor(h.curItem.style,"background_color","#ff4c01")),["stop"]))},{default:i((()=>[f("重置 ")])),_:1})])])),_:1}),d($,{label:"背景顶部图片："},{default:i((()=>[d(R,{class:"diy-notice-icon"},{default:i((()=>[_(c("img",{alt:"",onClick:V[9]||(V[9]=e=>j.$parent.onEditorSelectImage(h.curItem.style,"background_image"))},null,512),[[q,h.curItem.style.background_image]])])),_:1}),d(R,null,{default:i((()=>[f("建议尺寸710×90")])),_:1})])),_:1}),d($,{label:"倒计时脚标："},{default:i((()=>[d(R,{class:"diy-notice-icon"},{default:i((()=>[_(c("img",{alt:"",onClick:V[10]||(V[10]=e=>j.$parent.onEditorSelectImage(h.curItem.style,"top_image"))},null,512),[[q,h.curItem.style.top_image]])])),_:1}),d(R,null,{default:i((()=>[f("建议尺寸102×38")])),_:1})])),_:1})])),_:1},8,["model"])])}]]);export{V as default};
