(function(){
    var shell = 'common';
    var ua = navigator.userAgent;
    if(ua.match(/APP8673h/i)){
        shell = 'qsh';
    }
    else if(ua.match(/MicroMessenger/i)){
        shell = 'wechat';
    }

    qsh_object['const'] = {
        shell: shell
    }
})();