(function(){
    var shell = 'common';
    if(navigator.userAgent.match(/APP8673h/i)){
        shell = 'qsh';
    }
    qsh_object['const'] = {
        shell: shell
    }
})();