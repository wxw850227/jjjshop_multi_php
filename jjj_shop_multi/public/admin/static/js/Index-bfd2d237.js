import{f as e,e as a,h as t,l as i,v as l,j as o,i as s,m as n}from"./element-plus-a75e5680.js";import{s as r,u as d,a as p,d as c,b as u}from"./shop-511ee2ad.js";import{_ as m,d as h}from"./index-07143257.js";import g from"./Edit-10ce520f.js";import _ from"./Add-918ecf2a.js";import{E as C,J as f,y,K as b,_ as j,c as w,a as x,O as D,R as k,S as v,X as z,ad as S,o as M,V}from"./@vue-5c89b57d.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-85afefd9.js";import"./dayjs-4d201c0d.js";import"./@element-plus-ef0dbc7a.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./request-8f5d2679.js";import"./axios-85bcd05e.js";import"./vue-router-2af8da50.js";import"./pinia-3964e703.js";import"./vue-demi-71ba0ef2.js";const E=C({components:{Edit:g,Add:_},setup(){const e=f({baseConfirm:y("$baseConfirm"),loading:!0,tableData:[],pageSize:15,totalDataNumber:0,curPage:1,open_add:!1,open_edit:!1,curModel:{no_expire:!1}});return{...b(e)}},mounted(){this.getData()},methods:{handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this;r({page:e.curPage,list_rows:e.pageSize}).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,e.tableData.forEach((function(e){e.is_recycle=0===e.is_recycle,e.weixin_service=1===e.weixin_service}))})).catch((e=>{}))},addClick(){this.open_add=!0},editClick(e){this.open_edit=!0,this.curModel=h(e),0==this.curModel.expire_time?(this.curModel.expire_time_text="",this.curModel.no_expire=!0):this.curModel.no_expire=!1},closeDialogFunc(e,a){"add"==a&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},statusChange:function(e,a){let t=this;t.loading=!0,d({app_id:a.app_id}).then((i=>{t.loading=!1,a.is_recycle=e})).catch((i=>{t.loading=!1,a.is_recycle=!e}))},wxStatusChange:function(e,a){let t=this;t.loading=!0,p({app_id:a.app_id}).then((i=>{t.loading=!1,a.weixin_service=e})).catch((i=>{t.loading=!1,a.weixin_service=!e}))},deleteClick(a){this.baseConfirm("删除后不可恢复，确认删除该记录吗?","提示",(()=>{c({app_id:a.app_id}).then((a=>{this.loading=!1;const{msg:t}=a;e({message:t,type:"success"}),this.getData()})).catch((e=>{this.loading=!1}))}))},storeEnter(e){u({app_id:e}).then((e=>{})).catch((e=>{}))}}}),P={class:"common-level-rail"},U={class:"product-content"},A={class:"table-wrap"},F={class:"pagination"};const N=m(E,[["render",function(e,r,d,p,c,u){const m=a,h=o,g=s,_=n,C=t,f=S("Add"),y=S("Edit"),b=i,E=l;return j((M(),w("div",null,[x("div",P,[D(m,{type:"primary",onClick:e.addClick},{default:k((()=>[V("添加商城")])),_:1},8,["onClick"])]),x("div",U,[x("div",A,[x("div",null,[j((M(),v(C,{size:"small",data:e.tableData,style:{width:"100%"},"row-key":"access_id",border:"","default-expand-all":""},{default:k((()=>[D(h,{prop:"app_id",label:"商城ID"}),D(h,{prop:"app_name",label:"商城名称"}),D(h,{prop:"user_name",label:"超管账号"}),D(h,{prop:"is_recycle",label:"状态"},{default:k((a=>[D(g,{modelValue:a.row.is_recycle,"onUpdate:modelValue":e=>a.row.is_recycle=e,onChange:t=>e.statusChange(t,a.row)},{default:k((()=>[V("启用")])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:1}),D(h,{prop:"weixin_service",label:"微信服务商支付"},{default:k((a=>[D(g,{modelValue:a.row.weixin_service,"onUpdate:modelValue":e=>a.row.weixin_service=e,onChange:t=>e.wxStatusChange(t,a.row)},{default:k((()=>[V("启用")])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:1}),D(h,{prop:"expire_time_text",label:"过期时间"}),D(h,{prop:"create_time",label:"添加时间"}),D(h,{label:"操作",width:"150"},{default:k((a=>[D(_,{href:"/shop",target:"_blank",link:"",type:"primary",size:"small"},{default:k((()=>[V("进入商城")])),_:1}),D(_,{class:"ml10",onClick:t=>e.editClick(a.row),link:"",type:"primary",size:"small"},{default:k((()=>[V("编辑")])),_:2},1032,["onClick"]),D(_,{class:"ml10",onClick:t=>e.deleteClick(a.row),link:"",type:"primary",size:"small"},{default:k((()=>[V("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[E,e.loading]])])])]),e.open_add?(M(),v(f,{key:0,open_add:e.open_add,onCloseDialog:r[0]||(r[0]=a=>e.closeDialogFunc(a,"add"))},null,8,["open_add"])):z("",!0),e.open_edit?(M(),v(y,{key:1,open_edit:e.open_edit,curModel:e.curModel,onCloseDialog:r[1]||(r[1]=a=>e.closeDialogFunc(a,"edit"))},null,8,["open_edit","curModel"])):z("",!0),x("div",F,[D(b,{onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange,background:"","current-page":e.curPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])),[[E,e.loading]])}]]);export{N as default};
