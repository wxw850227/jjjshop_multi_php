import{v as s}from"./element-plus-78c440b2.js";import{i as t,_ as i}from"./index-0e3e5afc.js";import{ap as e,$ as a,o as l,c as o,Q as r,a9 as n,a as p,X as m,M as c}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const d={class:"plus-container"},h={class:"common-form"},u={class:"plus-list"},j=["onClick"],v={class:"card"},f={class:"ml10 r"};const g=i({data:()=>({loading:!0,listData:[],list:[]}),created(){this.getData()},methods:{getData(){let s=this;(async function(s){return t({url:"/shop/plus.plus/index",method:"post",data:s})})({}).then((t=>{s.loading=!1,s.listData=t.data.list})).catch((s=>{}))},buildTree(s,t){if(t)for(let i=0,e=s.length;i<e;i++){let t=s[i];for(let e=0,a=this.list.length;e<a;e++){let a=this.list[e];if(t.parent_id==a.plus_id){a.children.push(t),s.splice(i,1),i--;break}}}else for(let i=0;i<s.length;i++){let t=s[i];0==t.parent_id&&(t.children=[],this.list.push(t),s.splice(i,1),i--)}t||this.buildTree(s,!0)},hasIcon:s=>null!=s&&s.length>0?s:"icon-chajian1",gotoPath(s){let t=s.path;s.redirect_name&&(t=s.redirect_name),this.$router.push(t)}}},[["render",function(t,i,g,b,k,y){const x=e("auth"),_=s;return a((l(),o("div",d,[(l(!0),o(r,null,n(k.listData,((s,t)=>(l(),o("div",{key:t},[p("div",h,m(s.name),1),p("div",u,[(l(!0),o(r,null,n(s.children,((s,t)=>a((l(),o("div",{class:"item",key:t},[p("div",{class:"item-box",onClick:t=>y.gotoPath(s)},[p("div",v,[p("div",{class:c(["icon iconfont",y.hasIcon(s.icon)])},null,2),p("div",f,[p("h3",null,m(s.name),1),p("p",null,m(s.remark),1)])])],8,j)])),[[x,s.path]]))),128))])])))),128))])),[[_,k.loading]])}]]);export{g as default};
