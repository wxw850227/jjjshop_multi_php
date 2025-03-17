import{a as e,E as t,f as a,l as i,m as s,n as r,v as l}from"./element-plus-78c440b2.js";import{j as o,k as n}from"./setting-c6db5bb6.js";import{_ as d}from"./index-0e3e5afc.js";import{ap as p,o as m,c,a as u,$ as g,T as h,S as j,W as v,P as y}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const C={data:()=>({loading:!0,tableData:[],pageSize:10,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,o(t).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.$router.push({path:"/setting/delivery/edit"})},editClick(e){this.$router.push({path:"/setting/delivery/edit",query:{delivery_id:e.delivery_id}})},deleteClick(a){let i=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i.loading=!0,n({delivery_id:a.delivery_id}).then((e=>{i.loading=!1,t({message:e.msg,type:"success"}),i.getData()})).catch((e=>{i.loading=!1}))})).catch((()=>{}))}}},b={class:"user"},f=u("div",{class:"common-form"},"运费模板",-1),k={class:"common-level-rail"},z={class:"product-content"},_={class:"table-wrap"},D={class:"pagination"};const w=d(C,[["render",function(e,t,o,n,d,C){const w=a,x=i,S=s,P=r,q=p("auth"),N=l;return m(),c("div",b,[f,u("div",k,[g((m(),h(w,{size:"small",type:"primary",onClick:C.addClick},{default:j((()=>[v("添加")])),_:1},8,["onClick"])),[[q,"/setting/delivery/add"]])]),u("div",z,[u("div",_,[g((m(),h(S,{size:"small",data:d.tableData,border:"",style:{width:"100%"}},{default:j((()=>[y(x,{prop:"delivery_id",label:"模板ID"}),y(x,{prop:"name",label:"模板名称"}),y(x,{prop:"method",label:"计费方式"}),y(x,{prop:"sort",label:"排序"}),y(x,{prop:"create_time",label:"添加时间"}),y(x,{fixed:"right",label:"操作",width:"90px"},{default:j((e=>[g((m(),h(w,{onClick:t=>C.editClick(e.row),link:"",type:"primary",size:"small"},{default:j((()=>[v("编辑")])),_:2},1032,["onClick"])),[[q,"/setting/delivery/edit"]]),g((m(),h(w,{onClick:t=>C.deleteClick(e.row),link:"",type:"primary",size:"small"},{default:j((()=>[v("删除")])),_:2},1032,["onClick"])),[[q,"/setting/delivery/delete"]])])),_:1})])),_:1},8,["data"])),[[N,d.loading]])]),u("div",D,[y(P,{onSizeChange:C.handleSizeChange,onCurrentChange:C.handleCurrentChange,background:"","current-page":d.curPage,"page-size":d.pageSize,layout:"total, prev, pager, next, jumper",total:d.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{w as default};
