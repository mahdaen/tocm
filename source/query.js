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
    var TocmPath = function (pattern, node) {
        
    };
    var TocmQuery = function (pattern) {
        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // GETTING SELECTOR TYPE. IF CONTAINS '/' and '@', then use xpath selector.
            if (pattern.match(/^[\/]+||[\@]+$/g)) {
                
            }
        } else if (typeOf(pattern) === 'array') {
            
        } else if (typeOf(pattern) === 'object') {
            
        } else {
            return [];
        }
    };
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
    window.$path.module = XPathSelector.prototype = {};
    
})(window);

$module('log', function () {
    'use strict';
    console.log(this);
});

// PATTERN PLAN -->
// MAIN PATTERN -->
$('*'); // All selector.
$('div'); // Tag Selector.
$('#content'); // ID Selector.
$('.clearfix'); // Class Selector.

// ATTRIBUTE PATTERN -->
$('@name=test'); // Attribute name equal to test.
$('@name!test'); // Attribute name not equal to test.
$('@name==test'); // Attribute name contains test.
$('@name!!test'); // Attribute name not contains test.

// COMBINED PATTERN -->
$('div#content'); // Select element with Tag and Id.
$('div.clearfix'); // Select element with Tag and Class.
$('div@name=test'); // Select element with Tag and Attribute.

// MULTI COMBINED PATTERN -->
$('#content.clearfix'); // Select element with ID and Class.
$('div#content.clearfix'); // Select element with Tag, ID, and Class.
$('div#content.clearfix@name=test'); // Select element with Tag, ID, Class, and Attribute.

// PATH PATTERN -->
$('div/#content/@name=test'); // Select all div, child with ID content, child with attribute name equal to test.
