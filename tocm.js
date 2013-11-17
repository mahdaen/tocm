/**
TOCM - TOCL CSS MAGIC
v.1.0.1
© 2013 Siriussoft Corporation.
Developed bay Nanang - mahdaen@hotmail.com

Tocl CSS Magic is a CSS object generator. With Tocl CSS Magic you can create and manage CSS Class easily.
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
	// CREATING FUNCTION TO MOVE ARRAY ITEM //
	var ObejctMove = function (object, item, into) {
		var i, current, candidt, temp;
		temp = [];
		if (typeOf(object) === 'array' && object.length > 1 && typeOf(item) !== 'undefined' && object.indexOf(item) > -1) {
			if (typeOf(into) === 'string') {
				if (into === 'up' && object.indexOf(item) > 0) {
					current = object.indexOf(item);
					candidt = object[current - 1];
					for (i = 0; i < (object.length); ++i) {
						if (i === (current - 1)) {
							temp.push(item);
							temp.push(candidt);
							i += 1;
						} else {
							temp.push(object[i]);
						}
					}
				} else if (into === 'down' && object.indexOf(item) < (object.length - 1)) {
					current = object.indexOf(item);
					candidt = object[current + 1];
					for (i = 0; i < (object.length); ++i) {
						if (i === (current)) {
							temp.push(candidt);
							temp.push(item);
							i += 1;
						} else {
							temp.push(object[i]);
						}
					}
				} else {
					temp = object;
				}
			} else if (typeOf(into) === 'number' && into > -1) {
				if (typeOf(object[into]) !== 'undefined') {
					current = object.indexOf(item);
					candidt = object[into];
					delete object[current];
					for (i = 0; i < object.length; ++i) {
						if (i === into) {
							temp.push(item);
							temp.push(candidt);
						} else if (i !== current) {
							temp.push(object[i]);
						}
					}
				} else {
					temp = object;
				}
			} else {
				temp = object;
			}
		}
		object = temp;
		return temp;
	};
	window.move = window.ObjectMove = ObejctMove;
	// CREATING FUNCTON TO GET THE OBJECT TYPE .
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
    // CREATING FUNCTION TO GET INDEX OF ARRAY ITEM WITH MULTIPLE RESULT.
    var ObjectIndex = function(obj, value) {
        var index = [];
        if (typeOf(obj) === 'array' && typeOf(value) !== 'undefined') {
            for (var i = 0; i < obj.length; ++i) {
                if (obj[i] === value) {
                    index.push(i);
                }
            }
        }
        if (index.length > 1) {
            return index;
        } else if (index.length === 1) {
            return index[0];
        } else {
            return -1;
        }
    };
    window.indexof = ObjectIndex;
	// CREATING FUNCTION TO SORT AN OBJECT APLHABETICALLY //
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
	window.sort = window.ObjectSort = ObjectSort;
	// CREATING FUNCTION TO COLLECT THE NODE POSITION.
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
})(window);

// CREATING CORE OBJECTS.
(function(window) {
    'use strict';
    var ClassRef = {
        css2: [
            'background', 'background_attachment', 'background_color', 'background_image', 'background_position',
            'background_repeat', 'border', 'border_bottom', 'border_bottom_color', 'border_bottom_style', 'border_bottom_width',
            'border_collapse', 'border_color', 'border_left', 'border_left_color', 'border_left_style', 'border_left_width',
            'border_right', 'border_right_color', 'border_right_style', 'border_right_width', 'border_spacing', 'border_style',
            'border_top', 'border_top_color', 'border_top_style', 'border_top_width', 'border_width', 'bottom', 'caption_side',
            'clear', 'clip', 'color', 'content', 'counter_increment', 'counter_reset', 'cursor', 'direction', 'display', 'empty_cells',
            'float', 'font', 'font_family', 'font_size', 'font_style', 'font_variant', 'font_weight', 'font_size_adjust',
            'font_stretch', 'height', 'left', 'letter_spacing', 'line_height', 'list_style', 'list_style', 'list_style_image',
            'list_style_position', 'list_style_type', 'margin', 'margin_bottom', 'margin_left', 'margin_right', 'margin_top',
            'max_height', 'max_width', 'min_height', 'min_width', 'outline', 'outline_color', 'outline_offset', 'outline_style',
            'outline_width', 'overflow', 'overflow_x', 'overflow_y', 'padding', 'padding_bottom', 'padding_left', 'padding_right',
            'padding_top', 'page_break_after', 'page_break_before', 'page_break_inside', 'position', 'quotes', 'right', 'table_layout',
            'text_align', 'text_decoration', 'text_indent', 'text_justify', 'text_outline', 'text_overflow', 'text_transform', 'top',
            'unicode_bidi', 'vertical_align', 'visibility', 'width', 'white_space', 'word_spacing', 'z_index', 'zoom'
        ],
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
    
    // ATTACHING TOCM REGISTRY TO WINDOW OBJECT.
    window.TocmMedia = TocmMedia;
    window.TocmDefClass = TocmDefClass;
    window.TocmMedClass = TocmMedClass;
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
                    // OPENING MEDIA QUERIES.
                    cstr += '\n\t@media ' + minfo.value + ' {\n';
                    cstr += '\t\t' + tclass.name + ' {\n';
                    cstr += TocmBuilder.createCSS(tclass.prop, '\t\t\t');
                    cstr += '\t\t}\n';
                    // CLOSING MEDIA QUERIES.
                    cstr += '\t}\n';
                    
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
                    
                    // CREATING CSS HANDLER IF NOT EXIST. ELSE, USE IT.
                    stid = tclass.name + '@' + minfo.name;
                    style = document.getElementById(stid);
                    if (!style) {
                        style = document.createElement('style');
                        style.setAttribute('id', stid);
                        style.setAttribute('type', 'text/css');
                        style.setAttribute('data', 'tocm-class');
                        style.innerHTML = cstr;
                        
                        head = document.getElementsByTagName('head')[0];
                        hcld = head.children;
                        spos = lastNode(hcld, 'style');
                        if (spos < 0) {
                            head.appendChild(style);
                        } else {
                            head.insertBefore(style, hcld[spos + 1]);
                        }
                    } else {
                        style.innerHTML = cstr;
                    }
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
                    stid = tclass.name + '@global';
                    style = document.getElementById(stid);
                    if (!style) {
                        style = document.createElement('style');
                        style.setAttribute('id', stid);
                        style.setAttribute('type', 'text/css');
                        style.setAttribute('data', 'tocm-class');
                        style.innerHTML = cstr;
                        
                        head = document.getElementsByTagName('head')[0];
                        hcld = head.children;
                        spos = lastNode(hcld, 'style');
                        if (spos < 0) {
                            head.appendChild(style);
                        } else {
                            head.insertBefore(style, hcld[spos + 1]);
                        }
                    } else {
                        style.innerHTML = cstr;
                    }
            }
        }
    };
    
    // ATTACHING CSS STRING BUILDER TO WINDOW OBJECT.
    window.TocmBuilder = ClassBuilder;
})(window);

// CREATING TOCM MAKER.
(function(window) {
    'use strict';
    var tocm = function(selector, media) {
        return new Tocm(selector, media);
    };
    // CREATING CLASS SELECTOR.
    var Tocm = function(selector, media) {
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
                        this.index = null;
                        this.class = null;
                    }
                } else {
                    this.index = null;
                    this.class = null;
                }
            } else {
                idx = regs.index.indexOf(selector);
                if (idx > -1) {
                    this.class = regs.class[idx];
                } else {
                    this.class = null;
                }
            }
        }
        return this;
    };
    // CREATING CLASS BUILDER.
    var tClass = {};
    // FUNCTION TO CREATE MEDIA QUERIES COLLECTIONS.
    tClass.media = function (name, value) {
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
    tClass.font = function (name, src, opt) {
        var fonts, cssfont, key, fdx, i, j;
        // Creating font collections.
        if (typeOf(window.TocmFonts) === 'undefined') {
            window.TocmFonts = {
                index: [],
                fonts: []
            };
        }
        // Creating font object.
        if (typeOf(name) === 'string') {
            if (typeOf(src) === 'string' || typeOf(src) === 'array') {
                fonts = {
                    name: name,
                    src: src
                };
                if (typeOf(opt) === 'object') {
                    for (key in opt) {
                        if (opt.hasOwnProperty(key)) {
                            fonts[key] = opt[key];
                        }
                    }
                }
                fdx = TocmFonts.index.indexOf(name);
                if (fdx < 0) {
                    TocmFonts.index.push(name);
                    fdx = TocmFonts.index.indexOf(name);
                    TocmFonts.fonts[fdx] = fonts;
                } else {
                    TocmFonts.fonts[fdx] = fonts;
                }
            } else {
                fdx = TocmFonts.index.indexOf(name);
                if (fdx > -1) {
                    return TocmFonts.fonts[fdx];
                } else {
                    return -1;
                }
            }
        } else {
            return TocmFonts;
        }
        
        // Creating CSS Font Face.
        cssfont = '';
        for (i = 0; i < TocmFonts.fonts.length; ++i) {
            cssfont += '\t@font-face {\n';
            fonts = TocmFonts.fonts[i];
            for (key in fonts) {
                if (fonts.hasOwnProperty(key)) {
                    if (key === 'name') {
                        cssfont += '\t\tfont-family: "' + fonts.name + '";\n';
                    } else if (key === 'src') {
                        if (typeOf(fonts.src) === 'array') {
                            for (j = 0; j < (fonts.src.length - 1); ++j) {
                                cssfont += '\t\tsrc: url("' + fonts.src[j] + '"), ';
                            }
                            cssfont += 'url("' + fonts.src[fonts.src.length - 1] + '");\n';
                        } else if (typeOf(fonts.src) === 'string') {
                            cssfont += '\t\tsrc: url("' + fonts.src + '");';
                        }
                    } else {
                        cssfont += '\t\t' + key + ': ' + fonts[key] + ';\n';
                    }
                }
            }
            cssfont += '\t}\n';
        }
        
        // Creating Style Element.
        var style = document.getElementById('tocm-fonts');
        if (!style) {
            style = document.createElement('style');
            style.setAttribute('id', 'tocm-fonts');
            style.setAttribute('type', 'text/css');
        var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);
        }
        style.innerHTML = cssfont;
    };
    // CREATING FUNCTION TO CREATE NEW CLASS.
    tClass.create = function (selector, props, media) {
        var cls = {}, regs = TocmDefClass, minfo, mdx, sdx, pdx;
        if (typeOf(selector) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            cls.name = selector;
            cls.prop = props;
            cls.psdo = {};
            
            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED.
            if (typeOf(media) === 'string') {
                minfo = TocmClass.media(media);
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
        }
    };

    // CREATING MODULE WRAPPER.
    tocm.module = Tocm.prototype = {};
    
    // ATTACHING TOCM MAKER TO WINDOW OBJECT.
    window.Tocm = window.tClass = tocm;
    window.TocmClass = tClass;
})(window);