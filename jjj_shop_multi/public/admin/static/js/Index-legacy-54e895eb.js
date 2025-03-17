System.register(["./element-plus-legacy-95e175d5.js","./region-legacy-55f7f91b.js","./index-legacy-78811272.js","./@vue-legacy-3d9ca20c.js","./lodash-es-legacy-74aa31b9.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-67ffa4bd.js","./dayjs-legacy-503a1c3f.js","./@element-plus-legacy-c3efface.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./request-legacy-ea694195.js","./axios-legacy-40880ebd.js","./vue-router-legacy-af99759f.js","./pinia-legacy-54e74fbe.js","./vue-demi-legacy-97cfbb01.js"],(function(e,a){"use strict";var l,n,t,r,i,u,o,c,s,d,m,g,f,h,p,y,v,b,C,_,k,j,z,F,D,V;return{setters:[function(e){l=e.E,n=e.f,t=e.e,r=e.b,i=e.h,u=e.l,o=e.v,c=e.c,s=e.d,d=e.n,m=e.o,g=e.j},function(e){f=e.r,h=e.d},function(e){p=e._},function(e){y=e.c,v=e.a,b=e.O,C=e.R,_=e._,k=e.S,j=e.o,z=e.P,F=e.a8,D=e.X,V=e.V},null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var a={data:function(){return{loading:!0,tableData:[],pageSize:15,totalDataNumber:0,curPage:1,open_add:!1,open_edit:!1,userModel:{},searchForm:{name:"",level:0,province_id:"",city_id:""},areaList:[]}},created:function(){this.getData()},methods:{handleCurrentChange:function(e){var a=this;a.curPage=e,a.loading=!0,a.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,a=e.searchForm;a.page=e.curPage,a.list_rows=e.pageSize,f(a).then((function(a){e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,e.areaList=a.data.regionData})).catch((function(e){}))},onSubmit:function(){this.curPage=1,this.getData()},addClick:function(){this.$router.push("/region/add")},editClick:function(e){this.$router.push({path:"/region/edit",query:{id:e.id}})},initCity:function(){this.searchForm.city_id=""},deleteClick:function(e){var a=this;l.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.loading=!0,h({id:e.id}).then((function(e){a.loading=!1,n({message:e.msg,type:"success"}),a.getData()})).catch((function(e){a.loading=!1}))})).catch((function(){}))}}},w={class:"user"},S=v("div",{class:"common-form"},"地区列表",-1),x={class:"common-seach-wrap"},P={class:"common-level-rail"},L={class:"product-content"},U={class:"table-wrap"},N={key:0},T={key:1},q={key:2},B={class:"pagination"};e("default",p(a,[["render",function(e,a,l,n,f,h){var p=c,O=s,$=d,E=m,M=t,R=r,X=g,A=i,G=u,H=o;return j(),y("div",w,[S,v("div",x,[b(R,{size:"small",inline:!0,model:f.searchForm,class:"demo-form-inline"},{default:C((function(){return[b(O,{label:"名称"},{default:C((function(){return[b(p,{size:"small",modelValue:f.searchForm.name,"onUpdate:modelValue":a[0]||(a[0]=function(e){return f.searchForm.name=e}),placeholder:"请输入名称"},null,8,["modelValue"])]})),_:1}),b(O,{label:"地区类型"},{default:C((function(){return[v("div",null,[b(E,{modelValue:f.searchForm.level,"onUpdate:modelValue":a[1]||(a[1]=function(e){return f.searchForm.level=e})},{default:C((function(){return[b($,{label:"全部",value:0}),b($,{label:"省份",value:1}),b($,{label:"城市",value:2}),b($,{label:"地区",value:3})]})),_:1},8,["modelValue"])])]})),_:1}),b(O,{label:"选择上级"},{default:C((function(){return[b(E,{modelValue:f.searchForm.province_id,"onUpdate:modelValue":a[2]||(a[2]=function(e){return f.searchForm.province_id=e}),placeholder:"省",onChange:h.initCity},{default:C((function(){return[b($,{label:"全部",value:""}),(j(!0),y(z,null,F(f.areaList,(function(e,a){return j(),k($,{label:e.name,value:e.id,key:a},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"]),""!=f.searchForm.province_id?(j(),k(E,{key:0,modelValue:f.searchForm.city_id,"onUpdate:modelValue":a[3]||(a[3]=function(e){return f.searchForm.city_id=e}),placeholder:"市"},{default:C((function(){return[b($,{label:"全部",value:""}),(j(!0),y(z,null,F(f.areaList[f.searchForm.province_id].city,(function(e,a){return j(),k($,{label:e.name,value:e.id,key:a},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])):D("",!0)]})),_:1}),b(O,null,{default:C((function(){return[b(M,{size:"small",type:"primary",icon:"el-icon-search",onClick:h.onSubmit},{default:C((function(){return[V("查询")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),v("div",P,[b(M,{type:"primary",onClick:h.addClick},{default:C((function(){return[V("添加")]})),_:1},8,["onClick"])]),v("div",L,[v("div",U,[_((j(),k(A,{size:"small",data:f.tableData,border:"",style:{width:"100%"}},{default:C((function(){return[b(X,{prop:"shortname",label:"简称"}),b(X,{prop:"name",label:"名称"}),b(X,{prop:"merger_name",label:"名称"}),b(X,{label:"级别"},{default:C((function(e){return[1==e.row.level?(j(),y("span",N,"省份")):D("",!0),2==e.row.level?(j(),y("span",T,"城市")):D("",!0),3==e.row.level?(j(),y("span",q,"地区")):D("",!0)]})),_:1}),b(X,{prop:"lng",label:"经度"}),b(X,{prop:"lat",label:"纬度"}),b(X,{fixed:"right",label:"操作",width:"90"},{default:C((function(e){return[b(M,{onClick:function(a){return h.editClick(e.row)},link:"",type:"primary",size:"small"},{default:C((function(){return[V("编辑")]})),_:2},1032,["onClick"]),b(M,{onClick:function(a){return h.deleteClick(e.row)},link:"",type:"primary",size:"small"},{default:C((function(){return[V("删除")]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"])),[[H,f.loading]])]),v("div",B,[b(G,{onSizeChange:h.handleSizeChange,onCurrentChange:h.handleCurrentChange,background:"","current-page":f.curPage,"page-size":f.pageSize,layout:"total, prev, pager, next, jumper",total:f.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]))}}}));
