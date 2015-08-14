(function (global) {
    'use strict';

    var qsh = {};
    function register(obj){
        qsh[obj.name] = obj.entry;
    }

    global.qshUtil = qsh;
    global.qshRegister = register;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = qsh;
    }

    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() {
            return qsh;
        });
    }
})(window);
(function (global) {
    'use strict';

    function compileTpl(str, obj){
        var reg = /{{(.*?)}}/g;
        var result;
        while(result = reg.exec(str)){
            str = str.replace(result[0], obj[result[1]] || '');
            reg.lastIndex = 0;
        }
        return str;
    }

    qshRegister({
        name: 'compileTpl',
        entry: compileTpl
    });

    var ratio =  window.devicePixelRatio || 1;
    qshRegister({
        name: 'resizeImg',
        entry: function(size, img){
            img = img ? 'http://img.8673h.com/' + img : "http://m.8673h.com/images/pro_pic.png";
            var reg = /^.*(\..*?)$/g;
            var arr = reg.exec(img);
            img = img.replace(arr[1], sizeStr(size) + arr[1]);
            return img;
        }
    });

    function sizeStr(size){
        var pic_size = size * ratio;

        var rest_size = pic_size % 100;
        var main_size = pic_size - rest_size;
        if(rest_size > 50){
            rest_size = 100;
        }
        else {
            rest_size = 50;
        }
        pic_size = main_size + rest_size;
        if(pic_size < 100){
            pic_size = 100;
        }else if(pic_size > 800){
            pic_size = 800
        }

        var size_str = '_' + pic_size + 'x' + pic_size;
        return size_str;
    }
})(window);
(function (global) {
    'use strict';
    var hasTouch = 'ontouchstart' in document.body;
    var activeType = hasTouch ? 'touchstart' : 'click';

    var $mount, $left, $right, $head;
    var dom_map = {};
    var back_icon_name = 'zuo';

    var skeleton_dom = '<div class="head"><div class="head-name">{{name}}</div><div class="head-table"><div class="head_left"></div><div class="head_title">{{html}}</div><div class="head_right"></div></div></div></div>';
    var back_dom = '<span class="head_icon head_back"><i class="iconfont icon-{{icon}}"></i></span>';
    var icon_dom = '<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>';
    var menu_item_dom = '<li class="qsh-head-menu-item"><i class="iconfont icon-{{icon}} shi_18"></i>{{name}}</li>';
    var menu_item_active = '<div class="icon-active-wrapper"><div class="icon_active"></div></div>';
    var head_active = '<div class="icon_active"></div>';
    var head_menus_dom = '<div class="qsh-head-menu"><span class="qsh-head-arrow"></span><ul class="tkuang"></ul></div>';
    var head_text = '<span class="head_icon">完成</span>';

    var preMenu = {
        'xiaoxi': {
            name: '消息',
            icon: 'xiaoxiHead',
            handler: function(){
                location.href = '/massage/massage.jsp'
            }
        },
        'zhuye': {
            name: '主页',
            icon: 'baojifuben2',
            handler: function(){
                location.href = '/index.html'
            }
        },
        'huiyuan': {
            name: '我的企商',
            icon: 'huiyuan',
            handler: function(){
                location.href = '/m-center/index.html'
            }
        }
    };

    function connectIconMenu(icon, menu){
        var menu_box_animate = false;
        var menu_box_show = false;
        var endHandler = function(){};

        icon.on(activeType, function(e){
            e.stopPropagation();
            menu_box_show ? hideMenu() : showMenu();
        });

        menu.on(activeType, function(e){
            e.stopPropagation();
        });

        menu.on('webkitTransitionEnd, transitionend', function(e){
            endHandler(e);
        });

        $(document).on(activeType, function(){
            hideMenu();
        });

        function showMenu(){
            endHandler = function(){
                menu_box_animate = false;
                menu_box_show = true;
            };
            menu.show();
            menu.css('height');
            menu_box_animate = true;
            menu.addClass('show');
        }

        function hideMenu(){
            endHandler = function(){
                menu_box_animate = false;
                menu_box_show = false;
                menu.hide();
            };
            menu.removeClass('show');
        }
    }

    function back(){
        history.back();
    }

    function appendSkeleton(options, style, fixed){
        var html = qshUtil.compileTpl(skeleton_dom, options);
        $head = $(html).appendTo($mount);
        $left = $head.find('.head_left');
        $right = $head.find('.head_right');

        if(style){
            $head.addClass(style);
        }

        var default_position = 'fixed';
        if(fixed === false){
            default_position = 'relative';
        }

        $head.css('position', default_position);
    }

    function appendBack(icon, cb){
        $left.prepend(qshUtil.compileTpl(back_dom, {
            icon: icon || back_icon_name
        }));
        $('.head_back').on(activeType, function(){
            if(cb && cb() === false){
                //do nothing
            }
            else {
                back();
            }
        })
    }

    function appendItem(item, parent, pre){
        var $html, html;
        var domOp = 'appendTo';
        if(pre){
            domOp = 'prependTo';
        }

        var map_id;
        if(item.icon){
            html = qshUtil.compileTpl(icon_dom, item);
            $html = $(html)[domOp](parent);
            map_id = item.icon;
        }
        else if(item.text){
            $html = $(head_text)[domOp](parent);
            $html.text(item.text);
            map_id = item.text;
        }

        item.id && (map_id = item.id);

        dom_map[map_id] = $html;

        if(item.handler){
            $html.on(activeType, item.handler);
        }
        else if(item.items){
            var $menu = appendMenu(item.items);
            connectIconMenu($html, $menu);
        }

        if(item.hasActive){
            var $active = $(head_active).appendTo($html.find('i'));

            $html.on(activeType, function(){
                $active.remove();
            })
        }
    }

    function appendMenu(list){
        var $menu = $(head_menus_dom).appendTo($head);
        var $menu_root = $menu.find('.tkuang');
        list.forEach(function(item){
            //预定义menu
            if(typeof item === 'string'){
                item = preMenu[item];
                if(typeof item === 'undefined'){
                    return;
                }
            }

            var $html = qshUtil.compileTpl(menu_item_dom, item);
            $html = $($html).appendTo($menu_root);

            if(item.handler){
                $html.on(activeType, item.handler);
            }

            if(item.hasActive){
                $html.append(menu_item_active);
            }
        });
        return $menu;
    }

    function appendLeft(list){
        var hasBack = false;
        list.forEach(function(item){
            if(item.id === 'back'){
                appendBack(item.icon, item.handler);
                hasBack = true;
            }
            else {
                appendItem(item, $left);
            }
        });

        if(!hasBack){
            appendBack();
        }
    }

    function addRight(list){
        list.forEach(function(item){
            appendItem(item, $right);
        })
    }

    function init(options){
        $mount = $(options.mount);
        appendSkeleton(options, options.style, options.fixed);

        appendLeft(options.leftItems || []);

        if(options.rightItems && options.rightItems.length){
            addRight(options.rightItems);
        }

        return {
            append: function(item){
                appendItem(item, $right);
            },
            prepend: function(item){
                appendItem(item, $right, true);
            },
            remove: function(id){
                dom_map[id] && dom_map[id].remove();
                delete dom_map[id];
            }
        }
    }
    //global.qshHeader = init;

    qshRegister({
        name: 'header',
        entry: init
    })
})(window);
(function (global) {
    'use strict';

    var search_temp = '<div class="head-search">' +
        '<form action="/Action/SearchServlet.do" method="post">' +
        '<div class="head-search-input-wrapper">' +
        '<i class="iconfont icon-headsousuo"></i>' +
        '<input placeholder="输入您要搜索的商品" name="search_key"> ' +
        '</div> ' +
        '<div class="head-search-bottom"></div> ' +
        '</form>' +
        '</div>';

    var handler = {
        list: function(mount){
            qshUtil.header({
                mount: mount,
                html: search_temp,
                style: 'custom',
                rightItems: [
                    {
                        icon: 'gengduodiandian',
                        hasActive: true,
                        items: [
                            'xiaoxi',
                            'zhuye'
                        ]
                    }
                ]
            })
        }
    };

    qshRegister({
        name: 'preHeader',
        entry: function(type, mount){
            handler[type](mount);
        }
    })
})(window);
(function (global) {
    'use strict';

    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Class constructor for Spinner MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     * @param {HTMLElement} element The element that will be upgraded.
     * @constructor
     */
    function MaterialSpinner(element) {
        'use strict';

        this.element_ = element;

        // Initialize instance.
        this.init();
    }

    /**
     * Store constants in one place so they can be updated easily.
     * @enum {string | number}
     * @private
     */
    MaterialSpinner.prototype.Constant_ = {
        MDL_SPINNER_LAYER_COUNT: 4
    };

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     * @enum {string}
     * @private
     */
    MaterialSpinner.prototype.CssClasses_ = {
        MDL_SPINNER_LAYER: 'mdl-spinner__layer',
        MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
        MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
        MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
        MDL_SPINNER_LEFT: 'mdl-spinner__left',
        MDL_SPINNER_RIGHT: 'mdl-spinner__right'
    };

    /**
     * Auxiliary method to create a spinner layer.
     */
    MaterialSpinner.prototype.createLayer = function(index) {
        'use strict';

        var layer = document.createElement('div');
        layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
        layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);

        var leftClipper = document.createElement('div');
        leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
        leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);

        var gapPatch = document.createElement('div');
        gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);

        var rightClipper = document.createElement('div');
        rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
        rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);

        var circleOwners = [leftClipper, gapPatch, rightClipper];

        for (var i = 0; i < circleOwners.length; i++) {
            var circle = document.createElement('div');
            circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
            circleOwners[i].appendChild(circle);
        }

        layer.appendChild(leftClipper);
        layer.appendChild(gapPatch);
        layer.appendChild(rightClipper);

        this.element_.appendChild(layer);
    };

    /**
     * Stops the spinner animation.
     * Public method for users who need to stop the spinner for any reason.
     * @public
     */
    MaterialSpinner.prototype.stop = function() {
        'use strict';

        this.element_.classList.remove('is-active');
    };

    /**
     * Starts the spinner animation.
     * Public method for users who need to manually start the spinner for any reason
     * (instead of just adding the 'is-active' class to their markup).
     * @public
     */
    MaterialSpinner.prototype.start = function() {
        'use strict';

        this.element_.classList.add('is-active');
    };

    /**
     * Initialize element.
     */
    MaterialSpinner.prototype.init = function() {
        'use strict';

        if (this.element_) {
            for (var i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) {
                this.createLayer(i);
            }

            this.element_.classList.add('is-upgraded');
        }
    };

    function spinner(ele){
        var wrapper = document.createElement('div');
        wrapper.classList.add('mdl-spinner');
        wrapper.classList.add('mdl-js-spinner');
        wrapper.classList.add('is-active');

        var sp = new MaterialSpinner(wrapper);
        ele.appendChild(wrapper);
        return sp;
    };

    qshRegister({
        name: 'spinner',
        entry: spinner
    })
})(window);
(function (global) {
    'use strict';
    var root_class = 'qsh-module-load';
    var text_class = 'qsh-module-load-text';
    var spinner_class = 'qsh-module-load-spinner';
    var refresh_class = 'qsh-module-load-refresh';

    /**
     * dependent JQuery
     * options 参照$.ajax的options
     * success为模块加载的回调
     */
    function moduleLoad(options){
        if(!options){
            return;
        }

        if(!options.mount){
            console.error('No Mount');
            return;
        }

        this.element = $(options.mount);

        if(this.element.css('position') === 'static'){
            this.element.css('position', 'relative');
        }
        this.success = options.success;
        delete options.success;
        this.options = options;
        this.ajax(options);
    }

    moduleLoad.prototype.ajax = function(){
        this.spinner();
        $.ajax(this.options)
            .done(function(data){
                this.hide();
                this.success && this.success(data);
            }.bind(this))
            .fail(function( jqXHR, textStatus, errorThrown){
                if(textStatus == '404'){
                    this.fail('网络异常');
                }
                else {
                    this.fail('数据获取失败');
                }
            }.bind(this));
    };

    moduleLoad.prototype.fail = function(text){
        text = text || '未知错误';

        this.refresh(text);
    };

    moduleLoad.prototype.create = function(){
        if(this.element.children('.'+root_class).length){
            return;
        }
        var wrapper = document.createElement('div');
        wrapper.classList.add(root_class);

        var span = document.createElement('span');
        span.classList.add(text_class);

        var spinner = document.createElement('div');
        spinner.classList.add(spinner_class);

        var refresh = document.createElement('a');
        refresh.textContent = '点击重试';
        refresh.classList.add(refresh_class);

        refresh.addEventListener('click', function(){
            this.ajax();
        }.bind(this), false);

        wrapper.appendChild(span);
        wrapper.appendChild(spinner);
        wrapper.appendChild(refresh);

        this.element.append(wrapper);
    };

    moduleLoad.prototype.position = function(){
        this.create();
        var spinner = this.element.children('.'+root_class);
        if(this.element.height() > 40){
            spinner.css({
                top: '50%',
                marginTop: '-20px'
            })
        }
        else {
            spinner.css({
                top: '0px',
                marginTop: '0px'
            })
        }
    };

    moduleLoad.prototype.spinner = function(){
        this.position();
        var spinner = this.element.children('.'+root_class);

        spinner.find('.'+text_class).hide();
        spinner.find('.'+refresh_class).hide();
        spinner.find('.'+spinner_class).empty().show();
        this.mdSpinner = qshUtil.spinner(spinner.find('.'+spinner_class).get(0));
        spinner.show();
    };

    moduleLoad.prototype.refresh = function(text){
        this.position();
        var spinner = this.element.children('.'+root_class);

        spinner.find('.'+text_class).show().text(text);
        spinner.find('.'+spinner_class).hide();
        spinner.find('.'+refresh_class).show();
        spinner.show();
    };

    moduleLoad.prototype.hide = function(){
        var spinner = this.element.children('.'+root_class);
        spinner.hide();
    };

    function moduleEntry(options){
        return new moduleLoad(options);
    }

    qshRegister({
        name: 'module',
        entry: moduleEntry
    })
})(window);
(function (global) {
    'use strict';

    var callbacks = [];

    $(window).scroll(function(){//滚动页面
        var scroH = $(this).scrollTop(); //滚动条位置
        callbacks.forEach(function(fn){
            fn(scroH);
        })
    });

    function addFixed(ele, position){
        var $ele = $(ele);
        var ele_top = $ele.offset().top - (parseInt(position.top) || 0);
        var origin = {
            position: $ele.css('position'),
            left: $ele.css('left'),
            top: $ele.css('top'),
            right: $ele.css('right'),
            bottom: $ele.css('bottom')
        };
        callbacks.push(function(height){
            if(height >= ele_top){
                $ele.css({
                    position: 'fixed'
                }).css(position);
            }
            else {
                $ele.css(origin);
            }
        });
    }

    qshRegister({
        name: 'fixed',
        entry: addFixed
    });
})(window);
(function (global) {
    'use strict';

    var template = '<div id="qsh-back-top"><i class="iconfont icon-top"></i><div>顶部</div></div>';
    var top_threshold = 100;

    $(document.body).append(template);
    var $top = $("#qsh-back-top");

    $top.on('click', function(){
        $("html,body").animate({scrollTop: 0}, 200);
    });

    $(window).on('scroll', toggleTop);

    function toggleTop(){
        var top = document.body.scrollTop;
        if(top > top_threshold){
            $top.show();
        }
        else {
            $top.hide();
        }
    }

    toggleTop();

    function init(option){
        if(typeof option.threshold === 'number'){
            top_threshold = option.threshold;
            toggleTop();
        }
    }

    qshRegister({
        name: 'top',
        entry: init
    })
})(window);
(function (global) {
    'use strict';

    var temp = '<div class="qsh-toast"></div>';
    var $toast = $(temp).appendTo(document.body);
    var timer, hideTimer;
    var duration = 2000;

    qshRegister({
        name: 'toast',
        entry: function(message){
            clearTimeout(timer);
            clearTimeout(hideTimer);
            $toast.hide();
            $toast.text(message);
            $toast.css({
                opacity: 0
            });
            $toast.css('height');
            $toast.show();
            setTimeout(function(){
                $toast.css({
                    opacity: .8
                });
            }, 0);

            timer = setTimeout(function(){
                $toast.css({
                    opacity: 0
                });
                hideTimer = setTimeout(function(){
                    $toast.hide();
                }, 400);
            }, duration);
        }
    })
})(window);