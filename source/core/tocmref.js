/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING REFERENCE OBJECTS.
(function (window) {
    'use strict';
    window.TocmRef = {
        css3: [
            'animation', 'animation-name', 'animation-duration', 'animation-fill-mode', 'animation-timing-function', 'animation-delay',
            'animation-iteration-count', 'animation-direction', 'animation-play-state', 'background-clip', 'background-origin',
            'background-size', 'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius',
            'border-bottom-right-radius', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice',
            'border-image-source', 'border-image-width', 'box-align', 'box-direction', 'box-decoration-break', 'box-flex',
            'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-sizing', 'box-shadow', 'break-after',
            'break-before', 'break-inside', 'columns', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color',
            'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'marquee-direction', 'marquee-play-count',
            'marquee-speed', 'marquee-style', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'opacity', 'perspective', 'perspective-origin',
            'rotation', 'rotation-point', 'text-shadow', 'text-wrap', 'transform', 'transform-origin', 'transform-style', 'transition',
            'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay',
            // POSSIBLE DROPPED //
            'appearance', 'backface-visibility', 'grid-columns', 'grid-rows', 'hanging-punctuation', 'icon', 'punctuation-trim', 'resize',
            'target', 'target-name', 'target-new', 'target-position', 'word-break', 'word-wrap', 'filter', 'user-select',
            // OPTIONAL //
            'text-size-adjust'
        ],
        // PSEUDO LISTS //
        pseudo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang', 'target'
        ],
        // VENDOR LISTS //
        vendor: [
            '-webkit-', '-moz-', '-o-', '-ms-', ''
        ],
        // RESTRICTED PROPERTIES FROM NUMBER AUTOMATIONS.
        noint: [
            'opacity', 'z-index', 'font-weight', 'column-count', 'line-height'
        ]
    };
    lock('TocmRef');
})(window);