(function(){var t={3485:function(t,e,n){"use strict";var o=n(9963),r=n(6252);const i={class:"header"};function s(t,e,n,o,s,u){const c=(0,r.up)("CurrentCid"),a=(0,r.up)("OperationResult"),l=(0,r.up)("UploadFiles"),f=(0,r.up)("FileBrowser"),p=(0,r.up)("IpfsInfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("header",i,[(0,r.Wm)(c),(0,r.Wm)(a),(0,r.Wm)(l)]),(0,r.Wm)(f),(0,r.Wm)(p)],64)}var u=n(3577);const c={key:0,class:"ipfs-info"},a={id:"ipfs-info-id"},l={id:"ipfs-info-agent"};function f(t,e,n,o,i,s){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("h3",null,(0,u.zw)(s.status),1),s.online?((0,r.wg)(),(0,r.iD)("div",c,[(0,r._)("h3",null,[(0,r.Uk)(" ID: "),(0,r._)("span",a,(0,u.zw)(s.node.id),1)]),(0,r._)("h3",null,[(0,r.Uk)(" Agent version: "),(0,r._)("span",l,(0,u.zw)(s.node.agentVersion),1)])])):(0,r.kq)("",!0)],64)}var p={name:"IpfsInfo",computed:{online(){return this.$store.state.ipfs.online},node(){return this.$store.state.ipfs.node},status(){return this.$store.state.ipfs.status}}},d=n(3744);const v=(0,d.Z)(p,[["render",f]]);var g=v;const m=t=>((0,r.dD)("data-v-73aebac1"),t=t(),(0,r.Cn)(),t),h={class:"browser"},b=m((()=>(0,r._)("h3",null,"Browser",-1)));function w(t,e,n,o,i,s){return(0,r.wg)(),(0,r.iD)("div",h,[b,(0,r._)("button",{onClick:e[0]||(e[0]=t=>s.getFolder())}," GetRoot Folder ")])}var _={name:"FileBrowser",methods:{getFolder(t="/"){this.$get(t)}}};const y=(0,d.Z)(_,[["render",w],["__scopeId","data-v-73aebac1"]]);var O=y;const I={class:"current-cid"},C={key:0};function j(t,e,n,o,i,s){return(0,r.wg)(),(0,r.iD)("div",I,[null!=s.current?((0,r.wg)(),(0,r.iD)("div",C,(0,u.zw)(s.current._path)+" : "+(0,u.zw)(s.current.cid.toString())+" : "+(0,u.zw)(s.current.type),1)):(0,r.kq)("",!0)])}var k={name:"CurrentCid",computed:{current(){return this.$store.state.ipfs.current}}};const $=(0,d.Z)(k,[["render",j],["__scopeId","data-v-10bffe95"]]);var P=$;const F={class:"upload-files"};function S(t,e,n,o,i,s){return(0,r.wg)(),(0,r.iD)("div",F,[(0,r._)("input",{type:"file",ref:"input",multiple:"",onChange:e[0]||(e[0]=(...t)=>s.upload&&s.upload(...t))},null,544)])}var D={name:"UploadFiles",methods:{upload(){let t=this.$refs.input.files;console.log(t),this.$upload(t)}}};const x=(0,d.Z)(D,[["render",S],["__scopeId","data-v-0e3b5311"]]);var z=x;const R={key:0,class:"operation-result"};function Z(t,e,n,o,i,s){return null!=s.result?((0,r.wg)(),(0,r.iD)("div",R," Result : "+(0,u.zw)(s.result),1)):(0,r.kq)("",!0)}var T={name:"OperationResult",computed:{result(){return this.$store.state.ipfs.result}}};const U=(0,d.Z)(T,[["render",Z],["__scopeId","data-v-fc91d644"]]);var W=U,B={name:"App",components:{IpfsInfo:g,FileBrowser:O,CurrentCid:P,UploadFiles:z,OperationResult:W},created(){this.$initIpfs()}};const M=(0,d.Z)(B,[["render",s]]);var q=M,A=(n(7658),n(8251));console.log(A);var E={install:(t,e)=>{let n,o=e.store;t.config.globalProperties.$initIpfs=async function(){try{n=t.config.globalProperties.$ipfs=await A.create(e);let r=await n.id();console.log(n,r),o.commit("ipfs/setStatus","Connected to IPFS =)"),o.commit("ipfs/setOnline",n.isOnline()),o.commit("ipfs/setIpfsNode",r)}catch(r){o.commit("ipfs/setStatut",`Error: ${r}`)}},t.config.globalProperties.$get=async function(t="/"){let e=await n.files.stat(t);e._path=t,o.commit("ipfs/setCurrent",e)},t.config.globalProperties.$upload=async function(t){const e=[];for await(const o of n.addAll(t))e.push(o);return console.log(e),o.commit("ipfs/setResult",e),e}}},N=n(3907);const H=()=>({node:null,current:null,status:"Connecting to IPFS...",online:!1,result:null}),Y={setCurrent(t,e){console.log(e),console.log(e.cid.toString()),t.current=e},setIpfsNode(t,e){t.node=e},setStatus(t,e){t.status=e},setOnline(t,e){t.online=e},setResult(t,e){t.result=e}},G={};var V={namespaced:!0,state:H,actions:G,mutations:Y};const J=(0,N.MT)({state:{},getters:{},mutations:{},actions:{},modules:{ipfs:V}});var K=J;const L=(0,o.ri)(q);L.use(K),L.use(E,{store:K}),L.mount("#app")},7420:function(){},5856:function(){},5883:function(){},2596:function(){},3897:function(){},5819:function(){},1265:function(){},5539:function(){}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,o,r,i){if(!o){var s=1/0;for(l=0;l<t.length;l++){o=t[l][0],r=t[l][1],i=t[l][2];for(var u=!0,c=0;c<o.length;c++)(!1&i||s>=i)&&Object.keys(n.O).every((function(t){return n.O[t](o[c])}))?o.splice(c--,1):(u=!1,i<s&&(s=i));if(u){t.splice(l--,1);var a=r();void 0!==a&&(e=a)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[o,r,i]}}(),function(){var t,e=Object.getPrototypeOf?function(t){return Object.getPrototypeOf(t)}:function(t){return t.__proto__};n.t=function(o,r){if(1&r&&(o=this(o)),8&r)return o;if("object"===typeof o&&o){if(4&r&&o.__esModule)return o;if(16&r&&"function"===typeof o.then)return o}var i=Object.create(null);n.r(i);var s={};t=t||[null,e({}),e([]),e(e)];for(var u=2&r&&o;"object"==typeof u&&!~t.indexOf(u);u=e(u))Object.getOwnPropertyNames(u).forEach((function(t){s[t]=function(){return o[t]}}));return s["default"]=function(){return o},n.d(i,s),i}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,i,s=o[0],u=o[1],c=o[2],a=0;if(s.some((function(e){return 0!==t[e]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(c)var l=c(n)}for(e&&e(o);a<s.length;a++)i=s[a],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},o=self["webpackChunkexample_browser_vue_3"]=self["webpackChunkexample_browser_vue_3"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(3485)}));o=n.O(o)})();
//# sourceMappingURL=app.aeb0c9d7.js.map