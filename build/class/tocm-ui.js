/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

/*
 * CREATING UI DEFINITIONS.
 * You can simply edit this definitions without editing the class.
 * All class generated using this definitions.
 */
var ui_base = {
    // --> Definitions for padding and margin.
    space: {
        thin: 5, small: 10, medium: 20, large: 40, extra: 60
    },
    // --> Definitions for border.
    border: {
        thin: 1, small: 2, medium: 4, large: 6, extra: 8, color: 'rgba(0, 0, 0, 0.5)'
    },
    // --> Definitions for border-radius.
    radius: {
        thin: 2, small: 4, medium: 8, large: 12, extra: 16
    },
    
    // --> Definitions for color variants.
    swatch: {
        color_1: {
            name: 'light-orange', normal: '#f8f1eb', light: '#ffffff', dark: '#dcc8b6'          // Light Orange
        },
        color_2: {
            name: 'light-green', normal: '#9dcca0', light: '#b6e5b9', dark: '#6aa76e'           // Light Green
        },
        color_3: {
            name: 'orange', normal: '#ffc476', light: '#ffd9a6', dark: '#ffa834'                // Orange
        },
        color_4: {
            name: 'light-blue', normal: '#8bd5e0', light: '#acdbe2', dark: '#63b8c4'            // Light Blue
        },
        color_5: {
            name: 'dark-orange', normal: '#f79f8b', light: '#f5beb1', dark: '#ea7e66'           // Dark Orange
        },
        color_6: {
            name: 'gray', normal: '#cec9c5', light: '#e0ddda', dark: '#b1aca8'                  // Gray --> Notes Text
        },
        color_7: {
            name: 'dark-gray', normal: '#848484', light: '#a2a2a2', dark: '#656565'             // Dark Gray --> Description Text
        },
        color_8: {
            name: 'dark', normal: '#575757', light: '#747474', dark: '#363636'                  // Dark --> Normal Text
        },
        color_9: {
            name: 'blue', normal: '#439ad9', light: '#66b0e6', dark: '#237fc1'                  // Normal Blue
        },
        color_10: {
            name: 'white', normal: '#ffffff', light: '#ffffff', dark: '#ffffff'                 // White
        },
        color_11: {
            name: 'black', normal: '#000000', light: '#393939', dark: '#000000'                 // Black
        },
        color_12: {
            name: 'red', normal: '#c43c3c', light: '#db5d5d', dark: '#9d2020'                   // Red
        }
    },
    
    // --> Definitions for typography.
    heading: {
        margin_top: 15, margin_bottom: 15,
        
        1: {
            font_size: 35, font_family: ''
        },
        2: {
            font_size: 24, font_family: ''
        },
        3: {
            font_size: 22, font_family: ''
        },
        4: {
            font_size: 20, font_family: ''
        },
        5: {
            font_size: 18, font_family: ''
        },
        6: {
            font_size: 16, font_family: ''
        }
    }
};

// Creating corner list.
var i, j, prop,
    corner = ['top', 'left', 'right', 'bottom'],
    fmsize = ['thin', 'small', 'medium', 'large', 'extra'];

// Creating media group.
$.media('Tocm-ui', 'all');

// CREATING MAIN CLASSES.
for (i = 0; i < fmsize.length; ++i) {
    // MARGIN AND PADDING CLASSES.
    // ---------------------------------------------------------------------------------
    $.class('!.' + fmsize[i] + '-pad@Tocm-ui', { padding: ui_base.space[fmsize[i]] });
    $.class('!.' + fmsize[i] + '-mar@Tocm-ui', { padding: ui_base.space[fmsize[i]] });
    for (j = 0; j < corner.length; ++j) {
        prop = {};
        prop['padding_' + corner[j]] = ui_base.space[fmsize[i]];
        $.class('!.' + fmsize[i] + '-pad-' + corner[j] + '@Tocm-ui', prop);
        
        prop = {};
        prop['margin_' + corner[j]] = ui_base.space[fmsize[i]];
        $.class('!.' + fmsize[i] + '-mar-' + corner[j] + '@Tocm-ui', prop);
    }
    // ---------------------------------------------------------------------------------
    // BORDER AND RADIUS.
    $.class('!.' + fmsize[i] + '-border@Tocm-ui', { border: ui_base.border[fmsize[i]] + 'px solid ' + ui_base.border.color });
    $.class('!.' + fmsize[i] + '-radius@Tocm-ui', { border_radius: ui_base.radius[fmsize[i]] });
    for (j = 0; j < corner.length; ++j) {
        prop = {};
        prop['border_' + corner[j]] = ui_base.border[fmsize[i]] + 'px solid ' + ui_base.border.color;
        $.class('!.' + fmsize[i] + '-border-' + corner[j] + '@Tocm-ui', prop);

        prop = {};
        switch(corner[j]) {
            case 'top':
                prop['border_' + corner[j] + '_left_radius']    = ui_base.radius[fmsize[i]];
                prop['border_' + corner[j] + '_right_radius']   = ui_base.radius[fmsize[i]];
                break;
            case 'bottom':
                prop['border_' + corner[j] + '_left_radius']    = ui_base.radius[fmsize[i]];
                prop['border_' + corner[j] + '_right_radius']   = ui_base.radius[fmsize[i]];
                break;
            case 'left':
                prop['border_top_' + corner[j] + '_radius']     = ui_base.radius[fmsize[i]];
                prop['border_bottom_' + corner[j] + '_radius']  = ui_base.radius[fmsize[i]];
                break;
            case 'right':
                prop['border_top_' + corner[j] + '_radius']     = ui_base.radius[fmsize[i]];
                prop['border_bottom_' + corner[j] + '_radius']  = ui_base.radius[fmsize[i]];
                break;
        }
        $.class('!.' + fmsize[i] + '-' + corner[j] + '-radius' + '@Tocm-ui', prop);
    }
    $.class('!.' + fmsize[i] + '-topleft-radius@Tocm-ui', {
        border_top_left_radius: ui_base.radius[fmsize[i]]
    });
    $.class('!.' + fmsize[i] + '-topright-radius@Tocm-ui', {
        border_top_right_radius: ui_base.radius[fmsize[i]]
    });
    $.class('!.' + fmsize[i] + '-bottomleft-radius@Tocm-ui', {
        border_bottom_left_radius: ui_base.radius[fmsize[i]]
    });
    $.class('!.' + fmsize[i] + '-bottomright-radius@Tocm-ui', {
        border_bottom_right_radius: ui_base.radius[fmsize[i]]
    });
}

// CREATING COLOR SWATCHES.
for (i = 1; i <= 12; ++i) {
    // Foreground colors.
    $$('!.' + ui_base.swatch['color_' + i].name + '-fg@Tocm-ui', {
        color: ui_base.swatch['color_' + i].normal
    });
    $$('!.' + ui_base.swatch['color_' + i].name + '-fl@Tocm-ui', {
        color: ui_base.swatch['color_' + i].normal, ':hover': { color: ui_base.swatch['color_' + i].light }, ':active': { color: ui_base.swatch['color_' + i].dark }
    });
    $$('!.' + ui_base.swatch['color_' + i].name + '-bg@Tocm-ui', {
        background_color: ui_base.swatch['color_' + i].normal, fill: ui_base.swatch['color_' + i].normal
    });
    $$('!.' + ui_base.swatch['color_' + i].name + '-bt@Tocm-ui', {
        background_color: ui_base.swatch['color_' + i].normal, fill: ui_base.swatch['color_' + i].normal,
        ':hover': { background_color: ui_base.swatch['color_' + i].light, fill: ui_base.swatch['color_' + i].normal },
        ':active': { background_color: ui_base.swatch['color_' + i].dark, fill: ui_base.swatch['color_' + i].normal }
    });
    $$('!.' + ui_base.swatch['color_' + i].name + '-bd@Tocm-ui', {
        border_color: ui_base.swatch['color_' + i].normal, ':hover': { border_color: ui_base.swatch['color_' + i].light }, ':active': { border_color: ui_base.swatch['color_' + i].dark }
    });
}

// CREATING HEADING CLASSES.
for (i = 1; i <= 6; ++i) {
    $$('!h' + i + '@Tocm-ui', combine([{
        margin_top: ui_base.heading.margin_top, margin_bottom: ui_base.heading.margin_bottom
    }, ui_base.heading[i]]));
}


$.class('!@Tocm-ui', {
    '.blacko-bg'        : { background_color: 'rgba(0, 0, 0, 0.5)' },
    
    // Transitions.
    '.ease-fast *'        : { transition: 'all .2s ease-in' },
    '.ease-normal *'      : { transition: 'all .5s ease-in' },
    '.ease-slow *'        : { transition: 'all 1s ease-in' },

    // Typography
    '.regular'          : { font_weight: 'normal' },
    '.bold'             : { font_weight: 'bold' },
    '.italic'           : { font_style: 'italic' },
    '.fw-200'           : { font_weight: 200 },
    '.fw-400'           : { font_weight: 400 },
    '.fw-600'           : { font_weight: 600 },
});
