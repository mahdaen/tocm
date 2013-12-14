// CREATING COMPRESSOR.
var compressor = require('node-minify');

// DEVELOPMENT.
new compressor.minify({
    type: 'no-compress',
    fileIn: [
        'source/core/header.js',
        // External Library.
        'source/ref/jquery.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.js',
    callback: function (err, min) {
        console.log(err);
    }
});

// PRODUCTION.
new compressor.minify({
    type: 'gcc',
    fileIn: [
        // External Library.
        'source/ref/jquery.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.min.js',
    callback: function (err, min) {
        console.log(err);
    }
});

// INDEPENDENT DEVELOPMENT.
new compressor.minify({
    type: 'no-compress',
    fileIn: [
        'source/core/header.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.noj.js',
    callback: function (err, min) {
        console.log(err);
    }
});

// INDEPENDENT PRODUCTION.
new compressor.minify({
    type: 'gcc',
    fileIn: [
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.noj.min.js',
    callback: function (err, min) {
        console.log(err);
    }
});

// ADDITIONAL BUILDS.
new compressor.minify({
    type: 'gcc',
    fileIn: [
        // External Library.
        'source/ref/jquery.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: '../home.tocm.com/naomi/script/tocm-1.1.min.js',
    callback: function (err, min) {
        console.log(err);
    }
});

new compressor.minify({
    type: 'yui-js',
    fileIn: [
        // External Library.
        'source/ref/jquery.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.yui.js',
    callback: function (err, min) {
        console.log(err);
    }
});