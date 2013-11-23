/**
TOCM - TOCL CSS MAGIC
v.1.0.1
© 2013 Siriussoft Corporation.
Developed bay Nanang - mahdaen@hotmail.com

Tocl CSS Magic is a CSS class generator. With Tocl CSS Magic you can create and manage CSS class easily.
Tocl CSS Magic allow you to create new class, add property, remove property or change property value without
writing or editing the css file. All css script is created on the fly. You doesn't need to have css file anymore.
-----------------------------------------------------------------------------------------------------------------
**/

/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING GLOBAL REFERENCES.
(function(window) {
    'use strict';
	var ObjectType = function (obj) {
		if (typeof obj === 'undefined') {
			return 'undefined';
		}
		if (typeof obj === null) {
			return null;
		}
		if (typeof obj === 'object') {
			if (obj.hasOwnProperty('handler') && obj.hasOwnProperty('id') && obj.hasOwnProperty('class')) {
				// return 'toclobject';
			}
			if (obj.hasOwnProperty('OnIdChange') && obj.hasOwnProperty('WriteCSS')) {
				// return 'toclhandler';
			}
		}

		return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
	};
	window.typeOf = window.ObjectType = ObjectType;
	var ObjectLastNode = function (from, what) {
		var ncoll = from;
		var acoll = {};
		for (var i = 0; i < ncoll.length; ++i) {
			acoll[ncoll[i].nodeName.toLowerCase()] = i;
		}
		var last = acoll[what];
		if (!last) {
			return -1;
		} else {
			return last;
		}
	};
	window.lastNode = ObjectLastNode;
	var ObjectSort = function (obj) {
		var key, array, object;
		if (typeOf(obj) === 'array') {
			return obj.sort();
		}
		if (typeOf(obj) === 'object') {
			array = [];
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					array.push(key);
				}
			}
			array = array.sort();
			object = {};
			for (key = 0; key < array.length; ++key) {
				object[array[key]] = obj[array[key]];
			}
			return object;
		}
	};
	window.sortObject = ObjectSort;
})(window);

// CREATING CORE OBJECTS.
(function(window) {
    'use strict';
    var ClassRef = {
        css3: [
            'animation', 'animation_name', 'animation_duration', 'animation_fill_mode', 'animation_timing_function', 'animation_delay',
            'animation_iteration_count', 'animation_direction', 'animation_play_state', 'background_clip', 'background_origin',
            'background_size', 'border_radius', 'border_top_left_radius', 'border_top_right_radius', 'border_bottom_left_radius',
            'border_bottom_right_radius', 'border_image', 'border_image_outset', 'border_image_repeat', 'border_image_slice',
            'border_image_source', 'border_image_width', 'box_align', 'box_direction', 'box_decoration_break', 'box_flex',
            'box_flex_group', 'box_lines', 'box_ordinal_group', 'box_orient', 'box_pack', 'box_sizing', 'box_shadow', 'break_after',
            'break_before', 'break_inside', 'columns', 'column_count', 'column_fill', 'column_gap', 'column_rule', 'column_rule_color',
            'column_rule_style', 'column_rule_width', 'column_span', 'column_width', 'marquee_direction', 'marquee_play_count',
            'marquee_speed', 'marquee_style', 'nav_index', 'nav_left', 'nav_right', 'nav_up', 'opacity', 'perspective', 'perspective_origin',
            'rotation', 'rotation_point', 'text_shadow', 'text_wrap', 'transform', 'transform_origin', 'transform_style', 'transition',
            'transition_property', 'transition_duration', 'transition_timing_function', 'transition_delay',
            // POSSIBLE DROPPED //
            'appearance', 'backface_visibility', 'grid_columns', 'grid_rows', 'hanging_punctuation', 'icon', 'punctuation_trim', 'resize',
            'target', 'target_name', 'target_new', 'target_position', 'word_break', 'word_wrap', 'filter'
        ],
        // CUSTOM PROPERTIES //
        ccss: [
            'background_linear_gradient', 'background_radial_gradient', 'border_linear_gradient', 'border_linear_gradient'
        ],
        // EXTENDED PROPERTIES //
        xcss: [
            'blur', 'brighness', 'contrast', 'saturate', 'grayscale', 'drop_shadow', 'hue_rotate', 'sepia', 'invert'
        ],
        // PSEUDO LISTS //
        psdo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang'
        ],
        
        // CREATING PRIVATE CSS GENERATOR.
        createCCSS: function (prop, value, tab) {
            var gradient = TocmRef.createGRDN;
            if (typeOf(prop) === 'string' && typeOf(value) === 'string') {
                if (prop === 'background_linear_gradient') {
                    return gradient('background_image', 'linear', value, tab);
                } else if (prop === 'background_radial_gradient') {
                    return gradient('background_image', 'radial', value, tab);
                } else if (prop === 'border_linear_gradient') {
                    return gradient('border_image', 'linear', value, tab);
                } else if (prop === 'border_radial_gradient') {
                    return gradient('border_image', 'radial', value, tab);
                }
            }
        },
        createXCSS: function (prop, value, tab) {
			var xcss = TocmRef.xcss;
			var x = xcss.indexOf(prop);
			if (x > -1) {
                var strcss = '';
				strcss += tab + 'filter: ' + xcss[x].replace('_', '-') + '(' + value + ');\n';
				strcss += tab + '-webkit-filter: ' + xcss[x].replace('_', '-') + '(' + value + ');\n';
                return strcss;
			}
        },
        createGRDN: function (type, mode, value, tab) {
			var cssl = ['linear-gradient', '-webkit-linear-gradient', '-moz-linear-gradient', '-o-linear-gradient', '-ms-linear-gradient'],
				cssr = ['radial-gradient', '-webkit-radial-gradient', '-moz-radial-gradient', '-o-radial-gradient', '-ms-radial-gradient'],
				i, j;
			var css = '';

			if (typeOf(type) !== 'string' || typeOf(mode) !== 'string' || typeOf(value) === 'undefined' || typeOf(value) === 'object') {
				return '';
			}
			if (type === 'background_image') {
				if (mode === 'linear') {
					if (typeOf(value) === 'array') {
						for (i = 0; i < cssl.length; ++i) {
							css += tab + 'background-image: ';
							for (j = 0; j < (value.length - 1); ++j) {
								css += cssl[i] + '(' + value[j] + '), ';
							}
							css += cssl[i] + '(' + value[value.length - 1] + ');\n';
						}
					} else if (typeOf(value) === 'string') {
						for (i = 0; i < cssl.length; ++i) {
							css += tab + 'background-image: ' + cssl[i] + '(' + value + ');\n';
						}
					}
				} else if (mode === 'radial') {
					if (typeOf(value) === 'array') {
						for (i = 0; i < cssr.length; ++i) {
							css += tab + 'background-image: ';
							for (j = 0; j < (value.length - 1); ++j) {
								css += cssr[i] + '(' + value[j] + '), ';
							}
							css += cssr[i] + '(' + value[value.length - 1] + ');\n';
						}
					} else if (typeOf(value) === 'string') {
						for (i = 0; i < cssr.length; ++i) {
							css += tab + 'background-image: ' + cssr[i] + '(' + value + ');\n';
						}
					}
				}
			} else if (type === 'border_image') {
				if (mode === 'linear') {
					if (typeOf(value) === 'array') {
						for (i = 0; i < cssl.length; ++i) {
							css += tab + 'border-image: ';
							for (j = 0; j < (value.length - 1); ++j) {
								css += cssl[i] + '(' + value[j] + '), ';
							}
							css += cssl[i] + '(' + value[value.length - 1] + ');\n';
						}
					} else if (typeOf(value) === 'string') {
						for (i = 0; i < cssl.length; ++i) {
							css += tab + 'border-image: ' + cssl[i] + '(' + value + ');\n';
						}
					}
				} else if (mode === 'radial') {
					if (typeOf(value) === 'array') {
						for (i = 0; i < cssr.length; ++i) {
							css += tab + 'border-image: ';
							for (j = 0; j < (value.length - 1); ++j) {
								css += cssr[i] + '(' + value[j] + '), ';
							}
							css += cssr[i] + '(' + value[value.length - 1] + ');\n';
						}
					} else if (typeOf(value) === 'string') {
						for (i = 0; i < cssr.length; ++i) {
							css += tab + 'border-image: ' + cssr[i] + '(' + value + ');\n';
						}
					}
				}
			}
			return css;
        }
    };
    
    // ATTACHING OBJECTS TO WINDOW OBJECT.
    window.TocmRef = ClassRef;
})(window);

// CREATING TOCM REGISTRY.
(function(window) {
    'use strict';
    // CREATING COLLECTIONS OF GLOBAL CLASS.
    var TocmDefClass = {
        index: [],
        class: []
    };
    // CREATING COLLECTIONS OF MEDIA SPESIFIC CLASS.
    var TocmMedClass = {
        media: [],
        index: [],
        class: []
    };
    // CREATING MEDIA COLLECTIONS.
    var TocmMedia = {
        index: [],
        media: []
    };
    // CREATING KEYFRAMES COLLECTIONS.
    var TocmKeyframes = {};
    // CREATING FONTS COLLECTIONS.
    var TocmFonts = {};
    
    // ATTACHING TOCM REGISTRY TO WINDOW OBJECT.
    window.TocmMedia = TocmMedia;
    window.TocmDefClass = TocmDefClass;
    window.TocmMedClass = TocmMedClass;
    window.TocmKeyframes = TocmKeyframes;
    window.TocmFonts = TocmFonts;
})(window);

// CREATING CSS STRING BUILDER.
(function(window) {
    'use strict';
    var ClassBuilder = {};
    // FUNCTION TO CREATE CSS STRING.
    ClassBuilder.createCSS = function (obj, tab) {
        var ccss = TocmRef.ccss,
            xcss = TocmRef.xcss,
            css3 = TocmRef.css3,
            cstr = '',
            prop;
        
        if (typeOf(obj) === 'object') {
            obj = sortObject(obj);
            // CREATE CUSTOM TAB.
            if (typeOf(tab) !== 'string') {
                tab = '';
            }
            // Processing CSS Object.
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] !== '') {
                    prop = key.replace('_', '-').replace('$', '*');
                    if (obj[key] !== null) {
                        if (ccss.indexOf(key) > -1) {
                            // Custom CSS Properties.
                            cstr += TocmRef.createCCSS(key, obj[key], tab);
                        } else if (xcss.indexOf(key) > -1) {
                            // Extended CSS Properties.
                            cstr += TocmRef.createXCSS(key, obj[key], tab);
                        } else if (css3.indexOf(key) > -1) {
                            // CSS3 Properties.
							cstr += tab + prop + ': ' + obj[key] + '; ';
							cstr += '-webkit-' + prop + ': ' + obj[key] + '; ';
							cstr += '-moz-' + prop + ': ' + obj[key] + '; ';
							cstr += '-o-' + prop + ': ' + obj[key] + '; ';
							cstr += '-ms-' + prop + ': ' + obj[key] + ';\n';
                        } else {
                            cstr += tab + prop + ': ' + obj[key] + ';\n';
                        }
                    }
                }
            }
            return cstr;
        } else {
            return '';
        }
    };
    // FUNCTION TO WRITE CSS STRING TO HANDLER.
    ClassBuilder.writeCSS = function (tclass) {
        var stid, minfo, cstr = '', key, style, head, hcld, spos, psdo;
        if (typeOf(tclass) === 'object' && tclass.hasOwnProperty('name')) {
            if (tclass.media !== 'none') {
                minfo = TocmClass.media(tclass.media);
                if (typeOf(minfo) === 'object') {
                    // OPENING CSSS MEDIA QUERIES.
                    cstr += '\n\t@media ' + minfo.value + ' {\n';
                    // OPENING CSS SELECTOR.
                    cstr += '\t\t' + tclass.name + ' {\n';
                    // CREATING CSS STRING.
                    cstr += TocmBuilder.createCSS(tclass.prop, '\t\t\t');
                    // CLOSING CSS SELECTOR.
                    cstr += '\t\t}\n';
                    // CREATING PSEUDO IF EXISTS.
                    psdo = tclass.psdo;
                    for (key in psdo) {
                        if (psdo.hasOwnProperty(key)) {
                            if (typeOf(psdo[key]) === 'object' && Object.keys(psdo[key]).length > 0) {
                                cstr += '\t\t' + tclass.name + ':' + key + ' {\n';
                                cstr += TocmBuilder.createCSS(psdo[key], '\t\t\t');
                                cstr += '\t\t}\n';
                            }
                        }
                    }
                    // CLOSING CSS MEDIA QUERIES.
                    cstr += '\t}\n';
                    
                    // WRITING THE STYLE NODE.
                    TocmBuilder.writeDOM(tclass.name, minfo.name, cstr);
                }
            } else {
                cstr += '\n\t' + tclass.name + ' {\n';
                cstr += TocmBuilder.createCSS(tclass.prop, '\t\t');
                cstr += '\t}\n';
                
                // CREATING PSEUDO IF EXISTS.
                psdo = tclass.psdo;
                for (key in psdo) {
                    if (psdo.hasOwnProperty(key)) {
                        if (typeOf(psdo[key]) === 'object' && Object.keys(psdo[key]).length > 0) {
                            cstr += '\t' + tclass.name + ':' + key + ' {\n';
                            cstr += TocmBuilder.createCSS(psdo[key], '\t\t');
                            cstr += '\t}\n';
                        }
                    }
                }
                
                // CREATING CSS HANDLER IF NOT EXIST. ELSE, USE IT.
                TocmBuilder.writeDOM(tclass.name, 'universal', cstr);
            }
        }
    };
    ClassBuilder.writeDOM = function (name, media, value) {
        var node, head, chld, last;
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            head = document.getElementsByTagName('head')[0];
            chld = head.children;
            last = lastNode(chld, 'style');
            node = document.getElementById(name);
            if (node && node.getAttribute('media') !== media) {
                node = null;
            }
            if (!node) {
                node = document.createElement('style');
                node.setAttribute('id', name);
                node.setAttribute('media', media);
                node.setAttribute('type', 'text/css');
                node.innerHTML = value;

                if (last > -1) {
                    head.insertBefore(node, chld[last + 1]);
                } else {
                    head.appendChild(node);
                }
            } else {
                node.innerHTML = value;
            }
        }
        return node;
    };
    
    // ATTACHING CSS STRING BUILDER TO WINDOW OBJECT.
    window.TocmBuilder = ClassBuilder;
})(window);

// CREATING TOCM CORE FUNCTIONS.
(function(window) {
    'use strict';
    // TocmClass Wrapper.
    var tocm = function (selector, media) {
        return new TocmClass(selector, media);
    };
    // CREATING CLASS SELECTOR.
    var TocmClass = function (selector, media) {
        var regs = TocmDefClass,
            obj, idx, sdx;
        if (typeOf(selector) === 'string') {
            if (typeOf(media) === 'string') {
                regs = TocmMedClass;
                idx = regs.media.indexOf(media);
                if (idx > -1) {
                    sdx = regs.index[idx].indexOf(selector);
                    if (sdx > -1) {
                        this.index = [idx, sdx];
                        this.class = regs.class[idx][sdx];
                    } else {
                        this.class = null;
                    }
                } else {
                    this.class = null;
                }
            } else {
                idx = regs.index.indexOf(selector);
                if (idx > -1) {
                    this.index = idx;
                    this.class = regs.class[idx];
                } else {
                    this.class = null;
                }
            }
        }
        return this;
    };
    // CREATING MODULE WRAPPER.
    tocm.module = TocmClass.prototype = {};
    // FUNCTION TO CREATE OR GET MEDIA QUERIES COLLECTIONS.
    tocm.module.media = function (name, value) {
        if (typeOf(name) === 'string') {
            var media, idx;
            if (typeOf(value) === 'string') {
                media = {
                    name: name,
                    value: value
                };
                idx = TocmMedia.index.indexOf(name);
                if (idx === -1) {
                    TocmMedia.index.push(name);
                    idx = TocmMedia.index.indexOf(name);
                    TocmMedia.media[idx] = media;
                } else {
                    TocmMedia.media[idx] = media;
                }
                return media;
            } else {
                idx = TocmMedia.index.indexOf(name);
                if (idx > -1) {
                    return TocmMedia.media[idx];
                } else {
                    return null;
                }
            }
        } else {
            return -1;
        }
    };
    // CREATING FUNCTION TO CREATE NEW CLASS.
    tocm.module.create = function (selector, props, media) {
        var cls = {}, regs = TocmDefClass, minfo, mdx, sdx, pdx;
        if (typeOf(selector) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            cls.name = selector;
            cls.prop = props;
            cls.psdo = {};
            
            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED.
            if (typeOf(media) === 'string') {
                minfo = this.media(media);
                if (typeOf(minfo) === 'object') {
                    cls.media = media;
                    regs = TocmMedClass;
                    mdx = regs.media.indexOf(media);
                    // ADD NEW MEDIA OWNER IF NOT EXIST.
                    if (mdx < 0) {
                        regs.media.push(media);
                        mdx = regs.media.indexOf(media);
                        regs.index[mdx] = [];
                        regs.class[mdx] = [];
                    }
                    // REPLACE OLD PROPERTIES IF EXIST. ELSE, CREATE NEW CLASS AND ADD PROPERTIES.
                    sdx = regs.index[mdx].indexOf(selector);
                    if (sdx < 0) {
                        regs.index[mdx].push(selector);
                        sdx = regs.index[mdx].indexOf(selector);
                        regs.class[mdx][sdx] = cls;
                    } else {
                        regs.class[mdx][sdx] = cls;
                    }
                }
            } else {
                cls.media = 'none';
                sdx = regs.index.indexOf(selector);
                if (sdx < 0) {
                    regs.index.push(selector);
                    sdx = regs.index.indexOf(selector);
                    regs.class[sdx] = cls;
                } else {
                    regs.class[sdx] = cls;
                }
            }
            // Writing CSS to Handler.
            TocmBuilder.writeCSS(cls);
            var newclass;
            if (typeOf(media) === 'string') {
                newclass = $class(selector, media);
            } else {
                newclass = $class(selector);
            }
            return newclass;
        }
    };
    // CREATING FUNCTION TO APPLY CHANGES.
    tocm.module.apply = function () {
        if (typeOf(this.class) === 'object') {
            var idx = this.index;
            if (this.class.media !== 'none') {
                TocmMedClass.class[idx[0]][idx[1]] = this.class;
            } else {
                TocmDefClass.class[idx] = this.class;
            }
            TocmBuilder.writeCSS(this.class);
        }
        return this;
    };
    
    // CREATING KEYFRAMES DEFINITIONS.
    var TocmKeyframe = function (name, position, properties) {
        var frame, pos;
        // DO ACTIONS ONLY IF ARGUMENTS IS VALID.
        if (typeOf(name) === 'string') {
            // CREATE KEYFRAMES IF ARGUMENT POSITION AND PROPERTIES ARE DEFINED, OR SELECT IF ONLY NAME THAT DEFINED.
            if (typeOf(position) === 'string' && typeOf(properties) === 'object') {
                this.name = name;
                frame = TocmKeyframes[name];
                if (typeOf(frame) !== 'object')  {
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
    TocmKeyframe.prototype = {
        write: function () {
            var cstr = '', style;
            if (this.hasOwnProperty('name') && typeOf(this.name) === 'string') {
                // Opening CSS Keyframes.
                cstr += '\n\t@keyframes ' + this.name + ' {\n';
                for (var pos in this) {
                    if (this.hasOwnProperty(pos) && pos !== 'name') {
                        // Opening Position.
                        cstr += '\t\t' + pos + ' {\n';
                        // Creating Properties.
                        if (typeOf(this[pos]) === 'object') {
                            cstr += TocmBuilder.createCSS(this[pos], '\t\t\t');
                        }
                        // Closing Position.
                        cstr += '\t\t}\n';
                    }
                }
                // Closing CSS Keyframes.
                cstr += '\t}\n';
                TocmBuilder.writeDOM(this.name, 'keyframe', cstr);
            }
            return this;
        },
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
    TocmFont.prototype = {
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
                                for (j = 0; j < (this.src.length); ++j) {
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

    // TocmKeyframe Wrapper.
    var frame = function (name, position, propertis) {
        return new TocmKeyframe(name, position, propertis);
    };
    // TocmFont Wrapper.
    var font = function (name, src, opt) {
        return new TocmFont(name, src, opt);
    };

    // ATTACHING TOCM MAKER TO WINDOW OBJECT.
    window.$class = window.Tocm = tocm;
    window.$build = tocm.module.create;
    window.$fonts = font;
    window.$frame = frame;
    window.$media = tocm.module.media;
})(window);

// CREATING TOCM MODULES.
(function(Tocm) {
    'use strict';
    // MODULE TO ASSIGN PROPERTIES.
    Tocm.module.set = function (objkey, value) {
        // DO ACTIONS ONLY IF THIS OBJECT IS TOCM CLASS.
        if (this.class.hasOwnProperty('name') && this.class.hasOwnProperty('prop')) {
            var key;
            // DO ACTIONS ONLY IF THE ARGUMENTS IS VALID TYPE.
            if (typeOf(objkey) === 'object') {
                for (key in objkey) {
                    if (objkey.hasOwnProperty(key)) {
                        this.class.prop[key] = objkey[key];
                    }
                }
            } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                this.class.prop[objkey] = value;
            }
            // APPLYING CHANGES.
            this.apply();
        }
        return this;
    };
    // MODULE TO ASSIGN PSEUDO PROPERTIES.
    Tocm.module.on = function (pseudo, props) {
        var psdo = TocmRef.psdo, key;
        // DO ACTIONS ONLY IF ALL ARGUMENTS WAS DEFINED WITH TRUE TYPE AND IF THIS CLASS IS TOCM CLASS.
        if (typeOf(pseudo) === 'string' && psdo.indexOf(pseudo) > -1 && 
            typeOf(props) === 'object' && typeOf(this.class) === 'object' && this.class.hasOwnProperty('media')) {
            // DEFINE NEW PSEUDO IF UNDEFINED.
            if (typeOf(this.class.psdo[pseudo]) === 'undefined') {
                this.class.psdo[pseudo] = {};
            }
            // APPLYING PROPERTIES TO PSEUDO.
            for (key in props) {
                if (props.hasOwnProperty(key)) {
                    this.class.psdo[pseudo][key] = props[key];
                }
            }
            // APPLYING CHANGES.
            this.apply();
        }
        return this;
    };
})(Tocm);