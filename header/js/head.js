(function (global) {
    'use strict';
    var hasTouch = 'ontouchstart' in document.body;
    var activeType = hasTouch ? 'touchstart' : 'click';

    var $mount, $left, $right, $head;
    var dom_map = {};
    var back_icon_name = 'zuo';

    var skeleton_dom = '<div class="head"><div class="head_left"></div><div class="head_title">{{name}}</div><div class="head_right"></div></div>';
    var back_dom = '<span class="head_icon head_back"><i class="iconfont icon-{{icon}}"></i></span>';
    var icon_dom = '<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>';
    var menu_item_dom = '<li class="head_menus_item"><i class="iconfont icon-{{icon}}"></i><span>{{name}}</span></li>';
    var menu_item_active = '<div class="icon-active-wrapper"><div class="icon_active"></div></div>';
    var head_active = '<div class="icon_active"></div>';
    var head_menus_dom = '<ul class="head_menus"></ul>';
    var head_text = '<span class="head_icon">完成</span>';

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

    function appendSkeleton(name, style, fixed){
        var html = compileTpl(skeleton_dom, {
            name: name
        });
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
        $left.prepend(compileTpl(back_dom, {
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
            html = compileTpl(icon_dom, item);
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
        list.forEach(function(item){
            var $html = compileTpl(menu_item_dom, item);
            $html = $($html).appendTo($menu);

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

    function compileTpl(str, obj){
        var reg = /{{(.*?)}}/g;
        var result;
        while(result = reg.exec(str)){
            str = str.replace(result[0], obj[result[1]]);
            reg.lastIndex = 0;
        }
        return str;
    }

    function init(options){
        $mount = $(options.mount);
        appendSkeleton(options.name, options.style, options.fixed);

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