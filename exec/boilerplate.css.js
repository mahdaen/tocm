/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// ADAPTING HTML5 BOILERPLATE ----->
(function($glob, $priv, $batch) {
    'use strict';
    TocmAutoWrite = false;
    // HTML5 DISPLAY DEFINITIONS ----->
    $glob('article, aside, details, figcaption, figure, footer, header, hgroup, nav, section', {display: 'block'});
    $glob('audio, canvas, video', {display: 'inline-block', $display: 'inline', $zoom: 1});
    $glob('audio:not([controls])', {display: 'none'});
    $glob('[hidden]', {display: 'none'});
    
    // BASE <> HTML ELEMENT //
    $glob('html', {font_size: '100%', overflow_y: 'scroll', _webkit_text_size_adjust: '100%', _ms_text_size_adjust: '100%'});
    // BODY ELEMENT //
    $glob('body', {margin: 0, font_size: '100%', line_height: 1.231, font_family: 'Verdana', color: '#333'});
    
    TocmBuilder.writeSCS();
    TocmAutoWrite = true;
})($glob, $priv, $batch);