import{_ as e}from"./Setlink-e64802a4.js";import{H as l,e as t,G as s,f as a,i,A as o,F as d,d as n,h as m,c as r}from"./element-plus-78c440b2.js";import{ae as u,ap as p,o as c,c as f,a as j,X as y,P as k,S as h,a1 as _,W as g,Y as I,Q as b,a9 as x,T as v,$ as V}from"./@vue-76da2f05.js";import{_ as C}from"./index-0e3e5afc.js";import"./article-d609c59a.js";import"./product-edd059db.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const U={components:{Setlink:e},data:()=>({is_linkset:!1,index:null}),props:["curItem","selectedIndex"],created(){this.curItem.style.paddingTop=parseInt(this.curItem.style.paddingTop),this.curItem.style.paddingLeft=parseInt(this.curItem.style.paddingLeft)},methods:{changeLink(e){this.is_linkset=!0,this.index=e},closeLinkset(e){this.is_linkset=!1,this.curItem.data[this.index].linkUrl=e.url,this.curItem.data[this.index].name="链接到 "+e.type+" "+e.name}}},L={class:"common-form"},D={class:"d-s-c"},w={key:0,class:"red"},T=j("div",{class:"gray9"},"请确保所有图片的尺寸/比例相同。",-1),$={class:"delete-box"},E={class:"pic",style:{"margin-bottom":"10px"}},S=["onClick"],q={class:"d-s-c"},z={class:"url-box flex-1"},A=j("span",{class:"key-name"},"链接地址：",-1),F={class:"url-box ml10"};const G=C(U,[["render",function(C,U,G,H,P,Q){const R=l,W=t,X=s,Y=a,B=i,J=o,K=u("DeleteFilled"),M=d,N=n,O=m,Z=r,ee=e,le=p("img-url");return c(),f("div",null,[j("div",L,[j("span",null,y(G.curItem.name),1)]),k(Z,{size:"small",model:G.curItem,"label-width":"100px"},{default:h((()=>[k(W,{label:"上下边距："},{default:h((()=>[k(R,{modelValue:G.curItem.style.paddingTop,"onUpdate:modelValue":U[0]||(U[0]=e=>G.curItem.style.paddingTop=e),"show-input":""},null,8,["modelValue"])])),_:1}),k(W,{label:"左右边距："},{default:h((()=>[k(R,{modelValue:G.curItem.style.paddingLeft,"onUpdate:modelValue":U[1]||(U[1]=e=>G.curItem.style.paddingLeft=e),min:0,max:50,"show-input":""},null,8,["modelValue"])])),_:1}),k(W,{label:"背景颜色："},{default:h((()=>[j("div",D,[k(X,{modelValue:G.curItem.style.background,"onUpdate:modelValue":U[2]||(U[2]=e=>G.curItem.style.background=e)},null,8,["modelValue"]),k(Y,{type:"button",style:{"margin-left":"10px"},onClick:U[3]||(U[3]=_((e=>C.$parent.onEditorResetColor(G.curItem.style,"background","#ffffff")),["stop"]))},{default:h((()=>[g("重置")])),_:1})])])),_:1}),k(W,{label:"布局方式："},{default:h((()=>[k(J,{modelValue:G.curItem.style.layout,"onUpdate:modelValue":U[4]||(U[4]=e=>G.curItem.style.layout=e)},{default:h((()=>[k(B,{label:"2"},{default:h((()=>[g("堆积两列")])),_:1}),k(B,{label:"3"},{default:h((()=>[g("堆积三列")])),_:1}),k(B,{label:"4"},{default:h((()=>[g("堆积四列")])),_:1}),k(B,{label:"-1"},{default:h((()=>[g("橱窗样式")])),_:1})])),_:1},8,["modelValue"]),-1==G.curItem.style.layout?(c(),f("div",w,"橱窗样式最多显示四张图片，超出隐藏")):I("",!0),T])),_:1}),k(W,{label:"图片："},{default:h((()=>[(c(!0),f(b,null,x(G.curItem.data,((e,l)=>(c(),v(O,{class:"param-img-item",key:l},{default:h((()=>[j("div",$,[k(M,{onClick:e=>C.$parent.onEditorDeleleData(l,G.selectedIndex)},{default:h((()=>[k(K)])),_:2},1032,["onClick"])]),j("div",E,[V(j("img",{alt:"",onClick:l=>C.$parent.onEditorSelectImage(e,"imgUrl")},null,8,S),[[le,e.imgUrl]])]),j("div",q,[j("div",z,[A,k(N,{modelValue:e.name,"onUpdate:modelValue":l=>e.name=l},null,8,["modelValue","onUpdate:modelValue"])]),j("div",F,[k(Y,{type:"primary",onClick:e=>Q.changeLink(l)},{default:h((()=>[g("选择链接")])),_:2},1032,["onClick"])])])])),_:2},1024)))),128)),k(O,{class:"d-c-c"},{default:h((()=>[k(Y,{onClick:C.$parent.onEditorAddData},{default:h((()=>[g("添加一个")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["model"]),P.is_linkset?(c(),v(ee,{key:0,is_linkset:P.is_linkset,onCloseDialog:Q.closeLinkset},{default:h((()=>[g("选择链接")])),_:1},8,["is_linkset","onCloseDialog"])):I("",!0)])}]]);export{G as default};
