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