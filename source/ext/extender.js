/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// EXTENDING JQUERY IDENTIFIER ($).
(function($) {
    'use strict';
    $.anime         = TocmAnimation;
    $['class']      = window.$$ = Tocm;
    $.media         = TocmMedia;
    $.path          = TocmQuery;
    $.font          = TocmFont;
    $.keyframe      = TocmKeyframe;
    $.task          = TocmTask;
    $.log           = TocmLogger;
    
    // CONFIGUGRATION EDIT.
    $.config        = TocmConfig;
    
    lock('$$');
    
    // CREATING CLASS EXPORTER.
    Tocm.module.exports = function (newname) {
        if (this.hasOwnProperty('properties')) {
            if (typeOf(newname) === 'string') {
                return new Tocm(newname, this.properties);
            } else {
                return this.properties;
            }
        } else {
            return {};
        }
    };
    
    // CREATING CLASS IMPORTER.
    $.imports       = window.imports = function (src) {
        var nobj = {}, robj, key;
        if (typeOf(src) === 'string') {
            robj = new Tocm(src);
            if (robj.hasOwnProperty('name')) {
                for (key in robj.properties) {
                    if (robj.properties.hasOwnProperty(key)) {
                        nobj[key] = robj.properties[key];
                    }
                }
            }
        } else if (typeOf(src) === 'array') {
            for (var i = 0; i < src.length; ++i) {
                robj = $.imports(src[i]);
                for (key in robj) {
                    if (robj.hasOwnProperty(key)) {
                        nobj[key] = robj[key];
                    }
                }
            }
        }
        return nobj;
    };

    // CREATING CLASS COMBINER
    $.combine       = window.combine = function (src) {
        var nobj = {};
        if (typeOf(src) === 'array') {
            for (var i = 0; i < src.length; ++i) {
                for (var key in src[i]) {
                    if (src[i].hasOwnProperty(key)) {
                        nobj[key] = src[i][key];
                    }
                }
            }
        }
        return nobj;
    };
    
    lock('imports'); lock('combine');
    
    // CREATING DOM CREATOR.
    $.create        = function (tagname, attr) {
        if (typeOf(tagname) === 'string') {
            var doc = document.createElement(tagname);
            if (typeOf(attr) === 'object') {
                $.path(doc).attr(attr);
            }
            return $.path(doc);
        } else {
            return $.path('nonedom');
        }
    };
    
    // CREATING DOM RENAMER.
    $.fn.rename     = function (newname) {
        if (typeOf(newname) === 'string') {
            for (var x = this.length - 1; x >= 0; --x) {
                var cdoc = this[x];
                var atrs = cdoc.attributes,
                    docs = $(document.createElement(newname));
                for (var i = 0; i < atrs.length; ++i) {
                    docs.attr(atrs[i].name, cdoc.getAttribute(atrs[i].name));
                }
                docs.html($(cdoc).html());
                $(cdoc).replaceWith(docs);
                this[x] = docs[0];
            }
        }
        return this;
    };
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