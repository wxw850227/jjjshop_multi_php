import{u as e,_ as i}from"./index-0e3e5afc.js";import{b as s}from"./vue-router-590ae0e4.js";import{F as t,K as n,L as l,n as a,o as u,c as m,a as o,M as r,X as c,Q as p,a9 as h,Y as d}from"./@vue-76da2f05.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./element-plus-78c440b2.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const v=t({components:{},setup(i,{emit:t}){const{userInfo:u,bus_emit:m,menus:o,renderMenus:r}=e(),c=s(),p=n({route:c,munu_name:"首页",active_menu:null,active_child:0,menuList:r,shop_name:"",menus:o}),h=e=>{let i=e.path,s=null,n=null;if(p.menuList&&p.menuList.length>0){for(let e=0;e<p.menuList.length;e++){if(p.menuList[e].path==i){s=e;break}for(let t=0;t<p.menuList[e].children.length;t++)if(p.menuList[e].children[t].path==i){s=e,n=t;break}if(!s&&!n&&p.menuList[e].childrenList.includes(i)){s=e;break}}p.active_menu=s,p.active_child=n,t("selectMenu",s)}a((()=>{m("MenuName",e.meta&&e.meta.showMenuTitle||e.meta.title)}))};return h(c),{...l(p),userInfo:u,selectMenu:h,bus_emit:m}},mounted(){},methods:{choseMenu(e,i,s){if(1==e)this.active_menu=null,this.active_child=null,this.$router.push("/"),this.$emit("selectMenu",null),this.bus_emit("MenuName","首页");else if(2==e)this.active_menu=s,this.active_child=0,this.$router.push(i.redirect_name),this.bus_emit("MenuName",i.name),i.children&&this.$emit("selectMenu",!1);else if(3==e){let e=i.path;i.redirect_name&&(e=i.redirect_name),this.active_child=s,this.bus_emit("MenuName",i.name),this.$router.push(e)}}}}),j={class:"left-menu-wrapper"},_={class:"menu-wrapper"},f={class:"home-login"},b=[o("span",{class:"icon iconfont icon-tubiaozhizuomoban-"},null,-1)],k={class:"d-c-c"},M={class:"p-10-0 blue fb tc"},L={class:"nav-wrapper mt10"},y={class:"first-menu-content"},w={class:"nav-ul"},g=["onClick"],x={class:"item-box"},C={class:"child-menu-wrapper"},$={class:"child-menu right-animation"},N={key:0},z=["onClick"],I={class:"name"};const q=i(v,[["render",function(e,i,s,t,n,l){return u(),m("div",j,[o("div",_,[o("div",f,[o("div",{class:r(null!=e.active_menu?"home-icon":"home-icon router-link-active"),onClick:i[0]||(i[0]=i=>e.choseMenu(1,null,null))},b,2)]),o("div",k,[o("span",M,c(e.userInfo.shop_name||"三勾总店"),1)]),o("div",L,[o("div",y,[o("ul",w,[(u(!0),m(p,null,h(e.menuList,((i,s)=>(u(),m(p,{key:s},[1==i.is_menu?(u(),m("li",{key:0,class:r(e.active_menu==s?"menu-item router-link-active":"menu-item"),onClick:t=>e.choseMenu(2,i,s)},[o("div",x,[o("span",{class:r("icon iconfont menu-item-icon "+i.icon)},null,2),o("span",null,c(i.name),1)])],10,g)):d("",!0)],64)))),128))])])])]),o("div",C,[o("div",$,[null!=e.active_menu?(u(),m("ul",N,[(u(!0),m(p,null,h(e.menuList[e.active_menu].children,((i,s)=>(u(),m(p,{key:s},[1==i.is_menu?(u(),m("li",{key:0,class:r(e.active_child==s?"routre-link router-link-active":"router-link"),onClick:t=>e.choseMenu(3,i,s)},[o("span",I,c(i.name),1)],10,z)):d("",!0)],64)))),128))])):d("",!0)])])])}]]);export{q as default};
