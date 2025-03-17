import{h as a,g as s,l as i,m as t,f as l,v as e}from"./element-plus-78c440b2.js";import{o as d}from"./cash-c5093f48.js";import{_ as r}from"./index-73113c1c.js";import{ap as o,$ as p,o as c,c as n,a as u,W as m,X as _,P as v,S as f,Y as y,b}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const j={data:()=>({active:0,loading:!0,detail:{},order:{},pageSize:20,totalDataNumber:0,curPage:1}),created(){this.getParams()},methods:{getParams(){let a=this;const s=this.$route.query.settled_id;d({settled_id:s}).then((s=>{a.loading=!1,a.detail=s.data.model,a.order=s.data.order})).catch((s=>{a.loading=!1}))},cancelFunc(){this.$router.back(-1)}}},h={class:"pb50"},g={class:"product-content"},w=b('<div class="producttips"><div class="tips_tit pb gray3 fb">操作提示</div><div class="tips_txt"> 订单结算金额 = 商户结算总金额(含运费) + 平台结算总抽成 </div><div class="tips_txt"> 商户收入金额 = 商户结算总金额 - 商户退款金额 - 分销佣金 </div><div class="tips_txt">平台抽成金额 = 平台结算总抽成 - 平台退款抽成</div></div>',1),x={class:"common-form"},k={class:"common-form-data"},z={class:"table-wrap"},P={class:"pb16"},q=u("div",null,"订单结算金额（元）",-1),$={class:"detail_prici"},C={class:"pb16"},F=u("div",null,"支付金额（元）",-1),S={class:"detail_prici"},D={class:"pb16"},K=u("div",null,"运费金额（元）",-1),N={class:"detail_prici"},W={class:"pb16"},X=u("div",null,"商户收入金额（元）",-1),Y={class:"detail_prici"},A={class:"pb16"},B=u("div",null,"商户结算总金额（元）",-1),E={class:"detail_prici"},G={class:"pb16"},H=u("div",null,"商户退款金额（元）",-1),I={class:"detail_prici"},J={class:"pb16"},L=u("div",null,"分销佣金 (元)",-1),M={class:"detail_prici"},O={class:"pb16"},Q=u("div",null,"平台抽成金额（元）",-1),R={class:"detail_prici"},T={class:"pb16"},U=u("div",null,"平台结算总抽成（元）",-1),V={class:"detail_prici"},Z={class:"pb16"},aa=u("div",null,"平台退款抽成（元）",-1),sa={class:"detail_prici"},ia=u("div",{class:"common-form mt16"},"商品信息",-1),ta={class:"table-wrap"},la={class:"product-info"},ea={class:"pic"},da={class:"info"},ra={class:"name"},oa={key:0,class:"gray9"},pa={key:1,class:"orange"},ca={key:0},na={key:1},ua={class:"common-button-wrapper"};const ma=r(j,[["render",function(d,r,b,j,ma,_a){const va=a,fa=s,ya=i,ba=t,ja=l,ha=o("img-url"),ga=e;return p((c(),n("div",h,[u("div",g,[w,u("div",x,[m(" 商户结算"),u("span",k,"订单日期:"+_(ma.detail.create_time),1)]),u("div",z,[v(fa,null,{default:f((()=>[v(va,{span:6},{default:f((()=>[u("div",P,[q,u("div",$,_(ma.detail.order_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",C,[F,u("div",S,_(ma.detail.pay_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",D,[K,u("div",N,_(ma.detail.express_money),1)])])),_:1})])),_:1}),v(fa,null,{default:f((()=>[v(va,{span:6},{default:f((()=>[u("div",W,[X,u("div",Y,_(ma.detail.real_supplier_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",A,[B,u("div",E,_(ma.detail.supplier_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",G,[H,u("div",I,_(ma.detail.refund_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",J,[L,u("div",M,_(ma.detail.agent_money),1)])])),_:1})])),_:1}),v(fa,null,{default:f((()=>[v(va,{span:6},{default:f((()=>[u("div",O,[Q,u("div",R,_(ma.detail.sys_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",T,[U,u("div",V,_(ma.detail.real_sys_money),1)])])),_:1}),v(va,{span:6},{default:f((()=>[u("div",Z,[aa,u("div",sa,_(ma.detail.refund_sys_money),1)])])),_:1})])),_:1})]),ia,u("div",ta,[v(ba,{size:"small",data:ma.order.product,border:"",style:{width:"100%"}},{default:f((()=>[v(ya,{prop:"product_name",label:"商品",width:"400"},{default:f((a=>[u("div",la,[u("div",ea,[p(u("img",null,null,512),[[ha,a.row.image.file_path]])]),u("div",da,[u("div",ra,_(a.row.product_name),1),""!=a.row.product_attr?(c(),n("div",oa,_(a.row.product_attr),1)):y("",!0),a.row.refund?(c(),n("div",pa,_(a.row.refund.type.text)+"-"+_(a.row.refund.status.text),1)):y("",!0)])])])),_:1}),v(ya,{prop:"product_no",label:"商品编码"}),v(ya,{prop:"product_weight",label:"重量 (Kg)"}),v(ya,{prop:"total_num",label:"购买数量"},{default:f((a=>[u("p",null,"x "+_(a.row.total_num),1)])),_:1}),v(ya,{prop:"total_pay_price",label:"支付金额(元)"},{default:f((a=>[u("p",null,"￥ "+_(a.row.total_pay_price),1)])),_:1}),v(ya,{prop:"total_pay_price",label:"退款金额(元)"},{default:f((a=>[a.row.refund?(c(),n("p",ca,_(a.row.refund.refund_money),1)):(c(),n("p",na,"0"))])),_:1})])),_:1},8,["data"])])]),u("div",ua,[v(ja,{size:"small",type:"info",onClick:_a.cancelFunc},{default:f((()=>[m("返回上一页")])),_:1},8,["onClick"])])])),[[ga,ma.loading]])}]]);export{ma as default};
