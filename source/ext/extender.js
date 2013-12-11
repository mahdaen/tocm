/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// EXTENDING JQUERY IDENTIFIER ($).
(function($) {
    'use strict';
    $.anime = TocmAnimation;
    $['class'] = Tocm;
    $.media = TocmMedia;
    $.path = TocmQuery;
    $.font = TocmFont;
    $.keyframe = TocmKeyframe;
    $.task = TocmTask;
    
    // LOCKING ALL TOCM INSTANCE.
    var obj = Object.keys(window);
    for (var i = 0; i < obj.length; ++i) {
        if (obj[i].search('Tocm') !== -1) {
            //lock(obj[i]);
        }
    }
})(jQuery);

// CREATING JQUERY PLUGIN.
(function ($) {
    $.fn.addAnimation = function (name) {
        if (typeOf(name) === 'string') {
            var runNode = this;
            runNode.addClass(name.replace(/\./g, ''));
            
            var anim = $.anime(name), x, i;
            var pfs = ['animationstart', 'webkitAnimationStart', 'MSAnimationStart'];
            var pfe = ['animationend', 'webkitAnimationEnd', 'MSAnimationEnd'];
            
            if (typeOf(anim.onRun) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfs[0], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfs[1], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfs[2], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[2], arguments.callee, false);
                    }, false);
                }
            }
            if (typeOf(anim.onEnd) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfe[0], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[1], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[2], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[2], arguments.callee, false);
                    }, false);
                }
            }
            // Automaticaly remove animation when animation endded.
            if (anim.endNode !== '') {
                var remAnim = function () {
                    runNode.removeClass(name.replace(/\./g, ''));
                };
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfe[0], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[1], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[2], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[2], arguments.callee, false);
                    }, false);
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
})(jQuery);