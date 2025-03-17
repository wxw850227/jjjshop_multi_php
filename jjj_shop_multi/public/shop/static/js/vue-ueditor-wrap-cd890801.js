import{F as e,r as n,I as t,w as o,a7 as r,z as i,P as s,n as u}from"./@vue-76da2f05.js";var d=function(){function e(){this.listeners={}}var n=e.prototype;return n.on=function(e,n){void 0===this.listeners[e]&&(this.listeners[e]={triggered:!1,requested:!1,cbs:[]}),this.listeners[e].triggered&&n(),this.listeners[e].cbs.push(n)},n.emit=function(e){this.listeners[e]&&(this.listeners[e].triggered=!0,this.listeners[e].cbs.forEach((function(e){return e()})))},e}();const a=e({name:"vue-ueditor-wrap",props:{editorId:String,name:String,modelValue:{type:String,default:""},config:Object,mode:{type:String,default:"observer",validator:function(e){return-1!==["observer","listener"].indexOf(e)}},observerOptions:{type:Object,default:function(){return{attributes:!0,attributeFilter:["src","style","type","name"],characterData:!0,childList:!0,subtree:!0}}},observerDebounceTime:{type:Number,default:50,validator:function(e){return e>=20}},forceInit:Boolean,destroy:{type:Boolean,default:!0},editorDependencies:{type:Array},editorDependenciesChecker:{type:Function}},emits:["update:modelValue","before-init","ready"],setup:function(e,a){var c,l,f,m=a.emit,p="UN_READY",v="PENDING",w="READY",h=p,E=n(),g=["ueditor.config.js","ueditor.all.min.js"],y=t(e,"modelValue");window.$loadEventBus||(window.$loadEventBus=new d);var b=function(){return new Promise((function(n,t){if(e.editorDependencies&&e.editorDependenciesChecker&&e.editorDependenciesChecker())n();else if(!e.editorDependencies&&window.UE&&window.UE.getEditor&&window.UEDITOR_CONFIG&&0!==Object.keys(window.UEDITOR_CONFIG).length)n();else{var o,r=(e.editorDependencies||g).reduce((function(n,t){var o;/^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(t)||(t=((null==(o=e.config)?void 0:o.UEDITOR_HOME_URL)||"")+t);return".js"===t.slice(-3)?n.jsLinks.push(t):".css"===t.slice(-4)&&n.cssLinks.push(t),n}),{jsLinks:[],cssLinks:[]}),i=r.jsLinks,s=r.cssLinks;Promise.all([Promise.all(s.map((function(e){return function(e){return new Promise((function(n,t){if(window.$loadEventBus.on(e,n),!1===window.$loadEventBus.listeners[e].requested){window.$loadEventBus.listeners[e].requested=!0;var o=document.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=e,o.onload=function(){window.$loadEventBus.emit(e)},o.onerror=t,document.getElementsByTagName("head")[0].appendChild(o)}}))}(e)}))),(o=i.map((function(e){return function(){return function(e){return new Promise((function(n,t){if(window.$loadEventBus.on(e,n),!1===window.$loadEventBus.listeners[e].requested){window.$loadEventBus.listeners[e].requested=!0;var o=document.createElement("script");o.src=e,o.onload=function(){window.$loadEventBus.emit(e)},o.onerror=t,document.getElementsByTagName("head")[0].appendChild(o)}}))}(e)}})),o.reduce((function(e,n){return e.then(n)}),Promise.resolve()))]).then((function(){return n()})).catch(t)}}))},D=function(){f=c.getContent(),m("update:modelValue",f)},O=function(){c.document.getElementById("baidu_pastebin")||(f=c.getContent(),m("update:modelValue",f))},B=function(){var n,t,o,r;l=new MutationObserver((n=O,t=e.observerDebounceTime,r=function(){for(var e=this,r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];o&&clearTimeout(o),o=setTimeout((function(){n.apply(e,i)}),t)},r.cancel=function(){void 0!==o&&clearTimeout(o)},r)),l.observe(c.body,e.observerOptions)},C=function(){var n=e.editorId||"editor_"+function(e){for(var n="abcdefghijklmnopqrstuvwxyz",t="",o=0;o<e;o++)t+=n.charAt(Math.floor(26*Math.random()));return t}(8);E.value.id=n,m("before-init",n),(c=window.UE.getEditor(n,e.config)).addListener("ready",(function(){h===w?c.setContent(e.modelValue):(h=w,m("ready",c),e.modelValue&&c.setContent(e.modelValue)),"observer"===e.mode&&window.MutationObserver?B():c.addListener("contentChange",D)}))};return o(y,(function(n){h===p?(h=v,(e.forceInit||"undefined"!=typeof window)&&b().then((function(){E.value?C():u((function(){return C()}))})).catch((function(){throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！")}))):h===w&&(n===f||c.setContent(n||""))}),{immediate:!0}),r((function(){c&&c.removeListener("contentChange",D),l&&l.disconnect()})),i((function(){l&&l.disconnect&&l.disconnect(),e.destroy&&c&&c.destroy&&c.destroy()})),function(){return s("div",null,[s("div",{ref:E,name:e.name},null)])}}});var c;const l=((c=a).install=function(e){var n=c.name;e.component(n,c),e.component(("-"+n).replace(/-(\w)/g,(function(e,n){return n?n.toUpperCase():""})),c)},c);const f={install:function(e){[l].forEach((function(n){n.install?e.use(n):n.name&&e.component(n.name,n)}))},version:"3.0.8"};export{f as V};
