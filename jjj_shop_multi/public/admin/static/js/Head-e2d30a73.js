import{u as s,_ as e}from"./index-07143257.js";import{u as t}from"./vue-router-2af8da50.js";import{E as a,f as o}from"./element-plus-a75e5680.js";import{E as n,J as r,K as i,o as m,c as u,a as c,W as l}from"./@vue-5c89b57d.js";import"./pinia-3964e703.js";import"./vue-demi-71ba0ef2.js";import"./@element-plus-ef0dbc7a.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-85afefd9.js";import"./dayjs-4d201c0d.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const p=n({setup(){const e=t(),{userInfo:a,bus_on:o,afterLogout:n}=s(),m=r({menu_title:"首页",username:"",router:e});return o("MenuName",(s=>{m.menu_title=s})),m.username=a.userName||"",{...i(m),userInfo:a,afterLogout:n}},methods:{exit(){a.confirm("此操作将退出登录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.logout()})).catch((()=>{o({type:"info",message:"已取消退出"})}))},async logout(){await this.afterLogout(),this.router.push("/login")}}}),d={class:"common-header"},f={class:"breadcrumb"},j={class:"baseInfo-left-base"},h={class:"name"},v={class:"header-navbar"},b={class:"header-navbar-icon"},g=c("span",{class:"ml4 icon iconfont icon-geren9"},null,-1),x={class:"text ml4"},y=[c("span",{class:"icon iconfont icon-tuichu"},null,-1),c("span",{class:"text ml4"},"退出",-1)];const _=e(p,[["render",function(s,e,t,a,o,n){return m(),u("div",d,[c("div",f,[c("div",j,[c("span",h,l(s.menu_title),1)]),c("div",v,[c("div",b,[g,c("span",x,l(s.username)+"，欢迎您！",1)]),c("div",{class:"header-navbar-icon",onClick:e[0]||(e[0]=e=>s.exit())},y)])])])}]]);export{_ as default};
