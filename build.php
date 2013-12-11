<?php
// CREATING FILE LISTS.
$build_list = array(
    // External Library.
    'source/ref/jquery.js', //'source/ref/xpath.js', 'source/ref/array.js',
    // Core Library.
    'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
    'source/core/tocmbase.js', 'source/core/tocm.js',
    // Extensions Library.
    'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/task.js',
    // Extender Library.
    'source/ext/extender.js', 'source/ext/cssprop.js'
);

// CREATING BUILDED STRING.
$build_string = '';
$header = file_get_contents('source/core/header.js');

// ENUMERATING FILES.
foreach ($build_list as $file) {
    $build_string .= file_get_contents($file);
}

$build_string = preg_replace('/\/\*[a-zA-Z\:\s\-\d]+\*\//i', '', $build_string);
$build_string = preg_replace('/\;[\r\n]+\/\//i', ";\r\n\r\n//", $build_string);
$header .= $build_string;

$build = 'build/tocm.full.js';
file_put_contents($build, $header);
//header('location: tocm.full.v1.1.js');

?>