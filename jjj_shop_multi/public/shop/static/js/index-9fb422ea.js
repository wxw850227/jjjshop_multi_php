import{a as e,E as a,f as t,l as i,m as s,n as l,v as o}from"./element-plus-78c440b2.js";import{P as r,j as p,s as n}from"./page-7f4bcbd8.js";import{_ as d}from"./index-0e3e5afc.js";import{ap as c,o as g,c as m,a as u,$ as h,T as j,S as b,W as y,P as C,X as _,Y as f}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const k={class:"user"},w={class:"common-level-rail"},z={class:"product-content"},v={class:"table-wrap"},T={key:0},x={key:1},S={class:"pagination"};const P=d({data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1}),created(){this.getTableList()},methods:{handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,a={};a.page=e.curPage,a.list_rows=e.pageSize,r(a).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total})).catch((e=>{}))},deleteClick(t){let i=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i.loading=!0,p({page_id:t}).then((e=>{1==e.code?(i.loading=!1,a({message:"恭喜你，删除成功",type:"success"}),i.getTableList()):i.loading=!1})).catch((e=>{i.loading=!1}))})).catch((()=>{}))},addClick(){this.$router.push("/page/page/add")},setHomeClick(t){let i=this;e.confirm("确定要将此页面设置为默认首页吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i.loading=!0,n({page_id:t}).then((e=>{i.loading=!1,1==e.code?(a({message:"恭喜你，设置成功",type:"success"}),i.getTableList()):a.error("错了哦，这是一条错误消息")})).catch((e=>{i.loading=!1}))})).catch((()=>{}))},editClick(e){this.$router.push({path:"/page/page/edit",query:{page_id:e}})}}},[["render",function(e,a,r,p,n,d){const P=t,D=i,L=s,B=l,q=c("auth"),N=o;return g(),m("div",k,[u("div",w,[h((g(),j(P,{size:"small",type:"primary",icon:"Plus",onClick:a[0]||(a[0]=e=>d.addClick())},{default:b((()=>[y("添加页面")])),_:1})),[[q,"/page/page/add"]])]),u("div",z,[u("div",v,[h((g(),j(L,{size:"small",data:n.tableData,border:"",style:{width:"100%"}},{default:b((()=>[C(D,{prop:"page_id",label:"页面ID",width:"80"}),C(D,{prop:"page_name",label:"页面名称"},{default:b((e=>[u("span",null,_(e.row.page_name),1)])),_:1}),C(D,{prop:"page_type",label:"页面类型"},{default:b((e=>[10==e.row.page_type?(g(),m("span",T,"商城首页")):f("",!0),20==e.row.page_type?(g(),m("span",x,"自定义页")):f("",!0)])),_:1}),C(D,{prop:"create_time",label:"添加时间"}),C(D,{prop:"update_time",label:"更新时间"}),C(D,{fixed:"right",label:"操作",width:"90"},{default:b((e=>[h((g(),j(P,{onClick:a=>d.editClick(e.row.page_id),link:"",type:"primary",size:"small"},{default:b((()=>[y("编辑")])),_:2},1032,["onClick"])),[[q,"/page/page/edit"]]),20==e.row.page_type?h((g(),j(P,{key:0,onClick:a=>d.deleteClick(e.row.page_id),link:"",type:"primary",size:"small"},{default:b((()=>[y("删除 ")])),_:2},1032,["onClick"])),[[q,"/page/page/delete"]]):f("",!0)])),_:1})])),_:1},8,["data"])),[[N,n.loading]])]),u("div",S,[C(B,{onSizeChange:d.handleSizeChange,onCurrentChange:d.handleCurrentChange,background:"","current-page":n.curPage,"page-size":n.pageSize,layout:"total, prev, pager, next, jumper",total:n.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{P as default};
