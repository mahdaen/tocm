/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

/*
 * ADAPTING BOILERPLATE.CSS
 * ---------------------------------------------------------------------------
 * HTML5 ✰ Boilerplate
 *
 * What follows is the result of much research on cross-browser styling.
 * Credit left inline and big thanks to Nicolas Gallagher, Jonathan Neal,
 * Kroc Camen, and the H5BP dev community and team.
 *
 * Detailed information about this CSS: h5bp.com/css
 *
 * ==|== normalize ==========================================================
 */

TocmConfig.autowrite = true;
TocmConfig.writeload = false;

$.media('Boilerplate', 'all');
$.class('!@Boilerplate', {
    // Base
    // --------------------------------------------------------------------------------------------
    'html': { font_size: pr(100), overflow_y: 'auto', text_size_adjust: pr(100),
        // Sets all element box sizing to 'border-box' to prevent overlapping layout.
        '*': { box_sizing: 'border-box' }
    },
    'body': { margin: 0, font_size: pr(100), line_height: 1.231, position: 'relative' },

    // HTML5 display definitions.
    // --------------------------------------------------------------------------------------------
    'article & aside & details & figcaption & figure & footer & header & hgroup & nav & section': {
        display: 'block'
    },

    // Styling selection.
    '::selection & ::-moz-selection': { text_shadow: 'none', background_color: 'highlight', color: 'highlighttext' },

    // Links.
    // --------------------------------------------------------------------------------------------
    'a': { color: '#00e', // Link state.
        ':visited': { color: '#551a8b' },
        ':hover': { color: '#06e' },
        ':focus': { outline: 'thin dotted' },

        // Improve readability when focused and hovered in all browsers: h5bp.com/h //
        ':hover & :visited': { outline: 0 }
    },

    // Typography
    // --------------------------------------------------------------------------------------------
    'abbr[title]': { border_bottom: '1px dotted' },
    'b & strong': { font_weight: 'bold' },
    'blockquote': { margin: '1em 40px' },
    'dfn': { font_style: 'italic' },
    'hr': { display: 'block', height: 1, border: 0, border_top: '1px solid #ccc', margin: '1em 0', padding: 0 },
    'ins': { background: '#ff9', color: '#000', text_decoration: 'none' },
    'mark': { background: '#ff0', color: '#000', font_style: 'italic', font_weight: 'bold' },

    // Redeclare monospace font family: h5bp.com/j //
    'pre & code & kbd &samp': { font_family: 'monospace, serif', font_size: '1em' },
    'pre': { white_space: 'pre', 'white-space': 'pre-wrap', word_wrap: 'break-word' },
    'q': { quotes: 'none',
        ':before & :after': { content1: '""', content2: 'none' }
    },
    'small': { font_size: '85%' },

    // Position subscript and superscript content without affecting line-height: h5bp.com/k //
    'sub & sup': { font_size: '75%', line_height: 0, position: 'relative', vertical_align: 'baseline' },
    'sup': { top: '-0.5em' },
    'sub': { bottom: '-0.25em' },

    // Lists
    // --------------------------------------------------------------------------------------------
    'ul & ol': { margin: '1em 0', padding: '0 0 0 40px' },
    'dd': { margin: '0 0 0 40px' },
    'nav': {
        display: 'block',

        'ul & ol': { list_style: 'none', list_style_image: 'none', margin: 0, padding: 0 }
    },

    // Embedded content.
    // --------------------------------------------------------------------------------------------
    'img': { border: 0, '-ms-interpolation-mode': 'bicubic', vertical_align: 'middle' },
    'svg:not(:root)': { overflow: 'hidden' },
    'figure': { margin: 0 },

    // Forms
    // --------------------------------------------------------------------------------------------
    'form': { margin: 0 },
    'fieldset': { border: 0, margin: 0, padding: 0 },
    'label': { cursor: 'pointer' },
    'legend': { border: 0, $margin_left: -7, padding: 0 },
    'button & input & select & textarea': { font_size: pr(100), margin: 0, vertical_align: 'baseline', $vertical_align: 'middle' },
    'button & input': { line_height: 'normal' },

    'button & input[type="button"] & input[type="reset"] & input[type="submit"]': { cursor: 'pointer', appearance: 'button', $overflow: 'visible' },
    'input[type="checkbox"] & input[type="radio"]': { box_sizing: 'border-box', padding: 0 },
    'input[type="search"]': {
        appearance: 'textfield',

        '::-webkit-search-decoration': { appearance: 'none' }
    },
    'button::-moz-focus-inner & input::moz-focus-inner': { border: 0, padding: 0 },

    // Tables
    // --------------------------------------------------------------------------------------------
    'table': { border_collapse: 'collapse', border_spacing: 0 },
    'td': { vertical_align: 'top' },

    // Optional Resets.
    'p': { margin: 0 },
    'img & span & a': { display: 'inline-block' }

    // Non-semantic helper classes.
});

/*
 * CREATING NON-SEMANTIC CLASSES
 * Placing style node at end of style collection with creating new media 'Important' as group
 * to ensure that defining style after this file will not affect to the following style rules.
 * -------------------------------------------------------------------------------------------
 */
$.media('Important', 'all');
$.class('!@Important', {
    '.ir': {
        display: 'block', border: 0, text_indent: '-999em', overflow: 'hidden',
        background_color: 'transparent', background_repeat: 'no-repeat',
        text_align: 'left', direction: 'ltr',

        'br': { display: 'none' }
    },
    '.hidden': { display: 'none !important', visibility: 'hidden' },
    '.visualyhidden': {
        border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1,
        overflow: 'hidden', padding: 0, position: 'absolute', width: 1
    },
    '.visualyhidden.focusable': {
        ':active & :focus': {
            clip: 'auto', height: 'auto', margin: 0, overflow: 'visible', position: 'static', width: 'auto'
        }
    },
    '.invisible': { visibility: 'hidden' },

    '.clear': { clear: 'both' },
    '.clearfix': {
        $zoom: 1,

        ':before & :after': { content: '""', display: 'table' },
        'after': { clear: 'both' }
    },

    // Most used display classes.
    '.table'        : { display: 'table' },
    '.cell'         : { display: 'table-cell' },
    '.row'          : { display: 'table-row' },
    '.column'       : { display: 'table-column' },

    '.block'        : { display: 'block' },
    '.inline-block' : { display: 'inline-block' },

    '.fit-width'    : { width: pr(100) },
    '.fit-height'   : { height: pr(100) },
    '.stretch'      : { width: pr(100), height: pr(100) },

    // Most used positioning classes.
    '.relative'     : { position: 'relative' },
    '.absolute'     : { position: 'absolute' },

    // Align
    '.left'         : { text_align: 'left' },
    '.center'       : { text_align: 'center' },
    '.right'        : { text_align: 'right' },

    '.top'          : { vertical_align: 'top' },
    '.middle'       : { vertical_align: 'middle' },
    '.bottom'       : { vertical_align: 'bottom' },
    '.front'        : { z_index: 999999999 },
    '.back'         : { z_index: 0 }
});

/*
 * CREATING DEFAULTS MEDIA QUERIES.
 */
// Best fit for Mobile Phone Display.
$.media('mobile', '(max-width: 509px) and (min-device-width: 1024px), (max-device-width: 480px) and (orientation: portrait)');

// Best fit for Tablet Display.
$.media('tablet',
        '(max-width: 989px) and (min-device-width: 1024px), screen and (max-device-width: 480px), ' +
        '(max-device-width: 480px) and (orientation: landscape), (max-device-width: 1024px) and ' +
        '(min-device-width: 481px) and (orientation: portrait)'
       );

// Best fit for Laptop display (between 1000px and 1300px).
$.media('desktop', 'all and (min-width: 1000px)');

// Best fit for Medium Size display (between 1300px and 1600px).
$.media('medium-desktop', 'all and (min-width: 1300px)');

// Best fit for large display (higher than 1600px).
$.media('large-desktop', 'all and (min-width: 1600px)');


/*
 * ADAPTING 960 GRID SYSTEM AND CONVERT IT TO FLUIDS GRID.
 * 960 fluids system with 12 column layout.
 * -------------------------------------------------------------------------------------------
 */

// CREATING CLASS DEFINITIONS CONSTANTS.
define('baseWidth', 960);                                   // Main container width (px).
define('column',     24);                                   // Column count.
define('colgap',      4);                                   // Column gap count.

define('fixSize',   (baseWidth / column));                  // Each fixed column size (px).         ->                 80px
define('gapSize',   (fixSize / colgap));                    // Each gap size (px).                  ->                 10px

define('marSize',   (gapSize / baseWidth) * 100);           // Each margin size (%).                ->  1.0416666666666665%
define('filSize',   (marSize * 2));                         // Each column fill size (%).           ->   2.083333333333333%
define('colSize',   (marSize * (colgap - 2)));              // Each column size (%).                ->   6.249999999999999%

// CREATING MEDIA GROUPS.
$.media('Tocmgrid', 'all');
$.media('Tocmgrid-tablet', $.media('tablet').value);
$.media('Tocmgrid-mobile', $.media('mobile').value);

// CREATING MAIN CLASSES.
$.class('!@Tocmgrid', {
    // Content container class.
    '.container': {
        width: pr(100), max_width: baseWidth, margin: '0 auto'
    },
    // Content wrapper class.
    '.wrapper': {
        width: pr(100), margin: 0, padding_left: 10, padding_right: 10
    },
    // Fluids Grid container class.
    '.fl-grid': {
        width: pr(100), position: 'relative', ':after': { clear: 'both' }
    },
    // Fixed Grid container class.
    '.fx-grid': {
        width: baseWidth, float: 'left', position: 'relative', ':after': { clear: 'both' }
    }
});

// CREATING GRID CALSSES.
var x;
for (x = 1; x <= column; ++x) {
    // Selecting parent class.
    $.class('.fl-grid@Tocmgrid')
    // Fluids column with margin.
    .add('.grid-' + x, {
        float: 'left', width: pr(((colSize * x) + (filSize * (x - 1)))), margin_left: pr(marSize), margin_right: pr(marSize)
    }).back()
    // Fluids column without margin.
    .add('.grid-' + x + 'c', {
        float: 'left', width: pr(((colSize * x) + (filSize * (x - 1)) + (marSize * 2))), margin: 0
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fluids column push.
    .add('.push-' + x, {
        position: 'relative', left: pr(((colSize * x) + (filSize * x)))
    }).back()
    // Fluids column pull.
    .add('.pull-' + x, {
        position: 'relative', left: pr(-((colSize * x) + (filSize * x)))
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fuilds column prefix.
    .add('.prefix-' + x, {
        padding_left: pr(((colSize * x) + (filSize * (x - 1))))
    }).back()
    // Fuilds column suffix.
    .add('.suffix-' + x, {
        padding_right: pr(((colSize * x) + (filSize * (x - 1))))
    }).back();
    // --------------------------------------------------------------------------------------------
}
for (x = 1; x <= column; ++x) {
    // Selecting parent class.
    $.class('.fl-grid@Tocmgrid')
    // --------------------------------------------------------------------------------------------
    // Fluids column for tablet.
    .add('!.grid-' + x + '.tablet@Tocmgrid-tablet', {
        float: 'left', width: pr(((colSize * 4) + (filSize * 3))), margin_left: pr(marSize), margin_right: pr(marSize)
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fluids column for mobile.
    .add('!.grid-' + x + '.mobile@Tocmgrid-mobile', {
        float: 'left', width: pr(((colSize * 12) + (filSize * 12))), margin: 0, padding_left: 10, padding_right: 10
    }).back();
    // --------------------------------------------------------------------------------------------
}


// CREATING GRID DEBUGGER.
$.class('!.overlay@Tocmgrid', {
    position: 'absolute', top: 0, left: 0, z_index: 999999999999, width: pr(100), height: pr(100), overflow: 'hidden',
    '.fl-grid': {
        background_color: 'rgba(0, 0, 0, 0.1)', box_shadow: '0 0 0 1px rgba(255, 0, 0, 0.19)'
    },
    '.grid': {
        background_color: 'rgba(255, 255, 255, 0.1)', box_shadow: '0 0 0 1px rgba(255, 0, 0, 0.19)'
    },
    '.col': {
        background_color: 'rgba(255, 255, 255, 1)', box_shadow: '0 0 0 1px rgba(255, 0, 0, 0.19)', height: 40, margin_top: 10,
        line_height: 1.2, color: '#797979', padding: 10, transition: 'all .5s ease-in'
    }
});

define('paintGrid', function (isdo) {
    'use strict';
    var i;
    if (isdo === false) {
        $.path('#gd-ov').remove();
        $.path('#gd-ts').remove();
    } else {
        $.path('body').append('<div id="gd-ov" class="stretch overlay"><div class="container fit-height"><div class="fl-grid fit-height"></div></div></div>');
        for (i = 0; i < column; ++i) {
            $.path('#gd-ov .fl-grid').append('<div class="grid grid-1 mob tab fit-height"></div>');
        }

        $.path('body').append('<div id="gd-ts" class="stretch overlay front"><div class="container"><div class="fl-grid fit-height"></div></div></div>');
        for (i = 1; i <= column; ++i) {
            $.path('#gd-ts .fl-grid').append('<div class="col grid-' + i + ' mobile tablet">' + i + '</div>');
            $.path('#gd-ts .fl-grid').append('<div class="col grid-' + (column - i) + ' mobile tablet">' + (column - i) + '</div>');
        }
        $.path('.grid-0').remove();
    }
});
$.path(document).ready(function () {
    //paintGrid();
});
