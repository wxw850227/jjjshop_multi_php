import{E as e,d as l,e as s,f as a,i as t,A as i,g as o,c as r,v as m}from"./element-plus-78c440b2.js";import{_ as d}from"./Setlink-e64802a4.js";import{_ as n}from"./Upload-4b5e65e6.js";import{n as u,o as p}from"./page-7f4bcbd8.js";import{_ as c}from"./index-0e3e5afc.js";import{$ as f,o as _,c as g,P as h,S as j,a as k,W as y,T as b,Y as v,X as x}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./article-d609c59a.js";import"./product-edd059db.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const V={components:{Upload:n,Setlink:d},data:()=>({loading:!0,isupload:!1,is_linkset:!1,tips_Id:"",form:{ad_id:"",title:"",category_id:"",image_url:"",image:{},sort:1,status:"0"},rules:{title:[{required:!0,message:"请输入菜单名称",trigger:"blur"}],link_url:[{required:!0,message:"请选择链接地址",trigger:"blur"}]}}),created(){this.getDetail()},methods:{changeLink(){this.is_linkset=!0},closeLinkset(e){this.is_linkset=!1,null!=e&&(e.url.startsWith("/")?this.form.link_url=e.url:this.form.link_url="/"+e.url,this.form.name="链接到 "+e.type+" "+e.name,this.tips_Id="链接到 "+e.type+" "+e.name)},openUpload(){this.isupload=!0},returnImgsFunc(e){null!=e&&(this.form.image_url=e[0].file_path),this.isupload=!1},getDetail(){let e=this;const l=e.$route.query.menu_id;u({menu_id:l}).then((l=>{e.form=l.data.detail,e.tips_Id=l.data.detail.name,e.form.image||(e.form.image={}),e.loading=!1})).catch((e=>{}))},onSubmit(){let l=this,s=this.form;l.$refs.form.validate((a=>{a&&p(s).then((s=>{e({message:s.msg,type:"success"}),l.$router.push("/page/page/mymenu/index")})).catch((e=>{}))}))},cancelFunc(){this.$router.push({path:"/page/page/mymenu/index"})}}},w={class:"product-add pb50"},C=k("div",{class:"common-form"},"编辑菜单",-1),U=["src"],I=k("div",{style:{color:"red"}},"图标大小为:25*25",-1),q={class:"url-box flex-1"},S=k("span",null,null,-1),$={class:"tips",id:"tips",style:{color:"#000"}},z=k("div",{class:"url-box ml10",style:{float:"right"}},null,-1),D={class:"common-button-wrapper"};const F=c(V,[["render",function(e,u,p,c,V,F){const L=l,R=s,W=a,A=n,E=t,P=i,T=o,X=d,Y=r,B=m;return f((_(),g("div",w,[h(Y,{size:"small",model:V.form,ref:"form",rules:V.rules,"label-width":"100px"},{default:j((()=>[C,h(R,{label:"菜单名称",prop:"title"},{default:j((()=>[h(L,{modelValue:V.form.title,"onUpdate:modelValue":u[0]||(u[0]=e=>V.form.title=e),placeholder:"请输入广告标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),h(R,{label:"图标"},{default:j((()=>[k("div",null,[h(W,{type:"primary",onClick:F.openUpload},{default:j((()=>[y("上传图片")])),_:1},8,["onClick"]),k("img",{class:"mt10",src:V.form.image_url,width:"120",height:"120"},null,8,U),I,V.isupload?(_(),b(A,{key:0,isupload:V.isupload,onReturnImgs:F.returnImgsFunc},{default:j((()=>[y("上传图片")])),_:1},8,["isupload","onReturnImgs"])):v("",!0)])])),_:1}),h(R,{label:"状态"},{default:j((()=>[h(P,{modelValue:V.form.status,"onUpdate:modelValue":u[1]||(u[1]=e=>V.form.status=e)},{default:j((()=>[h(E,{label:1},{default:j((()=>[y("显示")])),_:1}),h(E,{label:0},{default:j((()=>[y("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1}),h(R,{label:"排序"},{default:j((()=>[h(L,{type:"number",modelValue:V.form.sort,"onUpdate:modelValue":u[2]||(u[2]=e=>V.form.sort=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),h(R,{label:"链接",prop:"link_url"},{default:j((()=>[h(T,null,{default:j((()=>[k("div",q,[h(L,{disabled:0==V.form.app_id,modelValue:V.form.link_url,"onUpdate:modelValue":u[3]||(u[3]=e=>V.form.link_url=e),type:"text",class:"max-w460 mr10",style:{width:"380px"}},null,8,["disabled","modelValue"]),h(W,{disabled:0==V.form.app_id,type:"primary",onClick:u[4]||(u[4]=e=>F.changeLink())},{default:j((()=>[y("选择链接"),S])),_:1},8,["disabled"]),k("div",$,x(V.tips_Id),1),h(L,{modelValue:V.form.name,"onUpdate:modelValue":u[5]||(u[5]=e=>V.form.name=e),type:"hidden",class:"max-w460"},null,8,["modelValue"])]),z])),_:1})])),_:1}),V.is_linkset?(_(),b(X,{key:0,is_linkset:V.is_linkset,onCloseDialog:F.closeLinkset},{default:j((()=>[y("选择链接")])),_:1},8,["is_linkset","onCloseDialog"])):v("",!0),k("div",D,[h(W,{size:"small",type:"info",onClick:F.cancelFunc,loading:V.loading},{default:j((()=>[y("取消")])),_:1},8,["onClick","loading"]),h(W,{size:"small",type:"primary",onClick:F.onSubmit,loading:V.loading},{default:j((()=>[y("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])),[[B,V.loading]])}]]);export{F as default};
