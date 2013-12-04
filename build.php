<?php
// CREATING FILE LISTS.
$build_list = array(
    // External Library.
    'source/ref/jquery.js',
    // Core Library.
    'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
    'source/core/tocmbase.js', 'source/core/tocm.js',
    // Extensions Library.
    'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
    // Extender Library.
    'source/ext/extender.js'
);

$cbuild_list = array(
    // External Library.
    'source/ref/zepto.js',
    // Core Library.
    'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
    'source/core/tocmbase.js', 'source/core/tocm.js',
    // Extensions Library.
    'source/ext/global.js', 'source/ext/animation.js', 'source/ext/zquery.js', 'source/ext/task.js',
    // Extender Library.
    'source/ext/zextender.js'
);


// CREATING BUILDED STRING.
$build_string = '';
$cbuild_string = '';
$header = file_get_contents('source/core/header.js');
$cheader = file_get_contents('source/core/header.js');

// ENUMERATING FILES.
foreach ($build_list as $file) {
    $build_string .= file_get_contents($file);
}
foreach ($cbuild_list as $file) {
    $cbuild_string .= file_get_contents($file);
}

$build_string = preg_replace('/\/\*[a-zA-Z\:\s\-\d]+\*\//i', '', $build_string);
$build_string = preg_replace('/\;[\r\n]+\/\//i', ";\r\n\r\n//", $build_string);
$header .= $build_string;

$cbuild_string = preg_replace('/\/\*[a-zA-Z\:\s\-\d]+\*\//i', '', $cbuild_string);
$cbuild_string = preg_replace('/\;[\r\n]+\/\//i', ";\r\n\r\n//", $cbuild_string);
$cheader .= $cbuild_string;

$build = 'build/tocm.full.js';
$cbuild = 'build/tocm.mod.js';
file_put_contents($build, $header);
file_put_contents($cbuild, $cheader);
//header('location: tocm.full.v1.1.js');

?>