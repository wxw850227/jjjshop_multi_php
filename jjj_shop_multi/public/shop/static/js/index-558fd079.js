import{d as e,e as a,q as t,r as l,s as r,f as s,c as o,t as n,u as i,l as p,m as u,n as d,v as m}from"./element-plus-78c440b2.js";import{g as c}from"./order-0d47ac68.js";import{_}from"./index-73113c1c.js";import{ap as g,o as h,c as b,a as y,P as f,S as w,W as v,X as j,$ as k,T as C,Y as x}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const z={data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,plate_status:-1,formInline:{order_no:"",style_id:"",shop_id:"",create_time:""},status:-1,arr:[],activeName:"-1"}),created(){this.getTableList()},methods:{handleCurrentChange(e){this.curPage=e,this.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){this.curPage=1,this.plate_status=e,this.getTableList()},getTableList(e=""){let a=this,t={};t.plate_status=a.plate_status,t.page=a.curPage,t.list_rows=a.pageSize,""!=e&&(t.order_no=e.order_no,t.create_time=e.create_time,t.type=e.type),a.loading=!0,c(t).then((e=>{a.loading=!1,a.tableData=e.data.list.data,a.totalDataNumber=e.data.list.total,a.exStyle=e.data.ex_style,a.shopList=e.data.shopList,a.arr=e.data.arr})).catch((e=>{}))},onSubmit(){let e=this.formInline;this.getTableList(e)},Detail(e){let a=e;this.$router.push({path:"/order/platerefund/detail",query:{order_refund_id:a}})}}},S={class:"user"},D={class:"common-seach-wrap"},V={class:"block"},I=y("span",{class:"demonstration"},null,-1),T={class:"product-content"},L={class:"table-wrap"},N=y("span",null,"全部售后",-1),P={class:"d-s-c"},Y={alt:"",width:50},q={class:"flex-1 ml10"},U=y("span",{class:"gray9"},"订单号：",-1),M={class:"green"},$={class:"text-ellipsis-2 lh18"},W={class:"gray6"},X=y("span",{class:"gray9"},"售后申请：",-1),A={class:"gray6"},B=y("span",{class:"gray9"},"下 单：",-1),E={class:"orange"},F={key:0},G=y("br",null,null,-1),H={key:1,class:"gray9"},J={class:"orange"},K={key:0,class:"orange"},O={key:1,class:"orange"},Q={key:2,class:"orange"},R={key:0,class:"orange"},Z={key:1,class:"orange"},ee={key:2,class:"orange"},ae={key:0},te={key:0,class:"orange"},le={key:1,class:"orange"},re={key:1},se=[y("span",null,"商家收货：",-1),y("span",{class:"orange"},"待收货",-1)],oe={class:"pagination"};const ne=_(z,[["render",function(c,_,z,ne,ie,pe){const ue=e,de=a,me=t,ce=l,_e=r,ge=s,he=o,be=n,ye=i,fe=p,we=u,ve=d,je=g("img-url"),ke=m;return h(),b("div",S,[y("div",D,[f(he,{size:"small",inline:!0,model:ie.formInline,class:"demo-form-inline"},{default:w((()=>[f(de,{label:"订单号"},{default:w((()=>[f(ue,{modelValue:ie.formInline.order_no,"onUpdate:modelValue":_[0]||(_[0]=e=>ie.formInline.order_no=e),placeholder:"请输入订单号"},null,8,["modelValue"])])),_:1}),f(de,{label:"售后类型"},{default:w((()=>[f(ce,{modelValue:ie.formInline.type,"onUpdate:modelValue":_[1]||(_[1]=e=>ie.formInline.type=e),placeholder:"请选择"},{default:w((()=>[f(me,{label:"全部",value:"0"}),f(me,{label:"退货退款",value:"10"}),f(me,{label:"换货",value:"20"}),f(me,{label:"仅退款",value:"30"})])),_:1},8,["modelValue"])])),_:1}),f(de,{label:"起始时间"},{default:w((()=>[y("div",V,[I,f(_e,{modelValue:ie.formInline.create_time,"onUpdate:modelValue":_[2]||(_[2]=e=>ie.formInline.create_time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),f(de,null,{default:w((()=>[f(ge,{type:"primary",icon:"Search",onClick:_[3]||(_[3]=e=>pe.onSubmit())},{default:w((()=>[v("查询")])),_:1})])),_:1})])),_:1},8,["model"])]),y("div",T,[y("div",L,[f(ye,{modelValue:ie.activeName,"onUpdate:modelValue":_[4]||(_[4]=e=>ie.activeName=e),onTabChange:pe.handleClick},{default:w((()=>[f(be,{name:"-1"},{label:w((()=>[N])),_:1}),f(be,{name:"10"},{label:w((()=>[y("span",null,j("进行中("+(ie.arr[10]?ie.arr[10].total:0)+")"),1)])),_:1}),f(be,{name:"30"},{label:w((()=>[y("span",null,j("已拒绝("+(ie.arr[30]?ie.arr[30].total:0)+")"),1)])),_:1}),f(be,{name:"20"},{label:w((()=>[y("span",null,j("已同意("+(ie.arr[20]?ie.arr[20].total:0)+")"),1)])),_:1}),f(be,{name:"40"},{label:w((()=>[y("span",null,j("已完成("+(ie.arr[40]?ie.arr[40]:0)+")"),1)])),_:1})])),_:1},8,["modelValue","onTabChange"]),k((h(),C(we,{data:ie.tableData,border:"",style:{width:"100%"}},{default:w((()=>[f(fe,{prop:"orderproduct.product_name",width:"400",label:"商品信息"},{default:w((e=>[y("div",P,[k(y("img",Y,null,512),[[je,e.row.orderproduct.image.file_path]]),y("div",q,[y("p",null,[U,y("span",M,j(e.row.order_no),1)]),y("p",$,j(e.row.orderproduct.product_name),1)])])])),_:1}),f(fe,{prop:"supplier.name",label:"商家名称"}),f(fe,{prop:"create_time",label:"时间",width:"200"},{default:w((e=>[y("p",W,[X,v(" "+j(e.row.create_time),1)]),y("p",A,[B,v(" "+j(e.row.orderMaster.create_time),1)])])),_:1}),f(fe,{prop:"orderproduct.product_price",label:"单价"},{default:w((e=>[y("span",E,j(e.row.orderproduct.product_price),1)])),_:1}),f(fe,{prop:"orderproduct.total_num",label:"数量"}),f(fe,{prop:"orderproduct.total_pay_price",label:"付款价"}),f(fe,{prop:"user.nickName",label:"买家"},{default:w((e=>[e.row.user?(h(),b("span",F,j(e.row.user.nickName),1)):x("",!0),G,e.row.user?(h(),b("span",H,"(ID:"+j(e.row.user.user_id)+")",1)):x("",!0)])),_:1}),f(fe,{prop:"type.text",label:"售后类型"},{default:w((e=>[y("span",J,j(e.row.type.text),1)])),_:1}),f(fe,{prop:"",label:"处理状态",width:"130"},{default:w((e=>[y("p",null,[v(" 平台审核： "),10==e.row.plate_status.value?(h(),b("span",K,j(e.row.plate_status.text),1)):x("",!0),20==e.row.plate_status.value?(h(),b("span",O,j(e.row.plate_status.text),1)):x("",!0),30==e.row.plate_status.value?(h(),b("span",Q,j(e.row.plate_status.text),1)):x("",!0)]),y("p",null,[v(" 商家审核： "),0==e.row.status.value?(h(),b("span",R,j(e.row.status.text),1)):x("",!0),10==e.row.status.value?(h(),b("span",Z,j(e.row.status.text),1)):x("",!0),20==e.row.status.value?(h(),b("span",ee,j(e.row.status.text),1)):x("",!0)]),10==e.row.type.value&&20==e.row.plate_status.value?(h(),b("p",ae,[v(" 用户发货： "),0==e.row.is_user_send?(h(),b("span",te,"待发货")):(h(),b("span",le,"已发货"))])):x("",!0),10==e.row.type.value&&20==e.row.plate_status.value&&1==e.row.is_user_send&&0==e.row.is_receipt?(h(),b("p",re,se)):x("",!0)])),_:1}),f(fe,{fixed:"right",label:"操作",width:"80"},{default:w((e=>[y("p",null,[f(ge,{onClick:a=>pe.Detail(e.row.order_refund_id),link:"",type:"primary",size:"small"},{default:w((()=>[v("售后详情")])),_:2},1032,["onClick"])]),y("p",null,[10==e.row.plate_status.value?(h(),C(ge,{key:0,onClick:a=>pe.Detail(e.row.order_refund_id),link:"",type:"primary",size:"small"},{default:w((()=>[v("去审核")])),_:2},1032,["onClick"])):x("",!0)])])),_:1})])),_:1},8,["data"])),[[ke,ie.loading]])]),y("div",oe,[f(ve,{onSizeChange:pe.handleSizeChange,onCurrentChange:pe.handleCurrentChange,background:"","current-page":ie.curPage,"page-sizes":[2,10,20,50,100],"page-size":ie.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:ie.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{ne as default};
