System.register(["./element-plus-legacy-257d6f76.js","./index-legacy-40e126b0.js","./@vue-legacy-22137cea.js","./lodash-es-legacy-74aa31b9.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-f51a040e.js","./dayjs-legacy-455cbe2f.js","./call-bind-legacy-ce7de972.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-8d596841.js","./escape-html-legacy-89f0c831.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-921da64f.js","./pinia-legacy-71de3e62.js","./axios-legacy-d06d9fd6.js","./vue-ueditor-wrap-legacy-b0e85f37.js","./qs-legacy-0ee9e797.js","./side-channel-legacy-bc002aec.js","./object-inspect-legacy-76ba9711.js"],(function(e,a){"use strict";var l,t,n,s,i,c,u,d,r,o,g,h,m,y,v,p,f;return{setters:[function(e){l=e.q,t=e.r},function(e){n=e._},function(e){s=e.an,i=e.o,c=e.c,u=e.a,d=e.P,r=e.S,o=e.Q,g=e.a9,h=e.X,m=e.$,y=e.Y,v=e.W,p=e.bh,f=e.bf},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var a=document.createElement("style");a.textContent=".right-box[data-v-e803b950]{padding:10px 20px;width:30%;box-sizing:border-box}.Echarts>div[data-v-e803b950]{height:400px}.right-box .list .key-box[data-v-e803b950]{width:20px;height:20px;line-height:20px;border-radius:50%;font-weight:700;text-align:center;color:#fff;background:red}.right-box .list img[data-v-e803b950]{width:30px;height:30px}\n",document.head.appendChild(a);var b={data:function(){return{activeName:"sale",listData:[]}},inject:["dataModel"],created:function(){this.listData=this.dataModel.productSaleRanking},mounted:function(){},methods:{handleClick:function(){"sale"==this.activeName?this.listData=this.dataModel.productSaleRanking:"view"==this.activeName?this.listData=this.dataModel.productViewRanking:"refund"==this.activeName&&(this.listData=this.dataModel.productRefundRanking)}}},j={class:"right-box d-s-s d-c"},x=function(e){return p("data-v-e803b950"),e=e(),f(),e}((function(){return u("div",{class:"lh30 f16 tl"},"商品排行榜",-1)})),k={class:"ww100 mt10"},w={class:"list ww100"},N={key:0},_={class:"key-box"},D={key:0,alt:"",class:"ml10"},C={key:1,alt:"",class:"ml10"},M={key:2,alt:"",class:"ml10"},R={class:"text-ellipsis-2 flex-1 ml10"},T={class:"gray9 tr",style:{width:"80px"}},P={key:1,class:"tc pt30"};e("default",n(b,[["render",function(e,a,n,p,f,b){var S=l,V=t,q=s("img-url");return i(),c("div",j,[x,u("div",k,[d(V,{modelValue:f.activeName,"onUpdate:modelValue":a[0]||(a[0]=function(e){return f.activeName=e}),type:"card",onTabChange:b.handleClick},{default:r((function(){return[d(S,{label:"销量TOP10",name:"sale"}),d(S,{label:"浏览TOP10",name:"view"}),d(S,{label:"退款TOP10",name:"refund"})]})),_:1},8,["modelValue","onTabChange"])]),u("div",w,[f.listData.length>0?(i(),c("ul",N,[(i(!0),c(o,null,g(f.listData,(function(a,l){return i(),c("li",{key:l,class:"d-s-c p-6-0 border-b-d"},[u("span",_,h(l+1),1),u("span",null,["sale"==f.activeName?m((i(),c("img",D,null,512)),[[q,e.image_path]]):y("",!0),"refund"==f.activeName?m((i(),c("img",C,null,512)),[[q,e.image_path]]):y("",!0),"view"==f.activeName?m((i(),c("img",M,null,512)),[[q,a.image[0].file_path]]):y("",!0)]),u("span",R,h(a.product_name),1),u("span",T,["sale"==f.activeName?(i(),c(o,{key:0},[v(" 销量："+h(a.total_sales_num),1)],64)):y("",!0),"view"==f.activeName?(i(),c(o,{key:1},[v(" 浏览："+h(a.view_times),1)],64)):y("",!0),"refund"==f.activeName?(i(),c(o,{key:2},[v(" 退款："+h(a.refund_count),1)],64)):y("",!0)])])})),128))])):(i(),c("div",P,"暂无上榜记录"))])])}],["__scopeId","data-v-e803b950"]]))}}}));
