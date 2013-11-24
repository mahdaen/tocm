/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING SELECTOR.
(function(window) {
    'use strict';
    // CREATING WRAPPER.
    window.xQuery = window.$ = function (pattern) {
        var obj = new Query(pattern);
        applyModule(obj);
        return obj;
    };
    // CREATING SELECTOR.
    var Query = function (pattern) {
        var node = document.getElementsByTagName(pattern);
    };
    // CREATING WRAPPER MODULE CONSTRUCTOR.
    var applyModule = function (obj) {
        for (var key in xQueryModule) {
            if (xQueryModule.hasOwnProperty(key)) {
                obj.prototype[key] = xQueryModule[key];
            }
        }
    };
    // CREATING MODULE CONSTRUCTOR.
    window.defineModule = window.$module = function (name, func) {
        if (typeof name === 'string' && typeof func === 'function') {
            xQueryModule[name] = func;
        }
    };
})(window);

$module('log', function () {
    'use strict';
    console.log(this);
});