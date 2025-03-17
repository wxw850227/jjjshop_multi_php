import{a as e,E as t,f as a,i as s,j as i,k as r,v as o}from"./element-plus-1d28f1d0.js";import{h as l,i as n}from"./store-1bf91338.js";import{_ as p}from"./index-3957abef.js";import{an as d,o as c,c as u,a as h,$ as m,T as g,S as j,W as b,P as _,M as C,X as w}from"./@vue-fcfaff04.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-28c84072.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-6c014c7f.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-0cda4647.js";import"./pinia-234ab43f.js";import"./axios-63583d02.js";import"./vue-ueditor-wrap-33bac798.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";const k={class:"user"},f={class:"common-level-rail"},v={class:"product-content"},y={class:"table-wrap"},z={width:30,height:30},x={class:"pagination"};const S=p({components:{},inject:["reload"],data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}),created(){this.getTableList()},methods:{handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,l(t).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.$router.push("/store/store/add")},editClick(e){let t=e.store_id;this.$router.push({path:"/store/store/edit",query:{store_id:t}})},deleteClick(a){let s=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{n({store_id:a.store_id}).then((e=>{t({message:"恭喜你，门店删除成功",type:"success"}),s.getTableList()})).catch((e=>{}))})).catch((()=>{}))}}},[["render",function(e,t,l,n,p,S){const T=a,D=s,P=i,L=r,q=d("auth"),N=d("img-url"),$=o;return c(),u("div",k,[h("div",f,[m((c(),g(T,{size:"small",type:"primary",icon:"Plus",onClick:S.addClick},{default:j((()=>[b("添加门店")])),_:1},8,["onClick"])),[[q,"/store/store/add"]])]),h("div",v,[h("div",y,[m((c(),g(P,{size:"small",data:p.tableData,border:"",style:{width:"100%"}},{default:j((()=>[_(D,{prop:"store_id",label:"门店ID",width:"60"}),_(D,{label:"Logo",width:"60"},{default:j((e=>[m(h("img",z,null,512),[[N,e.row.logo.file_path]])])),_:1}),_(D,{prop:"store_name",label:"门店名称"}),_(D,{prop:"shop_hours",label:"营业时间"}),_(D,{prop:"linkman",label:"联系人"}),_(D,{prop:"phone",label:"联系电话",width:"100"}),_(D,{prop:"detail_address",label:"门店地址",width:"240"}),_(D,{prop:"is_check",label:"自提核销"},{default:j((e=>[h("span",{class:C({green:1==e.row.is_check.value,gray:0==e.row.is_check.value})},w(e.row.is_check.text),3)])),_:1}),_(D,{prop:"status",label:"门店状态"},{default:j((e=>[h("span",{class:C({green:1==e.row.status.value,gray:0==e.row.status.value})},w(e.row.status.text),3)])),_:1}),_(D,{prop:"create_time",label:"创建时间",width:"140"}),_(D,{fixed:"right",label:"操作",width:"90"},{default:j((e=>[m((c(),g(T,{onClick:t=>S.editClick(e.row),link:"",type:"primary",size:"small"},{default:j((()=>[b("编辑")])),_:2},1032,["onClick"])),[[q,"/store/store/edit"]]),m((c(),g(T,{onClick:t=>S.deleteClick(e.row),link:"",type:"primary",size:"small"},{default:j((()=>[b("删除")])),_:2},1032,["onClick"])),[[q,"/store/store/delete"]])])),_:1})])),_:1},8,["data"])),[[$,p.loading]])]),h("div",x,[_(L,{onSizeChange:S.handleSizeChange,onCurrentChange:S.handleCurrentChange,background:"","current-page":p.curPage,"page-size":p.pageSize,layout:"total, prev, pager, next, jumper",total:p.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{S as default};
