import{E as e,d as l,e as t,l as a,m as i,c as s,f as o,o as d,v as n}from"./element-plus-78c440b2.js";import{f as m,s as p}from"./message-c45b332b.js";import{_ as r}from"./index-0e3e5afc.js";import{n as c,o as u,T as g,S as _,P as f,a as h,$ as j,X as b,W as v}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const w={data:()=>({formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1,fieldList:[],title:"设置公众号消息模板",checkList:[],settings:{},template_id:""}),props:["open_mp","messageModel"],mounted(){this.$nextTick((function(){this.initChecked()})),this.dialogVisible=this.open_mp,this.title=this.title+"("+this.messageModel.message_name+")",this.getData()},methods:{getData(){let e=this;e.loading=!0,m({message_id:e.messageModel.message_id,message_type:"mp"}).then((l=>{l.data.list.forEach((function(e){e.field_new_ename=e.field_ename,e.filed_new_value=e.filed_value})),e.fieldList=l.data.list,null==l.data.settings||0==l.data.settings.length?(e.settings={},e.template_id=""):(e.settings=l.data.settings,e.template_id=l.data.settings.template_id),e.loading=!1,c((()=>{e.initChecked()}))})).catch((e=>{}))},saveTemplate(){let l=this;l.loading=!0,p({fieldList:l.checkList,message_id:l.messageModel.message_id,message_type:"mp",template_id:l.template_id}).then((t=>{l.loading=!1,e({message:"保存成功",type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{l.loading=!1}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},handleSelectionChange(e){this.checkList=e},initChecked(){let e=this;"{}"!=JSON.stringify(e.settings)&&Object.keys(e.settings.var_data).forEach((function(l){e.fieldList.forEach((function(t){t.field_ename==l&&(e.$refs.fieldTable.toggleRowSelection(t,!0),t.field_new_ename=e.settings.var_data[l].field_name,t.filed_new_value=e.settings.var_data[l].filed_value)}))}))}}},V={class:"table-wrap"},C=h("div",{class:"operation-wrap"},[h("p",null,"配置说明："),h("p",null,"1、公众号模板里有的字段才勾选，如果没有请勿勾选。"),h("p",null,"2、模板变量替换成公众号模板里的字段。")],-1),k=["textContent"],y={slot:"footer",class:"dialog-footer"};const x=r(w,[["render",function(e,m,p,r,c,w){const x=l,L=t,S=a,D=i,T=s,U=o,z=d,$=n;return u(),g(z,{title:c.title,modelValue:c.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>c.dialogVisible=e),onClose:w.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{default:_((()=>[f(T,{size:"small"},{default:_((()=>[h("div",V,[C,h("div",null,[f(L,{label:"模板id："},{default:_((()=>[f(x,{size:"small",class:"max-w460",modelValue:c.template_id,"onUpdate:modelValue":m[0]||(m[0]=e=>c.template_id=e),placeholder:"请填写申请的公众号模板消息id"},null,8,["modelValue"])])),_:1})]),j((u(),g(D,{border:"",ref:"fieldTable",data:c.fieldList,onSelectionChange:w.handleSelectionChange},{default:_((()=>[f(S,{type:"selection",width:"55"}),f(S,{label:"字段名称"},{default:_((e=>[h("label",{textContent:b(e.row.field_name)},null,8,k)])),_:1}),f(S,{label:"模板变量名"},{default:_((e=>[f(x,{size:"small",prop:"field_new_ename",modelValue:e.row.field_new_ename,"onUpdate:modelValue":l=>e.row.field_new_ename=l},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),f(S,{label:"模板内容"},{default:_((e=>[f(x,{size:"small",prop:"filed_new_value",disabled:1===e.row.is_var,modelValue:e.row.filed_new_value,"onUpdate:modelValue":l=>e.row.filed_new_value=l},null,8,["disabled","modelValue","onUpdate:modelValue"])])),_:1})])),_:1},8,["data","onSelectionChange"])),[[$,c.loading]])])])),_:1}),h("div",y,[f(U,{onClick:w.dialogFormVisible},{default:_((()=>[v("取 消")])),_:1},8,["onClick"]),f(U,{type:"primary",onClick:w.saveTemplate,loading:c.loading},{default:_((()=>[v("确 定")])),_:1},8,["onClick","loading"])])])),_:1},8,["title","modelValue","onClose"])}]]);export{x as default};
