import{E as e,j as s,k as a,e as t,d as o,f as l,c as i}from"./element-plus-78c440b2.js";import{r,s as m}from"./setting-0c10b359.js";import{_ as d}from"./index-73113c1c.js";import{o as p,c as n,P as c,S as u,Q as j,a9 as f,T as h,W as y,X as _,a as g}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const b={data:()=>({loading:!1,form:{checkedCities:[],send_day:7},all_type:[{name:"个人中心",value:"10"}]}),created(){this.getParams()},methods:{getParams(){let e=this;r({}).then((s=>{let a=s.data.vars.values;e.form.checkedCities=a.area_type;for(let t=0;t<e.form.checkedCities.length;t++)e.form.checkedCities[t]=parseInt(e.form.checkedCities[t]);e.form.send_day=a.send_day,e.all_type=s.data.all_type,e.loading=!1})).catch((e=>{}))},onSubmit(){let s=this,a=this.form;s.loading=!0,m(a).then((a=>{s.loading=!1,e({message:"恭喜你，设置成功",type:"success"})})).catch((e=>{s.loading=!1}))}}},v={class:"pt30"},k={style:{width:"500px"}},C=g("template",{slot:"append"},[y(" 天不再提醒 ")],-1),x=g("p",{class:"gray"},"拒绝获取后多久再提示，设置为0则每次都要提醒",-1),V={class:"common-button-wrapper"};const w=d(b,[["render",function(e,r,m,d,b,w){const z=s,P=a,S=t,q=o,U=l,E=i;return p(),n("div",v,[c(E,{size:"small",ref:"form",model:b.form,"label-width":"200px"},{default:u((()=>[c(S,{label:"获取手机号"},{default:u((()=>[c(P,{modelValue:b.form.checkedCities,"onUpdate:modelValue":r[0]||(r[0]=e=>b.form.checkedCities=e)},{default:u((()=>[(p(!0),n(j,null,f(b.all_type,((e,s)=>(p(),h(z,{label:e.value,key:s},{default:u((()=>[y(_(e.name),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])),_:1}),c(S,{label:"拒绝后",prop:"send_day"},{default:u((()=>[g("div",k,[c(q,{placeholder:"请输入",modelValue:b.form.send_day,"onUpdate:modelValue":r[1]||(r[1]=e=>b.form.send_day=e),type:"number"},{default:u((()=>[C])),_:1},8,["modelValue"]),x])])),_:1}),g("div",V,[c(U,{size:"small",type:"primary",onClick:w.onSubmit,loading:b.loading},{default:u((()=>[y("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{w as default};
