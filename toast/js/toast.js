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