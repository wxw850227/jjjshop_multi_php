System.register(["./element-plus-legacy-662cb951.js","./Single-legacy-398a32fe.js","./Many-legacy-9920e317.js","./index-legacy-1e6334c7.js","./@vue-legacy-3fcc10b7.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./product-legacy-71b64399.js","./Upload-legacy-aa72da47.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(e,l){"use strict";var n,c,u,a,t,s,o,r,d,i,y,f,m,g,p;return{setters:[function(e){n=e.i,c=e.A,u=e.e},function(e){a=e.default},function(e){t=e.default},function(e){s=e._},function(e){o=e.ae,r=e.o,d=e.c,i=e.P,y=e.S,f=e.W,m=e.T,g=e.Y,p=e.a},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={components:{Single:a,Many:t},inject:["form"]},j={class:"basic-setting-content pl16 pr16"},_=p("div",{class:"common-form"},"规格/库存",-1),k={key:0,class:"red ww100"};e("default",s(l,[["render",function(e,l,a,t,s,p){var b=n,v=c,S=u,h=o("Single"),L=o("Many");return r(),d("div",j,[_,i(S,{label:"库存计算方式："},{default:y((function(){return[i(v,{modelValue:p.form.model.deduct_stock_type,"onUpdate:modelValue":l[0]||(l[0]=function(e){return p.form.model.deduct_stock_type=e})},{default:y((function(){return[i(b,{label:10},{default:y((function(){return[f("下单减库存")]})),_:1}),i(b,{label:20},{default:y((function(){return[f("付款减库存")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),i(S,{label:"产品规格："},{default:y((function(){return[i(v,{modelValue:p.form.model.spec_type,"onUpdate:modelValue":l[1]||(l[1]=function(e){return p.form.model.spec_type=e})},{default:y((function(){return[!p.form.isSpecLocked||p.form.isSpecLocked&&10==p.form.model.spec_type?(r(),m(b,{key:0,label:10},{default:y((function(){return[f("单规格")]})),_:1})):g("",!0),!p.form.isSpecLocked||p.form.isSpecLocked&&20==p.form.model.spec_type?(r(),m(b,{key:1,label:20},{default:y((function(){return[f("多规格")]})),_:1})):g("",!0)]})),_:1},8,["modelValue"]),p.form.isSpecLocked?(r(),d("div",k,"此商品正在参加活动，不能修改规格")):g("",!0)]})),_:1}),10==p.form.model.spec_type?(r(),m(h,{key:0})):g("",!0),20==p.form.model.spec_type?(r(),m(L,{key:1})):g("",!0)])}]]))}}}));
