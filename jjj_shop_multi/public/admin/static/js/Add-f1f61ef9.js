import{f as e,c as a,d as l,p as t,q as o,r as s,b as i,e as r,s as d}from"./element-plus-a75e5680.js";import{f as m}from"./access-c7fcb5a4.js";import{_ as n,d as u,f as p}from"./index-07143257.js";import{o as f,S as h,R as c,O as b,V as _,X as V,a as g}from"./@vue-5c89b57d.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-85afefd9.js";import"./dayjs-4d201c0d.js";import"./@element-plus-ef0dbc7a.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./request-8f5d2679.js";import"./axios-85bcd05e.js";import"./vue-router-2af8da50.js";import"./pinia-3964e703.js";import"./vue-demi-71ba0ef2.js";const D={data:()=>({loading:!1,formData:{name:"",path:"",views:"",alias:"",icon:"",is_menu:0,is_route:1,is_show:1,sort:1,parent_id:0},formRules:{name:[{required:!0,message:"请输入菜单名称",trigger:"blur"}],path:[{required:!0,message:"请输入路径",trigger:"blur"}],views:[{required:!0,message:"请输入组件名称",trigger:"blur"}],alias:[{required:!0,message:"请输入别名",trigger:"blur"}]},parentsVal:[],accessList:[],srot:"1",formLabelWidth:"120px",dialogVisible:!1,propsParam:{label:"name",value:"access_id",checkStrictly:!0}}),props:{open_add:Boolean,add_type:String,rawData:Array,selectModel:Object},created(){this.dialogVisible=this.open_add,this.accessList=u(this.rawData),this.accessList.unshift({name:"顶级菜单",access_id:0}),"copy"==this.add_type?(this.formData=p(this.formData,this.selectModel),this.findParentsID(this.accessList)):"child"==this.add_type&&(this.formData.parent_id=this.selectModel.access_id,this.findParentsID(this.accessList))},methods:{handleChange(e){},findParentsID(e){let a=!1;for(let l=0;l<e.length;l++){let t=e[l];if(t.access_id==this.formData.parent_id){this.parentsVal.unshift(t.access_id),a=!0;break}{let e=t.children;if(void 0!==e&&e.length>0&&this.findParentsID(e)){this.parentsVal.unshift(t.access_id),a=!0;break}}}return a},onSubmit(){let a=this,l=this.formData;a.parentsVal.length>0&&(l.parent_id=a.parentsVal[a.parentsVal.length-1]),a.$refs.form.validate((t=>{t&&(a.loading=!0,m(l).then((l=>{1==l.code&&(e({message:l.msg,type:"success"}),a.dialogFormVisible(!0),a.loading=!1)})).catch((e=>{a.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},w=g("p",null,"提示：对应前端给的文件路径，例如：/index/index",-1),j=g("p",null,"提示：请选择系统提供的图标",-1);const y=n(D,[["render",function(e,m,n,u,p,g){const D=a,y=l,L=t,k=o,U=s,W=i,v=r,C=d;return f(),h(C,{title:"添加菜单&权限",modelValue:p.dialogVisible,"onUpdate:modelValue":m[11]||(m[11]=e=>p.dialogVisible=e),onClose:g.dialogFormVisible},{footer:c((()=>[b(v,{onClick:g.dialogFormVisible},{default:c((()=>[_("取 消")])),_:1},8,["onClick"]),b(v,{type:"primary",onClick:m[10]||(m[10]=e=>g.onSubmit()),disabled:p.loading},{default:c((()=>[_("确 定")])),_:1},8,["disabled"])])),default:c((()=>[b(W,{size:"small",model:p.formData,rules:p.formRules,ref:"form"},{default:c((()=>[b(y,{label:"菜单名称",prop:"name","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.name,"onUpdate:modelValue":m[0]||(m[0]=e=>p.formData.name=e),autocomplete:"off",placeholder:"请输入菜单名称"},null,8,["modelValue"])])),_:1},8,["label-width"]),b(y,{label:"类型",prop:"name","label-width":p.formLabelWidth},{default:c((()=>[b(k,{modelValue:p.formData.is_route,"onUpdate:modelValue":m[1]||(m[1]=e=>p.formData.is_route=e)},{default:c((()=>[b(L,{label:1},{default:c((()=>[_("页面")])),_:1}),b(L,{label:0},{default:c((()=>[_("按钮")])),_:1}),b(L,{label:2},{default:c((()=>[_("独立单页面")])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label-width"]),b(y,{label:"上级菜单",prop:"parent_id","label-width":p.formLabelWidth},{default:c((()=>[b(U,{size:"small",modelValue:p.parentsVal,"onUpdate:modelValue":m[2]||(m[2]=e=>p.parentsVal=e),options:p.accessList,props:p.propsParam,onChange:g.handleChange},null,8,["modelValue","options","props","onChange"])])),_:1},8,["label-width"]),b(y,{label:"路径",prop:"path","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.path,"onUpdate:modelValue":m[3]||(m[3]=e=>p.formData.path=e),autocomplete:"off",placeholder:"请输入组件文件路径"},null,8,["modelValue"]),w])),_:1},8,["label-width"]),b(y,{label:"图标","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.icon,"onUpdate:modelValue":m[4]||(m[4]=e=>p.formData.icon=e),autocomplete:"off",placeholder:"请输入icon"},null,8,["modelValue"]),j])),_:1},8,["label-width"]),1==p.formData.is_route?(f(),h(y,{key:0,label:"是否是菜单","label-width":p.formLabelWidth},{default:c((()=>[b(k,{modelValue:p.formData.is_menu,"onUpdate:modelValue":m[5]||(m[5]=e=>p.formData.is_menu=e)},{default:c((()=>[b(L,{label:1},{default:c((()=>[_("是")])),_:1}),b(L,{label:0},{default:c((()=>[_("否")])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label-width"])):V("",!0),b(y,{label:"是否显示","label-width":p.formLabelWidth},{default:c((()=>[b(k,{modelValue:p.formData.is_show,"onUpdate:modelValue":m[6]||(m[6]=e=>p.formData.is_show=e)},{default:c((()=>[b(L,{label:1},{default:c((()=>[_("是")])),_:1}),b(L,{label:0},{default:c((()=>[_("否")])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label-width"]),1==p.formData.is_route?(f(),h(y,{key:1,label:"重定向","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.redirect_name,"onUpdate:modelValue":m[7]||(m[7]=e=>p.formData.redirect_name=e),autocomplete:"off",placeholder:"请输入重定向地址"},null,8,["modelValue"])])),_:1},8,["label-width"])):V("",!0),b(y,{label:"备注",prop:"sort","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.remark,"onUpdate:modelValue":m[8]||(m[8]=e=>p.formData.remark=e),placeholder:"请输入备注",type:"textarea"},null,8,["modelValue"])])),_:1},8,["label-width"]),b(y,{label:"排序",prop:"sort","label-width":p.formLabelWidth},{default:c((()=>[b(D,{modelValue:p.formData.sort,"onUpdate:modelValue":m[9]||(m[9]=e=>p.formData.sort=e),placeholder:"请输入排序",type:"number"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}]]);export{y as default};
