parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"o2+O":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e){if(this.setting=null,this.styleSheetIndex=0,this.styleSheet=null,this.lastTotal=0,this.resize=this.debounce(this.gWatermarkDOM,100).bind(this),this.setting=t({id:"watermark-web",text:"",gutterX:15,gutterY:15,size:15,alpha:.35,width:200,angle:15},e),0===document.styleSheets.length){var i=document.createElement("style");document.head.appendChild(i)}this.styleSheetIndex=document.styleSheets.length-1,this.styleSheet=document.styleSheets[this.styleSheetIndex]}return e.prototype.init=function(){this.fillCss().gWrapperDOM().gWatermarkDOM(),window.addEventListener("resize",this.resize)},e.prototype.destory=function(){var t=document.getElementById(this.setting.id);t&&(t.innerHTML="",window.removeEventListener("resize",this.resize))},e.prototype.gWrapperDOM=function(){var t=this.setting.id,e=document.getElementById(t);return e||((e=document.createElement("div")).setAttribute("id",t),document.body.appendChild(e)),this},e.prototype.fillCss=function(){var t="#"+this.setting.id+" {\n      pointer-events: none;\n      position: fixed;\n      top: 0;\n      z-index: 9999;\n      width: 100vw;\n      height: 100vh;\n      display: flex;\n      justify-content: space-around;\n      align-content: space-around;\n      flex-wrap: wrap;\n    }";this.styleSheet.insertRule(t,this.styleSheetIndex);var e="#"+this.setting.id+" > div {\n      transform: rotate(-"+this.setting.angle+"deg);\n      width: "+this.setting.width+"px;\n      margin: "+this.setting.gutterY+"px "+this.setting.gutterX+"px;\n      opacity: "+this.setting.alpha+"\n    }";return this.styleSheet.insertRule(e,this.styleSheetIndex),this},e.prototype.calcTotal=function(){var t=Math.max(document.body.scrollWidth,document.body.clientWidth),e=Math.max(document.body.scrollHeight,document.body.clientHeight),i=Math.cos(this.setting.angle)*this.setting.size+Math.sin(this.setting.angle)*this.setting.width;return Math.ceil(e/(i+(this.setting.gutterY<<1)))*Math.ceil(t/(this.setting.width+(this.setting.gutterX<<1)))},e.prototype.gWatermarkDOM=function(){var t=this.calcTotal();if(this.lastTotal!==t){var e=0;this.lastTotal<t?e=t-this.lastTotal^0:(document.getElementById(this.setting.id).innerHTML="",e=t),this.lastTotal=t;for(var i=document.createDocumentFragment(),n=1;n<=e;n++){var s=document.createElement("div"),r=document.createTextNode(this.setting.text);s.appendChild(r),i.appendChild(s)}document.getElementById(this.setting.id).appendChild(i)}},e.prototype.debounce=function(t,e){var i;return function(){var n=this,s=arguments;clearTimeout(i),i=setTimeout(function(){t.apply(n,s)},e)}},e}();exports.default=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=require("../index.ts"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}var n=new t.default({text:"ewardwang"});n.init();
},{"../index.ts":"o2+O"}]},{},["Focm"], null)