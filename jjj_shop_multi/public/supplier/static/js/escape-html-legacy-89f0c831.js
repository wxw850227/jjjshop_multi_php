System.register(["./call-bind-legacy-ce7de972.js"],(function(e,t){"use strict";var r;return{setters:[function(e){r=e.g}],execute:function(){
/*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */
var t=/["'&<>]/;e("e",r((function(e){var r,a=""+e,n=t.exec(a);if(!n)return a;var c="",s=0,u=0;for(s=n.index;s<a.length;s++){switch(a.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}u!==s&&(c+=a.substring(u,s)),u=s+1,c+=r}return u!==s?c+a.substring(u,s):c})))}}}));
