import{d as e,e as a,q as l,r,s as t,f as s,c as o,t as i,u as n,l as p,m as d,n as u,v as m}from"./element-plus-78c440b2.js";import{i as c}from"./order-0d47ac68.js";import{_ as g}from"./index-73113c1c.js";import{ap as _,o as h,c as b,a as f,P as y,S as w,W as v,X as j,$ as k,T as C,Y as x}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const z={data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{order_no:"",style_id:"",shop_id:"",create_time:""},status:-1,arr:[],activeName:"-1"}),created(){this.getTableList()},methods:{handleCurrentChange(e){this.curPage=e,this.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){this.curPage=1,this.status=e,this.getTableList()},getTableList(e=""){let a=this,l=this.formInline;l.status=a.status,l.page=a.curPage,l.list_rows=a.pageSize,""!=e&&(l.order_no=e.order_no,l.create_time=e.create_time,l.type=e.type),a.loading=!0,c(l).then((e=>{a.loading=!1,a.tableData=e.data.list.data,a.totalDataNumber=e.data.list.total,a.exStyle=e.data.ex_style,a.shopList=e.data.shopList,a.arr=e.data.arr})).catch((e=>{}))},onSubmit(){let e=this.formInline;this.getTableList(e)},Detail(e){let a=e;this.$router.push({path:"/order/refund/detail",query:{order_refund_id:a}})}}},S={class:"user"},V={class:"common-seach-wrap"},D={class:"block"},I=f("span",{class:"demonstration"},null,-1),T={class:"product-content"},L={class:"table-wrap"},N=f("span",null,"全部售后",-1),P={class:"d-s-c"},Y={alt:"",width:50},q={class:"flex-1 ml10"},U=f("span",{class:"gray9"},"订单号：",-1),M={class:"green"},$={class:"text-ellipsis-2 lh18"},W={class:"gray6"},X=f("span",{class:"gray9"},"售后申请：",-1),A={class:"gray6"},B=f("span",{class:"gray9"},"下 单：",-1),E={class:"orange"},F={key:0},G=f("br",null,null,-1),H={key:1,class:"gray9"},J={class:"orange"},K={key:0},O={key:0,class:"orange"},Q={key:1,class:"orange"},R={key:2,class:"orange"},Z={key:0},ee={key:0,class:"orange"},ae={key:1,class:"orange"},le={key:1},re=[f("span",null,"商家收货：",-1),f("span",{class:"orange"},"待收货",-1)],te={key:1},se={key:2},oe={class:"pagination"};const ie=g(z,[["render",function(c,g,z,ie,ne,pe){const de=e,ue=a,me=l,ce=r,ge=t,_e=s,he=o,be=i,fe=n,ye=p,we=d,ve=u,je=_("img-url"),ke=m;return h(),b("div",S,[f("div",V,[y(he,{size:"small",inline:!0,model:ne.formInline,class:"demo-form-inline"},{default:w((()=>[y(ue,{label:"订单号"},{default:w((()=>[y(de,{modelValue:ne.formInline.order_no,"onUpdate:modelValue":g[0]||(g[0]=e=>ne.formInline.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),y(ue,{label:"售后类型"},{default:w((()=>[y(ce,{modelValue:ne.formInline.type,"onUpdate:modelValue":g[1]||(g[1]=e=>ne.formInline.type=e),placeholder:"请选择"},{default:w((()=>[y(me,{label:"全部",value:"0"}),y(me,{label:"退货退款",value:"10"}),y(me,{label:"换货",value:"20"}),y(me,{label:"仅退款",value:"30"})])),_:1},8,["modelValue"])])),_:1}),y(ue,{label:"起始时间"},{default:w((()=>[f("div",D,[I,y(ge,{modelValue:ne.formInline.create_time,"onUpdate:modelValue":g[2]||(g[2]=e=>ne.formInline.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),y(ue,null,{default:w((()=>[y(_e,{type:"primary",icon:"Search",onClick:g[3]||(g[3]=e=>pe.onSubmit())},{default:w((()=>[v("查询")])),_:1})])),_:1})])),_:1},8,["model"])]),f("div",T,[f("div",L,[y(fe,{modelValue:ne.activeName,"onUpdate:modelValue":g[4]||(g[4]=e=>ne.activeName=e),onTabChange:pe.handleClick},{default:w((()=>[y(be,{name:"-1"},{label:w((()=>[N])),_:1}),y(be,{name:"0"},{label:w((()=>[f("span",null,j("进行中("+(ne.arr[0]?ne.arr[0].total:0)+")"),1)])),_:1}),y(be,{name:"10"},{label:w((()=>[f("span",null,j("已拒绝("+(ne.arr[10]?ne.arr[10].total:0)+")"),1)])),_:1}),y(be,{name:"20"},{label:w((()=>[f("span",null,j("已完成("+(ne.arr[20]?ne.arr[20].total:0)+")"),1)])),_:1}),y(be,{name:"30"},{label:w((()=>[f("span",null,j("已取消("+(ne.arr[30]?ne.arr[30].total:0)+")"),1)])),_:1})])),_:1},8,["modelValue","onTabChange"]),k((h(),C(we,{data:ne.tableData,border:"",style:{width:"100%"}},{default:w((()=>[y(ye,{prop:"orderproduct.product_name",width:"400",label:"商品信息"},{default:w((e=>[f("div",P,[k(f("img",Y,null,512),[[je,e.row.orderproduct.image.file_path]]),f("div",q,[f("p",null,[U,f("span",M,j(e.row.order_no),1)]),f("p",$,j(e.row.orderproduct.product_name),1)])])])),_:1}),y(ye,{prop:"supplier.name",label:"商家名称"}),y(ye,{prop:"create_time",label:"时间",width:"200"},{default:w((e=>[f("p",W,[X,v(" "+j(e.row.create_time),1)]),f("p",A,[B,v(" "+j(e.row.orderMaster.create_time),1)])])),_:1}),y(ye,{prop:"orderproduct.product_price",label:"单价"},{default:w((e=>[f("span",E,j(e.row.orderproduct.product_price),1)])),_:1}),y(ye,{prop:"orderproduct.total_num",label:"数量"}),y(ye,{prop:"orderproduct.total_pay_price",label:"付款价"}),y(ye,{prop:"user.nickName",label:"买家"},{default:w((e=>[e.row.user?(h(),b("span",F,j(e.row.user.nickName),1)):x("",!0),G,e.row.user?(h(),b("span",H,"(ID:"+j(e.row.user.user_id)+")",1)):x("",!0)])),_:1}),y(ye,{prop:"type.text",label:"售后类型"},{default:w((e=>[f("span",J,j(e.row.type.text),1)])),_:1}),y(ye,{prop:"",label:"处理状态",width:"130"},{default:w((e=>[0==e.row.status.value?(h(),b("div",K,[f("p",null,[v(" 商家审核： "),0==e.row.is_agree.value?(h(),b("span",O,j(e.row.is_agree.text),1)):x("",!0),10==e.row.is_agree.value?(h(),b("span",Q,j(e.row.is_agree.text),1)):x("",!0),20==e.row.is_agree.value?(h(),b("span",R,j(e.row.is_agree.text),1)):x("",!0)]),30!=e.row.type.value&&10==e.row.is_agree.value?(h(),b("p",Z,[v(" 用户发货： "),0==e.row.is_user_send?(h(),b("span",ee,"待发货")):(h(),b("span",ae,"已发货"))])):x("",!0),30!=e.row.type.value&&10==e.row.is_agree.value&&1==e.row.is_user_send&&0==e.row.is_receipt?(h(),b("p",le,re)):x("",!0)])):x("",!0),20==e.row.status.value?(h(),b("div",te,[f("span",null,j(e.row.status.text),1)])):x("",!0),10==e.row.status.value?(h(),b("div",se,[f("span",null,j(e.row.status.text),1)])):x("",!0)])),_:1}),y(ye,{fixed:"right",label:"操作",width:"80"},{default:w((e=>[f("p",null,[y(_e,{onClick:a=>pe.Detail(e.row.order_refund_id),link:"",type:"primary",size:"small"},{default:w((()=>[v("售后详情")])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])),[[ke,ne.loading]])]),f("div",oe,[y(ve,{onSizeChange:pe.handleSizeChange,onCurrentChange:pe.handleCurrentChange,background:"","current-page":ne.curPage,"page-sizes":[2,10,20,50,100],"page-size":ne.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:ne.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{ie as default};
