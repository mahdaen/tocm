// CREATING CORE OBJECTS.
(function (window) {
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
            'target', 'target_name', 'target_new', 'target_position', 'word_break', 'word_wrap', 'filter', 'user_select'
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
        // RESTRICTED PROPERTIES FROM NUMBER AUTOMATIONS.
        noint: [
            'opacity', 'z-index', 'font-weight', 'column-count'
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
                            for (j = 0; j < (value.length - 1) ; ++j) {
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
                            for (j = 0; j < (value.length - 1) ; ++j) {
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
                            for (j = 0; j < (value.length - 1) ; ++j) {
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
                            for (j = 0; j < (value.length - 1) ; ++j) {
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
