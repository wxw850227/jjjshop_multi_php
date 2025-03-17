import{E as e,a as l,F as o,y as a,d as s,f as t,h as p,l as d,e as r,m}from"./element-plus-78c440b2.js";import{l as i,m as c}from"./product-b0159307.js";import{ae as n,o as u,c as _,a as f,Q as h,a9 as g,X as y,P as b,S as V,W as w,Y as k,$ as v,a0 as j,bb as G,b9 as x,ap as F,T as D}from"./@vue-76da2f05.js";import{_ as A}from"./index-73113c1c.js";import{_ as U}from"./Upload-b330ad48.js";import"./@vueuse-90d34f35.js";import"./lodash-es-3f297d7c.js";import"./async-validator-cf877c1f.js";import"./dayjs-13b7e569.js";import"./call-bind-6a1b7bd0.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9f5f6982.js";import"./@popperjs-b78c3215.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-590ae0e4.js";import"./pinia-58dabe83.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd890801.js";import"./qs-74887072.js";import"./side-channel-9348fcaa.js";import"./object-inspect-c71aff05.js";const z={data:()=>({showAddGroupBtn:!0,showAddGroupForm:!1,addGroupFrom:{specName:"",specValue:""},groupLoading:!1}),inject:["form"],created(){this.form.model.spec_many&&this.form.model.spec_many.spec_list.length>0&&this.buildSkulist()},methods:{onToggleAddGroupForm:function(){this.showAddGroupBtn=!this.showAddGroupBtn,this.showAddGroupForm=!this.showAddGroupForm},onSubmitAddGroup:function(){let l=this;if(""===l.addGroupFrom.specName||""===l.addGroupFrom.specValue)return e("请填写规则名或规则值"),!1;l.groupLoading=!0;let o={spec_name:l.addGroupFrom.specName,spec_value:l.addGroupFrom.specValue};i(o).then((e=>{l.groupLoading=!1,l.form.model.spec_many||(l.form.model.spec_many={spec_many:[],spec_attr:[]}),l.form.model.spec_many.spec_attr.push({group_id:e.data.spec_id,group_name:l.addGroupFrom.specName,spec_items:[{item_id:e.data.spec_value_id,spec_value:l.addGroupFrom.specValue}],tempValue:"",loading:!1}),l.addGroupFrom.specName="",l.addGroupFrom.specValue="",l.onToggleAddGroupForm(),l.buildSkulist()})).catch((()=>{l.groupLoading=!1}))},onSubmitAddValue:function(l){let o=this;if(!l.hasOwnProperty("tempValue")||""===l.tempValue)return e("规格值不能为空"),!1;l.loading=!0;let a={spec_id:l.group_id,spec_value:l.tempValue};c(a).then((e=>{l.loading=!1,l.spec_items.push({item_id:e.data.spec_value_id,spec_value:l.tempValue}),l.tempValue="",o.buildSkulist()})).catch((()=>{l.loading=!1}))},buildSkulist:function(){let e=this;e.form.model.spec_many||(e.form.model.spec_many={spec_attr:[]});let l=e.form.model.spec_many.spec_attr,o=[];for(let t=0;t<l.length;t++)o.push(l[t].spec_items);let a=e.calcDescartes(o),s=[];for(let t=0;t<a.length;t++){let e=[],l=[];Array.isArray(a[t])?e=a[t]:e.push(a[t]);for(let o=0;o<e.length;o++)l.push(e[o].item_id);s.push({product_sku_id:0,spec_sku_id:l.join("_"),rows:e,spec_form:{}})}if(e.form.model.spec_many.spec_list&&e.form.model.spec_many.spec_list.length>0&&s.length>0)for(let t=0;t<s.length;t++){let l=e.form.model.spec_many.spec_list.filter((function(e){return e.spec_sku_id===s[t].spec_sku_id}));l.length>0&&(s[t].spec_form=l[0].spec_form,s[t].product_sku_id=l[0].product_sku_id)}e.form.model.spec_many.spec_list=s},calcDescartes:function(e){return e.length<2?e[0]||[]:[].reduce.call(e,(function(e,l){let o=[];return e.forEach((function(e){l.forEach((function(l){let a=[].concat(Array.isArray(e)?e:[e]);a.push(l),o.push(a)}))})),o}))},onDeleteGroup:function(e){var o=this;l.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((()=>{o.form.model.spec_many.spec_attr.splice(e,1),o.buildSkulist()}))},onDeleteValue:function(o,a){let s=this;s.form.isSpecLocked?e({message:"本商品正在参加活动，不能删除规格！",type:"warning"}):l.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((()=>{s.form.model.spec_many.spec_attr[o].spec_items.splice(a,1),s.buildSkulist()}))}}},S=e=>(G("data-v-4525c2c0"),e=e(),x(),e),C={class:"spec-many-type"},I={class:"spec-wrap"},T={class:"spec-hd"},B={class:"input-box"},L=["onClick"],N={class:"spec-bd"},q={class:"item"},$={class:"item"},E={key:1},P={class:"add-spec mb16"},M={class:"from-box"},O={class:"item"},R=S((()=>f("span",{class:"key"},"规格名：",-1))),Q={class:"item"},W=S((()=>f("span",{class:"key"},"规格值：",-1)));const X={class:"mt16"},Y=["onClick"];const H=A({components:{Type:A(z,[["render",function(e,l,p,d,r,m){const i=n("DeleteFilled"),c=o,G=a,x=s,F=t,D=n("CirclePlusFilled");return u(),_("div",C,[f("div",I,[m.form.model.spec_many?(u(!0),_(h,{key:0},g(m.form.model.spec_many.spec_attr,((e,l)=>(u(),_("div",{class:"mb16 min-spc",key:l},[f("div",T,[f("div",B,y(e.group_name),1),f("a",{href:"javascript:void(0);",onClick:e=>m.onDeleteGroup(l)},[b(c,null,{default:V((()=>[b(i)])),_:1})],8,L)]),f("div",N,[(u(!0),_(h,null,g(e.spec_items,((e,o)=>(u(),_("div",{class:"item",key:o},[b(G,{closable:"",onClose:e=>m.onDeleteValue(l,o)},{default:V((()=>[w(y(e.spec_value),1)])),_:2},1032,["onClose"])])))),128)),f("div",q,[b(x,{size:"small",modelValue:e.tempValue,"onUpdate:modelValue":l=>e.tempValue=l,style:{width:"160px"}},null,8,["modelValue","onUpdate:modelValue"])]),f("div",$,[b(F,{size:"small",onClick:l=>m.onSubmitAddValue(e),loading:e.loading},{default:V((()=>[w("添加")])),_:2},1032,["onClick","loading"])])])])))),128)):k("",!0),m.form.isSpecLocked?k("",!0):(u(),_("div",E,[v(b(F,{size:"small",onClick:m.onToggleAddGroupForm},{default:V((()=>[b(c,null,{default:V((()=>[b(D)])),_:1}),w("添加规格")])),_:1},8,["onClick"]),[[j,r.showAddGroupBtn]])])),v(f("div",P,[f("div",M,[f("div",O,[R,b(x,{size:"small",modelValue:r.addGroupFrom.specName,"onUpdate:modelValue":l[0]||(l[0]=e=>r.addGroupFrom.specName=e),placeholder:"请输入规格名称"},null,8,["modelValue"])]),f("div",Q,[W,b(x,{size:"small",modelValue:r.addGroupFrom.specValue,"onUpdate:modelValue":l[1]||(l[1]=e=>r.addGroupFrom.specValue=e),placeholder:"请输入规格值"},null,8,["modelValue"])]),b(F,{type:"primary",size:"small",loading:r.groupLoading,onClick:m.onSubmitAddGroup,plain:""},{default:V((()=>[w("确定")])),_:1},8,["loading","onClick"]),b(F,{size:"small",onClick:m.onToggleAddGroupForm},{default:V((()=>[w("取消")])),_:1},8,["onClick"])])],512),[[j,!r.showAddGroupBtn]])])])}],["__scopeId","data-v-4525c2c0"]]),Table:A({components:{Upload:U},data:()=>({batchData:{product_price:"",line_price:"",stock_num:"",product_weight:""},isupload:!1,spec_index:-1}),inject:["form"],created(){},methods:{objectSpanMethod({row:e,column:l,rowIndex:o,columnIndex:a}){var s=this.form.model.spec_many.spec_attr,t=1;if(a<s.length-1){let e=a+1,l=s.length-1;for(var p=e;p<=l;p++)t*=s[p].spec_items.length;return o%t==0?{rowspan:t,colspan:1}:{rowspan:0,colspan:0}}},onSubmitBatchData:function(){var e=this;e.form.model.spec_many.spec_list.forEach((function(l){for(var o in e.batchData)e.batchData.hasOwnProperty(o)&&e.batchData[o]&&(l.spec_form[o]=e.batchData[o])}))},chooseSpecImage:function(e){this.isupload=!0,this.spec_index=e},returnImgsFunc(e){this.isupload=!1,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_id=e[0].file_id,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_path=e[0].file_path}}},[["render",function(e,l,o,a,i,c){const n=s,j=t,G=p,x=d,A=r,z=m,S=U,C=F("img-url");return u(),_("div",X,[c.form.model.spec_many&&c.form.model.spec_many.spec_list&&c.form.model.spec_many.spec_list.length>0?(u(),D(A,{key:0,label:"规格明细："},{default:V((()=>[b(G,null,{default:V((()=>[w(" 批量设置 "),b(n,{size:"small",modelValue:i.batchData.product_price,"onUpdate:modelValue":l[0]||(l[0]=e=>i.batchData.product_price=e),placeholder:"销售价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),b(n,{size:"small",modelValue:i.batchData.line_price,"onUpdate:modelValue":l[1]||(l[1]=e=>i.batchData.line_price=e),placeholder:"划线价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),b(n,{size:"small",modelValue:i.batchData.stock_num,"onUpdate:modelValue":l[2]||(l[2]=e=>i.batchData.stock_num=e),placeholder:"库存",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),b(n,{size:"small",modelValue:i.batchData.product_weight,"onUpdate:modelValue":l[3]||(l[3]=e=>i.batchData.product_weight=e),placeholder:"重量",style:{width:"160px","padding-left":"4px","margin-right":"6px"}},null,8,["modelValue"]),b(j,{size:"small",onClick:c.onSubmitBatchData},{default:V((()=>[w("应用")])),_:1},8,["onClick"])])),_:1}),b(G,null,{default:V((()=>[b(z,{size:"small",data:c.form.model.spec_many.spec_list,"span-method":c.objectSpanMethod,border:"",style:{width:"100%","margin-top":"20px"}},{default:V((()=>[(u(!0),_(h,null,g(c.form.model.spec_many.spec_attr,((e,l)=>(u(),D(x,{label:e.group_name,key:e.group_name},{default:V((e=>[w(y(e.row.rows[l].spec_value),1)])),_:2},1032,["label"])))),128)),b(x,{label:"规格图片"},{default:V((e=>[v(f("img",{alt:"",width:35,height:35,onClick:l=>c.chooseSpecImage(e.$index)},null,8,Y),[[C,e.row.spec_form.image_path]])])),_:1}),b(x,{label:"产品编码"},{default:V((e=>[b(A,{label:"",style:{"margin-bottom":"0"}},{default:V((()=>[b(n,{size:"small",prop:"product_no",modelValue:e.row.spec_form.product_no,"onUpdate:modelValue":l=>e.row.spec_form.product_no=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:1}),b(x,{label:"销售价"},{default:V((e=>[b(A,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_price",style:{"margin-bottom":"0"}},{default:V((()=>[b(n,{size:"small",prop:"product_price",modelValue:e.row.spec_form.product_price,"onUpdate:modelValue":l=>e.row.spec_form.product_price=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["prop"])])),_:1}),b(x,{label:"划线价"},{default:V((e=>[b(A,{label:"",style:{"margin-bottom":"0"}},{default:V((()=>[b(n,{size:"small",prop:"line_price",modelValue:e.row.spec_form.line_price,"onUpdate:modelValue":l=>e.row.spec_form.line_price=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:1}),b(x,{label:"库存"},{default:V((e=>[b(A,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.stock_num",style:{"margin-bottom":"0"}},{default:V((()=>[b(n,{size:"small",prop:"stock_num",modelValue:e.row.spec_form.stock_num,"onUpdate:modelValue":l=>e.row.spec_form.stock_num=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["prop"])])),_:1}),b(x,{label:"重量(kg)"},{default:V((e=>[b(A,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_weight",style:{"margin-bottom":"0"}},{default:V((()=>[b(n,{size:"small",prop:"product_weight",modelValue:e.row.spec_form.product_weight,"onUpdate:modelValue":l=>e.row.spec_form.product_weight=l},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["prop"])])),_:1})])),_:1},8,["data","span-method"])])),_:1})])),_:1})):k("",!0),i.isupload?(u(),D(S,{key:1,isupload:i.isupload,onReturnImgs:c.returnImgsFunc},{default:V((()=>[w("上传图片")])),_:1},8,["isupload","onReturnImgs"])):k("",!0)])}]])}},[["render",function(e,l,o,a,s,t){const p=n("Type"),d=n("Table");return u(),_("div",null,[b(p),b(d)])}]]);export{H as default};
