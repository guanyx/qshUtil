!function(t){"use strict";function e(t){i[t.name]=t.entry}var i={};t.qshUtil=i,t.qshRegister=e,"undefined"!=typeof module&&module.exports&&(module.exports=i),"function"==typeof define&&(define.amd||define.cmd)&&define(function(){return i})}(window),function(t){"use strict";function e(t,e){for(var i,n=/{{(.*?)}}/g;i=n.exec(t);){var s="undefined"==typeof e[i[1]]?"":e[i[1]];t=t.replace(i[0],s),n.lastIndex-=i[0].length}return t}function i(t){var e=t*s,i=e%100,n=e-i;i=i>50?100:50,e=n+i,100>e?e=100:e>700&&(e=800);var o="_"+e+"x"+e;return o}function n(t){var e=location.search.match(new RegExp("[?&]"+t+"=([^&]+)","i"));return null==e||e.length<1?"":e[1]}qshRegister({name:"compileTpl",entry:e});var s=window.devicePixelRatio||1;qshRegister({name:"resizeImg",entry:function(t,e){e=e?"http://img.8673h.com/"+e:"http://m.8673h.com/images/pro_pic.png";var n=/^.*(\..*?)$/g,s=n.exec(e);return e=e.replace(s[1],i(t)+s[1])}}),qshRegister({name:"queryString",entry:n}),qshRegister({name:"localStorage",entry:function(t,e){return e?void localStorage.setItem(t,e):localStorage.getItem(t)}}),qshRegister({name:"uncertainImage",entry:function(t,e,i){var n=new Image;n.onload=function(){t.src=e},n.onerror=function(){t.src=i},n.src=e,n.complete&&(t.src=e)}})}(window),function(t){"use strict";function e(t,e){function i(){a=function(){s=!1,o=!0},e.show(),e.css("height"),s=!0,e.addClass("show")}function n(){a=function(){s=!1,o=!1,e.hide()},e.removeClass("show")}var s=!1,o=!1,a=function(){};t.on(f,function(t){t.stopPropagation(),o?n():i()}),e.on(f,function(t){t.stopPropagation()}),e.on("webkitTransitionEnd, transitionend",function(t){a(t)}),$(document).on(f,function(){n()})}function i(){"qsh"===qsh_object.shell||history.back()}function n(t,e,i){var n=qshUtil.compileTpl(_,t);m=$(n).appendTo(l),h=m.find(".head_left"),u=m.find(".head_right"),e&&m.addClass(e);var s="fixed";i===!1&&(s="relative"),m.css("position",s)}function s(t,e){h.prepend(qshUtil.compileTpl(y,{icon:t||g})),$(".head_back").on(f,function(){e&&e()===!1||i()})}function o(t,i,n){var s,o,c="appendTo";if(n&&(c="prependTo"),"string"!=typeof t||(t=E[t],"undefined"!=typeof t)){var d;if(t.icon?(o=qshUtil.compileTpl(q,t),s=$(o)[c](i),d=t.icon):t.text&&(s=$(L)[c](i),s.text(t.text),d=t.text),t.id&&(d=t.id),v[d]=s,t.handler)s.on(f,t.handler);else if(t.items){var r=a(t.items);e(s,r)}if(t.hasActive){var l=$(b).appendTo(s.find("i"));s.on(f,function(){l.remove()})}}}function a(t){var e=$(x).appendTo(m),i=e.find(".tkuang");return t.forEach(function(t){if("string"!=typeof t||(t=E[t],"undefined"!=typeof t)){var e=qshUtil.compileTpl(w,t);e=$(e).appendTo(i),t.handler&&e.on(f,t.handler),t.hasActive&&e.append(C)}}),e}function c(t){var e=!1;t.forEach(function(t){return"noback"===t?void(e=!0):void("back"===t.id?(s(t.icon,t.handler),e=!0):o(t,h))}),e||s()}function d(t){t.forEach(function(t){o(t,u)})}function r(t){return l=$(t.mount),n(t,t.style,t.fixed),c(t.leftItems||[]),t.rightItems&&t.rightItems.length&&d(t.rightItems),{append:function(t){o(t,u)},prepend:function(t){o(t,u,!0)},remove:function(t){v[t]&&v[t].remove(),delete v[t]}}}var l,h,u,m,p="ontouchstart"in document.body,f=p?"touchstart":"click",v={},g="zuo",_='<div class="head"><div class="head-name">{{name}}</div><div class="head-table"><div class="head_left"></div><div class="head_title">{{html}}</div><div class="head_right"></div></div></div></div>',y='<span class="head_icon head_back"><i class="iconfont icon-{{icon}}"></i></span>',q='<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>',w='<li class="qsh-head-menu-item"><i class="iconfont icon-{{icon}} shi_18"></i>{{name}}</li>',C='<div class="icon-active-wrapper"><div class="icon_active"></div></div>',b='<div class="icon_active"></div>',x='<div class="qsh-head-menu"><span class="qsh-head-arrow"></span><ul class="tkuang"></ul></div>',L='<span class="head_icon">完成</span>',E={xiaoxi:{name:"消息",icon:"xiaoxiHead",handler:function(){location.href="/massage/massage.jsp"}},zhuye:{name:"主页",icon:"baojifuben2",handler:function(){location.href="/index.html"}},huiyuan:{name:"我的企商",icon:"huiyuan",handler:function(){location.href="/m-center/index.html"}},lianxi:{name:"联系我们",icon:"lianxi",handler:function(){location.href="/ad/contact-us.html"}},gouwuche:{name:"购物车",icon:"gouwuche2",handler:function(){location.href="/shopping/shopping.jsp"}}};qshRegister({name:"header",entry:r})}(window),function(t){"use strict";var e='<div class="head-search"><form action="/Action/SearchServlet.do" method="post"><div class="head-search-input-wrapper"><i class="iconfont icon-headsousuo"></i><input placeholder="输入您要搜索的商品" name="search_key"> </div> <div class="head-search-bottom"></div> </form></div>',i={list:function(t){qshUtil.header({mount:t,html:e,style:"custom",rightItems:[{icon:"gengduodiandian",hasActive:!0,items:["xiaoxi","zhuye"]}]})},index:function(t){qshUtil.header({mount:t,html:e,style:"custom",leftItems:["noback",{name:"消息",icon:"xiaoxiHead",handler:function(){}}],rightItems:[{icon:"gengduodiandian",hasActive:!0,items:["xiaoxi","zhuye"]}]})}};qshRegister({name:"preHeader",entry:function(t,e){i[t](e)}})}(window),function(t){"use strict";function e(t){this.element_=t,this.init()}function i(t){var i=document.createElement("div");i.classList.add("mdl-spinner"),i.classList.add("mdl-js-spinner"),i.classList.add("is-active");var n=new e(i);return t.appendChild(i),n}e.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},e.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},e.prototype.createLayer=function(t){var e=document.createElement("div");e.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),e.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+t);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),i.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),s.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var o=[i,n,s],a=0;a<o.length;a++){var c=document.createElement("div");c.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),o[a].appendChild(c)}e.appendChild(i),e.appendChild(n),e.appendChild(s),this.element_.appendChild(e)},e.prototype.stop=function(){this.element_.classList.remove("is-active")},e.prototype.start=function(){this.element_.classList.add("is-active")},e.prototype.init=function(){if(this.element_){for(var t=1;t<=this.Constant_.MDL_SPINNER_LAYER_COUNT;t++)this.createLayer(t);this.element_.classList.add("is-upgraded")}},qshRegister({name:"spinner",entry:i})}(window),function(t){"use strict";function e(t){if(t){if(!t.mount)return void console.error("No Mount");this.element=$(t.mount),"static"===this.element.css("position")&&this.element.css("position","relative"),this.success=t.success,delete t.success,this.options=t,this.ajax(t)}}function i(t){return new e(t)}var n="qsh-module-load",s="qsh-module-load-text",o="qsh-module-load-spinner",a="qsh-module-load-refresh";e.prototype.ajax=function(){this.spinner(),$.ajax(this.options).done(function(t){this.hide(),this.success&&this.success(t)}.bind(this)).fail(function(t,e,i){this.fail("404"==e?"网络异常":"数据获取失败")}.bind(this))},e.prototype.fail=function(t){t=t||"未知错误",this.refresh(t)},e.prototype.create=function(){if(!this.element.children("."+n).length){var t=document.createElement("div");t.classList.add(n);var e=document.createElement("span");e.classList.add(s);var i=document.createElement("div");i.classList.add(o);var c=document.createElement("a");c.textContent="点击重试",c.classList.add(a),c.addEventListener("click",function(){this.ajax()}.bind(this),!1),t.appendChild(e),t.appendChild(i),t.appendChild(c),this.element.append(t)}},e.prototype.position=function(){this.create();var t=this.element.children("."+n);t.css(this.element.height()>40?{top:"50%",marginTop:"-20px"}:{top:"0px",marginTop:"0px"})},e.prototype.spinner=function(){this.position();var t=this.element.children("."+n);t.find("."+s).hide(),t.find("."+a).hide(),t.find("."+o).empty().show(),this.mdSpinner=qshUtil.spinner(t.find("."+o).get(0)),t.show()},e.prototype.refresh=function(t){this.position();var e=this.element.children("."+n);e.find("."+s).show().text(t),e.find("."+o).hide(),e.find("."+a).show(),e.show()},e.prototype.hide=function(){var t=this.element.children("."+n);t.hide()},qshRegister({name:"module",entry:i})}(window),function(t){"use strict";function e(t,e){var n=$(t),s=!1,o=$("<div></div>");o.css({height:n.height()+"px"}),n.wrap(o);var a=n.parent("div"),c={position:n.css("position"),left:n.css("left"),top:n.css("top"),right:n.css("right"),bottom:n.css("bottom")};i.push(function(t){var i=a.offset().top-(parseInt(e.top)||0);if(t>=i){if(s)return;n.css({position:"fixed"}).css(e),s=!0}else s&&(n.css(c),s=!1)})}var i=[];$(window).scroll(function(){var t=$(this).scrollTop();i.forEach(function(e){e(t)})}),qshRegister({name:"fixed",entry:e})}(window),function(t){"use strict";function e(){var t=document.body.scrollTop;t>s?o.show():o.hide()}function i(t){"number"==typeof t.threshold&&(s=t.threshold,e())}var n='<div id="qsh-back-top"><i class="iconfont icon-top"></i><div>顶部</div></div>',s=100;$(document.body).append(n);var o=$("#qsh-back-top");o.on("click",function(){$("html,body").animate({scrollTop:0},200)}),$(window).on("scroll",e),e(),qshRegister({name:"top",entry:i})}(window),function(t){"use strict";var e,i,n='<div class="qsh-toast"></div>',s=$(n).appendTo(document.body),o=2e3;qshRegister({name:"toast",entry:function(t){clearTimeout(e),clearTimeout(i),s.hide(),s.text(t),s.css({opacity:0}),s.css("height"),s.show(),setTimeout(function(){s.css({opacity:.8})},0),e=setTimeout(function(){s.css({opacity:0}),i=setTimeout(function(){s.hide()},400)},o)}})}(window),function(t){"use strict";function e(t){t=t||{};var e=t.items||n,a=e.map(function(e){var n=i[e];return n.classes=t.current===e?"current-foot":"",qshUtil.compileTpl(s,n)});a=a.join(""),$(document.body).append(qshUtil.compileTpl(o,{content:a}));var c=$(".qsh-footer").find(".qsh-footer-item");c.click(function(){var t=$(this);t.hasClass("current-foot")||(location.href=t.data("href"))})}var i={index:{text:"首页",href:"/index.html",icon:"baojifuben2"},uCenter:{text:"我的企商",href:"/m-center/index.html",icon:"yonghu"},baoyang:{text:"我要保养",href:"/mantain/all_mas1.html",icon:"woyaobaoyang2"},contact:{text:"联系我们",href:"/ad/contact-us.html",icon:"lianxi"}},n=["index","baoyang","contact","uCenter"],s='<div class="qsh-footer-item {{classes}}" data-href="{{href}}"> <div><i class="iconfont icon-{{icon}}"></i> <div>{{text}}</div></div></div>',o='<div class="qsh-footer">{{content}}</div>';qshRegister({name:"footer",entry:e})}(window),function(t){"use strict";function e(t){return function(){c.removeClass(r.show),n&&($(document.body).removeClass(r.modal),n=!1),setTimeout(function(){c.hide()},350),t()}}function i(t){$.extend(t,s[t.type]),$(document.body).hasClass(r.modal)||($(document.body).addClass(r.modal),n=!0),d.html(qshUtil.compileTpl(a,t)),c.show(),setTimeout(function(){c.addClass(r.show)},100),d.find("."+r.btns).hide(),t.btns.forEach(function(i){var n=$(".qsh-util-alert-"+i);n.show(),t[i]=t[i]||function(){$(document.body).trigger($.Event(l[i]))},n.click(e(t[i]))})}var n=!1,s={warn:{icon:"jinggao",name:"警告",btns:["ok"]},success:{icon:"chenggongalert",name:"成功",btns:["ok"]},fail:{icon:"shibai",name:"失败",btns:["ok"]},tip:{icon:"tishi",name:"提示",btns:["ok","cancel"]}},o='<div class="qsh-util-alert"><div class="qsh-util-inner"> <div class="qsh-util-alert-box"> </div> </div></div>',a='<div class="qsh-util-alert-icon"> <i class="iconfont icon-{{icon}}"></i> </div> <div class="qsh-util-alert-type">{{name}}</div> <div class="qsh-util-alert-msg">{{msg}}</div> <div class="qsh-util-alert-btns"> <div class="qsh-util-alert-btn qsh-util-alert-cancel">取消</div> <div class="qsh-util-alert-btn qsh-util-alert-ok">确定</div> </div>';$(document.body).append(o);var c=$(".qsh-util-alert"),d=c.find(".qsh-util-alert-box"),r={show:"qsh-util-show",modal:"modal-open",btns:"qsh-util-alert-btn"},l={ok:"qsh.alert.ok",cancel:"qsh.alert.cancel"};qshRegister({name:"alert",entry:i})}(window),function(t){"use strict";function e(t){this.id="qsh-util-modal-"+i++,this.content=$(t.mount),this.content.wrap(qshUtil.compileTpl(n,this)).show(),this.dom=$("#"+this.id),t.style&&this.dom.find(".qsh-util-modal-inner").css(t.style);var e=this;this.dom.on("click",function(t){t.target===this&&e.hide()})}var i=0,n='<div id="{{id}}" class="qsh-util-modal"> <div class="qsh-util-modal-inner"> </div> </div>';e.prototype.show=function(){$(document.body).hasClass("modal-open")||($(document.body).addClass("modal-open"),this.boostrapModal=!0),this.dom.show(),setTimeout(function(){console.log(this),this.dom.addClass("qsh-show")}.bind(this),20)},e.prototype.hide=function(){this.boostrapModal&&($(document.body).removeClass("modal-open"),this.boostrapModal=!1),this.dom.removeClass("qsh-show"),setTimeout(function(){this.dom.hide()}.bind(this),350)},qshRegister({name:"modal",entry:function(t){return new e(t)}})}(window);