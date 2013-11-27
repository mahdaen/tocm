/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING A TOCM CLASS SUPPORT.
// KEYFRAME COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING KEYFRAMES DEFINITIONS.
    var TocmKeyframe = function (name, position, properties) {
        var frame, pos;
        // DO ACTIONS ONLY IF ARGUMENTS IS VALID.
        if (typeOf(name) === 'string') {
            // CREATE KEYFRAMES IF ARGUMENT POSITION AND PROPERTIES ARE DEFINED, OR SELECT IF ONLY NAME THAT DEFINED.
            if (typeOf(position) === 'string' && typeOf(properties) === 'object') {
                this.name = name;
                frame = TocmKeyframes[name];
                if (typeOf(frame) !== 'object') {
                    TocmKeyframes[name] = {};
                    TocmKeyframes[name][position] = properties;
                }

                TocmKeyframes[name][position] = properties;
                this[position] = properties;
                // Writing the Keyframe CSS.
                this.write();
            } else {
                frame = TocmKeyframes[name];
                if (typeOf(frame) === 'object') {
                    this.name = name;
                    for (pos in frame) {
                        if (frame.hasOwnProperty(pos)) {
                            this[pos] = frame[pos];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPE.
    TocmKeyframe.prototype = {
        // FUNCTION TO WRITE KEYFRAME.
        write: function () {
            var cstr = '', style, vendor;
            vendor = ['', '-webkit-'];
            if (this.hasOwnProperty('name') && typeOf(this.name) === 'string') {
                // Opening CSS Keyframes.
                for (var i = 0; i < vendor.length; ++i) {
                    cstr += '\n\t@' + vendor[i] + 'keyframes ' + this.name + ' {\n';
                    for (var pos in this) {
                        if (this.hasOwnProperty(pos) && pos !== 'name') {
                            // Opening Position.
                            cstr += '\t\t' + pos + ' {\n';
                            // Creating Properties.
                            if (typeOf(this[pos]) === 'object') {
                                cstr += TocmBuilder.generateCSS(this[pos], '\t\t\t');
                            }
                            // Closing Position.
                            cstr += '\t\t}\n';
                        }
                    }
                    // Closing CSS Keyframes.
                    cstr += '\t}\n';
                }
                TocmBuilder.writeDOM(this.name, 'keyframe', cstr);
            }
            return this;
        },
        // FUNCTION TO ADD TIMELINE POSITION.
        at: function (position, properties) {
            var key, current;
            if (this.hasOwnProperty('name') && typeOf(position) === 'string' && typeOf(properties) === 'object') {
                if (typeOf(this[position]) !== 'object') {
                    this[position] = {};
                }

                for (key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[position][key] = properties[key];
                    }
                }
                TocmKeyframes[this.name][position] = this[position];
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmKeyframe.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmKeyframe.prototype, 'at', {
        enumerable: false
    });
    // TocmKeyframe Wrapper.
    window.$keyframes = function (name, position, propertis) {
        return new TocmKeyframe(name, position, propertis);
    };
})(window);

// FONTS COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE OR GET FONT-FACE COLLECTIONS.
    var TocmFont = function (name, src, opt) {
        var fonts, key;
        if (typeOf(name) === 'string') {
            fonts = TocmFonts[name];
            if (typeOf(src) === 'string' || typeOf(src) === 'array') {
                TocmFonts[name] = {};
                this.name = name;
                TocmFonts[name].src = src;
                this.src = src;
                if (typeOf(opt) === 'object') {
                    for (key in opt) {
                        if (opt.hasOwnProperty(key)) {
                            TocmFonts[name][key] = opt[key];
                            this[key] = opt[key];
                        }
                    }
                }
                this.write();
            } else {
                if (typeOf(fonts) === 'object') {
                    this.name = name;
                    for (key in fonts) {
                        if (fonts.hasOwnProperty(key)) {
                            this[key] = fonts[key];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPES.
    TocmFont.prototype = {
        // WRITING FONTS.
        write: function () {
            var cstr = '', key, j;
            if (this.hasOwnProperty('name')) {
                cstr += '\n\t@font-face {\n';
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        if (key === 'name') {
                            cstr += '\t\tfont-family: "' + this.name + '";\n';
                            cstr += '\t\tsrc: local("' + this.name + '");\n';
                        } else if (key === 'src') {
                            if (typeOf(this.src) === 'array') {
                                for (j = 0; j < (this.src.length) ; ++j) {
                                    if (this.src[j].search('.eot') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '");\n';
                                        cstr += '\t\tsrc: url("' + this.src[j] + '?#iefix") format("embedded-opentype");\n';
                                    } else if (this.src[j].search('.ttf') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("truetype");\n';
                                    } else if (this.src[j].search('.svg') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("svg");\n';
                                    } else if (this.src[j].search('.otf') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("opentype");\n';
                                    } else if (this.src[j].search('.woff') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("woff");\n';
                                    } else {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '");\n';
                                    }
                                }
                            } else if (typeOf(this.src) === 'string') {
                                cstr += '\t\tsrc: url("' + this.src + '");';
                            }
                        } else {
                            cstr += '\t\t' + key.replace('_', '-') + ': ' + this[key] + ';\n';
                        }
                    }
                }
                cstr += '\t}\n';
                TocmBuilder.writeDOM(this.name, 'font', cstr);
            }
            return this;
        },
        // CONFIGURING FONTS.
        set: function (objkey, value) {
            var name, key;
            if (this.hasOwnProperty('name')) {
                name = this.name;
                if (typeOf(objkey) === 'object') {
                    for (key in objkey) {
                        if (objkey.hasOwnProperty(key)) {
                            this[key] = objkey[key];
                            TocmFonts[name][key] = objkey[key];
                        }
                    }
                } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                    this[objkey] = value;
                    TocmFonts[name][objkey] = value;
                }
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmFont.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmFont.prototype, 'set', {
        enumerable: false
    });
    // TocmFont Wrapper.
    window.$fonts = function (name, src, opt) {
        return new TocmFont(name, src, opt);
    };
})(window);

// MEDIA COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE MEDIA QUERIES COLLECTIONS.
    var TocmMedia = function (name, value) {
        var media;
        if (typeOf(name) === 'string') {
            if (typeOf(value) === 'string') {
                window.TocmMedia[name] = {
                    name: name,
                    value: value
                };
                this.name = name;
                this.value = value;
                return this;
            } else {
                media = window.TocmMedia[name];
                if (typeOf(media) === 'object') {
                    this.name = media.name;
                    this.value = media.value;
                    return this;
                } else {
                    return -1;
                }
            }
        }
    };

    // TocmMedia Wrapper.
    window.$media = function (name, value) {
        return new TocmMedia(name, value);
    };
})(window);