import{E as e,q as t,r as s,f as i,c as a}from"./element-plus-1d28f1d0.js";import{f as o,h as r}from"./product-248f65bb.js";import n from"./Basic-1da7cdb5.js";import l from"./Specs-9af042e9.js";import m from"./Content-d86308c4.js";import c from"./Buyset-e773c17b.js";import{ae as p,o as d,c as u,P as _,S as f,$ as j,a0 as v,a as g,W as y}from"./@vue-fcfaff04.js";import{_ as b}from"./index-3957abef.js";import"./lodash-es-493ac664.js";import"./async-validator-cf877c1f.js";import"./@vueuse-28c84072.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-6c014c7f.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-c4f46615.js";import"./vuedraggable-392a59b1.js";import"./vue-de83683b.js";import"./sortablejs-808289a9.js";import"./Single-5e9d48c9.js";import"./Many-05386675.js";import"./vue-router-0cda4647.js";import"./pinia-234ab43f.js";import"./axios-63583d02.js";import"./vue-ueditor-wrap-33bac798.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";const h={class:"product-add"},S={class:"common-button-wrapper"};const k=b({components:{Basicm:n,Spec:l,Content:m,Buyset:c},data:()=>({activeName:"basic",loading:!1,form:{model:{scene:"add",product_name:"",product_no:"",category_id:null,image:[],is_picture:0,contentImage:[],video_id:0,poster_id:0,selling_point:"",spec_type:10,deduct_stock_type:20,sku:{},spec_many:{spec_attr:[],spec_list:[]},content:"",is_delivery_free:0,delivery_id:"",product_status:10,audit_status:0,product_sort:100,is_points_gift:1,is_points_discount:1,max_points_discount:0,is_virtual:0,limit_num:0,virtual_auto:0,virtual_content:""},category:[],delivery:[],gradeList:[],specData:null,isSpecLocked:!1,audit_setting:{}}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let e=this;o({}).then((t=>{e.loading=!1,Object.assign(e.form,t.data)})).catch((t=>{e.loading=!1}))},convertJson(e){let t={};return e.forEach((e=>{t[e.grade_id]=e.product_equity})),JSON.stringify(t)},onSubmit:function(){let t=this,s=t.form.model;t.$refs.form.validate((i=>{if(i){if(0==s.is_delivery_free)s.delivery_id=0;else if(""==s.delivery_id)return void e({message:"请选择运费模板",type:"error"});t.loading=!0,r({params:JSON.stringify(s)}).then((s=>{t.loading=!1,e({message:"添加成功",type:"success"}),t.$router.push("/product/product/index")})).catch((e=>{t.loading=!1}))}else e({message:"请检查必填项是否填写完整",type:"error"})}))},cancelFunc(){this.$router.back(-1)}}},[["render",function(e,o,r,n,l,m){const c=t,b=s,k=p("Basicm"),N=p("Spec"),B=p("Content"),x=p("Buyset"),C=i,q=a;return d(),u("div",h,[_(b,{modelValue:l.activeName,"onUpdate:modelValue":o[0]||(o[0]=e=>l.activeName=e),type:"card"},{default:f((()=>[_(c,{label:"基础设置",name:"basic"}),_(c,{label:"规格库存",name:"spec"}),_(c,{label:"商品详情",name:"content"}),_(c,{label:"高级设置",name:"buyset"})])),_:1},8,["modelValue"]),_(q,{size:"small",ref:"form",model:l.form,"label-width":"180px"},{default:f((()=>[j(_(k,null,null,512),[[v,"basic"==l.activeName]]),j(_(N,null,null,512),[[v,"spec"==l.activeName]]),j(_(B,null,null,512),[[v,"content"==l.activeName]]),j(_(x,null,null,512),[[v,"buyset"==l.activeName]]),g("div",S,[_(C,{size:"small",type:"info",onClick:m.cancelFunc},{default:f((()=>[y("取消")])),_:1},8,["onClick"]),_(C,{size:"small",type:"primary",onClick:m.onSubmit,loading:l.loading},{default:f((()=>[y("保存")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-f1069dd6"]]);export{k as default};
