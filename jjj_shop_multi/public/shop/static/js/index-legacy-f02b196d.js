System.register(["./element-plus-legacy-662cb951.js","./setting-legacy-4c2bfb73.js","./index-legacy-7cb89a83.js","./@vue-legacy-3fcc10b7.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(e,n){"use strict";var l,a,u,o,t,i,r,d,c,m,s,f,g,p,y,V;return{setters:[function(e){l=e.E,a=e.d,u=e.e,o=e.i,t=e.f,i=e.c},function(e){r=e.I,d=e.J},function(e){c=e._},function(e){m=e.o,s=e.c,f=e.P,g=e.S,p=e.a,y=e.W,V=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n={data:function(){return{form:{radio:"local",max_image:"",max_video:"",engine:{qiniu:{},aliyun:{},qcloud:{}}},loading:!1}},created:function(){this.getData()},methods:{getData:function(){var e=this;r({}).then((function(n){var l=n.data.vars.values;e.form.radio=l.default,e.form.max_image=l.max_image,e.form.max_video=l.max_video,e.form.engine.qiniu=l.engine.qiniu,e.form.engine.aliyun=l.engine.aliyun,e.form.engine.qcloud=l.engine.qcloud})).catch((function(e){}))},onSubmit:function(){var e=this;e.loading=!0;var n=this.form;d(n).then((function(n){e.loading=!1,l({message:"恭喜你，上传设置成功",type:"success"})})).catch((function(n){e.loading=!1}))},getRadio:function(e){}}},_={class:"product-add"},h=p("div",{class:"common-form"},"文件上传设置",-1),b=p("template",{slot:"append"},[y("M")],-1),v=p("div",{class:"tips"},"修改后请修改php上传配置后生效",-1),j=p("template",{slot:"append"},[y("M")],-1),q=p("div",{class:"tips"},"修改后请修改php上传配置后生效",-1),k={key:0},x=p("div",{class:"tips"}," 请补全http:// 或 https://，例如：http://static.cloud.com ",-1),U={key:1},w=p("div",{class:"tips"}," 请补全http:// 或 https://，例如：http://static.cloud.com ",-1),C={key:2},S=p("div",{class:"tips"}," 请填写地域简称，例如：ap-beijing、ap-hongkong、eu-frankfurt ",-1),K=p("div",{class:"tips"}," 请补全http:// 或 https://，例如：http://static.cloud.com ",-1),R={class:"common-button-wrapper"};e("default",c(n,[["render",function(e,n,l,r,d,c){var E=a,D=u,A=o,B=t,I=i;return m(),s("div",_,[f(I,{size:"small",ref:"form",model:d.form,"label-width":"200px"},{default:g((function(){return[h,f(D,{label:"最大图片上传"},{default:g((function(){return[f(E,{modelValue:d.form.max_image,"onUpdate:modelValue":n[0]||(n[0]=function(e){return d.form.max_image=e}),class:"max-w460"},{default:g((function(){return[b]})),_:1},8,["modelValue"]),v]})),_:1}),f(D,{label:"最大视频上传"},{default:g((function(){return[f(E,{modelValue:d.form.max_video,"onUpdate:modelValue":n[1]||(n[1]=function(e){return d.form.max_video=e}),class:"max-w460"},{default:g((function(){return[j]})),_:1},8,["modelValue"]),q]})),_:1}),f(D,{label:"默认上传方式"},{default:g((function(){return[p("div",null,[f(A,{modelValue:d.form.radio,"onUpdate:modelValue":n[2]||(n[2]=function(e){return d.form.radio=e}),label:"local",onChange:c.getRadio},{default:g((function(){return[y("本地 (不推荐)")]})),_:1},8,["modelValue","onChange"]),f(A,{modelValue:d.form.radio,"onUpdate:modelValue":n[3]||(n[3]=function(e){return d.form.radio=e}),label:"qiniu",onChange:c.getRadio},{default:g((function(){return[y("七牛云存储")]})),_:1},8,["modelValue","onChange"]),f(A,{modelValue:d.form.radio,"onUpdate:modelValue":n[4]||(n[4]=function(e){return d.form.radio=e}),label:"aliyun",onChange:c.getRadio},{default:g((function(){return[y("阿里云OSS")]})),_:1},8,["modelValue","onChange"]),f(A,{modelValue:d.form.radio,"onUpdate:modelValue":n[5]||(n[5]=function(e){return d.form.radio=e}),label:"qcloud",onChange:c.getRadio},{default:g((function(){return[y("腾讯云COS")]})),_:1},8,["modelValue","onChange"])])]})),_:1}),"qiniu"==d.form.radio?(m(),s("div",k,[f(D,{label:"存储空间名称 Bucket"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qiniu.bucket,"onUpdate:modelValue":n[6]||(n[6]=function(e){return d.form.engine.qiniu.bucket=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"ACCESS_KEY AK"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qiniu.access_key,"onUpdate:modelValue":n[7]||(n[7]=function(e){return d.form.engine.qiniu.access_key=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"SECRET_KEY SK"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qiniu.secret_key,"onUpdate:modelValue":n[8]||(n[8]=function(e){return d.form.engine.qiniu.secret_key=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"空间域名 Domain"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qiniu.domain,"onUpdate:modelValue":n[9]||(n[9]=function(e){return d.form.engine.qiniu.domain=e}),class:"max-w460"},null,8,["modelValue"]),x]})),_:1})])):V("",!0),"aliyun"==d.form.radio?(m(),s("div",U,[f(D,{label:"存储空间名称 Bucket"},{default:g((function(){return[f(E,{modelValue:d.form.engine.aliyun.bucket,"onUpdate:modelValue":n[10]||(n[10]=function(e){return d.form.engine.aliyun.bucket=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"AccessKeyId"},{default:g((function(){return[f(E,{modelValue:d.form.engine.aliyun.access_key_id,"onUpdate:modelValue":n[11]||(n[11]=function(e){return d.form.engine.aliyun.access_key_id=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"AccessKeySecret"},{default:g((function(){return[f(E,{modelValue:d.form.engine.aliyun.access_key_secret,"onUpdate:modelValue":n[12]||(n[12]=function(e){return d.form.engine.aliyun.access_key_secret=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(D,{label:"空间域名 Domain"},{default:g((function(){return[f(E,{modelValue:d.form.engine.aliyun.domain,"onUpdate:modelValue":n[13]||(n[13]=function(e){return d.form.engine.aliyun.domain=e}),class:"max-w460"},null,8,["modelValue"]),w]})),_:1})])):V("",!0),"qcloud"==d.form.radio?(m(),s("div",C,[f(D,{label:"存储空间名称 Bucket"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qcloud.bucket,"onUpdate:modelValue":n[14]||(n[14]=function(e){return d.form.engine.qcloud.bucket=e})},null,8,["modelValue"])]})),_:1}),f(D,{label:"所属地域 Region"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qcloud.region,"onUpdate:modelValue":n[15]||(n[15]=function(e){return d.form.engine.qcloud.region=e})},null,8,["modelValue"]),S]})),_:1}),f(D,{label:"SecretId"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qcloud.secret_id,"onUpdate:modelValue":n[16]||(n[16]=function(e){return d.form.engine.qcloud.secret_id=e})},null,8,["modelValue"])]})),_:1}),f(D,{label:"SecretKey"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qcloud.secret_key,"onUpdate:modelValue":n[17]||(n[17]=function(e){return d.form.engine.qcloud.secret_key=e})},null,8,["modelValue"])]})),_:1}),f(D,{label:"空间域名 Domain"},{default:g((function(){return[f(E,{modelValue:d.form.engine.qcloud.domain,"onUpdate:modelValue":n[18]||(n[18]=function(e){return d.form.engine.qcloud.domain=e})},null,8,["modelValue"]),K]})),_:1})])):V("",!0),p("div",R,[f(B,{type:"primary",onClick:c.onSubmit,loading:d.loading},{default:g((function(){return[y("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model"])])}]]))}}}));
