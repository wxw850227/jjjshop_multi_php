import{E as e,d as l,e as a,n as s,o,f as r,c as t}from"./element-plus-1d28f1d0.js";import{p as m,k as i}from"./setting-9ca83d13.js";import{_ as d}from"./index-3957abef.js";import{o as p,c as u,P as n,S as _,Q as c,a9 as E,T as f,Y as N,a as U,W as j}from"./@vue-fcfaff04.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-28c84072.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-6c014c7f.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-0cda4647.js";import"./pinia-234ab43f.js";import"./axios-63583d02.js";import"./vue-ueditor-wrap-33bac798.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";const V={data:()=>({form:{printer_name:"",printer_type:"",sort:1,print_times:"",FEI_E_YUN:{USER:"",UKEY:"",SN:""},PRINT_CENTER:{deviceNo:"",key:""}},loading:!1,type:[]}),created(){this.getData()},methods:{getData(){m({}).then((e=>{this.type=e.data.printerType})).catch((e=>{}))},onSubmit(){let l=this,a=l.form;l.$refs.form.validate((s=>{s&&(l.loading=!0,i(a).then((a=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),l.$router.push("/setting/printer/index")})).catch((e=>{l.loading=!1})))}))}}},v={class:"product-add"},y=U("div",{class:"common-form"},"新增小票打印机",-1),b=U("div",{class:"tips"},"目前支持 飞鹅打印机、365云打印",-1),g={key:0},R=U("div",{class:"tips"},"飞鹅云后台注册用户名",-1),h=U("div",{class:"tips"},"飞鹅云后台登录生成的UKEY",-1),I=U("div",{class:"tips"}," 打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号 ",-1),T={key:1},Y=U("div",{class:"tips"},"同一订单，打印的次数",-1),w=U("div",{class:"tips"},"数字越小越靠前",-1),x={class:"common-button-wrapper"};const S=d(V,[["render",function(e,m,i,d,V,S){const k=l,F=a,C=s,q=o,P=r,K=t;return p(),u("div",v,[n(K,{size:"small",ref:"form",model:V.form,"label-width":"200px"},{default:_((()=>[y,n(F,{label:"打印机名称 ",prop:"printer_name",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.printer_name,"onUpdate:modelValue":m[0]||(m[0]=e=>V.form.printer_name=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),n(F,{label:"打印机类型 "},{default:_((()=>[n(q,{modelValue:V.form.printer_type,"onUpdate:modelValue":m[1]||(m[1]=e=>V.form.printer_type=e),placeholder:"请选择"},{default:_((()=>[(p(!0),u(c,null,E(V.type,((e,l)=>(p(),f(C,{key:l,label:e,value:l},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),b])),_:1}),"FEI_E_YUN"==V.form.printer_type?(p(),u("div",g,[n(F,{label:"USER",prop:"FEI_E_YUN.USER",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.FEI_E_YUN.USER,"onUpdate:modelValue":m[2]||(m[2]=e=>V.form.FEI_E_YUN.USER=e),class:"max-w460"},null,8,["modelValue"]),R])),_:1}),n(F,{label:"UKEY",prop:"FEI_E_YUN.UKEY",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.FEI_E_YUN.UKEY,"onUpdate:modelValue":m[3]||(m[3]=e=>V.form.FEI_E_YUN.UKEY=e),class:"max-w460"},null,8,["modelValue"]),h])),_:1}),n(F,{label:"打印机编号",prop:"FEI_E_YUN.SN",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.FEI_E_YUN.SN,"onUpdate:modelValue":m[4]||(m[4]=e=>V.form.FEI_E_YUN.SN=e),class:"max-w460"},null,8,["modelValue"]),I])),_:1})])):N("",!0),"PRINT_CENTER"==V.form.printer_type?(p(),u("div",T,[n(F,{label:"打印机编号 ",prop:"PRINT_CENTER.deviceNo",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.PRINT_CENTER.deviceNo,"onUpdate:modelValue":m[5]||(m[5]=e=>V.form.PRINT_CENTER.deviceNo=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),n(F,{label:"打印机秘钥",prop:"PRINT_CENTER.key",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.PRINT_CENTER.key,"onUpdate:modelValue":m[6]||(m[6]=e=>V.form.PRINT_CENTER.key=e),class:"max-w460"},null,8,["modelValue"])])),_:1})])):N("",!0),n(F,{label:"打印联数",prop:"print_times",rules:[{required:!0,message:" "}]},{default:_((()=>[n(k,{modelValue:V.form.print_times,"onUpdate:modelValue":m[7]||(m[7]=e=>V.form.print_times=e),type:"number",class:"max-w460"},null,8,["modelValue"]),Y])),_:1}),n(F,{label:"排序"},{default:_((()=>[n(k,{modelValue:V.form.sort,"onUpdate:modelValue":m[8]||(m[8]=e=>V.form.sort=e),type:"number",class:"max-w460"},null,8,["modelValue"]),w])),_:1}),U("div",x,[n(P,{type:"primary",onClick:S.onSubmit,loading:V.loading},{default:_((()=>[j("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{S as default};
