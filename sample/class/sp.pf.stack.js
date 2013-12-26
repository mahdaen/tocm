/*jshint undef:false*/

// DEBUGGING LAYOUT FOR DEVELOPMENT.
//$.class.debugLayout();

// CONFIGURING ASSET DIR.
TocmConfig.basedir = '../sample';

// ADDING FONTS.
$.font('Blackjack',         'font/blackjack.ttf');
$.font('Burlington',        'font/burlington.ttf');
$.font('Grandhotel',        'font/grandhotel.otf');
$.font('Archivo',           'font/archivonarrow.otf');
$.font('Abeezee',           'font/abeezee.otf');

// CREATING CLASS USING BATCH MODE.
$.class('!', {
    // BODY CLASS.
    'body': {
        display: TABLE, width: '100%', height: '100%', background_image: 'url(img/bg.png)', font_family: 'Abeezee'
    },
    '.wel-txt': {
        font_family: 'Grandhotel', font_size: 96, font_weight: 700, text_shadow: '0 1px #999', color: '#222'
    },
    // HEADER CLASS.
    '.header': {
        display: 'table-row', position: RELATIVE, width: '100%',
    },
    // PAGE WRAP CLASS.
    '.page-wrap': {
        display: TABLE_ROW, width: '100%', height: '100%', position: RELATIVE,

        '.page-offset': {
            display: BLOCK, position: RELATIVE, width: '100%', height: '100%'
        }
    },
    // PAGE STACK CLASS.
    '.page-stack': {
        display: BLOCK, position: ABSOLUTE, top: 0, left: 0, overflow_y: AUTO,
        width: '100%', height: '100%',

        '.container': {
            width: '100%', max_width: 960
        }
    }
});
