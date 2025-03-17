import{a as e,E as a,d as t,e as s,f as l,c as r,l as i,m as o,n,v as p}from"./element-plus-78c440b2.js";import{b as d,d as m}from"./store-feff53f6.js";import{_ as c}from"./index-73113c1c.js";import{ap as u,o as h,c as g,a as b,P as j,S as f,W as _,$ as C,T as k,Y as v,M as w,X as y}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const z={class:"user clearfix"},S={class:"common-seach-wrap fr"},x={class:"product-content"},D={class:"table-wrap"},T={key:0,width:"30",height:"30"},L={class:"pagination"};const I=c({components:{},data:()=>({loading:!0,tableData:[],storeList:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{shop_id:"",search:""},open_add:!1,open_edit:!1,userModel:{}}),created(){this.getTableList()},methods:{handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,a={};a.page=e.curPage,a.list_rows=e.pageSize,d(a).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,e.storeList=a.data.store_list.data})).catch((a=>{e.loading=!1}))},onSubmit(){let e=this;e.loading=!0;let a=this.formInline;d(a).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total})).catch((a=>{e.loading=!1}))},addClick(){this.$router.push("/store/clerk/add")},editClick(e){let a=e.clerk_id;this.$router.push({path:"/store/clerk/edit",query:{clerk_id:a}})},deleteClick(t){let s=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{s.loading=!0,m({clerk_id:t}).then((e=>{s.loading=!1,1==e.code&&(a({message:"恭喜你，店员删除成功",type:"success"}),s.getTableList())})).catch((e=>{s.loading=!1}))})).catch((()=>{s.loading=!1}))}}},[["render",function(e,a,d,m,c,I){const N=t,P=s,q=l,V=r,$=i,B=o,M=n,U=u("img-url"),E=p;return h(),g("div",z,[b("div",S,[j(V,{size:"small",inline:!0,model:c.formInline,class:"demo-form-inline"},{default:f((()=>[j(P,{label:""},{default:f((()=>[j(N,{modelValue:c.formInline.search,"onUpdate:modelValue":a[0]||(a[0]=e=>c.formInline.search=e),placeholder:"请输入店员姓名/手机号"},null,8,["modelValue"])])),_:1}),j(P,null,{default:f((()=>[j(q,{type:"primary",icon:"Search",onClick:I.onSubmit},{default:f((()=>[_("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),b("div",x,[b("div",D,[C((h(),k(B,{size:"small",data:c.tableData,border:"",style:{width:"100%"}},{default:f((()=>[j($,{prop:"clerk_id",label:"门店ID",width:"60"}),j($,{prop:"nickName",label:"微信头像",width:"70"},{default:f((e=>[e.row.user?C((h(),g("img",T,null,512)),[[U,e.row.user.avatarUrl]]):v("",!0)])),_:1}),j($,{prop:"user.nickName",label:"微信昵称"}),j($,{prop:"store.supplier.name",label:"商户名称"}),j($,{prop:"store.store_name",label:"所属门店"}),j($,{prop:"real_name",label:"店员姓名"}),j($,{prop:"mobile",label:"店员手机号"}),j($,{prop:"status.text",label:"状态"},{default:f((e=>[b("span",{class:w({green:1==e.row.status.value,gray:0==e.row.status.value})},y(e.row.status.text),3)])),_:1}),j($,{prop:"create_time",label:"添加时间"})])),_:1},8,["data"])),[[E,c.loading]])]),b("div",L,[j(M,{onSizeChange:I.handleSizeChange,onCurrentChange:I.handleCurrentChange,background:"","current-page":c.curPage,"page-size":c.pageSize,layout:"total, prev, pager, next, jumper",total:c.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{I as default};
