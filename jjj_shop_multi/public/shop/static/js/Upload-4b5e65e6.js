import{E as e,d as t,e as a,f as i,c as l,o,a as s,B as n,C as c,D as r,F as d,n as u}from"./element-plus-78c440b2.js";import{i as g,_ as p}from"./index-0e3e5afc.js";import{o as h,T as f,S as m,P as y,W as _,ae as C,c as k,a as v,Q as F,a9 as b,X as w,M as z,a1 as S,Y as V,V as x}from"./@vue-76da2f05.js";const D=p({data:()=>({dialogVisible:!0,form:{categoryname:""},categoryName:""}),props:["category","file_type"],created(){null!=this.category&&(this.form.categoryname=this.category.group_name,this.form.group_id=this.category.group_id)},methods:{addCategory:function(t){let a=this;(async function(e){return g({url:"/shop/file.file/addGroup",method:"post",data:e})})({group_name:t,group_type:a.file_type}).then((t=>{e({message:"添加成功",type:"success"}),a.handleClose({status:"success"})})).catch((t=>{e.error("添加失败")}))},editCategory:function(t){let a=this;(async function(e){return g({url:"/shop/file.file/editGroup",method:"post",data:e})})({group_name:t.categoryname,group_id:t.group_id}).then((t=>{e({message:"修改成功",type:"success"}),a.handleClose({status:"success"})})).catch((t=>{e.error("修改失败")}))},submitForm(e){this.$refs[e].validate((e=>{if(!e)return!1;this.category&&null!=this.category.group_id?this.editCategory(this.form):this.addCategory(this.form.categoryname)}))},handleClose(e){this.dialogVisible=!1,this.$emit("closeCategory",e)}}},[["render",function(e,s,n,c,r,d){const u=t,g=a,p=i,C=l,k=o;return h(),f(k,{title:"添加分类",modelValue:r.dialogVisible,"onUpdate:modelValue":s[2]||(s[2]=e=>r.dialogVisible=e),width:"30%","before-close":d.handleClose,"append-to-body":!0},{default:m((()=>[y(C,{size:"small",model:r.form,ref:"form","label-width":"100px",class:"demo-ruleForm"},{default:m((()=>[y(g,{label:"分类名称",prop:"categoryname",rules:[{required:!0,message:"名字不能为空"}]},{default:m((()=>[y(u,{type:"age",modelValue:r.form.categoryname,"onUpdate:modelValue":s[0]||(s[0]=e=>r.form.categoryname=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),y(g,null,{default:m((()=>[y(p,{size:"small",onClick:d.handleClose},{default:m((()=>[_("取消")])),_:1},8,["onClick"]),y(p,{size:"small",type:"primary",onClick:s[1]||(s[1]=e=>d.submitForm("form"))},{default:m((()=>[_("提交")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue","before-close"])}]]),T={class:"upload-wrap"},L={class:"upload-wrap-inline mb16 clearfix"},I={class:"leval-item"},B={class:"move-type"},j=["onClick"],U={class:"leval-item upload-btn"},P={class:"fileContainer"},E={class:"file-type"},N=["onClick"],$=["onClick"],q=["onClick"],G={class:"file-content"},W={class:"fileContainerUI clearfix"},A=["onClick"],M={key:0,class:"selectedIcon"},O={class:"iconBox"},Q=["scr"],X=["src"],Y={class:"desc"},H=["onClick"],J={class:"pagination-wrap"};const K=p({components:{AddCategory:D},data:()=>({dialogWidth:"910px",activeType:null,typeList:[],imageUrl:null,dialogVisible:!0,fileList:[],addLoading:!1,this_config:{total:1,file_type:"image"},record:0,loading:!0,tableData:[],pageSize:36,totalDataNumber:0,curPage:1,isShowCategory:!1,category:null,fileIds:[],accept:""}),props:["config"],created(){if("[object object]"===Object.prototype.toString.call(this.config).toLowerCase()){for(let e in this.config)this.this_config[e]=this.config[e];"image"==this.this_config.file_type?this.accept="image/jpeg,image/png,image/jpg":this.accept="video/mp4"}this.getFileCategory(),this.getData()},methods:{getFileCategory(){let e=this;(async function(e){return g({url:"/shop/file.file/category",method:"post",data:e})})({type:e.this_config.file_type}).then((t=>{e.typeList=[{group_id:null,group_name:"全部"}].concat(t.data.group_list)})).catch((t=>{e.loading=!1}))},addCategory(){this.isShowCategory=!0},editCategoryFunc(e){this.isShowCategory=!0,this.category=e},closeCategoryFunc(e){null!=e&&this.getFileCategory(),this.isShowCategory=!1},deleteCategoryFunc(t){s.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.deleteCategory(t)})).catch((()=>{e({type:"info",message:"已取消删除"})}))},deleteCategory(t){let a=this;(async function(e){return g({url:"/shop/file.file/deleteGroup",method:"post",data:e})})({group_id:t}).then((t=>{e({message:"删除成功",type:"success"}),a.getFileCategory()})).catch((t=>{e.error("删除失败")}))},selectTypeFunc(e){this.activeType=e,this.curPage=1,this.getData()},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){let e=this;(async function(e){return g({url:"/shop/file.file/lists",method:"post",data:e})})({page:e.curPage,pageSize:e.pageSize,group_id:e.activeType,type:e.this_config.file_type}).then((t=>{e.loading=!1,e.fileList=t.data.file_list,e.totalDataNumber=e.fileList.total})).catch((t=>{e.loading=!1}))},moveTypeFunc(t){let a=this,i=[];a.fileList.data.forEach((e=>{e.selected&&i.push(e.file_id)})),0!=i.length?s.confirm("确定移动选中的文件吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(async function(e){return g({url:"/shop/file.upload/moveFiles",method:"post",data:e})})({group_id:t,fileIds:i}).then((t=>{e({message:"移动成功",type:"success"}),a.getFileCategory(),a.getData()})).catch((e=>{}))})).catch((()=>{})):e({message:"请选择文件",type:"warning"})},fileChange(e){},onBeforeUploadImage:e=>!0,UploadImage(t){let a=this;const i=n.service({lock:!0,text:"图片上传中,请等待",background:"rgba(0, 0, 0, 0.7)"}),l=new FormData;l.append("iFile",t.file),l.append("group_id",a.activeType),l.append("file_type",a.this_config.file_type),async function(e){return g({url:"/shop/file.upload/image",method:"post",data:e})}(l).then((e=>{i.close(),a.getData(),t.onSuccess()})).catch((a=>{i.close(),e({message:"本次上传图片失败",type:"warning"}),t.onError()}))},selectFileFunc(t,a){if(t.selected)t.selected=!1,this.record--;else{if(t.selected=!0,this.record++,this.record>=this.this_config.total)return void e({message:"本次最多只能上传 "+this.this_config.total+" 个文件",type:"warning"});t.selected=!0,this.record++}},deleteFileFunc(t){let a=this;s.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{const i=n.service({lock:!0,text:"图片上传中,请等待",background:"rgba(0, 0, 0, 0.7)"});let l=[];if(t)l.push(t.file_id);else for(let e=0;e<a.fileList.data.length;e++){let t=a.fileList.data[e];t.selected&&l.push(t.file_id)}(async function(e){return g({url:"/shop/file.file/deleteFiles",method:"post",data:e})})({fileIds:l}).then((t=>{i.close(),e({message:"删除成功",type:"success"}),a.getData()})).catch((e=>{i.close()}))})).catch((()=>{loading.close(),e({message:"删除失败",type:"warning"})}))},confirmFunc(){let e=[],t=0;for(let a=0;a<this.fileList.data.length;a++){let i=this.fileList.data[a];if(i.selected){let a={file_id:i.file_id,file_path:i.file_path};e.push(a),t++}if(t>this.this_config.total)break}this.$emit("returnImgs",e)},cancelFunc(){this.$emit("returnImgs",null)}}},[["render",function(e,t,a,l,s,n){const g=i,p=c,K=r,R=C("Edit"),Z=d,ee=C("Delete"),te=C("Select"),ae=u,ie=o,le=D;return h(),k("div",T,[y(ie,{title:"文件管理",modelValue:s.dialogVisible,"onUpdate:modelValue":t[3]||(t[3]=e=>s.dialogVisible=e),"close-on-click-modal":!1,"custom-class":"upload-dialog","close-on-press-escape":!1,onClose:n.cancelFunc,width:s.dialogWidth,"append-to-body":!0},{footer:m((()=>[y(g,{size:"small",onClick:n.cancelFunc},{default:m((()=>[_("取 消")])),_:1},8,["onClick"]),y(g,{size:"small",type:"primary",onClick:n.confirmFunc},{default:m((()=>[_("确 定")])),_:1},8,["onClick"])])),default:m((()=>[v("div",L,[v("div",I,[y(g,{size:"small",icon:"Plus",onClick:n.addCategory},{default:m((()=>[_("添加分类")])),_:1},8,["onClick"]),y(p,{placement:"bottom",width:"200",trigger:"click",value:!0},{reference:m((()=>[y(g,{size:"small",icon:"CaretBottom"},{default:m((()=>[_("移动至")])),_:1})])),default:m((()=>[v("ul",B,[(h(!0),k(F,null,b(s.typeList,((e,t)=>(h(),k("li",{key:t,onClick:t=>n.moveTypeFunc(e.group_id)},w(e.group_name),9,j)))),128))])])),_:1}),y(g,{size:"small",type:"danger",icon:"Delete",onClick:t[0]||(t[0]=e=>n.deleteFileFunc(!1))},{default:m((()=>[_("批量删除")])),_:1})]),v("div",U,[y(K,{class:"avatar-uploader",multiple:"",ref:"upload",action:"string",accept:s.accept,"before-upload":n.onBeforeUploadImage,"http-request":n.UploadImage,"show-file-list":!1,"on-change":n.fileChange},{default:m((()=>[y(g,{size:"small",icon:"Upload",type:"primary"},{default:m((()=>[_("点击上传")])),_:1})])),_:1},8,["accept","before-upload","http-request","on-change"])])]),v("div",P,[v("div",E,[v("ul",null,[(h(!0),k(F,null,b(s.typeList,((e,a)=>(h(),k("li",{class:z(s.activeType==e.group_id?"item active":"item"),key:a,onClick:t=>n.selectTypeFunc(e.group_id)},[_(w(e.group_name)+" ",1),null!=e.group_id?(h(),k("div",{key:0,class:"operation",onClick:t[1]||(t[1]=S((()=>{}),["stop"]))},[v("p",{onClick:t=>n.editCategoryFunc(e)},[y(Z,null,{default:m((()=>[y(R)])),_:1})],8,$),v("p",{onClick:t=>n.deleteCategoryFunc(e.group_id)},[y(Z,null,{default:m((()=>[y(ee)])),_:1})],8,q)])):V("",!0)],10,N)))),128))])]),v("div",G,[v("ul",W,[(h(!0),k(F,null,b(s.fileList.data,((e,a)=>(h(),k("li",{class:"file",key:a,onClick:t=>n.selectFileFunc(e,a)},[1==e.selected?(h(),k("div",M,[v("div",O,[y(Z,null,{default:m((()=>[y(te)])),_:1})])])):V("",!0),"image"==s.this_config.file_type?(h(),k("img",{key:1,scr:e.file_path,style:x("background-image:url("+e.file_path+")"),alt:""},null,12,Q)):V("",!0),"video"==s.this_config.file_type?(h(),k("video",{key:2,height:"100",width:"100",src:e.file_path,autoplay:!1}," 您的浏览器不支持 video 标签 ",8,X)):V("",!0),v("p",Y,w(e.real_name),1),v("div",{class:"bottom-shade",onClick:t[2]||(t[2]=S((()=>{}),["stop"]))},[v("a",{href:"javascript:void(0)",onClick:t=>n.deleteFileFunc(e)},[y(Z,null,{default:m((()=>[y(ee)])),_:1})],8,H)])],8,A)))),128))])])]),v("div",J,[y(ae,{onSizeChange:n.handleSizeChange,onCurrentChange:n.handleCurrentChange,"current-page":s.curPage,"page-sizes":[12,24,36,42,48],"page-size":s.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:s.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])),_:1},8,["modelValue","onClose","width"]),s.isShowCategory?(h(),f(le,{key:0,category:s.category,file_type:s.this_config.file_type,onCloseCategory:n.closeCategoryFunc},null,8,["category","file_type","onCloseCategory"])):V("",!0)])}],["__scopeId","data-v-ce4a9897"]]);export{K as _};
