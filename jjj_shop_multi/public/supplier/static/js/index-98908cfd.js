import{F as t,K as e,L as s,ae as i,o,c as a,$ as r,a0 as n,P as p}from"./@vue-fcfaff04.js";import{_ as u,u as m}from"./index-3957abef.js";import l from"./index-081941b1.js";import c from"./Receive-a24fb0ff.js";import h from"./SendCoupon-c5f53225.js";import"./vue-router-0cda4647.js";import"./pinia-234ab43f.js";import"./axios-63583d02.js";import"./element-plus-1d28f1d0.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-28c84072.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-6c014c7f.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-ueditor-wrap-33bac798.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";import"./coupon-eef4d6a0.js";import"./GetUser-3d7de25d.js";import"./data-72b673e3.js";const j=t({components:{List:l,Receive:c,SendCoupon:h},setup(){const{bus_emit:t,bus_off:i,bus_on:o}=m(),a=e({bus_emit:t,bus_off:i,bus_on:o,loading:!0,form:{},param:{},activeName:"",sourceList:[{key:"list",value:"优惠券列表",path:"/coupon/coupon/index"},{key:"receive",value:"领取记录",path:"/coupon/coupon/receive"},{key:"send",value:"发送优惠券",path:"/coupon/coupon/SendCoupon"}],tabList:[]});return{...s(a)}},mounted(){this.init()},beforeDestroy(){this.bus_emit("tabData",{active:null,tab_type:"coupon",list:[]}),this.bus_off("activeValue")},methods:{init(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),bus.$on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"coupon"};bus.$emit("tabData",t)},authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),v={class:"common-seach-wrap"};const b=u(j,[["render",function(t,e,s,u,m,l){const c=i("List"),h=i("Receive"),j=i("SendCoupon");return o(),a("div",v,[r(p(c,null,null,512),[[n,"list"==t.activeName]]),r(p(h,null,null,512),[[n,"receive"==t.activeName]]),r(p(j,null,null,512),[[n,"send"==t.activeName]])])}]]);export{b as default};
