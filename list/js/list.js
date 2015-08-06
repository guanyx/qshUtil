(function (global) {
    'use strict';

    //列表作为一个大的页面控件，设计为单页面只有一个列表
    var $mount;
    var page, page_size;

    var classes = {
        loading: 'qsh-list-loading-wrapper',
        listWrapper: 'qsh-list-wrapper'
    };

    /**
     * mount: 挂载点
     * reqObj: 请求参数，参照$.ajax的参数说明（通常只需告知请求地址，请求类型，请求参数即可）
     */
    function list(options){
        $mount = $(options.mount);

        appendListWrapper();
        appendLoading();

        options.success = success;
        options.mount = $mount.children(classes.loading);
        //调用module控件
        qshUtil.module(options)
    }

    function success(data){

    }

    function appendLoading(){
        var div = document.createElement('div');
        div.classList.add(classes.loading);
        $mount.append(div);
    }

    function appendListWrapper(){
        var ul = document.createElement('ul');
        ul.classList.add(classes.listWrapper);
        $mount.append(ul);
    }

    function reset(){

    }
})(window);