/*jshint undef:false*/

// CREATING MOST USED SINGLE PROPERTIES CONSTANTS.
(function (e) {
    var prop = {
        block               : 'block',
        scroll              : 'scroll',
        none                : 'none',
        inline              : 'inline',
        inline_block        : 'inline-block',
        bold                : 'bold',
        italic              : 'italic',
        pre                 : 'pre',
        pre_wrap            : 'pre-wrap',
        break_word          : 'break-word',
        relative            : 'relative',
        absolute            : 'absolute',
        fixed               : 'fixed',
        inherit             : 'inherit',
        top                 : 'top',
        left                : 'left',
        right               : 'right',
        bottom              : 'bottom',
        center              : 'center',
        middle              : 'middle',
        baseline            : 'baseline',
        justify             : 'justify',
        hidden              : 'hidden',
        pointer             : 'pointer',
        normal              : 'normal',
        border_box          : 'border-box',
        content_box         : 'content-box',
        padding_box         : 'padding-box',
        auto                : 'auto',
        vertical            : 'vertical',
        transparent         : 'transparent',
        table               : 'table',
        table_row           : 'table-row',
        both                : 'both'
    };
    
    for (var key in prop) {
        if (prop.hasOwnProperty(key)) {
            define(key.toUpperCase(), prop[key]);
        }
    }
})(window);