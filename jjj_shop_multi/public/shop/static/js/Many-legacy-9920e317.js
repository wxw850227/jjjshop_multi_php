System.register(["./element-plus-legacy-662cb951.js","./product-legacy-71b64399.js","./@vue-legacy-3fcc10b7.js","./index-legacy-1e6334c7.js","./Upload-legacy-aa72da47.js","./@vueuse-legacy-bdd63cbd.js","./lodash-es-legacy-7c31c52b.js","./async-validator-legacy-aa1fd2de.js","./dayjs-legacy-c5a98902.js","./call-bind-legacy-9803fab8.js","./get-intrinsic-legacy-4f34f38e.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./@element-plus-legacy-053c792c.js","./@popperjs-legacy-876caf52.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-b8d63bd7.js","./pinia-legacy-9b6e299c.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./vue-ueditor-wrap-legacy-4eaef8ae.js","./qs-legacy-e8d8a27b.js","./side-channel-legacy-a0fabbd4.js","./object-inspect-legacy-50e036e0.js"],(function(e,t){"use strict";var l,a,n,o,c,r,s,u,p,i,d,m,f,_,g,h,y,b,v,w,V,x,k,j,G,F,D,z,A,S,U,C=document.createElement("style");return C.textContent="[data-v-4525c2c0] .spec-wrap .el-tag{padding:0 10px!important;height:32px!important}.spec-many-type[data-v-4525c2c0]{margin-left:180px;margin-top:16px;padding:20px;border:1px solid #e5ecf4;background:#f6f9fc}.spec-wrap .spec-hd[data-v-4525c2c0]{padding:10px;display:flex;justify-content:space-between;align-items:center;background:#fff;font-weight:700}.spec-wrap .spec-hd .el-icon-delete-solid[data-v-4525c2c0]{font-size:16px;color:#999}.spec-wrap .min-spc[data-v-4525c2c0]{border:1px solid #dfecf8}.spec-wrap .spec-bd[data-v-4525c2c0]{padding:5px;display:flex;justify-content:flex-start;flex-wrap:wrap;border-top:1px solid #dfecf8;background:#ffffff}.spec-wrap .spec-bd .el-tag[data-v-4525c2c0]{color:#333}.spec-wrap .spec-bd .item[data-v-4525c2c0]{position:relative;padding:5px}.spec-wrap .spec-bd .item input[data-v-4525c2c0]{padding-right:30px}.spec-wrap .spec-hd a[data-v-4525c2c0],.spec-wrap .spec-hd .svg-icon[data-v-4525c2c0],.spec-wrap .spec-bd .item .svg-icon[data-v-4525c2c0]{display:block;width:16px;height:16px}.spec-wrap .spec-bd .item a[data-v-4525c2c0]{position:absolute;top:6px;right:5px;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.add-spec .from-box[data-v-4525c2c0]{display:flex;justify-content:flex-start}.add-spec .item[data-v-4525c2c0]{display:flex;justify-content:flex-start;align-items:center;width:200px;margin-right:20px}.add-spec .item .key[data-v-4525c2c0]{display:block;white-space:nowrap}\n",document.head.appendChild(C),{setters:[function(e){l=e.E,a=e.a,n=e.F,o=e.y,c=e.d,r=e.f,s=e.h,u=e.l,p=e.e,i=e.m},function(e){d=e.l,m=e.m},function(e){f=e.ae,_=e.o,g=e.c,h=e.a,y=e.Q,b=e.a9,v=e.X,w=e.P,V=e.S,x=e.W,k=e.Y,j=e.$,G=e.a0,F=e.bb,D=e.b9,z=e.ap,A=e.T},function(e){S=e._},function(e){U=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={data:function(){return{showAddGroupBtn:!0,showAddGroupForm:!1,addGroupFrom:{specName:"",specValue:""},groupLoading:!1}},inject:["form"],created:function(){this.form.model.spec_many&&this.form.model.spec_many.spec_list.length>0&&this.buildSkulist()},methods:{onToggleAddGroupForm:function(){this.showAddGroupBtn=!this.showAddGroupBtn,this.showAddGroupForm=!this.showAddGroupForm},onSubmitAddGroup:function(){var e=this;if(""===e.addGroupFrom.specName||""===e.addGroupFrom.specValue)return l("请填写规则名或规则值"),!1;e.groupLoading=!0;var t={spec_name:e.addGroupFrom.specName,spec_value:e.addGroupFrom.specValue};d(t).then((function(t){e.groupLoading=!1,e.form.model.spec_many||(e.form.model.spec_many={spec_many:[],spec_attr:[]}),e.form.model.spec_many.spec_attr.push({group_id:t.data.spec_id,group_name:e.addGroupFrom.specName,spec_items:[{item_id:t.data.spec_value_id,spec_value:e.addGroupFrom.specValue}],tempValue:"",loading:!1}),e.addGroupFrom.specName="",e.addGroupFrom.specValue="",e.onToggleAddGroupForm(),e.buildSkulist()})).catch((function(){e.groupLoading=!1}))},onSubmitAddValue:function(e){var t=this;if(!e.hasOwnProperty("tempValue")||""===e.tempValue)return l("规格值不能为空"),!1;e.loading=!0;var a={spec_id:e.group_id,spec_value:e.tempValue};m(a).then((function(l){e.loading=!1,e.spec_items.push({item_id:l.data.spec_value_id,spec_value:e.tempValue}),e.tempValue="",t.buildSkulist()})).catch((function(){e.loading=!1}))},buildSkulist:function(){var e=this;e.form.model.spec_many||(e.form.model.spec_many={spec_attr:[]});for(var t=e.form.model.spec_many.spec_attr,l=[],a=0;a<t.length;a++)l.push(t[a].spec_items);for(var n=e.calcDescartes(l),o=[],c=0;c<n.length;c++){var r=[],s=[];Array.isArray(n[c])?r=n[c]:r.push(n[c]);for(var u=0;u<r.length;u++)s.push(r[u].item_id);o.push({product_sku_id:0,spec_sku_id:s.join("_"),rows:r,spec_form:{}})}if(e.form.model.spec_many.spec_list&&e.form.model.spec_many.spec_list.length>0&&o.length>0)for(var p=function(t){var l=e.form.model.spec_many.spec_list.filter((function(e){return e.spec_sku_id===o[t].spec_sku_id}));l.length>0&&(o[t].spec_form=l[0].spec_form,o[t].product_sku_id=l[0].product_sku_id)},i=0;i<o.length;i++)p(i);e.form.model.spec_many.spec_list=o},calcDescartes:function(e){return e.length<2?e[0]||[]:[].reduce.call(e,(function(e,t){var l=[];return e.forEach((function(e){t.forEach((function(t){var a=[].concat(Array.isArray(e)?e:[e]);a.push(t),l.push(a)}))})),l}))},onDeleteGroup:function(e){var t=this;a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){t.form.model.spec_many.spec_attr.splice(e,1),t.buildSkulist()}))},onDeleteValue:function(e,t){var n=this;n.form.isSpecLocked?l({message:"本商品正在参加活动，不能删除规格！",type:"warning"}):a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){n.form.model.spec_many.spec_attr[e].spec_items.splice(t,1),n.buildSkulist()}))}}},C=function(e){return F("data-v-4525c2c0"),e=e(),D(),e},I={class:"spec-many-type"},T={class:"spec-wrap"},B={class:"spec-hd"},L={class:"input-box"},N=["onClick"],q={class:"spec-bd"},E={class:"item"},$={class:"item"},P={key:1},M={class:"add-spec mb16"},O={class:"from-box"},R={class:"item"},Q=C((function(){return h("span",{class:"key"},"规格名：",-1)})),W={class:"item"},X=C((function(){return h("span",{class:"key"},"规格值：",-1)})),Y={class:"mt16"},H=["onClick"];e("default",S({components:{Type:S(t,[["render",function(e,t,l,a,s,u){var p=f("DeleteFilled"),i=n,d=o,m=c,F=r,D=f("CirclePlusFilled");return _(),g("div",I,[h("div",T,[u.form.model.spec_many?(_(!0),g(y,{key:0},b(u.form.model.spec_many.spec_attr,(function(e,t){return _(),g("div",{class:"mb16 min-spc",key:t},[h("div",B,[h("div",L,v(e.group_name),1),h("a",{href:"javascript:void(0);",onClick:function(e){return u.onDeleteGroup(t)}},[w(i,null,{default:V((function(){return[w(p)]})),_:1})],8,N)]),h("div",q,[(_(!0),g(y,null,b(e.spec_items,(function(e,l){return _(),g("div",{class:"item",key:l},[w(d,{closable:"",onClose:function(e){return u.onDeleteValue(t,l)}},{default:V((function(){return[x(v(e.spec_value),1)]})),_:2},1032,["onClose"])])})),128)),h("div",E,[w(m,{size:"small",modelValue:e.tempValue,"onUpdate:modelValue":function(t){return e.tempValue=t},style:{width:"160px"}},null,8,["modelValue","onUpdate:modelValue"])]),h("div",$,[w(F,{size:"small",onClick:function(t){return u.onSubmitAddValue(e)},loading:e.loading},{default:V((function(){return[x("添加")]})),_:2},1032,["onClick","loading"])])])])})),128)):k("",!0),u.form.isSpecLocked?k("",!0):(_(),g("div",P,[j(w(F,{size:"small",onClick:u.onToggleAddGroupForm},{default:V((function(){return[w(i,null,{default:V((function(){return[w(D)]})),_:1}),x("添加规格")]})),_:1},8,["onClick"]),[[G,s.showAddGroupBtn]])])),j(h("div",M,[h("div",O,[h("div",R,[Q,w(m,{size:"small",modelValue:s.addGroupFrom.specName,"onUpdate:modelValue":t[0]||(t[0]=function(e){return s.addGroupFrom.specName=e}),placeholder:"请输入规格名称"},null,8,["modelValue"])]),h("div",W,[X,w(m,{size:"small",modelValue:s.addGroupFrom.specValue,"onUpdate:modelValue":t[1]||(t[1]=function(e){return s.addGroupFrom.specValue=e}),placeholder:"请输入规格值"},null,8,["modelValue"])]),w(F,{type:"primary",size:"small",loading:s.groupLoading,onClick:u.onSubmitAddGroup,plain:""},{default:V((function(){return[x("确定")]})),_:1},8,["loading","onClick"]),w(F,{size:"small",onClick:u.onToggleAddGroupForm},{default:V((function(){return[x("取消")]})),_:1},8,["onClick"])])],512),[[G,!s.showAddGroupBtn]])])])}],["__scopeId","data-v-4525c2c0"]]),Table:S({components:{Upload:U},data:function(){return{batchData:{product_price:"",line_price:"",stock_num:"",product_weight:""},isupload:!1,spec_index:-1}},inject:["form"],created:function(){},methods:{objectSpanMethod:function(e){e.row,e.column;var t=e.rowIndex,l=e.columnIndex,a=this.form.model.spec_many.spec_attr,n=1;if(l<a.length-1){for(var o=l+1,c=a.length-1,r=o;r<=c;r++)n*=a[r].spec_items.length;return t%n==0?{rowspan:n,colspan:1}:{rowspan:0,colspan:0}}},onSubmitBatchData:function(){var e=this;e.form.model.spec_many.spec_list.forEach((function(t){for(var l in e.batchData)e.batchData.hasOwnProperty(l)&&e.batchData[l]&&(t.spec_form[l]=e.batchData[l])}))},chooseSpecImage:function(e){this.isupload=!0,this.spec_index=e},returnImgsFunc:function(e){this.isupload=!1,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_id=e[0].file_id,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_path=e[0].file_path}}},[["render",function(e,t,l,a,n,o){var d=c,m=r,f=s,G=u,F=p,D=i,S=U,C=z("img-url");return _(),g("div",Y,[o.form.model.spec_many&&o.form.model.spec_many.spec_list&&o.form.model.spec_many.spec_list.length>0?(_(),A(F,{key:0,label:"规格明细："},{default:V((function(){return[w(f,null,{default:V((function(){return[x(" 批量设置 "),w(d,{size:"small",modelValue:n.batchData.product_price,"onUpdate:modelValue":t[0]||(t[0]=function(e){return n.batchData.product_price=e}),placeholder:"销售价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),w(d,{size:"small",modelValue:n.batchData.line_price,"onUpdate:modelValue":t[1]||(t[1]=function(e){return n.batchData.line_price=e}),placeholder:"划线价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),w(d,{size:"small",modelValue:n.batchData.stock_num,"onUpdate:modelValue":t[2]||(t[2]=function(e){return n.batchData.stock_num=e}),placeholder:"库存",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),w(d,{size:"small",modelValue:n.batchData.product_weight,"onUpdate:modelValue":t[3]||(t[3]=function(e){return n.batchData.product_weight=e}),placeholder:"重量",style:{width:"160px","padding-left":"4px","margin-right":"6px"}},null,8,["modelValue"]),w(m,{size:"small",onClick:o.onSubmitBatchData},{default:V((function(){return[x("应用")]})),_:1},8,["onClick"])]})),_:1}),w(f,null,{default:V((function(){return[w(D,{size:"small",data:o.form.model.spec_many.spec_list,"span-method":o.objectSpanMethod,border:"",style:{width:"100%","margin-top":"20px"}},{default:V((function(){return[(_(!0),g(y,null,b(o.form.model.spec_many.spec_attr,(function(e,t){return _(),A(G,{label:e.group_name,key:e.group_name},{default:V((function(e){return[x(v(e.row.rows[t].spec_value),1)]})),_:2},1032,["label"])})),128)),w(G,{label:"规格图片"},{default:V((function(e){return[j(h("img",{alt:"",width:35,height:35,onClick:function(t){return o.chooseSpecImage(e.$index)}},null,8,H),[[C,e.row.spec_form.image_path]])]})),_:1}),w(G,{label:"产品编码"},{default:V((function(e){return[w(F,{label:"",style:{"margin-bottom":"0"}},{default:V((function(){return[w(d,{size:"small",prop:"product_no",modelValue:e.row.spec_form.product_no,"onUpdate:modelValue":function(t){return e.row.spec_form.product_no=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1}),w(G,{label:"销售价"},{default:V((function(e){return[w(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_price",style:{"margin-bottom":"0"}},{default:V((function(){return[w(d,{size:"small",prop:"product_price",modelValue:e.row.spec_form.product_price,"onUpdate:modelValue":function(t){return e.row.spec_form.product_price=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1}),w(G,{label:"划线价"},{default:V((function(e){return[w(F,{label:"",style:{"margin-bottom":"0"}},{default:V((function(){return[w(d,{size:"small",prop:"line_price",modelValue:e.row.spec_form.line_price,"onUpdate:modelValue":function(t){return e.row.spec_form.line_price=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1}),w(G,{label:"库存"},{default:V((function(e){return[w(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.stock_num",style:{"margin-bottom":"0"}},{default:V((function(){return[w(d,{size:"small",prop:"stock_num",modelValue:e.row.spec_form.stock_num,"onUpdate:modelValue":function(t){return e.row.spec_form.stock_num=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1}),w(G,{label:"重量(kg)"},{default:V((function(e){return[w(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_weight",style:{"margin-bottom":"0"}},{default:V((function(){return[w(d,{size:"small",prop:"product_weight",modelValue:e.row.spec_form.product_weight,"onUpdate:modelValue":function(t){return e.row.spec_form.product_weight=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1})]})),_:1},8,["data","span-method"])]})),_:1})]})),_:1})):k("",!0),n.isupload?(_(),A(S,{key:1,isupload:n.isupload,onReturnImgs:o.returnImgsFunc},{default:V((function(){return[x("上传图片")]})),_:1},8,["isupload","onReturnImgs"])):k("",!0)])}]])}},[["render",function(e,t,l,a,n,o){var c=f("Type"),r=f("Table");return _(),g("div",null,[w(c),w(r)])}]]))}}}));
