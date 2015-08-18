(function (global) {
    'use strict';

    var itemMap = {
        'index': {
            text: '首页',
            href: '/index.html',
            icon: 'baojifuben2'
        },
        'uCenter': {
            text: '我的企商',
            href: '/m-center/index.html',
            icon: 'yonghu'
        },
        'baoyang': {
            text: '我要保养',
            href: '/mantain/all_mas1.html',
            icon: 'woyaobaoyang2'
        },
        'contact': {
            text: '联系我们',
            href: '/ad/contact-us.html',
            icon: 'lianxi'
        }
    };

    var default_item = ['index', 'uCenter', 'baoyang', 'contact'];
    var item_template = '<div class="qsh-footer-item {{classes}}" data-href="{{href}}" style="width: {{percent}}%;"> <i class="iconfont icon-{{icon}}"></i> <div>{{text}}</div></div>';
    var wrapper_template = '<div class="qsh-footer">{{content}}</div>';

    function footer(options){
        options = options || {};
        var items = options.items || default_item;

        var percent = (1 / items.length) * 100;
        var temps = items.map(function(item){
            var obj = itemMap[item];
            obj.percent = percent;
            obj.classes = options.current === item ? 'current-foot': '';
            return qshUtil.compileTpl(item_template, obj);
        });
        temps = temps.join('');

        $(document.body).append(qshUtil.compileTpl(wrapper_template, {
            content: temps
        }));

        var $items = $('.qsh-footer').find('.qsh-footer-item');
        $items.click(function(){
            var $this = $(this);
            if(!$this.hasClass('current-foot')){
                location.href = $this.data('href');
            }
        });
    }

    qshRegister({
        name: 'footer',
        entry: footer
    })
})(window);