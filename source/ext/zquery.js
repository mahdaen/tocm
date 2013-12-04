/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING SELECTOR.
(function(window) {
    'use strict';
    // CREATING XPATH SELECTOR.
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
    
    // CREATING CORE SELECTOR.
    var TocmQuery = function (pattern) {
        var doms = [], i;
        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // Adding global select (//) if not defined.
            var subs = pattern.substr(0,1);
            if (subs !== '/' && subs !== '//') {
                pattern =  '//' + pattern;
            }
            // Fixing slash-space.
            pattern = pattern.replace(/\s?\/\s?/g, '/');
            pattern = pattern.replace(/\s?\|\s?/g, '| ');
            // Replacing space with global select (//).
            pattern = pattern.replace(/\s/g, '//');
            
            // Creating RegExp Pattern.
            var pregmatch = [
                /(\@)([a-zA-Z\d\-\_]+)(\=)([\#\a-zA-Z\d\-\_]+)/, // Attribute Equal To.
                /(\@)([a-zA-Z\d\-\_]+)(!=)([\#\a-zA-Z\d\-\_]+)/, // Attribute Not Equal To.
                /(\@)([a-zA-Z\d\-\_]+)(\?)([\#\a-zA-Z\d\-\_]+)/, // Attribute Contains.
                /(\@)([a-zA-Z\d\-\_]+)(\!)([\#\a-zA-Z\d\-\_]+)/, // Attribute Not Contains.

                /(\#)([a-zA-Z\d\-\_]+)/, // ID Contains.
                /(\.)([a-zA-Z\d\-\_]+)/, // Class Contains.
                /(\@)([a-zA-Z\d\-\_]+)/, // Name Contains.
                /(\:)([\d]+)/, // Index Number.
                
                /(#!)([a-zA-Z\d\-\_]+)/, // ID NOT Contains.
                /(.!)([a-zA-Z\d\-\_]+)/, // Class NOT Contains.
                /(@!)([a-zA-Z\d\-\_]+)/ // Name NOT Contains.
            ];
            // Creating Pattern Replace to meet with XPath Pattern.
            var pregrepl = [
                '[^$2="$4"]',
                '[^$2!="$4"]',
                '[contains(^$2, "$4")]',
                '[not(contains(^$2, "$4"))]',

                '[contains(concat(" ", ^id, " "), " $2 ")]',
                '[contains(concat(" ", ^class, " "), " $2 ")]',
                '[contains(concat(" ", ^name, " "), " $2 ")]',
                '[$2]',

                '[not(contains(concat(" ", ^id, " "), " $2 "))]',
                '[not(contains(concat(" ", ^class, " "), " $2 "))]',
                '[not(contains(concat(" ", ^class, " "), " $2 "))]'
            ];
            // Creating XPath Pattern.
            for (i = 0; i < pregmatch.length; ++i) {
                if (pattern.match(pregmatch[i])) {
                    pattern = pattern.preg_replace(pregmatch[i], pregrepl[i]);
                }
            }
            // Replacing temp '^' to '@'.
            pattern = pattern.replace(/\^/g, '@');
            // Replacing '/[' to '/*[' to fix XPath String.
            pattern = pattern.replace(/\/\[/g, '/*[');
            // Replacing triple slash '///' to fix XPath String.
            pattern = pattern.replace(/\/\/\//g, '//');
            //console.log(pattern);
            
            // Selecting Dom Element.
            doms = new XPathSelector(pattern);
            return Zepto(doms);
        } else {
            return Zepto('');
        }
    };
    // ADDING TOCMQUERY TO WINDOW.
    window.$path = window.TocmQuery = TocmQuery;
})(window);
