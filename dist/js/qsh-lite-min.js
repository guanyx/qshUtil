!function(e){"use strict";function t(e){n[e.name]=e.entry}var n={};e.qshUtil=n,e.qshRegister=t,"undefined"!=typeof module&&module.exports&&(module.exports=n),"function"==typeof define&&(define.amd||define.cmd)&&define(function(){return n})}(window),function(e){"use strict";function t(e,t){function n(){o=function(){s=!1,a=!0},t.show(),t.css("height"),s=!0,t.addClass("show")}function i(){o=function(){s=!1,a=!1,t.hide()},t.removeClass("show")}var s=!1,a=!1,o=function(){};e.on(_,function(e){e.stopPropagation(),a?i():n()}),t.on(_,function(e){e.stopPropagation()}),t.on("webkitTransitionEnd, transitionend",function(e){o(e)}),$(document).on(_,function(){i()})}function n(){history.back()}function i(e,t){var n=r(C,{name:e});f=$(n).appendTo(h),p=f.find(".head_left"),u=f.find(".head_right"),t&&f.addClass(t)}function s(e,t){p.prepend(r(E,{icon:e||L})),$(".head_back").on(_,function(){t&&t()===!1||n()})}function a(e,n,i){var s,a,d="appendTo";i&&(d="prependTo");var c;if(e.icon?(a=r(N,e),s=$(a)[d](n),c=e.icon):e.text&&(s=$(g)[d](n),s.text(e.text),c=e.text),e.id&&(c=e.id),v[c]=s,e.handler)s.on(_,e.handler);else if(e.items){var l=o(e.items);t(s,l)}if(e.hasActive){var h=$(P).appendTo(s.find("i"));s.on(_,function(){h.remove()})}}function o(e){var t=$(y).appendTo(f);return e.forEach(function(e){var n=r(R,e);n=$(n).appendTo(t),e.handler&&n.on(_,e.handler),e.hasActive&&n.append(I)}),t}function d(e){var t=!1;e.forEach(function(e){"back"===e.id?(s(e.icon,e.handler),t=!0):a(e,p)}),t||s()}function c(e){e.forEach(function(e){a(e,u)})}function r(e,t){for(var n,i=/{{(.*?)}}/g;n=i.exec(e);)e=e.replace(n[0],t[n[1]]),i.lastIndex=0;return e}function l(e){return h=$(e.mount),i(e.name,e.style),e.leftItems&&e.leftItems.length&&d(e.leftItems),e.rightItems&&e.rightItems.length&&c(e.rightItems),{append:function(e){a(e,u)},prepend:function(e){a(e,u,!0)},remove:function(e){v[e]&&v[e].remove(),delete v[e]}}}var h,p,u,f,m="ontouchstart"in document.body,_=m?"touchstart":"click",v={},L="zuo",C='<div class="head"><div class="head_left"></div><div class="head_title">{{name}}</div><div class="head_right"></div></div>',E='<span class="head_icon head_back"><i class="iconfont icon-{{icon}}"></i></span>',N='<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>',R='<li class="head_menus_item"><i class="iconfont icon-{{icon}}"></i><span>{{name}}</span></li>',I='<div class="icon-active-wrapper"><div class="icon_active"></div></div>',P='<div class="icon_active"></div>',y='<ul class="head_menus"></ul>',g='<span class="head_icon">完成</span>';qshRegister({name:"header",entry:l})}(window),function(e){"use strict";function t(e){this.element_=e,this.init()}function n(e){var n=document.createElement("div");n.classList.add("mdl-spinner"),n.classList.add("mdl-js-spinner"),n.classList.add("is-active");var i=new t(n);return e.appendChild(n),i}t.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},t.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},t.prototype.createLayer=function(e){var t=document.createElement("div");t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+e);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),n.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),s.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var a=[n,i,s],o=0;o<a.length;o++){var d=document.createElement("div");d.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),a[o].appendChild(d)}t.appendChild(n),t.appendChild(i),t.appendChild(s),this.element_.appendChild(t)},t.prototype.stop=function(){this.element_.classList.remove("is-active")},t.prototype.start=function(){this.element_.classList.add("is-active")},t.prototype.init=function(){if(this.element_){for(var e=1;e<=this.Constant_.MDL_SPINNER_LAYER_COUNT;e++)this.createLayer(e);this.element_.classList.add("is-upgraded")}},qshRegister({name:"spinner",entry:n})}(window),function(e){"use strict";function t(e){if(e){if(!e.mount)return void console.error("No Mount");this.element=$(e.mount),"static"===this.element.css("position")&&this.element.css("position","relative"),this.success=e.success,delete e.success,this.options=e,this.ajax(e)}}function n(e){return new t(e)}var i="qsh-module-load",s="qsh-module-load-text",a="qsh-module-load-spinner",o="qsh-module-load-refresh";t.prototype.ajax=function(){this.spinner(),$.ajax(this.options).done(function(e){this.hide(),this.success&&this.success(e)}.bind(this)).fail(function(e,t,n){this.fail("404"==t?"网络异常":"数据获取失败")}.bind(this))},t.prototype.fail=function(e){e=e||"未知错误",this.refresh(e)},t.prototype.create=function(){if(!this.element.children("."+i).length){var e=document.createElement("div");e.classList.add(i);var t=document.createElement("span");t.classList.add(s);var n=document.createElement("div");n.classList.add(a);var d=document.createElement("a");d.textContent="重试",d.classList.add(o),d.addEventListener("click",function(){this.ajax()}.bind(this),!1),e.appendChild(t),e.appendChild(n),e.appendChild(d),this.element.append(e)}},t.prototype.position=function(){this.create();var e=this.element.children("."+i);e.css(this.element.height()>40?{top:"50%",marginTop:"-20px"}:{top:"0px",marginTop:"0px"})},t.prototype.spinner=function(){this.position();var e=this.element.children("."+i);e.find("."+s).hide(),e.find("."+o).hide(),e.find("."+a).empty().show(),this.mdSpinner=qshUtil.spinner(e.find("."+a).get(0)),e.show()},t.prototype.refresh=function(e){this.position();var t=this.element.children("."+i);t.find("."+s).show().text(e),t.find("."+a).hide(),t.find("."+o).show(),t.show()},t.prototype.hide=function(){var e=this.element.children("."+i);e.hide()},qshRegister({name:"module",entry:n})}(window);