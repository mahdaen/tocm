var compressor = require('node-minify');

new compressor.minify({
    type: 'no-compress',
    fileIn: [
        'source/core/header.js',
        // External Library.
        'source/ref/jquery.js', //'source/ref/xpath.js', 'source/ref/array.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.js',
    callback: function(err, min){
        console.log(err);
    }
});

new compressor.minify({
    type: 'gcc',
    fileIn: [
        // External Library.
        'source/ref/jquery.js', //'source/ref/xpath.js', 'source/ref/array.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.min.js',
    callback: function(err, min){
        console.log(err);
    }
});
new compressor.minify({
    type: 'gcc',
    fileIn: [
        // External Library.
        'source/ref/jquery.js', //'source/ref/xpath.js', 'source/ref/array.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: '../template.dev/naomi/script/tocm-1.1.min.js',
    callback: function(err, min){
        console.log(err);
    }
});

new compressor.minify({
    type: 'yui-js',
    fileIn: [
        // External Library.
        'source/ref/jquery.js', //'source/ref/xpath.js', 'source/ref/array.js',
        // Core Library.
        'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
        'source/core/tocmbase.js', 'source/core/tocm.js',
        // Extensions Library.
        'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
        // Extender Library.
        'source/ext/extender.js', 'source/ext/cssprop.js'
    ],
    fileOut: 'build/tocm-1.1.yui.js',
    callback: function(err, min){
        console.log(err);
    }
});