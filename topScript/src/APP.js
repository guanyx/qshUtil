(function (global) {
    'use strict';

    var app = {
        queue: {},  //方法与回调映射
        callback: function(){
            var data = Array.prototype.slice.call(arguments, 0);
            var method = data.shift();   //回调方法名
            var times = data.shift();    //是否会回调多次，长任务可能需要回调多次返回状态
            this.queue[method].apply(this, data);
            if(!times){
                delete this.queue(method);
            }
        }
    };
    var increase = 0;

    //调用通用方法，第一个参数会方法名
    app.apply = function(method){
        var data = Array.prototype.slice.call(arguments, 0);
        if(data.length < 1){
            throw"APP call error, message:miss method name";    //需要方法名
        }

        var types = data.map(function(param, index){
            var type = typeof param;
            var fake_name = method + increase;  //回调的假名

            if('function' === type){
                app.queue[fake_name] = param;
                data[index] = fake_name;
            }

            return type;
        });

        increase++;

        var result = JSON.parse(prompt(JSON.stringify({method: data.shift(), args: data})));
        if (result.code != 200) {
            throw"APP call error, code:" + result.code + ", message:" + result.result
        }
        return result.result
    };

    //此处并未看出作用，先删除
    /*Object.getOwnPropertyNames(a).forEach(function (d) {
        var c = a[d];
        if (typeof c === "function" && d !== "callback") {
            a[d] = function () {
                return c.apply(a, [d].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
    });*/

    //返回的示例
    app.back = function(){
        app.apply('History.go', '-1')
    };

    global.APP = app;
})(window);