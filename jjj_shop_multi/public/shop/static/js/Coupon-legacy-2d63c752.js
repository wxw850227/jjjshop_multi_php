System.register(["./element-plus-legacy-662cb951.js","./@vue-legacy-3fcc10b7.js","./index-legacy-1e6334c7.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(l,e){"use strict";var n,t,u,a,s,c,r,o,i,d,m,y,p,g;return{setters:[function(l){n=l.H,t=l.e,u=l.G,a=l.f,s=l.c},function(l){c=l.o,r=l.c,o=l.a,i=l.X,d=l.P,m=l.S,y=l.a1,p=l.W},function(l){g=l._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var e={class:"common-form"},f={class:"d-s-c"};l("default",g({data:function(){return{}},props:["curItem","selectedIndex","opts"],created:function(){this.curItem.style.paddingTop=parseInt(this.curItem.style.paddingTop),this.curItem.params.limit=parseInt(this.curItem.params.limit)},methods:{}},[["render",function(l,g,j,I,h,b){var v=n,V=t,x=u,_=a,k=s;return c(),r("div",null,[o("div",e,[o("span",null,i(j.curItem.name),1)]),d(k,{size:"small",model:j.curItem,"label-width":"100px"},{default:m((function(){return[d(V,{label:"上下边距："},{default:m((function(){return[d(v,{modelValue:j.curItem.style.paddingTop,"onUpdate:modelValue":g[0]||(g[0]=function(l){return j.curItem.style.paddingTop=l}),"show-input":""},null,8,["modelValue"])]})),_:1}),d(V,{label:"背景颜色："},{default:m((function(){return[o("div",f,[d(x,{modelValue:j.curItem.style.background,"onUpdate:modelValue":g[1]||(g[1]=function(l){return j.curItem.style.background=l})},null,8,["modelValue"]),d(_,{type:"button",style:{"margin-left":"10px"},onClick:g[2]||(g[2]=y((function(e){return l.$parent.onEditorResetColor(j.curItem.style,"background","#ffffff")}),["stop"]))},{default:m((function(){return[p("重置")]})),_:1})])]})),_:1}),d(V,{label:"显示数量："},{default:m((function(){return[d(v,{modelValue:j.curItem.params.limit,"onUpdate:modelValue":g[3]||(g[3]=function(l){return j.curItem.params.limit=l}),min:1,max:5,"show-input":""},null,8,["modelValue"])]})),_:1})]})),_:1},8,["model"])])}]]))}}}));
