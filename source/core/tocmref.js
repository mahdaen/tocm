/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING REFERENCE OBJECTS.
(function (window) {
    'use strict';
    window.TocmRef = {
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
        // PSEUDO LISTS //
        pseudo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang', 'target'
        ],
        // VENDOR LISTS //
        vendor: [
            '', '-webkit-', '-moz-', '-o-', '-ms-'
        ],
        // RESTRICTED PROPERTIES FROM NUMBER AUTOMATIONS.
        noint: [
            'opacity', 'z-index', 'font-weight', 'column-count', 'line-height'
        ]
    };
    lock('TocmRef');
})(window);