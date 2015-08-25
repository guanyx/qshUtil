(function (global) {
    'use strict';

//项目域名
    global.MOBILE_DOMIAN = "http://m.8673h.com/";
//默认产品图
    global.GOOD_DEFAULT="/images/pro_pic.png";
//默认用户图
    global.USER_DEFAULT="/images/tuzi.png";
//图片服务器域名
    global.IMG_DOMIAN = "http://img.8673h.com/";

    var screenWidth = $(document.body).outerWidth(true);
    var grids = 12;
    /*$(document).ready(function () {
     displayImage();
     var imgArr = $("img");
     $.each(imgArr, function(n, value) {
     var scale = $(value).attr("data-grid");
     if(typeof scale!="undefined"){
     var picName = $(value).attr("data-img");
     value.src = getNewName(picName,scale)
     }
     });
     });*/

    /**
     *
     * @param oldName
     * @param scale  所占的格数
     * @returns {*}
     */
    function getNewName(oldName,scale){
        var newWidth = parseFloat(scale/grids)*screenWidth;

        return patchSize (oldName,newWidth);
    }

    function patchSize (oldName,newWidth){
        var size = ["100x100","150x150","200x200","250x250","300x300","350x350","400x400","450x450","500x500","550x550","600x600","650x650","700x700","800x800"];
        var differ = 9999;
        var index = 0;
        $.each(size, function(n, value) {
            var newArr = value.split("x");
            var val = Math.abs(parseFloat(newArr[0])-parseFloat(newWidth));
            if(val<differ){
                differ = val;
                index = n;
            }
        });
        var pos = oldName.lastIndexOf(".");
        var ext = oldName.substring(pos,oldName.length);
        return oldName.replace(ext,"_"+size[parseInt(index)]+ext);
    }

    function setgrid(para){
        var arr = para.split(",");
        var str = "";
        var num = 1;
        var grid = 0;
        for(var i=0;i<arr.length;i++){
            var paras = arr[i].split("-");
            str = paras[0];
            num = paras[1];
            if(screenWidth<768 && str=="xs"){
                grid = num;
            }
            if(screenWidth>768 && str=="sm"){
                grid = num;
            }
            if(screenWidth>992 && str=="md"){
                grid = num;
            }
            if(screenWidth>1200 && str=="lg"){
                grid = num;
            }

        }
        return grid;
    }



    function displayImage() {
        var group;
        var imgUrl;
        var img = new Image();
        $("img[data-img]").each(function (index, elem) {
            group = $(elem).attr("data-img");
            var scale = $(elem).attr("data-grid");
            if(typeof scale!="undefined"){
                if(/^\d+$/.test(scale)==false){//可变参数则先去计算grid
                    scale = setgrid(scale);
                    $(elem).attr("data-grid",scale);
                }
                group = getNewName(group,scale)
            }
            imgUrl =  group;
            if (group != "") {
                if (img.complete) {
                    $(elem).attr("src", imgUrl);
                } else {
                    img.onload = function () {
                        $(elem).attr("src", imgUrl);
                        img.onload = null;
                    };
                    img.src = imgUrl;
                }
            }
        });
    }

    global.displayImage = displayImage;
})(window);