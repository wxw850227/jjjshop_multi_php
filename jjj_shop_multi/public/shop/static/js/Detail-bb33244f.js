import{h as e,e as l,c as t,f as a,o}from"./element-plus-78c440b2.js";import{_ as i}from"./index-73113c1c.js";import{o as s,T as d,S as m,P as r,W as b,X as n}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const f=i({data:()=>({formLabelWidth:"140px",dialogVisible:!1}),props:["open","form"],created(){},watch:{open:function(e,l){e!=l&&e&&(this.dialogVisible=this.open)}},methods:{dialogFormVisible(e){this.$emit("close",{})}}},[["render",function(i,f,p,c,u,h){const j=e,_=l,w=t,x=a,g=o;return s(),d(g,{title:"详情",modelValue:u.dialogVisible,"onUpdate:modelValue":f[1]||(f[1]=e=>u.dialogVisible=e),onClose:h.dialogFormVisible,"close-on-press-escape":!1},{default:m((()=>[r(w,{size:"mini",model:p.form},{default:m((()=>[r(_,{label:"标题：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.title),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"id：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.opt_log_id),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"用户名：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.user_name),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"真实姓名：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.real_name),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"url：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.url),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"内容：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.content),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"ip：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.ip),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"agent：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.agent),1)])),_:1})])),_:1},8,["label-width"]),r(_,{label:"添加时间：","label-width":u.formLabelWidth},{default:m((()=>[r(j,{class:"item-content-box"},{default:m((()=>[b(n(p.form.create_time),1)])),_:1})])),_:1},8,["label-width"])])),_:1},8,["model"]),r(_,{slot:"footer",class:"dialog-footer"},{default:m((()=>[r(x,{size:"small",onClick:f[0]||(f[0]=e=>u.dialogVisible=!1)},{default:m((()=>[b("关闭")])),_:1})])),_:1})])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-c4b8ed66"]]);export{f as default};
