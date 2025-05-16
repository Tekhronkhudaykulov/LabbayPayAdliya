var l=Object.defineProperty;var p=(i,r,e)=>r in i?l(i,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[r]=e;var s=(i,r,e)=>(p(i,typeof r!="symbol"?r+"":r,e),e);import{j as a}from"./index-2c8e8237.js";let h=class extends HTMLElement{constructor(){super();s(this,"_propsToUpgrade",{});s(this,"shadow");s(this,"template");s(this,"defaultProps");s(this,"isAttached",!1);this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template")}storePropsToUpgrade(e){e.forEach(t=>{this.hasOwnProperty(t)&&this[t]!==void 0&&(this._propsToUpgrade[t]=this[t],delete this[t])})}upgradeStoredProps(){Object.entries(this._propsToUpgrade).forEach(([e,t])=>{this.setAttribute(e,t)})}reflect(e){e.forEach(t=>{Object.defineProperty(this,t,{set(o){"string,number".includes(typeof o)?this.setAttribute(t,o.toString()):this.removeAttribute(t)},get(){return this.getAttribute(t)}})})}applyDefaultProps(e){this.defaultProps=e,Object.entries(e).forEach(([t,o])=>{this[t]=this[t]||o.toString()})}};var n=':host{align-items:center;display:inline-flex;flex-shrink:0;height:var(--uib-stroke);justify-content:center;width:var(--uib-size)}:host([hidden]){display:none}.container{align-items:center;border-radius:calc(var(--uib-stroke)/2);display:flex;height:var(--uib-stroke);justify-content:center;overflow:hidden;position:relative;transform:translateZ(0);width:var(--uib-size)}.container:before{left:0;opacity:var(--uib-bg-opacity);position:absolute;top:0}.container:after,.container:before{background-color:var(--uib-color);content:"";height:100%;transition:background-color .3s ease;width:100%}.container:after{animation:wobble var(--uib-speed) ease-in-out infinite;border-radius:calc(var(--uib-stroke)/2);transform:translateX(-95%)}@keyframes wobble{0%,to{transform:translateX(-95%)}50%{transform:translateX(95%)}}';class c extends h{constructor(){super();s(this,"_attributes",["size","color","speed","stroke","bg-opacity"]);s(this,"size");s(this,"color");s(this,"speed");s(this,"stroke");s(this,"bg-opacity");this.storePropsToUpgrade(this._attributes),this.reflect(this._attributes)}static get observedAttributes(){return["size","color","speed","stroke","bg-opacity"]}connectedCallback(){this.upgradeStoredProps(),this.applyDefaultProps({size:80,color:"black",speed:1.75,stroke:5,"bg-opacity":.1}),this.template.innerHTML=`
      <div class="container"></div>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
          --uib-stroke: ${this.stroke}px;
          --uib-bg-opacity: ${this["bg-opacity"]};
        }
        ${n}
      </style>
    `,this.shadow.replaceChildren(this.template.content.cloneNode(!0))}attributeChangedCallback(){const e=this.shadow.querySelector("style");e&&(e.innerHTML=`
      :host{
        --uib-size: ${this.size}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
        --uib-stroke: ${this.stroke}px;
        --uib-bg-opacity: ${this["bg-opacity"]};
      }
      ${n}
    `)}}var d={register:(i="l-line-wobble")=>{customElements.get(i)||customElements.define(i,class extends c{})},element:c};const f=()=>(d.register(),a.jsx("div",{className:"fixed flex items-center justify-center top-0 bg-black left-0 z-[99999] right-0 bottom-0 w-[100%] h-[105vh] bg-opacity-70",children:a.jsx("div",{className:"h-[25px] bg-white flex items-center px-[20px] rounded-full",children:a.jsx("l-line-wobble",{size:"400",stroke:"10","bg-opacity":"0.1",speed:"2",color:"#7A80FF"})})}));export{f as L};
