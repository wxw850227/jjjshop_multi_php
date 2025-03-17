System.register(["./element-plus-legacy-95e175d5.js","./region-legacy-17317f60.js","./index-legacy-9fdc119e.js","./@vue-legacy-3d9ca20c.js","./lodash-es-legacy-74aa31b9.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-67ffa4bd.js","./dayjs-legacy-503a1c3f.js","./@element-plus-legacy-c3efface.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./request-legacy-4433e622.js","./axios-legacy-40880ebd.js","./vue-router-legacy-af99759f.js","./pinia-legacy-54e74fbe.js","./vue-demi-legacy-97cfbb01.js"],(function(e,l){"use strict";var n,a,o,u,t,r,i,d,m,c,f,s,p,V,g,y,_,v,h,b,j,x=document.createElement("style");return x.textContent=".tips{color:#ccc}\n",document.head.appendChild(x),{setters:[function(e){n=e.f,a=e.b,o=e.p,u=e.d,t=e.n,r=e.o,i=e.c,d=e.e},function(e){m=e.t,c=e.a},function(e){f=e._},function(e){s=e.c,p=e.O,V=e.R,g=e.o,y=e.a,_=e.V,v=e.S,h=e.P,b=e.a8,j=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{loading:!1,form:{province_id:"",city_id:"",level:1},areaList:[]}},created:function(){this.getData()},methods:{getData:function(){var e=this;m({}).then((function(l){e.areaList=l.data.regionData})).catch((function(e){}))},onSubmit:function(){var e=this,l=this.form;e.$refs.form.validate((function(a){a&&(e.loading=!0,c(l).then((function(l){e.loading=!1,n({message:"恭喜你，添加成功",type:"success"}),e.$router.push("/region/Index")})).catch((function(l){e.loading=!1})))}))},initCity:function(){this.form.city_id=""}}},x={class:"product-add"},U=y("div",{class:"common-form"},"新增物流公司",-1),w=y("div",{class:"tips"},"数字越小越靠前",-1);e("default",f(l,[["render",function(e,l,n,m,c,f){var k=o,C=u,z=t,L=r,S=i,D=d,q=a;return g(),s("div",x,[p(q,{size:"small",ref:"form",model:c.form,"label-width":"200px"},{default:V((function(){return[U,p(C,{label:"地区类型"},{default:V((function(){return[y("div",null,[p(k,{modelValue:c.form.level,"onUpdate:modelValue":l[0]||(l[0]=function(e){return c.form.level=e}),label:1},{default:V((function(){return[_("省份")]})),_:1},8,["modelValue"]),p(k,{modelValue:c.form.level,"onUpdate:modelValue":l[1]||(l[1]=function(e){return c.form.level=e}),label:2},{default:V((function(){return[_("城市")]})),_:1},8,["modelValue"]),p(k,{modelValue:c.form.level,"onUpdate:modelValue":l[2]||(l[2]=function(e){return c.form.level=e}),label:3},{default:V((function(){return[_("地区")]})),_:1},8,["modelValue"])])]})),_:1}),c.form.level>1?(g(),v(C,{key:0,label:"选择上级"},{default:V((function(){return[c.form.level>1?(g(),v(L,{key:0,modelValue:c.form.province_id,"onUpdate:modelValue":l[3]||(l[3]=function(e){return c.form.province_id=e}),placeholder:"省",onChange:f.initCity},{default:V((function(){return[(g(!0),s(h,null,b(c.areaList,(function(e,l){return g(),v(z,{label:e.name,value:e.id,key:l},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])):j("",!0),""!=c.form.province_id&&c.form.level>2?(g(),v(L,{key:1,modelValue:c.form.city_id,"onUpdate:modelValue":l[4]||(l[4]=function(e){return c.form.city_id=e}),placeholder:"市"},{default:V((function(){return[(g(!0),s(h,null,b(c.areaList[c.form.province_id].city,(function(e,l){return g(),v(z,{label:e.name,value:e.id,key:l},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])):j("",!0)]})),_:1})):j("",!0),p(C,{label:"地区名称 ",prop:"name",rules:[{required:!0,message:" "}]},{default:V((function(){return[p(S,{modelValue:c.form.name,"onUpdate:modelValue":l[5]||(l[5]=function(e){return c.form.name=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"简称",prop:"shortname"},{default:V((function(){return[p(S,{modelValue:c.form.shortname,"onUpdate:modelValue":l[6]||(l[6]=function(e){return c.form.shortname=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"全称",prop:"merger_name"},{default:V((function(){return[p(S,{modelValue:c.form.merger_name,"onUpdate:modelValue":l[7]||(l[7]=function(e){return c.form.merger_name=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"拼音",prop:"pinyin"},{default:V((function(){return[p(S,{modelValue:c.form.pinyin,"onUpdate:modelValue":l[8]||(l[8]=function(e){return c.form.pinyin=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"邮编",prop:"zip_code"},{default:V((function(){return[p(S,{modelValue:c.form.zip_code,"onUpdate:modelValue":l[9]||(l[9]=function(e){return c.form.zip_code=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"首字母",prop:"first"},{default:V((function(){return[p(S,{modelValue:c.form.first,"onUpdate:modelValue":l[10]||(l[10]=function(e){return c.form.first=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"经度",prop:"lng"},{default:V((function(){return[p(S,{modelValue:c.form.lng,"onUpdate:modelValue":l[11]||(l[11]=function(e){return c.form.lng=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"纬度",prop:"lat"},{default:V((function(){return[p(S,{modelValue:c.form.lat,"onUpdate:modelValue":l[12]||(l[12]=function(e){return c.form.lat=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),p(C,{label:"排序"},{default:V((function(){return[p(S,{modelValue:c.form.sort,"onUpdate:modelValue":l[13]||(l[13]=function(e){return c.form.sort=e}),type:"number",class:"max-w460"},null,8,["modelValue"]),w]})),_:1}),p(C,null,{default:V((function(){return[p(D,{type:"primary",onClick:f.onSubmit,loading:c.loading},{default:V((function(){return[_("提交")]})),_:1},8,["onClick","loading"])]})),_:1})]})),_:1},8,["model"])])}]]))}}}));
