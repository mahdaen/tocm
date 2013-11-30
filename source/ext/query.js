/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING REGISTRY.
(function (window) {
    'use strict';
    window.TocmQuery = {};
})(window);

// CREATING SELECTOR.
(function(window) {
    'use strict';
    // CREATING CORE SELECTOR.
    var tQuery = function (pattern, from) {
        return new TocmQuery(pattern, from);
    };
    var TocmQuery = function (pattern, from) {
        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // Creating RegExp Pattern.
            var preg = [
                /(\#)([a-zA-Z\-\_]+)/, // ID Contains.
                /(\.)([a-zA-Z\-\_]+)/, // Class Contains.
                /(\@)([a-zA-Z\-\_]+)/, // Name Contains.
                
                /(\#\!)([a-zA-Z\-\_]+)/, // ID NOT Contains.
                /(\.\!)([a-zA-Z\-\_]+)/, // Class NOT Contains.
                /(\@\!)([a-zA-Z\-\_]+)/, // Name NOT Contains.

                /(\@)([a-zA-Z\-\_]+)(\=)([a-zA-Z\-\_]+)/, // Attribute Equal To.
                /(\@)([a-zA-Z\-\_]+)(\?)([a-zA-Z\-\_]+)/, // Attribute Contains.
                /(\@)([a-zA-Z\-\_]+)(\!)([a-zA-Z\-\_]+)/ // Attribute Not Contains.
            ];
            // Creating Pattern Replace to meet with XPath Pattern.
            var repl = [
                '[contains(^id, "$2")]',
                '[contains(^class, "$2")]',
                '[contains(^name, "$2")]',

                '[not(contains(^id, "$2"))]',
                '[not(contains(^class, "$2"))]',
                '[not(contains(^name, "$2"))]',

                '[^$2="$4"]',
                '[contains(^$2, "$4")]',
                '[not(contains(^$2, "$4"))]'
            ];
            // Creating XPath Pattern.
            for (var i = 0; i < 3; ++i) {
                if (pattern.match(preg[i])) {
                    pattern = pattern.preg_replace(preg[i], repl[i]);
                }
            }
            pattern = pattern.replace(/\^/g, '@');
            return 'pattern';
        }
        // IF SELECTOR IS ARRAY.
        else if (typeOf(pattern) === 'array') {
        }
        else if (typeOf(pattern).match('html') !== null) {
        } else {
            return [];
        }
    };
    
    tQuery.module = TocmQuery.constructor.prototype;
    window.$query = tQuery;
    
    var XPathSelector = function (pattern) {
        var item, search, result = [];
        if (typeOf(pattern) === 'string') {
            search = document.evaluate(pattern, document, null, XPathResult.ANY_TYPE, null);
            while (item = search.iterateNext()) {
                result.push(item);
            }
        }
        return result;
    };
    window.$path = function (pattern) {
        return new XPathSelector(pattern);
    };
    window.$path.module = XPathSelector.constructor.prototype;
    
})(window);

$path.module('log', function () {
    'use strict';
    console.log(this);
});
