(function (global) {
    'use strict';

    var hasTouch = 'ontouchstart' in document.body;
    var activeType = hasTouch ? 'touchstart' : 'click';

    qsh_object.activeType = activeType;
})(window);