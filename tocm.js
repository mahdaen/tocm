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
    window.$path = XPathSelector;
    var Gradient = function (value, mode) {
        var gstr = '', vendor = TocmRef.vendor, type;
        if (typeOf('mode') === 'string') {
            mode += '-gradient';
        } else {
            mode = 'gradient';
        }
        if (typeOf(value) === 'string') {
            for (var i = 0; i < vendor.length; ++i) {
                gstr += vendor[i] + mode + '(' + value + '); ';
            }
            return gstr;
        } else {
            return 'none';
        }
    };
    window.gradient = Gradient;
    window.linear_gradient = function (value) {
        return gradient(value, 'linear');
    };
    window.radial_gradient = function (value) {
        return gradient(value, 'radial');
    };
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
        pseudo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang'
        ],
        // VENDOR LISTS //
        vendor: [
            '-webkit-', '-moz-', '-o-', '-ms-'
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
    var TocmDefClass = {};
    // CREATING COLLECTIONS OF MEDIA SPESIFIC CLASS.
    var TocmMedClass = {};
    // CREATING MEDIA COLLECTIONS.
    var TocmMedia = {};
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
    window.TocmAutoWrite = false;
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
                    if (typeOf(obj[key]) === 'number' && key !== 'font_weight' && key !== 'z_index') {
                        obj[key] += 'px';
                    }
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
    ClassBuilder.writeDOM = function (name, media, value) {
        var node, head, chld, last;
        var find = function (path) {
            var xpeval = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
            while (node = xpeval.iterateNext()) {
                return node;
            }
            return null;
        };
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            head = document.getElementsByTagName('head')[0];
            chld = head.children;
            last = lastNode(chld, 'style');
            node = find('//style[@id="' + name + '"][@data="' + media + '"]');
            if (node) {
                node.innerHTML = value;
            } else {
                node = document.createElement('style');
                node.setAttribute('id', name);
                node.setAttribute('data', media);
                node.setAttribute('type', 'text/css');
                node.innerHTML = value;

                if (last > -1) {
                    head.insertBefore(node, chld[last + 1]);
                } else {
                    head.appendChild(node);
                }
            }
        }
        return node;
    };
    ClassBuilder.writeSCS = function () {
        var defc = TocmDefClass, medc = TocmMedClass, key, fml, cls, dstr = '', mstr = '';
        var area, family, auto, pdstr = {}, pmdstr = {};
        // ENUMERATING DEFAULT CLASSES.
        for (key in defc) {
            if (defc.hasOwnProperty(key)) {
                area = defc[key].config.write_area; family = defc[key].family;
                if (area === 'family') {
                    if (typeOf(pdstr[family]) !== 'string') {
                        pdstr[family] = '';
                    }
                    pdstr[family] += TocmBuilder.writeCSS(defc[key], true);
                } else {
                    dstr += TocmBuilder.writeCSS(defc[key], true);
                }
            }
        }
        
        // WRITING GLOBAL CLASSES.
        if (dstr !== '') {
            TocmBuilder.writeDOM('Global Class', 'universal', dstr);
        }
        // WRITING PRIVATE CLASSES.
        for (fml in pdstr) {
            if (pdstr.hasOwnProperty(fml)) {
                TocmBuilder.writeDOM(fml, 'universal', pdstr[fml]);
            }
        }
        
        // ENUMERATING MEDIA CLASSES.
        for (key in medc) {
            if (medc.hasOwnProperty(key)) {
                for (cls in medc[key]) {
                    if (medc[key].hasOwnProperty(cls)) {
                        area = medc[key][cls].config.write_area; family = medc[key][cls].family;
                        if (area === 'family') {
                            if (typeOf(pmdstr[family]) !== 'string') {
                                pmdstr[family] = '';
                            }
                            pmdstr[family] += TocmBuilder.writeCSS(medc[key][cls], true);
                        } else {
                            mstr += TocmBuilder.writeCSS(medc[key][cls], true);
                        }
                    }
                }
                // WRITING GLOBAL CLASSES.
                if (mstr !== '') {
                    TocmBuilder.writeDOM('Global Class', key, mstr);
                }
                // WRITING PRIVATE CLASSES.
                for (fml in pmdstr) {
                    if (pmdstr.hasOwnProperty(fml)) {
                        TocmBuilder.writeDOM(fml, key, pmdstr[fml]);
                    }
                }
            }
        }
    };
    ClassBuilder.writeCSS = function (tclass, isget) {
        var stid, minfo, cstr = '', key, style, head, hcld, spos, psdo, cslist;
        var area = tclass.config.write_area, auto = tclass.config.write_auto, family = tclass.family, domid;
        if (typeOf(tclass) === 'object' && tclass.hasOwnProperty('name')) {
            if (tclass.media !== 'none') {
                minfo = $media(tclass.media);
                if (typeOf(minfo) === 'object') {
                    // OPENING CSSS MEDIA QUERIES.
                    cstr += '\n\t@media ' + minfo.value + ' {\n';
                    // OPENING CSS SELECTOR.
                    cstr += '\t\t' + tclass.name + ' {\n';
                    // CREATING CSS STRING.
                    cstr += TocmBuilder.createCSS(tclass.properties, '\t\t\t');
                    // CLOSING CSS SELECTOR.
                    cstr += '\t\t}\n';
                    // CREATING PSEUDO IF EXISTS.
                    psdo = tclass.pseudo;
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
                    if (typeOf(isget) === 'boolean' && isget === true) {
                        return cstr;
                    } else {
                        // WRITING THE STYLE NODE.
                        if (auto === true) {
                            TocmBuilder.writeDOM(tclass.name, minfo.name, cstr);
                        }
                    }
                }
            } else {
                cstr += '\n\t' + tclass.name + ' {\n';
                cstr += TocmBuilder.createCSS(tclass.properties, '\t\t');
                cstr += '\t}\n';
                
                // CREATING PSEUDO IF EXISTS.
                psdo = tclass.pseudo;
                for (key in psdo) {
                    if (psdo.hasOwnProperty(key)) {
                        if (typeOf(psdo[key]) === 'object' && Object.keys(psdo[key]).length > 0) {
                            cstr += '\t' + tclass.name + ':' + key + ' {\n';
                            cstr += TocmBuilder.createCSS(psdo[key], '\t\t');
                            cstr += '\t}\n';
                        }
                    }
                }
                
                if (typeOf(isget) === 'boolean' && isget === true) {
                    return cstr;
                } else {
                    // WRITING THE STYLE NODE.
                    if (auto === true) {
                        TocmBuilder.writeDOM(tclass.name, 'universal', cstr);
                    }
                }
            }
        }
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
        var obj, key;
        if (typeOf(selector) === 'string') {
            // Trying to get from default class.
            obj = TocmDefClass[selector];

            if (typeOf(media) === 'string' && media !== 'none') {
                if (!$media(media).hasOwnProperty('name')) {
                    return;
                }
                // Trying to get from media class if using media filter.
                if (typeOf(TocmMedClass[media]) === 'object') {
                    obj = TocmMedClass[media][selector];
                    if (typeOf(obj) !== 'object') {
                        return;
                    }
                } else {
                    return;
                }
            }
            
            if (typeOf(obj) === 'object') {
                this.name = selector;
                this.family = obj.family;
                this.config = obj.config;
                this.media = obj.media;
                this.properties = obj.properties;
                this.pseudo = obj.pseudo;
                this.parent = obj.parent;
            }
        }
        return this;
    };
    // CREATING MODULE WRAPPER.
    tocm.module = TocmClass.prototype = {
        // CREATING FUNCTION TO APPLY CHANGES.
        apply: function () {
            var key, obj = {};
            if (this.hasOwnProperty('name')) {
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        obj[key] = this[key];
                    }
                }
                if (this.media !== 'none') {
                    TocmMedClass[this.media][this.name] = obj;
                } else {
                    TocmDefClass[this.name] = obj;
                }
                if (TocmAutoWrite === true) {
                    TocmBuilder.writeSCS(obj);
                }
            }
            return this;
        }
    };
    // ATTACHING TOCM MAKER TO WINDOW OBJECT.
    window.$class = window.Tocm = tocm;
    
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
                                cstr += TocmBuilder.createCSS(this[pos], '\t\t\t');
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
    // CREATING FUNCTION TO CREATE NEW CLASS.
    var TocmCreate = function (selector, props, media, auto) {
        var cls = {}, regs = TocmDefClass, obj;
        if (typeOf(selector) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            cls.name = cls.family = selector;
            cls.properties = props;
            cls.pseudo = {};
            cls.config = {
                write_area: 'universal', // family <> universal <> independent.
                write_auto: true
            };
            cls.parent = {};
            
            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED.
            if (typeOf(media) === 'string' && media !== 'none') {
                if ($media(media).hasOwnProperty('name') === false) {
                    return;
                }
                cls.media = media;
                if (typeOf(TocmMedClass[media]) === 'object') {
                    TocmMedClass[media][selector] = cls;
                } else {
                    TocmMedClass[media] = {};
                    TocmMedClass[media][selector] = cls;
                }
            } else {
                cls.media = 'none';
                TocmDefClass[selector] = cls;
            }
            // Writing CSS to Handler.
            //TocmBuilder.writeSCS(cls);
            var newclass;
            if (typeOf(media) === 'string' && media !== 'none') {
                newclass = $class(selector, media);
            } else {
                newclass = $class(selector);
            }
            if (!auto || auto !== false) {
                newclass.apply();
            }
            return newclass;
        }
    };
    // CREATING FUNCTION TO CREATE PRIVATE CLASS.
    var TocmPrivate = function (selector, props, media) {
        var newclass = $glob(selector, props, media, false);
        if (newclass.hasOwnProperty('name')) {
            newclass.config.write_area = 'family';
            newclass.apply();
            return newclass;
        } else {
            return null;
        }
    };
    window.$priv = TocmPrivate;
    // CREATING FUNCTION TO CREATE BATCH OBJECT CLASSES.
    window.$batch = function (name, object, family, parent) {
        var key, xkey, newclass, media, newname, subclass, vobj = {}, vpsdo = {};
        if (typeOf(name) === 'string' && typeOf(object) === 'object') {
            // Parsing name and media.
            if (name.search('@') > -1) {
                name = name.replace(/\s+(\@)\s+/g, '@');
                name = name.split('@');
                media = name[1];
                name = name[0];
            } else {
                media = 'none';
            }
            // Enumerating Property and new object.
            newclass = $priv(name, {}, media);
            
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    if (typeOf(object[key]) === 'object') {
                        if (TocmRef.pseudo.indexOf(key) < 0) {
                            // If not pseudo, then create new object with adding parent name.
                            newname = name + ' ';
                            if (key.search('&') > -1) {
                                // If  name is multiple.
                                xkey = key.replace(/\s+(\&)\s+/g, '&');
                                xkey = xkey.split('&');
                                for (var i = 0; i < xkey.length - 1; ++i) {
                                    newname += xkey[i] + ', ' + name + ' ';
                                }
                                newname += xkey[xkey.length - 1];
                            } else {
                                newname += key;
                            }
                            if (typeOf(family) !== 'string') {
                                family = name;
                            }
                            subclass = $batch(newname, object[key], family, newclass);
                        } else {
                            if (typeOf(vpsdo[key]) !== 'object') {
                                vpsdo[key] = object[key];
                            } else {
                                for (var vip in object[key]) {
                                    if (object[key].hasOwnProperty(vip)) {
                                        vpsdo[key][vip] = [object][key][vip];
                                    }
                                }
                            }
                        }
                    } else {
                        vobj[key] = object[key];
                    }
                }
            }
            if (typeOf(newclass) === 'object' && newclass.hasOwnProperty('name')) {
                if (typeOf(family) === 'string') {
                    newclass.family = family;
                } else {
                    newclass.family = name;
                }
                if (typeOf(parent) === 'object' && parent.hasOwnProperty('name')) {
                    newclass.parent = parent;
                }
                for (var po in vobj) {
                    if (vobj.hasOwnProperty(po)) {
                        newclass.properties[po] = vobj[po];
                    }
                }
                for (var ps in vpsdo) {
                    if (vpsdo.hasOwnProperty(ps)) {
                        newclass.pseudo[ps] = vpsdo[ps];
                    }
                }
                newclass.apply();
            }
            return newclass;
        }
    };
    // CREATING WRPAPPER //
    // TocmKeyframe Wrapper.
    window.$frame = function (name, position, propertis) {
        return new TocmKeyframe(name, position, propertis);
    };
    // TocmFont Wrapper.
    window.$fonts = function (name, src, opt) {
        return new TocmFont(name, src, opt);
    };
    // TocmMedia Wrapper.
    window.$media = function (name, value) {
        return new TocmMedia(name, value);
    };
    window.$glob = function (selector, props, media, auto) {
        return new TocmCreate(selector, props, media, auto);
    };
})(window);

// CREATING TOCM MODULES.
(function(Tocm) {
    'use strict';
    // MODULE TO ASSIGN PROPERTIES.
    Tocm.module.set = function (objkey, value) {
        // DO ACTIONS ONLY IF THIS OBJECT IS TOCM CLASS.
        if (this.hasOwnProperty('name') && this.hasOwnProperty('properties')) {
            var key;
            // DO ACTIONS ONLY IF THE ARGUMENTS IS VALID TYPE.
            if (typeOf(objkey) === 'object') {
                for (key in objkey) {
                    if (objkey.hasOwnProperty(key)) {
                        this.properties[key] = objkey[key];
                    }
                }
            } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                this.properties[objkey] = value;
            }
            // APPLYING CHANGES.
            this.apply();
        }
        return this;
    };
    // MODULE TO ASSIGN PSEUDO PROPERTIES.
    Tocm.module.on = function (pseudo, props) {
        var key;
        // DO ACTIONS ONLY IF ALL ARGUMENTS WAS DEFINED WITH TRUE TYPE AND IF THIS CLASS IS TOCM CLASS.
        if (typeOf(pseudo) === 'string' && typeOf(props) === 'object' && this.hasOwnProperty('name')) {
            if (pseudo.search('&') > -1) {
                pseudo = pseudo.replace(/\s+(\&)\s+/g, '&');
                pseudo = pseudo.split('&');
                for (var i = 0; i < pseudo.length; ++i) {
                    if (this.media !== 'none') {
                        this.on(pseudo[i], props);
                    } else {
                        this.on(pseudo[i], props);
                    }
                }
            } else {
                // DEFINE NEW PSEUDO IF UNDEFINED.
                if (typeOf(this.pseudo[pseudo]) === 'undefined') {
                    this.pseudo[pseudo] = {};
                }
                // APPLYING PROPERTIES TO PSEUDO.
                for (key in props) {
                    if (props.hasOwnProperty(key)) {
                        this.pseudo[pseudo][key] = props[key];
                    }
                }
                // APPLYING CHANGES.
                this.apply();
            }
        }
        return this;
    };
    // MODULE TO IMPORT PROPERTIES FROM ANOTHER CLASS.
    Tocm.module.copy = function (name, media, psdo) {
        var parent, key, ppsdo;
        if (typeOf(name) === 'string') {
            if (typeOf(media) === 'string' && media !== '' && media !== 'none') {
                parent = $class(name, media);
            } else {
                parent = $class(name);
            }
            
            for (key in parent.properties) {
                if (parent.properties.hasOwnProperty(key)) {
                    this.properties[key] = parent.properties[key];
                }
            }
            
            if (typeOf(psdo) === 'string') {
                if (parent.pseudo.hasOwnProperty(psdo)) {
                    ppsdo = parent.pseudo[psdo];
                    for (key in ppsdo) {
                        if (ppsdo.hasOwnProperty(key)) {
                            if (!this.pseudo.hasOwnProperty(psdo)) {
                                this.pseudo[psdo] = {};
                            }
                            this.pseudo[psdo][key] = ppsdo[key];
                        }
                    }
                }
            }
            this.apply();
        }
        return this;
    };
    // MODULE TO ADD CHILD CLASS. 
    Tocm.module.add = function (name, prop) {
        var newname = this.name + ' ';
        if (typeOf(name) === 'string') {
            if (name.search('&')) {
                name = name.replace(/\s+(\&)\s+/g, '&');
                name = name.split('&');
                for (var i = 0; i < name.length - 1; ++i) {
                    newname += name[i] + ', ' + this.name + ' ';
                }
                newname += name[name.length-1];
            }
        }
        var newclass = $glob(newname, prop, this.media, false);
        if (newclass.hasOwnProperty('name')) {
            newclass.family = this.family;
            newclass.parent = this;
            newclass.config.write_area = 'family';
            newclass.apply();
            return newclass;
        } else {
            return this;
        }
    };
    // MOODULE TO NAVIGATE TO OTHER CLASS.
    Tocm.module.goto = function (name) {
        var fclass = $class(this.name + ' ' + name, this.media);
        if (fclass.hasOwnProperty('name')) {
            return fclass;
        } else {
            return this;
        }
    };
    // MODULE TO GO BACK TO PARENT CLASS.
    Tocm.module.back = function () {
        if (this.hasOwnProperty('parent') && this.parent.hasOwnProperty('name')) {
            return this.parent;
        } else {
            return this;
        }
    };
})(Tocm);