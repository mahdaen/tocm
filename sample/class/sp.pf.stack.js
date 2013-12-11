/*jshint undef:false*/

// DEBUGGING LAYOUT FOR DEVELOPMENT.
$.class.debugLayout();

// ADDING FONTS.
$.font('Blackjack', ['font/blackjack.ttf']); $.font('Burlington', ['font/burlington.ttf']); $.font('Grandhotel', ['font/grandhotel.otf']);

// BODY.
$.class('!body', {
    display: TABLE, width: '100%', height: '100%', background_image: 'url(img/bg.png)'
});

// HEADER
$.class('!.header', {
    display: 'table-row', position: RELATIVE, width: '100%',
});

// Page Wrap.
$.class('!.page-wrap', {
    display: TABLE_ROW, width: '100%', height: '100%', position: RELATIVE, 
    
    
    before: {
        display: INLINE_BLOCK, position: ABSOLUTE, top: '50%', content: '"Welcome to Tocm"', width: '100%', text_align: CENTER,
        font_family: 'Grandhotel', font_size: 96, font_weight: 700, text_shadow: '0 1px #999', color: '#222'
    },

    '.page-offset': {
        display: BLOCK, position: RELATIVE, width: '100%', height: '100%'
    }
});

// Page Stack
$.class('!.page-stack', {
    display: BLOCK, position: ABSOLUTE, top: 0, left: 0, overflow_y: AUTO,
    width: '100%', height: '100%',
    
    '.container': {
        width: '100%', max_width: 960
    }
});