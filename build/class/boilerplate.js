/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// ADAPTING BOILERPLATE.CSS
// -----------------------------------------------------------------------------------------------------
$.media('Boilerplate', 'all');
$.class('!@Boilerplate', {
    'html': {
        font_size: '100%', overflow_y: AUTO, background_color: TRANSPARENT, height: '100%', width: '100%',
        _webkit_text_size_adjust: '100%', _ms_text_size_adjust: '100%', position: RELATIVE
    },
    'body': {
        margin: 0, font_size: '100%', line_height: 1.231, color: '#333', box_sizing: BORDER_BOX, width: '100%',
        font_family: 'Helvetica, Verdana, Lucida Grande, Arial, Sans-serief'
    },
    
    // HTML5 Display Definitions.
    // -------------------------------------------------------------------------------------------------
    'artilce & aside & detalis & figcaption & figure & footer & header & hgroup & nav & section': {
        display: BLOCK, position: RELATIVE, box_sizing: BORDER_BOX
    },
    'audio & canvas & video': {
        display: INLINE_BLOCK, $display: INLINE, $zoom: 1
    },
    'audio:not([controls]) & [hidden]': {
        display: NONE
    },
    'a': {
        text_decoration: NONE
    },
    
    // BASE PROPERTIES.
    // -------------------------------------------------------------------------------------------------
    'abbr[title]'       : { border_bottom: '1px dotted' },
    'b & strong'        : { font_weight: BOLD },
    'blockquote'        : { margin: '1em 40px' },
    'dfn'               : { font_style: ITALIC },
    'hr'                : { display: BLOCK, height: 1, border: 0, border_top: '1px solid #ccc', margin: 0, padding: 0 },
    'ins'               : { background: '#ff9', color: '#000', text_decoration: NONE },
    'mark'              : { background: '#ff0', color: '#000', font_style: ITALIC, font_weight: BOLD },
    
    // Redeclare monospace font family.
    'pre & code & kbd & samp'   : { font_family: 'monospace, serif, courier new', font_size: '1em' },
    
    // Improve readability of pre-formatted text in all browsers.
    'pre'               : { white_space: PRE_WRAP, word_wrap: BREAK_WORD },
    
    'q'                 : { quotes: NONE, before: {content: '""'}, after: {content: '""'} },
    'small'             : { font_size: '85%'},
    
    // Position subscript and superscript content without affecting line-height.
    'sub & sup'         : { font_size: '75%', line_height: 0, position: RELATIVE, vertical_align: BASELINE },
    'sup'               : { top: '-0.5em' },
    'sub'               : { bottom: '-0.25em' },
    
    // Lists.
    'ul & ol & dd'      : { list_style: NONE, list_style_image: NONE, margin: 0, padding: 0},
    
    // Embeded.
    'img'               : { border: 0, _ms_interpolation_mode: 'bicubic', vertical_align: MIDDLE },
    'svg:not(:root)'    : { overflow: HIDDEN },
    
    // Forms.
    'figure & form'     : { margin: 0 },
    'fieldset & legend' : { border: 0, margin: 0, padding: 0 },
    'label'             : { cursor: POINTER },
    'legend'            : { $margin_left: -7 },
    
    'button & input & select & textarea'    : { font_size: '100%', margin: 0, vertical_align: BASELINE, $vertical_align: MIDDLE, box_sizing: BORDER_BOX },
    'button & input'    : { line_height: NORMAL },
    
    'button::-moz-focus-inner & input::-moz-focus-inner'    : { border: 0, padding: 0 },
    
    'textarea'          : { overflow: AUTO, vertical_align: TOP, resize: VERTICAL },
    'table'             : { border_collapse: 'collapse', border_spacing: 0 },
    'td'                : { vertical_align: TOP },
    
    'table & td & div & img & p & a & h1 & h2 & h3 & h4 & h5 & h6'     : { box_sizing: BORDER_BOX },
    
    // Non-semantic class.
    '.hidden'           : { display: 'none !important', visibility: HIDDEN },
    '.invisible'        : { visibility: HIDDEN },
    
    '.clearfix'         : {
        $zoom: 1,
        before          : { content: '""', display: TABLE, width: '100%' },
        after           : { content: '""', display: TABLE, width: '100%', clear: BOTH }
    },
    '::selection': {
        text_shadow     : NONE, background_color: NONE, color: 'blue'
    },
    '::-moz-selection': {
        text_shadow     : NONE, background_color: NONE, color: 'blue'
    }
});