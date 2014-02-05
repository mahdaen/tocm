/*jshint undef:false */
// 960 GRID SYSTEM WITH FLUIDS LAYOUT.
// --------------------------------------------------------------------------

// CREATING DEFINITIONS.
var baseW = 100,    // Container width. (%).
    baseM = 960,    // Maximum width of container. (px).
    baseC = 12,     // Number of column.
    gridM = 2.4,    // Each column space. (%).
    gridW = 6.132,
    gridC = (baseW / baseC);   // Each column width - no margin. (%).

// CREATING MAIN CLASS.
$.media('Tocmgrid', 'all');
$.class('!.fl-grid@Tocmgrid', {
    // CONTAINER PROPERTIES.
    width: baseW  + '%', float: 'left', after: { clear: 'both' }
});

// CREATING BOX INCREMENT.
for (var i = 0; i <= 11; ++i) {
    var set = (i + 1);
    $.class('.fl-grid@Tocmgrid')
    // FIRST COLUMN NO MARGIN.
    .add('.col-' + set + 's', {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left'
    })
    .back()
    // NEXT COLUMN RIGHT MARGIN.
    .add('.col-' + set + 'r', {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left', margin_right: gridM + '%'
    })
    .back()
    // NEXT COLUMN LEFT MARGIN.
    .add('.col-' + set, {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left', margin_left: gridM + '%'
    })
    .back()
    // COLUMN WITH NO MARGIN.
    .add('.col-' + set + 'c', {
        width: (gridC * set) + '%',
        float: 'left', margin: 0
    });
}

// VIEWPORT.
// ---------------------------------------------------------------------------
$.class('!@Tocmgrid', {
    '.container': {
        width: baseW + '%', max_width: baseM, margin: '0 auto',
        padding_left: 10, padding_right: 10
    },
    '.block': { display: BLOCK },
    '.in-block': { display: INLINE_BLOCK },
    
    '.tbl-w': { display: 'table' },
    '.tbl-r': { display: 'table-row' },
    '.tbl-c': { display: 'table-cell' },
    
    '.fit-h': { height: '100%' },
    '.fit-w': { width: '100%' },
    '.fit-2': { width: '50%' },
    '.fit-3': { width: (100/3) + '%' },
    '.fit-4': { width: '25%' },
    
    // MARGIN FILLS.
    // ---------------------------------------------------------------------------
    '.al-fill': { margin: 60 },
    '.fill': { margin_top: 60, margin_bottom: 60 },
    '.top-fill': { margin_top: 60 },
    '.bot-fill': { margin_bottom: 60 },
    
    '.no-fill': { margin: 0 },
    '.la-fill': { margin: 60 },
    '.lv-fill': { margin_top: 60, margin_bottom: 60 },
    '.lh-fill': { margin_left: 60, margin_right: 60 },
    '.ll-fill': { margin_left: 60 },
    '.lr-fill': { margin_right: 60 },
    '.lt-fill': { margin_top: 60 },
    '.lb-fill': { margin_bottom: 60 },
    // Medium Margin Fill
    '.ma-fill': { margin: 30 },
    '.mv-fill': { margin_top: 30, margin_bottom: 30 },
    '.mh-fill': { margin_left: 30, margin_right: 30 },
    '.ml-fill': { margin_left: 30 },
    '.mr-fill': { margin_right: 30 },
    '.mt-fill': { margin_top: 30 },
    '.mb-fill': { margin_bottom: 30 },
    // Small Margin Fill
    '.sa-fill': { margin: 20 },
    '.sv-fill': { margin_top: 20, margin_bottom: 20 },
    '.sh-fill': { margin_left: 20, margin_right: 20 },
    '.sb-fill': { margin_bottom: 20 },
    '.sl-fill': { margin_left: 20 },
    '.sr-fill': { margin_right: 20 },
    '.st-fill': { margin_top: 24 },
    // Thin Margin Fill
    '.ta-fill': { margin: 10 },
    '.tv-fill': { margin_top: 10, margin_bottom: 10 },
    '.th-fill': { margin_left: 10, margin_right: 10 },
    '.tl-fill': { margin_left: 10 },
    '.tr-fill': { margin_right: 10 },
    '.tb-fill': { margin_bottom: 10 },
    '.tt-fill': { margin_top: 12 },
    
    // PADDING FILLS.
    // ---------------------------------------------------------------------------
    '.hv-padd': { padding_top: 40, padding_bottom: 40 },
    '.hh-padd': { padding_left: 40, padding_right: 40 },
    
    '.al-padd': { padding: 30 },
    '.padd': { padding_top: 30, padding_bottom: 30 },
    '.top-padd': { padding_top: 30 },
    '.bot-padd': { padding_bottom: 30 },
    
    '.no-padd': { padding: 0 },
    '.la-padd': { padding: 30 },
    '.lv-padd': { padding_top: 30, padding_bottom: 30 },
    '.lh-padd': { padding_left: 30, padding_right: 30 },
    '.ll-padd': { padding_left: 30 },
    '.lr-padd': { padding_right: 30 },
    '.lt-padd': { padding_top: 30 },
    '.lb-padd': { padding_bottom: 30 },
    // Medium Margin Fill
    '.ma-padd': { padding: 20 },
    '.mv-padd': { padding_top: 20, padding_bottom: 20 },
    '.mh-padd': { padding_left: 20, padding_right: 20 },
    '.ml-padd': { padding_left: 20 },
    '.mr-padd': { padding_right: 20 },
    '.mt-padd': { padding_top: 20 },
    '.mb-padd': { padding_bottom: 20 },
    // Small Margin Fill
    '.sa-padd': { padding: 10 },
    '.sv-padd': { padding_top: 10, padding_bottom: 10 },
    '.sh-padd': { padding_left: 10, padding_right: 10 },
    '.sl-padd': { padding_left: 10 },
    '.sr-padd': { padding_right: 10 },
    '.sb-padd': { padding_bottom: 10 },
    '.st-padd': { padding_top: 14 },
    // Small Margin Fill
    '.ta-padd': { padding: 5 },
    '.tv-padd': { padding_top: 5, padding_bottom: 5 },
    '.th-padd': { padding_left: 5, padding_right: 5 },
    '.tl-padd': { padding_left: 5 },
    '.tr-padd': { padding_right: 5 },
    '.tb-padd': { padding_bottom: 5 },
    '.tt-padd': { padding_top: 7 },
    
    // POSITIONING.
    '.middle': { vertical_align: MIDDLE },
    '.top': { vertical_align: TOP },
    '.bottom': { vertical_align: BOTTOM },
    '.left': { text_align: LEFT },
    '.right': { text_align: RIGHT },
    '.center': { text_align: CENTER },
    '.justify': { text_align: JUSTIFY },
    
    '.relative': { position: RELATIVE },
    '.f-right': { float: RIGHT },
    '.f-left': { float: LEFT },
    '.no-wrap': { overflow: HIDDEN, white_space: 'nowrap' }
});
