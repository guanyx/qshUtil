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