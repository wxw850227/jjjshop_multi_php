import{E as e,d as a,e as s,p as l,f as o,c as t,v as r}from"./element-plus-78c440b2.js";import{_ as i,c as d,e as m}from"./index-0e3e5afc.js";import{$ as c,o as n,c as p,P as u,S as f,a as h,W as _,bb as j,b9 as b}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const g={data:()=>({loading:!0,form:{access_id:[]},data:[],roleList:[],select_menu:[],defaultProps:{children:"children",label:"name"},role_id:0}),created(){this.role_id=this.$route.query.role_id,this.getData()},methods:{onSubmit(){let a=this,s=a.form;a.$refs.form.validate((l=>{l&&(a.loading=!0,d({role_id:a.role_id,params:JSON.stringify(s)}).then((s=>{a.loading=!1,e({message:"修改成功",type:"success"}),a.$router.push("/auth/role/index")})).catch((e=>{a.loading=!1})))}))},getData(){let e=this;m({role_id:e.role_id}).then((a=>{e.clearData(a.data.menu,a.data.select_menu),e.select_menu=a.data.select_menu,e.form=a.data.model,e.roleList=a.data.roleList,e.data=a.data.menu,0==e.form.parent_id&&(e.form.parent_id="0"),e.loading=!1})).catch((a=>{e.loading=!1}))},clearData(e,a){let s=0,l=e.length;for(let o=0;o<l;o++){let l=e[o];if(null!=l.children){if(!this.clearData(l.children,a)){let e=a.indexOf(l.access_id);e>=0&&a.splice(e,1)}}-1!=a.indexOf(l.access_id)&&s++}return!(s<l)},handleCheckChange(e,a){this.form.access_id=a.checkedKeys.concat(a.halfCheckedKeys)},cancelFunc(){this.$router.back(-1)}}},k=(e=>(j("data-v-c9adc7f0"),e=e(),b(),e))((()=>h("div",{class:"common-form"},"编辑角色",-1))),y={class:"common-button-wrapper"};const v=i(g,[["render",function(e,i,d,m,j,b){const g=a,v=s,x=l,C=o,V=t,w=r;return c((n(),p("div",null,[u(V,{size:"small",ref:"form",model:j.form,"label-width":"180px"},{default:f((()=>[k,u(v,{label:"角色名称：",prop:"role_name",rules:[{required:!0,message:" "}]},{default:f((()=>[u(g,{modelValue:j.form.role_name,"onUpdate:modelValue":i[0]||(i[0]=e=>j.form.role_name=e),placeholder:"请输入角色名称",class:"max-w460"},null,8,["modelValue"])])),_:1}),u(v,{label:"权限列表：",modelValue:j.form.access_id,"onUpdate:modelValue":i[1]||(i[1]=e=>j.form.access_id=e)},{default:f((()=>[u(x,{data:j.data,"show-checkbox":"","node-key":"access_id","default-expand-all":!0,"default-checked-keys":j.select_menu,props:j.defaultProps,onCheck:b.handleCheckChange},null,8,["data","default-checked-keys","props","onCheck"])])),_:1},8,["modelValue"]),u(v,{label:"排序："},{default:f((()=>[u(g,{type:"number",modelValue:j.form.sort,"onUpdate:modelValue":i[2]||(i[2]=e=>j.form.sort=e),placeholder:"请输入排序",class:"max-w460"},null,8,["modelValue"])])),_:1}),h("div",y,[u(C,{size:"small",type:"info",onClick:b.cancelFunc},{default:f((()=>[_("取消")])),_:1},8,["onClick"]),u(C,{type:"primary",size:"small",onClick:b.onSubmit,loading:j.loading},{default:f((()=>[_("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])),[[w,j.loading]])}],["__scopeId","data-v-c9adc7f0"]]);export{v as default};
