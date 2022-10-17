"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[7668,3172],{81049:(e,t,s)=>{s.d(t,{Z:()=>A});var r,i=s(43697),n=s(3894),o=s(32448),a=s(22974),h=s(70586),l=s(71143),c=s(1654),u=s(5600),d=s(75215),f=s(52421),m=s(52011),p=s(58971),g=s(39020);class _{constructor(){this._observers=[]}observe(e){return this._observers.includes(e)||this._observers.push(e),new g.X(this._observers,e)}notify(){const e=this._observers.slice();for(let t=0;t<e.length;++t){const s=e[t];s.onInvalidated(),s.onCommitted()}}}const b=new l.Z(class{constructor(){this.target=null,this.cancellable=!1,this.defaultPrevented=!1,this.item=void 0,this.type=void 0}preventDefault(){this.cancellable&&(this.defaultPrevented=!0)}reset(e){this.defaultPrevented=!1,this.item=e}},void 0,(e=>{e.item=null,e.target=null,e.defaultPrevented=!1,e.cancellable=!1})),v=()=>{};function y(e){return e?e instanceof k?e.toArray():e.length?Array.prototype.slice.apply(e):[]:[]}function w(e){if(e&&e.length)return e[0]}function C(e,t,s,r){const i=Math.min(e.length-s,t.length-r);let n=0;for(;n<i&&e[s+n]===t[r+n];)n++;return n}function E(e,t,s,r){t&&t.forEach(((t,i,n)=>{e.push(t),E(e,s.call(r,t,i,n),s,r)}))}const q=new Set,x=new Set,O=new Set,L=new Map;let T=0,k=r=class extends o.Z.EventedAccessor{constructor(e){super(e),this._chgListeners=[],this._notifications=null,this._timer=null,this._observable=new _,this.length=0,this._items=[],Object.defineProperty(this,"uid",{value:T++})}static isCollection(e){return null!=e&&e instanceof r}normalizeCtorArgs(e){return e?Array.isArray(e)||e instanceof r?{items:e}:e:{}}destroy(){this.removeAll()}*[Symbol.iterator](){yield*this.items}get items(){return(0,p.it)(this._observable),this._items}set items(e){this._emitBeforeChanges(1)||(this._splice(0,this.length,y(e)),this._emitAfterChanges(1))}hasEventListener(e){return"change"===e?this._chgListeners.length>0:this._emitter.hasEventListener(e)}on(e,t){if("change"===e){const e=this._chgListeners,s={removed:!1,callback:t};return e.push(s),this._notifications&&this._notifications.push({listeners:e.slice(),items:this._items.slice(),changes:[]}),{remove(){this.remove=v,s.removed=!0,e.splice(e.indexOf(s),1)}}}return this._emitter.on(e,t)}once(e,t){const s=this.on(e,t);return{remove(){s.remove()}}}add(e,t){if((0,p.it)(this._observable),this._emitBeforeChanges(1))return this;const s=this.getNextIndex(null!=t?t:null);return this._splice(s,0,[e]),this._emitAfterChanges(1),this}addMany(e,t=this._items.length){if((0,p.it)(this._observable),!e||!e.length)return this;if(this._emitBeforeChanges(1))return this;const s=this.getNextIndex(t);return this._splice(s,0,y(e)),this._emitAfterChanges(1),this}removeAll(){if((0,p.it)(this._observable),!this.length||this._emitBeforeChanges(2))return[];const e=this._splice(0,this.length)||[];return this._emitAfterChanges(2),e}clone(){return(0,p.it)(this._observable),this._createNewInstance({items:this._items.map(a.d9)})}concat(...e){(0,p.it)(this._observable);const t=e.map(y);return this._createNewInstance({items:this._items.concat(...t)})}drain(e,t){if((0,p.it)(this._observable),!this.length||this._emitBeforeChanges(2))return;const s=(0,h.j0)(this._splice(0,this.length)),r=s.length;for(let i=0;i<r;i++)e.call(t,s[i],i,s);this._emitAfterChanges(2)}every(e,t){return(0,p.it)(this._observable),this._items.every(e,t)}filter(e,t){let s;return(0,p.it)(this._observable),s=2===arguments.length?this._items.filter(e,t):this._items.filter(e),this._createNewInstance({items:s})}find(e,t){return(0,p.it)(this._observable),this._items.find(e,t)}findIndex(e,t){return(0,p.it)(this._observable),this._items.findIndex(e,t)}flatten(e,t){(0,p.it)(this._observable);const s=[];return E(s,this,e,t),new r(s)}forEach(e,t){return(0,p.it)(this._observable),this._items.forEach(e,t)}getItemAt(e){return(0,p.it)(this._observable),this._items[e]}getNextIndex(e){(0,p.it)(this._observable);const t=this.length;return(e=null==e?t:e)<0?e=0:e>t&&(e=t),e}includes(e,t=0){return(0,p.it)(this._observable),this._items.includes(e,t)}indexOf(e,t=0){return(0,p.it)(this._observable),this._items.indexOf(e,t)}join(e=","){return(0,p.it)(this._observable),this._items.join(e)}lastIndexOf(e,t=this.length-1){return(0,p.it)(this._observable),this._items.lastIndexOf(e,t)}map(e,t){(0,p.it)(this._observable);const s=this._items.map(e,t);return new r({items:s})}reorder(e,t=this.length-1){(0,p.it)(this._observable);const s=this.indexOf(e);if(-1!==s){if(t<0?t=0:t>=this.length&&(t=this.length-1),s!==t){if(this._emitBeforeChanges(4))return e;this._splice(s,1),this._splice(t,0,[e]),this._emitAfterChanges(4)}return e}}pop(){if((0,p.it)(this._observable),!this.length||this._emitBeforeChanges(2))return;const e=w(this._splice(this.length-1,1));return this._emitAfterChanges(2),e}push(...e){return(0,p.it)(this._observable),this._emitBeforeChanges(1)||(this._splice(this.length,0,e),this._emitAfterChanges(1)),this.length}reduce(e,t){(0,p.it)(this._observable);const s=this._items;return 2===arguments.length?s.reduce(e,t):s.reduce(e)}reduceRight(e,t){(0,p.it)(this._observable);const s=this._items;return 2===arguments.length?s.reduceRight(e,t):s.reduceRight(e)}remove(e){return(0,p.it)(this._observable),this.removeAt(this.indexOf(e))}removeAt(e){if((0,p.it)(this._observable),e<0||e>=this.length||this._emitBeforeChanges(2))return;const t=w(this._splice(e,1));return this._emitAfterChanges(2),t}removeMany(e){if((0,p.it)(this._observable),!e||!e.length||this._emitBeforeChanges(2))return[];const t=e instanceof r?e.toArray():e,s=this._items,i=[],n=t.length;for(let e=0;e<n;e++){const r=t[e],n=s.indexOf(r);if(n>-1){const r=1+C(t,s,e+1,n+1),o=this._splice(n,r);o&&o.length>0&&i.push.apply(i,o),e+=r-1}}return this._emitAfterChanges(2),i}reverse(){if((0,p.it)(this._observable),this._emitBeforeChanges(4))return this;const e=this._splice(0,this.length);return e&&(e.reverse(),this._splice(0,0,e)),this._emitAfterChanges(4),this}shift(){if((0,p.it)(this._observable),!this.length||this._emitBeforeChanges(2))return;const e=w(this._splice(0,1));return this._emitAfterChanges(2),e}slice(e=0,t=this.length){return(0,p.it)(this._observable),this._createNewInstance({items:this._items.slice(e,t)})}some(e,t){return(0,p.it)(this._observable),this._items.some(e,t)}sort(e){if((0,p.it)(this._observable),!this.length||this._emitBeforeChanges(4))return this;const t=(0,h.j0)(this._splice(0,this.length));return arguments.length?t.sort(e):t.sort(),this._splice(0,0,t),this._emitAfterChanges(4),this}splice(e,t,...s){(0,p.it)(this._observable);const r=(t?2:0)|(s.length?1:0);if(this._emitBeforeChanges(r))return[];const i=this._splice(e,t,s)||[];return this._emitAfterChanges(r),i}toArray(){return(0,p.it)(this._observable),this._items.slice()}toJSON(){return(0,p.it)(this._observable),this.toArray()}toLocaleString(){return(0,p.it)(this._observable),this._items.toLocaleString()}toString(){return(0,p.it)(this._observable),this._items.toString()}unshift(...e){return(0,p.it)(this._observable),!e.length||this._emitBeforeChanges(1)||(this._splice(0,0,e),this._emitAfterChanges(1)),this.length}_createNewInstance(e){return new this.constructor(e)}_splice(e,t,s){const r=this._items,i=this.itemType;let n,o;if(!this._notifications&&this.hasEventListener("change")&&(this._notifications=[{listeners:this._chgListeners.slice(),items:this._items.slice(),changes:[]}],this._timer&&this._timer.remove(),this._timer=(0,c.Os)((()=>this._dispatchChange()))),t){if(o=r.splice(e,t),this.hasEventListener("before-remove")){const t=b.acquire();t.target=this,t.cancellable=!0;for(let s=0,i=o.length;s<i;s++)n=o[s],t.reset(n),this.emit("before-remove",t),t.defaultPrevented&&(o.splice(s,1),r.splice(e,0,n),e+=1,s-=1,i-=1);b.release(t)}if(this.length=this._items.length,this.hasEventListener("after-remove")){const e=b.acquire();e.target=this,e.cancellable=!1;const t=o.length;for(let s=0;s<t;s++)e.reset(o[s]),this.emit("after-remove",e);b.release(e)}}if(s&&s.length){if(i){const e=[];for(const t of s){const s=i.ensureType(t);null==s&&null!=t||e.push(s)}s=e}const t=this.hasEventListener("before-add"),n=this.hasEventListener("after-add"),o=e===this.length;if(t||n){const i=b.acquire();i.target=this,i.cancellable=!0;const a=b.acquire();a.target=this,a.cancellable=!1;for(const h of s)t?(i.reset(h),this.emit("before-add",i),i.defaultPrevented||(o?r.push(h):r.splice(e++,0,h),this._set("length",r.length),n&&(a.reset(h),this.emit("after-add",a)))):(o?r.push(h):r.splice(e++,0,h),this._set("length",r.length),a.reset(h),this.emit("after-add",a));b.release(a),b.release(i)}else{if(o)for(const e of s)r.push(e);else r.splice(e,0,...s);this._set("length",r.length)}}return(s&&s.length||o&&o.length)&&this._notifyChangeEvent(s,o),o}_emitBeforeChanges(e){let t=!1;if(this.hasEventListener("before-changes")){const s=b.acquire();s.target=this,s.cancellable=!0,s.type=e,this.emit("before-changes",s),t=s.defaultPrevented,b.release(s)}return t}_emitAfterChanges(e){if(this.hasEventListener("after-changes")){const t=b.acquire();t.target=this,t.cancellable=!1,t.type=e,this.emit("after-changes",t),b.release(t)}this._observable.notify()}_notifyChangeEvent(e,t){this.hasEventListener("change")&&this._notifications&&this._notifications[this._notifications.length-1].changes.push({added:e,removed:t})}_dispatchChange(){if(this._timer&&(this._timer.remove(),this._timer=null),!this._notifications)return;const e=this._notifications;this._notifications=null;for(const t of e){const e=t.changes;q.clear(),x.clear(),O.clear();for(const{added:t,removed:s}of e){if(t)if(0===O.size&&0===x.size)for(const e of t)q.add(e);else for(const e of t)x.has(e)?(O.add(e),x.delete(e)):O.has(e)||q.add(e);if(s)if(0===O.size&&0===q.size)for(const e of s)x.add(e);else for(const e of s)q.has(e)?q.delete(e):(O.delete(e),x.add(e))}const s=n.Z.acquire();q.forEach((e=>{s.push(e)}));const r=n.Z.acquire();x.forEach((e=>{r.push(e)}));const i=this._items,o=t.items,a=n.Z.acquire();if(O.forEach((e=>{o.indexOf(e)!==i.indexOf(e)&&a.push(e)})),t.listeners&&(s.length||r.length||a.length)){const e={target:this,added:s,removed:r,moved:a},i=t.listeners.length;for(let s=0;s<i;s++){const r=t.listeners[s];r.removed||r.callback.call(this,e)}}n.Z.release(s),n.Z.release(r),n.Z.release(a)}q.clear(),x.clear(),O.clear()}};k.ofType=e=>{if(!e)return r;if(L.has(e))return L.get(e);let t=null;if("function"==typeof e)t=e.prototype.declaredClass;else if(e.base)t=e.base.prototype.declaredClass;else for(const s in e.typeMap){const r=e.typeMap[s].prototype.declaredClass;t?t+=` | ${r}`:t=r}let s=class extends r{};return(0,i._)([(0,f.c)({Type:e,ensureType:"function"==typeof e?(0,d.se)(e):(0,d.N7)(e)})],s.prototype,"itemType",void 0),s=(0,i._)([(0,m.j)(`esri.core.Collection<${t}>`)],s),L.set(e,s),s},(0,i._)([(0,u.Cb)()],k.prototype,"length",void 0),(0,i._)([(0,u.Cb)()],k.prototype,"items",null),k=r=(0,i._)([(0,m.j)("esri.core.Collection")],k);const A=k},32448:(e,t,s)=>{s.d(t,{Z:()=>h});var r=s(43697),i=s(15923),n=s(50758),o=s(52011);class a{constructor(){this._emitter=new a.EventEmitter(this)}emit(e,t){return this._emitter.emit(e,t)}on(e,t){return this._emitter.on(e,t)}once(e,t){return this._emitter.once(e,t)}hasEventListener(e){return this._emitter.hasEventListener(e)}}!function(e){class t{constructor(e=null){this.target=e,this._listenersMap=null}clear(){this._listenersMap&&this._listenersMap.clear(),this._listenersMap=null}emit(e,t){const s=this._listenersMap&&this._listenersMap.get(e);if(!s)return!1;const r=this.target||this;return[...s].forEach((e=>{e.call(r,t)})),s.length>0}on(e,t){if(Array.isArray(e)){const s=e.map((e=>this.on(e,t)));return(0,n.AL)(s)}if(e.indexOf(",")>-1)throw new TypeError("Evented.on() with a comma delimited string of event types is not supported");this._listenersMap||(this._listenersMap=new Map);const s=this._listenersMap.get(e)||[];return s.push(t),this._listenersMap.set(e,s),{remove:()=>{const s=this._listenersMap&&this._listenersMap.get(e)||[],r=s.indexOf(t);r>=0&&s.splice(r,1)}}}once(e,t){const s=this.on(e,(e=>{s.remove(),t.call(null,e)}));return s}hasEventListener(e){const t=this._listenersMap&&this._listenersMap.get(e);return null!=t&&t.length>0}}e.EventEmitter=t,e.EventedMixin=e=>{let s=class extends e{constructor(){super(...arguments),this._emitter=new t}destroy(){this._emitter.clear()}emit(e,t){return this._emitter.emit(e,t)}on(e,t){return this._emitter.on(e,t)}once(e,t){return this._emitter.once(e,t)}hasEventListener(e){return this._emitter.hasEventListener(e)}};return s=(0,r._)([(0,o.j)("esri.core.Evented")],s),s};let s=class extends i.Z{constructor(){super(...arguments),this._emitter=new a.EventEmitter(this)}destroy(){this._emitter.clear()}emit(e,t){return this._emitter.emit(e,t)}on(e,t){return this._emitter.on(e,t)}once(e,t){return this._emitter.once(e,t)}hasEventListener(e){return this._emitter.hasEventListener(e)}};s=(0,r._)([(0,o.j)("esri.core.Evented")],s),e.EventedAccessor=s}(a||(a={}));const h=a},61247:(e,t,s)=>{s.d(t,{Z:()=>c});var r=s(43697),i=s(15923),n=s(81049),o=s(70586),a=s(5600),h=s(52011);let l=class extends i.Z{constructor(e){super(e),this._groups=new Map}destroy(){this.removeAll()}get size(){let e=0;return this._groups.forEach((t=>{e+=t.length})),e}add(e,t){if(!this._isHandle(e)&&!Array.isArray(e)&&!n.Z.isCollection(e))return this;const s=this._getOrCreateGroup(t);return Array.isArray(e)||n.Z.isCollection(e)?e.forEach((e=>this._isHandle(e)&&s.push(e))):s.push(e),this.notifyChange("size"),this}forEach(e,t){if("function"==typeof e)this._groups.forEach((t=>t.forEach(e)));else{const s=this._getGroup(e);s&&t&&s.forEach(t)}}has(e){return this._groups.has(this._ensureGroupKey(e))}remove(e){if(Array.isArray(e)||n.Z.isCollection(e))return e.forEach(this.remove,this),this;if(!this.has(e))return this;const t=this._getGroup(e);for(let e=0;e<t.length;e++)t[e].remove();return this._deleteGroup(e),this.notifyChange("size"),this}removeAll(){return this._groups.forEach((e=>{for(let t=0;t<e.length;t++)e[t].remove()})),this._groups.clear(),this.notifyChange("size"),this}_isHandle(e){return e&&!!e.remove}_getOrCreateGroup(e){if(this.has(e))return this._getGroup(e);const t=[];return this._groups.set(this._ensureGroupKey(e),t),t}_getGroup(e){return(0,o.j0)(this._groups.get(this._ensureGroupKey(e)))}_deleteGroup(e){return this._groups.delete(this._ensureGroupKey(e))}_ensureGroupKey(e){return e||"_default_"}};(0,r._)([(0,a.Cb)({readOnly:!0})],l.prototype,"size",null),l=(0,r._)([(0,h.j)("esri.core.Handles")],l);const c=l},52421:(e,t,s)=>{function r(e){return(t,s)=>{t[s]=e}}s.d(t,{c:()=>r})},17445:(e,t,s)=>{s.d(t,{Ym:()=>n,zF:()=>o}),s(91460);var r=s(70586),i=s(26258);function n(e,t,s={}){return a(e,t,s,h)}function o(e,t,s={}){return a(e,t,s,l)}function a(e,t,s={},n){let o=null;const a=s.once?(e,s)=>{n(e)&&((0,r.hw)(o),t(e,s))}:(e,s)=>{n(e)&&t(e,s)};if(o=(0,i.aQ)(e,a,s.sync,s.equals),s.initial){const t=e();a(t,t)}return o}function h(e){return!0}function l(e){return!!e}s(87538)},3172:(e,t,s)=>{s.r(t),s.d(t,{default:()=>f});var r=s(68773),i=s(40330),n=s(20102),o=s(80442),a=s(22974),h=s(70586),l=s(95330),c=s(17452),u=s(71058),d=s(85958);async function f(e,t){var a;const d=(0,c.HK)(e),_=(0,c.jc)(e);_||d||(e=(0,c.Fv)(e));const b={url:e,requestOptions:{...(0,h.Wg)(t)}};let v=(0,c.oh)(e);if(v){const e=await async function(e,t){if(null!=e.responseData)return e.responseData;if(e.headers&&(t.requestOptions.headers={...t.requestOptions.headers,...e.headers}),e.query&&(t.requestOptions.query={...t.requestOptions.query,...e.query}),e.before){let s,r;try{r=await e.before(t)}catch(e){s=E("request:interceptor",e,t)}if((r instanceof Error||r instanceof n.Z)&&(s=E("request:interceptor",r,t)),s)throw e.error&&e.error(s),s;return r}}(v,b);if(null!=e)return{data:e,getHeader:y,requestOptions:b.requestOptions,url:b.url};v.after||v.error||(v=null)}if(e=b.url,"image"===(t=b.requestOptions).responseType){if((0,o.Z)("host-webworker")||(0,o.Z)("host-node"))throw E("request:invalid-parameters",new Error("responseType 'image' is not supported in Web Workers or Node environment"),b)}else if(d)throw E("request:invalid-parameters",new Error("Data URLs are not supported for responseType = "+t.responseType),b);if("head"===t.method){if(t.body)throw E("request:invalid-parameters",new Error("body parameter cannot be set when method is 'head'"),b);if(d||_)throw E("request:invalid-parameters",new Error("data and blob URLs are not supported for method 'head'"),b)}if(await async function(){(0,o.Z)("host-webworker")?m||(m=await Promise.all([s.e(102),s.e(9884)]).then(s.bind(s,29884))):f._abortableFetch||(f._abortableFetch=globalThis.fetch.bind(globalThis))}(),m)return m.execute(e,t);const w=new AbortController;(0,l.fu)(t,(()=>w.abort()));const C={controller:w,credential:null,credentialToken:null,fetchOptions:null,hasToken:!1,interceptor:v,params:b,redoRequest:!1,useIdentity:p.useIdentity,useProxy:!1,useSSL:!1,withCredentials:!1},L=await async function(e){var t,s;let n,o;await async function(e){const t=e.params.url,s=e.params.requestOptions,n=e.controller.signal,o=s.body;let a=null,h=null,c=null;if(g&&"HTMLFormElement"in globalThis&&(o instanceof FormData?a=o:o instanceof HTMLFormElement&&(h=o,a=new FormData(h))),"string"==typeof o&&(c=o),e.fetchOptions={cache:s.cacheBust&&!f._abortableFetch.polyfill?"no-cache":"default",credentials:"same-origin",headers:s.headers||{},method:"head"===s.method?"HEAD":"GET",mode:"cors",redirect:"follow",signal:n},(a||c)&&(e.fetchOptions.body=a||c),"anonymous"===s.authMode&&(e.useIdentity=!1),e.hasToken=!!(/token=/i.test(t)||s.query&&s.query.token||a&&a.get&&a.get("token")||h&&h.elements.token),!e.hasToken&&r.Z.apiKey&&(0,u.r)(t)&&(s.query||(s.query={}),s.query.token=r.Z.apiKey,e.hasToken=!0),e.useIdentity&&!e.hasToken&&!e.credentialToken&&!x(t)&&!(0,l.Hc)(n)){let r;"immediate"===s.authMode?(await q(),r=await i.id.getCredential(t,{signal:n}),e.credential=r):"no-prompt"===s.authMode?(await q(),r=await i.id.getCredential(t,{prompt:!1,signal:n}).catch((()=>{})),e.credential=r):i.id&&(r=i.id.findCredential(t)),r&&(e.credentialToken=r.token,e.useSSL=!!r.ssl)}}(e);try{do{[n,o]=await O(e)}while(!await T(e,n,o))}catch(t){const s=E("request:server",t,e.params,n);throw s.details.ssl=e.useSSL,e.interceptor&&e.interceptor.error&&e.interceptor.error(s),s}const a=e.params.url;if(/\/sharing\/rest\/(accounts|portals)\/self/i.test(a)&&!e.hasToken&&!e.credentialToken&&null!=(t=o)&&null!=(s=t.user)&&s.username&&!(0,c.kl)(a)){const e=(0,c.P$)(a,!0);e&&p.trustedServers.push(e)}const h=e.credential;if(h&&i.id){const e=i.id.findServerInfo(h.server);let t=e&&e.owningSystemUrl;if(t){t=t.replace(/\/?$/,"/sharing");const e=i.id.findCredential(t,h.userId);e&&-1===i.id._getIdenticalSvcIdx(t,e)&&e.resources.unshift(t)}}return{data:o,getHeader:n?e=>n.headers.get(e):y,requestOptions:e.params.requestOptions,ssl:e.useSSL,url:e.params.url}}(C);return null==(a=v)||null==a.after||a.after(L),L}let m;const p=r.Z.request,g="FormData"in globalThis,_=[499,498,403,401],b=["COM_0056","COM_0057","SB_0008"],v=[/\/arcgis\/tokens/i,/\/sharing(\/rest)?\/generatetoken/i,/\/rest\/info/i],y=()=>null,w=Symbol();function C(e){const t=(0,c.P$)(e);return!t||t.endsWith(".arcgis.com")||f._corsServers.includes(t)||(0,c.kl)(t)}function E(e,t,s,r){let i="Error";const o={url:s.url,requestOptions:s.requestOptions,getHeader:y,ssl:!1};if(t instanceof n.Z)return t.details?(t.details=(0,a.d9)(t.details),t.details.url=s.url,t.details.requestOptions=s.requestOptions):t.details=o,t;if(t){const e=r&&(e=>r.headers.get(e)),s=r&&r.status,n=t.message;n&&(i=n),e&&(o.getHeader=e),o.httpStatus=(null!=t.httpCode?t.httpCode:t.code)||s||0,o.subCode=t.subcode,o.messageCode=t.messageCode,"string"==typeof t.details?o.messages=[t.details]:o.messages=t.details,o.raw=w in t?t[w]:t}return(0,l.D_)(t)?(0,l.zE)():new n.Z(e,i,o)}async function q(){i.id||await Promise.all([s.e(280),s.e(8778),s.e(102),s.e(9625)]).then(s.bind(s,79339))}function x(e){return v.some((t=>t.test(e)))}async function O(e){let t=e.params.url;const s=e.params.requestOptions,r=e.fetchOptions,n=(0,c.jc)(t)||(0,c.HK)(t),a=s.responseType||"json",h=n?0:null!=s.timeout?s.timeout:p.timeout;let u=!1;if(!n){e.useSSL&&(t=(0,c.hO)(t)),s.cacheBust&&"default"===r.cache&&(t=(0,c.ZN)(t,"request.preventCache",Date.now()));let n={...s.query};e.credentialToken&&(n.token=e.credentialToken);let a=(0,c.B7)(n);(0,o.Z)("esri-url-encodes-apostrophe")&&(a=a.replace(/'/g,"%27"));const h=t.length+1+a.length;let l;u="delete"===s.method||"post"===s.method||"put"===s.method||!!s.body||h>p.maxUrlLength;const d=s.useProxy||!!(0,c.ed)(t);if(d){const e=(0,c.b7)(t);l=e.path,!u&&l.length+1+h>p.maxUrlLength&&(u=!0),e.query&&(n={...e.query,...n})}if("HEAD"===r.method&&(u||d)){if(u){if(h>p.maxUrlLength)throw E("request:invalid-parameters",new Error("URL exceeds maximum length"),e.params);throw E("request:invalid-parameters",new Error("cannot use POST request when method is 'head'"),e.params)}if(d)throw E("request:invalid-parameters",new Error("cannot use proxy when method is 'head'"),e.params)}if(u?(r.method="delete"===s.method?"DELETE":"put"===s.method?"PUT":"POST",s.body?t=(0,c.fl)(t,n):(r.body=(0,c.B7)(n),r.headers["Content-Type"]="application/x-www-form-urlencoded")):t=(0,c.fl)(t,n),d&&(e.useProxy=!0,t=`${l}?${t}`),n.token&&g&&r.body instanceof FormData){const e=r.body;e.set?e.set("token",n.token):e.append("token",n.token)}if(s.hasOwnProperty("withCredentials"))e.withCredentials=s.withCredentials;else if(!(0,c.D6)(t,c.Gd))if((0,c.kl)(t))e.withCredentials=!0;else if(i.id){const s=i.id.findServerInfo(t);s&&s.webTierAuth&&(e.withCredentials=!0)}e.withCredentials&&(r.credentials="include")}let d,m,_=0,b=!1;h>0&&(_=setTimeout((()=>{b=!0,e.controller.abort()}),h));try{if("native-request-init"===s.responseType)m=r,m.url=t;else if("image"!==s.responseType||"default"!==r.cache||"GET"!==r.method||u||function(e){if(e)for(const t of Object.getOwnPropertyNames(e))if(e[t])return!0;return!1}(s.headers)||!n&&!e.useProxy&&p.proxyUrl&&!C(t)){if(d=await f._abortableFetch(t,r),e.useProxy||function(e){const t=(0,c.P$)(e);t&&!f._corsServers.includes(t)&&f._corsServers.push(t)}(t),"native"===s.responseType)m=d;else if("HEAD"!==r.method)if(d.ok){switch(a){case"array-buffer":m=await d.arrayBuffer();break;case"blob":case"image":m=await d.blob();break;default:m=await d.text()}if(_&&(clearTimeout(_),_=0),"json"===a||"xml"===a||"document"===a)if(m)switch(a){case"json":m=JSON.parse(m);break;case"xml":m=L(m,"application/xml");break;case"document":m=L(m,"text/html")}else m=null;if(m){if("array-buffer"===a||"blob"===a){const e=d.headers.get("Content-Type");if(/application\/json|text\/plain/i.test(e)&&m["blob"===a?"size":"byteLength"]<=750)try{const e=await new Response(m).json();e.error&&(m=e)}catch{}}"image"===a&&m instanceof Blob&&(m=await k(URL.createObjectURL(m),e,!0))}}else m=await d.text()}else m=await k(t,e)}catch(r){if("AbortError"===r.name){if(b)throw new Error("Timeout exceeded");throw(0,l.zE)("Request canceled")}if(!(!d&&r instanceof TypeError&&p.proxyUrl)||s.body||"delete"===s.method||"head"===s.method||"post"===s.method||"put"===s.method||e.useProxy||C(t))throw r;e.redoRequest=!0,(0,c.tD)({proxyUrl:p.proxyUrl,urlPrefix:(0,c.P$)(t)})}finally{_&&clearTimeout(_)}return[d,m]}function L(e,t){let s;try{s=(new DOMParser).parseFromString(e,t)}catch{}if(!s||s.getElementsByTagName("parsererror").length)throw new SyntaxError("XML Parse error");return s}async function T(e,t,s){if(e.redoRequest)return e.redoRequest=!1,!1;const r=e.params.requestOptions;if(!t||"native"===r.responseType||"native-request-init"===r.responseType)return!0;let n,o,a,h;if(!t.ok)throw n=new Error(`Unable to load ${t.url} status: ${t.status}`),n[w]=s,n;null!=s&&s.error&&(n=s.error),n&&(o=Number(n.code),a=n.hasOwnProperty("subcode")?Number(n.subcode):null,h=n.messageCode,h=h&&h.toUpperCase());const l=r.authMode;if(403===o&&(4===a||n.message&&n.message.toLowerCase().indexOf("ssl")>-1&&-1===n.message.toLowerCase().indexOf("permission"))){if(!e.useSSL)return e.useSSL=!0,!1}else if(!e.hasToken&&e.useIdentity&&("no-prompt"!==l||498===o)&&-1!==_.indexOf(o)&&!x(e.params.url)&&(403!==o||-1===b.indexOf(h)&&(null==a||2===a&&e.credentialToken))){await q();try{const t=await i.id.getCredential(e.params.url,{error:E("request:server",n,e.params),prompt:"no-prompt"!==l,signal:e.controller.signal,token:e.credentialToken});return e.credential=t,e.credentialToken=t.token,e.useSSL=e.useSSL||t.ssl,!1}catch(t){if("no-prompt"===l)return e.credential=null,e.credentialToken=null,!1;n=t}}if(n)throw n;return!0}function k(e,t,s=!1){const r=t.controller.signal,i=new Image;return t.withCredentials?i.crossOrigin="use-credentials":i.crossOrigin="anonymous",i.alt="",i.src=e,(0,d.f)(i,e,s,r)}f._abortableFetch=null,f._corsServers=["https://server.arcgisonline.com","https://services.arcgisonline.com"]},71058:(e,t,s)=>{s.d(t,{r:()=>n});var r=s(17452);const i=["elevation3d.arcgis.com","js.arcgis.com","jsdev.arcgis.com","jsqa.arcgis.com","static.arcgis.com"];function n(e){const t=(0,r.P$)(e,!0);return t&&t.endsWith(".arcgis.com")&&!i.includes(t)&&!e.endsWith("/sharing/rest/generateToken")}},85958:(e,t,s)=>{s.d(t,{f:()=>o});var r=s(80442),i=s(70586),n=s(95330);function o(e,t,s=!1,o){return new Promise(((h,l)=>{if((0,n.Hc)(o))return void l(a());let c=()=>{f(),l(new Error(`Unable to load ${t}`))},u=()=>{const t=e;f(),h(t)},d=()=>{if(!e)return;const t=e;f(),t.src="",l(a())};const f=()=>{(0,r.Z)("esri-image-decode")||(e.removeEventListener("error",c),e.removeEventListener("load",u)),c=null,u=null,e=null,(0,i.pC)(o)&&o.removeEventListener("abort",d),d=null,s&&URL.revokeObjectURL(t)};(0,i.pC)(o)&&o.addEventListener("abort",d),(0,r.Z)("esri-image-decode")?e.decode().then(u,c):(e.addEventListener("error",c),e.addEventListener("load",u))}))}function a(){try{return new DOMException("Aborted","AbortError")}catch{const e=new Error;return e.name="AbortError",e}}}}]);