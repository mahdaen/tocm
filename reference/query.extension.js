/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM QUERY EXTENSIONS.
(function (window, $) {
    'use strict';
    // CREATING WRAPPER IF NO JQUERY.
    if (!window.jQuery) {
        window.$ = TocmQuery;
    }
    
    // CREATING GLOBAL OBJECT.
    $.data = {
        queue: {},
        state: {}
    };
    // CREATING EVENT OBJECTS.
    $.event = {
        queue: {
            ready: []
        },
        lists: {
            ready: []
        },
        calls: function (object, context) {
            
        },
        state: 'loading'
    };
    
    // CREATING CORE WRAPPER.
    $.anime = TocmAnimation;
    $.class = Tocm;
    $.fonts = $fonts;
    $.media = $media;
    
    // FUNCTION TO ADD DOCUMENT READY LISTENER.
    $.ready = function (func, object) {
        if (typeOf(func) === 'function') {
            // Forward to document if no object defined.
            if (!object) {
                object = document;
            }
            // If not IE event model.
            if (object.addEventListener) {
                
            }
        }
    };
})(window, TocmQuery);