/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

TocmConfig.autowrite = false;

$class('!body', {
    background_color: '#f9f9f9', background_image: 'url(test/img/bg.png)'
});

$class('!.window', {
    background_color: '#dbdbdb', margin: 10, padding: 10, border_radius: 4, box_shadow: 'inset 0 1px 0 2px #555', border_bottom: '1px solid #8798a8'
});

$class('!.container', {
    width: '100%', max_width: 960, margin: '0 auto'
});

$class('.header', {
    width: '100%', height: 'auto',
    
    '.slogan': {
        font_family: 'Consolas', font_weight: 400, color: '#ff8900', margin_bottom: 0,
    },
    '.top': {
        text_align: 'center', padding: 20, background_color: rgb('#fff', 0.8),
        
        '.logo': {
            width: 256
        }
    },
    '.menu': {
        height: 'auto', text_align: 'center', margin_bottom: 5, background_image: linear_gradient('180deg, #fff, #d6d6d6'), box_shadow: '0 2px 0 2px #444',
        
        '.item': {
            padding: 10, font_family: 'Trebuchet Ms', font_size: '0.9em', display: 'inline-block',
            color: '#555', text_decoration: 'none', text_shadow: '0 1px #fff',
            
            hover: {
                color: '#00baff', transition: 'all .3s ease-in', box_shadow: '0 2px 0 0 #00baff'
            }
        }
    }
});

TocmBuilder.writeSCS();
function debugLayout() {
    'use strict';
    // Debug layouts.
    $class('!*', {
        box_shadow: '0 0 0 1px red'
    }).write();
}
//debugLayout();