import e from"./Setpages-4698dcb5.js";import t from"./Banner-d371f085.js";import i from"./ImageSingle-77029b6b.js";import d from"./Window-aa6393cd.js";import n from"./Video-309094c2.js";import o from"./Article-b45c8a9e.js";import s from"./Special-6d24dc65.js";import r from"./Notice-f8e69b1b.js";import m from"./NavBar-768d6215.js";import l from"./Product-e35fa00a.js";import c from"./Coupon-a6164056.js";import x from"./Store-5a8dd70e.js";import a from"./Service-5282306d.js";import p from"./RichText-b338f9cc.js";import I from"./Blank-dae4bd05.js";import u from"./Guide-51cee4eb.js";import f from"./Seckill-71688ed6.js";import y from"./Preview-b9d2fd5f.js";import j from"./assembleProduct-d5fa46e1.js";import k from"./BargainProduct-15a13cbc.js";import v from"./Live-3ef579c1.js";import g from"./Title-fdabfd8b.js";import{d as h}from"./vuedraggable-13be42ee.js";import{a as S}from"./element-plus-78c440b2.js";import{_ as b}from"./index-73113c1c.js";import{ae as P,o as w,c as B,a as D,P as T,M as C,S as N,T as V,Y as A}from"./@vue-76da2f05.js";import"./product-b0159307.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./vue-407f4729.js";import"./sortablejs-9c07ead7.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const G={class:"diy-phone-container"};const O=b({components:{Setpages:e,Banner:t,ImageSingle:i,Window:d,Video:n,ArticleIndex:o,Special:s,Notice:r,NavBar:m,ProductIndex:l,Coupon:c,Store:x,Service:a,RichText:p,Blank:I,Guide:u,draggable:h,Seckill:f,assembleProduct:j,BargainProduct:k,Live:v,Title:g,Preview:y},data:()=>({}),props:{form:Object,defaultData:Object,diyData:Object},created(){},methods:{onDeleleItem:function(e){let t=this;S.confirm("确定要删除吗?","提示",{type:"warning"}).then((()=>{t.diyData.items.splice(e,1),t.form.selectedIndex=-1}))},onEditer:function(e){let t=this;t.form.selectedIndex=e,t.form.curItem=t.form.selectedIndex<0?t.diyData.page:t.diyData.items[t.form.selectedIndex]},initEditor:function(){let e=this;e.$nextTick((function(){e.form.umeditor.hasOwnProperty("key")&&e.form.umeditor.destroy(),e.editorHtmlComponent(),e.form.curItem.type}))},editorHtmlComponent:function(){this.$refs["diy-editor"]}}},[["render",function(e,t,i,d,n,o){const s=P("Setpages"),r=P("Banner"),m=P("ImageSingle"),l=P("Window"),c=P("Video"),x=P("ArticleIndex"),a=P("Special"),p=P("Notice"),I=P("NavBar"),u=P("ProductIndex"),f=P("Coupon"),y=P("Store"),j=P("Service"),k=P("RichText"),v=P("Blank"),g=P("Guide"),h=P("Seckill"),S=P("Preview"),b=P("assembleProduct"),O=P("BargainProduct"),_=P("Live"),q=P("Title"),z=P("draggable");return w(),B("div",G,[D("div",{class:C(["diy-phone-item",{active:i.form.selectedIndex<0}])},[T(s,{diyData:i.diyData},null,8,["diyData"])],2),T(z,{class:"wrapper",modelValue:i.diyData.items,"onUpdate:modelValue":t[0]||(t[0]=e=>i.diyData.items=e),options:{animation:120,filter:".drag__nomove"}},{item:N((({element:e,index:t})=>[D("div",{class:C(["diy-phone-item",{active:i.form.selectedIndex==t}])},["banner"==e.type?(w(),V(r,{key:0,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"imageSingle"==e.type?(w(),V(m,{key:1,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"window"==e.type?(w(),V(l,{key:2,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"video"==e.type?(w(),V(c,{key:3,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"article"==e.type?(w(),V(x,{key:4,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"special"==e.type?(w(),V(a,{key:5,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"notice"==e.type?(w(),V(p,{key:6,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"navBar"==e.type?(w(),V(I,{key:7,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"product"==e.type?(w(),V(u,{key:8,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"coupon"==e.type?(w(),V(f,{key:9,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"store"==e.type?(w(),V(y,{key:10,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"service"==e.type?(w(),V(j,{key:11,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"richText"==e.type?(w(),V(k,{key:12,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"blank"==e.type?(w(),V(v,{key:13,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"guide"==e.type?(w(),V(g,{key:14,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"seckillProduct"==e.type?(w(),V(h,{key:15,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"previewProduct"==e.type?(w(),V(S,{key:16,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"assembleProduct"==e.type?(w(),V(b,{key:17,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"bargainProduct"==e.type?(w(),V(O,{key:18,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"live"==e.type?(w(),V(_,{key:19,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):"title"==e.type?(w(),V(q,{key:20,item:e,index:t,selectedIndex:i.form.selectedIndex},null,8,["item","index","selectedIndex"])):A("",!0)],2)])),_:1},8,["modelValue","options"])])}]]);export{O as default};
