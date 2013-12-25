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
        inherit: true,
        endNode: '',
        endTime: 0
    };
})(window);

// CREATING CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING ENUMERATOR.
    var _writeAnimation = function (name, property, preconf, timeline) {
        if (typeOf(name) === 'string' && typeOf(property) === 'object') {
            // GETTING CONFIGURATIONS.
            var conf = Object.keys(TocmConfig.animation),
                config = TocmConfig.animation;

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
            var animation = property,
                inherited = {}, selftimeline = {};

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
            selftimeline = sortObject(selftimeline);

            // CREATING CSS KEYFRAMES STRING.
            // Opening keyframes.
            keyframe += atab + '@keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
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
            keyframe += atab + '@-webkit-keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
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
            cssclass += btab + 'animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' ' + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + 'animation-play-state: ' + animation.state + ';\n';
            cssclass += btab + '-webkit-animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' ' + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
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
        if (typeOf(name) === 'string' && !name.match(/[\!\@\#\$\%\^\&\*\.\,\:\;]+/)) {
            if (typeOf(properties) === 'object') {
                $.log('TocmAnimation', 'Creating new animation "' + name + '".');
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
    // LOCKING OBJECT.
    lock('$animation');
    lock('TocmAnimation');

    // CREATING MODULES.
    window.TocmAnimation.module = TocmAnimation.prototype = {
        apply: function () {
            // Getting the larger runtime.
            this.last();
            // Hiding Properties.
            var x = ['endNode', 'endTime', 'name'];
            for (var i = 0; i < x.length; ++i) {
                if (this.hasOwnProperty(x[i])) {
                    hide(x[i], this);
                }
            }
            // Adding animation object to Timeline.
            TocmTimeline[this.name] = this;
            // Build the animation.
            $.log('TocmAnimation', 'Writing animation "' + this.name + '" to style node.', 'orange');
            TocmBuilder.writeDOM(this.name, 'animation', _writeAnimation('.' + this.name, JSON.parse(JSON.stringify(this))));
            return this;
        },
        // FUNCTION TO GET LAST ANIMATED CLASS.
        last: function () {
            var conf = Object.keys(TocmConfig.animation),
                config = TocmConfig.animation;

            var endTime = config.endTime,
                endNode = config.endNode;

            var inherit = function (animation, preconf) {
                if (typeOf(animation) === 'object') {
                    // CREATING ANIMATION CONFIGURATIONS.
                    if (!animation.duration) {
                        if (typeOf(preconf) === 'object') {
                            animation.duration = preconf.duration;
                        } else {
                            animation.duration = config.duration;
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
                }
                return animation;
            };

            var nobj = JSON.parse(JSON.stringify(this));
            nobj = inherit(nobj);

            var gLast = function (obj) {
                if (typeOf(obj) !== 'object') return;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === 'duration') {
                            var hX = obj.duration;
                            if (obj.hasOwnProperty('delay') && hX > 0) {
                                hX += obj.delay;
                            }
                            if (hX > endTime) {
                                if (obj.hasOwnProperty('repeat')) {
                                    if (obj.repeat === 'infinite') {
                                        $.log('TocmAnimation', '"' + obj.name + '": using infinite play and it\'s mean never stoped. Now skipping end-point node.', 'purple');
                                        endTime = 0;
                                        endNode = '';
                                    } else if (obj.repeat > 0) {
                                        $.log('TocmAnimation', '"' + obj.name + '": takes ' + (hX * obj.repeat) + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                        endTime = hX * obj.repeat;
                                        endNode = obj.name;
                                    }
                                } else {
                                    $.log('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                    endTime = hX;
                                    endNode = obj.name;
                                }
                            } else {
                                $.log('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s smaller or equal to current largest time: "' + endTime + 's". Now skip it.', 'purple');
                            }
                        } else if (typeOf(obj[key]) === 'object' && !key.match(/\%/g) && conf.indexOf(key) < 0) {
                            var xobj = obj[key];
                            xobj.name = key;
                            xobj = inherit(xobj, obj);
                            gLast(xobj);
                        }
                    }
                }
            };

            gLast(nobj);

            this.endNode = endNode;
            this.endTime = endTime;

            return this;
        }
    };
})(window);

// CREATING MODULES.
(function (e) {
    'use strict';
    // FUNCTION TO ADD CHILD ANIMATION.
    e.add = function (name, properties) {
        $.log('TocmAnimation', 'Adding new animation "' + name + '" to parent animation "' + this.name + '".');
        if (typeOf(name) === 'string' && typeOf(properties) === 'object') {
            this[name] = properties;
            this.apply();
            return this;
        }
    };
    // FUNCTION TO PAUSE ANIMATION.
    e.pause = function (delay) {
        $.log('TocmAnimation', 'Pausing animation "' + this.name + '".');
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
    e.play = function () {
        $.log('TocmAnimation', 'Playing animation "' + this.name + '".');
        this.state = 'running';
        this.apply();
        return this;
    };
    // FUNCTION TO SET PROPERTIES OR CONFIGURATIONS.
    e.set = function (property, value) {
        $.log('TocmAnimation', 'Setting property to animation "' + this.name + '".', 'green');
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
            $.log('TocmAnimation', 'Applying changes to animation "' + this.name + '".', 'purple');
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
    // FUNCTION TO DELETE ANIMATION.
    e.remove = function () {
        $.log('TocmAnimation', 'Removing animation "' + this.name + '".', 'red');
        delete TocmTimeline[this.name];
        var node = $.path('#' + this.name.replace(/\./g, ''))[0];
        node.parentNode.removeChild(node);
        return [];
    };

    // HIDING MODULES.
    var mod = Object.keys(e);
    for (var i = 0; i < mod.length; ++i) {
        lock(mod[i], TocmAnimation.module);
    }
})(TocmAnimation.module);