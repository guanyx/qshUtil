(function (global) {
    'use strict';

    function compileTpl(str, obj){
        var reg = /{{(.*?)}}/g;
        var result;
        while(result = reg.exec(str)){
            var value = typeof obj[result[1]] === 'undefined' ? '' : obj[result[1]];
            str = str.replace(result[0], value);
            reg.lastIndex -= result[0].length;
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
            img = prefixUrl(img);
            var reg = /^.*(\..*?)$/g;
            var arr = reg.exec(img);
            img = img.replace(arr[1], sizeStr(size) + arr[1]);
            return img;
        }
    });

    function prefixUrl(img){
        return img ? 'http://img.8673h.com/' + img : "http://m.8673h.com/images/pro_pic.png";
    }

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
        }else if(pic_size > 700){
            pic_size = 800
        }

        return '_' + pic_size + 'x' + pic_size;
    }

    qshRegister({
        name: 'absoluteImg',
        entry: function(url){
            url.toString();
            if(url[0] === '/'){
                url = url.substring(1);
            }
            if(url.substr(0, 5) === 'group'){
                url = prefixUrl(url);
            }
            else if(url.substr(0, 6) === 'images'){
                url = 'http://m.8673h.com/' + url;
            }

            return url;
        }
    });

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
            try{
                if(value){
                    localStorage.setItem(key, value);
                }
                else {
                    return localStorage.getItem(key);
                }
            }catch(e){

            }

        }
    });

    qshRegister({
        name: 'uncertainImage',
        entry: function(image, src, replace){
            var img = new Image();
            img.onload = function(){
                image.src = src;
            };

            img.onerror = function(){
                image.src = replace;
            };

            img.src = src;
            if(img.complete){
                image.src = src;
            }
        }
    });

    qshRegister({
        name: 'back',
        entry: function(num){
            num = num || -1;
            if(qsh_object.const.shell === 'qsh'){
                //调用APP接口返回
                APP.back(num);
            }
            else {
                history.back();
            }
        }
    })
})(window);