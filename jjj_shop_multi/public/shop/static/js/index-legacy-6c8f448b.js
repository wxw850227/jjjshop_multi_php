System.register(["./element-plus-legacy-662cb951.js","./setting-legacy-a54542d8.js","./index-legacy-1e6334c7.js","./@vue-legacy-3fcc10b7.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(e,l){"use strict";var t,a,n,i,r,c,u,s,o,d,g,y,p,h,f,m,j,v,C;return{setters:[function(e){t=e.a,a=e.E,n=e.f,i=e.l,r=e.m,c=e.n,u=e.v},function(e){s=e.j,o=e.k},function(e){d=e._},function(e){g=e.ap,y=e.o,p=e.c,h=e.a,f=e.$,m=e.T,j=e.S,v=e.W,C=e.P},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{loading:!0,tableData:[],pageSize:10,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}},created:function(){this.getData()},methods:{handleCurrentChange:function(e){var l=this;l.curPage=e,l.loading=!0,l.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,l={};l.page=e.curPage,l.list_rows=e.pageSize,s(l).then((function(l){e.loading=!1,e.tableData=l.data.list.data,e.totalDataNumber=l.data.list.total})).catch((function(e){}))},addClick:function(){this.$router.push({path:"/setting/delivery/edit"})},editClick:function(e){this.$router.push({path:"/setting/delivery/edit",query:{delivery_id:e.delivery_id}})},deleteClick:function(e){var l=this;t.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){l.loading=!0,o({delivery_id:e.delivery_id}).then((function(e){l.loading=!1,a({message:e.msg,type:"success"}),l.getData()})).catch((function(e){l.loading=!1}))})).catch((function(){}))}}},b={class:"user"},k=h("div",{class:"common-form"},"运费模板",-1),z={class:"common-level-rail"},_={class:"product-content"},D={class:"table-wrap"},S={class:"pagination"};e("default",d(l,[["render",function(e,l,t,a,s,o){var d=n,w=i,x=r,P=c,q=g("auth"),N=u;return y(),p("div",b,[k,h("div",z,[f((y(),m(d,{size:"small",type:"primary",onClick:o.addClick},{default:j((function(){return[v("添加")]})),_:1},8,["onClick"])),[[q,"/setting/delivery/add"]])]),h("div",_,[h("div",D,[f((y(),m(x,{size:"small",data:s.tableData,border:"",style:{width:"100%"}},{default:j((function(){return[C(w,{prop:"delivery_id",label:"模板ID"}),C(w,{prop:"name",label:"模板名称"}),C(w,{prop:"method",label:"计费方式"}),C(w,{prop:"sort",label:"排序"}),C(w,{prop:"create_time",label:"添加时间"}),C(w,{fixed:"right",label:"操作",width:"90px"},{default:j((function(e){return[f((y(),m(d,{onClick:function(l){return o.editClick(e.row)},link:"",type:"primary",size:"small"},{default:j((function(){return[v("编辑")]})),_:2},1032,["onClick"])),[[q,"/setting/delivery/edit"]]),f((y(),m(d,{onClick:function(l){return o.deleteClick(e.row)},link:"",type:"primary",size:"small"},{default:j((function(){return[v("删除")]})),_:2},1032,["onClick"])),[[q,"/setting/delivery/delete"]])]})),_:1})]})),_:1},8,["data"])),[[N,s.loading]])]),h("div",S,[C(P,{onSizeChange:o.handleSizeChange,onCurrentChange:o.handleCurrentChange,background:"","current-page":s.curPage,"page-size":s.pageSize,layout:"total, prev, pager, next, jumper",total:s.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]))}}}));
