import{_ as e,o as t,c as s,w as o,d as a,e as d,t as i,k as r,h as l,J as c,u as n,g as _,r as u,F as p,x as f,n as y,S as h,j as g,f as m,a1 as k,a as b,a2 as D,l as x,R as v,a3 as O,z as S,M as C,a4 as w,i as L,a5 as A}from"./index-73db7405.js";const j=e({components:{Myinfo:e({data:()=>({}),props:["Address","exist_address","dis"],onLoad(){},mounted(){},methods:{addAddress(){if(this.dis)return;let e="/pages/user/address/address?source=order";this.exist_address||(e="/pages/user/address/add/add?delta=1"),this.gotoPage(e)}}},[["render",function(e,c,n,_,u,p){const f=r,y=l;return t(),s(y,{class:"my_info br6"},{default:o((()=>[null==n.Address?(t(),s(y,{key:0,class:"add-address d-s-c",onClick:c[0]||(c[0]=e=>p.addAddress())},{default:o((()=>[a(y,{class:"icon-box mr10"},{default:o((()=>[a(f,{class:"icon iconfont icon-dizhi1"})])),_:1}),a(f,null,{default:o((()=>[d("请添加收货地址")])),_:1})])),_:1})):(t(),s(y,{key:1,class:"address-defalut-wrap",onClick:c[1]||(c[1]=e=>p.addAddress())},{default:o((()=>[a(y,{class:"d-b-c"},{default:o((()=>[a(y,{class:"add-addr flex-1"},{default:o((()=>[a(y,{class:"icon-box mr10 f-s-0"},{default:o((()=>[a(f,{class:"icon iconfont icon-dizhi1"})])),_:1}),a(y,{class:"flex-1"},{default:o((()=>[a(y,{class:"info mb10"},{default:o((()=>[a(f,{class:"province-c-a f28 fb text-ellipsis-2"},{default:o((()=>[d(i(n.Address.region.province)+i(n.Address.region.city)+" "+i(n.Address.region.region)+i(n.Address.detail),1)])),_:1})])),_:1}),a(y,{class:"gray9 f22"},{default:o((()=>[a(f,null,{default:o((()=>[d(i(n.Address.name)+i(n.Address.phone),1)])),_:1})])),_:1})])),_:1})])),_:1}),a(y,{class:"icon iconfont icon-jiantou ml80 f-s-0"})])),_:1})])),_:1}))])),_:1})}],["__scopeId","data-v-fba083cb"]]),Coupon:e({data:()=>({phoneHeight:0,scrollviewHigh:0,Visible:!1,datalist:{},ratio:1}),props:["isCoupon","couponList"],onLoad(){},mounted(){this.init()},watch:{isCoupon:function(e,t){e!=t&&(this.Visible=e,this.datalist=this.couponList,this.getHeight())}},methods:{init(){let e=this;c({success(t){e.phoneHeight=t.windowHeight,e.ratio=t.windowWidth/750,e.getHeight()}})},getHeight(){let e=Object.keys(this.couponList).length;e>2?this.scrollviewHigh=.6*this.phoneHeight:1==e?this.scrollviewHigh=230*this.ratio:2==e&&(this.scrollviewHigh=460*this.ratio)},selectCoupon(e){this.closePopup(e)},closePopup(e){this.$emit("close",e)}}},[["render",function(e,c,k,b,D,x){const v=l,O=r,S=h,C=g;return t(),s(v,{class:y(D.Visible?"usable-coupon open":"usable-coupon close")},{default:o((()=>[a(v,{class:"popup-bg",onClick:c[0]||(c[0]=e=>x.closePopup(null))}),a(v,{class:"main pt30",onClick:c[2]||(c[2]=f((()=>{}),["stop"]))},{default:o((()=>[a(S,{"scroll-y":"true",class:"scroll-Y",style:n("height:"+D.scrollviewHigh+"px;")},{default:o((()=>[a(v,{class:"p-0-30"},{default:o((()=>[(t(!0),_(p,null,u(D.datalist,((e,r)=>(t(),s(v,{onClick:t=>x.selectCoupon(e.user_coupon_id),style:{"margin-bottom":"15rpx"},class:y("coupon-item coupon-item-"+e.color.text),key:r},{default:o((()=>[a(v,{class:"circles"},{default:o((()=>[(t(),_(p,null,u(6,((e,t)=>a(O,{key:t}))),64))])),_:1}),a(v,{class:"info w100"},{default:o((()=>[a(v,{class:"d-c-c d-c"},{default:o((()=>[a(O,{class:"f40 fb w-s-n"},{default:o((()=>[d(i(e.coupon_type.text),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),a(v,{class:"operation d-b-c w-b pr"},{default:o((()=>[a(v,{class:"flex-1 o-h"},{default:o((()=>[a(v,{class:"f34"},{default:o((()=>[10==e.coupon_type.value?(t(),s(O,{key:0,class:"f40"},{default:o((()=>[d("减"+i(1*e.reduce_price)+"元",1)])),_:2},1024)):m("",!0),20==e.coupon_type.value?(t(),_(p,{key:1},[a(O,{class:"f40"},{default:o((()=>[d(i(1*e.discount),1)])),_:2},1024),a(O,{class:"f24"},{default:o((()=>[d("折")])),_:1})],64)):m("",!0)])),_:2},1024),a(v,{class:"f24"},{default:o((()=>[d(i(e.min_price>0?"满"+1*e.min_price+"元可用":"无门槛"),1)])),_:2},1024),a(v,{class:"mt30 f24 white"},{default:o((()=>[d(i(e.start_time.text)+"~"+i(e.end_time.text),1)])),_:2},1024)])),_:2},1024),a(v,{class:"f30 mr20 b-radio",style:{position:"absolute",right:"0"}},{default:o((()=>[d(" 立即使用 ")])),_:1})])),_:2},1024)])),_:2},1032,["onClick","class"])))),128))])),_:1})])),_:1},8,["style"]),a(v,{class:"coupon-btns"},{default:o((()=>[a(C,{type:"default",onClick:c[1]||(c[1]=e=>x.closePopup(0)),class:"btn-cancel"},{default:o((()=>[d("不使用优惠券")])),_:1})])),_:1})])),_:1})])),_:1},8,["class"])}],["__scopeId","data-v-19b913e5"]]),Dist:e({data:()=>({Visible:!1,checked_id:10,choose_store_id:0}),components:{Storeinfo:e({data:()=>({isAddress:!1,store_id:0}),components:{Adress:e({data:()=>({listData:[],isLoading:!0,storeList:[],longitude:"",latitude:"",selectedId:-1,Visible:!1,url:""}),props:["isAddress","store_id","chooseSotr"],watch:{isAddress(e){this.Visible=e,e&&(this.isWeixin()&&(this.url=window.location.href),this.selectedId=this.$props.store_id,console.log(this.selectedId),this.getData(!0),this.isWeixin()||this.getLocation())}},methods:{onAuthorize(){let e=this;uni.openSetting({success(t){t.authSetting["scope.userLocation"]&&(console.log("授权成功"),e.isAuthor=!0,setTimeout((()=>{e.getLocation((e=>{}))}),1e3))}})},getLocation(e){let t=this;k({type:"wgs84",success(e){t.longitude=e.longitude,t.latitude=e.latitude,t.getData(!1)},fail(){b({title:"获取定位失败，请点击右下角按钮打开定位权限",duration:2e3,icon:"none"}),t.isAuthor=!1}})},getWxLocation(e,t){let s=this;D.config(JSON.parse(e)),D.ready((function(e){D.getLocation({type:"wgs84",success:function(e){s.longitude=e.longitude,s.latitude=e.latitude,s.getData(!1)}})})),D.error((function(e){console.log(e)}))},getData(e){let t=this;t.isLoading=!0,t._get("store.store/lists",{longitude:t.longitude,latitude:t.latitude,shop_supplier_id:t.$props.chooseSotr,url:t.url},(function(s){t.isLoading=!1,t.storeList=s.data.list,e&&t.isWeixin()&&t.getWxLocation(s.data.signPackage)}))},closeFunc(){this.$emit("close",null)},onSelectedStore(e){this.selectedId=e,this.$fire.fire("selectStoreId",e),this.$emit("close",e)}}},[["render",function(e,c,n,f,g,k){const b=l,D=r,x=h;return t(),s(b,{class:y(e.theme()||""),"data-theme":e.theme()},{default:o((()=>[g.Visible?(t(),s(b,{key:0,class:"pop_bg",onClick:k.closeFunc},null,8,["onClick"])):m("",!0),a(b,{class:y(g.Visible?"address-distr_open":"address-distr_close")},{default:o((()=>[a(b,{class:"address-list bg-white"},{default:o((()=>[a(x,{"scroll-y":"true",class:"specs mt20",style:{"max-height":"600rpx"}},{default:o((()=>[(t(!0),_(p,null,u(g.storeList,((e,r)=>(t(),s(b,{class:"p20 address-item",key:r},{default:o((()=>[a(b,{class:y([e.store_id==g.selectedId?"active":"","address d-s-c"])},{default:o((()=>[a(b,{class:"info flex-1",onClick:t=>k.onSelectedStore(e)},{default:o((()=>[a(b,{class:"user f34"},{default:o((()=>[a(D,null,{default:o((()=>[d(i(e.store_name),1)])),_:2},1024)])),_:2},1024),a(b,{class:"pt10 user f30 gray6"},{default:o((()=>[a(D,null,{default:o((()=>[d(i(e.phone),1)])),_:2},1024)])),_:2},1024),a(b,{class:"pt10 f24 gray6"},{default:o((()=>[a(D,null,{default:o((()=>[d(i(e.region.province)+i(e.region.city)+i(e.region.region)+i(e.address),1)])),_:2},1024)])),_:2},1024),a(b,null,{default:o((()=>[d(i(e.distance_unit),1)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1032,["class"])])),_:2},1024)))),128)),g.isLoading||g.storeList.length?m("",!0):(t(),s(b,{key:0},{default:o((()=>[a(b,{class:"yoshop-notcont"},{default:o((()=>[a(D,{class:"iconfont icon-wushuju"}),a(D,{class:"cont"},{default:o((()=>[d("亲，暂无自提门店哦")])),_:1})])),_:1})])),_:1}))])),_:1})])),_:1})])),_:1},8,["class"])])),_:1},8,["class","data-theme"])}],["__scopeId","data-v-caeb041b"]])},props:["extract_store","last_extract","chooseSotr"],onLoad(){},mounted(){},methods:{addAddress(){let e=-1;this.extract_store.store_id&&(e=this.extract_store.store_id),this.store_id=e,this.isAddress=!0},closeAdress(){this.isAddress=!1}}},[["render",function(e,c,n,_,u,p){const f=r,y=l,h=x("Adress");return t(),s(y,{style:{flex:"1"}},{default:o((()=>[n.extract_store.store_id?(t(),s(y,{key:1,class:"d-b-c pr20",onClick:c[1]||(c[1]=e=>p.addAddress())},{default:o((()=>[a(y,{class:"address-defalut-wrap"},{default:o((()=>[a(y,{class:"info d-s-s"},{default:o((()=>[a(f,{class:"state"},{default:o((()=>[d("当前自提点")])),_:1}),a(y,{class:"province-c-a d-s-s flex-1"},{default:o((()=>[a(f,null,{default:o((()=>[d(i(n.extract_store.region.province),1)])),_:1}),a(f,null,{default:o((()=>[d(i(n.extract_store.region.city),1)])),_:1}),a(f,null,{default:o((()=>[d(i(n.extract_store.region.region),1)])),_:1})])),_:1})])),_:1}),a(y,{class:"address"},{default:o((()=>[a(f,{class:"fb gray3"},{default:o((()=>[d(i(n.extract_store.store_name),1)])),_:1}),a(y,{class:"icon-box"})])),_:1}),a(y,{class:"user"},{default:o((()=>[a(f,{class:"name"},{default:o((()=>[d(i(n.extract_store.address),1)])),_:1}),a(f,{class:"tel"},{default:o((()=>[d(i(n.extract_store.phone),1)])),_:1})])),_:1})])),_:1}),a(y,null,{default:o((()=>[v("i",{class:"iconfont icon-jiantou"})])),_:1})])),_:1})):(t(),s(y,{key:0,class:"d-b-c pr20",onClick:c[0]||(c[0]=e=>p.addAddress())},{default:o((()=>[a(y,{class:"add-address d-s-c"},{default:o((()=>[a(y,{class:"icon-box mr10"},{default:o((()=>[a(f,{class:"icon iconfont icon-dizhi1"})])),_:1}),a(f,null,{default:o((()=>[d("请选择自提点")])),_:1})])),_:1}),a(y,null,{default:o((()=>[v("i",{class:"iconfont icon-jiantou"})])),_:1})])),_:1})),a(h,{isAddress:u.isAddress,chooseSotr:n.chooseSotr,store_id:u.store_id,onClose:p.closeAdress},null,8,["isAddress","chooseSotr","store_id","onClose"])])),_:1})}],["__scopeId","data-v-46324019"]])},props:["isDist","extract_store","last_extract","deliverySetting","chooseSotr"],watch:{isDist(e){this.Visible=e}},onLoad(e){this.options=e},methods:{closePopup(e){20==this.checked_id&&null==this.$props.extract_store.store_id?b({icon:"none",title:"请选择自提点"}):this.$emit("close",this.checked_id)},radioChange(e){this.checked_id=e,this.$fire.fire("checkedfir",e)},hasType(e){return-1!=this.deliverySetting.indexOf(e)}}},[["render",function(e,i,c,n,_,u){const p=l,h=O,k=r,b=x("Storeinfo"),D=g;return t(),s(p,{class:y(_.Visible?"usable-distr open":"usable-distr close")},{default:o((()=>[a(p,{class:"popup-bg",onClick:u.closePopup},null,8,["onClick"]),a(p,{class:"main pt30",onClick:i[2]||(i[2]=f((()=>{}),["stop"]))},{default:o((()=>[a(p,{class:"distr-tit"},{default:o((()=>[d("配送方式")])),_:1}),u.hasType("10")?(t(),s(p,{key:0,class:"distr-list bor_botm",onClick:i[0]||(i[0]=e=>u.radioChange(10))},{default:o((()=>[a(p,null,{default:o((()=>[d("普通配送")])),_:1}),a(p,{class:"radio"},{default:o((()=>[a(h,{value:"1",checked:10==_.checked_id},null,8,["checked"]),a(k)])),_:1})])),_:1})):m("",!0),u.hasType("20")?(t(),s(p,{key:1,onClick:i[1]||(i[1]=e=>u.radioChange(20))},{default:o((()=>[a(p,{class:"distr-list"},{default:o((()=>[a(p,null,{default:o((()=>[d("自提门店：")])),_:1}),a(p,{class:"radio"},{default:o((()=>[a(h,{value:"2",checked:20==_.checked_id},null,8,["checked"]),a(k)])),_:1})])),_:1}),a(b,{ref:"getShopinfoData",extract_store:c.extract_store,chooseSotr:c.chooseSotr,last_extract:c.last_extract,style:{flex:"1"}},null,8,["extract_store","chooseSotr","last_extract"])])),_:1})):m("",!0),a(p,{class:"distr_btn"},{default:o((()=>[a(D,{class:"theme-btn",onClick:u.closePopup},{default:o((()=>[d("完成")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["class"])}],["__scopeId","data-v-2a22869a"]])},data:()=>({loading:!0,options:{},indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,product_id:"",product_num:"",ProductData:[],OrderData:[],exist_address:!1,Address:{region:[]},extract_store:[],last_extract:{},product_sku_id:0,delivery:10,store_id:0,coupon_id:-1,is_use_points:1,remark:"",pay_type:20,isCoupon:!1,coupon_list:{},couponList:[],coupon_num:0,isDist:!1,temlIds:[],product_couponid:0,chooseSotr:0,deliverySetting:[],choose_delivery:10,store_data:{},choose_store_id:0,store_list:{},room_id:"",showAlipay:!1,balance:"",store_open:1}),onLoad(e){let t=this;e.room_id=e.room_id?"undefined"==e.room_id?0:e.room_id:0,t.options=e,t.room_id=e.room_id,console.log(t.options,"options"),t.$fire.on("selectStoreId",(function(e){t.extract_store=e,t.choose_store_id=e.store_id})),t.$fire.on("checkedfir",(function(e){t.choose_delivery=e}))},onShow(){this.getData()},mounted(){},methods:{init(){let e="",t="",s=this;s.ProductData.forEach(((o,a)=>{e=o.shop_supplier_id,t={coupon_id:o.orderData.coupon_id,delivery:o.orderData.delivery,store_id:0,remark:""},s.store_data={...s.store_data,[e]:t}}))},hasType(e){return-1!=this.deliverySetting.indexOf(e)},payTypeFunc(e){this.pay_type=e},onShowPoints:function(e){let t=this;1==e.target.value?t.is_use_points=1:t.is_use_points=0,t.getData()},onTogglePopupCoupon(e,t){let s=this;s.chooseSotr=0!=t?t.shop_supplier_id:0,s.isCoupon=!0,s.couponList=e},closeCouponFunc(e){let t=this;if(e&&"number"!=typeof e)t.isCoupon=!1;else{if(0!=t.chooseSotr){let s=t.chooseSotr;t.store_data[s].coupon_id=e>0?e:0,t.chooseSotr=0}else t.coupon_id=e>0?e:0;t.isCoupon=!1,t.getData()}},getData(){let e=this;S({title:"加载中"});let t=function(t){e.OrderData=t.data.orderInfo.orderData,e.temlIds=t.data.template_arr,e.ProductData=t.data.orderInfo.supplierList,e.exist_address=e.OrderData.exist_address,e.Address=e.OrderData.address,e.last_extract=e.OrderData.last_extract,"deposit"!=e.options.order_type&&(e.coupon_list=e.OrderData.coupon_list,e.coupon_id=e.OrderData.coupon_id_sys,e.coupon_num=Object.keys(e.coupon_list).length),e.balance=t.data.balance,0==e.OrderData.order_pay_price&&(e.pay_type=10),"{}"==JSON.stringify(e.store_data)&&e.init(),t.data.show_alipay&&(e.showAlipay=!0),e.loading=!1},s={delivery:e.delivery,store_id:e.store_id,coupon_id:e.coupon_id,is_use_points:e.is_use_points,pay_source:e.getPlatform()};if("{}"==JSON.stringify(e.store_data)||(s={...s,supplier:e.store_data}),"buy"===e.options.order_type)e._get("order.order/buy",{params:JSON.stringify(Object.assign({},s,{product_id:e.options.product_id,product_num:e.options.product_num,product_sku_id:e.options.product_sku_id}))},(function(e){t(e)}),(e=>{C()}));else if("deposit"===e.options.order_type){let o=Object.assign({},s,{product_id:e.options.product_id,product_num:e.options.product_num,product_sku_id:e.options.product_sku_id,advance_product_sku_id:e.options.advance_product_sku_id,advance_product_id:e.options.advance_product_id});console.log(o),e._get("plus.advance.Order/frontBuy",{params:JSON.stringify(Object.assign({},s,{product_id:e.options.product_id,product_num:e.options.product_num,product_sku_id:e.options.product_sku_id,advance_product_sku_id:e.options.advance_product_sku_id,advance_product_id:e.options.advance_product_id}))},(function(e){t(e)}),(e=>{C()}))}else"retainage"===e.options.order_type?e._get("plus.advance.Order/buy",{params:JSON.stringify(Object.assign({},s,{order_id:e.options.order_id}))},(function(e){t(e)}),(e=>{C()})):"cart"===e.options.order_type?e._get("order.order/cart",{params:JSON.stringify(Object.assign({},s,{cart_ids:e.options.cart_ids||0}))},(function(e){t(e)}),(e=>{C()})):"points"==e.options.order_type?(console.log(e.options),e._get("plus.points.order/buy",{params:JSON.stringify(Object.assign({},s,{point_product_id:e.options.point_product_id,product_sku_id:e.options.product_sku_id,point_product_sku_id:e.options.point_product_sku_id,product_num:e.options.product_num}))},(function(e){t(e)}),(e=>{C()}))):"seckill"===e.options.order_type?(s.num=e.options.num,e._get("plus.seckill.order/buy",{params:JSON.stringify(Object.assign({},s,{seckill_product_id:e.options.seckill_product_id,product_sku_id:e.options.product_sku_id,seckill_product_sku_id:e.options.seckill_product_sku_id,product_num:e.options.product_num}))},(function(e){t(e)}),(e=>{C()}))):"bargain"===e.options.order_type?e._get("plus.bargain.order/buy",{params:JSON.stringify(Object.assign({},s,{bargain_product_id:e.options.bargain_product_id,product_sku_id:e.options.product_sku_id,bargain_product_sku_id:e.options.bargain_product_sku_id,bargain_task_id:e.options.bargain_task_id}))},(function(e){t(e)}),(e=>{C()})):"assemble"===e.options.order_type&&e._get("plus.assemble.order/buy",{params:JSON.stringify(Object.assign({},s,{assemble_product_id:e.options.assemble_product_id,product_sku_id:e.options.product_sku_id,assemble_product_sku_id:e.options.assemble_product_sku_id,product_num:e.options.product_num,assemble_bill_id:e.options.assemble_bill_id}))},(function(e){t(e)}),(e=>{C()}))},toDecimal2(e){var t=parseFloat(e);if(isNaN(t))return"0.00";t=Math.round(100*e);var s=Math.round(1e3*e).toString().split("");(s=s[s.length-1])>=5?t=(t-1)/100:t/=100;var o=t.toString(),a=o.indexOf(".");for(a<0&&(a=o.length,o+=".");o.length<=a+2;)o+="0";return o},DistUp(e){if(30==e.orderData.delivery)return;let t=this;t.store_id=e.shop_supplier_id,t.chooseSotr=e.shop_supplier_id,t.choose_delivery=e.orderData.delivery,t.chooseSotr,t.getData(),t.deliverySetting=e.orderData.deliverySetting,t.extract_store=e.orderData.extract_store,this.isDist=!0},closeDistFunc(e){let t=this;t.choose_delivery=e,t.isDist=!1;let s="";t.extract_store.region&&(s=t.extract_store.region.province+t.extract_store.region.city+t.extract_store.region.region+t.extract_store.store_name);let o=t.chooseSotr,a=t.choose_store_id;t.delivery=t.choose_delivery,t.store_id=o,t.store_data[o].store_id=a,t.store_data[o].delivery=t.choose_delivery,t.store_list[o]=s,t.chooseSotr=0,t.getData()},objKeys(e,t){if(e)return 1==t?Object.keys(e).length:Object.keys(e)},SubmitOrder(){console.log("订阅消息");let e=this;if(e.exist_address){S({title:"加载中",mask:!0});let t={pay_type:e.pay_type,room_id:e.room_id,coupon_id:e.coupon_id,is_use_points:e.is_use_points};t=Object.assign(t,{supplier:e.store_data});let s="";"buy"===e.options.order_type&&(s="order.order/buy",t=Object.assign(t,{product_id:e.options.product_id,product_num:e.options.product_num,product_sku_id:e.options.product_sku_id,room_id:e.options.room_id||0}),t=JSON.stringify(t)),"deposit"===e.options.order_type&&(s="plus.advance.Order/frontBuy",t=Object.assign(t,{product_id:e.options.product_id,product_num:e.options.product_num,product_sku_id:e.options.product_sku_id,advance_product_sku_id:e.options.advance_product_sku_id,advance_product_id:e.options.advance_product_id}),t=JSON.stringify(t)),"retainage"===e.options.order_type&&(s="plus.advance.Order/buy",t=Object.assign(t,{order_id:e.options.order_id}),t=JSON.stringify(t)),"cart"===e.options.order_type&&(s="order.order/cart",t=Object.assign(t,{cart_ids:e.options.cart_ids||0,room_id:e.options.room_id||0}),t=JSON.stringify(t)),"points"===e.options.order_type&&(s="plus.points.order/buy",t=Object.assign(t,{point_product_id:e.options.point_product_id,product_sku_id:e.options.product_sku_id,point_product_sku_id:e.options.point_product_sku_id,product_num:e.options.product_num}),t=JSON.stringify(t)),"seckill"===e.options.order_type&&(s="plus.seckill.order/buy",t.num=e.options.num,t=Object.assign(t,{seckill_product_id:e.options.seckill_product_id,product_sku_id:e.options.product_sku_id,seckill_product_sku_id:e.options.seckill_product_sku_id,product_num:e.options.product_num}),t=JSON.stringify(t)),"bargain"===e.options.order_type&&(s="plus.bargain.order/buy",t=Object.assign(t,{bargain_product_id:e.options.bargain_product_id,product_sku_id:e.options.product_sku_id,bargain_product_sku_id:e.options.bargain_product_sku_id,bargain_task_id:e.options.bargain_task_id}),t=JSON.stringify(t)),"assemble"===e.options.order_type&&(s="plus.assemble.order/buy",t=Object.assign(t,{assemble_product_id:e.options.assemble_product_id,product_sku_id:e.options.product_sku_id,assemble_product_sku_id:e.options.assemble_product_sku_id,assemble_bill_id:e.options.assemble_bill_id,product_num:e.options.product_num}),t=JSON.stringify(t));let o=function(){e._post(s,{params:t},(function(t){let s="",o="";"deposit"==e.options.order_type?o="/pages/order/cashier?order_type=50&order_id="+t.data.order_id:"retainage"==e.options.order_type?(s=t.data.order_id,o="/pages/order/cashier?order_type=10&order_id="+s):(s=encodeURIComponent(t.data.order_id.join(",")),o="/pages/order/cashier?order_type=10&order_id="+s),console.log(o),e.gotoPage(o,"reLaunch")}))};e.subMessage(e.temlIds,o)}else b({title:"请选择配送地址"})}}},[["render",function(e,c,n,f,h,k){const b=x("Myinfo"),D=l,O=L,S=r,C=A,j=w,P=g,N=x("Coupon"),J=x("Dist");return h.loading?m("",!0):(t(),s(D,{key:0,class:y(["wrap",e.theme()||""]),"data-theme":e.theme()},{default:o((()=>[a(b,{dis:"retainage"==h.options.order_type,Address:h.Address,exist_address:h.exist_address},null,8,["dis","Address","exist_address"]),a(D,{class:"vender"},{default:o((()=>[a(D,{class:"list"},{default:o((()=>[(t(!0),_(p,null,u(h.ProductData,((r,l)=>(t(),s(D,{key:l},{default:o((()=>[h.store_open?(t(),s(D,{key:0,class:"sup_itemtit"},{default:o((()=>[v("i",{class:"icon iconfont icon-dianpu1"}),a(D,{class:"f26 gray3"},{default:o((()=>[d(i(r.supplier.name),1)])),_:2},1024)])),_:2},1024)):m("",!0),(t(!0),_(p,null,u(r.productList,((e,r)=>(t(),s(D,{class:"item",key:r},{default:o((()=>[a(D,{class:"d-f"},{default:o((()=>[a(D,{class:"cover"},{default:o((()=>[a(O,{src:e.product_image,mode:"aspectFit"},null,8,["src"])])),_:2},1024),a(D,{class:"info"},{default:o((()=>[a(D,{class:"d-b-s"},{default:o((()=>[a(D,{class:"flex-1"},{default:o((()=>[a(D,{class:"title f32 gray3"},{default:o((()=>[d(i(e.product_name),1)])),_:2},1024),a(D,{class:"theme-price mt10 f18"},{default:o((()=>[d(" ¥"),a(S,{class:"f26"},{default:o((()=>[d(i(e.product_price),1)])),_:2},1024)])),_:2},1024),"deposit"==h.options.order_type?(t(),s(D,{key:0,class:"describe mt10 f24"},{default:o((()=>[d(i(e.advance_sku.product_attr),1)])),_:2},1024)):"retainage"==h.options.order_type?(t(),s(D,{key:1,class:"describe mt10 f24"},{default:o((()=>[d(i(e.product_attr),1)])),_:2},1024)):(t(),s(D,{key:2,class:"describe mt10 f24"},{default:o((()=>[d(i(e.product_sku.product_attr),1)])),_:2},1024))])),_:2},1024),a(D,null,{default:o((()=>[a(D,{class:"count_choose"},{default:o((()=>[a(D,{class:"num-wrap"},{default:o((()=>[a(D,{class:"f22 tr"},{default:o((()=>[d("×"+i(e.total_num),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),1==e.is_user_grade?(t(),s(D,{key:0,class:"mt10 tr f28"},{default:o((()=>[a(S,{class:"f26"},{default:o((()=>[d("会员折扣价：")])),_:1}),a(S,{class:"theme-price f32"},{default:o((()=>[d("￥"+i(e.grade_product_price),1)])),_:2},1024)])),_:2},1024)):m("",!0),e.product_reduce_money>0?(t(),s(D,{key:1,class:"mt10 tr f28"},{default:o((()=>[a(S,{class:"f26"},{default:o((()=>[d("立减：")])),_:1}),a(S,{class:"theme-price f32"},{default:o((()=>[d("￥"+i(e.product_reduce_money),1)])),_:2},1024)])),_:2},1024)):m("",!0)])),_:2},1024)))),128)),a(D,{class:"d-f-c",onClick:e=>k.DistUp(r)},{default:o((()=>[10==r.orderData.delivery?(t(),s(D,{key:0},{default:o((()=>[d(" 配送方式 "),a(S,{class:"extp"},{default:o((()=>[d("普通快递")])),_:1})])),_:1})):m("",!0),20==r.orderData.delivery?(t(),s(D,{key:1},{default:o((()=>[a(D,{class:"info d-s-s",style:{"padding-left":"0"}},{default:o((()=>[a(S,{class:"zt theme-btn"},{default:o((()=>[d("当前自提点")])),_:1}),a(D,{class:"province-c-a d-s-s flex-1"},{default:o((()=>[a(S,null,{default:o((()=>[d(i(h.store_list[r.shop_supplier_id]),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)):m("",!0),30==r.orderData.delivery?(t(),s(D,{key:2},{default:o((()=>[d(" 虚拟商品：无需物流 ")])),_:1})):m("",!0),30!=r.orderData.delivery?(t(),s(D,{key:3,class:"dfjac"},{default:o((()=>[10==r.orderData.delivery?(t(),s(D,{key:0},{default:o((()=>[d(i(0!=r.orderData.express_price?"￥ "+r.orderData.express_price:"快递 免费"),1)])),_:2},1024)):m("",!0),v("i",{class:"iconfont icon-jiantou"})])),_:2},1024)):m("",!0)])),_:2},1032,["onClick"]),"deposit"==h.options.order_type?(t(),_(p,{key:1},[a(D,{class:"d-f-c"},{default:o((()=>[a(S,{class:"key f26"},{default:o((()=>[d("定金：")])),_:1}),a(D,{class:"f24"},{default:o((()=>[d("￥"+i(h.OrderData.order_total_front_price),1)])),_:1})])),_:1}),a(D,{class:"d-f-c"},{default:o((()=>[a(S,{class:"key f26"},{default:o((()=>[d("尾款：")])),_:1}),a(D,{class:"f24"},{default:o((()=>[d(" ￥"+i(h.OrderData.order_total_pay_price),1)])),_:1})])),_:1}),a(D,{class:"f-d-c p30"},{default:o((()=>[a(D,{class:"ww100 d-e-c red"},{default:o((()=>[d("(单件商品尾款已减"+i(h.OrderData.reduce_money)+"元) ",1)])),_:1}),a(D,{class:"ww100 d-e-c gray9"},{default:o((()=>[d(i(r.productList[0].advance.active_time[0])+"-"+i(r.productList[0].advance.active_time[1])+"支付尾款 ",1)])),_:2},1024)])),_:2},1024)],64)):(t(),_(p,{key:2},[h.OrderData.force_points?m("",!0):(t(),s(D,{key:0,class:"d-f-c"},{default:o((()=>[a(D,{class:""},{default:o((()=>[d("优惠券")])),_:1}),k.objKeys(r.orderData.couponList,1)>0?(t(),_(p,{key:0},[r.orderData.coupon_money>0?(t(),s(S,{key:0,class:"vlaue theme-price",onClick:e=>k.onTogglePopupCoupon(r.orderData.couponList,r)},{default:o((()=>[d("-￥"+i(r.orderData.coupon_money),1)])),_:2},1032,["onClick"])):(t(),s(S,{key:1,class:"vlaue theme-price",onClick:e=>k.onTogglePopupCoupon(r.orderData.couponList,r)},{default:o((()=>[d("有"+i(k.objKeys(r.orderData.couponList,1))+"张优惠券可用",1),v("i",{class:"iconfont icon-jiantou"})])),_:2},1032,["onClick"]))],64)):(t(),s(S,{key:1,class:"f24 gray9"},{default:o((()=>[d("无优惠券可用")])),_:1}))])),_:2},1024)),r.orderData.reduce?(t(),s(D,{key:1,class:"d-f-c"},{default:o((()=>[a(D,null,{default:o((()=>[d("商户"+i(r.orderData.reduce.active_name),1)])),_:2},1024),a(D,{class:"theme-price f24"},{default:o((()=>[d(" -￥"+i(r.orderData.reduce.reduced_price),1)])),_:2},1024)])),_:2},1024)):m("",!0),r.orderData.reduce_money?(t(),s(D,{key:2,class:"d-f-c"},{default:o((()=>[a(D,null,{default:o((()=>[d("尾款抵扣:")])),_:1}),a(D,{class:"theme-price f24"},{default:o((()=>[d(" -￥"+i(r.orderData.reduce_money),1)])),_:2},1024)])),_:2},1024)):m("",!0),1==h.is_use_points&&!h.OrderData.force_points&&r.orderData.points_money>0?(t(),s(D,{key:3},{default:o((()=>[a(D,{class:"d-f-c"},{default:o((()=>[a(D,null,{default:o((()=>[d(i(e.points_name())+"抵扣金额",1)])),_:1}),a(D,{class:"theme-price f24"},{default:o((()=>[d("-￥"+i(r.orderData.points_money),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)):m("",!0),a(D,{class:"d-f-c"},{default:o((()=>[a(D,{class:"ww100"},{default:o((()=>[a(D,{class:"mb20"},{default:o((()=>[d("订单备注")])),_:1}),a(D,{class:"ww100"},{default:o((()=>[a(C,{modelValue:h.store_data[r.shop_supplier_id].remark,"onUpdate:modelValue":e=>h.store_data[r.shop_supplier_id].remark=e,placeholder:"选填,请先和商家协商一致",class:"text_area"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1024)])),_:2},1024),a(D,{class:"total-box vthl"},{default:o((()=>[a(D,null,{default:o((()=>[a(S,{class:"f26 gray3"},{default:o((()=>[d("共"+i(r.productList.length)+"件商品,总价:",1)])),_:2},1024),a(S,{class:"f20 gray3"},{default:o((()=>[d("￥")])),_:1}),a(S,{class:"f26 gray3"},{default:o((()=>[d(i(r.orderData.order_total_price),1)])),_:2},1024)])),_:2},1024),a(D,{class:"d-f"},{default:o((()=>[h.OrderData.force_points?m("",!0):(t(),s(D,{key:0,class:"f26"},{default:o((()=>[d(" 实付款："),a(S,{class:"theme-price f20"},{default:o((()=>[d("￥")])),_:1}),a(S,{class:"price theme-price",style:{"font-size":"32rpx"}},{default:o((()=>[d(i(k.toDecimal2(r.orderData.order_pay_price)),1)])),_:2},1024)])),_:2},1024))])),_:2},1024)])),_:2},1024)],64))])),_:2},1024)))),128))])),_:1})])),_:1}),"deposit"!=h.options.order_type?(t(),s(D,{key:0,class:"buy-checkout"},{default:o((()=>[a(D,{class:"item"},{default:o((()=>[a(S,{class:"key f26"},{default:o((()=>[d("订单总金额：")])),_:1}),a(D,null,{default:o((()=>[a(S,{class:"theme-price f24"},{default:o((()=>[d("￥"+i(h.OrderData.order_total_price),1)])),_:1})])),_:1})])),_:1}),h.OrderData.is_coupon?(t(),s(D,{key:0,class:"item f26"},{default:o((()=>[a(S,{class:"key"},{default:o((()=>[d("平台优惠券：")])),_:1}),h.coupon_num>0?(t(),_(p,{key:0},[h.OrderData.coupon_money_sys>0?(t(),s(S,{key:0,class:"f24 theme-price",onClick:c[0]||(c[0]=e=>k.onTogglePopupCoupon(h.coupon_list,0))},{default:o((()=>[d("-￥"+i(h.OrderData.coupon_money_sys),1)])),_:1})):(t(),s(S,{key:1,class:"f24 theme-price",onClick:c[1]||(c[1]=e=>k.onTogglePopupCoupon(h.coupon_list,0))},{default:o((()=>[d("有"+i(h.coupon_num)+"张优惠券可用",1)])),_:1}))],64)):(t(),s(S,{key:1,class:"f24 gray9"},{default:o((()=>[d("无优惠券可用")])),_:1}))])),_:1})):m("",!0),h.OrderData.product_reduce_money>0?(t(),s(D,{key:1,class:"item"},{default:o((()=>[a(S,{class:"key"},{default:o((()=>[d("商品立减：")])),_:1}),a(D,null,{default:o((()=>[a(S,{class:"theme-price f24"},{default:o((()=>[d("-￥"+i(h.OrderData.product_reduce_money),1)])),_:1})])),_:1})])),_:1})):m("",!0),h.OrderData.reduce_money?(t(),s(D,{key:2,class:"item"},{default:o((()=>[a(S,{class:"key"},{default:o((()=>[d("尾款抵扣：")])),_:1}),a(D,null,{default:o((()=>[a(S,{class:"theme-price f24"},{default:o((()=>[d("-￥"+i(h.OrderData.reduce_money),1)])),_:1})])),_:1})])),_:1})):m("",!0),h.OrderData.is_allow_points&&0==h.OrderData.force_points&&0!=h.OrderData.points_money?(t(),s(D,{key:3,class:"item"},{default:o((()=>[a(S,{class:"key"},{default:o((()=>[d("可用"+i(e.points_name())+"抵扣：",1)])),_:1}),a(D,{class:""},{default:o((()=>[a(S,{class:"theme-price f24"},{default:o((()=>[d("-￥"+i(k.toDecimal2(h.OrderData.points_money)),1)])),_:1}),a(j,{style:{transform:"scale(0.7)","margin-right":"-10rpx"},checked:"true",onChange:k.onShowPoints},null,8,["onChange"])])),_:1})])),_:1})):m("",!0)])),_:1})):m("",!0),a(D,{class:"foot-pay-btns"},{default:o((()=>["deposit"==h.options.order_type?(t(),s(D,{key:0},{default:o((()=>[d(" 应付 "),a(S,{class:"fb theme-price"},{default:o((()=>[d("¥")])),_:1}),a(S,{class:"num theme-price fb f38"},{default:o((()=>[d(i(h.OrderData.order_total_front_price),1)])),_:1})])),_:1})):(t(),_(p,{key:1},[h.OrderData.force_points?m("",!0):(t(),s(D,{key:0,class:"price"},{default:o((()=>[d(" ¥ "),a(S,{class:"num"},{default:o((()=>[d(i(h.OrderData.order_pay_price),1)])),_:1})])),_:1})),h.OrderData.force_points?(t(),s(D,{key:1,class:"price"},{default:o((()=>[a(S,{class:"gray9"},{default:o((()=>[d("所需"+i(e.points_name()),1)])),_:1}),a(S,{class:"num theme-price fb"},{default:o((()=>[d(i(h.ProductData[0].orderData.points_num),1)])),_:1})])),_:1})):m("",!0)],64)),a(P,{type:"primary",onClick:k.SubmitOrder},{default:o((()=>[d("提交订单")])),_:1},8,["onClick"])])),_:1}),a(N,{isCoupon:h.isCoupon,couponList:h.couponList,onClose:k.closeCouponFunc},null,8,["isCoupon","couponList","onClose"]),a(J,{isDist:h.isDist,chooseSotr:h.chooseSotr,onClose:k.closeDistFunc,extract_store:h.extract_store,last_extract:h.last_extract,deliverySetting:h.deliverySetting},null,8,["isDist","chooseSotr","onClose","extract_store","last_extract","deliverySetting"])])),_:1},8,["data-theme","class"]))}],["__scopeId","data-v-3b6aa7fb"]]);export{j as default};
