(function (global) {
    'use strict';

    var close_modal = false;
    var types = {
        'warn': {
            icon: 'jinggao',
            name: '警告',
            btns: ['ok']
        },
        'success': {
            icon: 'chenggongalert',
            name: '成功',
            btns: ['ok']
        },
        'fail': {
            icon: 'shibai',
            name: '失败',
            btns: ['ok']
        },
        'tip': {
            icon: 'tishi',
            name: '提示',
            btns: ['ok', 'cancel']
        }
    };

    var struct = '<div class="qsh-util-alert"><div class="qsh-util-inner"> ' +
        '<div class="qsh-util-alert-box"> ' +
        '</div> ' +
        '</div></div>';

    var temp = '<div class="qsh-util-alert-icon"> ' +
        '<i class="iconfont icon-{{icon}}"></i> ' +
        '</div> ' +
        '<div class="qsh-util-alert-type">{{name}}</div> ' +
        '<div class="qsh-util-alert-msg">{{msg}}</div> ' +
        '<div class="qsh-util-alert-btns"> ' +
        '<div class="qsh-util-alert-btn qsh-util-alert-cancel">取消</div> ' +
        '<div class="qsh-util-alert-btn qsh-util-alert-ok">确定</div> ' +
        '</div>';

    $(document.body).append(struct);

    var $root = $('.qsh-util-alert');
    var $box = $root.find('.qsh-util-alert-box');
    var classes = {
        show: 'qsh-util-show',
        modal: 'modal-open',
        btns: 'qsh-util-alert-btn'
    };
    var events = {
        'ok': 'qsh.alert.ok',
        'cancel': 'qsh.alert.cancel'
    };

    function wrapper(cb){
        return function(){
            $root.removeClass(classes.show);
            if(close_modal){
                $(document.body).removeClass(classes.modal);
                close_modal = false;
            }

            setTimeout(function(){
                $root.hide();
            }, 350);

            cb();
        };
    }

    function qshAlert(options){
        $.extend(options, types[options.type]);

        if(!$(document.body).hasClass(classes.modal)){
            $(document.body).addClass(classes.modal);
            close_modal = true;
        }
        $box.html(qshUtil.compileTpl(temp, options));
        $root.show();

        setTimeout(function(){
            $root.addClass(classes.show);
        }, 100);

        //绑定按钮
        $box.find('.'+classes.btns).hide();
        options.btns.forEach(function(btn){
            var $btn = $('.qsh-util-alert-'+btn);
            $btn.show();
            options[btn] = options[btn] || function(){
                    $(document.body).trigger($.Event(events[btn]))
                };
            $btn.click(wrapper(options[btn]));
        })
    }

    qshRegister({
        name: 'alert',
        entry: qshAlert
    })
})(window);