System.register(["./element-plus-legacy-662cb951.js","./product-legacy-71b64399.js","./index-legacy-1e6334c7.js","./@vue-legacy-3fcc10b7.js"],(function(e,t){"use strict";var n,i,o,a,l,s,r,c,u,d,h,f=document.createElement("style");return f.textContent=".no-list .el-checkbox{display:none}\n",document.head.appendChild(f),{setters:[function(e){n=e.L,i=e.f,o=e.o},function(e){a=e.c},function(e){l=e._},function(e){s=e.o,r=e.T,c=e.S,u=e.P,d=e.W,h=e.a}],execute:function(){var t={class:"product-content"};e("_",l({data:function(){return{loading:!0,formInline:{},multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null,options:[],listData:[]}},props:["is_category","category_list"],watch:{is_category:function(e,t){e!=t&&(e?(this.dialogVisible=e,this.type="error",this.params=null,this.getData()):this.dialogVisible=e)},category_list:function(e,t){var n=this;e!=t&&e&&(this.listData=[],e.first.length>0&&e.first.forEach((function(e,t){n.listData.push([e.category_id])})),e.second.length>0&&e.second.forEach((function(e,t){n.listData.push([e.parent_id,e.category_id])})))}},created:function(){},methods:{selectableFunc:function(e){return"boolean"!=typeof e.noChoose||e.noChoose},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this;a({}).then((function(t){e.options=t.data.list})).catch((function(e){}))},SingleFunc:function(e){this.multipleSelection=[e],this.addClerk()},addClerk:function(){var e={first:[],second:[]};this.$refs.nodes.getCheckedNodes(!1,!1).forEach((function(t,n){null==t.parent?e.first.push({category_id:t.value,name:t.label}):e.second.push({category_id:t.value,name:t.label,parent:t.parent.label,parent_id:t.parent.value})})),this.$emit("close",e)},dialogFormVisible:function(){this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange:function(e){this.multipleSelection=e}}},[["render",function(e,a,l,f,p,g){var m=n,y=i,C=o;return s(),r(C,{title:"选择分类",modelValue:p.dialogVisible,"onUpdate:modelValue":a[2]||(a[2]=function(e){return p.dialogVisible=e}),onClose:g.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:c((function(){return[u(y,{size:"small",onClick:a[1]||(a[1]=function(e){return p.dialogVisible=!1})},{default:c((function(){return[d("取 消")]})),_:1}),u(y,{size:"small",type:"primary",onClick:g.addClerk},{default:c((function(){return[d("确 定")]})),_:1},8,["onClick"])]})),default:c((function(){return[h("div",t,[u(m,{ref:"nodes",options:p.options,modelValue:p.listData,"onUpdate:modelValue":a[0]||(a[0]=function(e){return p.listData=e}),props:{multiple:!0,value:"category_id",label:"name",children:"child"},"show-all-levels":!1},null,8,["options","modelValue"])])]})),_:1},8,["modelValue","onClose"])}]]))}}}));
