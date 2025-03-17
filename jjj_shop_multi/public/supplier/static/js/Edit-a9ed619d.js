import{E as e,d as s,e as o,n as l,o as a,f as r,g as i,c as t,l as d,v as m}from"./element-plus-1d28f1d0.js";import{_ as p}from"./GetUser-3d7de25d.js";import{_ as n,j as u,k as c}from"./index-3957abef.js";import{o as _,T as f,S as g,$ as h,P as b,c as j,Q as V,a9 as w,W as y,a as v,Y as k}from"./@vue-fcfaff04.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-28c84072.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-6c014c7f.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./data-72b673e3.js";import"./vue-router-0cda4647.js";import"./pinia-234ab43f.js";import"./axios-63583d02.js";import"./vue-ueditor-wrap-33bac798.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";const C={key:0,class:"img"},U=["src"],q={slot:"footer",class:"dialog-footer"};const D=n({data:()=>({formLabelWidth:"120px",loading:!1,open_add:!1,dialogVisible:!1,form:{confirm_password:"",access_id:[],user_id:0,user:{avatarUrl:""}},access_id:[],roleList:[],formRules:{user_name:[{required:!0,message:" ",trigger:"blur"}],access_id:[{required:!0,message:" ",trigger:"blur"}],password:[{required:!0,message:" ",trigger:"blur"}],confirm_password:[{required:!0,message:" ",trigger:"blur"}],real_name:[{required:!0,message:" ",trigger:"blur"}]}}),props:["open","supplier_user_id"],watch:{open:function(e,s){e!=s&&(this.dialogVisible=this.open,this.getData())}},components:{GetUser:p},created(){},methods:{getData(){let e=this;u({supplier_user_id:this.supplier_user_id}).then((s=>{e.loading=!1,e.roleList=s.data.roleList;let o=s.data.info;o.access_id=s.data.role_arr,o.password="",e.form=o})).catch((s=>{e.loading=!1}))},onSubmit(){let s=this;s.loading=!0;let o=s.form;c(o).then((o=>{s.loading=!1,e({message:"恭喜你，修改成功",type:"success"}),s.dialogFormVisible(!0)})).catch((e=>{s.loading=!1}))},addClick(){this.open_add=!0},closeDialogFunc(e){e&&"error"!=e.type&&(this.form.user_id=e.params[0].user_id,this.form.user=e.params[0].user),this.open_add=!1},dialogFormVisible(e){e?this.$emit("close",{type:"success",openDialog:!1}):this.$emit("close",{type:"error",openDialog:!1})}}},[["render",function(e,n,u,c,D,L){const F=s,x=o,S=l,W=a,$=r,z=i,G=t,P=p,R=d,E=m;return _(),f(R,{title:"修改管理员",modelValue:D.dialogVisible,"onUpdate:modelValue":n[6]||(n[6]=e=>D.dialogVisible=e),onClose:L.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,"append-to-body":!0},{default:g((()=>[h((_(),f(G,{size:"small",ref:"form",model:D.form,rules:D.formRules,"label-width":D.formLabelWidth},{default:g((()=>[b(x,{label:"用户名",prop:"user_name"},{default:g((()=>[b(F,{modelValue:D.form.user_name,"onUpdate:modelValue":n[0]||(n[0]=e=>D.form.user_name=e),placeholder:"请输入用户名"},null,8,["modelValue"])])),_:1}),b(x,{label:"所属角色",prop:"access_id"},{default:g((()=>[b(W,{modelValue:D.form.access_id,"onUpdate:modelValue":n[1]||(n[1]=e=>D.form.access_id=e),multiple:!0},{default:g((()=>[(_(!0),j(V,null,w(D.roleList,(e=>(_(),f(S,{value:e.role_id,key:e.role_id,label:e.role_name_h1},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1}),b(x,{label:"绑定用户"},{default:g((()=>[b(z,null,{default:g((()=>[b($,{onClick:L.addClick,icon:"Plus"},{default:g((()=>[y("选择会员")])),_:1},8,["onClick"]),D.form.user_id>0?(_(),j("div",C,[v("img",{src:D.form.user.avatarUrl,width:"100",height:"100"},null,8,U)])):k("",!0)])),_:1})])),_:1}),b(x,{label:"登录密码",prop:"password"},{default:g((()=>[b(F,{modelValue:D.form.password,"onUpdate:modelValue":n[2]||(n[2]=e=>D.form.password=e),placeholder:"请输入登录密码",type:"password"},null,8,["modelValue"])])),_:1}),b(x,{label:"确认密码",prop:"confirm_password"},{default:g((()=>[b(F,{modelValue:D.form.confirm_password,"onUpdate:modelValue":n[3]||(n[3]=e=>D.form.confirm_password=e),placeholder:"请输入确认密码",type:"password"},null,8,["modelValue"])])),_:1}),b(x,{label:"姓名",prop:"real_name"},{default:g((()=>[b(F,{modelValue:D.form.real_name,"onUpdate:modelValue":n[4]||(n[4]=e=>D.form.real_name=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","label-width"])),[[E,D.loading]]),v("div",q,[b($,{onClick:n[5]||(n[5]=e=>D.dialogVisible=!1)},{default:g((()=>[y("取 消")])),_:1}),b($,{type:"primary",onClick:L.onSubmit,loading:D.loading},{default:g((()=>[y("确 定")])),_:1},8,["onClick","loading"])]),b(P,{is_open:D.open_add,onClose:L.closeDialogFunc},null,8,["is_open","onClose"])])),_:1},8,["modelValue","onClose"])}]]);export{D as default};
