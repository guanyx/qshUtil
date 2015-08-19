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

    function getQueryStringByName(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    }

    qshRegister({
        name: 'queryString',
        entry: getQueryStringByName
    });

    qshRegister({
        name: 'localStorage',
        entry: function(key, value){
            if(value){
                localStorage.setItem(key, value);
            }
            else {
                return localStorage.getItem(key);
            }
        }
    })
})(window);