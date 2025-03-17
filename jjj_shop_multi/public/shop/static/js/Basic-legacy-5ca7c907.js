System.register(["./Upload-legacy-6c519fe6.js","./element-plus-legacy-662cb951.js","./vuedraggable-legacy-bc3ef243.js","./@vue-legacy-3fcc10b7.js","./index-legacy-7cb89a83.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-legacy-ac39e0cb.js","./sortablejs-legacy-626c33fd.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(e,l){"use strict";var o,n,t,i,a,u,r,d,c,s,m,f,g,p,y,_,v,h,j,b,k,V,U,P,w,x,C;return{setters:[function(e){o=e._},function(e){n=e.d,t=e.e,i=e.q,a=e.r,u=e.i,r=e.A,d=e.s,c=e.F,s=e.f,m=e.g},function(e){f=e.d},function(e){g=e.ae,p=e.ap,y=e.o,_=e.c,v=e.P,h=e.S,j=e.Q,b=e.a9,k=e.T,V=e.Y,U=e.W,P=e.a,w=e.$,x=e.a1},function(e){C=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={components:{Upload:o,draggable:f},data:function(){return{isProductUpload:!1,config:{},file_name:"image"}},inject:["form"],created:function(){},methods:{openProductUpload:function(e,l){this.file_name=l,this.config="image"==e?{total:9,file_type:"image"}:{total:1,file_type:"video"},this.isProductUpload=!0},returnProductImgsFunc:function(e){if(null!=e)if("video"==this.file_name)this.form.model.video_id=e[0].file_id,this.form.model.video=e[0];else if("image"==this.file_name){var l=this.form.model.image.concat(e);this.form.model.image=l}else"poster"==this.file_name&&(this.form.model.poster_id=e[0].file_id,this.form.model.poster=e[0]);this.isProductUpload=!1},deleteImg:function(e){this.form.model.image.splice(e,1)},delVideo:function(){this.form.model.video_id=0,this.form.model.video={}}}},q={class:"basic-setting-content pl16 pr16"},I=P("div",{class:"common-form"},"基本信息",-1),Y={class:"draggable-list"},D={class:"item"},F=["onClick"],z={class:"draggable-list"},H={key:1},M=["src"],R={class:"draggable-list"},S=["src"];e("default",C(l,[["render",function(e,l,f,C,A,Q){var T=n,W=t,$=i,B=a,E=u,G=r,J=d,K=g("Close"),L=c,N=g("draggable"),O=g("Plus"),X=s,Z=m,ee=o,le=p("img-url");return y(),_("div",q,[I,v(W,{label:"商品名称：",rules:[{required:!0,message:"请填写商品名称"}],prop:"model.product_name"},{default:h((function(){return[v(T,{modelValue:Q.form.model.product_name,"onUpdate:modelValue":l[0]||(l[0]=function(e){return Q.form.model.product_name=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),v(W,{label:"所属分类：",rules:[{required:!0,message:"你选择商品分类"}],prop:"model.category_id"},{default:h((function(){return[v(B,{modelValue:Q.form.model.category_id,"onUpdate:modelValue":l[1]||(l[1]=function(e){return Q.form.model.category_id=e})},{default:h((function(){return[(y(!0),_(j,null,b(Q.form.category,(function(e){return y(),_(j,{key:e.category_id},[v($,{value:e.category_id,label:e.name},null,8,["value","label"]),void 0!==e.child?(y(!0),_(j,{key:0},b(e.child,(function(e){return y(),_(j,{key:e.category_id},[v($,{value:e.category_id,label:e.name,style:{"padding-left":"30px"}},null,8,["value","label"]),void 0!==e.child?(y(!0),_(j,{key:0},b(e.child,(function(e){return y(),k($,{key:e.category_id,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])})),128)):V("",!0)],64)})),128)):V("",!0)],64)})),128))]})),_:1},8,["modelValue"])]})),_:1}),v(W,{label:"预告商品："},{default:h((function(){return[v(G,{modelValue:Q.form.model.is_preview,"onUpdate:modelValue":l[2]||(l[2]=function(e){return Q.form.model.is_preview=e})},{default:h((function(){return[v(E,{label:1},{default:h((function(){return[U("开启")]})),_:1}),v(E,{label:0},{default:h((function(){return[U("关闭")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),1==Q.form.model.is_preview?(y(),k(W,{key:0,label:"预告开启购买时间",rules:[{required:!0,message:"请选择开启购买时间"}],prop:"model.preview_time"},{default:h((function(){return[v(J,{modelValue:Q.form.model.preview_time,"onUpdate:modelValue":l[3]||(l[3]=function(e){return Q.form.model.preview_time=e}),type:"datetime","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"选择日期"},null,8,["modelValue"])]})),_:1})):V("",!0),v(W,{label:"商品图片：",rules:[{required:!0,message:"请上传商品图片"}],prop:"model.image"},{default:h((function(){return[P("div",Y,[Q.form.model.image&&Q.form.model.image.length>0?(y(),k(N,{key:0,modelValue:Q.form.model.image,"onUpdate:modelValue":l[4]||(l[4]=function(e){return Q.form.model.image=e}),group:"people","item-key":"id",class:"draggable-list"},{item:h((function(e){var l=e.element,o=e.index;return[P("div",D,[w(P("img",null,null,512),[[le,l.file_path]]),P("a",{href:"javascript:void(0);",class:"delete-btn",onClick:x((function(e){return Q.deleteImg(o)}),["stop"])},[v(L,null,{default:h((function(){return[v(K)]})),_:1})],8,F)])]})),_:1},8,["modelValue"])):V("",!0),P("div",{class:"item img-select",onClick:l[5]||(l[5]=function(e){return Q.openProductUpload("image","image")})},[v(L,null,{default:h((function(){return[v(O)]})),_:1})])])]})),_:1}),v(W,{label:"商品视频："},{default:h((function(){return[v(Z,null,{default:h((function(){return[P("div",z,[0==Q.form.model.video_id?(y(),_("div",{key:0,class:"item img-select",onClick:l[6]||(l[6]=function(e){return Q.openProductUpload("video","video")})},[v(L,null,{default:h((function(){return[v(O)]})),_:1})])):V("",!0),0!=Q.form.model.video_id?(y(),_("div",H,[P("video",{width:"150",height:"150",src:Q.form.model.video.file_path,autoplay:!1,controls:""}," 您的浏览器不支持 video 标签 ",8,M),P("div",null,[v(X,{icon:"Delete",onClick:Q.delVideo},{default:h((function(){return[U("删除视频")]})),_:1},8,["onClick"])])])):V("",!0)])]})),_:1})]})),_:1}),v(W,{label:"视频封面："},{default:h((function(){return[v(Z,null,{default:h((function(){return[P("div",R,[0==Q.form.model.poster_id?(y(),_("div",{key:0,class:"item img-select",onClick:l[7]||(l[7]=function(e){return Q.openProductUpload("image","poster")})},[v(L,null,{default:h((function(){return[v(O)]})),_:1})])):V("",!0),0!=Q.form.model.poster_id?(y(),_("div",{key:1,class:"item",onClick:l[8]||(l[8]=function(e){return Q.openProductUpload("image","poster")})},[P("img",{src:Q.form.model.poster.file_path,width:"100",height:"100"},null,8,S)])):V("",!0)])]})),_:1})]})),_:1}),v(W,{label:"商品卖点："},{default:h((function(){return[v(T,{type:"textarea",modelValue:Q.form.model.selling_point,"onUpdate:modelValue":l[9]||(l[9]=function(e){return Q.form.model.selling_point=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),A.isProductUpload?(y(),k(ee,{key:1,config:A.config,isupload:A.isProductUpload,onReturnImgs:Q.returnProductImgsFunc},{default:h((function(){return[U(" 上传图片")]})),_:1},8,["config","isupload","onReturnImgs"])):V("",!0)])}]]))}}}));
