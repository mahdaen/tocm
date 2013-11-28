/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

$class('!body', {
    background_color: '#f9f9f9',
    background_image: 'url(test/img/bg.png)'
});

$class('!.window', {
    background_color: '#fff',
    margin_top: 30,
    padding: 20,
    border_radius: 10,
    border: '1px solid #333',
    box_shadow: 'inset 0 1px 0 2px #555',
    border_bottom: '1px solid #8798a8',

    '.name': {
        display: 'block',
        padding: 5,
        margin_top: 10,
        font_family: 'Consolas',
        background_color: '#e5e5e5'
    },
    '.detail': {
        display: 'block',
        padding_top: 10,
        font_size: 12,
        font_family: 'Arial'
    },
    'code': {
        font_size: 14,
        color: '#000'
    }
});

$class('!.container', {
    width: '100%',
    max_width: 960,
    margin: '0 auto'
});

$class('!.paragraph', {
    padding: 5,
    padding_top: 10,
    padding_bottom: 10,
    font_size: 13,
    font_family: 'Tahoma',
    color: '#666'
});

$class('!h2.title', {
    margin: 0,
    padding_top: 5,
    padding_bottom: 5,
    font_family: 'Trebuchet Ms',
    color: '#666',
    text_shadow: '0 1px #fff',
    border_bottom: '1px dotted #999'
});

$class('!pre', {
    background_color: '#ededed !important',
    color: '#666',
    font_size: 12,
    box_sizing: 'border-box'
});

$class('.header', {
    width: '100%',
    height: 'auto',
    position: 'relative',
    z_index: 99999999,

    '.top': {
        text_align: 'center',
        padding: 20,
        background_color: rgb('#f7f7f7', 1),

        '.logo': {
            width: 150
        },
        '.slogan': {
            font_family: 'Consolas',
            font_size: 14,
            font_weight: 400,
            color: '#ff8900',
            margin_bottom: 0
        }
    },
    '.menu': {
        height: 'auto',
        text_align: 'center',
        margin_bottom: 5,
        border_top: '1px solid #d9d9d9',
        background_image: linear_gradient('180deg, #fff, #d6d6d6'),
        box_shadow: '0 2px 0 2px #444',

        '.item': {
            padding: 10,
            font_family: 'Trebuchet Ms',
            font_size: '0.9em',
            display: 'inline-block',
            color: '#555',
            text_decoration: 'none',
            text_shadow: '0 1px #fff',

            hover: {
                color: '#00baff',
                transition: 'all .3s ease-in-out',
                box_shadow: '0 3px 0 -1px #00baff'
            }
        }
    }
});

var paging_off = {
    position: 'absolute', top: '-400%', transition: 'all .6s ease-in-out', opacity: 0
};
var paging_on = {
    position: 'relative', top: 0, transition: 'all 2s ease-in-out', opacity: 1
};

$class('.page', {padding_bottom: 30, position: 'relative', padding_top: 0})
.on('before', {
    content: '""', display: 'block', width: 418, height: 117, margin: '0 auto', background_image: 'url(logo.png)',
    margin_top: '50%', position: 'absolute', left: '27.5%', filter: 'grayscale(1) drop-shadow(0 1px 0px #a0a0a0)', opacity: 0.2
})
.add('#tocm', paging_off).on('target', paging_on).back()
.add('#media', paging_off).on('target', paging_on).back()
.add('#font', paging_off).on('target', paging_on).back()
.add('#keyframe', paging_off).on('target', paging_on).back()
.add('#debug', paging_off).on('target', paging_on);

// Debugging Layout.
$class.debugLayout('none');