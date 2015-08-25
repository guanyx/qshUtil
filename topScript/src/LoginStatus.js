(function (global) {
    'use strict';

    function loadingCheckStatu(cb){
        var uri = location.href;
        uri = encodeURIComponent(uri);
        $.ajax({
            type: 'post',
            url: '/Action/LoginDetectionAction.do',
            dataType: 'json',
            async: false,//true是异步 false是同步
            success: function (data) {
                var statu = data.statu;
                if(statu==0)
                    cb(true);
                else
                    cb(false)
            },
            error: function() {
                cb(false)
            }
        });
    }

    global.loadingCheckStatu = loadingCheckStatu;
})(window);