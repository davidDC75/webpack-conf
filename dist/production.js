(()=>{"use strict";var e,t,r,o,n={},a={};function i(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return n[e].call(r.exports,r,r.exports,i),r.exports}i.m=n,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"==typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"==typeof r.then)return r}var n=Object.create(null);i.r(n);var a={};e=e||[null,t({}),t([]),t(t)];for(var c=2&o&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>a[e]=()=>r[e]));return a.default=()=>r,i.d(n,a),n},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>e+".production.js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},o="webpack1:",i.l=(e,t,n,a)=>{if(r[e])r[e].push(t);else{var c,l;if(void 0!==n)for(var u=document.getElementsByTagName("script"),s=0;s<u.length;s++){var p=u[s];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==o+n){c=p;break}}c||(l=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",o+n),c.src=e),r[e]=[t];var d=(t,o)=>{c.onerror=c.onload=null,clearTimeout(f);var n=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),n&&n.forEach((e=>e(o))),t)return t(o)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),l&&document.head.appendChild(c)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={179:0};i.f.j=(t,r)=>{var o=i.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var a=i.p+i.u(t),c=new Error;i.l(a,(r=>{if(i.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",c.name="ChunkLoadError",c.type=n,c.request=a,o[1](c)}}),"chunk-"+t,t)}};var t=(t,r)=>{var o,n,[a,c,l]=r,u=0;if(a.some((t=>0!==e[t]))){for(o in c)i.o(c,o)&&(i.m[o]=c[o]);if(l)l(i)}for(t&&t(r);u<a.length;u++)n=a[u],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0},r=self.webpackChunkwebpack1=self.webpackChunkwebpack1||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();let[c,,l]=[1,2,4,5];var u;u=c,console.log(u),console.log(u),console.log({cache:!0}),console.log({compress:!0}),document.getElementById("button").addEventListener("click",(function(){i.e(729).then(i.t.bind(i,755,23)).then((e=>{(0,e.default)("body").css("backgroundColor","#9F9F9F")}))}))})();