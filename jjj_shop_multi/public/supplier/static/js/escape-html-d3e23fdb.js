import{g as e}from"./call-bind-a6dd5c06.js";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var a=/["'&<>]/;const r=e((function(e){var r,t=""+e,s=a.exec(t);if(!s)return t;var c="",n=0,i=0;for(n=s.index;n<t.length;n++){switch(t.charCodeAt(n)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}i!==n&&(c+=t.substring(i,n)),i=n+1,c+=r}return i!==n?c+t.substring(i,n):c}));export{r as e};
