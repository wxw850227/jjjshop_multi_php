import{s as e,u as t,aq as n,A as r,n as o,F as a,K as c,j as s,ad as i,E as l,r as u,w as f}from"./@vue-fcfaff04.js";
/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const p="undefined"!=typeof window;const h=Object.assign;function d(e,t){const n={};for(const r in t){const o=t[r];n[r]=g(o)?o.map(e):e(o)}return n}const m=()=>{},g=Array.isArray,v=/\/$/,y=e=>e.replace(v,"");function b(e,t,n="/"){let r,o={},a="",c="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),a=t.slice(i+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),c=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let a,c,s=n.length-1;for(a=0;a<r.length;a++)if(c=r[a],"."!==c){if(".."!==c)break;s>1&&s--}return n.slice(0,s).join("/")+"/"+r.slice(a-(a===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function w(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function E(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function O(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!k(e[n],t[n]))return!1;return!0}function k(e,t){return g(e)?R(e,t):g(t)?R(t,e):e===t}function R(e,t){return g(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var P,x,C,j;(x=P||(P={})).pop="pop",x.push="push",(j=C||(C={})).back="back",j.forward="forward",j.unknown="";const S=/^[^#]+#/;function A(e,t){return e.replace(S,"#")+t}const q=()=>({left:window.pageXOffset,top:window.pageYOffset});function L(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function M(e,t){return(history.state?history.state.position-t:-1)+e}const B=new Map;let G=()=>location.protocol+"//"+location.host;function _(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return"/"!==n[0]&&(n="/"+n),w(n,"")}return w(n,e)+r+o}function I(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?q():null}}function W(e){const t=function(e){const{history:t,location:n}=window,r={value:_(e,n)},o={value:t.state};function a(r,a,c){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:G()+e+r;try{t[c?"replaceState":"pushState"](a,"",i),o.value=a}catch(l){n[c?"replace":"assign"](i)}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const c=h({},o.value,t.state,{forward:e,scroll:q()});a(c.current,c,!0),a(e,h({},I(r.value,e,null),{position:c.position+1},n),!1),r.value=e},replace:function(e,n){a(e,h({},t.state,I(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}}}(e=function(e){if(!e)if(p){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),y(e)}(e)),n=function(e,t,n,r){let o=[],a=[],c=null;const s=({state:a})=>{const s=_(e,location),i=n.value,l=t.value;let u=0;if(a){if(n.value=s,t.value=a,c&&c===i)return void(c=null);u=l?a.position-l.position:0}else r(s);o.forEach((e=>{e(n.value,i,{delta:u,type:P.pop,direction:u?u>0?C.forward:C.back:C.unknown})}))};function i(){const{history:e}=window;e.state&&e.replaceState(h({},e.state,{scroll:q()}),"")}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",i,{passive:!0}),{pauseListeners:function(){c=n.value},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",i)}}}(e,t.state,t.location,t.replace);const r=h({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e)},createHref:A.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function D(e){return(e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),W(e)}function F(e){return"string"==typeof e||"symbol"==typeof e}const U={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},$=Symbol("");var T,K;function V(e,t){return h(new Error,{type:e,[$]:!0},t)}function z(e,t){return e instanceof Error&&$ in e&&(null==t||!!(e.type&t))}(K=T||(T={}))[K.aborted=4]="aborted",K[K.cancelled=8]="cancelled",K[K.duplicated=16]="duplicated";const H="[^/]+?",Q={sensitive:!1,strict:!1,start:!0,end:!0},X=/[.+*?^${}()[\]/\\]/g;function Y(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function N(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=Y(r[n],o[n]);if(e)return e;n++}if(1===Math.abs(o.length-r.length)){if(Z(r))return 1;if(Z(o))return-1}return o.length-r.length}function Z(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const J={type:0,value:""},ee=/[a-zA-Z0-9_]/;function te(e,t,n){const r=function(e,t){const n=h({},Q,t),r=[];let o=n.start?"^":"";const a=[];for(const i of e){const e=i.length?[]:[90];n.strict&&!i.length&&(o+="/");for(let t=0;t<i.length;t++){const r=i[t];let c=40+(n.sensitive?.25:0);if(0===r.type)t||(o+="/"),o+=r.value.replace(X,"\\$&"),c+=40;else if(1===r.type){const{value:e,repeatable:n,optional:l,regexp:u}=r;a.push({name:e,repeatable:n,optional:l});const f=u||H;if(f!==H){c+=10;try{new RegExp("(".concat(f,")"))}catch(s){throw new Error('Invalid custom RegExp for param "'.concat(e,'" (').concat(f,"): ")+s.message)}}let p=n?"((?:".concat(f,")(?:/(?:").concat(f,"))*)"):"(".concat(f,")");t||(p=l&&i.length<2?"(?:/".concat(p,")"):"/"+p),l&&(p+="?"),o+=p,c+=20,l&&(c+=-8),n&&(c+=-20),".*"===f&&(c+=-50)}e.push(c)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");return{re:c,score:r,keys:a,parse:function(e){const t=e.match(c),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",o=a[r-1];n[o.name]=e&&o.repeatable?e.split("/"):e}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:s}=e,i=a in t?t[a]:"";if(g(i)&&!c)throw new Error('Provided param "'.concat(a,'" is an array but it is not repeatable (* or + modifiers)'));const l=g(i)?i.join("/"):i;if(!l){if(!s)throw new Error('Missing required param "'.concat(a,'"'));o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=l}}return n||"/"}}}(function(e){if(!e)return[[]];if("/"===e)return[[J]];if(!e.startsWith("/"))throw new Error('Invalid path "'.concat(e,'"'));function t(e){throw new Error("ERR (".concat(n,')/"').concat(l,'": ').concat(e))}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[]}let s,i=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t("A repeatable param (".concat(l,") must be alone in its segment. eg: '/:ids+.")),a.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="")}function p(){l+=s}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),c()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:ee.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t('Unfinished custom RegExp for param "'.concat(l,'"')),f(),c(),o}(e.path),n),o=h(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function ne(e,t){const n=[],r=new Map;function o(e,n,r){const s=!r,i=function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:oe(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);i.aliasOf=r&&r.record;const l=se(t,e),u=[i];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(h({},i,{components:r?r.record.components:i.components,path:e,aliasOf:r?r.record:i}))}let f,p;for(const t of u){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(f=te(t,n,l),r?r.alias.push(f):(p=p||f,p!==f&&p.alias.push(f),s&&e.name&&!ae(f)&&a(e.name)),i.children){const e=i.children;for(let t=0;t<e.length;t++)o(e[t],f,r&&r.children[t])}r=r||f,(f.record.components&&Object.keys(f.record.components).length||f.record.name||f.record.redirect)&&c(f)}return p?()=>{a(p)}:m}function a(e){if(F(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a))}}function c(e){let t=0;for(;t<n.length&&N(e,n[t])>=0&&(e.record.path!==n[t].record.path||!ie(e,n[t]));)t++;n.splice(t,0,e),e.record.name&&!ae(e)&&r.set(e.record.name,e)}return t=se({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,c,s={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw V(1,{location:e});c=o.record.name,s=h(re(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&re(e.params,o.keys.map((e=>e.name)))),a=o.stringify(s)}else if("path"in e)a=e.path,o=n.find((e=>e.re.test(a))),o&&(s=o.parse(a),c=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw V(1,{location:e,currentLocation:t});c=o.record.name,s=h({},t.params,e.params),a=o.stringify(s)}const i=[];let l=o;for(;l;)i.unshift(l.record),l=l.parent;return{name:c,path:a,params:s,matched:i,meta:ce(i)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function re(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function oe(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function ae(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ce(e){return e.reduce(((e,t)=>h(e,t.meta)),{})}function se(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ie(e,t){return t.children.some((t=>t===e||ie(e,t)))}const le=/#/g,ue=/&/g,fe=/\//g,pe=/=/g,he=/\?/g,de=/\+/g,me=/%5B/g,ge=/%5D/g,ve=/%5E/g,ye=/%60/g,be=/%7B/g,we=/%7C/g,Ee=/%7D/g,Oe=/%20/g;function ke(e){return encodeURI(""+e).replace(we,"|").replace(me,"[").replace(ge,"]")}function Re(e){return ke(e).replace(de,"%2B").replace(Oe,"+").replace(le,"%23").replace(ue,"%26").replace(ye,"`").replace(be,"{").replace(Ee,"}").replace(ve,"^")}function Pe(e){return null==e?"":function(e){return ke(e).replace(le,"%23").replace(he,"%3F")}(e).replace(fe,"%2F")}function xe(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}function Ce(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const e=n[r].replace(de," "),o=e.indexOf("="),a=xe(o<0?e:e.slice(0,o)),c=o<0?null:xe(e.slice(o+1));if(a in t){let e=t[a];g(e)||(e=t[a]=[e]),e.push(c)}else t[a]=c}return t}function je(e){let t="";for(let n in e){const r=e[n];if(n=Re(n).replace(pe,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(g(r)?r.map((e=>e&&Re(e))):[r&&Re(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function Se(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=g(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}const Ae=Symbol(""),qe=Symbol(""),Le=Symbol(""),Me=Symbol(""),Be=Symbol("");function Ge(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e.slice(),reset:function(){e=[]}}}function _e(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((c,s)=>{const i=e=>{var i;!1===e?s(V(4,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(i=e)||i&&"object"==typeof i?s(V(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c())},l=e.call(r&&r.instances[o],t,n,i);let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>s(e)))}))}function Ie(e,t,n,r){const o=[];for(const c of e)for(const e in c.components){let s=c.components[e];if("beforeRouteEnter"===t||c.instances[e])if("object"==typeof(a=s)||"displayName"in a||"props"in a||"__vccOpts"in a){const a=(s.__vccOpts||s)[t];a&&o.push(_e(a,n,r,c,e))}else{let a=s();o.push((()=>a.then((o=>{if(!o)return Promise.reject(new Error("Couldn't resolve component \"".concat(e,'" at "').concat(c.path,'"')));const a=(s=o).__esModule||"Module"===s[Symbol.toStringTag]?o.default:o;var s;c.components[e]=a;const i=(a.__vccOpts||a)[t];return i&&_e(i,n,r,c,e)()}))))}}var a;return o}function We(e){const n=r(Le),o=r(Me),a=s((()=>n.resolve(t(e.to)))),c=s((()=>{const{matched:e}=a.value,{length:t}=e,n=e[t-1],r=o.matched;if(!n||!r.length)return-1;const c=r.findIndex(E.bind(null,n));if(c>-1)return c;const s=Fe(e[t-2]);return t>1&&Fe(n)===s&&r[r.length-1].path!==s?r.findIndex(E.bind(null,e[t-2])):c})),i=s((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!g(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(o.params,a.value.params))),l=s((()=>c.value>-1&&c.value===o.matched.length-1&&O(o.params,a.value.params)));return{route:a,href:s((()=>a.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return!0}(r)?n[t(e.replace)?"replace":"push"](t(e.to)).catch(m):Promise.resolve()}}}const De=a({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:We,setup(e,{slots:t}){const n=c(We(e)),{options:o}=r(Le),a=s((()=>({[Ue(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,[Ue(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const r=t.default&&t.default(n);return e.custom?r:i("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},r)}}});function Fe(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Ue=(e,t,n)=>null!=e?e:null!=t?t:n;function $e(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Te=a({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:o}){const a=r(Be),c=s((()=>e.route||a.value)),p=r(qe,0),d=s((()=>{let e=t(p);const{matched:n}=c.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),m=s((()=>c.value.matched[d.value]));l(qe,s((()=>d.value+1))),l(Ae,m),l(Be,c);const g=u();return f((()=>[g.value,m.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&E(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const t=c.value,r=e.name,a=m.value,s=a&&a.components[r];if(!s)return $e(o.default,{Component:s,route:t});const l=a.props[r],u=l?!0===l?t.params:"function"==typeof l?l(t):l:null,f=i(s,h({},u,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(a.instances[r]=null)},ref:g}));return $e(o.default,{Component:f,route:t})||f}}});function Ke(r){const a=ne(r.routes,r),c=r.parseQuery||Ce,s=r.stringifyQuery||je,i=r.history,l=Ge(),u=Ge(),f=Ge(),v=e(U);let y=U;p&&r.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const w=d.bind(null,(e=>""+e)),k=d.bind(null,Pe),R=d.bind(null,xe);function x(e,t){if(t=h({},t||v.value),"string"==typeof e){const n=b(c,e,t.path),r=a.resolve({path:n.path},t),o=i.createHref(n.fullPath);return h(n,r,{params:R(r.params),hash:xe(n.hash),redirectedFrom:void 0,href:o})}let n;if("path"in e)n=h({},e,{path:b(c,e.path,t.path).path});else{const r=h({},e.params);for(const e in r)null==r[e]&&delete r[e];n=h({},e,{params:k(r)}),t.params=k(t.params)}const r=a.resolve(n,t),o=e.hash||"";r.params=w(R(r.params));const l=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(s,h({},e,{hash:(u=o,ke(u).replace(be,"{").replace(Ee,"}").replace(ve,"^")),path:r.path}));var u;const f=i.createHref(l);return h({fullPath:l,hash:o,query:s===je?Se(e.query):e.query||{}},r,{redirectedFrom:void 0,href:f})}function C(e){return"string"==typeof e?b(c,e,v.value.path):h({},e)}function j(e,t){if(y!==e)return V(8,{from:t,to:e})}function S(e){return G(e)}function A(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=C(r):{path:r},r.params={}),h({query:e.query,hash:e.hash,params:"path"in r?{}:e.params},r)}}function G(e,t){const n=y=x(e),r=v.value,o=e.state,a=e.force,c=!0===e.replace,i=A(n);if(i)return G(h(C(i),{state:"object"==typeof i?h({},o,i.state):o,force:a,replace:c}),t||n);const l=n;let u;return l.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&E(t.matched[r],n.matched[o])&&O(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(s,r,n)&&(u=V(16,{to:l,from:r}),Z(r,r,!0,!1)),(u?Promise.resolve(u):W(l,r)).catch((e=>z(e)?z(e,2)?e:N(e):Y(e,l,r))).then((e=>{if(e){if(z(e,2))return G(h({replace:c},C(e.to),{state:"object"==typeof e.to?h({},o,e.to.state):o,force:a}),t||l)}else e=$(l,r,!0,c,o);return D(l,r,e),e}))}function _(e,t){const n=j(e,t);return n?Promise.reject(n):Promise.resolve()}function I(e){const t=te.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function W(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>E(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(t.matched.find((e=>E(e,s)))||o.push(s))}return[n,r,o]}(e,t);n=Ie(r.reverse(),"beforeRouteLeave",e,t);for(const s of r)s.leaveGuards.forEach((r=>{n.push(_e(r,e,t))}));const c=_.bind(null,e,t);return n.push(c),oe(n).then((()=>{n=[];for(const r of l.list())n.push(_e(r,e,t));return n.push(c),oe(n)})).then((()=>{n=Ie(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(_e(r,e,t))}));return n.push(c),oe(n)})).then((()=>{n=[];for(const r of a)if(r.beforeEnter)if(g(r.beforeEnter))for(const o of r.beforeEnter)n.push(_e(o,e,t));else n.push(_e(r.beforeEnter,e,t));return n.push(c),oe(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Ie(a,"beforeRouteEnter",e,t),n.push(c),oe(n)))).then((()=>{n=[];for(const r of u.list())n.push(_e(r,e,t));return n.push(c),oe(n)})).catch((e=>z(e,8)?e:Promise.reject(e)))}function D(e,t,n){f.list().forEach((r=>I((()=>r(e,t,n)))))}function $(e,t,n,r,o){const a=j(e,t);if(a)return a;const c=t===U,s=p?history.state:{};n&&(r||c?i.replace(e.fullPath,h({scroll:c&&s&&s.scroll},o)):i.push(e.fullPath,o)),v.value=e,Z(e,t,n,c),N()}let T;function K(){T||(T=i.listen(((e,t,n)=>{if(!re.listening)return;const r=x(e),o=A(r);if(o)return void G(h(o,{replace:!0}),r).catch(m);y=r;const a=v.value;var c,s;p&&(c=M(a.fullPath,n.delta),s=q(),B.set(c,s)),W(r,a).catch((e=>z(e,12)?e:z(e,2)?(G(e.to,r).then((e=>{z(e,20)&&!n.delta&&n.type===P.pop&&i.go(-1,!1)})).catch(m),Promise.reject()):(n.delta&&i.go(-n.delta,!1),Y(e,r,a)))).then((e=>{(e=e||$(r,a,!1))&&(n.delta&&!z(e,8)?i.go(-n.delta,!1):n.type===P.pop&&z(e,20)&&i.go(-1,!1)),D(r,a,e)})).catch(m)})))}let H,Q=Ge(),X=Ge();function Y(e,t,n){N(e);const r=X.list();return r.length&&r.forEach((r=>r(e,t,n))),Promise.reject(e)}function N(e){return H||(H=!e,K(),Q.list().forEach((([t,n])=>e?n(e):t())),Q.reset()),e}function Z(e,t,n,a){const{scrollBehavior:c}=r;if(!p||!c)return Promise.resolve();const s=!n&&function(e){const t=B.get(e);return B.delete(e),t}(M(e.fullPath,0))||(a||!n)&&history.state&&history.state.scroll||null;return o().then((()=>c(e,t,s))).then((e=>e&&L(e))).catch((n=>Y(n,e,t)))}const J=e=>i.go(e);let ee;const te=new Set,re={currentRoute:v,listening:!0,addRoute:function(e,t){let n,r;return F(e)?(n=a.getRecordMatcher(e),r=t):r=e,a.addRoute(r,n)},removeRoute:function(e){const t=a.getRecordMatcher(e);t&&a.removeRoute(t)},hasRoute:function(e){return!!a.getRecordMatcher(e)},getRoutes:function(){return a.getRoutes().map((e=>e.record))},resolve:x,options:r,push:S,replace:function(e){return S(h(C(e),{replace:!0}))},go:J,back:()=>J(-1),forward:()=>J(1),beforeEach:l.add,beforeResolve:u.add,afterEach:f.add,onError:X.add,isReady:function(){return H&&v.value!==U?Promise.resolve():new Promise(((e,t)=>{Q.add([e,t])}))},install(e){e.component("RouterLink",De),e.component("RouterView",Te),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t(v)}),p&&!ee&&v.value===U&&(ee=!0,S(i.location).catch((e=>{})));const r={};for(const t in U)Object.defineProperty(r,t,{get:()=>v.value[t],enumerable:!0});e.provide(Le,this),e.provide(Me,n(r)),e.provide(Be,v);const o=e.unmount;te.add(e),e.unmount=function(){te.delete(e),te.size<1&&(y=U,T&&T(),T=null,v.value=U,ee=!1,H=!1),o()}}};function oe(e){return e.reduce(((e,t)=>e.then((()=>I(t)))),Promise.resolve())}return re}function Ve(){return r(Le)}function ze(){return r(Me)}export{D as a,ze as b,Ke as c,Ve as u};
