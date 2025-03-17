import{a as s,E as e,t,u as a}from"./element-plus-78c440b2.js";import{u as i,_ as o}from"./index-0e3e5afc.js";import{u as n}from"./vue-router-590ae0e4.js";import r from"./UpdatePassword-8b938c57.js";import{F as p,K as u,z as l,L as c,ae as m,o as h,c as d,a as b,X as y,P as v,S as j,Q as _,a9 as f,T as g,Y as x}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const w=p({components:{UpdatePassword:r},setup(){const s=n(),{userInfo:e,bus_on:t,bus_emit:a,bus_off:o,afterLogout:r}=i(),p=u({menu_title:"菜单",tabList:[],activeValue:0,is_password:!1,tab_type:""});return t("MenuName",(s=>{p.menu_title=s})),t("tabData",(s=>{p.tabList=s.list,p.activeValue=s.active,p.tab_type=s.tab_type})),t("activeValue",(s=>{s&&s.params?p.activeValue=s.params:p.activeValue=s})),t("noTarget",(s=>{p.activeValue=s})),a("headLoad",!0),l((()=>{o("menuName"),o("tabData")})),{...c(p),userInfo:e,afterLogout:r,router:s,bus_emit:a}},methods:{exit(){s.confirm("此操作将退出登录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.logout()})).catch((()=>{e({type:"info",message:"已取消退出"})}))},async logout(){await this.afterLogout(),this.router.push("/login")},tabClick(s){let e=s.props;"live"==this.tab_type&&this.router.push({path:"/plus/live/index",query:{type:e.name}}),"agent"==this.tab_type&&this.router.push({path:"/plus/agent/index",query:{type:e.name}}),"coupon"==this.tab_type&&this.router.push({path:"/plus/coupon/index",query:{type:e.name}}),"points"==this.tab_type&&this.router.push({path:"/plus/points/index",query:{type:e.name}}),"seckill"==this.tab_type&&this.router.push({path:"/plus/seckill/index",query:{type:e.name}}),"assemble"==this.tab_type&&this.router.push({path:"/plus/assemble/index",query:{type:e.name}}),"bargain"==this.tab_type&&this.router.push({path:"/plus/bargain/index",query:{type:e.name}}),"store"==this.tab_type&&this.router.push({path:"/store/index",query:{type:e.name}}),"appopen"==this.tab_type&&this.router.push({path:"/appsetting/appopen/event",query:{type:e.name}}),this.activeValue=e.name,this.bus_emit("activeValue",e.name)},passwordFunc(){this.is_password=!0},closeFunc(){this.is_password=!1}}}),k={class:"common-header"},q={class:"breadcrumb"},V={class:"baseInfo-left-base d-s-c"},C={class:"name"},L={class:"el-tabs-container"},T={class:"header-navbar"},F={class:"header-navbar-icon"},I={class:"gray"},P={class:"header-navbar-icon"},U=b("span",{class:"ml4 icon iconfont icon-geren9"},null,-1),z={class:"text ml4 blue"},B=b("div",{class:"header-navbar-icon"},[b("span",{class:"gray"},"|")],-1),D=[b("span",{class:"text"},"修改密码",-1)],N=[b("span",{class:"icon iconfont icon-tuichu"},null,-1),b("span",{class:"text ml4"},"退出",-1)];const E=o(w,[["render",function(s,e,i,o,n,r){const p=t,u=a,l=m("UpdatePassword");return h(),d("div",k,[b("div",q,[b("div",V,[b("span",C,y(s.menu_title),1),b("div",L,[v(u,{"model-value":s.activeValue,onTabClick:s.tabClick},{default:j((()=>[(h(!0),d(_,null,f(s.tabList,((s,e)=>(h(),g(p,{label:s.value,name:s.key,key:e},null,8,["label","name"])))),128))])),_:1},8,["model-value","onTabClick"])])]),b("div",T,[b("div",F,[b("span",I,"当前版本："+y(s.userInfo.version),1)]),b("div",P,[U,b("span",z,y(s.userInfo.username)+"，欢迎您！",1)]),B,b("div",{class:"header-navbar-icon",onClick:e[0]||(e[0]=e=>s.passwordFunc())},D),b("div",{class:"header-navbar-icon login-out",onClick:e[1]||(e[1]=e=>s.exit())},N)])]),s.is_password?(h(),g(l,{key:0,onClose:s.closeFunc},null,8,["onClose"])):x("",!0)])}]]);export{E as default};
