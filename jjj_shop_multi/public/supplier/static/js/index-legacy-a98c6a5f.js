System.register(["./element-plus-legacy-257d6f76.js","./store-legacy-c1b78261.js","./index-legacy-40e126b0.js","./@vue-legacy-22137cea.js","./lodash-es-legacy-74aa31b9.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-f51a040e.js","./dayjs-legacy-455cbe2f.js","./call-bind-legacy-ce7de972.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-8d596841.js","./escape-html-legacy-89f0c831.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-921da64f.js","./pinia-legacy-71de3e62.js","./axios-legacy-d06d9fd6.js","./vue-ueditor-wrap-legacy-b0e85f37.js","./qs-legacy-0ee9e797.js","./side-channel-legacy-bc002aec.js","./object-inspect-legacy-76ba9711.js"],(function(e,t){"use strict";var a,l,n,i,r,s,o,u,c,d,g,h,p,f,y,j,m,b,_,v,C;return{setters:[function(e){a=e.a,l=e.E,n=e.f,i=e.i,r=e.j,s=e.k,o=e.v},function(e){u=e.h,c=e.i},function(e){d=e._},function(e){g=e.an,h=e.o,p=e.c,f=e.a,y=e.$,j=e.T,m=e.S,b=e.W,_=e.P,v=e.M,C=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={class:"user"},w={class:"common-level-rail"},k={class:"product-content"},z={class:"table-wrap"},S={width:30,height:30},x={class:"pagination"};e("default",d({components:{},inject:["reload"],data:function(){return{loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}},created:function(){this.getTableList()},methods:{handleCurrentChange:function(e){var t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList:function(){var e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,u(t).then((function(t){e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((function(e){}))},addClick:function(){this.$router.push("/store/store/add")},editClick:function(e){var t=e.store_id;this.$router.push({path:"/store/store/edit",query:{store_id:t}})},deleteClick:function(e){var t=this;a.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){c({store_id:e.store_id}).then((function(e){l({message:"恭喜你，门店删除成功",type:"success"}),t.getTableList()})).catch((function(e){}))})).catch((function(){}))}}},[["render",function(e,a,l,u,c,d){var T=n,D=i,P=r,L=s,q=g("auth"),N=g("img-url"),$=o;return h(),p("div",t,[f("div",w,[y((h(),j(T,{size:"small",type:"primary",icon:"Plus",onClick:d.addClick},{default:m((function(){return[b("添加门店")]})),_:1},8,["onClick"])),[[q,"/store/store/add"]])]),f("div",k,[f("div",z,[y((h(),j(P,{size:"small",data:c.tableData,border:"",style:{width:"100%"}},{default:m((function(){return[_(D,{prop:"store_id",label:"门店ID",width:"60"}),_(D,{label:"Logo",width:"60"},{default:m((function(e){return[y(f("img",S,null,512),[[N,e.row.logo.file_path]])]})),_:1}),_(D,{prop:"store_name",label:"门店名称"}),_(D,{prop:"shop_hours",label:"营业时间"}),_(D,{prop:"linkman",label:"联系人"}),_(D,{prop:"phone",label:"联系电话",width:"100"}),_(D,{prop:"detail_address",label:"门店地址",width:"240"}),_(D,{prop:"is_check",label:"自提核销"},{default:m((function(e){return[f("span",{class:v({green:1==e.row.is_check.value,gray:0==e.row.is_check.value})},C(e.row.is_check.text),3)]})),_:1}),_(D,{prop:"status",label:"门店状态"},{default:m((function(e){return[f("span",{class:v({green:1==e.row.status.value,gray:0==e.row.status.value})},C(e.row.status.text),3)]})),_:1}),_(D,{prop:"create_time",label:"创建时间",width:"140"}),_(D,{fixed:"right",label:"操作",width:"90"},{default:m((function(e){return[y((h(),j(T,{onClick:function(t){return d.editClick(e.row)},link:"",type:"primary",size:"small"},{default:m((function(){return[b("编辑")]})),_:2},1032,["onClick"])),[[q,"/store/store/edit"]]),y((h(),j(T,{onClick:function(t){return d.deleteClick(e.row)},link:"",type:"primary",size:"small"},{default:m((function(){return[b("删除")]})),_:2},1032,["onClick"])),[[q,"/store/store/delete"]])]})),_:1})]})),_:1},8,["data"])),[[$,c.loading]])]),f("div",x,[_(L,{onSizeChange:d.handleSizeChange,onCurrentChange:d.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]))}}}));
