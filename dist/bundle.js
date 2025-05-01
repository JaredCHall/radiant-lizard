function K(t){let e=t.tag;if(!e.includes("-"))throw new Error(`Invalid custom element name: '${e}' must contain a dash (-)`);customElements.get(e)?console.warn(`Custom element '${e}' is already defined.`):customElements.define(e,t)}var P=globalThis,U=P.ShadowRoot&&(P.ShadyCSS===void 0||P.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,T=Symbol(),F=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==T)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(U&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=F.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&F.set(e,t))}return t}toString(){return this.cssText}},J=t=>new M(typeof t=="string"?t:t+"",void 0,T),N=(t,...e)=>{let s=t.length===1?t[0]:e.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[n+1],t[0]);return new M(s,t,T)},Z=(t,e)=>{if(U)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of e){let i=document.createElement("style"),r=P.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}},L=U?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(let i of e.cssRules)s+=i.cssText;return J(s)})(t):t;var{is:ut,defineProperty:$t,getOwnPropertyDescriptor:_t,getOwnPropertyNames:mt,getOwnPropertySymbols:ft,getPrototypeOf:gt}=Object,H=globalThis,Y=H.trustedTypes,At=Y?Y.emptyScript:"",yt=H.reactiveElementPolyfillSupport,S=(t,e)=>t,k={toAttribute(t,e){switch(e){case Boolean:t=t?At:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Q=(t,e)=>!ut(t,e),G={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:Q};Symbol.metadata??=Symbol("metadata"),H.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=G){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&$t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=_t(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let o=i?.call(this);r?.call(this,n),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??G}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;let t=gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){let e=this.properties,s=[...mt(e),...ft(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(L(i))}else t!==void 0&&e.push(L(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Z(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:k).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:k;this._$Em=i,this[i]=n.fromAttribute(e,r.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let i=this.constructor,r=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Q)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,o=this[i];n!==!0||this._$AL.has(i)||o===void 0||this.C(i,void 0,r,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[S("elementProperties")]=new Map,_[S("finalized")]=new Map,yt?.({ReactiveElement:_}),(H.reactiveElementVersions??=[]).push("2.1.0");var j=globalThis,O=j.trustedTypes,X=O?O.createPolicy("lit-html",{createHTML:t=>t}):void 0,nt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+$,vt=`<${ot}>`,g=document,b=()=>g.createComment(""),C=t=>t===null||typeof t!="object"&&typeof t!="function",I=Array.isArray,St=t=>I(t)||typeof t?.[Symbol.iterator]=="function",D=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,m=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),st=/'/g,it=/"/g,ht=/^(?:script|style|textarea|title)$/i,B=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),at=B(1),It=B(2),Bt=B(3),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),rt=new WeakMap,f=g.createTreeWalker(g,129);function lt(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return X!==void 0?X.createHTML(e):e}var Et=(t,e)=>{let s=t.length-1,i=[],r,n=e===2?"<svg>":e===3?"<math>":"",o=E;for(let h=0;h<s;h++){let a=t[h],w,d,l=-1,c=0;for(;c<a.length&&(o.lastIndex=c,d=o.exec(a),d!==null);)c=o.lastIndex,o===E?d[1]==="!--"?o=tt:d[1]!==void 0?o=et:d[2]!==void 0?(ht.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=m):d[3]!==void 0&&(o=m):o===m?d[0]===">"?(o=r??E,l=-1):d[1]===void 0?l=-2:(l=o.lastIndex-d[2].length,w=d[1],o=d[3]===void 0?m:d[3]==='"'?it:st):o===it||o===st?o=m:o===tt||o===et?o=E:(o=m,r=void 0);let u=o===m&&t[h+1].startsWith("/>")?" ":"";n+=o===E?a+vt:l>=0?(i.push(w),a.slice(0,l)+nt+a.slice(l)+$+u):a+$+(l===-2?h:u)}return[lt(t,n+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},z=class pt{constructor({strings:e,_$litType$:s},i){let r;this.parts=[];let n=0,o=0,h=e.length-1,a=this.parts,[w,d]=Et(e,s);if(this.el=pt.createElement(w,i),f.currentNode=this.el.content,s===2||s===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=f.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(nt)){let c=d[o++],u=r.getAttribute(l).split($),x=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:x[2],strings:u,ctor:x[1]==="."?Ct:x[1]==="?"?wt:x[1]==="@"?xt:R}),r.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:n}),r.removeAttribute(l));if(ht.test(r.tagName)){let l=r.textContent.split($),c=l.length-1;if(c>0){r.textContent=O?O.emptyScript:"";for(let u=0;u<c;u++)r.append(l[u],b()),f.nextNode(),a.push({type:2,index:++n});r.append(l[c],b())}}}else if(r.nodeType===8)if(r.data===ot)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf($,l+1))!==-1;)a.push({type:7,index:n}),l+=$.length-1}n++}}static createElement(e,s){let i=g.createElement("template");return i.innerHTML=e,i}};function y(t,e,s=t,i){if(e===A)return e;let r=i!==void 0?s._$Co?.[i]:s._$Cl,n=C(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(t),r._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=r:s._$Cl=r),r!==void 0&&(e=y(t,r._$AS(t,e.values),r,i)),e}var bt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??g).importNode(e,!0);f.currentNode=i;let r=f.nextNode(),n=0,o=0,h=s[0];for(;h!==void 0;){if(n===h.index){let a;h.type===2?a=new V(r,r.nextSibling,this,t):h.type===1?a=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(a=new Pt(r,this,t)),this._$AV.push(a),h=s[++o]}n!==h?.index&&(r=f.nextNode(),n++)}return f.currentNode=g,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},V=class dt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=y(this,e,s),C(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):St(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){let{values:s,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=z.createElement(lt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(s);else{let n=new bt(r,this),o=n.u(this.options);n.p(s),this.T(o),this._$AH=n}}_$AC(e){let s=rt.get(e.strings);return s===void 0&&rt.set(e.strings,s=new z(e)),s}k(e){I(this._$AH)||(this._$AH=[],this._$AR());let s=this._$AH,i,r=0;for(let n of e)r===s.length?s.push(i=new dt(this.O(b()),this.O(b()),this,this.options)):i=s[r],i._$AI(n),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let r=this.strings,n=!1;if(r===void 0)t=y(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{let o=t,h,a;for(t=r[0],h=0;h<r.length-1;h++)a=y(this,o[s+h],e,h),a===A&&(a=this._$AH[h]),n||=!C(a)||a!==this._$AH[h],a===p?t=p:t!==p&&(t+=(a??"")+r[h+1]),this._$AH[h]=a}n&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ct=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},wt=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},xt=class extends R{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=y(this,t,e,0)??p)===A)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Pt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){y(this,t)}};var Ut=j.litHtmlPolyfillSupport;Ut?.(z,V),(j.litHtmlVersions??=[]).push("3.3.0");var ct=(t,e,s)=>{let i=s?.renderBefore??e,r=i._$litPart$;if(r===void 0){let n=s?.renderBefore??null;i._$litPart$=r=new V(e.insertBefore(b(),n),n,void 0,s??{})}return r._$AI(t),r};var W=globalThis,v=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,W.litElementHydrateSupport?.({LitElement:v});var Ht=W.litElementPolyfillSupport;Ht?.({LitElement:v});(W.litElementVersions??=[]).push("4.2.0");var q=class extends v{static tag="lit-main";static properties={};static styles=N`
      :host {
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          text-align: left;
      }

      img {
          max-width: 300px;
          height: 90vh;
      }

      h1 {
          font-family: sans-serif;
          font-size: 2rem;
          color: darkslateblue;
          margin: 0;
      }
  `;render(){return at`
        <div class="container">
            <img src="./images/angry-lizard.png" alt="Logo" />
            <div>
                <h1>👋 Hello, Friend</h1>
                <p>Your Application is live!</p>
            </div>
        </div>
    `}};K(q);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
/*! Bundled license information:

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
