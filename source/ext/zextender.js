/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// EXTENDING JQUERY IDENTIFIER ($).
(function() {
    'use strict';
    var $ = {};
    $.anime = TocmAnimation;
    $.class = Tocm;
    $.media = TocmMedia;
    $.path = TocmQuery;
    $.font = TocmFont;
    $.keyframe = TocmKeyframe;
    $.task = TocmTask;
})();


// CREATING JQUERY PLUGIN.
(function ($) {
    'use strict';
    $.fn.addAnimation = function (name) {
        if (typeOf(name) === 'string') {
            var runNode = this;
            runNode.addClass(name.replace(/\./g, ''));
            
            var anim = $.anime(name);
            var pfx = ["webkit", "moz", "MS", "o", ""], i, x;
            
            if (typeOf(anim.onRun) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationStart', anim.onRun, false);
                    }
                }
            }
            if (typeOf(anim.onEnd) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationEnd', anim.onEnd, false);
                    }
                }
            }
            // Automaticaly remove animation when animation endded.
            if (anim.endNode !== '') {
                var remAnim = function () {
                    runNode.removeClass(name.replace(/\./g, ''));
                };
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationEnd', remAnim, false);
                    }
                }
            }
        }
        return this;
    };
    $.fn.remAnimation = function (name) {
        if (typeOf(name) === 'string') {
            this.removeClass(name.replace(/\./g, ''));
        }
        return this;
    };
})(Zepto);