(function (global) {
    'use strict';

    var search_temp = '<div class="head-search">' +
        '<form action="/Action/SearchServlet.do" method="post">' +
        '<div class="head-search-input-wrapper">' +
        '<i class="iconfont icon-headsousuo"></i>' +
        '<input placeholder="输入您要搜索的商品" name="search_key"> ' +
        '</div> ' +
        '<div class="head-search-bottom"></div> ' +
        '</form>' +
        '</div>';

    var handler = {
        list: function(mount){
            qshUtil.header({
                mount: mount,
                html: search_temp,
                style: 'custom',
                rightItems: [
                    {
                        icon: 'gengduodiandian',
                        hasActive: true,
                        items: [
                            'xiaoxi',
                            'zhuye'
                        ]
                    }
                ]
            })
        }
    };

    qshRegister({
        name: 'preHeader',
        entry: function(type, mount){
            handler[type](mount);
        }
    })
})(window);