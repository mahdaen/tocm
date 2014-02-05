/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING SELECTOR.
(function (window) {
    'use strict';
    // CREATING CORE SELECTOR.
    var TocmQuery = function (pattern, context) {
        var doms = [],
            i;
        // FORWARD TO JQUERY IF USING CONTEXT.
        if (pattern && context) return jQuery(pattern, context);

        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // Fixing slash-space.
            pattern = pattern.replace(/\s?\/\s?/g, ' > ');

            // Creating RegExp Pattern.
            var pregmatch = [
                /(\&)([a-zA-Z\d\-\_]+)([\|\*\~\$\!\^\=]+)([\#\a-zA-Z\d\-\_]+)/, // Attribute Selector.

                /(\@)([a-zA-Z\d\-\_]+)/, // Name Contains.
                /(\:)([\d]+)/, // Index Number.

                /(#!)([a-zA-Z\d\-\_]+)/, // ID NOT Contains.
                /(.!)([a-zA-Z\d\-\_]+)/, // Class NOT Contains.
                /(@!)([a-zA-Z\d\-\_]+)/ // Name NOT Contains.
            ];
            // Creating Pattern Replace to meet with XPath Pattern.
            var pregrepl = [
                '[$2$3"$4"]',

                '[name*="$2"]',
                ':eq($2)',

                '[id!="$2"]',
                '[class!="$2"]',
                '[name!="$2"]'
            ];
            // Creating XPath Pattern.
            for (i = 0; i < pregmatch.length; ++i) {
                if (pattern.match(pregmatch[i])) {
                    pattern = pattern.preg_replace(pregmatch[i], pregrepl[i]);
                }
            }
            //console.log(pattern);
        }

        return jQuery(pattern);
    };
    // ADDING TOCMQUERY TO WINDOW.
    window.$path = window.TocmQuery = TocmQuery;
    // LOCKING OBJECT.
    lock('$path');
    lock('TocmQuery');
})(window);