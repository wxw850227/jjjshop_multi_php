import{_ as e}from"./GetUser-52b22456.js";import{E as a,f as s,h as l,O as o,g as t,e as r,q as i,r as d,d as m,i as n,A as u,c as p}from"./element-plus-78c440b2.js";import{a as c,s as f}from"./store-feff53f6.js";import{_}from"./index-73113c1c.js";import{o as b,c as j,P as h,S as g,W as v,T as k,a as V,Y as y,Q as C,a9 as x,bb as w,b9 as U}from"./@vue-76da2f05.js";import"./data-6cf4a9eb.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const q={components:{GetUser:e},data:()=>({form:{user_id:"",sotre_id:"",status:1,real_name:"",mobile:""},user_info:{},open_add:!1,storeList:[],loading:!1}),created(){this.getTableList()},methods:{onSubmit(){let e=this,s=e.form;e.$refs.form.validate((l=>{l&&(e.loading=!0,c(s).then((s=>{e.loading=!1,1==s.code?(a({message:"恭喜你，店员添加成功",type:"success"}),e.$router.push("/store/clerk/index")):e.loading=!1})).catch((a=>{e.loading=!1})))}))},getTableList(){f("").then((e=>{this.storeList=e.data.list})).catch((e=>{}))},addClick(){this.open_add=!0},closeDialogFunc(e){e&&"error"!=e.type&&(this.user_info=e.params[0],this.form.user_id=e.params[0].user_id),this.open_add=!1},cancelFunc(){this.$router.back(-1)}}},L={class:"product-add"},z=(e=>(w("data-v-05b8b619"),e=e(),U(),e))((()=>V("div",{class:"common-form"},"添加店员",-1))),F=["src"],S={class:"common-button-wrapper"};const T=_(q,[["render",function(a,c,f,_,w,U){const q=s,T=l,$=o,D=t,G=r,P=i,A=d,E=m,I=n,O=u,Q=p,W=e;return b(),j("div",L,[h(Q,{size:"small",ref:"form",model:w.form,"label-width":"200px"},{default:g((()=>[z,h(G,{label:"选择用户"},{default:g((()=>[h(D,null,{default:g((()=>[h(q,{onClick:U.addClick,icon:"Plus"},{default:g((()=>[v("选择会员")])),_:1},8,["onClick"]),""!=w.form.user_id?(b(),k(T,{key:0,class:"img"},{default:g((()=>[V("img",{src:w.user_info.avatarUrl,width:"100",height:"100"},null,8,F)])),_:1})):y("",!0),h(T,null,{default:g((()=>[h($,{underline:!1,disabled:""},{default:g((()=>[v("选择后不可更改")])),_:1})])),_:1})])),_:1})])),_:1}),h(G,{label:"所属门店"},{default:g((()=>[h(A,{modelValue:w.form.store_id,"onUpdate:modelValue":c[0]||(c[0]=e=>w.form.store_id=e),placeholder:"请选择"},{default:g((()=>[(b(!0),j(C,null,x(w.storeList,((e,a)=>(b(),k(P,{key:a,label:e.store_name,value:e.store_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),h(T,null,{default:g((()=>[h($,{underline:!1,disabled:""},{default:g((()=>[v("选择后不可更改")])),_:1})])),_:1})])),_:1}),h(G,{label:"店员姓名",prop:"real_name",rules:[{required:!0,message:"请输入店员姓名"}]},{default:g((()=>[h(E,{class:"max-w460",modelValue:w.form.real_name,"onUpdate:modelValue":c[1]||(c[1]=e=>w.form.real_name=e),placeholder:"请输入店员姓名"},null,8,["modelValue"])])),_:1}),h(G,{label:"手机号",prop:"mobile",rules:[{required:!0,message:"请输入手机号"}]},{default:g((()=>[h(E,{class:"max-w460",modelValue:w.form.mobile,"onUpdate:modelValue":c[2]||(c[2]=e=>w.form.mobile=e),placeholder:"请输入手机号"},null,8,["modelValue"])])),_:1}),h(G,{label:"状态"},{default:g((()=>[h(O,{modelValue:w.form.status,"onUpdate:modelValue":c[3]||(c[3]=e=>w.form.status=e)},{default:g((()=>[h(I,{label:1},{default:g((()=>[v("启用")])),_:1}),h(I,{label:0},{default:g((()=>[v("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1}),V("div",S,[h(q,{size:"small",type:"info",onClick:U.cancelFunc},{default:g((()=>[v("取消")])),_:1},8,["onClick"]),h(q,{size:"small",type:"primary",onClick:U.onSubmit,loading:w.loading},{default:g((()=>[v("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),h(W,{is_open:w.open_add,onClose:U.closeDialogFunc},null,8,["is_open","onClose"])])}],["__scopeId","data-v-05b8b619"]]);export{T as default};
