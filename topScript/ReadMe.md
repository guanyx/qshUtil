#企商汇移动端头部信息

###全局页面URL变量
```js
var qsh_page_urls = {
    'detail': '/detail/index.html',                     //详情页
    'zhuanti': '/list/index.html',                      //专题列表页
    'home': '/',                                        //主页
    'message': '/massage/massage.jsp',                  //消息页  
    'category': '/brand/index.html',                    //分类信息
    'uCenter': '/m-center/index.html',                  //我的企商
    'login': '/Login/login.html',                       //登录页
    'register': '/Login/login_pre.html',                //注册页
    'cart': '/shopping/shopping.jsp',                   //购物车
    'bill': '/shopping/confirm_order.jsp',              //订单页
    'collection': '/m-center/collection.html',          //我的收藏
    'error': '/error/abnormal.html',                    //错误重新验证
    'review': '/brand/prod_pingj.jsp'                   //评价
    'kefu': '/massage/communicate.jsp',                 //客服  
};
```

###使用示例
```js
location.href = qsh_page_urls.login + '?url=xxx';    //跳转到登录页
```