/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM ANIMATION LIBRARY.
require(['tocm']);
// CREATING ANIMATION OBJECT AND COLLECTIONS.

// ANIMATION TIMELINE STRUCTURE.

// $animation('XSlide', true).
(function (window) {
    'use strict';
    window.TocmTimeline = {};
    if (!TocmConfig) {
        window.TocmConfig = {};
    }
})(window);

// CREATING CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING ANIMATION BUILDER.
    var AnimBuilder = function (name, duration, easing, delay) {
        $keyframes(name, '0%', {});
        $class('.', {
            animation: name + ' ' + duration + ' ' + easing + ' ' + delay
        });
    };
    
    // CREATING CORE CONSTRUCTOR.
    var TocmAnimation = function (name, duration, easing) {
        if (typeOf(name) === 'string') {
            if (typeOf(duration) === 'number' && typeOf(easing) === 'string') {
                
            } else {
                if (typeOf(TocmTimeline[name]) === 'object') {
                    return TocmTimeline[name];
                }
            }
        } else {
            return [];
        }
    };
    
    // REGISTERING TO WINDOW OBJECT AND CREATING MODULE WRAPPER.
    window.$animation = window.TocmTimeline = function (name, duration, easing) {
        return new TocmAnimation(name, duration, easing);
    };
    window.$animation.module = TocmAnimation.module = TocmAnimation.prototype = {};
})(window);

// CREATING MODULES.
(function ($animation) {
    'use strict';
    
    
})(TocmAnimation);