/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING CONFIGURATION AND COLLECTIONS.
(function (window) {
    'use strict';
    window.TocmTimeline = {};
    if (!TocmConfig) {
        window.TocmConfig = {};
    }
    TocmConfig.animation = {
        duration: 0,
        timing: 'linear',
        delay: 0,
        repeat: 1,
        direction: 'normal',
        state: 'running',
        inherit: true
    };
})(window);

// CREATING CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING ENUMERATOR.
    var _writeAnimation = function (name, property, preconf, timeline) {
        if (typeOf(name) === 'string' && typeOf(property) === 'object') {
            // GETTING CONFIGURATIONS.
            var conf        = Object.keys(TocmConfig.animation),
                config      = TocmConfig.animation;
            
            // CREATING USABLE VARIABLES.
            var csstring = '',
                keyframe = '',
                cssclass = '';
            var atab = '\t',
                btab = '\t\t',
                ctab = '\t\t\t',
                open = ' {\n',
                line = ';\n',
                close = '}\n';
            
            // CREATING ANIMATION OBJECT.
            var animation = property, inherited = {}, selftimeline = {};
            
            // CREATING ANIMATION CONFIGURATIONS.
            if (!animation.duration) {
                if (typeOf(preconf) === 'object') {
                    animation.duration = preconf.duration;
                } else {
                    animation.duration = config.duration;
                }
            }
            if (!animation.timing) {
                if (typeOf(preconf) === 'object') {
                    animation.timing = preconf.timing;
                } else {
                    animation.timing = config.timing;
                }
            }
            if (!animation.delay) {
                if (typeOf(preconf) === 'object') {
                    animation.delay = preconf.delay;
                } else {
                    animation.delay = config.delay;
                }
            }
            if (!animation.repeat) {
                if (typeOf(preconf) === 'object') {
                    animation.repeat = preconf.repeat;
                } else {
                    animation.repeat = config.repeat;
                }
            }
            if (!animation.direction) {
                if (typeOf(preconf) === 'object') {
                    animation.direction = preconf.direction;
                } else {
                    animation.direction = config.direction;
                }
            }
            if (!animation.state) {
                if (typeOf(preconf) === 'object') {
                    animation.state = preconf.state;
                } else {
                    animation.state = config.state;
                }
            }
            if (typeOf(animation.inherit) !== 'boolean') {
                if (typeOf(preconf) === 'object') {
                    animation.inherit = preconf.inherit;
                } else {
                    animation.inherit = config.inherit;
                }
            }
            
            // CREATING TIMELINE.
            if (typeOf(timeline) === 'object' && animation.inherit === true) {
                for (var x in timeline) {
                    if (timeline.hasOwnProperty(x)) {
                        selftimeline[x.replace(/\%/g, '')] = timeline[x];
                    }
                }
            }
            for (var time in animation) {
                if (animation.hasOwnProperty(time) && time.match(/\%/g)) {
                    selftimeline[time.replace(/\%/g, '')] = animation[time];
                }
            }
            
            // SORTING TIMELINE.
            selftimeline = selftimeline.sort('STH');
            
            // CREATING CSS KEYFRAMES STRING.
            // Opening keyframes.
            keyframe += atab + '@keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    inherited[time] = selftimeline[time];
                    
                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;
            // Opening keyframes.
            keyframe += atab + '@-webkit-keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;

            // CREATING CSS CLASS STRING.
            // Opening selector.
            cssclass += atab + name + open;
            // Adding animation properties.
            cssclass += btab + 'animation: ' + name.replace(/\./g, '_').replace(/\s/g, '') + ' ' + animation.duration + 's ' + animation.timing + ' '  + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + 'animation-play-state: ' + animation.state + ';\n';
            cssclass += btab + '-webkit-animation: ' + name.replace(/\./g, '_').replace(/\s/g, '') + ' ' + animation.duration + 's ' + animation.timing + ' '  + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + '-webkit-animation-play-state: ' + animation.state + ';\n';
            // Closing selector
            cssclass += atab + close;
            
            // ADDING GENERATED CLASS AND KEYFRAME TO CSS STRING.
            csstring += keyframe + '\n' + cssclass + '\n';
            
            // ITERATING CHILD ANIMATIONS.
            for (var child in animation) {
                if (animation.hasOwnProperty(child) && child.match(/\%/g) === null && conf.indexOf(child) < 0) {
                    csstring += _writeAnimation(name + ' ' + child, animation[child], {
                        duration: animation.duration,
                        timing: animation.timing,
                        delay: animation.delay,
                        repeat: animation.repeat,
                        direction: animation.direction,
                        state: animation.state,
                        inherit: animation.inherit
                    }, inherited);
                }
            }
            return csstring;
        } else {
            return '';
        }
    };
    
    // CREATING CORE CONSTRUCTOR.
    var TocmAnimation = function (name, properties) {
        if (typeOf(name) === 'string') {
            if (typeOf(properties) === 'object') {
                this.name = name;
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[key] = properties[key];
                    }
                }
                this.apply();
                return this;
            } else {
                return TocmTimeline[name];
            }
        }
    };
    
    // REGISTERING TO WINDOW OBJECT AND CREATING MODULE WRAPPER.
    window.$animation = window.TocmAnimation = function (name, properties) {
        return new TocmAnimation(name, properties);
    };
    window.$animation.module = TocmAnimation.prototype = {
        apply: function () {
            TocmTimeline[this.name] = this;
            TocmBuilder.writeDOM(this.name, 'animation', _writeAnimation(this.name, JSON.parse(JSON.stringify(this))));
            return this;
        }
    };
})(window);

// CREATING MODULES.
(function ($module) {
    'use strict';
    // FUNCTION TO ADD CHILD ANIMATION.
    $module.add = function (name, properties) {
        if (typeOf(name) === 'string' && typeOf(properties) === 'object') {
            this[name] = properties;
            this.apply();
            return this;
        }
    };
    // FUNCTION TO PAUSE ANIMATION.
    $module.pause = function (delay) {
        this.state = 'paused';
        this.apply();
        var target = this;
        if (typeOf(delay) === 'number') {
            setTimeout(function () {
                target.play();
            }, (delay * 1000));
        }
        return this;
    };
    // FUNCTION TO CONTINUE ANIMATION.
    $module.play = function () {
        this.state = 'running';
        this.apply();
        return this;
    };
    // FUNCTION TO SET PROPERTIES OR CONFIGURATIONS.
    $module.set = function (property, value) {
        if (typeOf(property) === 'string') {
            var recset = function (object, prop) {
                for (var key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        if (typeOf(prop[key]) === 'object') {
                            if (!object[key]) {
                                object[key] = {};
                            }
                            recset(object[key], prop[key]);
                        } else {
                            object[key] = prop[key];
                        }
                    }
                }
            };
            
            if (typeOf(value) === 'object') {
                if (!this[property]) {
                    this[property] = {};
                }
                recset(this[property], value);
            } else {
                this[property] = value;
            }
            this.apply();
        } else if (typeOf(property) === 'object') {
            for (var name in property) {
                if (property.hasOwnProperty(name)) {
                    this.set(name, property[name]);
                }
            }
        }
        this.pause(0.01);
        return this;
    };
    
    // HIDING MODULES.
    var mod = Object.keys($module);
    for (var i = 0; i < mod.length; ++i) {
        Object.defineProperty(TocmAnimation.module, mod[i], {enumerable: false});
    }
})(TocmAnimation.module);

