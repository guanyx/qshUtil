(function (global) {
    'use strict';

    var qsh = {};
    function register(obj){
        qsh[obj.name] = obj.entry;
    }

    global.qshUtil = qsh;
    global.qshRegister = register;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = qsh;
    }

    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() {
            return qsh;
        });
    }
})(window);