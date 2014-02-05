/*jshint undef:false*/

// CREATING MOST USED SINGLE PROPERTIES CONSTANTS.
(function (e) {
    var prop = {
        absolute            : 'absolute',
        auto                : 'auto',
        baseline            : 'baseline',
        block               : 'block',
        bold                : 'bold',
        border_box          : 'border-box',
        both                : 'both',
        bottom              : 'bottom',
        break_word          : 'break-word',
        center              : 'center',
        content_box         : 'content-box',
        fixed               : 'fixed',
        hidden              : 'hidden',
        inherit             : 'inherit',
        inline              : 'inline',
        inline_block        : 'inline-block',
        italic              : 'italic',
        justify             : 'justify',
        left                : 'left',
        middle              : 'middle',
        none                : 'none',
        normal              : 'normal',
        padding_box         : 'padding-box',
        pointer             : 'pointer',
        pre                 : 'pre',
        pre_wrap            : 'pre-wrap',
        relative            : 'relative',
        right               : 'right',
        scroll              : 'scroll',
        table               : 'table',
        table_row           : 'table-row',
        top                 : 'top',
        transparent         : 'transparent',
        vertical            : 'vertical'
    };
    
    for (var key in prop) {
        if (prop.hasOwnProperty(key)) {
            assign(key.toUpperCase(), prop[key]);
        }
    }
})(window);