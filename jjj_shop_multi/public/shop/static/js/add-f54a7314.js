import{E as e,d as l,e as a,q as s,r as o,f as r,c as t}from"./element-plus-78c440b2.js";import{v as m,w as i}from"./setting-0c10b359.js";import{_ as d}from"./index-73113c1c.js";import{o as p,c as u,P as n,S as _,Q as c,a9 as E,T as f,Y as N,a as j,W as U}from"./@vue-76da2f05.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const V={data:()=>({form:{printer_name:"",printer_type:"",sort:1,print_times:"",FEI_E_YUN:{USER:"",UKEY:"",SN:""},PRINT_CENTER:{deviceNo:"",key:""}},loading:!1,type:[]}),created(){this.getData()},methods:{getData(){m({}).then((e=>{this.type=e.data.printerType})).catch((e=>{}))},onSubmit(){let l=this,a=l.form;l.$refs.form.validate((s=>{s&&(l.loading=!0,i(a).then((a=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),l.$router.push("/setting/printer/index")})).catch((e=>{l.loading=!1})))}))}}},v={class:"product-add"},y=j("div",{class:"common-form"},"新增小票打印机",-1),b=j("div",{class:"tips"},"目前支持 飞鹅打印机、365云打印",-1),R={key:0},g=j("div",{class:"tips"},"飞鹅云后台注册用户名",-1),h=j("div",{class:"tips"},"飞鹅云后台登录生成的UKEY",-1),I=j("div",{class:"tips"}," 打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号 ",-1),T={key:1},Y=j("div",{class:"tips"},"同一订单，打印的次数",-1),x=j("div",{class:"tips"},"数字越小越靠前",-1),w={class:"common-button-wrapper"};const S=d(V,[["render",function(e,m,i,d,V,S){const F=l,k=a,q=s,C=o,P=r,K=t;return p(),u("div",v,[n(K,{size:"small",ref:"form",model:V.form,"label-width":"200px"},{default:_((()=>[y,n(k,{label:"打印机名称 ",prop:"printer_name",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.printer_name,"onUpdate:modelValue":m[0]||(m[0]=e=>V.form.printer_name=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),n(k,{label:"打印机类型 "},{default:_((()=>[n(C,{modelValue:V.form.printer_type,"onUpdate:modelValue":m[1]||(m[1]=e=>V.form.printer_type=e),placeholder:"请选择"},{default:_((()=>[(p(!0),u(c,null,E(V.type,((e,l)=>(p(),f(q,{key:l,label:e,value:l},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),b])),_:1}),"FEI_E_YUN"==V.form.printer_type?(p(),u("div",R,[n(k,{label:"USER",prop:"FEI_E_YUN.USER",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.FEI_E_YUN.USER,"onUpdate:modelValue":m[2]||(m[2]=e=>V.form.FEI_E_YUN.USER=e),class:"max-w460"},null,8,["modelValue"]),g])),_:1}),n(k,{label:"UKEY",prop:"FEI_E_YUN.UKEY",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.FEI_E_YUN.UKEY,"onUpdate:modelValue":m[3]||(m[3]=e=>V.form.FEI_E_YUN.UKEY=e),class:"max-w460"},null,8,["modelValue"]),h])),_:1}),n(k,{label:"打印机编号",prop:"FEI_E_YUN.SN",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.FEI_E_YUN.SN,"onUpdate:modelValue":m[4]||(m[4]=e=>V.form.FEI_E_YUN.SN=e),class:"max-w460"},null,8,["modelValue"]),I])),_:1})])):N("",!0),"PRINT_CENTER"==V.form.printer_type?(p(),u("div",T,[n(k,{label:"打印机编号 ",prop:"PRINT_CENTER.deviceNo",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.PRINT_CENTER.deviceNo,"onUpdate:modelValue":m[5]||(m[5]=e=>V.form.PRINT_CENTER.deviceNo=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),n(k,{label:"打印机秘钥",prop:"PRINT_CENTER.key",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.PRINT_CENTER.key,"onUpdate:modelValue":m[6]||(m[6]=e=>V.form.PRINT_CENTER.key=e),class:"max-w460"},null,8,["modelValue"])])),_:1})])):N("",!0),n(k,{label:"打印联数",prop:"print_times",rules:[{required:!0,message:" "}]},{default:_((()=>[n(F,{modelValue:V.form.print_times,"onUpdate:modelValue":m[7]||(m[7]=e=>V.form.print_times=e),type:"number",class:"max-w460"},null,8,["modelValue"]),Y])),_:1}),n(k,{label:"排序"},{default:_((()=>[n(F,{modelValue:V.form.sort,"onUpdate:modelValue":m[8]||(m[8]=e=>V.form.sort=e),type:"number",class:"max-w460"},null,8,["modelValue"]),x])),_:1}),j("div",w,[n(P,{type:"primary",onClick:S.onSubmit,loading:V.loading},{default:_((()=>[U("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{S as default};
