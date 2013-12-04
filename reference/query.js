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
    // CREATING XPATH SELECTOR.
    var XPathSelector = function (pattern, doc) {
        var item, search, result = [];
        if (typeOf(pattern) === 'string') {
            search = document.evaluate(pattern, doc, null, XPathResult.ANY_TYPE, null);
            while (item = search.iterateNext()) {
                result.push(item);
            }
        }
        return result;
    };
    
    // CREATING CORE SELECTOR.
    var TocmQuery = function (pattern, from) {
        var doms = [], i;
        if (!from) {
            this.selectfrom = document;
        } else {
            this.selectfrom = from;
        }
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
                '[contains(concat(" ", ^$2, " ", " $4 ")]',
                '[not(contains(concat(" ", ^$2, " ")," $4 "))]',

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
            doms = new XPathSelector(pattern, this.selectfrom);
        }
        // IF SELECTOR IS ARRAY.
        else if (typeOf(pattern) === 'array') {
            for (i = 0; i < pattern.length; ++i) {
                var ndom = new TocmQuery(pattern[i]);
                doms = doms.concat(ndom.lists);
            }
        }
        // IF SELECTOR IS TOCMQUERY OBJECT.
        else if (typeOf(pattern) === 'object' && pattern.type === 'tocmnodelist') {
            return pattern;
        }
        else if (typeOf(pattern).match('html') !== null) {
            doms.push(pattern);
        }

        // Configuring Object.
        this.type = 'tocmnodelist';
        this.lists = doms;
        
        // Adding nodes to this.
        this.apply();
        // Returning object.
        return this;
    };
    
    // CREATING OBJECT WRAPPER.
    var tocmQuery = function (selector, from) {
        return new TocmQuery(selector, from);
    };
    
    // CREATING MODULE WRAPPER.
    TocmQuery.prototype = {
        apply: function () {
            for (var i = 0; i < this.lists.length; ++i) {
                this[i] = this.lists[i];
            }
            this.length = this.lists.length;
            this.splice = this.lists.splice;
            // Hiding Configurations.
            var hide = ['type', 'length', 'lists', 'selectfrom', 'splice'];
            for (i = 0; i < hide.length; ++i) {
                Object.defineProperty(this, hide[i], {enumerable: false});
            }
            return this;
        }
    };
    Object.defineProperty(TocmQuery.prototype, 'apply', {enumerable: false, writable: false});
    
    // CREATING MODULE EXTENDER.
    tocmQuery.extend = function (modulename, func) {
        if (typeOf(modulename) === 'string' && modulename.match(/[a-zA-Z\d\_]+/) && typeOf(func) === 'function') {
            TocmQuery.prototype[modulename] = func;
            Object.defineProperty(TocmQuery.prototype, modulename, {enumerable: false});
        } else if (typeOf(modulename === 'object')) {
            for (var name in modulename) {
                if (modulename.hasOwnProperty(name)) {
                    tocmQuery.extend(name, modulename[name]);
                }
            }
        }
    };
    
    // ADDING TOCMQUERY TO WINDOW.
    window.$path = window.TocmQuery = tocmQuery;
})(window);

// EXTENDING JQUERY IDENTIFIER ($).
(function($) {
    'use strict';
    $.anime = TocmAnimation;
    $.class = Tocm;
    $.media = TocmMedia;
    $.path = TocmQuery;
    $.font = TocmFont;
    $.keyframe = TocmKeyframe;
})(jQuery);